const storage = require('./utils/storage.js')

App({
  onLaunch() {
    storage.init()
  },

  onShow() {
    // 纯本地运行，无网络请求
  },

  globalData: {
    // 当前进行中的存档（内存中），落盘由 storage 模块负责
    session: null
  }
})
