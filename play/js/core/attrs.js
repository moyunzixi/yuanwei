/**
 * 隐藏属性系统（浏览器/Node 双兼容）
 */
;(function (root) {
  const ATTR_KEYS = [
    'heart', 'ambiguity', 'boundary', 'secrecy',
    'reliance', 'vanity', 'guilt', 'bond'
  ]
  const SUB_KEYS = ['selfExpansion', 'attachmentAnx', 'unfinished', 'sunkCost']

  const RELATION_PRESET = {
    passion: { bond: 78, boundary: 52, guilt: 8 },
    plain: { bond: 56, boundary: 50, guilt: 10 },
    tired: { bond: 34, boundary: 46, guilt: 14 }
  }

  const BASELINE = {
    heart: 0, ambiguity: 0, boundary: 50, secrecy: 0,
    reliance: 0, vanity: 20, guilt: 10, bond: 60
  }

  function clamp(v, min, max) {
    if (v < min) return min
    if (v > max) return max
    return v
  }

  function initialAttrs(relationState) {
    const preset = RELATION_PRESET[relationState] || RELATION_PRESET.plain
    const attrs = {}
    ATTR_KEYS.forEach(k => {
      attrs[k] = preset[k] !== undefined ? preset[k] : BASELINE[k]
    })
    return attrs
  }

  function initialSub() {
    const sub = {}
    SUB_KEYS.forEach(k => (sub[k] = 0))
    return sub
  }

  function scaleDelta(raw, cur) {
    if (raw >= 0) return raw * Math.pow(Math.max(0, 1 - cur / 100), 0.6)
    return raw * Math.pow(Math.max(0, cur / 100), 0.6)
  }

  function applyAttrs(attrs, delta) {
    const next = Object.assign({}, attrs)
    Object.keys(delta || {}).forEach(k => {
      if (next[k] === undefined) return
      const raw = delta[k]
      if (typeof raw !== 'number') return
      next[k] = clamp(Math.round((next[k] + scaleDelta(raw, next[k])) * 10) / 10, 0, 100)
    })
    return next
  }

  function applySub(sub, delta) {
    const next = Object.assign({}, sub)
    Object.keys(delta || {}).forEach(k => {
      if (next[k] === undefined) return
      const raw = delta[k]
      if (typeof raw !== 'number') return
      next[k] = clamp(next[k] + raw, 0, 100)
    })
    return next
  }

  function applyNpc(npc, npcEffects) {
    const next = JSON.parse(JSON.stringify(npc || {}))
    Object.keys(npcEffects || {}).forEach(id => {
      const effect = npcEffects[id] || {}
      const cur = next[id] || { affection: 0, dependency: 0 }
      next[id] = {
        affection: clamp(cur.affection + (effect.affection || 0), 0, 100),
        dependency: clamp(cur.dependency + (effect.dependency || 0), 0, 100)
      }
    })
    return next
  }

  function inferAttachment(log) {
    if (!Array.isArray(log) || log.length === 0) return { anxiety: 0, avoidance: 0 }
    let anxietyRaw = 0
    let avoidanceRaw = 0
    log.forEach(item => {
      if (!item || !item.attach) return
      anxietyRaw += item.attach.anxiety || 0
      avoidanceRaw += item.attach.avoidance || 0
    })
    const K = 22
    const confidence = Math.min(1, log.length / 12)
    const sat = x => clamp(Math.round(100 * (1 - Math.exp(-x / K)) * confidence), 0, 100)
    return { anxiety: sat(anxietyRaw), avoidance: sat(avoidanceRaw) }
  }

  function derive(save) {
    const a = save.attrs || {}
    const log = Array.isArray(save.log) ? save.log : []
    const rationalCount = log.filter(i => i && i.mech === 'rationalization').length
    const boundaryCount = log.filter(i => i && i.mech === 'voice_boundary').length
    const rationalization = clamp(
      Math.round(
        (a.ambiguity || 0) * 0.3 +
          (a.secrecy || 0) * 0.3 +
          (100 - (a.guilt || 0)) * 0.15 +
          rationalCount * 8
      ),
      0, 100)
    const dualTrack = clamp(
      Math.round(((a.secrecy || 0) * (a.bond || 0)) / 100 + (save.sub.sunkCost || 0) * 0.4),
      0, 100)
    const needToBeLiked = clamp(
      Math.round(((a.vanity || 0) * (100 - (a.bond || 0))) / 100 + (a.reliance || 0) * 0.25),
      0, 100)
    return { rationalization, dualTrack, needToBeLiked, rationalCount, boundaryCount }
  }

  const api = {
    ATTR_KEYS, SUB_KEYS, RELATION_PRESET, clamp,
    initialAttrs, initialSub, applyAttrs, applySub, applyNpc, inferAttachment, derive
  }
  root.LS = root.LS || {}
  root.LS.attrs = api
  if (typeof module !== 'undefined' && module.exports) module.exports = api
})(typeof window !== 'undefined' ? window : globalThis)
