;(function (root) {
  const LS = (root.LS = root.LS || {})
/**
 * 角色档案
 *
 * 四个人的定位（按关系距离从近到远）：
 *   许念 —— 现女友，恋爱三年，同居
 *   周然 —— 前女友，分手两年后重新联系
 *   林晚 —— 大学认识的朋友，同城，毕业后偶尔来往
 *   沈砚 —— 工作同事，同组资深，项目负责人
 *
 * 设计原则：先写她的处境，再写她的行为。行为是处境的后果，不是性格标签的注脚。
 * 每个角色的 behaviorRules 都带 because 字段 —— 既驱动行为，
 * 又可在「她的八周」番外中直接作为给玩家看的内容。
 *
 * 注：attachment 字段保留，作为底层机制标注，但本版定位更倚重具体处境。
 */

LS.characters = {
  xunian: {
    id: 'xunian',
    name: '许念',
    age: 27,
    identity: '现女友 · 恋爱三年 · 同居',
    attachment: 'secure', // 安全型，但很累
    isPartner: true,
    color: '#5F8A6B',
    avatarF: 'xunian',
    avatarM: 'xunian_m',

    // 处境：稳定一直是她在维持。她不是迟钝，是在那些你手机亮起的夜里，其实都醒着
    backstory:
      '二十七岁，做财务，性格稳。你们在一起三年，同居两年，房子是两个人一起挑的。这段关系里，"稳定"这两个字一直是她在维持：记得交水电费，记得你妈的生日，记得在你情绪不好的时候先退半步。她也有自己的疲惫，她只是从来说——她不想成为你的负担。这次驻场八周，是她主动接的，项目补贴高，她算过账。',
    speech: '口头禅是"没事""你先忙""回来再说"。她不追问，也不把话说满，只是把余地留在那里。',

    coreWound: '长期不被看见',
    belief: '我不能成为他的负担',
    fear: '确认自己猜的是真的',

    drivers: [
      { need: 'stability', weight: 0.75 },
      { need: 'being_seen', weight: 0.6 }
    ],

    behaviorRules: [
      {
        when: { suspicion: true },
        action: 'not_ask',
        because: '不是不在乎，是不想先捅破，给你留最后一点体面'
      },
      {
        when: { sharing: true, playerResponse: 'low' },
        action: 'share_less',
        because: '分享过几次，你没接住，她就把话收回去了'
      }
    ],

    breakingPoint: {
      when: { finalNight: true },
      reveal: '这八周，她什么都知道。'
    },

    shadowStyle: '她在你看不到的地方，把这八周重新看了一遍。',

    misread: '你以为许念什么都不知道。',
    insight: '其实她一直在看。她是这个故事里最被低估的人。',

    // 角色匹配向量 [心动, 暧昧, 100-边界感, 隐瞒, 寄托, 被需要感, 愧疚, 100-纽带]
    vector: [45, 20, 30, 15, 40, 30, 35, 25]
  },

  zhouran: {
    id: 'zhouran',
    name: '周然',
    age: 26,
    identity: '前女友 · 分手两年后又联系上你',
    attachment: 'fearful', // 恐惧型（混乱型）
    isPartner: false,
    color: '#8B7BA8',
    avatarF: 'zhouran',
    avatarM: 'zhouran_m',

    // 处境：不是想复合，是那十一个月是她唯一"被接住"的时光，她想确认它真的存在过
    backstory:
      '二十六岁，做行政。你们在一起十一个月，分手两年。当年不是不爱，是两个人都太年轻，都不会好好说话——吵架时一个冷着脸不说话，一个摔门出去，第二天谁也不提。她后来过得普通：一份不上不下的工作，家里介绍过一个不咸不淡的相亲对象。她不是想复合，是那十一个月里她人生第一次觉得"有人接得住我"，她想确认那十一个月是真的发生过。',
    speech: '说话常常停在半句。不是吊人胃口，是她真的不知道后半句该怎么说。她记得很多小事，尤其是当年没解决的小事。',

    coreWound: '一段没确认就结束的过去',
    belief: '如果当时再努力一点点……',
    fear: '发现那段日子其实什么都不算',

    drivers: [
      { need: 'continuity', weight: 0.8 },
      { need: 'validation', weight: 0.65 }
    ],

    // 她的危险在于"轻"：她不索取任何东西，所以你没有任何拒绝的理由，也就没有防线
    behaviorRules: [
      {
        when: { askedFuture: true },
        action: 'silence',
        because: '她答不上来，连她自己都不知道要什么'
      },
      {
        when: { topic: 'past' },
        action: 'deepen_memory',
        because: '她只在那段日子里是完整的'
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

  linwan: {
    id: 'linwan',
    name: '林晚',
    age: 24,
    identity: '大学同学 · 同城工作 · 毕业后偶尔来往',
    attachment: 'preoccupied', // 痴迷型（焦虑型）
    isPartner: false,
    color: '#6E93B0',
    avatarF: 'linwan',
    avatarM: 'linwan_m',

    // 处境：独居，和家里几乎断了联系。她把"普通的好"当成了稀缺品
    backstory:
      '二十四岁，做设计。你们是大学同学，同届不同专业，在一门选修课上认识的，分组作业被分到了一起。大三那年她爸离家出走过半年，她有一次在图书馆后面的楼梯间哭了半小时，你是唯一一个看见的人——你什么也没问，递了包纸巾，在她旁边坐了十分钟。她记住了这件事。毕业后她留在同城，独居，室友上个月搬走了。她不是缺朋友，她缺的是一个不会突然消失的人。',
    speech: '不太会主动索取，但很会给自己找一个"不算打扰"的理由：顺便、刚好、你有空的话。她越在意，反而越轻。',

    coreWound: '被留下',
    belief: '只要我足够轻、足够不麻烦，你就不会走',
    fear: '成为别人的负担，然后被悄悄挪开',

    drivers: [
      { need: 'connection', weight: 0.9 },
      { need: 'reassurance', weight: 0.7 }
    ],

    // 她的危险在于"无害"：从不逼迫，只是把需要藏得很小，小到你以为可以忽视
    behaviorRules: [
      {
        when: { time: 'night', playerContact: 'low' },
        action: 'reach_out',
        because: '深夜独处会放大她的被抛弃感，她需要确认你还在'
      },
      {
        when: { rejected: true },
        action: 'shrink',
        because: '她不会闹，只会把需要收得更小，小到你以为她不需要了'
      },
      {
        when: { boundarySet: true },
        action: 'apologize_quietly',
        because: '她真的慌了，但不是策略，是怕自己越了界'
      }
    ],

    breakingPoint: {
      when: { playerAbandon: true },
      reveal: '她最后一条消息写了又删，删了十一次，最后发了一句"晚安"'
    },

    shadowStyle: '她的时间比你慢。你的一分钟，是她的十分钟。',

    misread: '你以为林晚是故意的。',
    insight: '其实她只是怕一个人待着。',

    vector: [70, 75, 75, 25, 85, 55, 60, 45]
  },

  shenyan: {
    id: 'shenyan',
    name: '沈砚',
    age: 32,
    identity: '同组资深同事 · 项目负责人',
    attachment: 'dismissing', // 疏离型（回避型）
    isPartner: false,
    color: '#B0806B',
    avatarF: 'shenjia', // 沿用既有素材文件名
    avatarM: 'shenyan_m',

    // 处境：离过一次婚，把资源和人脉投进前夫创业，公司起来那天对方提出离婚
    backstory:
      '三十二岁，同组里资历最深的人，这个项目她是负责人。离过一次婚，不是"为爱放弃自己"的故事——是她把攒了八年的资源和人脉几乎全投进前夫的创业，公司拿到第二轮那天，对方提出了离婚。她没闹，也没争，净身出户。现在她住公司附近的小公寓，开车上下班，午饭常在工位上解决。她强、体面、出手大方，给得出机会、信息和人脉，但那条线她永远自己攥着。',
    speech: '不卖惨，也不拿经历换同情。她知道什么时候该说话，什么时候该闭嘴。她很少问"你为什么没选我"。',

    coreWound: '交付后被清零',
    belief: '我可以给你一切，除了我自己',
    fear: '再一次把底牌亮给别人，然后被收走',

    drivers: [
      { need: 'control', weight: 0.85 },
      { need: 'admiration', weight: 0.7 }
    ],

    // 她的危险在于"体面"：她给你的暧昧是真实的欣赏，但那条退路她先留好
    behaviorRules: [
      {
        when: { playerCloser: true },
        action: 'step_back',
        because: '靠近让她失去掌控感，她必须先退半步'
      },
      {
        when: { topic: 'commitment' },
        action: 'deflect',
        because: '承诺话题会暴露她其实不敢要'
      },
      {
        when: { mentionPartner: true },
        action: 'subtle_downgrade',
        because: '贬低许念不是要抢你，是要证明"亲密关系都不可靠"'
      }
    ],

    breakingPoint: {
      when: { playerSacrifice: true },
      reveal: '你真的为她放弃什么的那天，她先怕了。她推开你的时候，手是抖的。'
    },

    shadowStyle: '她给你的一切都经过计算，只有一件事没算到——你会当真。',

    misread: '你以为沈砚在玩你。',
    insight: '其实她只是不敢要。她看起来最强，其实最怕。',

    vector: [50, 65, 45, 70, 25, 60, 20, 60]
  },

  _order: ['xunian', 'zhouran', 'linwan', 'shenyan']
}

  if (typeof module !== "undefined" && module.exports) module.exports = LS.characters
})(typeof window !== "undefined" ? window : globalThis)
