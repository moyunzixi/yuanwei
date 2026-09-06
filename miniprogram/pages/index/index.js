const storage = require('../../utils/storage.js')

Page({
  data: {
    hasSave: false,
    saveInfo: ''
  },

  onShow() {
    const save = storage.load()
    if (save && save.current) {
      const map = { 0: '序章', 1: '第一夜', 2: '第二夜', 3: '第三夜', 4: '第七夜' }
      this.setData({
        hasSave: true,
        saveInfo: (map[save.chapter] || '进行中') + ' · 已记录 ' + ((save.log && save.log.length) || 0) + ' 次选择'
      })
    } else {
      this.setData({ hasSave: false, saveInfo: '' })
    }
  },

  onNew() {
    wx.navigateTo({ url: '/pages/prologue/prologue' })
  },

  onContinue() {
    wx.navigateTo({ url: '/pages/game/game' })
  },

  onHistory() {
    wx.navigateTo({ url: '/pages/history/history' })
  },

  onAbout() {
    wx.navigateTo({ url: '/pages/about/about' })
  }
})
