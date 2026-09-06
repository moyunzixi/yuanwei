/**
 * 评分与报告生成（浏览器/Node 双兼容）
 * 最终指数 = 测量锚点 40% + 属性终值 35% + 序列模式 25%
 */
;(function (root) {
  const LS = (root.LS = root.LS || {})
  const characters = LS.characters
  const endings = LS.endings
  const report = LS.report
  const pattern = LS.pattern
  const attrs = LS.attrs

  const MECH_RISK = {
    confess: -2.0, voice_boundary: -1.5, voice_express: -0.3, loyalty_wait: -0.2,
    neglect: 0.4, deactivate: 0.3, hyperactivate: 1.5, rationalization: 1.2,
    exit_escalate: 2.0, secrecy: 1.8
  }

  const ATTR_WEIGHT = {
    ambiguity: 0.24, secrecy: 0.2, heart: 0.14, reliance: 0.14, vanity: 0.04,
    boundary: 0.09, bond: 0.09, guilt: 0.06
  }
  const INVERTED = { boundary: true, bond: true, guilt: true }

  function clamp(v, min, max) { return v < min ? min : v > max ? max : v }

  function anchorScore(log) {
    const anchors = log.filter(i => i && i.anchor)
    if (anchors.length === 0) return 0
    let raw = 0, max = 0
    anchors.forEach(i => {
      const r = MECH_RISK[i.mech] || 0
      const w = i.weight || 1
      raw += r * w
      max += 2 * w
    })
    return clamp(Math.round(((raw + max) / (2 * max)) * 100), 0, 100)
  }

  function attrScore(a) {
    let sum = 0
    Object.keys(ATTR_WEIGHT).forEach(k => {
      const v = typeof a[k] === 'number' ? a[k] : 0
      const val = INVERTED[k] ? 100 - v : v
      sum += val * ATTR_WEIGHT[k]
    })
    return clamp(Math.round(sum), 0, 100)
  }

  function playerVector(a) {
    return [
      a.heart || 0, a.ambiguity || 0, 100 - (a.boundary || 0), a.secrecy || 0,
      a.reliance || 0, a.vanity || 0, a.guilt || 0, 100 - (a.bond || 0)
    ]
  }

  function similarity(p, c) {
    let dist = 0, max = 0
    for (let i = 0; i < p.length; i++) {
      dist += Math.pow(p[i] - c[i], 2)
      max += Math.pow(100, 2)
    }
    return clamp(Math.round((1 - Math.sqrt(dist) / Math.sqrt(max)) * 100), 0, 100)
  }

  function quadrantOf(attach) {
    const T = 45
    const anx = (attach && attach.anxiety) || 0
    const avo = (attach && attach.avoidance) || 0
    if (anx >= T && avo >= T) return 'fearful'
    if (anx >= T) return 'preoccupied'
    if (avo >= T) return 'dismissing'
    return 'secure'
  }

  function buildReplay(log) {
    const result = []
    report.replayTypes.forEach(type => {
      let hit = null
      if (type.flag) hit = log.find(i => i && Array.isArray(i.flags) && i.flags.indexOf(type.flag) >= 0)
      if (!hit && type.mech) hit = log.find(i => i && type.mech.indexOf(i.mech) >= 0)
      if (!hit) return
      const timeLabel = hit.time ? hit.time + ' · ' : ''
      result.push({ label: type.label, time: timeLabel, text: hit.text })
    })
    return result
  }

  function topRationalization(log) {
    const counter = {}
    log.forEach(i => {
      if (!i || i.mech !== 'rationalization') return
      counter[i.text] = (counter[i.text] || 0) + 1
    })
    let top = null, count = 0
    Object.keys(counter).forEach(k => {
      if (counter[k] > count) { count = counter[k]; top = k }
    })
    return { top, count }
  }

  function buildReport(save, endingId) {
    const a = save.attrs || {}
    const log = Array.isArray(save.log) ? save.log : []
    const derived = attrs.derive(save)
    const patterns = pattern.detect(save)

    const sAnchor = anchorScore(log)
    const sAttr = attrScore(a)
    const sPattern = pattern.score(patterns)

    const raw = sAnchor * 0.4 + sAttr * 0.35 + sPattern * 0.25
    const index = clamp(Math.round(100 / (1 + Math.exp(-(raw - 45) / 12))), 0, 100)

    const rank = report.ranks.find(r => index >= r.min && index <= r.max) || report.ranks[report.ranks.length - 1]

    const dimensions = report.dimensions.map(d => {
      const src = d.source || d.key
      const rawV = typeof a[src] === 'number' ? a[src] : 0
      const value = d.inverted ? Math.round(100 - rawV) : Math.round(rawV)
      return { key: d.key, label: d.label, value: clamp(value, 0, 100), inverted: !!d.inverted, science: d.science }
    })

    const quadrantKey = quadrantOf(save.attach)
    const quadrant = report.quadrants[quadrantKey]

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
      index, rankName: rank.name, rankLine: rank.line, dimensions,
      attach: save.attach || { anxiety: 0, avoidance: 0 }, quadrantKey, quadrant,
      matches, patterns: pattern.toLines(patterns), replay: buildReplay(log),
      rationalizationLine: report.rationalizationLine(rational.count, rational.top),
      derived, ending,
      stats: { totalChoices: log.length, anchorCount: log.filter(i => i && i.anchor).length }
    }
  }

  const api = { MECH_RISK, anchorScore, attrScore, playerVector, similarity, quadrantOf, buildReport }
  LS.score = api
  if (typeof module !== 'undefined' && module.exports) module.exports = api
})(typeof window !== 'undefined' ? window : globalThis)
