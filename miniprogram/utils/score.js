/**
 * 评分与报告生成
 *
 * 最终指数 = 测量锚点 40% + 属性终值 35% + 序列模式 25%
 */

const characters = require('../data/characters.js')
const endings = require('../data/endings.js')
const report = require('../data/report.js')
const pattern = require('./pattern.js')
const attrs = require('./attrs.js')

// 机制 → 风险权重（-2 ~ +2）
const MECH_RISK = {
  confess: -2.0,
  voice_boundary: -1.5,
  voice_express: -0.3,
  loyalty_wait: -0.2,
  neglect: 0.4,
  deactivate: 0.3,
  hyperactivate: 1.5,
  rationalization: 1.2,
  exit_escalate: 2.0,
  secrecy: 1.8
}

// 属性终值权重（合计 1.0）
// bond 权重较高：投资模型中"对现有关系的投入"是核心变量之一
const ATTR_WEIGHT = {
  ambiguity: 0.24,
  secrecy: 0.2,
  heart: 0.14,
  reliance: 0.14,
  vanity: 0.04,
  boundary: 0.09, // 取 100 - boundary
  bond: 0.09, // 取 100 - bond
  guilt: 0.06 // 取 100 - guilt
}

const INVERTED = { boundary: true, bond: true, guilt: true }

function clamp(v, min, max) {
  return v < min ? min : v > max ? max : v
}

/** 锚点分（0-100） */
function anchorScore(log) {
  const anchors = log.filter(i => i && i.anchor)
  if (anchors.length === 0) return 0
  let raw = 0
  let max = 0
  anchors.forEach(i => {
    const r = MECH_RISK[i.mech] || 0
    const w = i.weight || 1
    raw += r * w
    max += 2 * w
  })
  return clamp(Math.round(((raw + max) / (2 * max)) * 100), 0, 100)
}

/** 属性终值分（0-100） */
function attrScore(a) {
  let sum = 0
  Object.keys(ATTR_WEIGHT).forEach(k => {
    const v = typeof a[k] === 'number' ? a[k] : 0
    const val = INVERTED[k] ? 100 - v : v
    sum += val * ATTR_WEIGHT[k]
  })
  return clamp(Math.round(sum), 0, 100)
}

/** 玩家向量 [心动, 暧昧, 100-边界, 隐瞒, 寄托, 被需要, 愧疚, 100-纽带] */
function playerVector(a) {
  return [
    a.heart || 0,
    a.ambiguity || 0,
    100 - (a.boundary || 0),
    a.secrecy || 0,
    a.reliance || 0,
    a.vanity || 0,
    a.guilt || 0,
    100 - (a.bond || 0)
  ]
}

/** 加权欧氏相似度（0-100） */
function similarity(p, c) {
  let dist = 0
  let max = 0
  for (let i = 0; i < p.length; i++) {
    dist += Math.pow(p[i] - c[i], 2)
    max += Math.pow(100, 2)
  }
  return clamp(Math.round((1 - Math.sqrt(dist) / Math.sqrt(max)) * 100), 0, 100)
}

/** 依恋象限判定 */
function quadrantOf(attach) {
  const T = 45
  const anx = (attach && attach.anxiety) || 0
  const avo = (attach && attach.avoidance) || 0
  if (anx >= T && avo >= T) return 'fearful'
  if (anx >= T) return 'preoccupied'
  if (avo >= T) return 'dismissing'
  return 'secure'
}

/** 行为回放：取关键选择 */
function buildReplay(log) {
  const result = []
  report.replayTypes.forEach(type => {
    let hit = null
    if (type.flag) {
      hit = log.find(
        i => i && Array.isArray(i.flags) && i.flags.indexOf(type.flag) >= 0
      )
    }
    if (!hit && type.mech) {
      hit = log.find(i => i && type.mech.indexOf(i.mech) >= 0)
    }
    if (!hit) return
    let timeLabel = ''
    if (hit.time) timeLabel = hit.time + ' · '
    result.push({ label: type.label, time: timeLabel, text: hit.text })
  })
  return result
}

/** 合理化话术统计 */
function topRationalization(log) {
  const counter = {}
  log.forEach(i => {
    if (!i || i.mech !== 'rationalization') return
    counter[i.text] = (counter[i.text] || 0) + 1
  })
  let top = null
  let count = 0
  Object.keys(counter).forEach(k => {
    if (counter[k] > count) {
      count = counter[k]
      top = k
    }
  })
  return { top, count }
}

/**
 * 生成完整报告
 * @param {Object} save 存档
 * @param {String} endingId 结局 id
 */
function buildReport(save, endingId) {
  const a = save.attrs || {}
  const log = Array.isArray(save.log) ? save.log : []
  const derived = attrs.derive(save)
  const patterns = pattern.detect(save)

  const sAnchor = anchorScore(log)
  const sAttr = attrScore(a)
  const sPattern = pattern.score(patterns)

  // 三层加权得到原始分，再用 S 曲线做对比度拉伸
  // 原因：加权平均天然向中位收敛，不拉伸的话极端路径也够不到高分档
  const raw = sAnchor * 0.4 + sAttr * 0.35 + sPattern * 0.25
  const index = clamp(Math.round(100 / (1 + Math.exp(-(raw - 45) / 12))), 0, 100)

  const rank =
    report.ranks.find(r => index >= r.min && index <= r.max) ||
    report.ranks[report.ranks.length - 1]

  const dimensions = report.dimensions.map(d => {
    const src = d.source || d.key
    const raw = typeof a[src] === 'number' ? a[src] : 0
    const value = d.inverted ? Math.round(100 - raw) : Math.round(raw)
    return {
      key: d.key,
      label: d.label,
      value: clamp(value, 0, 100),
      inverted: !!d.inverted,
      science: d.science
    }
  })

  const quadrantKey = quadrantOf(save.attach)
  const quadrant = report.quadrants[quadrantKey]

  // 依恋象限对应的角色必须与向量匹配结果一致，否则报告会自相矛盾
  const vec = playerVector(a)
  const qChar = quadrant && quadrant.character
  let matches = characters._order.map(id => {
    const c = characters[id]
    return { id, name: c.name, sim: similarity(vec, c.vector) }
  })
  if (qChar) {
    const self = matches.find(m => m.id === qChar)
    const others = matches.filter(m => m.id !== qChar).sort((x, y) => y.sim - x.sim)
    if (self && others.length && self.sim <= others[0].sim) {
      self.sim = Math.min(99, others[0].sim + 2)
    }
  }
  matches = matches.sort((x, y) => y.sim - x.sim).slice(0, 3)

  const rational = topRationalization(log)

  const ending = endings[endingId] || null

  return {
    index,
    rankName: rank.name,
    rankLine: rank.line,
    dimensions,
    attach: save.attach || { anxiety: 0, avoidance: 0 },
    quadrantKey,
    quadrant,
    matches,
    patterns: pattern.toLines(patterns),
    replay: buildReplay(log),
    rationalizationLine: report.rationalizationLine(rational.count, rational.top),
    derived,
    ending,
    stats: {
      totalChoices: log.length,
      anchorCount: log.filter(i => i && i.anchor).length
    }
  }
}

module.exports = {
  MECH_RISK,
  anchorScore,
  attrScore,
  playerVector,
  similarity,
  quadrantOf,
  buildReport
}
