// 把 web/js/data 下的纯数据模块包成 IIFE 并挂到全局 LS
const fs = require('fs')
const path = require('path')

const dir = path.join(__dirname, '..', 'web', 'js', 'data')
const map = {
  'scenes.js': 'scenes',
  'characters.js': 'characters',
  'endings.js': 'endings',
  'report.js': 'report'
}

Object.entries(map).forEach(([file, name]) => {
  const p = path.join(dir, file)
  let src = fs.readFileSync(p, 'utf8')
  if (!/module\.exports\s*=\s*\{/.test(src)) {
    console.log('SKIP (no literal export):', file)
    return
  }
  src = src.replace(/module\.exports\s*=\s*\{/, 'LS.' + name + ' = {')
  const header = ';(function (root) {\n  const LS = (root.LS = root.LS || {})\n'
  const footer =
    '\n  if (typeof module !== "undefined" && module.exports) module.exports = LS.' +
    name +
    '\n})(typeof window !== "undefined" ? window : globalThis)\n'
  fs.writeFileSync(p, header + src + footer)
  console.log('converted:', file)
})
