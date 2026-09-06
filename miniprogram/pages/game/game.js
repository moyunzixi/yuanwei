const engine = require('../../utils/engine.js')
const storage = require('../../utils/storage.js')
const characters = require('../../data/characters.js')

// 场景 → 背景图（home_evening 复用夜间房间，后续可补图）
const BG_MAP = {
  room_night: 'bg_room_night',
  home_evening: 'bg_room_night',
  office: 'bg_office',
  cafe: 'bg_cafe',
  street: 'bg_street',
  archive: 'bg_archive'
}

Page({
  data: {
    bg: 'room_night',
    bgUrl: '/images/bg_room_night.jpg',
    charUrl: '',
    charShow: false,
    timeLabel: '',
    shown: [],
    choices: [],
    finished: false
  },

  onLoad() {
    const save = storage.load()
    if (!save || !save.current) {
      wx.redirectTo({ url: '/pages/index/index' })
      return
    }
    this.save = save
    this.render()
  },

  /**
   * 渲染当前节点
   * 对无文本无选项的 branch 节点自动向后推进
   */
  render() {
    if (engine.isFinished(this.save)) {
      this.goResult(this.save.current)
      return
    }

    let save = this.save
    let guard = 0
    while (guard++ < 6) {
      const node = engine.currentNode(save)
      if (!node) break
      const hasLines = Array.isArray(node.lines) && node.lines.length > 0
      const hasChoices = Array.isArray(node.choices) && node.choices.length > 0
      if (hasLines || hasChoices) break
      const next = engine.advance(save)
      if (!next || next.current === save.current) break
      save = next
    }

    this.save = save
    engine.persist(save)

    if (engine.isFinished(save)) {
      this.goResult(save.current)
      return
    }

    const node = engine.currentNode(save)
    if (!node) {
      this.goResult('e_almost')
      return
    }

    this.node = node
    this.allLines = node.lines || []
    this.cursor = 0
    this.charId = ''

    this.setData({
      bg: node.bg || 'room_night',
      bgUrl: '/images/' + (BG_MAP[node.bg] || 'bg_room_night') + '.jpg',
      timeLabel: node.time || '',
      shown: [],
      choices: [],
      finished: false,
      charUrl: '',
      charShow: false
    })
    this.step()
  },

  /** 逐条推进文本 */
  step() {
    if (this.cursor >= this.allLines.length) {
      this.revealChoices()
      return
    }
    const raw = this.allLines[this.cursor]
    this.cursor += 1
    const item = this.decorate(raw)
    this.setData({ shown: this.data.shown.concat([item]) })

    // 立绘随说话角色切换
    if (item.charId && item.charId !== this.charId) {
      this.charId = item.charId
      this.setData({ charUrl: '/images/' + item.charId + '.jpg', charShow: false })
      setTimeout(() => this.setData({ charShow: true }), 30)
    }

    if (this.cursor >= this.allLines.length) {
      this.revealChoices()
    }
  },

  decorate(raw) {
    const who = raw.who || 'narrator'
    if (who === 'narrator') return { isNarrator: true, text: raw.text }
    if (who === 'system') return { isSystem: true, text: raw.text }
    if (who === 'me') return { isMe: true, text: raw.text }
    const c = characters[who]
    return {
      isNarrator: false,
      charId: who,
      name: c ? c.name : who,
      color: c ? c.color : '#8A93A0',
      text: raw.text
    }
  },

  revealChoices() {
    const list = engine.visibleChoices(this.save, this.node)
    this.setData({
      finished: true,
      choices: list.map(x => ({ text: x.choice.text, index: x.index }))
    })
  },

  onTap() {
    if (!this.data.finished) this.step()
  },

  onChoose(e) {
    const index = Number(e.currentTarget.dataset.i)
    if (isNaN(index)) return
    this.save = engine.choose(this.save, index)
    this.render()
  },

  goResult(endingId) {
    engine.persist(this.save)
    wx.redirectTo({ url: '/pages/result/result?ending=' + (endingId || 'e_almost') })
  },

  onQuit() {
    wx.showModal({
      title: '离开这段关系？',
      content: '当前进度会保留，下次可以从档案柜继续。',
      confirmText: '离开',
      cancelText: '留下',
      success: res => {
        if (res.confirm) wx.redirectTo({ url: '/pages/index/index' })
      }
    })
  }
})
