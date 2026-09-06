/**
 * 序列模式识别
 *
 * 报告里"行为路线"的来源 —— 不看单点数值，看行为轨迹。
 */

const report = require('../data/report.js')

const BOUNDARY_MECHS = ['voice_boundary', 'confess']
const ESCALATE_MECHS = ['exit_escalate', 'hyperactivate', 'secrecy']

function countMech(log, mechs) {
  return log.filter(i => i && mechs.indexOf(i.mech) >= 0).length
}

function indexOfMech(log, mechs, from) {
  for (let i = from || 0; i < log.length; i++) {
    if (log[i] && mechs.indexOf(log[i].mech) >= 0) return i
  }
  return -1
}

/**
 * 检测玩家的行为序列模式
 * @returns {Array<string>} 模式 key 列表
 */
function detect(save) {
  const log = Array.isArray(save.log) ? save.log : []
  const a = save.attrs || {}
  const found = []

  if (log.length === 0) return found

  // 1. 零设界：全程没有主动画过线
  const boundaryCount = countMech(log, BOUNDARY_MECHS)
  if (boundaryCount === 0) {
    found.push('noBoundaryEver')
  }

  // 2. 先拒后受：设过边界，但 3 步之内又越界
  let relapse = false
  for (let i = 0; i < log.length; i++) {
    if (!log[i] || BOUNDARY_MECHS.indexOf(log[i].mech) < 0) continue
    const window = log.slice(i + 1, i + 4)
    if (countMech(window, ESCALATE_MECHS) > 0) {
      relapse = true
      break
    }
  }
  if (relapse) found.push('relapse')

  // 3. 补偿性讨好：越界之后立刻对伴侣示好
  let compensate = false
  for (let i = 0; i < log.length; i++) {
    if (!log[i]) continue
    const isCross = log[i].mech === 'exit_escalate' || log[i].mech === 'secrecy'
    if (!isCross) continue
    const window = log.slice(i + 1, i + 3)
    const hasCompensate = window.some(
      item => item && item.delta && typeof item.delta.bond === 'number' && item.delta.bond > 0
    )
    if (hasCompensate) {
      compensate = true
      break
    }
  }
  if (compensate) found.push('compensate')

  // 4. 匀速滑坡：暧昧值累积单调不减，且终值偏高
  const series = []
  let running = 0
  log.forEach(item => {
    if (item && item.delta && typeof item.delta.ambiguity === 'number') {
      running += item.delta.ambiguity
      series.push(running)
    }
  })
  if (series.length >= 3) {
    let monotonic = true
    for (let i = 1; i < series.length; i++) {
      if (series[i] < series[i - 1]) {
        monotonic = false
        break
      }
    }
    if (monotonic && (a.ambiguity || 0) >= 45) found.push('escalator')
  }

  // 5. 及时收手：有过越界峰值，但最后主动收住
  const hasPeak = countMech(log, ESCALATE_MECHS) > 0
  const tail = log.slice(-3)
  const tailBoundary = countMech(tail, BOUNDARY_MECHS.concat(['loyalty_wait']))
  if (hasPeak && tailBoundary > 0 && (a.ambiguity || 0) < 50) {
    found.push('coldTurkey')
  }

  // 6. 自我欺骗：高隐瞒 + 低愧疚 + 多次推脱
  const rationalCount = log.filter(i => i && i.mech === 'rationalization').length
  if ((a.secrecy || 0) >= 50 && (a.guilt || 0) <= 35 && rationalCount >= 2) {
    found.push('selfDeception')
  }

  return found
}

/**
 * 模式 → 报告文案
 */
function toLines(patterns) {
  return patterns
    .map(key => ({ key, line: report.patternLines[key] }))
    .filter(item => !!item.line)
}

/**
 * 模式得分（0-100），负面模式加分，收手模式减分
 */
function score(patterns) {
  const NEGATIVE = ['noBoundaryEver', 'relapse', 'compensate', 'escalator', 'selfDeception']
  let raw = 0
  patterns.forEach(p => {
    if (p === 'coldTurkey') raw -= 22
    else if (NEGATIVE.indexOf(p) >= 0) raw += 20
  })
  if (raw < 0) raw = 0
  if (raw > 100) raw = 100
  return raw
}

module.exports = { detect, toLines, score }
