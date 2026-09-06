const storage = require('../../utils/storage.js')
const report = require('../../data/report.js')

const QUAD_LABEL = {
  secure: '安全型',
  preoccupied: '痴迷型',
  dismissing: '疏离型',
  fearful: '恐惧型'
}

Page({
  data: {
    list: [],
    empty: true
  },

  onShow() {
    const raw = storage.getHistory()
    const list = raw.map(item => ({
      index: item.index,
      rank: item.rank,
      endingName: item.endingName || '',
      quadrant: QUAD_LABEL[item.quadrant] || '',
      date: this.formatDate(item.createdAt)
    }))
    this.setData({ list, empty: list.length === 0 })
  },

  formatDate(ts) {
    if (!ts) return ''
    const d = new Date(ts)
    const p = n => (n < 10 ? '0' + n : '' + n)
    return p(d.getMonth() + 1) + '/' + p(d.getDate()) + ' ' + p(d.getHours()) + ':' + p(d.getMinutes())
  },

  onClear() {
    wx.showModal({
      title: '清除往期档案？',
      content: '所有历史记录会被删除，且无法恢复。',
      confirmText: '清除',
      confirmColor: '#C8503C',
      success: res => {
        if (res.confirm) {
          storage.clearHistory()
          this.setData({ list: [], empty: true })
        }
      }
    })
  }
})
