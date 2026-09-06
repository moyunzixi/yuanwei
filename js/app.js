/* global window, document, location */
;(function () {
  'use strict'
  const LS = window.LS
  const engine = LS.engine
  const score = LS.score
  const storage = LS.storage
  const characters = LS.characters
  const endings = LS.endings
  const scenes = LS.scenes
  const report = LS.report

  const $ = sel => document.querySelector(sel)
  const $$ = (sel, ctx) => Array.prototype.slice.call((ctx || document).querySelectorAll(sel))

  const BG_MAP = {
    room_night: 'bg_room_night',
    home_evening: 'bg_room_night',
    office: 'bg_office',
    cafe: 'bg_cafe',
    street: 'bg_street',
    archive: 'bg_archive'
  }

  // ---- 运行时状态 ----
  let game = null // { save, node, allLines, cursor, charId, finished, shown }
  let radarDrawn = false

  // ============ 路由 ============
  function parseQuery(hash) {
    const q = {}
    const i = hash.indexOf('?')
    if (i < 0) return q
    hash.slice(i + 1).split('&').forEach(pair => {
      const kv = pair.split('=')
      if (kv[0]) q[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1] || '')
    })
    return q
  }

  const ROUTES = {
    '#/': 'index',
    '#/prologue': 'prologue',
    '#/game': 'game',
    '#/result': 'result',
    '#/history': 'history',
    '#/about': 'about'
  }

  function activate(name) {
    $$('.view').forEach(v => v.classList.remove('active'))
    const v = document.getElementById('view-' + name)
    if (v) v.classList.add('active')
    window.scrollTo(0, 0)
  }

  function router() {
    const hash = location.hash || '#/'
    const path = hash.split('?')[0]
    const name = ROUTES[path] || 'index'
    radarDrawn = false
    activate(name)
    const fns = {
      index: renderIndex, prologue: renderPrologue, game: gameRender,
      result: renderResult, history: renderHistory, about: renderAbout
    }
    fns[name]()
  }

  // ============ 工具 ============
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, c => (
      { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]
    ))
  }

  function modal(title, body) {
    const mask = document.createElement('div')
    mask.className = 'modal-mask'
    mask.innerHTML =
      '<div class="modal"><h3>' + esc(title) + '</h3><p>' + esc(body) + '</p>' +
      '<button class="btn btn--primary modal__close">知道了</button></div>'
    mask.addEventListener('click', e => {
      if (e.target === mask || e.target.classList.contains('modal__close')) mask.remove()
    })
    document.body.appendChild(mask)
  }

  // ============ 封面 ============
  function renderIndex() {
    const view = $('#view-index')
    const save = storage.load()
    const hasSave = !!(save && save.current && !save.finished)
    let info = ''
    if (hasSave) {
      const dt = new Date(save.createdAt)
      const p2 = n => (n < 10 ? '0' + n : '' + n)
      info = p2(dt.getMonth() + 1) + '/' + p2(dt.getDate()) + ' ' + p2(dt.getHours()) + ':' + p2(dt.getMinutes())
    }
    view.innerHTML =
      '<div class="cover">' +
        '<img class="cover__bg" src="images/bg_archive.jpg" alt="" />' +
        '<div class="cover__mask"></div>' +
        '<div class="cover__content">' +
          '<div class="brand__no">CASE 027</div>' +
          '<div class="brand__name">检茶员</div>' +
          '<div class="brand__sub">第七夜 · 互动阅读</div>' +
          '<div class="hr"></div>' +
          '<div class="notice"><p>你的工作很简单：</p><p>进入一段关系，观察里面的人，</p><p>标记可疑对象。</p></div>' +
          '<div class="actions">' +
            '<button class="btn btn--cta" data-act="new">领取新档案</button>' +
            (hasSave ? '<button class="btn" data-act="continue"><div>继续上次</div><div class="btn__sub">' + esc(info) + '</div></button>' : '') +
            '<button class="btn" data-act="history">往期档案</button>' +
            '<button class="btn btn--ghost" data-act="about">关于</button>' +
          '</div>' +
        '</div>' +
      '</div>'

    view.querySelector('[data-act="new"]').addEventListener('click', () => { location.hash = '#/prologue' })
    if (hasSave) {
      view.querySelector('[data-act="continue"]').addEventListener('click', () => { location.hash = '#/game' })
    }
    view.querySelector('[data-act="history"]').addEventListener('click', () => { location.hash = '#/history' })
    view.querySelector('[data-act="about"]').addEventListener('click', () => { location.hash = '#/about' })
  }

  // ============ 序章 + 开局设置 ============
  function renderPrologue() {
    const view = $('#view-prologue')
    let setup = { gender: 'm', relation: 'plain' }

    view.innerHTML =
      '<div class="prologue__skip" data-act="skip">跳过</div>' +
      '<div class="prologue">' +
        '<div class="prologue__step">SETUP</div>' +
        '<p>在开始之前，先确认你的身份。</p>' +
        '<p>你（玩家）的性别？</p>' +
        '<div class="choices">' +
          '<button class="btn" data-gender="m">男</button>' +
          '<button class="btn" data-gender="f">女</button>' +
        '</div>' +
        '<p style="margin-top:24px">你与 TA 的关系现状？</p>' +
        '<div class="choices">' +
          '<button class="btn" data-rel="passion">热恋中</button>' +
          '<button class="btn" data-rel="plain">平淡稳定</button>' +
          '<button class="btn" data-rel="tired">已经有些疲惫</button>' +
        '</div>' +
        '<div class="prologue__next btn btn--primary" data-act="start">进入档案</div>' +
      '</div>'

    $$('[data-gender]', view).forEach(b => b.addEventListener('click', () => {
      setup.gender = b.getAttribute('data-gender')
      $$('[data-gender]', view).forEach(x => x.style.borderColor = '')
      b.style.borderColor = 'var(--accent)'
    }))
    $$('[data-rel]', view).forEach(b => b.addEventListener('click', () => {
      setup.relation = b.getAttribute('data-rel')
      $$('[data-rel]', view).forEach(x => x.style.borderColor = '')
      b.style.borderColor = 'var(--accent)'
    }))
    view.querySelector('[data-act="skip"]').addEventListener('click', () => {
      storage.clearSave()
      storage.save(engine.createSave({ gender: 'm', relation: 'plain' }))
      location.hash = '#/game'
    })
    view.querySelector('[data-act="start"]').addEventListener('click', () => {
      storage.clearSave()
      const save = engine.createSave(setup)
      storage.save(save)
      location.hash = '#/game'
    })
  }

  // ============ 游戏 ============
  function updateGameEnv() {
    const view = $('#view-game')
    const node = game.node
    const bg = BG_MAP[node.bg] || 'bg_room_night'
    const bgEl = view.querySelector('.game__bg')
    if (bgEl) bgEl.src = 'images/' + bg + '.jpg'
    view.querySelector('.game__top .time').textContent = node.time || ''
  }

  function updateChar(charId) {
    const view = $('#view-game')
    const img = view.querySelector('.game__char')
    img.src = 'images/' + charId + '.jpg'
    img.classList.remove('in')
    // 触发过渡
    requestAnimationFrame(() => requestAnimationFrame(() => img.classList.add('in')))
  }

  function decorate(raw) {
    const who = raw.who || 'narrator'
    if (who === 'narrator') return { isNarrator: true, text: raw.text }
    if (who === 'system') return { isSystem: true, text: raw.text }
    if (who === 'me') return { isMe: true, text: raw.text }
    const c = characters[who]
    return { isNarrator: false, charId: who, name: c ? c.name : who, color: c ? c.color : '#8A93A0', text: raw.text }
  }

  function renderStream() {
    const view = $('#view-game')
    const stream = view.querySelector('.stream__inner')
    stream.innerHTML = game.shown.map((it, idx) => {
      if (it.isSystem) return '<div class="line__system">' + esc(it.text) + '</div>'
      if (it.isNarrator) return '<div class="bubble__text" style="color:#b9c1cd">' + esc(it.text) + '</div>'
      if (it.isMe) return '<div class="bubble bubble--me"><div class="bubble__text">' + esc(it.text) + '</div></div>'
      return '<div class="bubble" style="border-left-color:' + it.color + '">' +
        '<div class="bubble__name" style="color:' + it.color + '">' + esc(it.name) + '</div>' +
        '<div class="bubble__text">' + esc(it.text) + '</div></div>'
    }).join('') + '<div class="pad" style="height:10px"></div>'
    stream.parentElement.scrollTop = stream.parentElement.scrollHeight
  }

  function renderChoices() {
    const view = $('#view-game')
    const box = view.querySelector('.choices')
    const list = engine.visibleChoices(game.save, game.node)
    if (game.finished && list.length) {
      box.innerHTML = list.map(x =>
        '<button class="btn choice" data-i="' + x.index + '">' + esc(x.choice.text) + '</button>'
      ).join('')
      $$('[data-i]', box).forEach(b => b.addEventListener('click', () => {
        game.save = engine.choose(game.save, Number(b.getAttribute('data-i')))
        storage.save(game.save)
        gameRender()
      }))
    } else {
      box.innerHTML = ''
    }
    const hasVis = (game.node && game.node.choices) ? engine.visibleChoices(game.save, game.node).length > 0 : false
    const needContinue = game.finished && !hasVis && !!(game.node && game.node.next)
    view.querySelector('.hint').style.display = (game.finished && !needContinue) ? 'none' : 'block'
  }

  function step() {
    if (game.cursor >= game.allLines.length) { revealChoices(); return }
    const raw = game.allLines[game.cursor++]
    const item = decorate(raw)
    game.shown.push(item)
    renderStream()
    if (item.charId && item.charId !== game.charId) {
      game.charId = item.charId
      updateChar(item.charId)
    }
    if (game.cursor >= game.allLines.length) revealChoices()
  }

  function revealChoices() {
    game.finished = true
    renderChoices()
  }

  function gameRender() {
    const view = $('#view-game')
    if (!view.querySelector('.game__bg')) {
      view.innerHTML =
        '<div class="game">' +
          '<img class="game__bg" src="" alt="" />' +
          '<div class="game__mask"></div>' +
          '<img class="game__char" src="" alt="" />' +
          '<div class="game__layer">' +
            '<div class="game__top"><span class="time t-mono t-dim t-sm"></span>' +
              '<span class="quit">离开</span></div>' +
            '<div class="stream"><div class="stream__inner"></div></div>' +
            '<div class="choices"></div>' +
            '<div class="hint">点击继续</div>' +
          '</div>' +
        '</div>'
      view.querySelector('.quit').addEventListener('click', () => {
        if (confirm('离开这段关系？当前进度会保留。')) location.hash = '#/'
      })
      view.querySelector('.stream').addEventListener('click', () => {
        if (game.finished) {
          const vis = (game.node && game.node.choices) ? engine.visibleChoices(game.save, game.node) : []
          if (vis.length) return
          if (game.node && game.node.next) {
            game.save = engine.advance(game.save)
            storage.save(game.save)
            gameRender()
          }
          return
        }
        step()
      })
    }

    let save = storage.load()
    if (!save || !save.current || save.finished) {
      // 没有有效存档：回封面
      if (!save || !save.current) { location.hash = '#/'; return }
    }
    game = game || {}
    game.save = save

    // 自动推进无文本/无选项的 branch 节点
    let guard = 0
    while (guard++ < 6) {
      const node = engine.currentNode(game.save)
      if (!node) break
      const hasLines = node.lines && node.lines.length > 0
      const hasChoices = node.choices && node.choices.length > 0
      if (hasLines || hasChoices) break
      const next = engine.advance(game.save)
      if (!next || next.current === game.save.current) break
      game.save = next
    }
    storage.persist(game.save)
    if (engine.isFinished(game.save)) { goResult(game.save.current); return }

    game.node = engine.currentNode(game.save)
    game.allLines = game.node.lines || []
    game.cursor = 0
    game.charId = ''
    game.shown = []
    game.finished = false
    updateGameEnv()
    renderStream()
    renderChoices()
    step()
  }

  function goResult(endingId) {
    const save = game ? game.save : storage.load()
    if (!save) { location.hash = '#/'; return }
    const rd = score.buildReport(save, endingId)
    storage.addHistory({
      index: rd.index, rank: rd.rankName, ending: endingId,
      endingName: endings[endingId] ? endings[endingId].name : '',
      quadrant: rd.quadrantKey
    })
    const finished = Object.assign({}, save, { finished: true })
    storage.save(finished)
    location.hash = '#/result?ending=' + endingId
  }

  // ============ 结果 ============
  function renderResult() {
    const view = $('#view-result')
    const q = parseQuery(location.hash)
    const endingId = q.ending || 'e_almost'
    const save = storage.load()
    if (!save) { location.hash = '#/'; return }
    const rd = score.buildReport(save, endingId)
    const ending = endings[endingId]
    const notFate = report.notFate

    const dims = rd.dimensions.map(d =>
      '<div class="dim" data-k="' + d.key + '">' +
        '<div class="dim__label">' + esc(d.label) + '</div>' +
        '<div class="dim__bar"><div class="dim__fill" style="width:' + d.value + '%"></div></div>' +
        '<div class="dim__val">' + d.value + '</div>' +
      '</div>'
    ).join('')

    const replay = rd.replay.map(r =>
      '<div class="replay"><div class="replay__label">' + esc(r.time + r.label) + '</div>' +
      '<div class="replay__text">' + esc(r.text) + '</div></div>'
    ).join('')

    const patterns = rd.patterns.map(p => '<div class="pat">· ' + esc(p.line) + '</div>').join('')

    const matches = rd.matches.map(m =>
      '<div class="match"><div class="match__name">' + esc(m.name) + '</div>' +
      '<div class="match__bar"><div class="match__fill" style="width:' + m.sim + '%"></div></div>' +
      '<div class="match__val">' + m.sim + '%</div></div>'
    ).join('')

    const endingText = ending ? ending.text.map(t => '<div class="ending-line">' + esc(t) + '</div>').join('') : ''

    view.innerHTML =
      '<div class="reveal" data-stage="0">' +
        '<div class="reveal__no">CASE 027</div>' +
        '<div class="reveal__line fade-in">七天，结束了。</div>' +
        '<div class="reveal__line fade-in">这一回，被检的不只是他们。</div>' +
        '<div class="reveal__you">你也在这份档案里。</div>' +
        '<div class="reveal__hint">轻触，继续</div>' +
      '</div>' +
      '<div class="bridge" data-stage="1" style="display:none">' +
        '<div class="bridge__card">' +
          '<div class="bridge__no">RELATIONSHIP ANALYSIS</div>' +
          '<div class="bridge__title">这是一份只属于你的档案</div>' +
          '<p class="bridge__desc">它不会评判你。它会把你这七天的每一次选择，原原本本摊开——包括那些你以为没人看见的。</p>' +
          '<button class="btn btn--cta bridge__open" data-act="open">开启我的档案</button>' +
          '<div class="bridge__sub t-dim t-sm">点击后，报告将基于你刚才的选择实时生成。</div>' +
        '</div>' +
      '</div>' +
      '<div class="report" data-stage="2" style="display:none">' +
        '<div class="sec"><div class="sec__no">RELATIONSHIP ANALYSIS</div>' +
          '<div class="index-row"><div class="index-num">' + rd.index + '</div>' +
          '<div class="index-meta"><div class="rank">' + esc(rd.rankName) + '</div>' +
          '<div class="t-dim t-sm">' + esc(rd.rankLine) + '</div></div></div>' +
          '<div class="t-dim t-sm mt">关系边界指数 · 共记录 ' + rd.stats.totalChoices + ' 次选择</div>' +
        '</div>' +
        '<div class="sec"><div class="radar-wrap"><canvas id="radar" class="radar"></canvas></div></div>' +
        '<div class="sec"><div class="sec__title">各项明细</div>' + dims +
          '<div class="t-dim t-sm mt">（点一下维度名，看看它在测什么）</div></div>' +
        (rd.replay.length ? '<div class="sec"><div class="sec__title">来，回顾一下你的高光时刻</div>' + replay + '</div>' : '') +
        (rd.patterns.length ? '<div class="sec"><div class="sec__title">你的行为路线</div>' + patterns + '</div>' : '') +
        (rd.rationalizationLine ? '<div class="sec"><div class="sec__title">你对自己说过的话</div><div class="pat">' + esc(rd.rationalizationLine) + '</div></div>' : '') +
        '<div class="sec"><div class="sec__title">你更像剧本里的谁</div>' +
          '<div class="quad"><div class="quad__name">' + esc(rd.quadrant.headline) + '</div>' +
          '<div class="quad__line">' + esc(rd.quadrant.line) + '</div>' +
          '<div class="t-dim t-sm mt">' + esc(rd.quadrant.diff) + '</div>' +
          '<div class="t-dim t-sm mt">' + esc(notFate) + '</div>' +
          '<button class="btn btn--ghost mt" data-act="insight">她到底怎么回事？</button></div>' +
          '<div class="hr"></div>' + matches +
        '</div>' +
        (ending ? '<div class="sec"><div class="sec__no">' + esc(ending.subtitle) + '</div>' +
          '<div class="sec__title">' + esc(ending.name) + '</div>' + endingText +
          '<div class="cost"><div class="lbl">代价</div><div class="val t-dim">' + esc(ending.cost) + '</div></div>' +
          '<div class="pat mt">' + esc(ending.note) + '</div></div>' : '') +
        '<div class="sec closing">' + report.closing.map(c => '<p>' + esc(c) + '</p>').join('') + '</div>' +
        '<div class="disclaimer">' + esc(report.disclaimer) + '</div>' +
        '<div class="foot"><button class="btn btn--primary" data-act="home">回到档案柜</button></div>' +
      '</div>'

    // 阶段一：轻触继续
    view.querySelector('.reveal').addEventListener('click', () => {
      view.querySelector('.reveal').style.display = 'none'
      view.querySelector('.bridge').style.display = 'flex'
    })
    // 阶段二：引导页开启报告
    view.querySelector('[data-act="open"]').addEventListener('click', () => {
      view.querySelector('.bridge').style.display = 'none'
      view.querySelector('.report').style.display = 'block'
      drawRadar(rd.dimensions)
    })
    // 维度说明
    $$('.dim', view).forEach(d => d.addEventListener('click', () => {
      const key = d.getAttribute('data-k')
      const dim = rd.dimensions.find(x => x.key === key)
      if (dim && dim.science) modal(dim.science.title, dim.science.body)
    }))
    view.querySelector('[data-act="insight"]').addEventListener('click', () => {
      const c = characters[rd.quadrant.character]
      if (c) modal(c.misread, c.insight)
    })
    view.querySelector('[data-act="home"]').addEventListener('click', () => { location.hash = '#/' })
  }

  function drawRadar(dimensions) {
    if (radarDrawn) return
    const canvas = $('#radar')
    if (!canvas) return
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    const size = Math.max(240, rect.width)
    canvas.width = size * dpr
    canvas.height = size * dpr
    const ctx = canvas.getContext('2d')
    ctx.scale(dpr, dpr)
    ctx.clearRect(0, 0, size, size)

    const cx = size / 2, cy = size / 2, R = size / 2 - 30
    const n = dimensions.length
    const point = (i, r) => {
      const ang = -Math.PI / 2 + (i * 2 * Math.PI) / n
      return [cx + r * Math.cos(ang), cy + r * Math.sin(ang)]
    }

    for (let ring = 1; ring <= 4; ring++) {
      ctx.beginPath()
      for (let i = 0; i < n; i++) {
        const p = point(i, (R * ring) / 4)
        if (i === 0) ctx.moveTo(p[0], p[1]); else ctx.lineTo(p[0], p[1])
      }
      ctx.closePath()
      ctx.strokeStyle = 'rgba(230,233,239,0.10)'
      ctx.lineWidth = 1
      ctx.stroke()
    }
    for (let i = 0; i < n; i++) {
      const p = point(i, R)
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(p[0], p[1])
      ctx.strokeStyle = 'rgba(230,233,239,0.10)'; ctx.stroke()
    }
    ctx.beginPath()
    for (let i = 0; i < n; i++) {
      const p = point(i, (R * dimensions[i].value) / 100)
      if (i === 0) ctx.moveTo(p[0], p[1]); else ctx.lineTo(p[0], p[1])
    }
    ctx.closePath()
    ctx.fillStyle = 'rgba(200,80,60,0.22)'
    ctx.fill()
    ctx.strokeStyle = '#C8503C'
    ctx.lineWidth = 2
    ctx.stroke()
    for (let i = 0; i < n; i++) {
      const p = point(i, (R * dimensions[i].value) / 100)
      ctx.beginPath(); ctx.arc(p[0], p[1], 3, 0, Math.PI * 2); ctx.fillStyle = '#C8503C'; ctx.fill()
    }
    ctx.fillStyle = 'rgba(230,233,239,0.62)'
    ctx.font = '12px sans-serif'
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    for (let i = 0; i < n; i++) {
      const p = point(i, R + 16)
      ctx.fillText(dimensions[i].label, p[0], p[1])
    }
    radarDrawn = true
  }

  // ============ 历史 ============
  function renderHistory() {
    const view = $('#view-history')
    const list = storage.getHistory()
    const QUAD = { secure: '安全型', preoccupied: '痴迷型', dismissing: '疏离型', fearful: '恐惧型' }
    const fmt = ts => {
      const d = new Date(ts)
      const p = n => (n < 10 ? '0' + n : '' + n)
      return p(d.getMonth() + 1) + '/' + p(d.getDate()) + ' ' + p(d.getHours()) + ':' + p(d.getMinutes())
    }
    const cards = list.length ? list.map(item =>
      '<div class="card"><div class="no">CASE · ' + fmt(item.createdAt) + '</div>' +
      '<div class="row"><div class="idx">' + item.index + '</div><div class="card__meta">' +
      '<div class="rank">' + esc(item.rank) + '</div>' +
      '<div class="t-dim t-sm">' + esc(item.endingName) + ' · ' + (QUAD[item.quadrant] || '') + '</div></div></div></div>'
    ).join('') : '<div class="empty"><div>还没有任何档案。</div><div class="t-dim t-sm mt">完成一次《第七夜》，这里会留下记录。</div></div>'

    view.innerHTML =
      '<div class="page-pad"><div class="head"><div class="t-mono">ARCHIVE</div><div class="title">往期档案</div></div>' +
      cards +
      (list.length ? '<div class="foot"><button class="btn btn--ghost" data-act="clear">清除全部记录</button></div>' : '') +
      '<div style="margin-top:24px"><button class="btn" data-act="home">返回</button></div></div>'

    if (list.length) {
      view.querySelector('[data-act="clear"]').addEventListener('click', () => {
        if (confirm('清除往期档案？所有历史记录会被删除，且无法恢复。')) {
          storage.clearHistory(); renderHistory()
        }
      })
    }
    view.querySelector('[data-act="home"]').addEventListener('click', () => { location.hash = '#/' })
  }

  // ============ 关于 ============
  function renderAbout() {
    const view = $('#view-about')
    const refs = report.refs.map(g =>
      '<div class="ref"><div class="ref__group">' + esc(g.group) + '</div>' +
      g.items.map(i => '<div class="ref__item">' + esc(i) + '</div>').join('') + '</div>'
    ).join('')
    view.innerHTML =
      '<div class="page-pad"><div class="head"><div class="t-mono">ABOUT</div><div class="title">关于</div></div>' +
      '<div class="sec"><div class="sec__title">这是什么</div>' +
        '<p class="p">《检茶员》是一款完全本地运行的互动阅读作品。你进入一段虚构关系，做出选择，故事根据你的选择推进。</p>' +
        '<p class="p">全部内容在设备本地运算，不上传任何数据，无需网络，没有账号。</p></div>' +
      '<div class="sec warn-box"><div class="sec__title">重要说明</div>' +
        '<p class="p">本作品是<strong class="strong">娱乐性互动推演</strong>，不是心理测评，不构成任何心理学结论，也不能用于判断真实关系。</p>' +
        '<p class="p">所有人物、情节均为虚构，与现实中的任何人无关。人物的行为逻辑参考了公开发表的心理学研究，但游戏中的测量方式并非标准化量表。</p></div>' +
      '<div class="sec"><div class="sec__title">参考的研究方向</div>' + refs +
        '<div class="t-dim t-sm mt">以上仅为本作品的设计参考，不代表这些研究支持或参与本作品的任何结论。</div></div>' +
      '<div class="sec"><div class="sec__title">数据</div><p class="p t-dim t-sm">进度与历史记录保存在本机浏览器存储中。清除站点数据会一并删除。</p></div>' +
      '<div style="margin-top:20px"><button class="btn" data-act="home">返回</button></div></div>'
    view.querySelector('[data-act="home"]').addEventListener('click', () => { location.hash = '#/' })
  }

  // ============ 启动 ============
  storage.init()
  window.addEventListener('hashchange', router)
  if (!location.hash) location.hash = '#/'
  router()
})()
