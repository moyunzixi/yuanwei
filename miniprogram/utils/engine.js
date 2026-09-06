/**
 * 游戏状态机
 *
 * 职责：节点推进、选项结算、条件跳转、状态持久化
 * 不负责评分（见 score.js）与模式识别（见 pattern.js）
 */

const scenes = require('../data/scenes.js')
const endings = require('../data/endings.js')
const expr = require('./expr.js')
const attrs = require('./attrs.js')
const storage = require('./storage.js')

const START_NODE = 'n000'

function emptyNpcState() {
  return {
    linwan: { affection: 0, dependency: 0 },
    shenjia: { affection: 0, dependency: 0 },
    zhouran: { affection: 0, dependency: 0 }
  }
}

/**
 * 建立新存档
 * @param {Object} player { gender: 'm'|'f', relation: 'passion'|'plain'|'tired' }
 */
function createSave(player) {
  const p = player || { gender: 'm', relation: 'plain' }
  return {
    version: storage.SAVE_VERSION,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    current: START_NODE,
    chapter: 0,
    player: { gender: p.gender || 'm', relation: p.relation || 'plain', name: p.name || '' },
    attrs: attrs.initialAttrs(p.relation),
    sub: attrs.initialSub(),
    attach: { anxiety: 0, avoidance: 0 },
    npc: emptyNpcState(),
    flags: [],
    seen: [],
    log: [],
    playthrough: 1
  }
}

function getNode(id) {
  return scenes[id] || null
}

function currentNode(save) {
  return getNode(save.current)
}

/**
 * 过滤当前可见选项
 */
function visibleChoices(save, node) {
  if (!node || !Array.isArray(node.choices)) return []
  return node.choices
    .map((choice, index) => ({ choice, index }))
    .filter(item => expr.evaluate(item.choice.visible_if, save))
}

/**
 * 解析下一个节点：优先 next_if 条件链，回退 next
 */
function resolveNext(save, choice) {
  if (choice && Array.isArray(choice.next_if)) {
    for (let i = 0; i < choice.next_if.length; i++) {
      const rule = choice.next_if[i]
      if (expr.evaluate(rule.cond, save) && scenes[rule.next]) {
        return rule.next
      }
    }
  }
  const fallback = choice && choice.next
  return fallback || (node_next(save.current))
}

function node_next(currentId) {
  const node = scenes[currentId]
  return node && node.next ? node.next : null
}

/**
 * 结局节点 id 以 e_ 开头，存放于 endings.js 而非 scenes.js
 */
function isEndingId(id) {
  return typeof id === 'string' && id.indexOf('e_') === 0
}

function isFinished(save) {
  return isEndingId(save && save.current)
}

/**
 * 节点进入时的自动结算（onEnter）
 */
function enterNode(save, nodeId) {
  // 结局节点：只记录，不再有剧情内容
  if (isEndingId(nodeId)) {
    const done = Object.assign({}, save, { current: nodeId, updatedAt: Date.now() })
    if (done.seen.indexOf(nodeId) < 0) {
      done.seen = done.seen.concat([nodeId])
    }
    return done
  }

  const node = scenes[nodeId]
  if (!node) return save

  let next = Object.assign({}, save)
  next.current = nodeId
  next.chapter = node.chapter !== undefined ? node.chapter : next.chapter
  if (next.seen.indexOf(nodeId) < 0) {
    next.seen = next.seen.concat([nodeId])
  }

  const enter = node.onEnter
  if (enter) {
    if (enter.effects) next.attrs = attrs.applyAttrs(next.attrs, enter.effects)
    if (enter.subEffects) next.sub = attrs.applySub(next.sub, enter.subEffects)
    if (enter.npcEffects) next.npc = attrs.applyNpc(next.npc, enter.npcEffects)
    if (Array.isArray(enter.flags)) {
      enter.flags.forEach(f => {
        if (next.flags.indexOf(f) < 0) next.flags = next.flags.concat([f])
      })
    }
  }

  // 每次状态变动后重新推断依恋维度（基于行为日志）
  next.attach = attrs.inferAttachment(next.log)
  next.updatedAt = Date.now()
  return next
}

/**
 * 玩家做出选择
 * @returns {Object} 新的存档状态（纯函数，不修改入参）
 */
function choose(save, choiceIndex) {
  const node = currentNode(save)
  if (!node || !Array.isArray(node.choices)) return save

  const choice = node.choices[choiceIndex]
  if (!choice) return save

  let next = Object.assign({}, save)

  // 1. 属性结算
  if (choice.effects) next.attrs = attrs.applyAttrs(next.attrs, choice.effects)
  if (choice.subEffects) next.sub = attrs.applySub(next.sub, choice.subEffects)
  if (choice.npcEffects) next.npc = attrs.applyNpc(next.npc, choice.npcEffects)

  // 2. 标记
  if (Array.isArray(choice.flags)) {
    choice.flags.forEach(f => {
      if (next.flags.indexOf(f) < 0) next.flags = next.flags.concat([f])
    })
  }

  // 3. 行为日志（后台记录，玩家不可见）
  next.log = next.log.concat([
    {
      node: node.id,
      chapter: node.chapter,
      time: node.time || '',
      choice: choiceIndex,
      text: choice.text,
      mech: choice.mech || '',
      anchor: !!node.anchor,
      weight: node.weight || 1,
      attach: choice.attach || null,
      flags: choice.flags || [],
      delta: choice.effects || null,
      ts: Date.now()
    }
  ])

  // 4. 依恋维度重算
  next.attach = attrs.inferAttachment(next.log)

  // 5. 推进
  const nextId = resolveNext(next, choice)
  if (nextId) {
    next = enterNode(next, nextId)
  }

  return next
}

/**
 * 无选项节点继续推进
 */
function advance(save) {
  const node = currentNode(save)
  if (!node) return save

  if (Array.isArray(node.choices) && node.choices.length > 0) return save

  // 条件分支节点（分支目标可能是结局 id）
  if (Array.isArray(node.branch_if)) {
    for (let i = 0; i < node.branch_if.length; i++) {
      const rule = node.branch_if[i]
      const valid = scenes[rule.next] || isEndingId(rule.next)
      if (expr.evaluate(rule.cond, save) && valid) {
        return enterNode(save, rule.next)
      }
    }
  }

  const nextId = node.next
  if (nextId && (scenes[nextId] || isEndingId(nextId))) {
    return enterNode(save, nextId)
  }
  return save
}

function isEnding(node) {
  return !!(node && (node.type === 'ending' || node.ending))
}

function getEnding(id) {
  return endings[id] || null
}

function persist(save) {
  return storage.save(save)
}

module.exports = {
  START_NODE,
  createSave,
  getNode,
  currentNode,
  visibleChoices,
  choose,
  advance,
  enterNode,
  resolveNext,
  isEndingId,
  isFinished,
  getEnding,
  persist
}
