/**
 * 条件表达式解析器
 *
 * 采用对象形式（而非字符串 DSL），保证剧情数据可纯 JSON 化，
 * 同时避免 eval / new Function，符合小程序安全规范。
 *
 * 支持：
 *   { all: [cond...] }   全部满足
 *   { any: [cond...] }   任一满足
 *   { not: cond }        取反
 *
 * 原子条件：
 *   { attr: 'secrecy', op: '>', value: 40 }
 *   { npc: 'linwan.affection', op: '>=', value: 50 }
 *   { sub: 'selfExpansion', op: '>', value: 30 }
 *   { attach: 'anxiety', op: '>', value: 55 }
 *   { flag: 'met_zhouran' }
 *   { nflag: 'deleted_record' }
 *   { seen: 'n020' }
 *   { choice: { node: 'n010', index: 0 } }
 *   { mechCount: { mech: 'rationalization', op: '>=', value: 3 } }
 */

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
  // path 形如 'linwan.affection'
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
    const fn = OPS[cond.op || '>']
    return fn(readAttr(save, cond.attr), cond.value)
  }
  if (typeof cond.npc === 'string') {
    const fn = OPS[cond.op || '>']
    return fn(readNpc(save, cond.npc), cond.value)
  }
  if (typeof cond.sub === 'string') {
    const fn = OPS[cond.op || '>']
    return fn(readSub(save, cond.sub), cond.value)
  }
  if (typeof cond.attach === 'string') {
    const fn = OPS[cond.op || '>']
    return fn(readAttach(save, cond.attach), cond.value)
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
    const fn = OPS[cond.mechCount.op || '>=']
    return fn(countMech(save, cond.mechCount.mech), cond.mechCount.value)
  }
  return true
}

/**
 * 求值条件
 * @param {Object} cond 条件对象，为空视为恒真
 * @param {Object} save 存档状态
 */
function evaluate(cond, save) {
  if (!cond || Object.keys(cond).length === 0) return true

  if (Array.isArray(cond.all)) {
    return cond.all.every(c => evaluate(c, save))
  }
  if (Array.isArray(cond.any)) {
    return cond.any.some(c => evaluate(c, save))
  }
  if (cond.not) {
    return !evaluate(cond.not, save)
  }
  return evalAtom(save, cond)
}

module.exports = { evaluate }
