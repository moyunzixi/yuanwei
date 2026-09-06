/**
 * 本地存档模块（浏览器版：localStorage）
 * 纯本地、无账号、无云端。
 */
;(function (root) {
  const KEY_SAVE = 'ls_save_v1'
  const KEY_HISTORY = 'ls_history_v1'
  const KEY_SETTINGS = 'ls_settings_v1'
  const SAVE_VERSION = 1
  const HISTORY_LIMIT = 10

  function getRaw(k) {
    try { return localStorage.getItem(k) } catch (e) { return null }
  }
  function setRaw(k, v) {
    try { localStorage.setItem(k, v); return true } catch (e) { return false }
  }

  function init() {
    if (!getRaw(KEY_HISTORY)) setRaw(KEY_HISTORY, JSON.stringify([]))
    if (!getRaw(KEY_SETTINGS)) setRaw(KEY_SETTINGS, JSON.stringify({ sound: true, fontSize: 'normal' }))
  }

  function save(state) {
    return setRaw(KEY_SAVE, JSON.stringify(Object.assign({}, state, { updatedAt: Date.now() })))
  }

  function load() {
    const raw = getRaw(KEY_SAVE)
    if (!raw) return null
    try {
      const data = JSON.parse(raw)
      if (data.version !== SAVE_VERSION) return migrate(data)
      return data
    } catch (e) {
      return null
    }
  }

  function migrate(data) {
    return Object.assign({}, data, { version: SAVE_VERSION })
  }

  function clearSave() {
    try { localStorage.removeItem(KEY_SAVE); return true } catch (e) { return false }
  }

  function hasSave() {
    const s = load()
    return !!(s && s.current)
  }

  function addHistory(item) {
    let list = []
    try { list = JSON.parse(getRaw(KEY_HISTORY) || '[]') } catch (e) { list = [] }
    list.unshift(Object.assign({ createdAt: Date.now() }, item))
    setRaw(KEY_HISTORY, JSON.stringify(list.slice(0, HISTORY_LIMIT)))
    return true
  }

  function getHistory() {
    try { return JSON.parse(getRaw(KEY_HISTORY) || '[]') } catch (e) { return [] }
  }

  function clearHistory() {
    return setRaw(KEY_HISTORY, JSON.stringify([]))
  }

  function getSettings() {
    try { return JSON.parse(getRaw(KEY_SETTINGS) || '{}') } catch (e) { return { sound: true, fontSize: 'normal' } }
  }

  function setSettings(patch) {
    const cur = getSettings()
    return setRaw(KEY_SETTINGS, JSON.stringify(Object.assign({}, cur, patch)))
  }

  const api = {
    SAVE_VERSION, init, save, persist: save, load, clearSave, hasSave,
    addHistory, getHistory, clearHistory, getSettings, setSettings
  }
  root.LS = root.LS || {}
  root.LS.storage = api
  if (typeof module !== 'undefined' && module.exports) module.exports = api
})(typeof window !== 'undefined' ? window : globalThis)
