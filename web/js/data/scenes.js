;(function (root) {
  const LS = (root.LS = root.LS || {})
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

LS.scenes = {
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
        next: 'x014a'
      },
      {
        text: '和林晚去看展',
        mech: 'exit_escalate',
        effects: { heart: 8, ambiguity: 8, secrecy: 5, bond: -5 },
        subEffects: { attachmentAnx: 10, sunkCost: 6 },
        npcEffects: { linwan: { affection: 12, dependency: 8 } },
        flags: ['went_with_linwan'],
        next: 'x014b'
      },
      {
        text: '用沈迦的券',
        mech: 'exit_escalate',
        effects: { heart: 6, ambiguity: 7, secrecy: 4, bond: -4, vanity: 6 },
        subEffects: { selfExpansion: 12, sunkCost: 5 },
        npcEffects: { shenjia: { affection: 12 } },
        flags: ['went_with_shenjia'],
        next: 'x014c'
      },
      {
        text: '都说没空，自己待着',
        mech: 'deactivate',
        attach: { avoidance: 5 },
        effects: { bond: -3, boundary: 2 },
        next: 'x014d'
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
        next: 'x020a'
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
        next: 'x024a'
      },
      {
        text: '「同事，工作上的事。」',
        mech: 'rationalization',
        effects: { secrecy: 12, guilt: 7, bond: -4 },
        flags: ['lied_to_partner'],
        next: 'x024b'
      },
      {
        text: '把手机扣过去，「没什么。」',
        mech: 'secrecy',
        effects: { secrecy: 14, guilt: 8, bond: -6 },
        flags: ['hid_phone'],
        next: 'x024c'
      },
      {
        text: '「你不是说周五才回吗？」',
        mech: 'deactivate',
        attach: { avoidance: 6 },
        effects: { secrecy: 8, bond: -8 },
        flags: ['deflected_question'],
        next: 'x024d'
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
        next: 'x033a'
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
        next: 'x040a'
      },
      {
        text: '不出门。给她发消息说清楚。',
        mech: 'voice_boundary',
        effects: { boundary: 10, ambiguity: -8, guilt: -4, bond: 3 },
        flags: ['ended_it'],
        next: 'x040b'
      },
      {
        text: '不出门。回家，把事情跟许念说。',
        mech: 'confess',
        effects: { boundary: 8, secrecy: -18, bond: 10, guilt: -8 },
        flags: ['confessed'],
        next: 'x040c'
      },
      {
        text: '不出门。什么也不说，当作没发生过。',
        mech: 'neglect',
        attach: { avoidance: 8 },
        effects: { secrecy: 8, guilt: 6, bond: -5 },
        flags: ['silent_ending'],
        next: 'x040d'
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

  /* ===================== 扩展分支：每个选项后的长串剧情 ===================== */

  x014a: {
    id: 'x014a', chapter: 1, type: 'narrative', time: '深夜', bg: 'home_evening', speaker: 'xunian',
    lines: [
      { who: 'narrator', text: '视频接通，许念把镜头对着酒店的天花板。' },
      { who: 'xunian', text: '你那边好安静。' },
      { who: 'narrator', text: '她没问你在干嘛，但你听得出来，她在等。' }
    ],
    choices: [
      { text: '「想你，每天都想。」', mech: 'voice_express', attach: { anxiety: 2 }, effects: { bond: 8, guilt: -2 }, next: 'x014a2' },
      { text: '「还行，一个人也挺好。」', mech: 'neglect', effects: { bond: -4, ambiguity: 2 }, next: 'x014a2' },
      { text: '「想，但说不上来为什么。」', mech: 'voice_express', attach: { anxiety: 1 }, effects: { bond: 3 }, next: 'x014a2' }
    ],
    next: 'x014a2'
  },
  x014a2: {
    id: 'x014a2', chapter: 1, type: 'narrative', time: '深夜', bg: 'home_evening', speaker: 'xunian',
    lines: [
      { who: 'xunian', text: '……那就好。' },
      { who: 'narrator', text: '她停顿了一下：「那你早点睡，我周五回。」' },
      { who: 'narrator', text: '屏幕里的她把枕头拍了拍，像在给你腾位置。' }
    ],
    choices: [
      { text: '「周五见，等我。」', mech: 'voice_express', effects: { bond: 5 }, next: 'x014a3' },
      { text: '「嗯，路上小心。」', mech: 'loyalty_wait', effects: { bond: 2 }, next: 'x014a3' }
    ],
    next: 'x014a3'
  },
  x014b: {
    id: 'x014b', chapter: 1, type: 'chat', time: '傍晚', bg: 'cafe', speaker: 'linwan',
    lines: [
      { who: 'linwan', text: '这幅……你说它像不像两个人隔着雾？' },
      { who: 'narrator', text: '她讲解的时候，手背蹭到了你的手背。' },
      { who: 'narrator', text: '她没缩回去。' }
    ],
    choices: [
      { text: '（没有躲开）', mech: 'exit_escalate', effects: { heart: 6, ambiguity: 6, secrecy: 4, bond: -3 }, npcEffects: { linwan: { affection: 8, dependency: 5 } }, flags: ['touched_linwan'], next: 'x014b2' },
      { text: '往旁边挪了半步', mech: 'voice_boundary', effects: { boundary: 4, heart: -2 }, next: 'x014b2' },
      { text: '「画挺有意思，我们往前走？」', mech: 'loyalty_wait', effects: { boundary: 2 }, next: 'x014b2' }
    ],
    next: 'x014b2'
  },
  x014b2: {
    id: 'x014b2', chapter: 1, type: 'chat', time: '傍晚', bg: 'cafe', speaker: 'linwan',
    lines: [
      { who: 'linwan', text: '纪念品店那边，帮我看张明信片呗。' },
      { who: 'narrator', text: '她把肩膀靠过来，发梢扫过你下巴。' }
    ],
    choices: [
      { text: '「这张好看，给你。」', mech: 'exit_escalate', effects: { heart: 5, ambiguity: 5, secrecy: 3 }, npcEffects: { linwan: { affection: 6, dependency: 4 } }, next: 'x014b3' },
      { text: '「我还有事，先走了。」', mech: 'voice_boundary', effects: { boundary: 4 }, next: 'x014b3' }
    ],
    next: 'x014b3'
  },
  x014c: {
    id: 'x014c', chapter: 1, type: 'chat', time: '傍晚', bg: 'cafe', speaker: 'shenjia',
    lines: [
      { who: 'shenjia', text: '这家的酒单，我猜你会喜欢。', emotion: 'warm' },
      { who: 'shenjia', text: '你比在工位上松弛多了。', emotion: 'normal' },
      { who: 'narrator', text: '她说"松弛"，像在说一个只有她见过的一面。' }
    ],
    choices: [
      { text: '「跟你在一起才敢放松。」', mech: 'exit_escalate', effects: { heart: 7, ambiguity: 7, secrecy: 4, vanity: 5 }, subEffects: { selfExpansion: 8 }, npcEffects: { shenjia: { affection: 10 } }, flags: ['relaxed_with_shenjia'], next: 'x014c2' },
      { text: '「毕竟这周太累了。」', mech: 'loyalty_wait', effects: { bond: 2 }, next: 'x014c2' },
      { text: '「你也是，别总绷着。」', mech: 'voice_express', effects: { boundary: 2, bond: 2 }, npcEffects: { shenjia: { affection: 3 } }, next: 'x014c2' }
    ],
    next: 'x014c2'
  },
  x014c2: {
    id: 'x014c2', chapter: 1, type: 'chat', time: '傍晚', bg: 'cafe', speaker: 'shenjia',
    lines: [
      { who: 'shenjia', text: '这杯敬——被看见的人。' },
      { who: 'narrator', text: '她举杯，眼睛在灯光里亮了一下。' }
    ],
    choices: [
      { text: '碰杯，一饮而尽', mech: 'exit_escalate', effects: { heart: 4, ambiguity: 4, secrecy: 3 }, npcEffects: { shenjia: { affection: 6 } }, next: 'x014c3' },
      { text: '「我开车，只抿一口。」', mech: 'voice_boundary', effects: { boundary: 4 }, next: 'x014c3' }
    ],
    next: 'x014c3'
  },
  x014d: {
    id: 'x014d', chapter: 1, type: 'narrative', time: '深夜', bg: 'home_evening',
    lines: [
      { who: 'narrator', text: '三个人都回了"没事"，群里安静下来。' },
      { who: 'narrator', text: '你刷到许念发的朋友圈：酒店窗外的城市夜景。' },
      { who: 'narrator', text: '又刷到林晚分享的歌单，叫《一个人》。' }
    ],
    choices: [
      { text: '给许念点赞', mech: 'voice_express', effects: { bond: 4 }, next: 'x014d2' },
      { text: '点开林晚的歌单听', mech: 'exit_escalate', effects: { heart: 4, ambiguity: 4, secrecy: 3 }, npcEffects: { linwan: { affection: 5 } }, next: 'x014d2' },
      { text: '关掉手机，睡觉', mech: 'deactivate', attach: { avoidance: 4 }, effects: { boundary: 3 }, next: 'x014d2' }
    ],
    next: 'x014d2'
  },
  x014d2: {
    id: 'x014d2', chapter: 1, type: 'narrative', time: '深夜', bg: 'home_evening',
    lines: [
      { who: 'narrator', text: '23:30。你翻开聊天列表，三个人的头像并排亮着。' },
      { who: 'narrator', text: '最上面那条，是两小时前林晚发的"睡了"。' }
    ],
    choices: [
      { text: '「还没睡？」发给林晚', mech: 'exit_escalate', effects: { heart: 5, ambiguity: 6, secrecy: 5 }, npcEffects: { linwan: { affection: 7, dependency: 4 } }, next: 'x014d3' },
      { text: '什么都不做，放下手机', mech: 'deactivate', effects: { boundary: 2 }, next: 'x014d3' }
    ],
    next: 'x014d3'
  },
  x020a: {
    id: 'x020a', chapter: 2, type: 'chat', time: '深夜', bg: 'room_night', speaker: 'linwan',
    lines: [
      { who: 'linwan', text: '……你听，外面下雨了。' },
      { who: 'narrator', text: '她的声音比文字轻，像贴着耳朵。' },
      { who: 'linwan', text: '我有点，不想挂。' }
    ],
    choices: [
      { text: '「我在听。」', mech: 'hyperactivate', attach: { anxiety: 3 }, effects: { heart: 8, reliance: 6, guilt: 3, bond: -3 }, subEffects: { attachmentAnx: 10, sunkCost: 5 }, npcEffects: { linwan: { affection: 10, dependency: 8 } }, next: 'x020a2' },
      { text: '「早点睡，明天说。」', mech: 'voice_boundary', effects: { boundary: 5, heart: -2 }, next: 'x020a2' }
    ],
    next: 'x020a2'
  },
  x020a2: {
    id: 'x020a2', chapter: 2, type: 'chat', time: '深夜', bg: 'room_night', speaker: 'linwan',
    lines: [
      { who: 'linwan', text: '你声音比打字好听。' },
      { who: 'narrator', text: '她笑了，那声笑拖得很长。' }
    ],
    choices: [
      { text: '「那以后常打给你。」', mech: 'exit_escalate', effects: { heart: 6, ambiguity: 8, secrecy: 5 }, npcEffects: { linwan: { affection: 8, dependency: 6 } }, next: 'x020a3' },
      { text: '「睡吧，我也困了。」', mech: 'voice_boundary', effects: { boundary: 4 }, next: 'x020a3' }
    ],
    next: 'x020a3'
  },
  x024a: {
    id: 'x024a', chapter: 2, type: 'narrative', time: '深夜', bg: 'room_night', speaker: 'xunian',
    lines: [
      { who: 'narrator', text: '你把手机翻过来，屏幕朝上。' },
      { who: 'xunian', text: '……同事？' },
      { who: 'narrator', text: '她没接，只是把手机轻轻翻回去，塞进你手里。' }
    ],
    choices: [
      { text: '「对不起，这周我有点飘。」', mech: 'voice_express', effects: { bond: 6, guilt: -5, boundary: 3 }, flags: ['apologized'], next: 'x024a3' },
      { text: '「只是同事，真的。」', mech: 'rationalization', effects: { secrecy: 8, guilt: 4, bond: -3 }, next: 'x024a3' }
    ],
    next: 'x024a3'
  },
  x024b: {
    id: 'x024b', chapter: 2, type: 'narrative', time: '深夜', bg: 'room_night', speaker: 'xunian',
    lines: [
      { who: 'xunian', text: '嗯。' },
      { who: 'narrator', text: '她转身去倒水，杯子碰出很轻的一声。' }
    ],
    choices: [
      { text: '「你信我吗？」', mech: 'voice_express', effects: { bond: 5, guilt: -3 }, next: 'x024b3' },
      { text: '（沉默）', mech: 'neglect', attach: { avoidance: 3 }, effects: { bond: -4, secrecy: 3 }, next: 'x024b3' }
    ],
    next: 'x024b3'
  },
  x024c: {
    id: 'x024c', chapter: 2, type: 'narrative', time: '深夜', bg: 'room_night', speaker: 'xunian',
    lines: [
      { who: 'narrator', text: '你扣下手机。她没追问，背对着你洗了杯子。' },
      { who: 'xunian', text: '水有点凉，我帮你热一下。' }
    ],
    choices: [
      { text: '「我去洗澡。」', mech: 'deactivate', effects: { secrecy: 6, bond: -3 }, next: 'x024c3' },
      { text: '「你也早点睡。」', mech: 'voice_express', effects: { bond: 4, boundary: 2 }, next: 'x024c3' }
    ],
    next: 'x024c3'
  },
  x024d: {
    id: 'x024d', chapter: 2, type: 'narrative', time: '深夜', bg: 'room_night', speaker: 'xunian',
    lines: [
      { who: 'xunian', text: '我改签了，想给你个惊喜。' },
      { who: 'narrator', text: '她盯着你两秒，那两秒很长。' }
    ],
    choices: [
      { text: '「怎么不早说。」', mech: 'voice_express', effects: { bond: 3, guilt: -2 }, next: 'x024d3' },
      { text: '「……也好。」', mech: 'neglect', attach: { avoidance: 4 }, effects: { bond: -5, secrecy: 4 }, next: 'x024d3' }
    ],
    next: 'x024d3'
  },
  x033a: {
    id: 'x033a', chapter: 3, type: 'chat', time: '傍晚', bg: 'cafe', speaker: 'linwan',
    lines: [
      { who: 'narrator', text: '城西的店很小，她比你先到。' },
      { who: 'linwan', text: '给你带了东西。' },
      { who: 'narrator', text: '她推过来一个小盒子，没说是生日还是什么。' }
    ],
    choices: [
      { text: '打开看', mech: 'exit_escalate', effects: { heart: 8, ambiguity: 8, secrecy: 6, guilt: 4 }, subEffects: { attachmentAnx: 10, sunkCost: 6 }, npcEffects: { linwan: { affection: 12, dependency: 10 } }, flags: ['opened_gift'], next: 'x033a2' },
      { text: '「先别，外面有人。」', mech: 'voice_boundary', effects: { boundary: 5, heart: -3 }, next: 'x033a2' }
    ],
    next: 'x033a2'
  },
  x033a2: {
    id: 'x033a2', chapter: 3, type: 'chat', time: '傍晚', bg: 'cafe', speaker: 'linwan',
    lines: [
      { who: 'linwan', text: '是一对耳钉，不太贵，但……' },
      { who: 'narrator', text: '她没说完，低头去拆包装。' }
    ],
    choices: [
      { text: '「帮我戴上。」', mech: 'exit_escalate', effects: { heart: 7, ambiguity: 9, secrecy: 7, guilt: 5 }, npcEffects: { linwan: { affection: 10, dependency: 9 } }, next: 'x033a3' },
      { text: '「太贵重了，留着吧。」', mech: 'voice_boundary', effects: { boundary: 5 }, next: 'x033a3' }
    ],
    next: 'x033a3'
  },
  x040a: {
    id: 'x040a', chapter: 4, type: 'narrative', time: '深夜', bg: 'street',
    lines: [
      { who: 'narrator', text: '车开到城西，在楼下你没立刻上楼。' },
      { who: 'narrator', text: '你拨了林晚的电话，响了三声。' }
    ],
    choices: [
      { text: '「我到了，上来吗？」', mech: 'exit_escalate', effects: { heart: 12, ambiguity: 14, secrecy: 10, guilt: 8, bond: -10 }, subEffects: { attachmentAnx: 16, sunkCost: 10 }, npcEffects: { linwan: { affection: 16, dependency: 14 } }, flags: ['went_up'], next: 'x040a3' },
      { text: '「算了，掉头回家。」', mech: 'voice_boundary', effects: { boundary: 8, bond: 4 }, next: 'x040a3' }
    ],
    next: 'x040a3'
  },
  x040b: {
    id: 'x040b', chapter: 4, type: 'narrative', time: '深夜', bg: 'room_night',
    lines: [
      { who: 'narrator', text: '你给林晚发：我们到此为止吧，对不起。' },
      { who: 'narrator', text: '三秒后，她回了一个句号。' }
    ],
    choices: [
      { text: '发完就放下手机', mech: 'voice_boundary', effects: { boundary: 8, ambiguity: -6, guilt: -4, bond: 3 }, next: 'x040b3' },
      { text: '她回句号，你又想解释', mech: 'rationalization', effects: { secrecy: 6, guilt: 4, ambiguity: 4 }, next: 'x040b3' }
    ],
    next: 'x040b3'
  },
  x040c: {
    id: 'x040c', chapter: 4, type: 'narrative', time: '深夜', bg: 'home_evening', speaker: 'xunian',
    lines: [
      { who: 'narrator', text: '许念听完，把手机放下，沉默了很久。' },
      { who: 'xunian', text: '……我大概猜到了。' }
    ],
    choices: [
      { text: '「我先睡沙发。」', mech: 'confess', effects: { boundary: 6, secrecy: -12, bond: 8, guilt: -6 }, next: 'x040c3' },
      { text: '「你要怎么处理都行。」', mech: 'neglect', effects: { bond: -4, secrecy: 4 }, next: 'x040c3' }
    ],
    next: 'x040c3'
  },
  x040d: {
    id: 'x040d', chapter: 4, type: 'narrative', time: '深夜', bg: 'home_evening',
    lines: [
      { who: 'narrator', text: '你坐在客厅，电视没开，到天亮。' },
      { who: 'narrator', text: '凌晨四点，你摸到手机，某个头像还亮着。' }
    ],
    choices: [
      { text: '「假装什么都没发生」', mech: 'neglect', effects: { secrecy: 8, guilt: 6, bond: -5 }, next: 'x040d3' },
      { text: '凌晨给一个人发「在吗」', mech: 'deactivate', effects: { ambiguity: 3, secrecy: 4 }, next: 'x040d3' }
    ],
    next: 'x040d3'
  },

  /* ===================== 第二轮加厚：第3层分支 + 每日独白 ===================== */

  x014a3: {
    id: 'x014a3', chapter: 1, type: 'narrative', time: '深夜', bg: 'home_evening',
    lines: [
      { who: 'narrator', text: '视频挂断后，你盯着黑下来的屏幕。' },
      { who: 'narrator', text: '许念最后那句"周五回"，像一根很细的线，把你这周晃晃悠悠的心思轻轻摁住。' },
      { who: 'narrator', text: '你忽然想起，上一次你们这样安静地说话，是去年冬天她发烧那晚。' }
    ],
    choices: [
      { text: '把今晚的空落记在备忘录里', mech: 'voice_express', attach: { anxiety: 1 }, effects: { bond: 3 }, next: 'd1' },
      { text: '睡了，明天再说', mech: 'deactivate', effects: { boundary: 2 }, next: 'd1' }
    ],
    next: 'd1'
  },
  x014b3: {
    id: 'x014b3', chapter: 1, type: 'chat', time: '夜', bg: 'street', speaker: 'linwan',
    lines: [
      { who: 'narrator', text: '从美术馆出来，天已经全黑。' },
      { who: 'linwan', text: '这张明信片，我留着了。' },
      { who: 'narrator', text: '她没问你为什么一个人来——她好像从来不逼问，只是把空间留给你。' }
    ],
    choices: [
      { text: '「那你呢，为什么一个人来？」', mech: 'exit_escalate', effects: { heart: 4, ambiguity: 4, secrecy: 2 }, npcEffects: { linwan: { affection: 4 } }, next: 'd1' },
      { text: '沉默地送她到地铁口', mech: 'voice_boundary', effects: { boundary: 2 }, next: 'd1' }
    ],
    next: 'd1'
  },
  x014c3: {
    id: 'x014c3', chapter: 1, type: 'chat', time: '夜', bg: 'street', speaker: 'shenjia',
    lines: [
      { who: 'narrator', text: '散场时沈迦把伞往你这边偏了偏。' },
      { who: 'shenjia', text: '下雨了，顺路我送你。' },
      { who: 'narrator', text: '你闻见她身上很淡的木质香水——和工位上那个永远在线的她，不是一个人。' }
    ],
    choices: [
      { text: '「那就麻烦你了。」', mech: 'exit_escalate', effects: { heart: 4, ambiguity: 4, secrecy: 2, vanity: 3 }, npcEffects: { shenjia: { affection: 4 } }, next: 'd1' },
      { text: '「我自己走，谢谢。」', mech: 'voice_boundary', effects: { boundary: 2 }, next: 'd1' }
    ],
    next: 'd1'
  },
  x014d3: {
    id: 'x014d3', chapter: 1, type: 'narrative', time: '深夜', bg: 'home_evening',
    lines: [
      { who: 'narrator', text: '你关了灯，黑暗里三个人的名字轮流冒出来。' },
      { who: 'narrator', text: '许念的"周五回"，林晚的歌单，沈迦那句"被看见的人"。' },
      { who: 'narrator', text: '你第一次觉得，一个人的周末，也可以这么满。' }
    ],
    choices: [
      { text: '翻来覆去到两点', mech: 'neglect', attach: { avoidance: 2 }, effects: { ambiguity: 2 }, next: 'd1' },
      { text: '强迫自己睡去', mech: 'deactivate', effects: { boundary: 1 }, next: 'd1' }
    ],
    next: 'd1'
  },
  x020a3: {
    id: 'x020a3', chapter: 2, type: 'narrative', time: '深夜', bg: 'room_night',
    lines: [
      { who: 'narrator', text: '挂掉电话，雨声还在耳机里。' },
      { who: 'narrator', text: '你翻到和林晚的聊天记录，最后一条停在三天前。' },
      { who: 'narrator', text: '你打了一行"明天见"，看了很久，又删掉。' }
    ],
    choices: [
      { text: '「明天见。」发出去', mech: 'exit_escalate', effects: { heart: 4, ambiguity: 5, secrecy: 3 }, npcEffects: { linwan: { affection: 4, dependency: 3 } }, next: 'd2' },
      { text: '还是没发', mech: 'voice_boundary', effects: { boundary: 2 }, next: 'd2' }
    ],
    next: 'd2'
  },
  x024a3: {
    id: 'x024a3', chapter: 2, type: 'narrative', time: '深夜', bg: 'room_night', speaker: 'xunian',
    lines: [
      { who: 'xunian', text: '……下次，别让我自己发现。' },
      { who: 'narrator', text: '她把脸埋进你肩膀，你闻见她头发上熟悉的洗发水味。' },
      { who: 'narrator', text: '你忽然很庆幸，今晚你没撒那个谎。' }
    ],
    choices: [
      { text: '「不会了。」', mech: 'voice_express', effects: { bond: 4, guilt: -3 }, next: 'd2' },
      { text: '（只是更紧地抱住她）', mech: 'loyalty_wait', effects: { bond: 3 }, next: 'd2' }
    ],
    next: 'd2'
  },
  x024b3: {
    id: 'x024b3', chapter: 2, type: 'narrative', time: '深夜', bg: 'room_night', speaker: 'xunian',
    lines: [
      { who: 'narrator', text: '她没再问，但你看见她把手机放到离你更远的地方。' },
      { who: 'xunian', text: '早点睡吧，明天还要上班。' },
      { who: 'narrator', text: '那句"同事"在你嘴里发苦，像一颗没化开的糖。' }
    ],
    choices: [
      { text: '「嗯，晚安。」', mech: 'neglect', effects: { secrecy: 3, bond: -2 }, next: 'd2' },
      { text: '想补一句却没开口', mech: 'rationalization', effects: { secrecy: 4, ambiguity: 2 }, next: 'd2' }
    ],
    next: 'd2'
  },
  x024c3: {
    id: 'x024c3', chapter: 2, type: 'narrative', time: '深夜', bg: 'room_night', speaker: 'xunian',
    lines: [
      { who: 'narrator', text: '你背对着她洗了把脸，水在指缝间凉得发颤。' },
      { who: 'xunian', text: '水热好了，喝完早点睡。' },
      { who: 'narrator', text: '她越温柔，你越觉得自己刚才那一下扣手机，扣的是自己的退路。' }
    ],
    choices: [
      { text: '「谢谢。」', mech: 'voice_express', effects: { bond: 3 }, next: 'd2' },
      { text: '（没接那杯水）', mech: 'deactivate', effects: { secrecy: 3, bond: -2 }, next: 'd2' }
    ],
    next: 'd2'
  },
  x024d3: {
    id: 'x024d3', chapter: 2, type: 'narrative', time: '深夜', bg: 'room_night', speaker: 'xunian',
    lines: [
      { who: 'narrator', text: '她没接话，转身去浴室，门关得很轻。' },
      { who: 'narrator', text: '你盯着那道门，第一次觉得"想给你惊喜"这句话，也可以是一种温柔的质问。' }
    ],
    choices: [
      { text: '去敲门说对不起', mech: 'voice_express', effects: { bond: 3, guilt: -2 }, next: 'd2' },
      { text: '装作什么都没发生', mech: 'neglect', attach: { avoidance: 3 }, effects: { bond: -3, secrecy: 3 }, next: 'd2' }
    ],
    next: 'd2'
  },
  x033a3: {
    id: 'x033a3', chapter: 3, type: 'chat', time: '夜', bg: 'cafe', speaker: 'linwan',
    lines: [
      { who: 'narrator', text: '耳钉戴上，凉凉的，贴着耳垂。' },
      { who: 'linwan', text: '好看。' },
      { who: 'narrator', text: '她退后半步打量你，眼里有一种你不敢命名的认真。' }
    ],
    choices: [
      { text: '「那我戴着了。」', mech: 'exit_escalate', effects: { heart: 4, ambiguity: 5, secrecy: 3 }, npcEffects: { linwan: { affection: 4 } }, next: 'd3' },
      { text: '「先放你这。」', mech: 'voice_boundary', effects: { boundary: 2 }, next: 'd3' }
    ],
    next: 'd3'
  },
  x040a3: {
    id: 'x040a3', chapter: 4, type: 'narrative', time: '深夜', bg: 'street',
    lines: [
      { who: 'narrator', text: '如果那天你真的上了楼，故事会是另一个样子。' },
      { who: 'narrator', text: '但你在楼下坐了二十分钟，最终把车开回了家。' },
      { who: 'narrator', text: '有些边界，是在"差点越过去"的那一刻，才被你看见的。' }
    ],
    choices: [
      { text: '「还好，我停住了。」', mech: 'voice_boundary', effects: { boundary: 4, bond: 3 }, next: 'd4' },
      { text: '（后悔没上去）', mech: 'exit_escalate', effects: { heart: 3, ambiguity: 4, secrecy: 3 }, next: 'd4' }
    ],
    next: 'd4'
  },
  x040b3: {
    id: 'x040b3', chapter: 4, type: 'narrative', time: '深夜', bg: 'room_night',
    lines: [
      { who: 'narrator', text: '你把那句"到此为止"读了三遍，像在读别人的事。' },
      { who: 'narrator', text: '句号是她回的，不是你。你忽然明白，结束这件事，从来不需要两个人同意。' }
    ],
    choices: [
      { text: '把聊天框删了', mech: 'voice_boundary', effects: { boundary: 4, ambiguity: -3 }, next: 'd4' },
      { text: '留着，反复看', mech: 'rationalization', effects: { ambiguity: 3, secrecy: 2 }, next: 'd4' }
    ],
    next: 'd4'
  },
  x040c3: {
    id: 'x040c3', chapter: 4, type: 'narrative', time: '深夜', bg: 'home_evening', speaker: 'xunian',
    lines: [
      { who: 'xunian', text: '我需要一点时间。' },
      { who: 'narrator', text: '她没有哭，也没有吵，只是把婚戒摘下来，放在茶几上。' },
      { who: 'narrator', text: '那枚戒指反光的一瞬，你比任何时候都清楚自己失去了什么。' }
    ],
    choices: [
      { text: '「我等你。」', mech: 'confess', effects: { boundary: 3, bond: 5, guilt: -4 }, next: 'd4' },
      { text: '（说不出话）', mech: 'neglect', effects: { bond: -2, secrecy: 2 }, next: 'd4' }
    ],
    next: 'd4'
  },
  x040d3: {
    id: 'x040d3', chapter: 4, type: 'narrative', time: '深夜', bg: 'home_evening',
    lines: [
      { who: 'narrator', text: '天快亮时，你听见许念翻身，手搭在了你腰上。' },
      { who: 'narrator', text: '你没动，任由那点温度把你钉在原地——有些事不说出囗，就还能假装没发生。' }
    ],
    choices: [
      { text: '（闭上眼，继续装睡）', mech: 'neglect', effects: { secrecy: 4, bond: -2 }, next: 'd4' },
      { text: '转身抱住她', mech: 'loyalty_wait', effects: { bond: 3, secrecy: -2 }, next: 'd4' }
    ],
    next: 'd4'
  },
  d1: {
    id: 'd1', chapter: 1, type: 'narrative', time: '深夜', bg: 'home_evening',
    lines: [
      { who: 'narrator', text: '— 第一章 · 周末 结束 —' },
      { who: 'narrator', text: '三个人，三个方向。你都轻轻碰了一下，又都收了回来。' },
      { who: 'narrator', text: '但有些东西一旦被碰过，就不会再回到原样。' },
      { who: 'narrator', text: '许念在异地，把信任交在你手里；林晚在画前，把距离交给你决定；沈迦在灯下，把"被看见"递到你面前。' }
    ],
    next: 'n020'
  },
  d2: {
    id: 'd2', chapter: 2, type: 'narrative', time: '深夜', bg: 'room_night',
    lines: [
      { who: 'narrator', text: '— 第二章 · 试探 结束 —' },
      { who: 'narrator', text: '你开始在"想"和"该"之间反复横跳。' },
      { who: 'narrator', text: '每一次靠近，都像在给自己找一个合理的理由；每一次躲开，又都留下一点没说清的尾巴。' }
    ],
    next: 'n025'
  },
  d3: {
    id: 'd3', chapter: 3, type: 'narrative', time: '夜', bg: 'cafe',
    lines: [
      { who: 'narrator', text: '— 第三章 · 越界 结束 —' },
      { who: 'narrator', text: '有些线，踩过一次就不再是线，成了路。' },
      { who: 'narrator', text: '耳钉还凉着，可你已经习惯它贴着耳垂的重量。' }
    ],
    next: 'n040'
  },
  d4: {
    id: 'd4', chapter: 4, type: 'narrative', time: '深夜', bg: 'home_evening',
    lines: [
      { who: 'narrator', text: '— 第四章 · 抉择 结束 —' },
      { who: 'narrator', text: '七天到了。你以为自己在选结局，其实结局早就藏在每一次"没忍住"里。' },
      { who: 'narrator', text: '现在，轮到这份档案，替你把那些没说出口的，一一念出来。' }
    ],
    next: 'n041'
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

  if (typeof module !== "undefined" && module.exports) module.exports = LS.scenes
})(typeof window !== "undefined" ? window : globalThis)
