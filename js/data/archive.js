;(function (root) {
  const LS = (root.LS = root.LS || {})
/**
 * Cross 隐藏成就系统
 *
 * 独立于人物档案和结局评价体系。
 * 不评价玩家"好"还是"坏"。
 * 只记录玩家这一局到底做过什么、错过了什么、同时处理过什么。
 * 不参与结局计算，不改变评分，不改变人物关系。
 *
 * unlock 条件直接复用 LS.expr（支持 attr / npc / flag / choice / seen / mechCount）。
 */

LS.archive = {
  title: 'Cross',
  subtitle: ['特殊记录', '这一页记录的是你做过的事。'],

  records: [
    /* ---- 普通 Cross ---- */

    {
      id: 'CROSS-01',
      title: '同时亮起',
      type: 'normal',
      time: '第六周 · 周六下午',
      unlock: {
        any: [
          { flag: 'chose_partner_weekend' },
          { flag: 'went_with_linwan' },
          { flag: 'went_with_shenyan' }
        ]
      },
      text: [
        '第六周周六下午。',
        '许念、林晚、沈砚同时联系你。',
        '你只有一个下午。',
        '你选了其中一个人。'
      ]
    },

    {
      id: 'CROSS-02',
      title: '一个都没回',
      type: 'normal',
      time: '第六周 · 周六下午',
      unlock: { choice: { node: 'n014', index: 3 } },
      text: [
        '三个人同时找你。',
        '你全部拒绝了。',
        '晚上打开聊天列表，',
        '三个头像都亮着。'
      ]
    },

    {
      id: 'CROSS-03',
      title: '清空',
      type: 'normal',
      time: '第七周 · 深夜',
      unlock: { any: [{ flag: 'deleted_record' }, { choice: { node: 'n031', index: 0 } }] },
      text: [
        '电量 17%。',
        '三段对话。',
        '一次删除。',
        '一共用了不到十秒。'
      ]
    },

    {
      id: 'CROSS-04',
      title: '楼下',
      type: 'hidden',
      time: '第八周 · 最后一夜',
      unlock: { all: [{ flag: 'went_out' }, { choice: { node: 'x040a', index: 1 } }] },
      text: [
        '你已经到了。',
        '车停在楼下。',
        '雨刷还在刮。',
        '最后没有上去。'
      ]
    },

    /* ---- 隐藏 Cross ---- */

    {
      id: 'CROSS-05',
      title: '三条都回了',
      type: 'hidden',
      time: '第七周 · 周日傍晚',
      unlock: { flag: 'balanced_all' },
      text: [
        '三个人。',
        '三句话。',
        '你一个都没落下。',
        '烟也抽完了。'
      ]
    },

    {
      id: 'CROSS-06',
      title: '坦白',
      type: 'hidden',
      time: '第八周 · 最后一天',
      unlock: { flag: 'confessed' },
      text: [
        '你把事情说了。',
        '没有删掉的部分。',
        '没有推给别人。',
        '她说她大概猜到了。'
      ]
    },

    {
      id: 'CROSS-07',
      title: '是你先发的消息',
      type: 'hidden',
      time: '第二周 · 周日深夜',
      unlock: { choice: { node: 'n025', index: 0 } },
      text: [
        '那天晚上，是你先发的消息。',
        '不是她。',
        '你假装只是刚好有空。',
        '但你知道不是。'
      ]
    },

    {
      id: 'CROSS-08',
      title: '没有回复',
      type: 'hidden',
      time: '第七周 · 周日傍晚',
      unlock: { choice: { node: 'n032', index: 3 } },
      text: [
        '三条未读。',
        '你一条都没回。',
        '手机屏幕灭了。',
        '你没有再看。'
      ]
    },

    {
      id: 'CROSS-09',
      title: '标记',
      type: 'hidden',
      time: '第七周 · 深夜',
      unlock: { flag: 'renamed_contacts' },
      text: [
        '你把她们的备注改成了普通同事。',
        '改完以后，你翻了一遍聊天记录。',
        '没什么变化。',
        '除了那三个名字。'
      ]
    },

    {
      id: 'CROSS-10',
      title: '四个人的八周',
      type: 'rare',
      time: '八周 · 全记录',
      unlock: {
        all: [
          { choice: { node: 'n010', index: 0 } },
          { choice: { node: 'n012b', index: 0 } },
          { any: [{ flag: 'kept_zhouran_number' }, { flag: 'called_zhouran' }] },
          { choice: { node: 'n024', index: 0 } }
        ]
      },
      text: [
        '八周里，你见过四个人不一样的样子。',
        '林晚在深夜给你发过消息。',
        '沈砚在办公室跟你讲过她的故事。',
        '周然把旧物寄回给你。',
        '许念把手机放在你面前。',
        '只有一个人的样子，是你自己的。'
      ]
    }
  ],

  unknown: {
    id: 'UNKNOWN-00',
    title: 'CASE 027',
    type: 'unknown',
    unlock: { seen: 'n042' },
    text: [
      '你已经看完了她们没说出口的话。',
      '也看完了自己做过的事。',
      '现在还有一页。',
      '这一页没有名字。',
      '它不是写给任何人的。',
      '它只是档案的最后一行。',
      '——',
      'CASE 027。',
      '记录结束。'
    ]
  }
}

  if (typeof module !== "undefined" && module.exports) module.exports = LS.archive
})(typeof window !== "undefined" ? window : globalThis)