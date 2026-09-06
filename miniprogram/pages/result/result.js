const score = require('../../utils/score.js')
const storage = require('../../utils/storage.js')
const engine = require('../../utils/engine.js')
const report = require('../../data/report.js')
const characters = require('../../data/characters.js')

Page({
  data: {
    stage: 0, // 0 揭晓 / 1 报告
    rd: null,
    ending: null,
    disclaimer: report.disclaimer,
    closing: report.closing,
    notFate: report.notFate,
    showScience: null
  },

  onLoad(query) {
    const save = storage.load()
    if (!save) {
      wx.redirectTo({ url: '/pages/index/index' })
      return
    }
    const endingId = query.ending || 'e_almost'
    const rd = score.buildReport(save, endingId)
    const ending = engine.getEnding(endingId)

    // 列入往期档案，并标记当前存档已结束
    storage.addHistory({
      index: rd.index,
      rank: rd.rankName,
      ending: endingId,
      endingName: ending ? ending.name : '',
      quadrant: rd.quadrantKey
    })
    storage.save(Object.assign({}, save, { finished: true }))

    this.rd = rd
    this.setData({
      rd,
      ending,
      topMatchName: rd.matches[0] ? rd.matches[0].name : ''
    })
  },

  onRevealDone() {
    this.setData({ stage: 1 }, () => {
      this.drawRadar()
    })
  },

  /** 六维雷达（canvas 2d 自绘，无第三方库） */
  drawRadar() {
    const rd = this.rd
    if (!rd) return
    const values = rd.dimensions.map(d => d.value)
    const labels = rd.dimensions.map(d => d.label)

    wx.createSelectorQuery()
      .in(this)
      .select('#radar')
      .fields({ node: true, size: true })
      .exec(res => {
        const item = res && res[0]
        if (!item || !item.node) return
        const canvas = item.node
        const ctx = canvas.getContext('2d')
        const dpr = wx.getSystemInfoSync().pixelRatio || 2
        const size = item.width
        canvas.width = size * dpr
        canvas.height = size * dpr
        ctx.scale(dpr, dpr)
        ctx.clearRect(0, 0, size, size)

        const cx = size / 2
        const cy = size / 2
        const R = size / 2 - 46
        const n = values.length

        const point = (i, r) => {
          const ang = -Math.PI / 2 + (i * 2 * Math.PI) / n
          return [cx + r * Math.cos(ang), cy + r * Math.sin(ang)]
        }

        // 网格
        for (let ring = 1; ring <= 4; ring++) {
          ctx.beginPath()
          for (let i = 0; i < n; i++) {
            const p = point(i, (R * ring) / 4)
            if (i === 0) ctx.moveTo(p[0], p[1])
            else ctx.lineTo(p[0], p[1])
          }
          ctx.closePath()
          ctx.strokeStyle = 'rgba(230,233,239,0.10)'
          ctx.lineWidth = 1
          ctx.stroke()
        }

        // 轴线
        for (let i = 0; i < n; i++) {
          const p = point(i, R)
          ctx.beginPath()
          ctx.moveTo(cx, cy)
          ctx.lineTo(p[0], p[1])
          ctx.strokeStyle = 'rgba(230,233,239,0.10)'
          ctx.stroke()
        }

        // 数据多边形
        ctx.beginPath()
        for (let i = 0; i < n; i++) {
          const p = point(i, (R * values[i]) / 100)
          if (i === 0) ctx.moveTo(p[0], p[1])
          else ctx.lineTo(p[0], p[1])
        }
        ctx.closePath()
        ctx.fillStyle = 'rgba(200,80,60,0.22)'
        ctx.fill()
        ctx.strokeStyle = '#C8503C'
        ctx.lineWidth = 2
        ctx.stroke()

        // 顶点
        for (let i = 0; i < n; i++) {
          const p = point(i, (R * values[i]) / 100)
          ctx.beginPath()
          ctx.arc(p[0], p[1], 3, 0, Math.PI * 2)
          ctx.fillStyle = '#C8503C'
          ctx.fill()
        }

        // 标签
        ctx.fillStyle = 'rgba(230,233,239,0.62)'
        ctx.font = '11px sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        for (let i = 0; i < n; i++) {
          const p = point(i, R + 26)
          ctx.fillText(labels[i], p[0], p[1])
        }
      })
  },

  onScience(e) {
    const key = e.currentTarget.dataset.k
    const dim = this.rd.dimensions.find(d => d.key === key)
    if (!dim || !dim.science) return
    wx.showModal({
      title: dim.science.title,
      content: dim.science.body,
      showCancel: false,
      confirmText: '知道了'
    })
  },

  onInsight() {
    const c = characters[this.rd.quadrant.character]
    if (!c) return
    wx.showModal({
      title: c.misread,
      content: c.insight,
      showCancel: false,
      confirmText: '……'
    })
  },

  onBackHome() {
    wx.redirectTo({ url: '/pages/index/index' })
  }
})
