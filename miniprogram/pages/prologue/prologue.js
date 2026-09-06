const engine = require('../../utils/engine.js')

const RELATIONS = [
  {
    key: 'passion',
    title: '热恋',
    desc: '你们还在那种"明天也见一面吧"的阶段。'
  },
  {
    key: 'plain',
    title: '平淡',
    desc: '没什么问题，也没什么话说。日子就是这么过的。'
  },
  {
    key: 'tired',
    title: '疲惫',
    desc: '最近吵架变多了。你有点不知道该怎么聊下去。'
  }
]

Page({
  data: {
    step: 0,
    gender: '',
    relation: '',
    relations: RELATIONS
  },

  onGender(e) {
    this.setData({ gender: e.currentTarget.dataset.v, step: 1 })
  },

  onRelation(e) {
    this.setData({ relation: e.currentTarget.dataset.v })
  },

  onBack() {
    this.setData({ step: 0 })
  },

  onStart() {
    const { gender, relation } = this.data
    if (!relation) return
    const save = engine.createSave({ gender, relation })
    engine.persist(save)
    wx.redirectTo({ url: '/pages/game/game' })
  }
})
