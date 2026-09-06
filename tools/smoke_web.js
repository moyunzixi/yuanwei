// 验证 web 版逻辑层（按浏览器加载顺序 require，Node 下挂到 globalThis.LS）
require('../js/data/scenes.js')
require('../js/data/characters.js')
require('../js/data/endings.js')
require('../js/data/report.js')
require('../js/core/expr.js')
require('../js/core/attrs.js')
require('../js/core/pattern.js')
require('../js/core/storage.js')
require('../js/core/engine.js')
require('../js/core/score.js')

const LS = globalThis.LS
const { engine, score } = LS

console.log('scenes:', Object.keys(LS.scenes).length)
console.log('characters:', LS.characters._order.join(', '))
console.log('endings:', Object.keys(LS.endings).length)

function play(picker) {
  let save = engine.createSave({ gender: 'm', relation: 'plain' })
  let guard = 0
  while (!engine.isFinished(save) && guard++ < 100) {
    const node = engine.currentNode(save)
    const hasChoices = node.choices && node.choices.length
    const hasLines = node.lines && node.lines.length
    if (!hasChoices && !hasLines) { save = engine.advance(save); continue }
    if (!hasChoices) { save = engine.advance(save); continue }
    save = engine.choose(save, picker(node))
  }
  return save
}

const strategies = {
  '越界': () => 0,
  '保守': n => (n.choices.length > 1 ? 1 : 0),
  '回避': n => n.choices.length - 1,
  '极越界': n => {
    let best = 0, bs = -Infinity
    n.choices.forEach((c, i) => {
      const e = c.effects || {}
      const s = (e.ambiguity||0)*1.5 + (e.secrecy||0)*1.5 + (e.heart||0) - (e.bond||0)*0.5 - (e.boundary||0)
      if (s > bs) { bs = s; best = i }
    })
    return best
  }
}

let ok = true
Object.entries(strategies).forEach(([name, pick]) => {
  const save = play(pick)
  const rd = score.buildReport(save, save.current)
  const done = engine.isFinished(save)
  if (!done) ok = false
  console.log(
    (done ? '[OK] ' : '[!!] ') + name,
    '| 结局', save.current, (LS.endings[save.current]||{}).name || '?',
    '| 指数', rd.index, rd.rankName,
    '| 象限', rd.quadrantKey,
    '| 最像', rd.matches[0].name, rd.matches[0].sim + '%'
  )
})

console.log(ok ? 'web 逻辑层闭环 OK' : 'web 逻辑层有问题')
process.exit(ok ? 0 : 1)
