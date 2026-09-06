// 检查所有节点的 next / choice.next / next_if / branch_if 引用都存在（e_ 开头为结局，允许）
require('../js/data/scenes.js')
const s = globalThis.LS.scenes
let bad = 0
let refs = 0
Object.values(s).forEach(n => {
  if (n.next) { refs++; if (!s[n.next] && n.next[0] !== 'e') { console.log('DANGLING', n.id, '->', n.next); bad++ } }
  if (Array.isArray(n.choices)) n.choices.forEach(c => {
    if (c.next) { refs++; if (!s[c.next] && c.next[0] !== 'e') { console.log('DANGLING', n.id, 'choice ->', c.next); bad++ } }
    if (Array.isArray(c.next_if)) c.next_if.forEach(r => { refs++; if (!s[r.next] && r.next[0] !== 'e') { console.log('DANGLING', n.id, 'next_if ->', r.next); bad++ } })
  })
  if (Array.isArray(n.branch_if)) n.branch_if.forEach(r => { refs++; if (!s[r.next] && r.next[0] !== 'e') { console.log('DANGLING', n.id, 'branch_if ->', r.next); bad++ } })
})
console.log(bad ? ('发现 ' + bad + ' 处悬空引用') : ('图完整性 OK，共 ' + refs + ' 条 next 引用，节点数 ' + Object.keys(s).length))
process.exit(bad ? 1 : 0)
