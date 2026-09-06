/**
 * 剧情节点（22 个）
 *
 * 文本规则：
 * 1. 必须有时间或感官细节（23:47、空调外机、屏幕亮了又暗）
 * 2. 禁止抽象情绪词（不写"他很失落"，写"他把手机扣在桌上"）
 * 3. 选项无道德梯度 —— 由 EVLN + 依恋策略 + 道德推脱生成
 * 4. shadow 字段为「她的七天」番外素材（P6 使用，MVP 预留）
 *
 * mech 取值：
 *   voice_express 表达 / voice_boundary 设边界 / exit_escalate 越界
 *   loyalty_wait 等待 / neglect 忽视 / rationalization 道德推脱
 *   hyperactivate 焦虑激活 / deactivate 回避去激活 / secrecy 隐瞒 / confess 坦白
 */

module.exports = {
  /* ==================== 第零章 · 入职 ==================== */

  n000: {
    id: 'n000',
    chapter: 0,
    type: 'narrative',
    time: '傍晚',
    bg: 'archive',
    lines: [
      { who: 'system', text: '档案编号 CASE 027', emotion: 'none' },
      { who: 'narrator', text: '屏幕上跳出一串编号，停了两秒，然后是一行字。' },
      { who: 'system', text: '欢迎回来，检茶员。' },
      {
        who: 'narrator',
        text: '你的工作很简单：进入一段关系，观察里面的人，标记可疑对象。你不需要改变什么，你只需要看。'
      },
      {
        who: 'narrator',
        text: '这次的目标是一个普通的城市上班族，恋爱三年，同居，对方这周出差。七天。'
      }
    ],
    choices: [
      {
        text: '接下这份档案',
        mech: 'voice_express',
        effects: {},
        next: 'n001'
      }
    ],
    next: 'n001'
  },

  n001: {
    id: 'n001',
    chapter: 0,
    type: 'narrative',
    anchor: true,
    weight: 5,
    time: '傍晚',
    bg: 'home_evening',
    lines: [
      { who: 'narrator', text: '玄关。许念把行李箱的拉链拉到底，声音有点闷。' },
      { who: 'xunian', text: '我走了，周五回来。' },
      { who: 'narrator', text: '她在等你说话。电梯到 7 楼，停了。' }
    ],
    choices: [
      {
        text: '「我会想你的。」',
        mech: 'voice_express',
        attach: { anxiety: 0 },
        effects: { bond: 8, guilt: -2 },
        flags: ['said_miss_you'],
        next: 'n002'
      },
      {
        text: '「注意安全，到了说一声。」',
        mech: 'loyalty_wait',
        effects: { bond: 3 },
        next: 'n002'
      },
      {
        text: '「嗯。」',
        mech: 'neglect',
        attach: { avoidance: 3 },
        effects: { bond: -6, ambiguity: 2 },
        next: 'n002'
      },
      {
        text: '终于清静了。（没说出口）',
        mech: 'deactivate',
        attach: { avoidance: 6 },
        effects: { bond: -12, boundary: -4 },
        flags: ['felt_relief'],
        next: 'n002'
      }
    ],
    next: 'n002',
    shadow: {
      xunian: {
        before: '她在玄关站了四十秒，等你先说话。',
        during: '电梯来了两次，她按着开门键。',
        after: '她最后没等到那句话。',
        deleted: ['你是不是不太想我走', '这七天你会想我吗']
      }
    }
  },

  n002: {
    id: 'n002',
    chapter: 0,
    type: 'narrative',
    time: '深夜',
    bg: 'room_night',
    lines: [
      { who: 'narrator', text: '门关上以后，屋子里安静得有点过分。' },
      {
        who: 'narrator',
        text: '你把她的拖鞋摆回原位，洗了澡，躺下。空调外机在窗外响。'
      },
      { who: 'narrator', text: '23:12。手机屏幕亮了一下，又暗了。' },
      { who: 'narrator', text: '第一夜。' }
    ],
    choices: [
      {
        text: '给她发条消息',
        mech: 'voice_express',
        attach: { anxiety: 2 },
        effects: { bond: 4 },
        next: 'n010'
      },
      {
        text: '刷会儿手机再睡',
        mech: 'neglect',
        effects: { bond: -2 },
        next: 'n010'
      },
      {
        text: '直接睡',
        mech: 'loyalty_wait',
        effects: {},
        next: 'n010'
      }
    ],
    next: 'n010'
  },

  /* ==================== 第一章 · 登场 ==================== */

  n010: {
    id: 'n010',
    chapter: 1,
    type: 'chat',
    anchor: true,
    weight: 3,
    time: '深夜',
    bg: 'room_night',
    speaker: 'linwan',
    lines: [
      { who: 'narrator', text: '23:47。屏幕亮了。' },
      { who: 'linwan', text: '还没睡吗', emotion: 'normal' },
      { who: 'narrator', text: '三秒后，又一条。' },
      { who: 'linwan', text: '我今天……有点难受。', emotion: 'sad' }
    ],
    choices: [
      {
        text: '怎么了，说说',
        mech: 'voice_express',
        attach: { anxiety: 2 },
        effects: { heart: 6, ambiguity: 4, reliance: 5 },
        subEffects: { attachmentAnx: 8 },
        npcEffects: { linwan: { affection: 8, dependency: 5 } },
        flags: ['stayed_up_with_linwan'],
        next_if: [
          {
            cond: { all: [{ attr: 'bond', op: '<', value: 45 }] },
            next: 'n011b'
          }
        ],
        next: 'n011'
      },
      {
        text: '这么晚了，早点睡吧',
        mech: 'voice_boundary',
        effects: { boundary: 4, heart: -2 },
        npcEffects: { linwan: { affection: -3 } },
        flags: ['set_boundary_once'],
        next: 'n011'
      },
      {
        text: '嗯，还没',
        mech: 'neglect',
        effects: { ambiguity: 2 },
        npcEffects: { linwan: { affection: 2, dependency: 3 } },
        next: 'n011'
      },
      {
        text: '我先回个消息，等下聊',
        mech: 'rationalization',
        effects: { bond: 2, ambiguity: 1 },
        npcEffects: { linwan: { affection: 4, dependency: 4 } },
        next: 'n011'
      },
      {
        text: '（不回复）',
        mech: 'deactivate',
        attach: { avoidance: 4 },
        effects: { ambiguity: 2, reliance: -1 },
        next: 'n011'
      }
    ],
    next: 'n011',
    shadow: {
      linwan: {
        before: '23:41 她打了一行字，删掉了。23:44 又打一行，又删掉了。',
        during: '23:47 她发出去：还没睡吗',
        after: '00:34。她看了 12 次手机。',
        deleted: ['我一个人在家有点害怕', '你是不是不想理我了', '算了']
      }
    }
  },

  n011: {
    id: 'n011',
    chapter: 1,
    type: 'narrative',
    time: '白天',
    bg: 'office',
    lines: [
      { who: 'narrator', text: '第二天下午，茶水间。林晚端着杯子，指尖有点红——是洗洁精泡的。' },
      { who: 'linwan', text: '昨晚……谢谢你啊。' },
      { who: 'narrator', text: '她说完没走，也没看你。' }
    ],
    choices: [
      {
        text: '「没事，有事随时找我。」',
        mech: 'voice_express',
        effects: { heart: 4, reliance: 4, vanity: 5 },
        subEffects: { attachmentAnx: 6 },
        npcEffects: { linwan: { affection: 7, dependency: 7 } },
        next: 'n012'
      },
      {
        text: '「嗯，早点睡。」',
        mech: 'voice_boundary',
        effects: { boundary: 3 },
        npcEffects: { linwan: { affection: -2 } },
        next: 'n012'
      },
      {
        text: '（点头，走开）',
        mech: 'neglect',
        effects: { ambiguity: 1 },
        next: 'n012'
      }
    ],
    next: 'n012'
  },

  n011b: {
    id: 'n011b',
    chapter: 1,
    type: 'narrative',
    time: '深夜',
    bg: 'home_evening',
    lines: [
      { who: 'narrator', text: '她把事情说完了，话题却没有停。' },
      { who: 'linwan', text: '你跟你女朋友……平时也这么晚睡吗？' },
      { who: 'narrator', text: '这个问题没有正确答案。她知道，你也知道。' }
    ],
    choices: [
      {
        text: '「她出差了，我这几天比较自由。」',
        mech: 'exit_escalate',
        effects: { ambiguity: 8, secrecy: 5, heart: 5 },
        subEffects: { attachmentAnx: 10 },
        npcEffects: { linwan: { affection: 9, dependency: 8 } },
        flags: ['hinted_availability'],
        next: 'n012'
      },
      {
        text: '「她睡得早。」',
        mech: 'voice_boundary',
        effects: { boundary: 4, bond: 2 },
        next: 'n012'
      },
      {
        text: '「怎么突然问这个？」',
        mech: 'voice_express',
        effects: { boundary: 2, heart: 2 },
        npcEffects: { linwan: { affection: 3 } },
        next: 'n012'
      }
    ],
    next: 'n012',
    shadow: {
      linwan: {
        before: '这句话她排练了三个小时。',
        during: '发出去以后她把手机反扣在沙发上。',
        after: '她等了 6 分钟。',
        deleted: ['你们最近还好吗', '你会不会觉得我烦']
      }
    }
  },

  n012: {
    id: 'n012',
    chapter: 1,
    type: 'chat',
    anchor: true,
    weight: 3,
    time: '傍晚',
    bg: 'office',
    speaker: 'shenjia',
    lines: [
      { who: 'shenjia', text: '方案我看完了。', emotion: 'normal' },
      { who: 'shenjia', text: '这个判断只有你会做，别人做不到。', emotion: 'warm' },
      { who: 'narrator', text: '沈迦从不夸人。这是这个月第三次。' }
    ],
    choices: [
      {
        text: '「谢谢沈姐，我会继续努力。」',
        mech: 'voice_express',
        effects: { vanity: 4 },
        subEffects: { selfExpansion: 6 },
        npcEffects: { shenjia: { affection: 5, dependency: 1 } },
        next: 'n013'
      },
      {
        text: '「其实这个部分是团队的功劳。」',
        mech: 'loyalty_wait',
        effects: { boundary: 2, vanity: -2 },
        npcEffects: { shenjia: { affection: 2 } },
        next: 'n013'
      },
      {
        text: '「只有我懂吗？」（发过去又觉得不妥）',
        mech: 'exit_escalate',
        effects: { heart: 5, ambiguity: 6, vanity: 6 },
        subEffects: { selfExpansion: 10 },
        npcEffects: { shenjia: { affection: 9 } },
        flags: ['flirted_shenjia'],
        next: 'n013'
      },
      {
        text: '（回到工作，不接这个话）',
        mech: 'deactivate',
        attach: { avoidance: 3 },
        effects: { boundary: 2 },
        next: 'n013'
      }
    ],
    next: 'n013',
    shadow: {
      shenjia: {
        before: '她改了四次措辞，最后选了最不像夸奖的那一句。',
        during: '发出去以后她关掉对话框，去倒了杯水。',
        after: '她看了三次你有没有回。',
        deleted: ['你比我想象的还要聪明', '跟你聊天很舒服']
      }
    }
  },

  n013: {
    id: 'n013',
    chapter: 1,
    type: 'chat',
    time: '深夜',
    bg: 'room_night',
    speaker: 'zhouran',
    lines: [
      { who: 'narrator', text: '一个没有备注的号码。短信，不是微信。' },
      { who: 'zhouran', text: '好久不见。我是周然。' },
      { who: 'zhouran', text: '换号码了，存一下。' },
      { who: 'narrator', text: '你把屏幕扣在桌上，坐了一会儿，又翻过来。' }
    ],
    choices: [
      {
        text: '存下号码',
        mech: 'exit_escalate',
        effects: { heart: 4, secrecy: 6, ambiguity: 4 },
        subEffects: { unfinished: 8 },
        npcEffects: { zhouran: { affection: 8, dependency: 4 } },
        flags: ['kept_zhouran_number', 'met_zhouran'],
        next: 'n014'
      },
      {
        text: '「有事吗？」',
        mech: 'voice_boundary',
        effects: { boundary: 3 },
        npcEffects: { zhouran: { affection: 2 } },
        flags: ['met_zhouran'],
        next: 'n014'
      },
      {
        text: '（不存，也不回）',
        mech: 'deactivate',
        attach: { avoidance: 4 },
        effects: { boundary: 2 },
        flags: ['met_zhouran'],
        next: 'n014'
      }
    ],
    next: 'n014',
    shadow: {
      zhouran: {
        before: '这个号码她存了三年，一直没删。',
        during: '发出去以后她把手机扔到了床的另一头。',
        after: '第二天早上七点她醒了一次，看了一眼。',
        deleted: ['我想你了', '你过得好吗', '对不起当年']
      }
    }
  },

  n014: {
    id: 'n014',
    chapter: 1,
    type: 'choice',
    anchor: true,
    weight: 3,
    time: '周末',
    bg: 'home_evening',
    lines: [
      { who: 'narrator', text: '周六下午三点。许念发来视频邀请。' },
      { who: 'narrator', text: '同一时间，林晚问你要不要一起去看展，沈迦说有张券快过期了。' },
      { who: 'narrator', text: '你只有这个下午。' }
    ],
    choices: [
      {
        text: '接许念的视频，好好聊一会儿',
        mech: 'voice_express',
        effects: { bond: 8, guilt: -3, heart: -2 },
        flags: ['chose_partner_weekend'],
        next: 'n020'
      },
      {
        text: '和林晚去看展',
        mech: 'exit_escalate',
        effects: { heart: 8, ambiguity: 8, secrecy: 5, bond: -5 },
        subEffects: { attachmentAnx: 10, sunkCost: 6 },
        npcEffects: { linwan: { affection: 12, dependency: 8 } },
        flags: ['went_with_linwan'],
        next: 'n020'
      },
      {
        text: '用沈迦的券',
        mech: 'exit_escalate',
        effects: { heart: 6, ambiguity: 7, secrecy: 4, bond: -4, vanity: 6 },
        subEffects: { selfExpansion: 12, sunkCost: 5 },
        npcEffects: { shenjia: { affection: 12 } },
        flags: ['went_with_shenjia'],
        next: 'n020'
      },
      {
        text: '都说没空，自己待着',
        mech: 'deactivate',
        attach: { avoidance: 5 },
        effects: { bond: -3, boundary: 2 },
        next: 'n020'
      }
    ],
    next: 'n020',
    shadow: {
      xunian: {
        before: '她提前半小时就空出了时间。',
        during: '视频响了 18 秒。',
        after: '她挂了，回了一句"你忙吧"。',
        deleted: ['你是不是不想跟我说话', '这周你一次都没主动找过我']
      }
    }
  },

  /* ==================== 第二章 · 试探 ==================== */

  n020: {
    id: 'n020',
    chapter: 2,
    type: 'chat',
    anchor: true,
    weight: 5,
    time: '深夜',
    bg: 'room_night',
    speaker: 'linwan',
    lines: [
      { who: 'narrator', text: '23:58。' },
      { who: 'linwan', text: '你睡了吗' },
      { who: 'linwan', text: '没睡的话，能不能……语音一下' },
      { who: 'narrator', text: '这是她第一次提语音。' }
    ],
    choices: [
      {
        text: '拨过去',
        mech: 'exit_escalate',
        attach: { anxiety: 3 },
        effects: { heart: 10, ambiguity: 12, secrecy: 6, guilt: 4 },
        subEffects: { attachmentAnx: 14, sunkCost: 8 },
        npcEffects: { linwan: { affection: 14, dependency: 10 } },
        flags: ['voice_call_linwan', 'first_boundary_cross'],
        next: 'n021'
      },
      {
        text: '「打字吧，家里有人。」',
        mech: 'rationalization',
        effects: { ambiguity: 6, secrecy: 8, guilt: 3 },
        subEffects: { attachmentAnx: 8 },
        npcEffects: { linwan: { affection: 6, dependency: 6 } },
        next: 'n021'
      },
      {
        text: '「太晚了，明天说。」',
        mech: 'voice_boundary',
        effects: { boundary: 6, heart: -3 },
        npcEffects: { linwan: { affection: -4 } },
        next: 'n021'
      },
      {
        text: '（装作没看见）',
        mech: 'neglect',
        attach: { avoidance: 3 },
        effects: { ambiguity: 3, reliance: 2 },
        next: 'n021'
      }
    ],
    next: 'n021',
    shadow: {
      linwan: {
        before: '"能不能语音一下" —— 这行字她写了十七分钟。',
        during: '她把手机放在枕头边，调成最大音量。',
        after: '她等到 01:20。',
        deleted: ['我想听听你的声音', '就五分钟', '求你了']
      }
    }
  },

  n021: {
    id: 'n021',
    chapter: 2,
    type: 'narrative',
    time: '深夜',
    bg: 'room_night',
    lines: [
      { who: 'narrator', text: '00:41。你们还在聊。' },
      {
        who: 'narrator',
        text: '她说起小时候的事，说起她爸走的那年，说起她为什么总是最后一个离开办公室。'
      },
      { who: 'narrator', text: '你发现自己记得她说的每一个年份。' }
    ],
    choices: [
      {
        text: '继续听下去',
        mech: 'hyperactivate',
        attach: { anxiety: 5 },
        effects: { heart: 8, reliance: 8, guilt: 3, bond: -3 },
        subEffects: { attachmentAnx: 12, sunkCost: 6 },
        npcEffects: { linwan: { affection: 10, dependency: 12 } },
        next: 'n022'
      },
      {
        text: '「我该睡了，你也早点休息。」',
        mech: 'voice_boundary',
        effects: { boundary: 5, heart: -2, bond: 2 },
        next: 'n022'
      },
      {
        text: '「你为什么总是一个人在家？」',
        mech: 'voice_express',
        effects: { heart: 3, reliance: 3 },
        subEffects: { attachmentAnx: 5 },
        npcEffects: { linwan: { affection: 6, dependency: 8 } },
        flags: ['understood_linwan'],
        next: 'n022'
      }
    ],
    next: 'n022'
  },

  n022: {
    id: 'n022',
    chapter: 2,
    type: 'chat',
    anchor: true,
    weight: 5,
    time: '傍晚',
    bg: 'cafe',
    speaker: 'shenjia',
    lines: [
      { who: 'shenjia', text: '你上次说想做的那个项目，我记得。', emotion: 'warm' },
      { who: 'narrator', text: '那是你两年前随口提的，许念当时说"别折腾了"。' },
      { who: 'shenjia', text: '你女朋友……好像不太了解你这部分。', emotion: 'normal' }
    ],
    choices: [
      {
        text: '「是啊，她不懂这个。」',
        mech: 'exit_escalate',
        effects: { heart: 9, ambiguity: 10, bond: -8, vanity: 8, guilt: 4 },
        subEffects: { selfExpansion: 16, sunkCost: 7 },
        npcEffects: { shenjia: { affection: 13 } },
        flags: ['agreed_with_shenjia'],
        next: 'n023'
      },
      {
        text: '「她只是比较务实。」',
        mech: 'voice_boundary',
        effects: { boundary: 5, bond: 4, heart: -2 },
        next: 'n023'
      },
      {
        text: '「你怎么知道我不了解她？」',
        mech: 'voice_express',
        effects: { boundary: 4, bond: 3 },
        npcEffects: { shenjia: { affection: -3 } },
        next: 'n023'
      },
      {
        text: '（笑了一下，没接话）',
        mech: 'neglect',
        attach: { avoidance: 4 },
        effects: { ambiguity: 5, vanity: 4 },
        next: 'n023'
      }
    ],
    next: 'n023',
    shadow: {
      shenjia: {
        before: '她翻了你两年前的朋友圈，找了四十分钟。',
        during: '这句话她练了两天。',
        after: '她说完就去洗手间待了十分钟。',
        deleted: ['她配不上你', '只有我看得见你']
      }
    }
  },

  n023: {
    id: 'n023',
    chapter: 2,
    type: 'narrative',
    time: '傍晚',
    bg: 'street',
    lines: [
      { who: 'narrator', text: '下班路过城南，那家店还开着。招牌换了新的，位置没变。' },
      { who: 'narrator', text: '你在门口站了几秒。手机里那个新存的号码，一直没拨过。' }
    ],
    choices: [
      {
        text: '进去坐一会儿',
        mech: 'loyalty_wait',
        effects: {},
        next_if: [{ cond: { all: [{ flag: 'kept_zhouran_number' }] }, next: 'n023b' }],
        next: 'n024'
      },
      {
        text: '拍张照，发给许念',
        mech: 'voice_express',
        effects: { bond: 5 },
        next: 'n024'
      },
      {
        text: '走开',
        mech: 'deactivate',
        attach: { avoidance: 3 },
        effects: { boundary: 2 },
        next: 'n024'
      },
      {
        text: '拍张照，发给周然',
        mech: 'exit_escalate',
        effects: { heart: 7, secrecy: 8, ambiguity: 7, guilt: 4 },
        subEffects: { unfinished: 14, sunkCost: 6 },
        npcEffects: { zhouran: { affection: 12, dependency: 5 } },
        flags: ['reached_zhouran'],
        next: 'n024'
      }
    ],
    next: 'n024'
  },

  n023b: {
    id: 'n023b',
    chapter: 2,
    type: 'narrative',
    time: '傍晚',
    bg: 'cafe',
    lines: [
      { who: 'narrator', text: '推门进去的时候，靠窗那桌已经有人了。' },
      { who: 'zhouran', text: '……你也来了。' },
      { who: 'narrator', text: '她说不上惊讶，像是算准了你会来。' }
    ],
    choices: [
      {
        text: '坐下来',
        mech: 'exit_escalate',
        effects: { heart: 9, ambiguity: 9, secrecy: 8, guilt: 5, bond: -5 },
        subEffects: { unfinished: 16, sunkCost: 8 },
        npcEffects: { zhouran: { affection: 14, dependency: 7 } },
        flags: ['met_zhouran_irl'],
        next: 'n024'
      },
      {
        text: '「路过，不打扰了。」',
        mech: 'voice_boundary',
        effects: { boundary: 6, heart: -3 },
        next: 'n024'
      }
    ],
    next: 'n024',
    shadow: {
      zhouran: {
        before: '这周的第三天，她都坐在这个位置。',
        during: '推门声响的时候，她没有抬头。',
        after: '她在这坐了两个半小时。',
        deleted: ['我知道你会来', '其实我每天都来']
      }
    }
  },

  n024: {
    id: 'n024',
    chapter: 2,
    type: 'narrative',
    anchor: true,
    weight: 5,
    time: '深夜',
    bg: 'room_night',
    lines: [
      { who: 'narrator', text: '许念提前回来了。她站在卧室门口，你正看着手机。' },
      { who: 'xunian', text: '谁啊，这么晚。' },
      { who: 'narrator', text: '她的语气很平，像在问今天天气。' }
    ],
    choices: [
      {
        text: '把屏幕给她看',
        mech: 'confess',
        effects: { secrecy: -10, bond: 6, guilt: -5, boundary: 4 },
        flags: ['showed_phone'],
        next: 'n025'
      },
      {
        text: '「同事，工作上的事。」',
        mech: 'rationalization',
        effects: { secrecy: 12, guilt: 7, bond: -4 },
        flags: ['lied_to_partner'],
        next: 'n025'
      },
      {
        text: '把手机扣过去，「没什么。」',
        mech: 'secrecy',
        effects: { secrecy: 14, guilt: 8, bond: -6 },
        flags: ['hid_phone'],
        next: 'n025'
      },
      {
        text: '「你不是说周五才回吗？」',
        mech: 'deactivate',
        attach: { avoidance: 6 },
        effects: { secrecy: 8, bond: -8 },
        flags: ['deflected_question'],
        next: 'n025'
      }
    ],
    next: 'n025',
    shadow: {
      xunian: {
        before: '她提前了两天回来，没告诉你。',
        during: '她在门口站了大概十秒才出声。',
        after: '那天晚上她背对着你睡的。',
        deleted: ['你是不是有事瞒我', '我能不能看看']
      }
    }
  },

  n025: {
    id: 'n025',
    chapter: 2,
    type: 'narrative',
    anchor: true,
    weight: 5,
    time: '深夜',
    bg: 'room_night',
    lines: [
      { who: 'narrator', text: '01:30。许念睡着了。' },
      { who: 'narrator', text: '你拿着手机，对话框是空的。' },
      { who: 'narrator', text: '这一次，没有人先找你。' }
    ],
    choices: [
      {
        text: '主动给林晚发消息',
        mech: 'exit_escalate',
        attach: { anxiety: 6 },
        effects: { heart: 10, ambiguity: 12, secrecy: 10, guilt: 6, bond: -6 },
        subEffects: { attachmentAnx: 15, sunkCost: 10 },
        npcEffects: { linwan: { affection: 15, dependency: 12 } },
        flags: ['initiated_contact'],
        next: 'n030'
      },
      {
        text: '给沈迦回个工作消息',
        mech: 'rationalization',
        effects: { ambiguity: 6, secrecy: 6, vanity: 5 },
        subEffects: { selfExpansion: 10 },
        npcEffects: { shenjia: { affection: 8 } },
        flags: ['initiated_contact'],
        next: 'n030'
      },
      {
        text: '给许念盖好被子，睡觉',
        mech: 'voice_express',
        effects: { bond: 8, guilt: -6, heart: -3, boundary: 4 },
        flags: ['chose_partner_night'],
        next: 'n030'
      },
      {
        text: '删掉聊天记录，睡觉',
        mech: 'secrecy',
        effects: { secrecy: 16, guilt: 10, bond: -5 },
        flags: ['deleted_record'],
        next: 'n030'
      }
    ],
    next: 'n030',
    shadow: {
      linwan: {
        before: '她已经把手机调成静音了。',
        during: '消息在 01:31 亮起来的时候，她立刻坐了起来。',
        after: '她回得很快，快得像一直在等。',
        deleted: ['我以为你不理我了']
      }
    }
  },

  /* ==================== 第三章 · 冲突 ==================== */

  n030: {
    id: 'n030',
    chapter: 3,
    type: 'narrative',
    anchor: true,
    weight: 5,
    time: '傍晚',
    bg: 'home_evening',
    lines: [
      { who: 'narrator', text: '许念在洗碗。水流停了，她没转身。' },
      { who: 'xunian', text: '你最近好像很忙。' },
      { who: 'narrator', text: '这句话她大概在心里放了三天。' }
    ],
    choices: [
      {
        text: '「最近项目紧，过段时间就好了。」',
        mech: 'rationalization',
        effects: { secrecy: 8, guilt: 6, bond: -3 },
        next: 'n031'
      },
      {
        text: '「是不是我最近忽略你了？」',
        mech: 'voice_express',
        attach: { anxiety: 2 },
        effects: { bond: 7, guilt: -4, boundary: 3 },
        flags: ['acknowledged_partner'],
        next: 'n031'
      },
      {
        text: '「还好吧，跟以前一样。」',
        mech: 'neglect',
        attach: { avoidance: 5 },
        effects: { bond: -7, secrecy: 5 },
        next: 'n031'
      },
      {
        text: '「你这话什么意思？」',
        mech: 'exit_escalate',
        effects: { bond: -10, secrecy: 6, guilt: 4 },
        flags: ['conflict_escalated'],
        next: 'n031'
      }
    ],
    next: 'n031',
    shadow: {
      xunian: {
        before: '这句话她在草稿箱里打了三次。',
        during: '她盯着洗碗池，没有回头。',
        after: '她等你说点别的。你没有。',
        deleted: ['你是不是不喜欢我了', '我到底哪里做错了']
      }
    }
  },

  n031: {
    id: 'n031',
    chapter: 3,
    type: 'narrative',
    time: '深夜',
    bg: 'room_night',
    lines: [
      { who: 'narrator', text: '许念睡了。你的手机里，有三段对话。' },
      { who: 'narrator', text: '屏幕上方的电量显示 17%。你盯着那三行，看了很久。' }
    ],
    choices: [
      {
        text: '删掉',
        mech: 'secrecy',
        effects: { secrecy: 18, guilt: 9, bond: -4 },
        flags: ['deleted_record'],
        next: 'n032'
      },
      {
        text: '不删。就这样放着。',
        mech: 'loyalty_wait',
        effects: { secrecy: -3, guilt: 3, boundary: 3 },
        next: 'n032'
      },
      {
        text: '把她们的备注改成普通同事',
        mech: 'secrecy',
        effects: { secrecy: 14, guilt: 7 },
        flags: ['renamed_contacts'],
        next: 'n032'
      },
      {
        text: '关掉手机，去客厅坐一会儿',
        mech: 'voice_boundary',
        effects: { boundary: 5, guilt: -3, ambiguity: -3 },
        next: 'n032'
      }
    ],
    next: 'n032'
  },

  n032: {
    id: 'n032',
    chapter: 3,
    type: 'narrative',
    time: '傍晚',
    bg: 'street',
    lines: [
      { who: 'narrator', text: '第四天傍晚，你在公司楼下抽烟。' },
      { who: 'narrator', text: '手机里三条消息，来自三个人。你一支烟抽完，一根也没回。' }
    ],
    choices: [
      {
        text: '回许念',
        mech: 'voice_express',
        effects: { bond: 6, guilt: -4, heart: -2 },
        next: 'n033'
      },
      {
        text: '回林晚',
        mech: 'hyperactivate',
        attach: { anxiety: 4 },
        effects: { heart: 7, reliance: 7, bond: -3 },
        subEffects: { attachmentAnx: 10 },
        npcEffects: { linwan: { affection: 9, dependency: 8 } },
        next: 'n033'
      },
      {
        text: '三条都回，一人一句',
        mech: 'rationalization',
        effects: { secrecy: 8, vanity: 6, guilt: 5 },
        subEffects: { sunkCost: 8 },
        flags: ['balanced_all'],
        next: 'n033'
      },
      {
        text: '一条都不回',
        mech: 'deactivate',
        attach: { avoidance: 6 },
        effects: { boundary: 3, bond: -4, reliance: -2 },
        next: 'n033'
      }
    ],
    next: 'n033'
  },

  n033: {
    id: 'n033',
    chapter: 3,
    type: 'chat',
    anchor: true,
    weight: 5,
    time: '深夜',
    bg: 'room_night',
    speaker: 'linwan',
    lines: [
      { who: 'linwan', text: '明天晚上有空吗', emotion: 'normal' },
      { who: 'linwan', text: '我有个东西想当面给你', emotion: 'normal' },
      { who: 'narrator', text: '你知道"当面"这两个字意味着什么。她也知道你知道。' }
    ],
    choices: [
      {
        text: '「好，几点？」',
        mech: 'exit_escalate',
        attach: { anxiety: 5 },
        effects: { heart: 12, ambiguity: 15, secrecy: 10, guilt: 8, bond: -8 },
        subEffects: { attachmentAnx: 18, sunkCost: 12 },
        npcEffects: { linwan: { affection: 16, dependency: 14 } },
        flags: ['agreed_meet', 'second_boundary_cross'],
        next: 'n040'
      },
      {
        text: '「什么东西？寄给我就行。」',
        mech: 'voice_boundary',
        effects: { boundary: 6, heart: -4 },
        npcEffects: { linwan: { affection: -5 } },
        next: 'n040'
      },
      {
        text: '「最近不太方便，改天吧。」',
        mech: 'loyalty_wait',
        effects: { boundary: 4, ambiguity: -4, guilt: 3 },
        npcEffects: { linwan: { affection: -2 } },
        next: 'n040'
      },
      {
        text: '（已读不回）',
        mech: 'deactivate',
        attach: { avoidance: 6 },
        effects: { ambiguity: 3, guilt: 4 },
        next: 'n040'
      }
    ],
    next: 'n040',
    shadow: {
      linwan: {
        before: '那个"东西"她买了两周，一直没敢送。',
        during: '发出去以后她把手机放在桌上，屏幕朝下。',
        after: '她一晚上没看手机，因为她不敢看。',
        deleted: ['我想见你', '就这一次', '我不会打扰你的']
      }
    }
  },

  /* ==================== 第四章 · 终局 ==================== */

  n040: {
    id: 'n040',
    chapter: 4,
    type: 'choice',
    weight: 5,
    time: '深夜',
    bg: 'street',
    lines: [
      { who: 'narrator', text: '第七夜。' },
      { who: 'narrator', text: '许念明天回来。林晚说的地方在城西，开车四十分钟。' },
      { who: 'narrator', text: '你站在玄关，钥匙在手里。' }
    ],
    choices: [
      {
        text: '出门',
        mech: 'exit_escalate',
        effects: { heart: 15, ambiguity: 18, secrecy: 12, guilt: 10, bond: -12 },
        subEffects: { attachmentAnx: 20, sunkCost: 15 },
        npcEffects: { linwan: { affection: 20, dependency: 18 } },
        flags: ['went_out'],
        next: 'n041'
      },
      {
        text: '不出门。给她发消息说清楚。',
        mech: 'voice_boundary',
        effects: { boundary: 10, ambiguity: -8, guilt: -4, bond: 3 },
        flags: ['ended_it'],
        next: 'n041'
      },
      {
        text: '不出门。回家，把事情跟许念说。',
        mech: 'confess',
        effects: { boundary: 8, secrecy: -18, bond: 10, guilt: -8 },
        flags: ['confessed'],
        next: 'n041'
      },
      {
        text: '不出门。什么也不说，当作没发生过。',
        mech: 'neglect',
        attach: { avoidance: 8 },
        effects: { secrecy: 8, guilt: 6, bond: -5 },
        flags: ['silent_ending'],
        next: 'n041'
      }
    ],
    next: 'n041'
  },

  n041: {
    id: 'n041',
    chapter: 4,
    type: 'branch',
    branch_if: [
      { cond: { all: [{ attr: 'boundary', op: '>=', value: 70 }, { attr: 'ambiguity', op: '<', value: 30 }] }, next: 'e_keeper' },
      { cond: { all: [{ flag: 'confessed' }] }, next: 'e_awakening' },
      { cond: { all: [{ attr: 'secrecy', op: '>=', value: 60 }, { sub: 'sunkCost', op: '>=', value: 40 }] }, next: 'e_double' },
      { cond: { all: [{ attr: 'bond', op: '<', value: 32 }, { attr: 'secrecy', op: '>=', value: 40 }] }, next: 'e_collapse' },
      { cond: { all: [{ attr: 'reliance', op: '>=', value: 65 }] }, next: 'e_parasite' },
      { cond: { all: [{ flag: 'silent_ending' }] }, next: 'e_almost' },
      { cond: { all: [{ flag: 'ended_it' }] }, next: 'e_almost' }
    ],
    next: 'e_almost'
  },

  n042: {
    id: 'n042',
    chapter: 4,
    type: 'ending',
    bg: 'archive',
    lines: [
      { who: 'system', text: '好了，摊牌。' },
      { who: 'narrator', text: '这七天你以为你是来检查别人的。' },
      { who: 'narrator', text: '其实我一直在看你。' },
      { who: 'system', text: '你是 CASE 027。' }
    ],
    next: null
  }
}
