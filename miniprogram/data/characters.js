/**
 * 角色档案
 *
 * 设计原则：先写她的伤，再写她的行为。行为是伤的症状。
 * 每个角色的 behaviorRules 都带 because 字段 —— 既驱动行为，
 * 又可在「她的七天」番外中直接作为给玩家看的内容。
 */

module.exports = {
  linwan: {
    id: 'linwan',
    name: '林晚',
    age: 24,
    identity: '同部门后辈',
    attachment: 'preoccupied', // 痴迷型（焦虑型）
    isPartner: false,
    color: '#7B9BB8',
    avatar: 'linwan',

    backstory:
      '从小是家里那个"懂事的孩子"。父母感情冷淡，她是家里的情绪缓冲垫，负责让所有人别吵起来。父亲曾真的离开过一段时间。那段时间她学会了——只要我足够需要你，你就不会走。',
    coreWound: '被抛弃感',
    belief: '只要我足够需要你，你就不会走',
    fear: '被忘记、被抛下、一个人待着',

    drivers: [
      { need: 'connection', weight: 0.9 },
      { need: 'reassurance', weight: 0.7 }
    ],

    behaviorRules: [
      {
        when: { time: 'night', playerContact: 'low' },
        action: 'reach_out',
        because: '独处会激活她的被抛弃感'
      },
      {
        when: { rejected: true },
        action: 'escalate_vulnerability',
        because: '拒绝被她读作"快要被丢下了"，所以必须加大剂量'
      },
      {
        when: { boundarySet: true },
        action: 'panic_apology',
        because: '她真的慌了，不是策略'
      }
    ],

    breakingPoint: {
      when: { playerAbandon: true },
      reveal: '她最后一条消息写了又删，删了十一次'
    },

    // 番外视角风格
    shadowStyle: '她的时间过得比你慢。你的一分钟，是她的十分钟。',

    // 「你读懂她了吗」
    misread: '你以为林晚是故意的。',
    insight: '其实她只是怕一个人待着。',

    // 角色匹配向量 [心动, 暧昧, 100-边界感, 隐瞒, 寄托, 被需要感, 愧疚, 100-纽带]
    vector: [70, 75, 75, 25, 85, 55, 60, 45]
  },

  shenjia: {
    id: 'shenjia',
    name: '沈迦',
    age: 32,
    identity: '合作方前辈',
    attachment: 'dismissing', // 疏离型（回避型）
    isPartner: false,
    color: '#B88C7B',
    avatar: 'shenjia',

    backstory:
      '曾经为一段感情几乎放弃了自己，最后还是被辜负。此后她把"不依赖任何人"当成人生成就。她强、体面、出手大方，但她给得出一切，除了她自己。',
    coreWound: '付出后被全盘否定',
    belief: '我可以给你一切，除了我自己',
    fear: '失控、被需要到无法抽身',

    drivers: [
      { need: 'control', weight: 0.85 },
      { need: 'admiration', weight: 0.7 }
    ],

    behaviorRules: [
      {
        when: { playerCloser: true },
        action: 'step_back',
        because: '靠近等于危险，她必须先退半步'
      },
      {
        when: { topic: 'commitment' },
        action: 'deflect',
        because: '承诺话题会让她失去主动权'
      },
      {
        when: { mentionPartner: true },
        action: 'subtle_downgrade',
        because: '贬低许念不是为了抢你，是为了证明"亲密关系都靠不住"'
      }
    ],

    breakingPoint: {
      when: { playerSacrifice: true },
      reveal: '你真的为她放弃一切的那天，她先怕了。她推开你的时候，手是抖的。'
    },

    shadowStyle: '她给你的一切都经过计算，只有一件事没算到——你会当真。',

    misread: '你以为沈迦在玩你。',
    insight: '其实她只是不敢要。她看起来最强，其实最怕。',

    vector: [50, 65, 45, 70, 25, 60, 20, 60]
  },

  zhouran: {
    id: 'zhouran',
    name: '周然',
    age: 26,
    identity: '前任',
    attachment: 'fearful', // 恐惧型（混乱型）
    isPartner: false,
    color: '#9B8BB8',
    avatar: 'zhouran',

    backstory:
      '当年分手不是因为不爱，是因为两个人都太年轻，都太不会。她一直觉得是时机不对。这些年她过得很普通，唯一比现在好的东西，都在那几年里。',
    coreWound: '一场没有做完的告别',
    belief: '如果当时再努力一点点……',
    fear: '确认那段感情真的死了',

    drivers: [
      { need: 'continuity', weight: 0.8 },
      { need: 'validation', weight: 0.65 }
    ],

    behaviorRules: [
      {
        when: { askedFuture: true },
        action: 'silence',
        because: '她答不上来。她自己也真的不知道想要什么'
      },
      {
        when: { topic: 'past' },
        action: 'deepen_memory',
        because: '她只在那段时间里是完整的'
      },
      {
        when: { askedPresent: true },
        action: 'avoid',
        because: '她怕答案是"你现在过得很好"'
      }
    ],

    breakingPoint: {
      when: { askedWhatYouWant: true },
      reveal: '她张了张嘴，最后说：我也不知道。'
    },

    shadowStyle: '她反复提起的从来不是你，是那几年的她自己。',

    misread: '你以为周然想复合。',
    insight: '其实她只是想确认自己没有被浪费。',

    vector: [75, 55, 60, 45, 55, 45, 70, 55]
  },

  xunian: {
    id: 'xunian',
    name: '许念',
    age: 27,
    identity: '你的伴侣',
    attachment: 'secure', // 安全型，但很累
    isPartner: true,
    color: '#8FA98B',
    avatar: 'xunian',

    backstory:
      '这段关系里，稳定一直是她在维持。她也有自己的疲惫、自己的不被看见，只是她从来说——因为她不想成为你的负担。她察觉了这七天里几乎所有异常，她只是没问。',
    coreWound: '长期不被看见',
    belief: '我不能成为他的负担',
    fear: '冲突，以及确认自己猜的是真的',

    drivers: [
      { need: 'stability', weight: 0.75 },
      { need: 'being_seen', weight: 0.6 }
    ],

    behaviorRules: [
      {
        when: { suspicion: true },
        action: 'not_ask',
        because: '不是不在乎，是怕答案'
      },
      {
        when: { sharing: true, playerResponse: 'low' },
        action: 'share_less',
        because: '分享过几次，你没接住'
      }
    ],

    breakingPoint: {
      when: { finalNight: true },
      reveal: '这七天，她什么都知道。'
    },

    shadowStyle: '她在你看不到的地方，把这七天重新看了一遍。',

    misread: '你以为许念什么都不知道。',
    insight: '其实她一直在看。她是这个游戏里最被误解的人。',

    vector: [45, 20, 30, 15, 40, 30, 35, 25]
  },

  _order: ['linwan', 'shenjia', 'zhouran', 'xunian']
}
