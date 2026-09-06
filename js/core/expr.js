/**
 * 条件表达式解析器（浏览器/Node 双兼容）
 * 把导出挂到全局 window.LS，同时保留 module.exports 供 Node 测试使用。
 */
;(function (root) {
  const OPS = {
    '>': (a, b) => a > b,
    '>=': (a, b) => a >= b,
    '<': (a, b) => a < b,
    '<=': (a, b) => a <= b,
    '==': (a, b) => a === b,
    '!=': (a, b) => a !== b
  }

  function readAttr(save, key) {
    if (!save || !save.attrs) return 0
    const v = save.attrs[key]
    return typeof v === 'number' ? v : 0
  }

  function readNpc(save, path) {
    const seg = String(path || '').split('.')
    if (seg.length !== 2) return 0
    const npc = save && save.npc && save.npc[seg[0]]
    if (!npc) return 0
    const v = npc[seg[1]]
    return typeof v === 'number' ? v : 0
  }

  function readSub(save, key) {
    if (!save || !save.sub) return 0
    const v = save.sub[key]
    return typeof v === 'number' ? v : 0
  }

  function readAttach(save, key) {
    if (!save || !save.attach) return 0
    const v = save.attach[key]
    return typeof v === 'number' ? v : 0
  }

  function countMech(save, mech) {
    if (!save || !Array.isArray(save.log)) return 0
    return save.log.filter(item => item && item.mech === mech).length
  }

  function evalAtom(save, cond) {
    if (!cond) return true
    if (typeof cond.attr === 'string') {
      return (OPS[cond.op || '>'])(readAttr(save, cond.attr), cond.value)
    }
    if (typeof cond.npc === 'string') {
      return (OPS[cond.op || '>'])(readNpc(save, cond.npc), cond.value)
    }
    if (typeof cond.sub === 'string') {
      return (OPS[cond.op || '>'])(readSub(save, cond.sub), cond.value)
    }
    if (typeof cond.attach === 'string') {
      return (OPS[cond.op || '>'])(readAttach(save, cond.attach), cond.value)
    }
    if (typeof cond.flag === 'string') {
      return Array.isArray(save.flags) && save.flags.indexOf(cond.flag) >= 0
    }
    if (typeof cond.nflag === 'string') {
      return !(Array.isArray(save.flags) && save.flags.indexOf(cond.nflag) >= 0)
    }
    if (typeof cond.seen === 'string') {
      return Array.isArray(save.seen) && save.seen.indexOf(cond.seen) >= 0
    }
    if (cond.choice) {
      if (!Array.isArray(save.log)) return false
      return save.log.some(
        item =>
          item &&
          item.node === cond.choice.node &&
          (cond.choice.index === undefined || item.choice === cond.choice.index)
      )
    }
    if (cond.mechCount) {
      return (OPS[cond.mechCount.op || '>='])(
        countMech(save, cond.mechCount.mech),
        cond.mechCount.value
      )
    }
    return true
  }

  function evaluate(cond, save) {
    if (!cond || Object.keys(cond).length === 0) return true
    if (Array.isArray(cond.all)) return cond.all.every(c => evaluate(c, save))
    if (Array.isArray(cond.any)) return cond.any.some(c => evaluate(c, save))
    if (cond.not) return !evaluate(cond.not, save)
    return evalAtom(save, cond)
  }

  const api = { evaluate }
  root.LS = root.LS || {}
  root.LS.expr = api
  if (typeof module !== 'undefined' && module.exports) module.exports = api
})(typeof window !== 'undefined' ? window : globalThis)
