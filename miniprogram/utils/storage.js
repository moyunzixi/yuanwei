/**
 * 本地存档模块 —— 纯 wx Storage，无账号系统、无云端
 */

const KEY_SAVE = 'ls_save_v1'
const KEY_HISTORY = 'ls_history_v1'
const KEY_SETTINGS = 'ls_settings_v1'
const SAVE_VERSION = 1
const HISTORY_LIMIT = 10

function init() {
  try {
    if (wx.getStorageSync(KEY_HISTORY) === '') {
      wx.setStorageSync(KEY_HISTORY, [])
    }
    if (wx.getStorageSync(KEY_SETTINGS) === '') {
      wx.setStorageSync(KEY_SETTINGS, { sound: true, fontSize: 'normal' })
    }
  } catch (e) {
    console.error('[storage] init failed', e)
  }
}

function save(state) {
  try {
    const payload = Object.assign({}, state, { updatedAt: Date.now() })
    wx.setStorageSync(KEY_SAVE, payload)
    return true
  } catch (e) {
    console.error('[storage] save failed', e)
    return false
  }
}

function load() {
  try {
    const data = wx.getStorageSync(KEY_SAVE)
    if (!data || data === '') return null
    // 版本迁移占位：后续结构变更时在此处理
    if (data.version !== SAVE_VERSION) return migrate(data)
    return data
  } catch (e) {
    console.error('[storage] load failed', e)
    return null
  }
}

function migrate(data) {
  // 目前仅一个版本，直接返回；后续新增版本时在此补充转换逻辑
  return Object.assign({}, data, { version: SAVE_VERSION })
}

function clearSave() {
  try {
    wx.removeStorageSync(KEY_SAVE)
    return true
  } catch (e) {
    return false
  }
}

function hasSave() {
  const s = load()
  return !!(s && s.current)
}

function addHistory(report) {
  try {
    const list = wx.getStorageSync(KEY_HISTORY) || []
    list.unshift(Object.assign({ createdAt: Date.now() }, report))
    wx.setStorageSync(KEY_HISTORY, list.slice(0, HISTORY_LIMIT))
    return true
  } catch (e) {
    console.error('[storage] addHistory failed', e)
    return false
  }
}

function getHistory() {
  try {
    return wx.getStorageSync(KEY_HISTORY) || []
  } catch (e) {
    return []
  }
}

function clearHistory() {
  try {
    wx.setStorageSync(KEY_HISTORY, [])
    return true
  } catch (e) {
    return false
  }
}

function getSettings() {
  try {
    return (
      wx.getStorageSync(KEY_SETTINGS) || { sound: true, fontSize: 'normal' }
    )
  } catch (e) {
    return { sound: true, fontSize: 'normal' }
  }
}

function setSettings(patch) {
  try {
    const cur = getSettings()
    wx.setStorageSync(KEY_SETTINGS, Object.assign({}, cur, patch))
    return true
  } catch (e) {
    return false
  }
}

module.exports = {
  SAVE_VERSION,
  init,
  save,
  load,
  clearSave,
  hasSave,
  addHistory,
  getHistory,
  clearHistory,
  getSettings,
  setSettings
}
