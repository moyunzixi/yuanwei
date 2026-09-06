/**
 * 游戏状态机（浏览器/Node 双兼容）
 */
;(function (root) {
  const LS = (root.LS = root.LS || {})
  const scenes = LS.scenes
  const endings = LS.endings
  const expr = LS.expr
  const attrs = LS.attrs
  const storage = LS.storage

  const START_NODE = 'n000'

  function emptyNpcState() {
    return {
      linwan: { affection: 0, dependency: 0 },
      shenjia: { affection: 0, dependency: 0 },
      zhouran: { affection: 0, dependency: 0 }
    }
  }

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

  function getNode(id) { return scenes[id] || null }
  function currentNode(save) { return getNode(save.current) }

  function visibleChoices(save, node) {
    if (!node || !Array.isArray(node.choices)) return []
    return node.choices
      .map((choice, index) => ({ choice, index }))
      .filter(item => expr.evaluate(item.choice.visible_if, save))
  }

  function resolveNext(save, choice) {
    if (choice && Array.isArray(choice.next_if)) {
      for (let i = 0; i < choice.next_if.length; i++) {
        const rule = choice.next_if[i]
        if (expr.evaluate(rule.cond, save) && scenes[rule.next]) return rule.next
      }
    }
    const fallback = choice && choice.next
    return fallback || nodeNext(save.current)
  }

  function nodeNext(currentId) {
    const node = scenes[currentId]
    return node && node.next ? node.next : null
  }

  function isEndingId(id) { return typeof id === 'string' && id.indexOf('e_') === 0 }

  function isFinished(save) { return isEndingId(save && save.current) }

  function enterNode(save, nodeId) {
    if (isEndingId(nodeId)) {
      const done = Object.assign({}, save, { current: nodeId, updatedAt: Date.now() })
      if (done.seen.indexOf(nodeId) < 0) done.seen = done.seen.concat([nodeId])
      return done
    }
    const node = scenes[nodeId]
    if (!node) return save

    let next = Object.assign({}, save)
    next.current = nodeId
    next.chapter = node.chapter !== undefined ? node.chapter : next.chapter
    if (next.seen.indexOf(nodeId) < 0) next.seen = next.seen.concat([nodeId])

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
    next.attach = attrs.inferAttachment(next.log)
    next.updatedAt = Date.now()
    return next
  }

  function choose(save, choiceIndex) {
    const node = currentNode(save)
    if (!node || !Array.isArray(node.choices)) return save
    const choice = node.choices[choiceIndex]
    if (!choice) return save
    let next = Object.assign({}, save)

    if (choice.effects) next.attrs = attrs.applyAttrs(next.attrs, choice.effects)
    if (choice.subEffects) next.sub = attrs.applySub(next.sub, choice.subEffects)
    if (choice.npcEffects) next.npc = attrs.applyNpc(next.npc, choice.npcEffects)
    if (Array.isArray(choice.flags)) {
      choice.flags.forEach(f => {
        if (next.flags.indexOf(f) < 0) next.flags = next.flags.concat([f])
      })
    }
    next.log = next.log.concat([{
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
    }])
    next.attach = attrs.inferAttachment(next.log)
    const nextId = resolveNext(next, choice)
    if (nextId) next = enterNode(next, nextId)
    return next
  }

  function advance(save) {
    const node = currentNode(save)
    if (!node) return save
    if (Array.isArray(node.choices) && node.choices.length > 0) return save

    if (Array.isArray(node.branch_if)) {
      for (let i = 0; i < node.branch_if.length; i++) {
        const rule = node.branch_if[i]
        const valid = scenes[rule.next] || isEndingId(rule.next)
        if (expr.evaluate(rule.cond, save) && valid) return enterNode(save, rule.next)
      }
    }
    const nextId = node.next
    if (nextId && (scenes[nextId] || isEndingId(nextId))) return enterNode(save, nextId)
    return save
  }

  function isEnding(node) { return !!(node && (node.type === 'ending' || node.ending)) }
  function getEnding(id) { return endings[id] || null }
  function persist(save) { return storage.save(save) }

  const api = {
    START_NODE, createSave, getNode, currentNode, visibleChoices,
    choose, advance, enterNode, resolveNext, isEndingId, isFinished,
    getEnding, persist
  }
  LS.engine = api
  if (typeof module !== 'undefined' && module.exports) module.exports = api
})(typeof window !== 'undefined' ? window : globalThis)
