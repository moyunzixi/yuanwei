/**
 * 隐藏属性系统
 *
 * 设计要点：
 * 1. 非线性增长 —— 越接近上限越难涨，越接近下限越难跌，消灭 "+5/-5" 的机械感
 * 2. 依恋维度 —— 不直接赋值，由行为日志（log）推断，玩家无法伪装
 * 3. 派生指标 —— 由公式计算，从不直接修改
 */

const ATTR_KEYS = [
  'heart', // 心动
  'ambiguity', // 暧昧
  'boundary', // 边界感
  'secrecy', // 隐瞒
  'reliance', // 情感寄托
  'vanity', // 被需要感
  'guilt', // 愧疚
  'bond' // 伴侣纽带
]

const SUB_KEYS = [
  'selfExpansion', // 自我扩展渴求（沈迦线）
  'attachmentAnx', // 依恋焦虑激活（林晚线）
  'unfinished', // 未完成情结（周然线）
  'sunkCost' // 投入升级（跨线）
]

// 关系现状 → 初始属性（投资模型中的"满意度"变量）
const RELATION_PRESET = {
  passion: { bond: 78, boundary: 52, guilt: 8 },
  plain: { bond: 56, boundary: 50, guilt: 10 },
  tired: { bond: 34, boundary: 46, guilt: 14 }
}

const BASELINE = {
  heart: 0,
  ambiguity: 0,
  boundary: 50,
  secrecy: 0,
  reliance: 0,
  vanity: 20,
  guilt: 10,
  bond: 60
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
  SUB_KEYS.forEach(k => {
    sub[k] = 0
  })
  return sub
}

/**
 * 非线性增量
 * 上涨：剩余空间越小越难涨  raw * (1 - cur/100)^0.6
 * 下降：已处低位越难再降    raw * (cur/100)^0.6
 */
function scaleDelta(raw, cur) {
  if (raw >= 0) {
    return raw * Math.pow(Math.max(0, 1 - cur / 100), 0.6)
  }
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

/**
 * 依恋维度推断 —— 从行为日志聚合，而非选项直接赋值
 * attach.anxiety  / attach.avoidance  (0-100)
 *
 * 使用饱和曲线 score = 100 * (1 - e^(-raw/K))：
 * 行为越密集，边际增益越小，避免"出现一次即满分"。
 * 再乘以置信度（按行为样本量修正），避免早期样本过少时误判。
 */
function inferAttachment(log) {
  if (!Array.isArray(log) || log.length === 0) {
    return { anxiety: 0, avoidance: 0 }
  }

  let anxietyRaw = 0
  let avoidanceRaw = 0

  log.forEach(item => {
    if (!item || !item.attach) return
    anxietyRaw += item.attach.anxiety || 0
    avoidanceRaw += item.attach.avoidance || 0
  })

  const K = 22 // 饱和常数：约 22 分原始行为量对应 63 分
  const confidence = Math.min(1, log.length / 12)
  const sat = x => clamp(Math.round(100 * (1 - Math.exp(-x / K)) * confidence), 0, 100)

  return {
    anxiety: sat(anxietyRaw),
    avoidance: sat(avoidanceRaw)
  }
}

/**
 * 派生指标
 */
function derive(save) {
  const a = save.attrs || {}
  const log = Array.isArray(save.log) ? save.log : []

  const rationalCount = log.filter(i => i && i.mech === 'rationalization').length
  const boundaryCount = log.filter(i => i && i.mech === 'voice_boundary').length

  // 合理化：高暧昧 + 高隐瞒 + 低愧疚 + 推脱类选项多
  const rationalization = clamp(
    Math.round(
      (a.ambiguity || 0) * 0.3 +
        (a.secrecy || 0) * 0.3 +
        (100 - (a.guilt || 0)) * 0.15 +
        rationalCount * 8
    ),
    0,
    100
  )

  // 双线经营：对伴侣的补偿行为 × 隐瞒
  const dualTrack = clamp(
    Math.round(((a.secrecy || 0) * (a.bond || 0)) / 100 + (save.sub.sunkCost || 0) * 0.4),
    0,
    100
  )

  // 被喜欢需求
  const needToBeLiked = clamp(
    Math.round(((a.vanity || 0) * (100 - (a.bond || 0))) / 100 + (a.reliance || 0) * 0.25),
    0,
    100
  )

  return {
    rationalization,
    dualTrack,
    needToBeLiked,
    rationalCount,
    boundaryCount
  }
}

module.exports = {
  ATTR_KEYS,
  SUB_KEYS,
  RELATION_PRESET,
  clamp,
  initialAttrs,
  initialSub,
  applyAttrs,
  applySub,
  applyNpc,
  inferAttachment,
  derive
}
