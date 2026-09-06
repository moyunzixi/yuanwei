/**
 * 冒烟测试（Node 环境运行，不进入小程序包）
 * 用途：验证 22 节点可完整走通、评分与结局判定正常
 * 运行：node tools/smoke.js
 */

global.__store = {}
global.wx = {
  getStorageSync: k => (global.__store[k] !== undefined ? global.__store[k] : ''),
  setStorageSync: (k, v) => {
    global.__store[k] = v
  },
  removeStorageSync: k => {
    delete global.__store[k]
  }
}

const engine = require('../miniprogram/utils/engine.js')
const score = require('../miniprogram/utils/score.js')
const scenes = require('../miniprogram/data/scenes.js')
const endings = require('../miniprogram/data/endings.js')

/** 走完一整局 */
function play(pick, relation) {
  let save = engine.createSave({ gender: 'm', relation: relation || 'plain' })
  const visited = []
  let guard = 0

  while (!engine.isFinished(save) && guard++ < 200) {
    const node = engine.currentNode(save)
    if (!node) break
    visited.push(save.current)

    const hasChoices = Array.isArray(node.choices) && node.choices.length > 0
    const hasLines = Array.isArray(node.lines) && node.lines.length > 0

    if (!hasChoices && !hasLines) {
      const next = engine.advance(save)
      if (!next || next.current === save.current) break
      save = next
      continue
    }
    if (!hasChoices) {
      const next = engine.advance(save)
      if (!next || next.current === save.current) break
      save = next
      continue
    }

    const idx = pick(node, save)
    save = engine.choose(save, idx)
  }
  return { save, visited, steps: guard }
}

const pickers = {
  '全选第 1 项（越界倾向）': () => 0,
  '全选第 2 项（保守倾向）': node => (node.choices.length > 1 ? 1 : 0),
  '全选最后一项（回避倾向）': node => node.choices.length - 1,
  '随机': node => Math.floor(Math.random() * node.choices.length),
  '最越界路径（贪心选暧昧/隐瞒最大）': node => {
    let best = 0
    let bestScore = -Infinity
    node.choices.forEach((c, i) => {
      const e = c.effects || {}
      const s =
        (e.ambiguity || 0) * 1.5 +
        (e.secrecy || 0) * 1.5 +
        (e.heart || 0) -
        (e.bond || 0) * 0.5 -
        (e.boundary || 0)
      if (s > bestScore) {
        bestScore = s
        best = i
      }
    })
    return best
  }
}

let failed = 0

console.log('===== 节点完整性 =====')
const ids = Object.keys(scenes)
console.log('节点总数:', ids.length)

ids.forEach(id => {
  const n = scenes[id]
  const problems = []
  if (!n.lines && !n.choices && !n.branch_if) problems.push('无内容且无分支')
  ;(n.choices || []).forEach((c, i) => {
    if (!c.next && !c.next_if) problems.push('选项' + i + ' 无 next')
    if (!c.mech) problems.push('选项' + i + ' 缺 mech')
  })
  ;(n.lines || []).forEach((l, i) => {
    if (!l.text) problems.push('line' + i + ' 空文本')
  })
  if (problems.length) {
    failed++
    console.log('  [!]', id, problems.join(' / '))
  }
})

// 校验所有 next 指向存在
ids.forEach(id => {
  const n = scenes[id]
  const targets = []
  if (n.next) targets.push(n.next)
  ;(n.choices || []).forEach(c => {
    if (c.next) targets.push(c.next)
    ;(c.next_if || []).forEach(r => targets.push(r.next))
  })
  ;(n.branch_if || []).forEach(r => targets.push(r.next))
  targets.forEach(t => {
    if (!scenes[t] && !endings[t]) {
      failed++
      console.log('  [!]', id, '→ 指向不存在的节点:', t)
    }
  })
})

console.log('结局数:', Object.keys(endings).length)
console.log('')

console.log('===== 路径模拟 =====')
Object.keys(pickers).forEach(name => {
  const r = play(pickers[name], 'plain')
  const ok = engine.isFinished(r.save)
  const endingId = r.save.current
  if (!ok) failed++
  const rd = score.buildReport(r.save, endingId)
  console.log(
    (ok ? '[OK] ' : '[!!] ') + name,
    '| 步数', r.steps,
    '| 结局', endingId, endings[endingId] ? endings[endingId].name : '?',
    '| 指数', rd.index, rd.rankName,
    '| 象限', rd.quadrantKey,
    '| 最像', rd.matches[0].name, rd.matches[0].sim + '%',
    '| 锚点', rd.stats.anchorCount
  )
  if (rd.patterns.length) {
    console.log('      模式:', rd.patterns.map(p => p.key).join(', '))
  }
  console.log(
    '      attrs:',
    '心' + Math.round(r.save.attrs.heart),
    '暧' + Math.round(r.save.attrs.ambiguity),
    '边' + Math.round(r.save.attrs.boundary),
    '隐' + Math.round(r.save.attrs.secrecy),
    '寄' + Math.round(r.save.attrs.reliance),
    '纽' + Math.round(r.save.attrs.bond),
    '愧' + Math.round(r.save.attrs.guilt),
    '| 锚点分', score.anchorScore(r.save.log),
    '属性分', score.attrScore(r.save.attrs)
  )
})

console.log('')
console.log('===== 三种初始关系的差异 =====')
;['passion', 'plain', 'tired'].forEach(rel => {
  const r = play(pickers['全选第 1 项（越界倾向）'], rel)
  const rd = score.buildReport(r.save, r.save.current)
  console.log(
    '  ' + rel.padEnd(8),
    '| 纽带', Math.round(r.save.attrs.bond),
    '| 指数', rd.index,
    '| 结局', endings[r.save.current] ? endings[r.save.current].name : '?'
  )
})

console.log('')
console.log('===== 依恋维度推断 =====')
const r1 = play(() => 0, 'plain')
console.log('  全选第1项 →', JSON.stringify(r1.save.attach))
const r2 = play(node => node.choices.length - 1, 'plain')
console.log('  全选末项 →', JSON.stringify(r2.save.attach))

console.log('')
console.log(failed === 0 ? '全部检查通过' : '存在 ' + failed + ' 处问题')
process.exit(failed === 0 ? 0 : 1)
