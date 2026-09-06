/**
 * 序列模式识别（浏览器/Node 双兼容）
 */
;(function (root) {
  const report = root.LS.report
  const BOUNDARY_MECHS = ['voice_boundary', 'confess']
  const ESCALATE_MECHS = ['exit_escalate', 'hyperactivate', 'secrecy']

  function countMech(log, mechs) {
    return log.filter(i => i && mechs.indexOf(i.mech) >= 0).length
  }

  function detect(save) {
    const log = Array.isArray(save.log) ? save.log : []
    const a = save.attrs || {}
    const found = []
    if (log.length === 0) return found

    if (countMech(log, BOUNDARY_MECHS) === 0) found.push('noBoundaryEver')

    let relapse = false
    for (let i = 0; i < log.length; i++) {
      if (!log[i] || BOUNDARY_MECHS.indexOf(log[i].mech) < 0) continue
      const window = log.slice(i + 1, i + 4)
      if (countMech(window, ESCALATE_MECHS) > 0) { relapse = true; break }
    }
    if (relapse) found.push('relapse')

    let compensate = false
    for (let i = 0; i < log.length; i++) {
      if (!log[i]) continue
      const isCross = log[i].mech === 'exit_escalate' || log[i].mech === 'secrecy'
      if (!isCross) continue
      const window = log.slice(i + 1, i + 3)
      const hasCompensate = window.some(
        item => item && item.delta && typeof item.delta.bond === 'number' && item.delta.bond > 0
      )
      if (hasCompensate) { compensate = true; break }
    }
    if (compensate) found.push('compensate')

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
        if (series[i] < series[i - 1]) { monotonic = false; break }
      }
      if (monotonic && (a.ambiguity || 0) >= 45) found.push('escalator')
    }

    const hasPeak = countMech(log, ESCALATE_MECHS) > 0
    const tail = log.slice(-3)
    const tailBoundary = countMech(tail, BOUNDARY_MECHS.concat(['loyalty_wait']))
    if (hasPeak && tailBoundary > 0 && (a.ambiguity || 0) < 50) found.push('coldTurkey')

    const rationalCount = log.filter(i => i && i.mech === 'rationalization').length
    if ((a.secrecy || 0) >= 50 && (a.guilt || 0) <= 35 && rationalCount >= 2) found.push('selfDeception')

    return found
  }

  function toLines(patterns) {
    return patterns
      .map(key => ({ key, line: report.patternLines[key] }))
      .filter(item => !!item.line)
  }

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

  const api = { detect, toLines, score }
  root.LS = root.LS || {}
  root.LS.pattern = api
  if (typeof module !== 'undefined' && module.exports) module.exports = api
})(typeof window !== 'undefined' ? window : globalThis)
