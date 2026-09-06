;(function (root) {
  const LS = (root.LS = root.LS || {})
/**
 * 剧情节点
 *
 * 人物关系（按距离）：
 *   许念 —— 现女友，恋爱三年，同居。第一到第四周在外地驻场。
 *   周然 —— 前女友，分手两年。第四周重新联系。
 *   林晚 —— 大学同学，同城。第一周通过同学聚会重新进入你的生活。
 *   沈砚 —— 同组资深同事，项目负责人。第三周因为一个项目走近。
 *
 * 文本基调（v3 · 润色扩写版）：
 *   1. 少写"情绪是什么"，多写人物正在做什么。
 *   2. 不让角色为了推进剧情说话。每个人说话都符合自己的习惯。
 *   3. 不把任何人写成纯粹的诱惑者，也不把许念写成只会等待的受害者。
 *   4. 林晚不是抢人，她是在一次次确认"你还在不在"。
 *   5. 沈砚不是暧昧高手，她只是习惯给别人空间，也习惯不向别人要答案。
 *   6. 周然不是旧情复燃，她舍不得的是那段关系有没有被认真对待过。
 *   7. 许念不是"最后才发现"的人。她一直在观察，只是不愿意替你做选择。
 *
 * who 取值：narrator 旁白 / system 档案系统 / me 玩家 / 角色 id
 * 机制字段（mech / effects / subEffects / npcEffects / flags / anchor / weight /
 * next_if / branch_if）沿用原值，未改动评分逻辑。
 */

LS.scenes = {
  /* ==================== 第零章 · 入职与送别 ==================== */

  n000: {
    id: 'n000',
    chapter: 0,
    type: 'narrative',
    time: '入职日 · 傍晚',
    bg: 'archive',
    lines: [
      { who: 'system', text: '档案编号 CASE 027。' },
      { who: 'narrator', text: '屏幕黑了两秒，重新亮起来。' },
      { who: 'system', text: '欢迎回来，检茶员。' },
      { who: 'narrator', text: '办公室里只剩打印机还在响。旁边有人吃完的泡面盒没扔，筷子横在盒盖上。' },
      { who: 'system', text: '你的工作很简单。' },
      { who: 'system', text: '进入一段关系。' },
      { who: 'system', text: '记录它发生过什么。' },
      { who: 'system', text: '不替任何人做决定。' },
      { who: 'narrator', text: '你往下翻。' },
      { who: 'system', text: '本次对象：普通上班族。' },
      { who: 'system', text: '恋爱三年，同居两年。' },
      { who: 'system', text: '伴侣因工作外派，预计八周。' },
      { who: 'narrator', text: '最后一页只有一行字。' },
      { who: 'system', text: '请记住。' },
      { who: 'system', text: '你看到的每一个选择，都属于他。' }
    ],
    choices: [
      { text: '接下这份档案', mech: 'voice_express', effects: {}, next: 'n001' }
    ],
    next: 'n001'
  },

  n001: {
    id: 'n001',
    chapter: 0,
    type: 'narrative',
    anchor: true,
    weight: 5,
    time: '第一周 · 周六早晨',
    bg: 'home_evening',
    char: 'xunian',
    lines: [
      { who: 'narrator', text: '周六早上七点四十。' },
      { who: 'narrator', text: '许念把行李箱拉链拉到底，拉链头磕在金属扣上，响了一声。' },
      { who: 'narrator', text: '冰箱门上贴着一张便签。蓝笔写着：「周三晚上记得把垃圾推下去。」' },
      { who: 'xunian', text: '我走了。八周，很快。' },
      { who: 'narrator', text: '她蹲下来，把你昨天脱在门口的鞋摆正。起身的时候，她扶了一下腰。' },
      { who: 'me', text: '我送你。' },
      { who: 'xunian', text: '不用。楼下电梯又坏了，你拎箱子不方便。' },
      { who: 'narrator', text: '她说完才发现，自己说的是你，不是她。' },
      { who: 'xunian', text: '算了。你还是送吧。' }
    ],
    choices: [
      {
        text: '「我送你到楼下。」',
        mech: 'voice_express',
        effects: { bond: 8, guilt: -2 },
        flags: ['said_miss_you'],
        next: 'n002'
      },
      {
        text: '「到了给我发个消息。」',
        mech: 'loyalty_wait',
        effects: { bond: 3 },
        next: 'n002'
      },
      {
        text: '「嗯，路上小心。」',
        mech: 'neglect',
        attach: { avoidance: 3 },
        effects: { bond: -6, ambiguity: 2 },
        next: 'n002'
      },
      {
        text: '「八周啊。」（你在心里算了一下天数）',
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
        before: '她在玄关站了四十秒，等你先说点什么。',
        during: '电梯来了两趟，她一直按着开门键。',
        after: '她最后没等到那句话，只把垃圾顺手带下了楼。',
        deleted: ['你是不是不太想我走', '这八周你会想我吗']
      }
    }
  },

  n002: {
    id: 'n002',
    chapter: 0,
    type: 'narrative',
    time: '第一周 · 周六',
    bg: 'home_evening',
    char: 'xunian',
    lines: [
      { who: 'narrator', text: '她拖着箱子出门。走到电梯口，她回头看了一眼。' },
      { who: 'xunian', text: '对了。' },
      { who: 'xunian', text: '冰箱第二层有饺子。别又点外卖。' },
      { who: 'narrator', text: '电梯门合上。你低头看了一眼鞋柜——她刚才摆好的那双鞋，鞋尖朝着门。' },
      { who: 'narrator', text: '门关上以后，屋里突然空出一块。' },
      { who: 'narrator', text: '你把她的拖鞋摆回鞋架第二层。她在家的时候总放在那里。' },
      { who: 'narrator', text: '洗完澡，23:12。手机亮了一下。' },
      { who: 'xunian', text: '到了。酒店还行。' },
      { who: 'narrator', text: '下面还有一条。' },
      { who: 'xunian', text: '你吃饭了吗？' }
    ],
    choices: [
      {
        text: '给她发条消息',
        mech: 'voice_express',
        attach: { anxiety: 2 },
        effects: { bond: 4 },
        next: 'n002a'
      },
      {
        text: '刷会儿手机再睡',
        mech: 'neglect',
        effects: { bond: -2 },
        next: 'n002c'
      },
      {
        text: '关灯，直接睡',
        mech: 'loyalty_wait',
        effects: {},
        next: 'n002b'
      }
    ],
    next: 'n002b'
  },

  n002a: {
    id: 'n002a',
    chapter: 0,
    type: 'narrative',
    time: '第一周 · 周六深夜',
    bg: 'room_night',
    char: 'xunian',
    lines: [
      { who: 'me', text: '吃了。饺子也吃了两个。' },
      { who: 'xunian', text: '两个？' },
      { who: 'xunian', text: '剩下的明天吃。' },
      { who: 'me', text: '知道了。' },
      { who: 'xunian', text: '嗯。' },
      { who: 'narrator', text: '聊天停在这里。你本来以为她会再说什么。等了五分钟，没有。' }
    ],
    next: 'n003'
  },

  n002b: {
    id: 'n002b',
    chapter: 0,
    type: 'narrative',
    time: '第一周 · 周六深夜',
    bg: 'room_night',
    lines: [
      { who: 'narrator', text: '你把手机放在枕头旁边。屏幕灭了又亮，亮了又灭。' }
    ],
    next: 'n003'
  },

  n002c: {
    id: 'n002c',
    chapter: 0,
    type: 'narrative',
    time: '第一周 · 周日凌晨',
    bg: 'room_night',
    lines: [
      { who: 'narrator', text: '你刷到一条视频。看完的时候，已经 00:03。' },
      { who: 'narrator', text: '床的另一边没人。被子却还留着一点她压出来的凹痕。' }
    ],
    next: 'n003'
  },

  n003: {
    id: 'n003',
    chapter: 0,
    type: 'narrative',
    time: '第一周 · 周三晚上',
    bg: 'home_evening',
    char: 'xunian',
    lines: [
      { who: 'narrator', text: '周三晚上九点。视频接通的时候，许念正在拆一次性筷子。' },
      { who: 'xunian', text: '今天吃了三顿外卖。楼下那家的米饭是硬的。' },
      { who: 'narrator', text: '她把镜头转向窗外。远处的工地还亮着灯。' },
      { who: 'xunian', text: '这边比想象中冷。你那边呢？' },
      { who: 'narrator', text: '你坐在沙发上。茶几上放着一袋没吃完的薯片。' },
      { who: 'xunian', text: '你把垃圾扔了吗？' },
      { who: 'narrator', text: '你没说话。' },
      { who: 'xunian', text: '我就知道。明天记得。' }
    ],
    choices: [
      {
        text: '「还行。就是晚上有点空。」',
        mech: 'voice_express',
        attach: { anxiety: 2 },
        effects: { bond: 5 },
        next: 'n003b'
      },
      {
        text: '「挺好的，你忙你的。」',
        mech: 'loyalty_wait',
        effects: { bond: 1 },
        next: 'n003b'
      },
      {
        text: '「没什么特别的。」',
        mech: 'neglect',
        attach: { avoidance: 2 },
        effects: { bond: -3 },
        next: 'n003b'
      },
      {
        text: '（把镜头转向天花板，不让她看见客厅）',
        mech: 'deactivate',
        attach: { avoidance: 3 },
        effects: { secrecy: 3, bond: -2 },
        flags: ['hid_home_frame'],
        next: 'n003b'
      }
    ],
    next: 'n003b'
  },

  n003b: {
    id: 'n003b',
    chapter: 0,
    type: 'narrative',
    time: '第一周 · 周三晚上',
    bg: 'home_evening',
    char: 'xunian',
    lines: [
      { who: 'xunian', text: '那我先挂了。明天六点半开会。' },
      { who: 'narrator', text: '她没有说"舍不得你"，只是把手机放到床头，又重新拿起来。' },
      { who: 'xunian', text: '睡觉前记得关窗。' },
      { who: 'narrator', text: '视频挂断。你起身去关窗。' },
      { who: 'narrator', text: '窗台上有她留下的发圈。你拿起来看了两秒，又放回原处。' }
    ],
    next: 'n010a'
  },

  /* ==================== 第一章 · 林晚（大学同学） ==================== */

  n010a: {
    id: 'n010a',
    chapter: 1,
    type: 'narrative',
    time: '第一周 · 周六下午',
    bg: 'home_evening',
    char: 'linwan',
    lines: [
      { who: 'narrator', text: '大学班级群沉了大半年，周六下午突然有人发消息。' },
      { who: 'narrator', text: '班长：毕业三周年，下周六聚一下。老地方。' },
      { who: 'narrator', text: '下面跟着三张旧照片。第三张里，你站在最边上，旁边的人举着号码牌，挡住半张脸。' },
      { who: 'narrator', text: '你放大照片，认出了那双鞋。当年她穿了整整一个学期。' },
      { who: 'narrator', text: '五分钟后，林晚私信你。' },
      { who: 'linwan', text: '你去吗' },
      { who: 'narrator', text: '过了半分钟。' },
      { who: 'linwan', text: '我可能也去。' }
    ],
    choices: [
      {
        text: '「去。你呢？」',
        mech: 'voice_express',
        effects: { heart: 2 },
        npcEffects: { linwan: { affection: 3 } },
        next: 'n010b'
      },
      {
        text: '「应该去，看那天有没有事。」',
        mech: 'loyalty_wait',
        effects: {},
        npcEffects: { linwan: { affection: 1 } },
        next: 'n010b'
      },
      {
        text: '「我问问许念。」',
        mech: 'voice_boundary',
        effects: { boundary: 3, bond: 2 },
        npcEffects: { linwan: { affection: -1 } },
        next: 'n010a2'
      },
      {
        text: '（不回，把群消息设成免打扰）',
        mech: 'deactivate',
        attach: { avoidance: 3 },
        effects: { secrecy: 2 },
        flags: ['muted_group'],
        next: 'n010b'
      }
    ],
    next: 'n010b'
  },

  n010a2: {
    id: 'n010a2',
    chapter: 1,
    type: 'narrative',
    time: '第一周 · 周六下午',
    bg: 'home_evening',
    char: 'linwan',
    lines: [
      { who: 'linwan', text: '哦。那你问问她。' },
      { who: 'narrator', text: '她没有追问。聊天框安静了。' }
    ],
    next: 'n010b'
  },

  n010b: {
    id: 'n010b',
    chapter: 1,
    type: 'narrative',
    time: '第二周 · 周五晚上',
    bg: 'cafe',
    char: 'linwan',
    lines: [
      { who: 'narrator', text: '周五晚上七点半。学校后门那家馆子还开着。招牌换成了白底黑字，老板娘还是原来那个。' },
      { who: 'narrator', text: '林晚来得比你早，坐在靠墙的位置，面前摆着两副碗筷。' },
      { who: 'linwan', text: '我点了你以前爱吃的。' },
      { who: 'me', text: '你还记得？' },
      { who: 'linwan', text: '记得一点。' },
      { who: 'narrator', text: '她低头喝水。' },
      { who: 'linwan', text: '老板娘说还在。' },
      { who: 'narrator', text: '吃到一半，她把手机扣在桌上。' },
      { who: 'linwan', text: '你还记得大三那年吗？' },
      { who: 'me', text: '哪一年？' },
      { who: 'linwan', text: '就是……' },
      { who: 'narrator', text: '她停了一下。' },
      { who: 'linwan', text: '算了。' },
      { who: 'narrator', text: '过了几秒，她自己笑了。' },
      { who: 'linwan', text: '图书馆后面那个楼梯间。你给我的纸巾，带香味的。' },
      { who: 'me', text: '你还记得这个？' },
      { who: 'linwan', text: '特别难闻。忘不了。' },
      { who: 'narrator', text: '她伸筷子去捞锅里的菜，捞了两下，没捞起来。' },
      { who: 'linwan', text: '其实今天还有个事。' },
      { who: 'narrator', text: '她说得很快。' },
      { who: 'linwan', text: '我这边合同快到期了。你们组还招人吗？' }
    ],
    choices: [
      {
        text: '「招。我把你推给 HR？」',
        mech: 'voice_express',
        effects: { heart: 3, reliance: 3 },
        npcEffects: { linwan: { affection: 7, dependency: 4 } },
        next: 'n010c'
      },
      {
        text: '「招是招，不过你现在这家不是挺好的吗？」',
        mech: 'loyalty_wait',
        effects: { boundary: 2 },
        npcEffects: { linwan: { affection: 2 } },
        next: 'n010c'
      },
      {
        text: '「我帮你问问，但你别抱太大希望。」',
        mech: 'voice_boundary',
        effects: { boundary: 3 },
        npcEffects: { linwan: { affection: 1 } },
        next: 'n010c'
      },
      {
        text: '「先吃饭，这事回头说。」',
        mech: 'neglect',
        effects: { ambiguity: 2 },
        npcEffects: { linwan: { affection: 3, dependency: 2 } },
        next: 'n010c'
      }
    ],
    next: 'n010c'
  },

  n010c: {
    id: 'n010c',
    chapter: 1,
    type: 'narrative',
    time: '第二周 · 周五晚上',
    bg: 'street',
    char: 'linwan',
    lines: [
      { who: 'narrator', text: '快九点。林晚抢着结了账。' },
      { who: 'me', text: '不是说 AA 吗？' },
      { who: 'linwan', text: '下次。' },
      { who: 'me', text: '哪来的下次？' },
      { who: 'linwan', text: '……' },
      { who: 'narrator', text: '她看你一眼。' },
      { who: 'linwan', text: '有就有。没有就算了。' },
      { who: 'narrator', text: '走到地铁口，她忽然停下来，没有回头。' },
      { who: 'linwan', text: '对了……' },
      { who: 'linwan', text: '你女朋友最近还好吗？' },
      { who: 'narrator', text: '声音被路上的车声盖掉了一半。' }
    ],
    choices: [
      {
        text: '「她去外地驻场了，八周。」',
        mech: 'exit_escalate',
        effects: { ambiguity: 6, secrecy: 3, heart: 3 },
        subEffects: { attachmentAnx: 6 },
        npcEffects: { linwan: { affection: 8, dependency: 5 } },
        flags: ['hinted_availability'],
        next: 'n010c2'
      },
      {
        text: '「挺好的。」',
        mech: 'rationalization',
        effects: { secrecy: 3, ambiguity: 2 },
        npcEffects: { linwan: { affection: 2 } },
        next: 'n010'
      },
      {
        text: '「嗯，挺好的。我送你到地铁口吧。」',
        mech: 'voice_boundary',
        effects: { boundary: 4, bond: 2 },
        npcEffects: { linwan: { affection: -2 } },
        next: 'n010'
      },
      {
        text: '（笑一下，不回答）',
        mech: 'neglect',
        effects: { ambiguity: 3 },
        npcEffects: { linwan: { affection: 3, dependency: 3 } },
        next: 'n010'
      }
    ],
    next: 'n010'
  },

  n010c2: {
    id: 'n010c2',
    chapter: 1,
    type: 'narrative',
    time: '第二周 · 周五晚上',
    bg: 'street',
    char: 'linwan',
    lines: [
      { who: 'linwan', text: '八周啊。' },
      { who: 'narrator', text: '她重复了一遍，像是在心里记住这个数字。' },
      { who: 'linwan', text: '挺久。' },
      { who: 'narrator', text: '她说完就进站了。' }
    ],
    next: 'n010'
  },

  n010: {
    id: 'n010',
    chapter: 1,
    type: 'chat',
    anchor: true,
    weight: 3,
    time: '第二周 · 周日深夜',
    bg: 'room_night',
    speaker: 'linwan',
    char: 'linwan',
    lines: [
      { who: 'narrator', text: '23:47，屏幕亮了。' },
      { who: 'linwan', text: '还没睡吗' },
      { who: 'narrator', text: '三秒后，又一条。' },
      { who: 'linwan', text: '今天……有点难受。' },
      { who: 'narrator', text: '你盯着这两行，想起周五晚上她捞菜的那两下。' }
    ],
    choices: [
      {
        text: '「怎么了，说说。」',
        mech: 'voice_express',
        attach: { anxiety: 2 },
        effects: { heart: 6, ambiguity: 4, reliance: 5 },
        subEffects: { attachmentAnx: 8 },
        npcEffects: { linwan: { affection: 8, dependency: 5 } },
        flags: ['stayed_up_with_linwan'],
        next_if: [
          { cond: { all: [{ attr: 'bond', op: '<', value: 45 }] }, next: 'n011b' }
        ],
        next: 'n011'
      },
      {
        text: '「这么晚了，早点睡吧。」',
        mech: 'voice_boundary',
        effects: { boundary: 4, heart: -2 },
        npcEffects: { linwan: { affection: -3 } },
        flags: ['set_boundary_once'],
        next: 'n011'
      },
      {
        text: '「嗯，还没。」',
        mech: 'neglect',
        effects: { ambiguity: 2 },
        npcEffects: { linwan: { affection: 2, dependency: 3 } },
        next: 'n011'
      },
      {
        text: '「我先回个消息，等下聊。」',
        mech: 'rationalization',
        effects: { bond: 2, ambiguity: 1 },
        npcEffects: { linwan: { affection: 4, dependency: 4 } },
        next: 'n011'
      },
      {
        text: '（不回复，把手机扣过去）',
        mech: 'deactivate',
        attach: { avoidance: 4 },
        effects: { ambiguity: 2, reliance: -1 },
        next: 'n011'
      }
    ],
    next: 'n011',
    shadow: {
      linwan: {
        before: '23:41 她打了一行字，删掉了。23:44 又打了一行，又删掉了。',
        during: '23:47 她发出去：还没睡吗。',
        after: '00:34。她看了 12 次手机。',
        deleted: ['我一个人在家有点害怕', '你是不是不想理我了', '算了']
      }
    }
  },

  n011: {
    id: 'n011',
    chapter: 1,
    type: 'narrative',
    time: '第二周 · 周一下午',
    bg: 'street',
    char: 'linwan',
    lines: [
      { who: 'narrator', text: '周一下午，林晚发来一张照片：三花猫趴在纸箱上，旁边写着"已消毒"。' },
      { who: 'linwan', text: '楼下这只。我喂了半个月了。' },
      { who: 'linwan', text: '上周五谢谢你陪我吃饭。' },
      { who: 'narrator', text: '你看着那张照片，看了大概十秒。' }
    ],
    choices: [
      {
        text: '「它叫什么？」',
        mech: 'voice_express',
        effects: { heart: 4, reliance: 4, vanity: 3 },
        subEffects: { attachmentAnx: 6 },
        npcEffects: { linwan: { affection: 7, dependency: 6 } },
        next: 'n020'
      },
      {
        text: '「猫挺好看的。」',
        mech: 'neglect',
        effects: { ambiguity: 1 },
        npcEffects: { linwan: { affection: 2 } },
        next: 'n020'
      },
      {
        text: '（没回，把手机放回口袋）',
        mech: 'deactivate',
        attach: { avoidance: 2 },
        effects: { boundary: 2 },
        next: 'n020'
      },
      {
        text: '「你一个人住，养一只也挺好的。」',
        mech: 'hyperactivate',
        attach: { anxiety: 3 },
        effects: { heart: 3, reliance: 6 },
        subEffects: { attachmentAnx: 8 },
        npcEffects: { linwan: { affection: 9, dependency: 8 } },
        flags: ['noticed_she_lives_alone'],
        next: 'n011c'
      }
    ],
    next: 'n020'
  },

  n011c: {
    id: 'n011c',
    chapter: 1,
    type: 'narrative',
    time: '第二周 · 周一下午',
    bg: 'street',
    char: 'linwan',
    lines: [
      { who: 'linwan', text: '嗯。室友上个月搬走了。' },
      { who: 'linwan', text: '现在就我一个。' },
      { who: 'narrator', text: '她没有继续往下说。' }
    ],
    next: 'n020'
  },

  n011b: {
    id: 'n011b',
    chapter: 1,
    type: 'narrative',
    time: '第二周 · 周日深夜',
    bg: 'room_night',
    char: 'linwan',
    lines: [
      { who: 'narrator', text: '23:47，林晚发来消息。' },
      { who: 'linwan', text: '还没睡吗' },
      { who: 'narrator', text: '三秒后。' },
      { who: 'linwan', text: '今天……有点难受。' },
      { who: 'me', text: '怎么了？' },
      { who: 'linwan', text: '也没什么。就是突然觉得家里太安静。' },
      { who: 'narrator', text: '你盯着这句话。' },
      { who: 'linwan', text: '你跟你女朋友……' },
      { who: 'linwan', text: '平时也这么晚睡吗？' }
    ],
    choices: [
      {
        text: '「她驻场去了，我这段时间比较自由。」',
        mech: 'exit_escalate',
        effects: { ambiguity: 8, secrecy: 5, heart: 5 },
        subEffects: { attachmentAnx: 10 },
        npcEffects: { linwan: { affection: 9, dependency: 8 } },
        flags: ['hinted_availability'],
        next: 'n020'
      },
      {
        text: '「她睡得早。」',
        mech: 'voice_boundary',
        effects: { boundary: 4, bond: 2 },
        next: 'n020'
      },
      {
        text: '「怎么突然问这个？」',
        mech: 'voice_express',
        effects: { boundary: 2, heart: 2 },
        npcEffects: { linwan: { affection: 3 } },
        next: 'n011b2'
      }
    ],
    next: 'n020',
    shadow: {
      linwan: {
        before: '这句话她排练了三个小时。',
        during: '发出去以后她把手机反扣在沙发上。',
        after: '她等了 6 分钟。',
        deleted: ['你们最近还好吗', '你会不会觉得我烦']
      }
    }
  },

  n011b2: {
    id: 'n011b2',
    chapter: 1,
    type: 'narrative',
    time: '第二周 · 周日深夜',
    bg: 'room_night',
    char: 'linwan',
    lines: [
      { who: 'linwan', text: '不知道。就突然想问。' },
      { who: 'linwan', text: '你别多想。' },
      { who: 'narrator', text: '过了一会儿。' },
      { who: 'linwan', text: '晚安。' }
    ],
    next: 'n020'
  },

  n020: {
    id: 'n020',
    chapter: 1,
    type: 'chat',
    anchor: true,
    weight: 5,
    time: '第二周 · 周四深夜',
    bg: 'room_night',
    speaker: 'linwan',
    char: 'linwan',
    lines: [
      { who: 'narrator', text: '23:58。' },
      { who: 'linwan', text: '你睡了吗' },
      { who: 'narrator', text: '四分钟后。' },
      { who: 'linwan', text: '没睡的话，能不能……' },
      { who: 'linwan', text: '语音一下。' },
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
        mech: 'deactivate',
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

  x020a: {
    id: 'x020a',
    chapter: 1,
    type: 'chat',
    time: '第二周 · 周五凌晨',
    bg: 'room_night',
    speaker: 'linwan',
    char: 'linwan',
    lines: [
      { who: 'narrator', text: '电话接通以后，两个人都没有说话。' },
      { who: 'linwan', text: '……' },
      { who: 'me', text: '怎么了？' },
      { who: 'linwan', text: '你听。' },
      { who: 'narrator', text: '窗外有雨。' },
      { who: 'linwan', text: '我有点，不想挂。' }
    ],
    choices: [
      {
        text: '「我在听。」',
        mech: 'hyperactivate',
        attach: { anxiety: 3 },
        effects: { heart: 8, reliance: 6, guilt: 3, bond: -3 },
        subEffects: { attachmentAnx: 10, sunkCost: 5 },
        npcEffects: { linwan: { affection: 10, dependency: 8 } },
        next: 'x020a2'
      },
      {
        text: '「早点睡，明天说。」',
        mech: 'voice_boundary',
        effects: { boundary: 5, heart: -2 },
        next: 'x020a2'
      }
    ],
    next: 'x020a2'
  },

  x020a2: {
    id: 'x020a2',
    chapter: 1,
    type: 'chat',
    time: '第二周 · 周五凌晨',
    bg: 'room_night',
    speaker: 'linwan',
    char: 'linwan',
    lines: [
      { who: 'linwan', text: '嗯。' },
      { who: 'narrator', text: '她没有继续说。只剩雨声。' },
      { who: 'narrator', text: '过了很久。' },
      { who: 'linwan', text: '你声音比打字好听。' },
      { who: 'narrator', text: '她笑了一声，那声笑拖得很长，像在等你说点什么。' }
    ],
    choices: [
      {
        text: '「那以后常打给你。」',
        mech: 'exit_escalate',
        effects: { heart: 6, ambiguity: 8, secrecy: 5 },
        npcEffects: { linwan: { affection: 8, dependency: 6 } },
        next: 'x020a2b'
      },
      {
        text: '「睡吧，我也困了。」',
        mech: 'voice_boundary',
        effects: { boundary: 4 },
        next: 'x020a3'
      }
    ],
    next: 'x020a3'
  },

  x020a2b: {
    id: 'x020a2b',
    chapter: 1,
    type: 'chat',
    time: '第二周 · 周五凌晨',
    bg: 'room_night',
    speaker: 'linwan',
    char: 'linwan',
    lines: [
      { who: 'linwan', text: '好啊。' },
      { who: 'linwan', text: '那你别嫌我烦。' }
    ],
    next: 'x020a3'
  },

  x020a3: {
    id: 'x020a3',
    chapter: 1,
    type: 'narrative',
    time: '第二周 · 周五凌晨',
    bg: 'room_night',
    lines: [
      { who: 'narrator', text: '00:36。你翻到和林晚的聊天框。' },
      { who: 'narrator', text: '最后一条还是那只猫。' },
      { who: 'narrator', text: '你打下一行：「明天见。」' },
      { who: 'narrator', text: '停了十秒。' }
    ],
    choices: [
      {
        text: '发出去',
        mech: 'exit_escalate',
        effects: { heart: 4, ambiguity: 5, secrecy: 3 },
        npcEffects: { linwan: { affection: 4, dependency: 3 } },
        next: 'd2'
      },
      {
        text: '删掉',
        mech: 'voice_boundary',
        effects: { boundary: 2 },
        next: 'd2'
      }
    ],
    next: 'd2'
  },

  n021: {
    id: 'n021',
    chapter: 1,
    type: 'narrative',
    time: '第二周 · 周五凌晨',
    bg: 'room_night',
    char: 'linwan',
    lines: [
      { who: 'narrator', text: '00:41。你们又聊了五分钟。' },
      { who: 'linwan', text: '我爸走的那半年……我妈把照片都收起来了。' },
      { who: 'linwan', text: '不是扔掉。就是不看。' },
      { who: 'narrator', text: '她发来一张旧照片，边角已经卷起来。' },
      { who: 'linwan', text: '后来我才发现，人不在了，东西还会在。' },
      { who: 'linwan', text: '挺讨厌的。' },
      { who: 'narrator', text: '过了半分钟。' },
      { who: 'linwan', text: '你以前那个女朋友，我见过。' },
      { who: 'me', text: '周然？' },
      { who: 'linwan', text: '嗯。大四，西门那家麻辣烫。' },
      { who: 'narrator', text: '你愣了一下。' },
      { who: 'linwan', text: '你们坐靠窗。她不吃香菜。' },
      { who: 'linwan', text: '我当时就在后面。' }
    ],
    choices: [
      {
        text: '继续听下去',
        mech: 'hyperactivate',
        attach: { anxiety: 5 },
        effects: { heart: 8, reliance: 8, guilt: 3, bond: -3 },
        subEffects: { attachmentAnx: 12, sunkCost: 6 },
        npcEffects: { linwan: { affection: 10, dependency: 12 } },
        next: 'n025'
      },
      {
        text: '「我该睡了，你也早点休息。」',
        mech: 'voice_boundary',
        effects: { boundary: 5, heart: -2, bond: 2 },
        next: 'n025'
      },
      {
        text: '「你为什么总是一个人在家？」',
        mech: 'voice_express',
        effects: { heart: 3, reliance: 3 },
        subEffects: { attachmentAnx: 5 },
        npcEffects: { linwan: { affection: 6, dependency: 8 } },
        flags: ['understood_linwan'],
        next: 'n021b'
      }
    ],
    next: 'n025'
  },

  n021b: {
    id: 'n021b',
    chapter: 1,
    type: 'narrative',
    time: '第二周 · 周五凌晨',
    bg: 'room_night',
    char: 'linwan',
    lines: [
      { who: 'linwan', text: '因为一个人比较省事。' },
      { who: 'narrator', text: '停顿。' },
      { who: 'linwan', text: '不会有人突然搬走。' },
      { who: 'narrator', text: '她发完这句话，没有再解释。' }
    ],
    next: 'n025'
  },

  d2: {
    id: 'd2',
    chapter: 1,
    type: 'narrative',
    time: '第二周 · 结束',
    bg: 'room_night',
    lines: [
      { who: 'narrator', text: '第二周结束。' },
      { who: 'narrator', text: '你开始记得一些没有必要记住的东西：她捞菜总要捞两下，发消息前会停很久，说"没事"的时候通常是真的有事。' },
      { who: 'narrator', text: '你告诉自己，这只是老同学。' }
    ],
    next: 'n025'
  },

  n025: {
    id: 'n025',
    chapter: 1,
    type: 'narrative',
    anchor: true,
    weight: 5,
    time: '第二周 · 周日深夜',
    bg: 'room_night',
    char: 'linwan',
    lines: [
      { who: 'narrator', text: '23:20。许念那边在开项目会。' },
      { who: 'xunian', text: '在忙。晚点说。' },
      { who: 'narrator', text: '聊天列表最上面是林晚。这一周你们聊了四次，三次在半夜。' },
      { who: 'narrator', text: '你的手指停在输入框上。' }
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
        next: 'n012a'
      },
      {
        text: '给沈砚回个工作消息',
        mech: 'rationalization',
        effects: { ambiguity: 6, secrecy: 6, vanity: 5 },
        subEffects: { selfExpansion: 10 },
        npcEffects: { shenyan: { affection: 8 } },
        flags: ['initiated_contact'],
        next: 'n012a'
      },
      {
        text: '给许念回一句"不急，你忙"',
        mech: 'voice_express',
        effects: { bond: 8, guilt: -6, heart: -3, boundary: 4 },
        flags: ['chose_partner_night'],
        next: 'n012a'
      },
      {
        text: '删掉聊天记录，睡觉',
        mech: 'secrecy',
        effects: { secrecy: 16, guilt: 10, bond: -5 },
        flags: ['deleted_record'],
        next: 'n012a'
      }
    ],
    next: 'n012a',
    shadow: {
      linwan: {
        before: '她已经把手机调成静音了。',
        during: '消息在 01:31 亮起来的时候，她立刻坐了起来。',
        after: '她回得很快，快得像一直在等。',
        deleted: ['我以为你不理我了']
      }
    }
  },

  /* ==================== 第二章 · 沈砚（工作同事） ==================== */

  n012a: {
    id: 'n012a',
    chapter: 2,
    type: 'narrative',
    time: '第三周 · 周一上午',
    bg: 'office',
    char: 'shenyan',
    lines: [
      { who: 'narrator', text: '周一上午。会议室空调开得太低。' },
      { who: 'narrator', text: '客户翻到第三页，手指敲了两下桌面：这个数据不行。' },
      { who: 'narrator', text: '会议室安静了两秒。' },
      { who: 'shenyan', text: '数据是我让他改成这样的。' },
      { who: 'narrator', text: '她没抬头。' },
      { who: 'shenyan', text: '上一版按你们要求做，返工率 40%。' },
      { who: 'shenyan', text: '这一版 6%。' },
      { who: 'narrator', text: '客户又翻了两页，没再说话。' },
      { who: 'narrator', text: '散会以后，沈砚在门口叫住你。' },
      { who: 'shenyan', text: '刚才那个，你处理得没问题。' }
    ],
    choices: [
      {
        text: '「谢谢砚姐。」',
        mech: 'voice_express',
        effects: { vanity: 2 },
        subEffects: { selfExpansion: 4 },
        npcEffects: { shenyan: { affection: 3 } },
        next: 'n012'
      },
      {
        text: '「其实我刚才有点慌。」',
        mech: 'voice_express',
        effects: { heart: 2, vanity: 3, reliance: 2 },
        subEffects: { selfExpansion: 8 },
        npcEffects: { shenyan: { affection: 6, dependency: 1 } },
        next: 'n012a2'
      },
      {
        text: '「数据是我改的，不关你的事。」',
        mech: 'loyalty_wait',
        effects: { boundary: 2, vanity: -2 },
        npcEffects: { shenyan: { affection: 2 } },
        next: 'n012'
      },
      {
        text: '（点头，回工位）',
        mech: 'deactivate',
        attach: { avoidance: 2 },
        effects: { boundary: 1 },
        next: 'n012'
      }
    ],
    next: 'n012'
  },

  n012a2: {
    id: 'n012a2',
    chapter: 2,
    type: 'narrative',
    time: '第三周 · 周一上午',
    bg: 'office',
    char: 'shenyan',
    lines: [
      { who: 'shenyan', text: '慌正常。你第一次自己讲这一块。' },
      { who: 'shenyan', text: '下次把第三页再提前准备一个版本。' },
      { who: 'me', text: '好。' },
      { who: 'shenyan', text: '别怕出错。怕的是错了以后不知道怎么改。' }
    ],
    next: 'n012'
  },

  n012: {
    id: 'n012',
    chapter: 2,
    type: 'chat',
    anchor: true,
    weight: 3,
    time: '第三周 · 周二下午',
    bg: 'office',
    speaker: 'shenyan',
    char: 'shenyan',
    lines: [
      { who: 'narrator', text: '周二下午复盘。沈砚把你的方案推回来，页边密密麻麻写满铅笔字。' },
      { who: 'shenyan', text: '第三页那个判断，只有你会这么写。' },
      { who: 'me', text: '只有我？' },
      { who: 'shenyan', text: '嗯。其他人会更保守。' },
      { who: 'narrator', text: '她继续翻页。' },
      { who: 'shenyan', text: '但这次对。' },
      { who: 'narrator', text: '沈砚不夸人。这是这个月第三次。' }
    ],
    choices: [
      {
        text: '「谢谢砚姐，我会继续努力。」',
        mech: 'voice_express',
        effects: { vanity: 4 },
        subEffects: { selfExpansion: 6 },
        npcEffects: { shenyan: { affection: 5, dependency: 1 } },
        next: 'n012b'
      },
      {
        text: '「其实这个部分是团队的功劳。」',
        mech: 'loyalty_wait',
        effects: { boundary: 2, vanity: -2 },
        npcEffects: { shenyan: { affection: 2 } },
        next: 'n012b'
      },
      {
        text: '「只有我懂吗？」（发过去又觉得不妥）',
        mech: 'exit_escalate',
        effects: { heart: 5, ambiguity: 6, vanity: 6 },
        subEffects: { selfExpansion: 10 },
        npcEffects: { shenyan: { affection: 9 } },
        flags: ['flirted_shenyan'],
        next: 'n012b'
      },
      {
        text: '（回到工作，不接这个话）',
        mech: 'deactivate',
        attach: { avoidance: 3 },
        effects: { boundary: 2 },
        next: 'n012b'
      }
    ],
    next: 'n012b',
    shadow: {
      shenyan: {
        before: '她改了四次措辞，最后选了最不像夸奖的那一句。',
        during: '发出去以后她关掉对话框，去倒了杯水。',
        after: '她回头看了三次你有没有回。',
        deleted: ['你比我想象的还要聪明', '跟你聊天很舒服']
      }
    }
  },

  n012b: {
    id: 'n012b',
    chapter: 2,
    type: 'narrative',
    time: '第三周 · 周四 22:40',
    bg: 'office',
    char: 'shenyan',
    lines: [
      { who: 'narrator', text: '她没有因为你的反应改变表情，只是把铅笔在桌上转了一圈。' },
      { who: 'narrator', text: '22:40。办公室只剩两个人。' },
      { who: 'narrator', text: '沈砚从外面回来，旁边放着两个塑料袋。' },
      { who: 'shenyan', text: '吃了再走。' },
      { who: 'me', text: '我不饿。' },
      { who: 'shenyan', text: '那就陪我吃。' },
      { who: 'narrator', text: '她把其中一盒推过来。' },
      { who: 'narrator', text: '你注意到她的保温杯：杯口磕掉一块瓷，用透明胶粘着。' },
      { who: 'me', text: '杯子坏了怎么还用？' },
      { who: 'shenyan', text: '还能装水。' },
      { who: 'me', text: '买一个新的吧。' },
      { who: 'shenyan', text: '下周。' },
      { who: 'narrator', text: '她说得很自然，像这个"下周"已经说过很多次。' },
      { who: 'narrator', text: '十一点半，她靠在窗边，没开灯，只有楼下的路灯照上来。' },
      { who: 'shenyan', text: '我三十二岁那年……' },
      { who: 'narrator', text: '她停了一下。' },
      { who: 'shenyan', text: '算了。' }
    ],
    choices: [
      {
        text: '「后来呢？」',
        mech: 'voice_express',
        effects: { heart: 4, reliance: 3, vanity: 3 },
        subEffects: { selfExpansion: 8 },
        npcEffects: { shenyan: { affection: 8, dependency: 2 } },
        flags: ['heard_shenyan_story'],
        next: 'n012b2'
      },
      {
        text: '「你比我认识的大多数人都强。」',
        mech: 'exit_escalate',
        effects: { heart: 5, ambiguity: 6, vanity: 7 },
        subEffects: { selfExpansion: 12 },
        npcEffects: { shenyan: { affection: 10 } },
        flags: ['flirted_shenyan'],
        next: 'n022'
      },
      {
        text: '「都过去了。」',
        mech: 'neglect',
        attach: { avoidance: 3 },
        effects: { ambiguity: 2 },
        next: 'n022'
      },
      {
        text: '「不早了，我得回去了。」',
        mech: 'voice_boundary',
        effects: { boundary: 5, heart: -2, bond: 2 },
        next: 'n022'
      }
    ],
    next: 'n022',
    shadow: {
      shenyan: {
        before: '这段话她没打算说，是看你还在，才说出来的。',
        during: '她说完就把烟掐了，没看你。',
        after: '第二天她照常九点到公司，什么都没提。',
        deleted: ['我那时候真的很傻', '我现在不敢了']
      }
    }
  },

  n012b2: {
    id: 'n012b2',
    chapter: 2,
    type: 'narrative',
    time: '第三周 · 周四深夜',
    bg: 'office',
    char: 'shenyan',
    lines: [
      { who: 'shenyan', text: '后来就离婚了。没什么戏剧性。' },
      { who: 'shenyan', text: '公司第二轮融资那天，他跟我说，想离婚。' },
      { who: 'shenyan', text: '我当时还在算账。八年的账。' },
      { who: 'narrator', text: '她笑了一下。' },
      { who: 'shenyan', text: '挺可笑的。' },
      { who: 'me', text: '你后悔吗？' },
      { who: 'shenyan', text: '后悔把资源给错人。不后悔帮过他。' },
      { who: 'narrator', text: '她低头看了看保温杯。' },
      { who: 'shenyan', text: '这两件事不冲突。' }
    ],
    next: 'n012b3'
  },

  n022: {
    id: 'n022',
    chapter: 2,
    type: 'chat',
    anchor: true,
    weight: 5,
    time: '第三周 · 周五傍晚',
    bg: 'cafe',
    speaker: 'shenyan',
    char: 'shenyan',
    lines: [
      { who: 'narrator', text: '周五下班，她在电梯口叫住你。' },
      { who: 'shenyan', text: '等一下。' },
      { who: 'narrator', text: '她从包里抽出一张打印纸，是两年前你在群里随口提过的一个想法，被她整理成了一页项目表。' },
      { who: 'shenyan', text: '你两年前说过想做这个。我记得。' },
      { who: 'me', text: '你还真记得。' },
      { who: 'shenyan', text: '我负责这个项目，记人是工作的一部分。' },
      { who: 'narrator', text: '她停了一下。' },
      { who: 'shenyan', text: '但这个，我觉得你会想做。' },
      { who: 'narrator', text: '你想起那天你说这话的时候，许念在旁边刷手机，回了一句"别折腾了"。' },
      { who: 'shenyan', text: '你女朋友……知道吗？' }
    ],
    choices: [
      {
        text: '「是啊，她不懂这个。」',
        mech: 'exit_escalate',
        effects: { heart: 9, ambiguity: 10, bond: -8, vanity: 8, guilt: 4 },
        subEffects: { selfExpansion: 16, sunkCost: 7 },
        npcEffects: { shenyan: { affection: 13 } },
        flags: ['agreed_with_shenyan'],
        next: 'n022a'
      },
      {
        text: '「她只是比较务实。」',
        mech: 'voice_boundary',
        effects: { boundary: 5, bond: 4, heart: -2 },
        next: 'n013a'
      },
      {
        text: '「你怎么知道她不了解我？」',
        mech: 'voice_express',
        effects: { boundary: 4, bond: 3 },
        npcEffects: { shenyan: { affection: -3 } },
        next: 'n013a'
      },
      {
        text: '（笑一下，不接话）',
        mech: 'neglect',
        attach: { avoidance: 4 },
        effects: { ambiguity: 5, vanity: 4 },
        next: 'n013a'
      }
    ],
    next: 'n013a',
    shadow: {
      shenyan: {
        before: '她翻了你两年前的朋友圈，找了四十分钟。',
        during: '这句话她练了两天。',
        after: '她说完去洗手间待了十分钟。',
        deleted: ['她配不上你', '只有我看得见你']
      }
    }
  },

  n022b: {
    id: 'n022b',
    chapter: 2,
    type: 'narrative',
    time: '第三周 · 周五傍晚',
    bg: 'cafe',
    char: 'shenyan',
    lines: [
      { who: 'shenyan', text: '别这样说。' },
      { who: 'me', text: '什么？' },
      { who: 'shenyan', text: '你可以喜欢一个人，也可以觉得她不懂你。' },
      { who: 'shenyan', text: '但最好别拿后一个，去证明前一个不值得。' },
      { who: 'narrator', text: '电梯到了。' },
      { who: 'shenyan', text: '周末好好休息。' },
      { who: 'narrator', text: '她先走进去。电梯门合上前，她又补了一句。' },
      { who: 'shenyan', text: '项目表你留着。不用给我答案。' }
    ],
    next: 'n022x'
  },

  /* ==================== 第三章 · 周然（前女友） ==================== */

  n013a: {
    id: 'n013a',
    chapter: 3,
    type: 'narrative',
    time: '第四周 · 周二晚上',
    bg: 'home_evening',
    lines: [
      { who: 'narrator', text: '周二晚上，你搬换季衣服。最上层的纸箱被你碰了一下，一个纸袋掉下来。' },
      { who: 'narrator', text: '耳机。一本《雪国》。两张电影票。' },
      { who: 'narrator', text: '电影票上的日期是 2021 年 3 月 14 日。' },
      { who: 'narrator', text: '你记得那天。电影最后十分钟停电，周然嫌电影院冷，把手塞进你的袖口。' },
      { who: 'narrator', text: '后来你们吵架。没人再提这件事。' },
      { who: 'narrator', text: '你在地板上坐了一会儿。' }
    ],
    choices: [
      {
        text: '原样放回柜子最上层',
        mech: 'voice_boundary',
        effects: { boundary: 3 },
        next: 'n013'
      },
      {
        text: '拍张照，存进手机相册',
        mech: 'exit_escalate',
        effects: { heart: 3, secrecy: 5 },
        subEffects: { unfinished: 6 },
        flags: ['kept_photo_ticket'],
        next: 'n013'
      },
      {
        text: '扔进垃圾桶',
        mech: 'deactivate',
        attach: { avoidance: 4 },
        effects: { boundary: 2 },
        next: 'n013'
      },
      {
        text: '坐在地上把那本书翻完',
        mech: 'hyperactivate',
        attach: { anxiety: 3 },
        effects: { heart: 4, reliance: 4 },
        subEffects: { unfinished: 10 },
        flags: ['revisited_past'],
        next: 'n013a2'
      }
    ],
    next: 'n013'
  },

  n013a2: {
    id: 'n013a2',
    chapter: 3,
    type: 'narrative',
    time: '第四周 · 周二晚上',
    bg: 'home_evening',
    lines: [
      { who: 'narrator', text: '第 87 页有一道折痕，你不知道是谁折的。' },
      { who: 'narrator', text: '里面掉出一张纸，字很小，只有一句：你又忘了带伞。' }
    ],
    next: 'n013a3'
  },

  n013: {
    id: 'n013',
    chapter: 3,
    type: 'chat',
    time: '第四周 · 周三 00:16',
    bg: 'room_night',
    speaker: 'zhouran',
    char: 'zhouran',
    lines: [
      { who: 'narrator', text: '00:16。一条短信，来自一个没有备注的号码。不是微信。' },
      { who: 'zhouran', text: '好久不见。我是周然。' },
      { who: 'zhouran', text: '换号码了。' },
      { who: 'zhouran', text: '存一下。' },
      { who: 'narrator', text: '你盯着号码看了很久。' }
    ],
    choices: [
      {
        text: '存下号码',
        mech: 'exit_escalate',
        effects: { heart: 4, secrecy: 6, ambiguity: 4 },
        subEffects: { unfinished: 8 },
        npcEffects: { zhouran: { affection: 8, dependency: 4 } },
        flags: ['kept_zhouran_number', 'met_zhouran'],
        next: 'n013b'
      },
      {
        text: '「有事吗？」',
        mech: 'voice_boundary',
        effects: { boundary: 3 },
        npcEffects: { zhouran: { affection: 2 } },
        flags: ['met_zhouran'],
        next: 'n023'
      },
      {
        text: '（不存，也不回）',
        mech: 'deactivate',
        attach: { avoidance: 4 },
        effects: { boundary: 2 },
        flags: ['met_zhouran'],
        next: 'n023'
      }
    ],
    next: 'n023',
    shadow: {
      zhouran: {
        before: '这个号码她存了两年，一直没删，也没打过。',
        during: '发出去以后她把手机扔到了床的另一头。',
        after: '第二天早上七点她醒了一次，看了一眼。',
        deleted: ['我想你了', '你过得好吗', '对不起当年']
      }
    }
  },

  n013b: {
    id: 'n013b',
    chapter: 3,
    type: 'narrative',
    time: '第四周 · 周三凌晨',
    bg: 'room_night',
    lines: [
      { who: 'narrator', text: '联系人里多了一行名字。周然。' },
      { who: 'narrator', text: '两年没有出现过的名字，重新排在通讯录里。' }
    ],
    next: 'n013b2'
  },

  n023: {
    id: 'n023',
    chapter: 3,
    type: 'narrative',
    time: '第四周 · 周六傍晚',
    bg: 'street',
    lines: [
      { who: 'narrator', text: '周六下午，你绕路去了趟城南。' },
      { who: 'narrator', text: '那家店还开着。招牌换了，玻璃门上的"内有 WiFi"还没撕掉。' },
      { who: 'narrator', text: '你站在门口几秒。手机里那个新存的号码，一直没拨过。' }
    ],
    choices: [
      {
        text: '进去坐一会儿',
        mech: 'loyalty_wait',
        effects: {},
        next_if: [{ cond: { all: [{ flag: 'kept_zhouran_number' }] }, next: 'n023b' }],
        next: 'n013c'
      },
      {
        text: '拍张照发给许念',
        mech: 'voice_express',
        effects: { bond: 5 },
        next: 'n023c'
      },
      {
        text: '走开',
        mech: 'deactivate',
        attach: { avoidance: 3 },
        effects: { boundary: 2 },
        next: 'n013c'
      },
      {
        text: '拍张照发给周然',
        mech: 'exit_escalate',
        effects: { heart: 7, secrecy: 8, ambiguity: 7, guilt: 4 },
        subEffects: { unfinished: 14, sunkCost: 6 },
        npcEffects: { zhouran: { affection: 12, dependency: 5 } },
        flags: ['reached_zhouran'],
        next: 'n013c'
      }
    ],
    next: 'n013c'
  },

  n023c: {
    id: 'n023c',
    chapter: 3,
    type: 'narrative',
    time: '第四周 · 周六傍晚',
    bg: 'street',
    char: 'xunian',
    lines: [
      { who: 'me', text: '路过这里。店还在。' },
      { who: 'xunian', text: '哪家？' },
      { who: 'me', text: '以前吃过的。' },
      { who: 'xunian', text: '哦。那家啊。' },
      { who: 'xunian', text: '别吃太辣。' },
      { who: 'narrator', text: '你看着"别吃太辣"四个字，忽然想起来，她甚至不知道你为什么来这里。' }
    ],
    next: 'n013c'
  },

  n023b: {
    id: 'n023b',
    chapter: 3,
    type: 'narrative',
    time: '第四周 · 周六傍晚',
    bg: 'cafe',
    char: 'zhouran',
    lines: [
      { who: 'narrator', text: '推门进去。靠窗那桌已经有人。' },
      { who: 'zhouran', text: '……' },
      { who: 'zhouran', text: '你也来了。' },
      { who: 'narrator', text: '她没有问"你怎么来了"。' },
      { who: 'narrator', text: '桌上放着两本书，旁边是一杯热水。' },
      { who: 'me', text: '你知道我会来？' },
      { who: 'zhouran', text: '不知道。' },
      { who: 'narrator', text: '停顿。' },
      { who: 'zhouran', text: '就是坐着。' }
    ],
    choices: [
      {
        text: '坐下来',
        mech: 'exit_escalate',
        effects: { heart: 9, ambiguity: 9, secrecy: 8, guilt: 5, bond: -5 },
        subEffects: { unfinished: 16, sunkCost: 8 },
        npcEffects: { zhouran: { affection: 14, dependency: 7 } },
        flags: ['met_zhouran_irl'],
        next: 'n023b2'
      },
      {
        text: '「路过，不打扰了。」',
        mech: 'voice_boundary',
        effects: { boundary: 6, heart: -3 },
        next: 'n013c'
      }
    ],
    next: 'n013c',
    shadow: {
      zhouran: {
        before: '这是她这个月第三次坐在这个位置。',
        during: '推门声响的时候，她没有抬头。',
        after: '她在这坐了两个半小时。',
        deleted: ['我知道你会来', '其实我每天都来']
      }
    }
  },

  n023b2: {
    id: 'n023b2',
    chapter: 3,
    type: 'narrative',
    time: '第四周 · 周六傍晚',
    bg: 'cafe',
    char: 'zhouran',
    lines: [
      { who: 'zhouran', text: '这家店以前晚上九点就关门。' },
      { who: 'me', text: '现在几点？' },
      { who: 'zhouran', text: '七点四十。还早。' },
      { who: 'narrator', text: '她低头翻书。' },
      { who: 'zhouran', text: '我不是叫你来的。' },
      { who: 'me', text: '我知道。' },
      { who: 'zhouran', text: '那就好。' }
    ],
    next: 'n023b3'
  },

  n013c: {
    id: 'n013c',
    chapter: 3,
    type: 'narrative',
    time: '第五周 · 周二',
    bg: 'home_evening',
    char: 'zhouran',
    lines: [
      { who: 'narrator', text: '周二下午，前台让你去拿快递。' },
      { who: 'narrator', text: '一个牛皮纸袋，寄件人只写了一个姓。' },
      { who: 'narrator', text: '里面是《雪国》，你当年落在她那儿的。' },
      { who: 'narrator', text: '第 87 页夹着一张车票。日期是分手前一个月，目的地是你们没去成的那座城市。' },
      { who: 'narrator', text: '没有纸条。你把车票翻过来，背面什么都没有。' }
    ],
    choices: [
      {
        text: '「收到了，谢谢。」发过去',
        mech: 'exit_escalate',
        effects: { heart: 6, secrecy: 6, ambiguity: 5 },
        subEffects: { unfinished: 12, sunkCost: 5 },
        npcEffects: { zhouran: { affection: 10, dependency: 4 } },
        next: 'n024'
      },
      {
        text: '（把书放进书架最上层）',
        mech: 'voice_boundary',
        effects: { boundary: 4 },
        subEffects: { unfinished: 3 },
        next: 'n024'
      },
      {
        text: '打电话过去',
        mech: 'exit_escalate',
        attach: { anxiety: 4 },
        effects: { heart: 9, ambiguity: 8, secrecy: 8, guilt: 5, bond: -4 },
        subEffects: { unfinished: 16, sunkCost: 8 },
        npcEffects: { zhouran: { affection: 14, dependency: 8 } },
        flags: ['called_zhouran'],
        next: 'n013c2'
      },
      {
        text: '（不回，也不再拆开第二次）',
        mech: 'deactivate',
        attach: { avoidance: 4 },
        effects: { boundary: 3 },
        next: 'n024'
      }
    ],
    next: 'n024',
    shadow: {
      zhouran: {
        before: '这本书她在书架上放了两年，搬了三次家都没丢。',
        during: '寄出去以后她把物流信息刷了 26 次。',
        after: '她等到第三天才等到你那条"收到了"。',
        deleted: ['里面夹的东西你看到了吗', '那张票我一直留着']
      }
    }
  },

  n013c2: {
    id: 'n013c2',
    chapter: 3,
    type: 'narrative',
    time: '第五周 · 周二晚上',
    bg: 'home_evening',
    char: 'zhouran',
    lines: [
      { who: 'zhouran', text: '喂。' },
      { who: 'me', text: '票为什么还在？' },
      { who: 'zhouran', text: '不知道。' },
      { who: 'me', text: '那为什么寄给我？' },
      { who: 'zhouran', text: '……' },
      { who: 'zhouran', text: '我本来想扔。后来没扔。' },
      { who: 'me', text: '你想让我做什么？' },
      { who: 'zhouran', text: '我不知道。' },
      { who: 'zhouran', text: '我只是想知道，你还记不记得。' }
    ],
    next: 'n013c3'
  },

  /* ==================== 第四章 · 交叉与终局 ==================== */

  n024: {
    id: 'n024',
    chapter: 4,
    type: 'narrative',
    anchor: true,
    weight: 5,
    time: '第五周 · 周五深夜',
    bg: 'room_night',
    char: 'xunian',
    speaker: 'xunian',
    lines: [
      { who: 'narrator', text: '周五晚上十一点半，门锁响了一声。' },
      { who: 'narrator', text: '许念推着行李箱站在玄关。' },
      { who: 'xunian', text: '项目提前收尾。没告诉你。' },
      { who: 'narrator', text: '你正坐在沙发上，手机屏幕还亮着。' },
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
        text: '「你不是说下周才回吗？」',
        mech: 'deactivate',
        attach: { avoidance: 6 },
        effects: { secrecy: 8, bond: -8 },
        flags: ['deflected_question'],
        next: 'x024d'
      }
    ],
    next: 'n014',
    shadow: {
      xunian: {
        before: '她提前了两天回来，没告诉你，想看看你在不在家。',
        during: '她在门口站了大概十秒才出声。',
        after: '那天晚上她是背对着你睡的。',
        deleted: ['你是不是有事瞒我', '我能不能看看']
      }
    }
  },

  x024a: {
    id: 'x024a',
    chapter: 4,
    type: 'narrative',
    time: '第五周 · 周五深夜',
    bg: 'room_night',
    speaker: 'xunian',
    char: 'xunian',
    lines: [
      { who: 'narrator', text: '你把手机翻过来，屏幕朝上，递给她。' },
      { who: 'narrator', text: '她没接。' },
      { who: 'xunian', text: '……' },
      { who: 'xunian', text: '同事？' }
    ],
    choices: [
      {
        text: '「对不起，这段时间我有点飘。」',
        mech: 'voice_express',
        effects: { bond: 6, guilt: -5, boundary: 3 },
        flags: ['apologized'],
        next: 'x024a2'
      },
      {
        text: '「只是同事，真的。」',
        mech: 'rationalization',
        effects: { secrecy: 8, guilt: 4, bond: -3 },
        next: 'x024a3'
      }
    ],
    next: 'x024a3'
  },

  x024a2: {
    id: 'x024a2',
    chapter: 4,
    type: 'narrative',
    time: '第五周 · 周五深夜',
    bg: 'room_night',
    speaker: 'xunian',
    char: 'xunian',
    lines: [
      { who: 'xunian', text: '我知道。' },
      { who: 'me', text: '你知道？' },
      { who: 'xunian', text: '不知道全部。但差不多。' },
      { who: 'narrator', text: '她坐在沙发边，没有哭。' },
      { who: 'xunian', text: '我最怕的不是你喜欢别人。' },
      { who: 'xunian', text: '我最怕你自己都不知道是什么时候开始的。' }
    ],
    next: 'x024a3'
  },

  x024a3: {
    id: 'x024a3',
    chapter: 4,
    type: 'narrative',
    time: '第五周 · 周五深夜',
    bg: 'room_night',
    speaker: 'xunian',
    char: 'xunian',
    lines: [
      { who: 'xunian', text: '下次，别让我自己发现。' },
      { who: 'narrator', text: '她把脸埋进你肩膀。你闻到她头发上的洗发水味，超市买一送一的那款。' },
      { who: 'narrator', text: '你忽然很庆幸，今晚你没撒那个谎。' }
    ],
    choices: [
      { text: '「不会了。」', mech: 'voice_express', effects: { bond: 4, guilt: -3 }, next: 'n014' },
      { text: '（只是更紧地抱住她）', mech: 'loyalty_wait', effects: { bond: 3 }, next: 'n014' }
    ],
    next: 'n014'
  },

  x024b: {
    id: 'x024b',
    chapter: 4,
    type: 'narrative',
    time: '第五周 · 周五深夜',
    bg: 'room_night',
    speaker: 'xunian',
    char: 'xunian',
    lines: [
      { who: 'xunian', text: '嗯。' },
      { who: 'narrator', text: '她转身去倒水。杯子碰到台面，很轻的一声。' }
    ],
    choices: [
      {
        text: '「你信我吗？」',
        mech: 'voice_express',
        effects: { bond: 5, guilt: -3 },
        next: 'x024b3'
      },
      {
        text: '（沉默）',
        mech: 'neglect',
        attach: { avoidance: 3 },
        effects: { bond: -4, secrecy: 3 },
        next: 'x024b3'
      }
    ],
    next: 'x024b3'
  },

  x024b3: {
    id: 'x024b3',
    chapter: 4,
    type: 'narrative',
    time: '第五周 · 周五深夜',
    bg: 'room_night',
    speaker: 'xunian',
    char: 'xunian',
    lines: [
      { who: 'narrator', text: '她没有再问。只是把手机放到离你更远的那边床头柜上。' },
      { who: 'xunian', text: '早点睡。明天还上班。' },
      { who: 'narrator', text: '她说得和平时一样。' },
      { who: 'narrator', text: '只有你知道，"同事"这两个字刚刚从你嘴里出来过。' }
    ],
    next: 'n014'
  },

  x024c: {
    id: 'x024c',
    chapter: 4,
    type: 'narrative',
    time: '第五周 · 周五深夜',
    bg: 'room_night',
    speaker: 'xunian',
    char: 'xunian',
    lines: [
      { who: 'narrator', text: '你把手机扣下。她没追问，背对着你把杯子洗干净，放回架子上。' },
      { who: 'xunian', text: '水有点凉。我帮你热一下。' }
    ],
    choices: [
      {
        text: '「我去洗澡。」',
        mech: 'deactivate',
        effects: { secrecy: 6, bond: -3 },
        next: 'x024c3'
      },
      {
        text: '「你也早点睡。」',
        mech: 'voice_express',
        effects: { bond: 4, boundary: 2 },
        next: 'x024c3'
      }
    ],
    next: 'x024c3'
  },

  x024c3: {
    id: 'x024c3',
    chapter: 4,
    type: 'narrative',
    time: '第五周 · 周五深夜',
    bg: 'room_night',
    speaker: 'xunian',
    char: 'xunian',
    lines: [
      { who: 'narrator', text: '你背对着她洗了把脸。水在指缝间凉得发颤。' },
      { who: 'xunian', text: '水热好了。喝完早点睡。' },
      { who: 'narrator', text: '你伸手接过来。杯壁很热，手心却没有暖起来。' }
    ],
    next: 'n014'
  },

  x024d: {
    id: 'x024d',
    chapter: 4,
    type: 'narrative',
    time: '第五周 · 周五深夜',
    bg: 'room_night',
    speaker: 'xunian',
    char: 'xunian',
    lines: [
      { who: 'xunian', text: '我改签了。想给你个惊喜。' },
      { who: 'narrator', text: '她盯着你两秒。那两秒很长。' },
      { who: 'xunian', text: '不欢迎？' }
    ],
    choices: [
      {
        text: '「怎么不早说。」',
        mech: 'voice_express',
        effects: { bond: 3, guilt: -2 },
        next: 'x024d3'
      },
      {
        text: '「……也好。」',
        mech: 'neglect',
        attach: { avoidance: 4 },
        effects: { bond: -5, secrecy: 4 },
        next: 'x024d3'
      }
    ],
    next: 'x024d3'
  },

  x024d3: {
    id: 'x024d3',
    chapter: 4,
    type: 'narrative',
    time: '第五周 · 周五深夜',
    bg: 'room_night',
    speaker: 'xunian',
    char: 'xunian',
    lines: [
      { who: 'narrator', text: '她没接话。浴室门关得很轻。' },
      { who: 'narrator', text: '水声响起来以后，你站在客厅，忽然发现她今天拖回来的行李箱上还挂着那张机场托运条。' },
      { who: 'narrator', text: '她一路回来。你第一件事想的，却是怎么解释手机。' }
    ],
    choices: [
      { text: '去敲门，说对不起', mech: 'voice_express', effects: { bond: 3, guilt: -2 }, next: 'n014' },
      { text: '装作什么都没发生', mech: 'neglect', attach: { avoidance: 3 }, effects: { bond: -3, secrecy: 3 }, next: 'n014' }
    ],
    next: 'n014'
  },

  /* ==================== 第五章 · 周六下午 ==================== */

  n014: {
    id: 'n014',
    chapter: 4,
    type: 'choice',
    anchor: true,
    weight: 3,
    time: '第六周 · 周六下午',
    bg: 'home_evening',
    lines: [
      { who: 'narrator', text: '周六下午三点。许念去了郊区参加同事婚礼，林晚问你要不要看展，沈砚说手里有张券月底过期。' },
      { who: 'narrator', text: '三个聊天框同时亮着。' },
      { who: 'xunian', text: '仪式还没开始。' },
      { who: 'linwan', text: '你今天有空吗' },
      { who: 'shenyan', text: '下午有时间吗？' },
      { who: 'narrator', text: '你只有这个下午。' }
    ],
    choices: [
      {
        text: '给许念发消息',
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
        text: '用沈砚那张券',
        mech: 'exit_escalate',
        effects: { heart: 6, ambiguity: 7, secrecy: 4, bond: -4, vanity: 6 },
        subEffects: { selfExpansion: 12, sunkCost: 5 },
        npcEffects: { shenyan: { affection: 12 } },
        flags: ['went_with_shenyan'],
        next: 'x014c'
      },
      {
        text: '都说没空，自己待着',
        mech: 'deactivate',
        attach: { avoidance: 5 },
        effects: { bond: -3, boundary: 2 },
        next: 'x014d'
      },
      {
        text: '回周然的消息',
        mech: 'exit_escalate',
        visible_if: { any: [{ flag: 'met_zhouran' }, { flag: 'reached_zhouran' }, { flag: 'kept_zhouran_number' }] },
        npcEffects: { zhouran: { affection: 3 } },
        next: 'x014e'
      }
    ],
    next: 'n030',
    shadow: {
      xunian: {
        before: '她出门前把冰箱里剩下的菜都做成了便当，放在第二层。',
        during: '下午三点半她发了一张婚礼现场的照片，没等到回复。',
        after: '晚上回来她说"今天挺累的"，就去洗澡了。',
        deleted: ['你下午在干嘛', '我们好久没一起出去了']
      }
    }
  },

  x014a: {
    id: 'x014a',
    chapter: 4,
    type: 'narrative',
    time: '第六周 · 周六下午',
    bg: 'home_evening',
    speaker: 'xunian',
    char: 'xunian',
    lines: [
      { who: 'me', text: '几点结束？' },
      { who: 'xunian', text: '还早。' },
      { who: 'narrator', text: '过了一会儿。' },
      { who: 'xunian', text: '怎么了？' },
      { who: 'me', text: '没什么。问一下。' },
      { who: 'xunian', text: '嗯。' },
      { who: 'narrator', text: '三点半，她发来一张照片：红色桌布，旁边是一杯没动过的饮料。' },
      { who: 'xunian', text: '仪式还有两小时。' },
      { who: 'narrator', text: '你听得出她在等一句什么。' }
    ],
    choices: [
      {
        text: '「回来路上小心，我等你。」',
        mech: 'voice_express',
        effects: { bond: 8, guilt: -4 },
        next: 'x014a2'
      },
      {
        text: '「嗯，我在家。」',
        mech: 'loyalty_wait',
        effects: { bond: 3 },
        next: 'x014a2'
      },
      {
        text: '（没回，把聊天框划走）',
        mech: 'neglect',
        attach: { avoidance: 3 },
        effects: { bond: -5, secrecy: 3 },
        next: 'x014a2'
      }
    ],
    next: 'x014a2'
  },

  x014a2: {
    id: 'x014a2',
    chapter: 4,
    type: 'narrative',
    time: '第六周 · 周六晚上',
    bg: 'home_evening',
    speaker: 'xunian',
    char: 'xunian',
    lines: [
      { who: 'narrator', text: '晚上九点，许念进门时鞋跟磨破了脚后跟。她坐在玄关的小凳上，自己贴创可贴。' },
      { who: 'me', text: '疼吗？' },
      { who: 'xunian', text: '还好。' },
      { who: 'xunian', text: '新郎是我们组的，去年就订了，一直没办。' },
      { who: 'narrator', text: '她说得很慢，像在把这一天从很远的地方搬回来。' }
    ],
    choices: [
      {
        text: '蹲下来帮她贴',
        mech: 'voice_express',
        effects: { bond: 6, guilt: -3 },
        next: 'x014a2b'
      },
      {
        text: '「下次别穿这双了。」',
        mech: 'loyalty_wait',
        effects: { bond: 2 },
        next: 'x014a3'
      }
    ],
    next: 'x014a3'
  },

  x014a2b: {
    id: 'x014a2b',
    chapter: 4,
    type: 'narrative',
    time: '第六周 · 周六晚上',
    bg: 'home_evening',
    speaker: 'xunian',
    char: 'xunian',
    lines: [
      { who: 'xunian', text: '你以前不是嫌麻烦吗？' },
      { who: 'me', text: '现在不嫌了。' },
      { who: 'narrator', text: '她看了你一眼。' },
      { who: 'xunian', text: '哦。' }
    ],
    next: 'x014a3'
  },

  x014a3: {
    id: 'x014a3',
    chapter: 4,
    type: 'narrative',
    time: '第六周 · 周六深夜',
    bg: 'home_evening',
    char: 'xunian',
    lines: [
      { who: 'narrator', text: '她睡下以后，你一个人坐在客厅。桌上还放着婚礼上带回来的糖，你拿了一颗，没吃。' },
      { who: 'narrator', text: '你想起她贴创可贴的时候没喊疼，也没让你帮忙——她只是让你看见了。' },
      { who: 'narrator', text: '上一次你们这样安静地待着，是去年冬天她发烧那晚。' }
    ],
    choices: [
      {
        text: '把今天的事记在备忘录里',
        mech: 'voice_express',
        attach: { anxiety: 1 },
        effects: { bond: 3 },
        next: 'd1'
      },
      {
        text: '睡了，明天再说',
        mech: 'deactivate',
        effects: { boundary: 2 },
        next: 'd1'
      }
    ],
    next: 'd1'
  },

  x014b: {
    id: 'x014b',
    chapter: 4,
    type: 'chat',
    time: '第六周 · 周六下午',
    bg: 'cafe',
    speaker: 'linwan',
    char: 'linwan',
    lines: [
      { who: 'narrator', text: '展在城东旧厂房，人不多。' },
      { who: 'narrator', text: '她站在一幅画前。' },
      { who: 'linwan', text: '这个……' },
      { who: 'linwan', text: '你觉得像不像两个人隔着雾？' },
      { who: 'narrator', text: '她说话的时候，手背碰到你的手背。' },
      { who: 'narrator', text: '她没马上缩回去。' }
    ],
    choices: [
      {
        text: '（也没有躲开）',
        mech: 'exit_escalate',
        effects: { heart: 6, ambiguity: 6, secrecy: 4, bond: -3 },
        npcEffects: { linwan: { affection: 8, dependency: 5 } },
        flags: ['touched_linwan'],
        next: 'x014b1b'
      },
      {
        text: '往旁边挪了半步',
        mech: 'voice_boundary',
        effects: { boundary: 4, heart: -2 },
        next: 'x014b2'
      },
      {
        text: '「画挺有意思，我们往前走？」',
        mech: 'loyalty_wait',
        effects: { boundary: 2 },
        next: 'x014b2'
      }
    ],
    next: 'x014b2'
  },

  x014b1b: {
    id: 'x014b1b',
    chapter: 4,
    type: 'chat',
    time: '第六周 · 周六下午',
    bg: 'cafe',
    speaker: 'linwan',
    char: 'linwan',
    lines: [
      { who: 'linwan', text: '……' },
      { who: 'linwan', text: '你刚才是不是碰到我了？' },
      { who: 'me', text: '嗯。' },
      { who: 'linwan', text: '哦。' },
      { who: 'narrator', text: '她低头笑了一下。' },
      { who: 'linwan', text: '那继续看。' }
    ],
    next: 'x014b2'
  },

  x014b2: {
    id: 'x014b2',
    chapter: 4,
    type: 'chat',
    time: '第六周 · 周六傍晚',
    bg: 'cafe',
    speaker: 'linwan',
    char: 'linwan',
    lines: [
      { who: 'narrator', text: '纪念品店。她拿起一张明信片。' },
      { who: 'linwan', text: '这个像你。' },
      { who: 'me', text: '哪里像？' },
      { who: 'linwan', text: '不知道。' },
      { who: 'linwan', text: '就像。' }
    ],
    choices: [
      {
        text: '「这张好看，给你。」',
        mech: 'exit_escalate',
        effects: { heart: 5, ambiguity: 5, secrecy: 3 },
        npcEffects: { linwan: { affection: 6, dependency: 4 } },
        next: 'x014b3'
      },
      {
        text: '「我还有事，先走了。」',
        mech: 'voice_boundary',
        effects: { boundary: 4 },
        next: 'x014b3'
      }
    ],
    next: 'x014b3'
  },

  x014b3: {
    id: 'x014b3',
    chapter: 4,
    type: 'chat',
    time: '第六周 · 周六夜',
    bg: 'street',
    speaker: 'linwan',
    char: 'linwan',
    lines: [
      { who: 'narrator', text: '展馆出来，天已经黑了。' },
      { who: 'linwan', text: '这张明信片我留着了。' },
      { who: 'narrator', text: '她没有问你为什么周末有空，也没有问许念在哪里。' }
    ],
    choices: [
      {
        text: '「那你呢，为什么一个人来？」',
        mech: 'exit_escalate',
        effects: { heart: 4, ambiguity: 4, secrecy: 2 },
        npcEffects: { linwan: { affection: 4 } },
        next: 'x014b4'
      },
      {
        text: '沉默地送她到地铁口',
        mech: 'voice_boundary',
        effects: { boundary: 2 },
        next: 'd1'
      }
    ],
    next: 'd1'
  },

  x014b4: {
    id: 'x014b4',
    chapter: 4,
    type: 'chat',
    time: '第六周 · 周六夜',
    bg: 'street',
    speaker: 'linwan',
    char: 'linwan',
    lines: [
      { who: 'linwan', text: '室友搬走以后，我第一次自己来。' },
      { who: 'me', text: '一个人不好？' },
      { who: 'linwan', text: '也不是。就是……' },
      { who: 'narrator', text: '她没有说完。' },
      { who: 'linwan', text: '算了。' }
    ],
    next: 'd1'
  },

  x014c: {
    id: 'x014c',
    chapter: 4,
    type: 'chat',
    time: '第六周 · 周六傍晚',
    bg: 'cafe',
    speaker: 'shenyan',
    char: 'shenyan',
    lines: [
      { who: 'narrator', text: '那张券在城南。店里下午五点几乎没人。' },
      { who: 'shenyan', text: '这家的东西还行。' },
      { who: 'me', text: '你经常来？' },
      { who: 'shenyan', text: '不经常。只是刚好有券。' },
      { who: 'narrator', text: '她把菜单递给你。' },
      { who: 'shenyan', text: '你选。' }
    ],
    choices: [
      {
        text: '「跟你在一起才敢放松。」',
        mech: 'exit_escalate',
        effects: { heart: 7, ambiguity: 7, secrecy: 4, vanity: 5 },
        subEffects: { selfExpansion: 8 },
        npcEffects: { shenyan: { affection: 10 } },
        flags: ['relaxed_with_shenyan'],
        next: 'x014c1b'
      },
      {
        text: '「毕竟这段时间太累了。」',
        mech: 'loyalty_wait',
        effects: { bond: 2 },
        next: 'x014c2'
      },
      {
        text: '「你也是，别总绷着。」',
        mech: 'voice_express',
        effects: { boundary: 2, bond: 2 },
        npcEffects: { shenyan: { affection: 3 } },
        next: 'x014c2'
      }
    ],
    next: 'x014c2'
  },

  x014c1b: {
    id: 'x014c1b',
    chapter: 4,
    type: 'chat',
    time: '第六周 · 周六傍晚',
    bg: 'cafe',
    speaker: 'shenyan',
    char: 'shenyan',
    lines: [
      { who: 'shenyan', text: '是吗？' },
      { who: 'narrator', text: '她笑了一下。' },
      { who: 'shenyan', text: '那今天算我赚到了。' },
      { who: 'narrator', text: '她没有再接。' }
    ],
    next: 'x014c2'
  },

  x014c2: {
    id: 'x014c2',
    chapter: 4,
    type: 'chat',
    time: '第六周 · 周六夜',
    bg: 'cafe',
    speaker: 'shenyan',
    char: 'shenyan',
    lines: [
      { who: 'shenyan', text: '这杯敬——被看见的人。' },
      { who: 'narrator', text: '她举杯。灯在她眼睛里亮了一下，又灭了。' }
    ],
    choices: [
      {
        text: '碰杯，一饮而尽',
        mech: 'exit_escalate',
        effects: { heart: 4, ambiguity: 4, secrecy: 3 },
        npcEffects: { shenyan: { affection: 6 } },
        next: 'x014c3'
      },
      {
        text: '「我开车，只抿一口。」',
        mech: 'voice_boundary',
        effects: { boundary: 4 },
        next: 'x014c3'
      }
    ],
    next: 'x014c3'
  },

  x014c3: {
    id: 'x014c3',
    chapter: 4,
    type: 'chat',
    time: '第六周 · 周六夜',
    bg: 'street',
    speaker: 'shenyan',
    char: 'shenyan',
    lines: [
      { who: 'narrator', text: '散场时下起了雨，她把伞往你这边偏了偏。' },
      { who: 'shenyan', text: '顺路。我送你。' },
      { who: 'narrator', text: '你闻见她身上很淡的木质香水味——和工位上那个永远在线的她，不像一个人。' }
    ],
    choices: [
      {
        text: '「那就麻烦你了。」',
        mech: 'exit_escalate',
        effects: { heart: 4, ambiguity: 4, secrecy: 2, vanity: 3 },
        npcEffects: { shenyan: { affection: 4 } },
        next: 'x014c5'
      },
      {
        text: '「我自己走，谢谢。」',
        mech: 'voice_boundary',
        effects: { boundary: 2 },
        next: 'x014c4'
      }
    ],
    next: 'd1'
  },

  x014c4: {
    id: 'x014c4',
    chapter: 4,
    type: 'narrative',
    time: '第六周 · 周六夜',
    bg: 'street',
    char: 'shenyan',
    lines: [
      { who: 'shenyan', text: '好。' },
      { who: 'narrator', text: '她把伞收回来。' },
      { who: 'shenyan', text: '周末愉快。' },
      { who: 'narrator', text: '她走进雨里，没有回头。' }
    ],
    next: 'd1'
  },

  x014d: {
    id: 'x014d',
    chapter: 4,
    type: 'narrative',
    time: '第六周 · 周六夜',
    bg: 'home_evening',
    lines: [
      { who: 'narrator', text: '三个聊天框都回了"没事"。' },
      { who: 'narrator', text: '你刷到许念的朋友圈：婚礼现场的气球拱门。' },
      { who: 'narrator', text: '再往下，是林晚分享的歌单，名字叫《一个人》。' },
      { who: 'narrator', text: '沈砚没有发朋友圈。' }
    ],
    choices: [
      {
        text: '给许念那条点个赞',
        mech: 'voice_express',
        effects: { bond: 4 },
        next: 'x014d2'
      },
      {
        text: '点开林晚的歌单听',
        mech: 'exit_escalate',
        effects: { heart: 4, ambiguity: 4, secrecy: 3 },
        npcEffects: { linwan: { affection: 5 } },
        next: 'x014d2'
      },
      {
        text: '关掉手机，睡觉',
        mech: 'deactivate',
        attach: { avoidance: 4 },
        effects: { boundary: 3 },
        next: 'x014d2'
      }
    ],
    next: 'x014d2'
  },

  x014d2: {
    id: 'x014d2',
    chapter: 4,
    type: 'narrative',
    time: '第六周 · 周六深夜',
    bg: 'home_evening',
    lines: [
      { who: 'narrator', text: '23:30。你翻开聊天列表，三个头像并排亮着。' },
      { who: 'linwan', text: '我睡了。' },
      { who: 'narrator', text: '这条消息是两小时前发的。' }
    ],
    choices: [
      {
        text: '「还没睡？」',
        mech: 'exit_escalate',
        effects: { heart: 5, ambiguity: 6, secrecy: 5 },
        npcEffects: { linwan: { affection: 7, dependency: 4 } },
        next: 'x014d3'
      },
      {
        text: '什么都不做',
        mech: 'deactivate',
        effects: { boundary: 2 },
        next: 'x014d3'
      }
    ],
    next: 'x014d3'
  },

  x014d3: {
    id: 'x014d3',
    chapter: 4,
    type: 'narrative',
    time: '第六周 · 周六深夜',
    bg: 'home_evening',
    lines: [
      { who: 'narrator', text: '你关了灯。手机放在床头。过了十分钟，你又拿起来。' },
      { who: 'narrator', text: '许念的聊天框停在下午。林晚的歌单还没听完。沈砚的最后一句是"周末愉快"。' },
      { who: 'narrator', text: '你第一次觉得，一个人的周末，也可以这么满。' }
    ],
    choices: [
      {
        text: '翻来覆去到两点',
        mech: 'neglect',
        attach: { avoidance: 2 },
        effects: { ambiguity: 2 },
        next: 'd1'
      },
      {
        text: '强迫自己睡去',
        mech: 'deactivate',
        effects: { boundary: 1 },
        next: 'd1'
      }
    ],
    next: 'd1'
  },

  d1: {
    id: 'd1',
    chapter: 4,
    type: 'narrative',
    time: '第六周 · 结束',
    bg: 'home_evening',
    lines: [
      { who: 'narrator', text: '一个周六结束。' },
      { who: 'narrator', text: '你没有真正失去什么。但你已经开始给不同的人，留不同的位置。' }
    ],
    next: 'n030'
  },

  /* ==================== 第六章 · 许念开始问 ==================== */

  n030: {
    id: 'n030',
    chapter: 4,
    type: 'narrative',
    anchor: true,
    weight: 5,
    time: '第七周 · 周三傍晚',
    bg: 'home_evening',
    char: 'xunian',
    lines: [
      { who: 'narrator', text: '周三傍晚。许念在洗碗。' },
      { who: 'narrator', text: '水流停了。她没有转身。' },
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
        next: 'n030b'
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
        before: '这句话她在草稿箱里打了三次，最后删掉了两次。',
        during: '她盯着洗碗池，没有回头。',
        after: '她等你说点别的。你没有。',
        deleted: ['你是不是不喜欢我了', '我到底哪里做错了']
      }
    }
  },

  n030b: {
    id: 'n030b',
    chapter: 4,
    type: 'narrative',
    time: '第七周 · 周三傍晚',
    bg: 'home_evening',
    char: 'xunian',
    lines: [
      { who: 'xunian', text: '没什么。' },
      { who: 'me', text: '你有话就说。' },
      { who: 'xunian', text: '我就是觉得……' },
      { who: 'narrator', text: '她擦干手。' },
      { who: 'xunian', text: '以前你下班回来，第一件事是找我。现在不是了。' },
      { who: 'narrator', text: '她把毛巾挂回原处。' },
      { who: 'xunian', text: '你不用马上解释。我只是告诉你。' }
    ],
    next: 'n031'
  },

  n031: {
    id: 'n031',
    chapter: 4,
    type: 'narrative',
    time: '第七周 · 深夜',
    bg: 'room_night',
    lines: [
      { who: 'narrator', text: '许念睡了。你坐在客厅。手机 17% 的电。' },
      { who: 'narrator', text: '屏幕上有三段对话。你往上翻，发现有些话已经忘了自己什么时候说的。' }
    ],
    choices: [
      {
        text: '删掉',
        mech: 'secrecy',
        effects: { secrecy: 18, guilt: 9, bond: -4 },
        flags: ['deleted_record'],
        next: 'n031b'
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
        text: '关掉手机，去阳台站一会儿',
        mech: 'voice_boundary',
        effects: { boundary: 5, guilt: -3, ambiguity: -3 },
        next: 'n032'
      }
    ],
    next: 'n032'
  },

  n031b: {
    id: 'n031b',
    chapter: 4,
    type: 'narrative',
    time: '第七周 · 深夜',
    bg: 'room_night',
    lines: [
      { who: 'narrator', text: '删除确认弹出来。你按下去。' },
      { who: 'narrator', text: '聊天框空了。' },
      { who: 'narrator', text: '过了一会儿，你又点开许念的聊天框。没有任何变化。' }
    ],
    next: 'n032'
  },

  n032: {
    id: 'n032',
    chapter: 4,
    type: 'narrative',
    time: '第七周 · 周日傍晚',
    bg: 'street',
    lines: [
      { who: 'narrator', text: '周日傍晚，你站在楼下，手里一支烟。' },
      { who: 'xunian', text: '回来吃饭吗？' },
      { who: 'linwan', text: '今天路过学校了。' },
      { who: 'shenyan', text: '周一会议提前到九点。' },
      { who: 'narrator', text: '你一支烟抽完。' }
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
      },
      {
        text: '沈砚在群里发了修改意见，私聊问她怎么了',
        mech: 'exit_escalate',
        visible_if: { any: [{ flag: 'flirted_shenyan' }, { flag: 'heard_shenyan_story' }, { flag: 'agreed_with_shenyan' }, { flag: 'went_with_shenyan' }, { flag: 'shenyan_offer' }] },
        npcEffects: { shenyan: { affection: 3 } },
        next: 'x031s'
      },
      {
        text: '周然又打来电话',
        mech: 'exit_escalate',
        visible_if: { any: [{ flag: 'met_zhouran' }, { flag: 'reached_zhouran' }, { flag: 'kept_zhouran_number' }, { flag: 'took_zhouran_call' }] },
        npcEffects: { zhouran: { affection: 3 } },
        next: 'n030a'
      }
    ],
    next: 'n033'
  },

  /* ==================== 第七章 · 最后一次见面 ==================== */

  n033: {
    id: 'n033',
    chapter: 4,
    type: 'chat',
    anchor: true,
    weight: 5,
    time: '第八周 · 周四',
    bg: 'cafe',
    speaker: 'linwan',
    char: 'linwan',
    lines: [
      { who: 'linwan', text: '周六下午有空吗' },
      { who: 'linwan', text: '我有个东西想当面给你。' },
      { who: 'narrator', text: '你看了很久。' }
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
      },
      {
        text: '沈砚把最后一份文件发给你',
        mech: 'exit_escalate',
        visible_if: { any: [{ flag: 'flirted_shenyan' }, { flag: 'heard_shenyan_story' }, { flag: 'agreed_with_shenyan' }, { flag: 'went_with_shenyan' }, { flag: 'shenyan_offer' }] },
        npcEffects: { shenyan: { affection: 3 } },
        next: 'n033s'
      },
      {
        text: '周然发了条搬家消息',
        mech: 'exit_escalate',
        visible_if: { any: [{ flag: 'met_zhouran' }, { flag: 'reached_zhouran' }, { flag: 'kept_zhouran_number' }, { flag: 'took_zhouran_call' }] },
        npcEffects: { zhouran: { affection: 3 } },
        next: 'n033r'
      }
    ],
    next: 'n040',
    shadow: {
      linwan: {
        before: '那个东西她带在包里两周了，一直没敢拿出来。',
        during: '发出去以后她把手机屏幕朝下扣在桌上。',
        after: '她一晚上没看手机，因为她不敢看。',
        deleted: ['我想见你', '就这一次', '我不会打扰你的']
      }
    }
  },

  x033a: {
    id: 'x033a',
    chapter: 4,
    type: 'chat',
    time: '第八周 · 周六下午',
    bg: 'cafe',
    speaker: 'linwan',
    char: 'linwan',
    lines: [
      { who: 'narrator', text: '城西那家小店，林晚比你先到。桌上放着一杯柠檬水，旁边的冰已经化了一半。' },
      { who: 'linwan', text: '这个是你的吧。' },
      { who: 'narrator', text: '她推过来一本软皮笔记本，封面贴着大三那年的课程表。' },
      { who: 'me', text: '我以为丢了。' },
      { who: 'linwan', text: '我捡到的。' },
      { who: 'me', text: '为什么现在给我？' },
      { who: 'linwan', text: '以前想给。后来忘了。' },
      { who: 'narrator', text: '停顿。' },
      { who: 'linwan', text: '其实没忘。' }
    ],
    choices: [
      {
        text: '翻开看看',
        mech: 'exit_escalate',
        effects: { heart: 8, ambiguity: 8, secrecy: 6, guilt: 4 },
        subEffects: { attachmentAnx: 10, sunkCost: 6 },
        npcEffects: { linwan: { affection: 12, dependency: 10 } },
        flags: ['opened_gift'],
        next: 'x033a2'
      },
      {
        text: '「先收着，回家再看。」',
        mech: 'voice_boundary',
        effects: { boundary: 5, heart: -3 },
        next: 'x033a2'
      }
    ],
    next: 'x033a2'
  },

  x033a2: {
    id: 'x033a2',
    chapter: 4,
    type: 'chat',
    time: '第八周 · 周六下午',
    bg: 'cafe',
    speaker: 'linwan',
    char: 'linwan',
    lines: [
      { who: 'narrator', text: '最后一页夹着一张纸。铅笔画的：学校后门那家馆子，靠墙的位置，两个人。右下角写着日期。' },
      { who: 'linwan', text: '我那天回去画的。' },
      { who: 'me', text: '为什么？' },
      { who: 'linwan', text: '不知道。' },
      { who: 'narrator', text: '她看着画。' },
      { who: 'linwan', text: '就是觉得……那天挺好的。' }
    ],
    choices: [
      {
        text: '「画得真好。」',
        mech: 'voice_express',
        effects: { heart: 7, reliance: 5 },
        subEffects: { attachmentAnx: 8 },
        npcEffects: { linwan: { affection: 10, dependency: 9 } },
        next: 'x033a3'
      },
      {
        text: '「这个我不能收。」',
        mech: 'voice_boundary',
        effects: { boundary: 6, heart: -4 },
        npcEffects: { linwan: { affection: -6 } },
        next: 'x033a3'
      },
      {
        text: '（把它夹回本子里，合上）',
        mech: 'deactivate',
        attach: { avoidance: 4 },
        effects: { ambiguity: 2, guilt: 3 },
        next: 'x033a3'
      }
    ],
    next: 'x033a3'
  },

  x033a3: {
    id: 'x033a3',
    chapter: 4,
    type: 'chat',
    time: '第八周 · 周六傍晚',
    bg: 'street',
    speaker: 'linwan',
    char: 'linwan',
    lines: [
      { who: 'narrator', text: '出门时下着小雨。林晚撑伞，伞面明显往你这边偏。' },
      { who: 'linwan', text: '伞我也是跟别人借的。' },
      { who: 'narrator', text: '她笑了一下。' },
      { who: 'linwan', text: '所以不用还我。' }
    ],
    choices: [
      {
        text: '把伞接过来，往她那边偏',
        mech: 'exit_escalate',
        effects: { heart: 4, ambiguity: 5, secrecy: 3 },
        npcEffects: { linwan: { affection: 4 } },
        next: 'x033a4'
      },
      {
        text: '「那我先走了，伞你留着。」',
        mech: 'voice_boundary',
        effects: { boundary: 2 },
        next: 'd3'
      }
    ],
    next: 'd3'
  },

  x033a4: {
    id: 'x033a4',
    chapter: 4,
    type: 'chat',
    time: '第八周 · 周六傍晚',
    bg: 'street',
    speaker: 'linwan',
    char: 'linwan',
    lines: [
      { who: 'linwan', text: '……' },
      { who: 'linwan', text: '你不用这样。' },
      { who: 'me', text: '哪样？' },
      { who: 'linwan', text: '对我好。' },
      { who: 'narrator', text: '她低下头。' },
      { who: 'linwan', text: '我会当真的。' }
    ],
    next: 'd3'
  },

  d3: {
    id: 'd3',
    chapter: 4,
    type: 'narrative',
    time: '第八周 · 结束',
    bg: 'cafe',
    lines: [
      { who: 'narrator', text: '第八周。' },
      { who: 'narrator', text: '你开始习惯有个人，在你没要求的时候，就把位置给你留好。' },
      { who: 'narrator', text: '有些线，踩过一次就不再是线，成了路。' }
    ],
    next: 'n040'
  },

  /* ==================== 第八章 · 最后一夜 ==================== */

  n040: {
    id: 'n040',
    chapter: 4,
    type: 'choice',
    weight: 5,
    time: '第八周 · 最后一夜',
    bg: 'street',
    lines: [
      { who: 'narrator', text: '最后一夜。' },
      { who: 'narrator', text: '许念昨天回她妈妈那里了，说明天下午回来。林晚发来的地址在城西，开车四十分钟。' },
      { who: 'narrator', text: '沈砚没有消息。' },
      { who: 'narrator', text: '手机放在玄关柜上，旁边是钥匙。你站了很久。' }
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
        text: '不出门，给林晚发消息说清楚',
        mech: 'voice_boundary',
        effects: { boundary: 10, ambiguity: -8, guilt: -4, bond: 3 },
        flags: ['ended_it'],
        next: 'x040b'
      },
      {
        text: '不出门，等许念回来，把事情告诉她',
        mech: 'confess',
        effects: { boundary: 8, secrecy: -18, bond: 10, guilt: -8 },
        flags: ['confessed'],
        next: 'x040c'
      },
      {
        text: '不出门，什么也不说',
        mech: 'neglect',
        attach: { avoidance: 8 },
        effects: { secrecy: 8, guilt: 6, bond: -5 },
        flags: ['silent_ending'],
        next: 'x040d'
      }
    ],
    next: 'n041'
  },

  x040a: {
    id: 'x040a',
    chapter: 4,
    type: 'narrative',
    time: '第八周 · 最后一夜',
    bg: 'street',
    lines: [
      { who: 'narrator', text: '车开到城西。雨刷在玻璃上来回刮，你没有立刻上楼。' },
      { who: 'narrator', text: '23:14，你拨通林晚的电话，响了三声。' },
      { who: 'linwan', text: '喂？' }
    ],
    choices: [
      {
        text: '「我到了，上来吗？」',
        mech: 'exit_escalate',
        effects: { heart: 12, ambiguity: 14, secrecy: 10, guilt: 8, bond: -10 },
        subEffects: { attachmentAnx: 16, sunkCost: 10 },
        npcEffects: { linwan: { affection: 16, dependency: 14 } },
        flags: ['went_up'],
        next: 'x040a2'
      },
      {
        text: '「算了，掉头回家。」',
        mech: 'voice_boundary',
        effects: { boundary: 8, bond: 4 },
        next: 'x040a3'
      }
    ],
    next: 'x040a3'
  },

  x040a2: {
    id: 'x040a2',
    chapter: 4,
    type: 'narrative',
    time: '第八周 · 最后一夜',
    bg: 'street',
    char: 'linwan',
    lines: [
      { who: 'narrator', text: '你没有下车。电话还通着。' },
      { who: 'linwan', text: '你在下面？' },
      { who: 'me', text: '嗯。' },
      { who: 'linwan', text: '那你上来。' },
      { who: 'narrator', text: '你看着楼道口的灯。过了二十分钟，你还是没有动。' },
      { who: 'me', text: '算了。' },
      { who: 'linwan', text: '……' },
      { who: 'linwan', text: '好。' },
      { who: 'narrator', text: '电话挂断。' }
    ],
    next: 'x040a3'
  },

  x040a3: {
    id: 'x040a3',
    chapter: 4,
    type: 'narrative',
    time: '第八周 · 最后一夜',
    bg: 'street',
    lines: [
      { who: 'narrator', text: '车开回去的时候，已经凌晨一点。红灯还有六十秒，你把手放在方向盘上。' },
      { who: 'narrator', text: '如果那天你真的上了楼，故事会是另一个样子。' },
      { who: 'narrator', text: '有些边界，是在"差点越过去"的那一刻，才被你看见的。' }
    ],
    choices: [
      {
        text: '「还好，我停住了。」',
        mech: 'voice_boundary',
        effects: { boundary: 4, bond: 3 },
        next: 'd4'
      },
      {
        text: '（后悔没上去）',
        mech: 'exit_escalate',
        effects: { heart: 3, ambiguity: 4, secrecy: 3 },
        next: 'd4'
      }
    ],
    next: 'd4'
  },

  x040b: {
    id: 'x040b',
    chapter: 4,
    type: 'narrative',
    time: '第八周 · 最后一夜',
    bg: 'room_night',
    lines: [
      { who: 'me', text: '我们到此为止吧。对不起。' },
      { who: 'narrator', text: '三秒。她回了一个句号，只有一个句号。' }
    ],
    choices: [
      {
        text: '发完就把手机放下',
        mech: 'voice_boundary',
        effects: { boundary: 8, ambiguity: -6, guilt: -4, bond: 3 },
        next: 'x040b3'
      },
      {
        text: '又解释一句',
        mech: 'rationalization',
        effects: { secrecy: 6, guilt: 4, ambiguity: 4 },
        next: 'x040b2'
      }
    ],
    next: 'x040b3'
  },

  x040b2: {
    id: 'x040b2',
    chapter: 4,
    type: 'narrative',
    time: '第八周 · 最后一夜',
    bg: 'room_night',
    char: 'linwan',
    lines: [
      { who: 'me', text: '不是你的问题。' },
      { who: 'linwan', text: '我知道。你不用解释。' },
      { who: 'narrator', text: '过了很久。' },
      { who: 'linwan', text: '晚安。' }
    ],
    next: 'x040b3'
  },

  x040b3: {
    id: 'x040b3',
    chapter: 4,
    type: 'narrative',
    time: '第八周 · 最后一夜',
    bg: 'room_night',
    lines: [
      { who: 'narrator', text: '你把那句"到此为止"读了三遍，像在读别人的事。' },
      { who: 'narrator', text: '林晚的句号还在。' },
      { who: 'narrator', text: '你第一次发现，结束一件事，不需要双方都准备好。' }
    ],
    choices: [
      {
        text: '把聊天框删了',
        mech: 'voice_boundary',
        effects: { boundary: 4, ambiguity: -3 },
        next: 'd4'
      },
      {
        text: '留着，反复看',
        mech: 'rationalization',
        effects: { ambiguity: 3, secrecy: 2 },
        next: 'd4'
      }
    ],
    next: 'd4'
  },

  x040c: {
    id: 'x040c',
    chapter: 4,
    type: 'narrative',
    time: '第八周 · 最后一天下午',
    bg: 'home_evening',
    speaker: 'xunian',
    char: 'xunian',
    lines: [
      { who: 'narrator', text: '第二天下午，许念推门进来，把包放在鞋柜上。' },
      { who: 'xunian', text: '吃饭了吗？' },
      { who: 'me', text: '许念。我有件事想跟你说。' },
      { who: 'narrator', text: '她停下来，没有催，只是坐下。' },
      { who: 'narrator', text: '你把这八周里发生过的事情，一件一件说出来。没有删掉的部分，也没有把责任推给别人。' },
      { who: 'xunian', text: '……' },
      { who: 'xunian', text: '我大概猜到了。' },
      { who: 'narrator', text: '她一直捏着包的背带。' }
    ],
    choices: [
      {
        text: '「我先睡沙发。」',
        mech: 'confess',
        effects: { boundary: 6, secrecy: -12, bond: 8, guilt: -6 },
        next: 'x040c3'
      },
      {
        text: '「你要怎么处理都行。」',
        mech: 'neglect',
        effects: { bond: -4, secrecy: 4 },
        next: 'x040c3'
      },
      {
        text: '沈砚发来最后一条消息',
        mech: 'exit_escalate',
        visible_if: { any: [{ flag: 'flirted_shenyan' }, { flag: 'heard_shenyan_story' }, { flag: 'agreed_with_shenyan' }, { flag: 'went_with_shenyan' }, { flag: 'shenyan_offer' }] },
        npcEffects: { shenyan: { affection: 3 } },
        next: 'n040s'
      },
      {
        text: '周然发来一条短信',
        mech: 'exit_escalate',
        visible_if: { any: [{ flag: 'met_zhouran' }, { flag: 'reached_zhouran' }, { flag: 'kept_zhouran_number' }, { flag: 'took_zhouran_call' }] },
        npcEffects: { zhouran: { affection: 3 } },
        next: 'r040'
      }
    ],
    next: 'x040c3'
  },

  x040c3: {
    id: 'x040c3',
    chapter: 4,
    type: 'narrative',
    time: '第八周 · 最后一夜',
    bg: 'home_evening',
    speaker: 'xunian',
    char: 'xunian',
    lines: [
      { who: 'xunian', text: '我需要一点时间。' },
      { who: 'narrator', text: '她从钥匙串上取下一把钥匙，放在茶几上。金属碰到玻璃，嗒。' },
      { who: 'xunian', text: '不是今天就决定。我只是今天不想跟你一起睡。' }
    ],
    choices: [
      {
        text: '「我等你。」',
        mech: 'confess',
        effects: { boundary: 3, bond: 5, guilt: -4 },
        next: 'x040c4'
      },
      {
        text: '（说不出话）',
        mech: 'neglect',
        effects: { bond: -2, secrecy: 2 },
        next: 'd4'
      }
    ],
    next: 'd4'
  },

  x040c4: {
    id: 'x040c4',
    chapter: 4,
    type: 'narrative',
    time: '第八周 · 最后一夜',
    bg: 'home_evening',
    speaker: 'xunian',
    char: 'xunian',
    lines: [
      { who: 'xunian', text: '别等。先把自己想明白。' },
      { who: 'narrator', text: '她拿着睡衣去了客房。门关上。' },
      { who: 'narrator', text: '没有摔门。' }
    ],
    next: 'd4'
  },

  x040d: {
    id: 'x040d',
    chapter: 4,
    type: 'narrative',
    time: '第八周 · 最后一夜',
    bg: 'home_evening',
    lines: [
      { who: 'narrator', text: '你坐在客厅。电视没开，一直到天亮。' },
      { who: 'narrator', text: '凌晨四点，手机还有 9%。一个头像还亮着。' }
    ],
    choices: [
      {
        text: '（什么都不做）',
        mech: 'neglect',
        effects: { secrecy: 8, guilt: 6, bond: -5 },
        next: 'x040d3'
      },
      {
        text: '凌晨给一个人发「在吗」',
        mech: 'deactivate',
        effects: { ambiguity: 3, secrecy: 4 },
        next: 'x040d3'
      }
    ],
    next: 'x040d3'
  },

  x040d3: {
    id: 'x040d3',
    chapter: 4,
    type: 'narrative',
    time: '第八周 · 最后一夜',
    bg: 'home_evening',
    lines: [
      { who: 'narrator', text: '天快亮，你躺回床上。许念还没醒。' },
      { who: 'narrator', text: '她睡觉的时候习惯把手伸过来，这次也一样，手搭在你腰上。你没有动。' }
    ],
    choices: [
      {
        text: '（闭上眼，继续装睡）',
        mech: 'neglect',
        effects: { secrecy: 4, bond: -2 },
        next: 'd4'
      },
      {
        text: '转身抱住她',
        mech: 'loyalty_wait',
        effects: { bond: 3, secrecy: -2 },
        next: 'x040d4'
      }
    ],
    next: 'd4'
  },

  x040d4: {
    id: 'x040d4',
    chapter: 4,
    type: 'narrative',
    time: '第八周 · 最后一夜',
    bg: 'home_evening',
    speaker: 'xunian',
    char: 'xunian',
    lines: [
      { who: 'narrator', text: '她醒了一下。' },
      { who: 'xunian', text: '几点了？' },
      { who: 'me', text: '六点多。' },
      { who: 'xunian', text: '哦。' },
      { who: 'narrator', text: '她重新闭上眼。你抱着她，谁也没有再说话。' }
    ],
    next: 'd4'
  },

  d4: {
    id: 'd4',
    chapter: 4,
    type: 'narrative',
    time: '八周 · 结束',
    bg: 'home_evening',
    lines: [
      { who: 'narrator', text: '八周，结束。' },
      { who: 'system', text: '档案记录完成。' },
      { who: 'narrator', text: '你以为自己是在看一个人的选择。' },
      { who: 'narrator', text: '直到最后你才发现，档案里从来没有"别人"。' },
      { who: 'system', text: 'CASE 027。对象记录结束。' },
      { who: 'system', text: '检茶员，请提交你的报告。' }
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
      { who: 'system', text: '好了。摊牌。' },
      { who: 'narrator', text: '你以为自己在检查别人。' },
      { who: 'narrator', text: '其实这八周，档案一直记录的是你。' },
      { who: 'system', text: '你是 CASE 027。' }
    ],
    next: null
  },

  /* ==================== 沈砚线 · 扩写新增节点 ==================== */

  n012c: {
    id: 'n012c',
    chapter: 2,
    type: 'narrative',
    time: '第三周 · 周二晚上',
    bg: 'office',
    char: 'shenyan',
    lines: [
      { who: 'narrator', text: '晚上 21:47，你收到沈砚发来的文件。' },
      { who: 'shenyan', text: '我把第三页改了一版。' },
      { who: 'shenyan', text: '不是你原来的意思，但逻辑会更顺。' },
      { who: 'narrator', text: '下面是一张截图。' },
      { who: 'narrator', text: '她没有说"你写错了"。' },
      { who: 'narrator', text: '只是把两个版本并排放在一起。' }
    ],
    choices: [
      { text: '「还是我的版本好。」', mech: 'voice_express', next: 'n012c2' },
      { text: '「你改得更好。」', mech: 'exit_escalate', npcEffects: { shenyan: { affection: 4 } }, next: 'n012b' },
      { text: '「我明天再看。」', mech: 'loyalty_wait', next: 'n012b' }
    ],
    next: 'n012b'
  },

  n012c2: {
    id: 'n012c2',
    chapter: 2,
    type: 'narrative',
    time: '第三周 · 周二晚上',
    bg: 'office',
    char: 'shenyan',
    lines: [
      { who: 'shenyan', text: '我也这么觉得。' },
      { who: 'narrator', text: '你愣了一下。' },
      { who: 'shenyan', text: '所以我没替你改。' },
      { who: 'shenyan', text: '我只是告诉你另一种写法。' }
    ],
    choices: [
      { text: '「你为什么这么照顾我？」', mech: 'exit_escalate', npcEffects: { shenyan: { affection: 5 } }, next: 'n012b' },
      { text: '「知道了，谢谢。」', mech: 'voice_express', next: 'n012b' },
      { text: '「我自己能处理。」', mech: 'voice_boundary', next: 'n012b' }
    ],
    next: 'n012b'
  },

  n012b3: {
    id: 'n012b3',
    chapter: 2,
    type: 'narrative',
    time: '第三周 · 深夜',
    bg: 'office',
    char: 'shenyan',
    lines: [
      { who: 'narrator', text: '你看了一眼她手里的保温杯。' },
      { who: 'shenyan', text: '这个？' },
      { who: 'shenyan', text: '用了六年。' }
    ],
    choices: [
      { text: '「为什么不换？」', mech: 'voice_express', next: 'n012d' },
      { text: '「我送你一个新的。」', mech: 'exit_escalate', npcEffects: { shenyan: { affection: 4 } }, next: 'n012d' },
      { text: '「胶都快掉了。」', mech: 'loyalty_wait', next: 'n012d' }
    ],
    next: 'n012d'
  },

  n012d: {
    id: 'n012d',
    chapter: 2,
    type: 'narrative',
    time: '第三周 · 周五晚上',
    bg: 'office',
    char: 'shenyan',
    lines: [
      { who: 'narrator', text: '周五晚上九点四十三。你们还在办公室。' },
      { who: 'narrator', text: '沈砚第三次看见你拿起手机。' },
      { who: 'shenyan', text: '你今晚不走？' }
    ],
    choices: [
      { text: '「没什么事。」', mech: 'loyalty_wait', next: 'n012d2' },
      { text: '「有人给我发消息。」', mech: 'voice_express', next: 'n012d2' },
      { text: '「你观察得这么仔细？」', mech: 'exit_escalate', npcEffects: { shenyan: { affection: 3 } }, next: 'n012d2' }
    ],
    next: 'n012d2'
  },

  n012d2: {
    id: 'n012d2',
    chapter: 2,
    type: 'narrative',
    time: '第三周 · 周五晚上',
    bg: 'office',
    char: 'shenyan',
    lines: [
      { who: 'shenyan', text: '做项目养成的习惯。' },
      { who: 'shenyan', text: '不是针对你。' },
      { who: 'shenyan', text: '你不用跟我解释。' },
      { who: 'shenyan', text: '我只是问你还走不走。' }
    ],
    choices: [
      { text: '「现在走。」', mech: 'voice_boundary', next: 'n022' },
      { text: '「我也不知道。」', mech: 'voice_express', next: 'n022' },
      { text: '「你要不要一起吃点东西？」', mech: 'exit_escalate', npcEffects: { shenyan: { affection: 5, dependency: 2 } }, next: 'n022' }
    ],
    next: 'n022'
  },

  n022a: {
    id: 'n022a',
    chapter: 2,
    type: 'narrative',
    time: '第三周 · 周五傍晚',
    bg: 'cafe',
    char: 'shenyan',
    lines: [
      { who: 'narrator', text: '电梯从十七楼往下。两个人都没有说话。' },
      { who: 'shenyan', text: '我刚才那句话说得不太合适。' }
    ],
    choices: [
      { text: '「没事。」', mech: 'loyalty_wait', next: 'n022a2' },
      { text: '「你确实说中了。」', mech: 'exit_escalate', npcEffects: { shenyan: { affection: 3 } }, next: 'n022a2' },
      { text: '「你不了解她。」', mech: 'voice_boundary', next: 'n022a2' }
    ],
    next: 'n022a2'
  },

  n022a2: {
    id: 'n022a2',
    chapter: 2,
    type: 'narrative',
    time: '第三周 · 晚上',
    bg: 'cafe',
    char: 'shenyan',
    lines: [
      { who: 'shenyan', text: '嗯。所以我收回。' },
      { who: 'narrator', text: '电梯到了十二楼。' },
      { who: 'shenyan', text: '我不应该替你判断她。' },
      { who: 'narrator', text: '电梯门重新关上。' },
      { who: 'shenyan', text: '但那个项目，你可以继续做。' },
      { who: 'shenyan', text: '不是因为我觉得你女朋友不懂你。' },
      { who: 'shenyan', text: '是因为你自己想做。' }
    ],
    choices: [
      { text: '「你怎么知道我想做？」', mech: 'voice_express', next: 'n022b' },
      { text: '「因为你记得。」', mech: 'exit_escalate', npcEffects: { shenyan: { affection: 3 } }, next: 'n022b' },
      { text: '「我会考虑。」', mech: 'loyalty_wait', next: 'n022b' }
    ],
    next: 'n022b'
  },

  n022x: {
    id: 'n022x',
    chapter: 2,
    type: 'narrative',
    time: '第四周 · 周一晚上',
    bg: 'cafe',
    char: 'shenyan',
    lines: [
      { who: 'narrator', text: '周一晚上七点。你第一次发现沈砚准时走了。' },
      { who: 'narrator', text: '她收好电脑，拿起车钥匙。' },
      { who: 'shenyan', text: '今天不加班。' }
    ],
    choices: [
      { text: '「你去哪？」', mech: 'exit_escalate', npcEffects: { shenyan: { affection: 2 } }, next: 'n022x2' },
      { text: '「路上小心。」', mech: 'voice_boundary', next: 'n022x2' },
      { text: '「难得。」', mech: 'voice_express', next: 'n022x2' }
    ],
    next: 'n022x2'
  },

  n022x2: {
    id: 'n022x2',
    chapter: 2,
    type: 'narrative',
    time: '第四周 · 周一晚上',
    bg: 'cafe',
    char: 'shenyan',
    lines: [
      { who: 'shenyan', text: '吃饭。人总得吃饭。' },
      { who: 'narrator', text: '她在公司楼下的餐厅坐下。' },
      { who: 'shenyan', text: '你吃什么？' }
    ],
    choices: [
      { text: '「跟你一样。」', mech: 'exit_escalate', npcEffects: { shenyan: { affection: 3 } }, next: 'n022x3' },
      { text: '「随便。」', mech: 'loyalty_wait', next: 'n022x3' },
      { text: '「我自己点。」', mech: 'voice_boundary', next: 'n022x3' }
    ],
    next: 'n022x3'
  },

  n022x3: {
    id: 'n022x3',
    chapter: 2,
    type: 'narrative',
    time: '第四周 · 晚餐',
    bg: 'cafe',
    char: 'shenyan',
    lines: [
      { who: 'narrator', text: '她没有替你决定。她把菜单推回来。' },
      { who: 'narrator', text: '菜上来以后，你只吃了几口。' },
      { who: 'shenyan', text: '你今天没怎么吃。' }
    ],
    choices: [
      { text: '「你一直看我？」', mech: 'exit_escalate', npcEffects: { shenyan: { affection: 3 } }, next: 'n022x4' },
      { text: '「下午有点忙。」', mech: 'voice_express', next: 'n022x4' },
      { text: '「没什么胃口。」', mech: 'loyalty_wait', next: 'n022x4' }
    ],
    next: 'n022x4'
  },

  n022x4: {
    id: 'n022x4',
    chapter: 2,
    type: 'narrative',
    time: '第四周 · 晚餐',
    bg: 'cafe',
    char: 'shenyan',
    lines: [
      { who: 'shenyan', text: '那就少吃一点。不用为了我把它吃完。' },
      { who: 'narrator', text: '你拿起手机看了一眼。沈砚看到了。' },
      { who: 'shenyan', text: '你不用跟我解释。' },
      { who: 'shenyan', text: '我只是觉得，吃饭的时候吃饭。' }
    ],
    choices: [
      { text: '放下手机', mech: 'voice_boundary', next: 'n022x5' },
      { text: '「你管得还挺多。」', mech: 'voice_express', next: 'n022x5' },
      { text: '「如果我想跟你说呢？」', mech: 'exit_escalate', npcEffects: { shenyan: { affection: 4 } }, next: 'n022x5' }
    ],
    next: 'n022x5'
  },

  n022x5: {
    id: 'n022x5',
    chapter: 2,
    type: 'narrative',
    time: '第四周 · 晚餐',
    bg: 'cafe',
    char: 'shenyan',
    lines: [
      { who: 'shenyan', text: '那你说。' },
      { who: 'narrator', text: '她把筷子放下，没有催你。' },
      { who: 'narrator', text: '你最后什么都没说。她也没有追问。' },
      { who: 'narrator', text: '服务员过来收盘子时，她把自己的杯子往旁边挪了一点。' },
      { who: 'shenyan', text: '走吧。明天还有会。' },
      { who: 'narrator', text: '她没有因为你沉默而改变语气。' }
    ],
    next: 'n022c'
  },

  n022c: {
    id: 'n022c',
    chapter: 2,
    type: 'narrative',
    time: '第五周 · 周二下午',
    bg: 'office',
    char: 'shenyan',
    lines: [
      { who: 'narrator', text: '周二下午，沈砚把你叫到会议室。' },
      { who: 'shenyan', text: '下个月有个项目。我可以把你放进去。但会很累。' }
    ],
    choices: [
      { text: '「为什么是我？」', mech: 'voice_express', npcEffects: { shenyan: { affection: 2 } }, next: 'n022c2' },
      { text: '「你安排就行。」', mech: 'exit_escalate', npcEffects: { shenyan: { affection: 3 } }, next: 'n022c2' },
      { text: '「我考虑一下。」', mech: 'loyalty_wait', next: 'n022c2' }
    ],
    next: 'n022c2'
  },

  n022c2: {
    id: 'n022c2',
    chapter: 2,
    type: 'narrative',
    time: '第五周 · 下午',
    bg: 'office',
    char: 'shenyan',
    lines: [
      { who: 'shenyan', text: '因为你适合。' },
      { who: 'narrator', text: '她把项目资料递给你。' },
      { who: 'shenyan', text: '你不用现在回答。我也不希望你因为欠我什么才答应。' }
    ],
    choices: [
      { text: '「我不会欠你的。」', mech: 'voice_boundary', next: 'n022c3' },
      { text: '「我会考虑。」', mech: 'loyalty_wait', next: 'n022c3' },
      { text: '「如果是你带，我愿意。」', mech: 'exit_escalate', npcEffects: { shenyan: { affection: 6, dependency: 2 } }, flags: ['shenyan_offer'], next: 'n022c3' }
    ],
    next: 'n022c3'
  },

  n022c3: {
    id: 'n022c3',
    chapter: 2,
    type: 'narrative',
    time: '第五周 · 下午',
    bg: 'office',
    char: 'shenyan',
    lines: [
      { who: 'shenyan', text: '别这么回答。' },
      { who: 'narrator', text: '她看了你两秒。' },
      { who: 'shenyan', text: '因为项目结束以后，你还是要回到你自己的生活。' },
      { who: 'shenyan', text: '我不希望你把这两件事混在一起。' }
    ],
    choices: [
      { text: '「为什么？」', mech: 'exit_escalate', npcEffects: { shenyan: { affection: 3 } }, next: 'n022c4' },
      { text: '「知道了。」', mech: 'voice_boundary', next: 'n022c4' },
      { text: '沉默', mech: 'loyalty_wait', next: 'n022c4' }
    ],
    next: 'n022c4'
  },

  n022c4: {
    id: 'n022c4',
    chapter: 2,
    type: 'narrative',
    time: '第五周 · 下午',
    bg: 'office',
    char: 'shenyan',
    lines: [
      { who: 'narrator', text: '她把项目资料收回来一页。' },
      { who: 'shenyan', text: '你真正想做，就告诉我。不想做，也不用解释。' }
    ],
    choices: [
      { text: '「我想做。」', mech: 'voice_express', npcEffects: { shenyan: { affection: 4 } }, next: 'n013a' },
      { text: '「让我再想想。」', mech: 'loyalty_wait', next: 'n013a' },
      { text: '「如果你希望我做，我就做。」', mech: 'exit_escalate', npcEffects: { shenyan: { affection: 4 } }, next: 'n013a' }
    ],
    next: 'n013a'
  },

  x014c5: {
    id: 'x014c5',
    chapter: 4,
    type: 'narrative',
    time: '第六周 · 周六夜',
    bg: 'street',
    char: 'shenyan',
    lines: [
      { who: 'narrator', text: '车停在你家楼下。雨还没有停。' },
      { who: 'shenyan', text: '到了。' },
      { who: 'narrator', text: '你没有立刻下车。' }
    ],
    choices: [
      { text: '「上去坐坐？」', mech: 'exit_escalate', npcEffects: { shenyan: { affection: 4 } }, next: 'd1' },
      { text: '「谢谢你送我。」', mech: 'voice_boundary', next: 'd1' },
      { text: '「今天挺开心的。」', mech: 'voice_express', next: 'd1' }
    ],
    next: 'd1'
  },

  x031s: {
    id: 'x031s',
    chapter: 4,
    type: 'narrative',
    time: '第七周 · 周一',
    bg: 'office',
    char: 'shenyan',
    lines: [
      { who: 'narrator', text: '周一上午。你发现沈砚没有像以前一样直接来找你。' },
      { who: 'narrator', text: '她把修改意见发在群里。' },
      { who: 'shenyan', text: '第三页需要补两个数据。下午五点前给我。' },
      { who: 'narrator', text: '没有"辛苦了"。没有单独消息。' }
    ],
    choices: [
      { text: '私聊问她「怎么了？」', mech: 'exit_escalate', npcEffects: { shenyan: { affection: 3 } }, next: 'x031s2' },
      { text: '按要求修改', mech: 'voice_boundary', next: 'x031s2' },
      { text: '等她主动找你', mech: 'loyalty_wait', next: 'x031s2' }
    ],
    next: 'x031s2'
  },

  x031s2: {
    id: 'x031s2',
    chapter: 4,
    type: 'narrative',
    time: '第七周 · 晚上',
    bg: 'office',
    char: 'shenyan',
    lines: [
      { who: 'shenyan', text: '没怎么。工作而已。' },
      { who: 'shenyan', text: '我没有躲你。我只是觉得有些事情要分开。' }
    ],
    choices: [
      { text: '「你最近是不是在躲我？」', mech: 'exit_escalate', npcEffects: { shenyan: { affection: 3 } }, next: 'x031s3' },
      { text: '「知道了。」', mech: 'voice_boundary', next: 'x031s3' },
      { text: '「那就好。」', mech: 'loyalty_wait', next: 'x031s3' }
    ],
    next: 'x031s3'
  },

  x031s3: {
    id: 'x031s3',
    chapter: 4,
    type: 'narrative',
    time: '第七周 · 晚上',
    bg: 'office',
    char: 'shenyan',
    lines: [
      { who: 'shenyan', text: '你有你的生活。我也有我的。' },
      { who: 'shenyan', text: '工作上，我还是会帮你。其他的，不需要解释。' }
    ],
    choices: [
      { text: '「如果我想解释呢？」', mech: 'exit_escalate', npcEffects: { shenyan: { affection: 3 } }, next: 'x031s4' },
      { text: '「明白。」', mech: 'voice_boundary', next: 'x031s4' },
      { text: '「你是不是后悔那天送我回家？」', mech: 'voice_express', next: 'x031s4' }
    ],
    next: 'x031s4'
  },

  x031s4: {
    id: 'x031s4',
    chapter: 4,
    type: 'narrative',
    time: '第七周 · 晚上',
    bg: 'office',
    char: 'shenyan',
    lines: [
      { who: 'shenyan', text: '如果你真的喜欢一个人，我也不会替你判断。' },
      { who: 'shenyan', text: '但你现在有女朋友。所以先把自己的事情处理好。' }
    ],
    choices: [
      { text: '「我知道了。」', mech: 'voice_boundary', next: 'n031' },
      { text: '「你是不是也在等我处理好？」', mech: 'exit_escalate', npcEffects: { shenyan: { affection: 3 } }, next: 'n031' },
      { text: '「对不起。」', mech: 'voice_express', next: 'n031' }
    ],
    next: 'n031'
  },

  n033s: {
    id: 'n033s',
    chapter: 4,
    type: 'narrative',
    time: '第八周 · 周四',
    bg: 'office',
    char: 'shenyan',
    lines: [
      { who: 'narrator', text: '周四下午，项目第一阶段结束。沈砚把最后一份文件发给你。' },
      { who: 'shenyan', text: '这次做得不错。' }
    ],
    choices: [
      { text: '「谢谢你。」', mech: 'voice_express', next: 'n033s2' },
      { text: '「如果没有你，我做不到。」', mech: 'exit_escalate', npcEffects: { shenyan: { affection: 5 } }, next: 'n033s2' },
      { text: '「还有什么要改的吗？」', mech: 'loyalty_wait', next: 'n033s2' }
    ],
    next: 'n033s2'
  },

  n033s2: {
    id: 'n033s2',
    chapter: 4,
    type: 'narrative',
    time: '第八周 · 下午',
    bg: 'office',
    char: 'shenyan',
    lines: [
      { who: 'shenyan', text: '有。别把功劳都给别人。' },
      { who: 'shenyan', text: '这个项目是你做出来的。以后也会有别的人看见。不需要我。' }
    ],
    choices: [
      { text: '「但我希望是你。」', mech: 'exit_escalate', npcEffects: { shenyan: { affection: 5 } }, next: 'n033s3' },
      { text: '「我知道。」', mech: 'loyalty_wait', next: 'n033s3' },
      { text: '「谢谢你一直教我。」', mech: 'voice_express', next: 'n033s3' }
    ],
    next: 'n033s3'
  },

  n033s3: {
    id: 'n033s3',
    chapter: 4,
    type: 'narrative',
    time: '第八周 · 傍晚',
    bg: 'office',
    char: 'shenyan',
    lines: [
      { who: 'narrator', text: '办公室只剩下你们两个。沈砚关掉电脑。' },
      { who: 'shenyan', text: '我明天不来公司。' }
    ],
    choices: [
      { text: '「去哪？」', mech: 'exit_escalate', npcEffects: { shenyan: { affection: 3 } }, next: 'n033s4' },
      { text: '「休息吗？」', mech: 'voice_express', next: 'n033s4' },
      { text: '「知道了。」', mech: 'loyalty_wait', next: 'n033s4' }
    ],
    next: 'n033s4'
  },

  n033s4: {
    id: 'n033s4',
    chapter: 4,
    type: 'narrative',
    time: '第八周 · 傍晚',
    bg: 'street',
    char: 'shenyan',
    lines: [
      { who: 'shenyan', text: '出去几天。手机可能不看。' },
      { who: 'shenyan', text: '你现在说这种话，不合适。但我知道你不是故意的。' }
    ],
    choices: [
      { text: '「那我会想你。」', mech: 'exit_escalate', npcEffects: { shenyan: { affection: 4 } }, next: 'n040' },
      { text: '「路上注意安全。」', mech: 'voice_boundary', next: 'n040' },
      { text: '「玩得开心。」', mech: 'voice_express', next: 'n040' }
    ],
    next: 'n040'
  },

  n040s: {
    id: 'n040s',
    chapter: 4,
    type: 'chat',
    time: '第八周 · 最后一夜',
    bg: 'street',
    speaker: 'shenyan',
    char: 'shenyan',
    lines: [
      { who: 'narrator', text: '23:58。手机亮了一下。' },
      { who: 'shenyan', text: '项目资料我已经整理好了。明天发你。' },
      { who: 'narrator', text: '你以为消息结束了。过了十秒。' },
      { who: 'shenyan', text: '早点休息。' },
      { who: 'narrator', text: '又过了十秒。' },
      { who: 'shenyan', text: '别想太多。' }
    ],
    choices: [
      { text: '回复「你也是。」', mech: 'voice_boundary', next: 'n040s3' },
      { text: '回复「我今天一直在想你。」', mech: 'exit_escalate', npcEffects: { shenyan: { affection: 5, dependency: 3 } }, flags: ['shenyan_last'], next: 'n040s2' },
      { text: '不回复', mech: 'loyalty_wait', next: 'n041' }
    ],
    next: 'n041'
  },

  n040s2: {
    id: 'n040s2',
    chapter: 4,
    type: 'chat',
    time: '第八周 · 最后一夜',
    bg: 'street',
    speaker: 'shenyan',
    char: 'shenyan',
    lines: [
      { who: 'narrator', text: '消息显示已读。沈砚很久没有回复。23:59。' },
      { who: 'shenyan', text: '我知道。' },
      { who: 'narrator', text: '又过了一分钟。' },
      { who: 'shenyan', text: '所以我不回复你这个。' },
      { who: 'narrator', text: '聊天框重新安静下来。' }
    ],
    next: 'n041'
  },

  n040s3: {
    id: 'n040s3',
    chapter: 4,
    type: 'chat',
    time: '第八周 · 最后一夜',
    bg: 'street',
    speaker: 'shenyan',
    char: 'shenyan',
    lines: [
      { who: 'narrator', text: '她只回了一个字。' },
      { who: 'shenyan', text: '嗯。' },
      { who: 'narrator', text: '然后没有下文。你把手机扣在桌上。' }
    ],
    next: 'n041'
  },

  /* ==================== 周然线 · 扩写新增节点 ==================== */

  n013a3: {
    id: 'n013a3',
    chapter: 3,
    type: 'narrative',
    time: '第四周 · 周二晚上',
    bg: 'home_evening',
    char: 'zhouran',
    lines: [
      { who: 'narrator', text: '第 87 页只有一行铅笔字。' },
      { who: 'zhouran', text: '这句你当时看懂了吗……' },
      { who: 'narrator', text: '不是你写的。是她的字。' },
      { who: 'narrator', text: '你看了很久，没想起来当时她为什么写在这里。' }
    ],
    choices: [
      { text: '拍下来，发给周然', mech: 'exit_escalate', npcEffects: { zhouran: { affection: 4 } }, next: 'n013' },
      { text: '不拍，合上书', mech: 'voice_boundary', next: 'n013' },
      { text: '继续往后翻', mech: 'loyalty_wait', next: 'n013' }
    ],
    next: 'n013'
  },

  n013b2: {
    id: 'n013b2',
    chapter: 3,
    type: 'narrative',
    time: '第四周 · 周三 00:21',
    bg: 'room_night',
    char: 'zhouran',
    lines: [
      { who: 'narrator', text: '你没有回复。五分钟后，手机又亮了一次。' },
      { who: 'zhouran', text: '没什么事……' },
      { who: 'narrator', text: '下面还有一张旧影院的照片。照片已经有些糊了。' },
      { who: 'zhouran', text: '你还记得我以前不吃甜的吗？' }
    ],
    choices: [
      { text: '「记得。」', mech: 'exit_escalate', npcEffects: { zhouran: { affection: 4 } }, next: 'n023' },
      { text: '「好像记得。」', mech: 'loyalty_wait', next: 'n023' },
      { text: '「这么多年了，谁还记得。」', mech: 'neglect', next: 'n023' }
    ],
    next: 'n023'
  },

  n023b3: {
    id: 'n023b3',
    chapter: 3,
    type: 'narrative',
    time: '第四周 · 周六傍晚',
    bg: 'cafe',
    char: 'zhouran',
    lines: [
      { who: 'narrator', text: '你坐下以后，她没有马上说话。老板端来两杯水。' },
      { who: 'narrator', text: '她下意识把其中一杯推到你面前。' },
      { who: 'zhouran', text: '我刚才还在想……你可能已经忘了。' }
    ],
    choices: [
      { text: '「忘了什么？」', mech: 'voice_express', next: 'n023b4' },
      { text: '「我记得一些。」', mech: 'exit_escalate', npcEffects: { zhouran: { affection: 3 } }, next: 'n023b4' },
      { text: '「两年了，忘记也正常。」', mech: 'loyalty_wait', next: 'n023b4' }
    ],
    next: 'n023b4'
  },

  n023b4: {
    id: 'n023b4',
    chapter: 3,
    type: 'narrative',
    time: '第四周 · 周六傍晚',
    bg: 'cafe',
    char: 'zhouran',
    lines: [
      { who: 'zhouran', text: '没什么。' },
      { who: 'narrator', text: '她拿起菜单，翻了两页。' },
      { who: 'zhouran', text: '这里换了厨师。以前那个老板还记得你。' },
      { who: 'narrator', text: '你抬头。' },
      { who: 'zhouran', text: '我刚才跟他说你可能不会来了。他说，你以前每次都坐这里。' },
      { who: 'zhouran', text: '我也不知道为什么跟他说这个……' }
    ],
    choices: [
      { text: '「因为你记得。」', mech: 'exit_escalate', npcEffects: { zhouran: { affection: 4 } }, next: 'n023b5' },
      { text: '「换厨师了，那味道应该也不一样了。」', mech: 'loyalty_wait', next: 'n023b5' },
      { text: '「吃完就走吧。」', mech: 'voice_boundary', next: 'n023b5' }
    ],
    next: 'n023b5'
  },

  n023b5: {
    id: 'n023b5',
    chapter: 3,
    type: 'narrative',
    time: '第四周 · 周六傍晚',
    bg: 'cafe',
    char: 'zhouran',
    lines: [
      { who: 'narrator', text: '菜上来以后，她只吃了几口。' },
      { who: 'zhouran', text: '你还记不记得我们第一次来这里？' }
    ],
    choices: [
      { text: '「记得，你那天迟到了。」', mech: 'exit_escalate', npcEffects: { zhouran: { affection: 4 } }, next: 'n023b6' },
      { text: '「不太记得了。」', mech: 'neglect', next: 'n023b6' },
      { text: '「你说过一次。」', mech: 'loyalty_wait', next: 'n023b6' },
      { text: '「为什么现在问这个？」', mech: 'voice_express', next: 'n023b6' }
    ],
    next: 'n023b6'
  },

  n023b6: {
    id: 'n023b6',
    chapter: 3,
    type: 'narrative',
    time: '第四周 · 周六傍晚',
    bg: 'cafe',
    char: 'zhouran',
    lines: [
      { who: 'zhouran', text: '我那天迟到了四十分钟。你还给我留了位置……' },
      { who: 'narrator', text: '她停了一下。' },
      { who: 'zhouran', text: '后来我想了很久。你那时候是不是挺喜欢我的？' },
      { who: 'zhouran', text: '不知道……就是突然想确认一下。' },
      { who: 'narrator', text: '她把筷子横放在碗上。' },
      { who: 'zhouran', text: '因为有时候我会觉得……那十一月好像只有我记得。' }
    ],
    choices: [
      { text: '「我也记得。」', mech: 'exit_escalate', npcEffects: { zhouran: { affection: 4 } }, next: 'n023b7' },
      { text: '「那段时间对我也很重要。」', mech: 'voice_express', next: 'n023b7' },
      { text: '「人都会记错以前的事。」', mech: 'loyalty_wait', next: 'n023b7' }
    ],
    next: 'n023b7'
  },

  n023b7: {
    id: 'n023b7',
    chapter: 3,
    type: 'narrative',
    time: '第四周 · 周六晚上',
    bg: 'street',
    char: 'zhouran',
    lines: [
      { who: 'narrator', text: '她笑了一下。' },
      { who: 'zhouran', text: '嗯。那就好。' },
      { who: 'narrator', text: '九点零七分，你们从店里出来。她站在路边，没有马上去拦车。' },
      { who: 'zhouran', text: '其实我今天本来没打算见你。' },
      { who: 'narrator', text: '地铁口的灯很白。她站在入口处，忽然回头。' },
      { who: 'zhouran', text: '你现在有女朋友了，对吧？' }
    ],
    choices: [
      { text: '「嗯。」', mech: 'voice_express', next: 'n013c' },
      { text: '「怎么了？」', mech: 'exit_escalate', npcEffects: { zhouran: { affection: 3 } }, next: 'n013c' },
      { text: '「……」（没接话）', mech: 'loyalty_wait', next: 'n013c' }
    ],
    next: 'n013c'
  },

  n013c3: {
    id: 'n013c3',
    chapter: 3,
    type: 'narrative',
    time: '第五周 · 周二晚上',
    bg: 'home_evening',
    char: 'zhouran',
    lines: [
      { who: 'zhouran', text: '你知道吗。我后来一个人去过那里。' },
      { who: 'narrator', text: '你握着手机，没有说话。' },
      { who: 'zhouran', text: '不是故意的。刚好出差……' },
      { who: 'zhouran', text: '她笑了一声。跟我们当时想的一点都不一样。' }
    ],
    choices: [
      { text: '「哪里不一样？」', mech: 'exit_escalate', npcEffects: { zhouran: { affection: 3 } }, next: 'n013c4' },
      { text: '「那就好。」', mech: 'loyalty_wait', next: 'n013c4' },
      { text: '「已经过去了。」', mech: 'voice_boundary', next: 'n013c4' }
    ],
    next: 'n013c4'
  },

  n013c4: {
    id: 'n013c4',
    chapter: 3,
    type: 'narrative',
    time: '第五周 · 周二晚上',
    bg: 'home_evening',
    char: 'zhouran',
    lines: [
      { who: 'zhouran', text: '你后来去过吗？' }
    ],
    choices: [
      { text: '「没有。」', mech: 'voice_express', next: 'n013c5' },
      { text: '「去过一次。」', mech: 'exit_escalate', npcEffects: { zhouran: { affection: 4 } }, next: 'n013c5' },
      { text: '「记不清了。」', mech: 'neglect', next: 'n013c5' }
    ],
    next: 'n013c5'
  },

  n013c5: {
    id: 'n013c5',
    chapter: 3,
    type: 'narrative',
    time: '第五周 · 周二晚上',
    bg: 'home_evening',
    char: 'zhouran',
    lines: [
      { who: 'zhouran', text: '你以前答应我的事……好像总有一半没做到。' }
    ],
    choices: [
      { text: '「对不起。」', mech: 'voice_express', next: 'n013c6' },
      { text: '「你也没告诉我你在意。」', mech: 'exit_escalate', npcEffects: { zhouran: { affection: 3 } }, next: 'n013c6' },
      { text: '沉默', mech: 'loyalty_wait', next: 'n013c6' }
    ],
    next: 'n013c6'
  },

  n013c6: {
    id: 'n013c6',
    chapter: 3,
    type: 'narrative',
    time: '第五周 · 周二晚上',
    bg: 'home_evening',
    char: 'zhouran',
    lines: [
      { who: 'zhouran', text: '算了。我不是来算这个的。' },
      { who: 'narrator', text: '她吸了一口气。' },
      { who: 'zhouran', text: '我就是想知道……当年分手的时候，你是不是已经不喜欢我了？' }
    ],
    choices: [
      { text: '「是。」', mech: 'confess', next: 'n013c7' },
      { text: '「不是。」', mech: 'voice_express', next: 'n013c7' },
      { text: '「我不知道。」', mech: 'loyalty_wait', next: 'n013c7' },
      { text: '「现在问这个有什么意义？」', mech: 'neglect', next: 'n024' }
    ],
    next: 'n024'
  },

  n013c7: {
    id: 'n013c7',
    chapter: 3,
    type: 'narrative',
    time: '第五周 · 周二晚上',
    bg: 'home_evening',
    char: 'zhouran',
    lines: [
      { who: 'zhouran', text: '你看。你到现在还是不知道。' },
      { who: 'narrator', text: '她笑了一下。' },
      { who: 'zhouran', text: '我以前就是想听你一句确定的话。等不到。' },
      { who: 'narrator', text: '电话那边安静了很久。' },
      { who: 'zhouran', text: '现在好像也没那么重要了。' }
    ],
    choices: [
      { text: '「对不起。」', mech: 'voice_express', next: 'n024' },
      { text: '「那你为什么还要问？」', mech: 'exit_escalate', npcEffects: { zhouran: { affection: 3 } }, next: 'n024' },
      { text: '「早点休息。」', mech: 'voice_boundary', next: 'n024' }
    ],
    next: 'n024'
  },

  x014e: {
    id: 'x014e',
    chapter: 4,
    type: 'chat',
    time: '第六周 · 周六下午',
    bg: 'home_evening',
    speaker: 'zhouran',
    char: 'zhouran',
    lines: [
      { who: 'narrator', text: '下午三点十七分。三个聊天框同时亮着。周然那边只有一句话。' },
      { who: 'zhouran', text: '你还记得以前那家电影院吗……' },
      { who: 'narrator', text: '下面还有一张旧影院的照片。照片已经有些糊了。' }
    ],
    choices: [
      { text: '回「记得」', mech: 'exit_escalate', npcEffects: { zhouran: { affection: 4 } }, next: 'x014e2' },
      { text: '回「怎么了？」', mech: 'voice_express', next: 'x014e2' },
      { text: '暂时不回', mech: 'loyalty_wait', next: 'x014e4' }
    ],
    next: 'x014e4'
  },

  x014e2: {
    id: 'x014e2',
    chapter: 4,
    type: 'chat',
    time: '第六周 · 下午',
    bg: 'home_evening',
    speaker: 'zhouran',
    char: 'zhouran',
    lines: [
      { who: 'zhouran', text: '他们下个月要拆了。我今天路过才看到。' },
      { who: 'zhouran', text: '突然想起我们最后一次看电影……' }
    ],
    choices: [
      { text: '「我也记得。」', mech: 'exit_escalate', npcEffects: { zhouran: { affection: 4 } }, next: 'x014e3' },
      { text: '「那确实挺久了。」', mech: 'loyalty_wait', next: 'x014e3' },
      { text: '「你现在还喜欢看电影吗？」', mech: 'voice_express', next: 'x014e3' }
    ],
    next: 'x014e3'
  },

  x014e3: {
    id: 'x014e3',
    chapter: 4,
    type: 'chat',
    time: '第六周 · 下午',
    bg: 'home_evening',
    speaker: 'zhouran',
    char: 'zhouran',
    lines: [
      { who: 'zhouran', text: '你记得什么？' }
    ],
    choices: [
      { text: '「你睡着了。」', mech: 'exit_escalate', npcEffects: { zhouran: { affection: 3 } }, next: 'x014e4' },
      { text: '「电影不太好看。」', mech: 'loyalty_wait', next: 'x014e4' },
      { text: '「记得我们后来吵架了。」', mech: 'voice_express', next: 'x014e4' }
    ],
    next: 'x014e4'
  },

  x014e4: {
    id: 'x014e4',
    chapter: 4,
    type: 'chat',
    time: '第六周 · 下午',
    bg: 'home_evening',
    speaker: 'zhouran',
    char: 'zhouran',
    lines: [
      { who: 'zhouran', text: '你现在还会这样吗？' },
      { who: 'narrator', text: '她笑了一下。' },
      { who: 'zhouran', text: '答应别人的事，做到一半就算了。没别的意思。' }
    ],
    choices: [
      { text: '「哪样？」', mech: 'voice_express', next: 'n030' },
      { text: '「会。」', mech: 'exit_escalate', npcEffects: { zhouran: { affection: 3 } }, next: 'n030' },
      { text: '「不知道。」', mech: 'loyalty_wait', next: 'n030' }
    ],
    next: 'n030'
  },

  n030a: {
    id: 'n030a',
    chapter: 4,
    type: 'chat',
    time: '第七周 · 周三晚上',
    bg: 'room_night',
    speaker: 'zhouran',
    char: 'zhouran',
    lines: [
      { who: 'narrator', text: '周三晚上 22:18。周然打来电话。你看着屏幕响了七秒。' }
    ],
    choices: [
      { text: '接起来', mech: 'exit_escalate', npcEffects: { zhouran: { affection: 5 } }, flags: ['took_zhouran_call'], next: 'n030a2' },
      { text: '挂掉，回一句「怎么了？」', mech: 'loyalty_wait', next: 'n030a2' },
      { text: '不接', mech: 'voice_boundary', next: 'n031' }
    ],
    next: 'n030a2'
  },

  n030a2: {
    id: 'n030a2',
    chapter: 4,
    type: 'chat',
    time: '第七周 · 周三晚上',
    bg: 'room_night',
    speaker: 'zhouran',
    char: 'zhouran',
    lines: [
      { who: 'zhouran', text: '你睡了吗……' }
    ],
    choices: [
      { text: '「还没。」', mech: 'voice_express', next: 'n030a3' },
      { text: '「有事吗？」', mech: 'loyalty_wait', next: 'n030a3' },
      { text: '「已经准备睡了。」', mech: 'voice_boundary', next: 'n030a3' }
    ],
    next: 'n030a3'
  },

  n030a3: {
    id: 'n030a3',
    chapter: 4,
    type: 'chat',
    time: '第七周 · 周三晚上',
    bg: 'room_night',
    speaker: 'zhouran',
    char: 'zhouran',
    lines: [
      { who: 'zhouran', text: '我今天整理东西，又看到以前的东西了。' },
      { who: 'narrator', text: '她笑了一下。' },
      { who: 'zhouran', text: '我发现我居然还留着。' }
    ],
    choices: [
      { text: '「你怎么还留着？」', mech: 'exit_escalate', npcEffects: { zhouran: { affection: 4 } }, next: 'n030a4' },
      { text: '「扔了吧。」', mech: 'voice_boundary', next: 'n030a4' },
      { text: '「小票是什么时候的？」', mech: 'voice_express', next: 'n030a4' }
    ],
    next: 'n030a4'
  },

  n030a4: {
    id: 'n030a4',
    chapter: 4,
    type: 'chat',
    time: '第七周 · 周三晚上',
    bg: 'room_night',
    speaker: 'zhouran',
    char: 'zhouran',
    lines: [
      { who: 'zhouran', text: '我不是还喜欢你。至少我觉得不是。' },
      { who: 'zhouran', text: '我只是……不想让那十一月变成一件我自己编出来的事。' }
    ],
    choices: [
      { text: '「我记得。」', mech: 'voice_express', next: 'n031' },
      { text: '「那十一月是真的。」', mech: 'exit_escalate', npcEffects: { zhouran: { affection: 4 } }, next: 'n031' },
      { text: '「你不用再确认了。」', mech: 'voice_boundary', next: 'n031' }
    ],
    next: 'n031'
  },

  n033r: {
    id: 'n033r',
    chapter: 4,
    type: 'chat',
    time: '第八周 · 周四',
    bg: 'room_night',
    speaker: 'zhouran',
    char: 'zhouran',
    lines: [
      { who: 'narrator', text: '周四晚上 21:06。周然发来一条消息。' },
      { who: 'zhouran', text: '我周六要搬家了……以后应该不会再经过这边。' },
      { who: 'zhouran', text: '你要不要来拿一样东西？' }
    ],
    choices: [
      { text: '「什么东西？」', mech: 'exit_escalate', npcEffects: { zhouran: { affection: 4 } }, next: 'n033r2' },
      { text: '「寄给我就行。」', mech: 'voice_boundary', next: 'n040' },
      { text: '「周六我可能有事。」', mech: 'loyalty_wait', next: 'n040' }
    ],
    next: 'n040'
  },

  n033r2: {
    id: 'n033r2',
    chapter: 4,
    type: 'chat',
    time: '第八周 · 周四',
    bg: 'room_night',
    speaker: 'zhouran',
    char: 'zhouran',
    lines: [
      { who: 'zhouran', text: '你来了就知道了。不是很重要的东西。' },
      { who: 'narrator', text: '三分钟后，她又补了一句。' },
      { who: 'zhouran', text: '其实也没什么。' }
    ],
    choices: [
      { text: '「那我去。」', mech: 'exit_escalate', npcEffects: { zhouran: { affection: 5 } }, next: 'n033r3' },
      { text: '「算了，你留着吧。」', mech: 'voice_boundary', next: 'n033r3' },
      { text: '「你什么时候搬完？」', mech: 'loyalty_wait', next: 'n033r3' }
    ],
    next: 'n033r3'
  },

  n033r3: {
    id: 'n033r3',
    chapter: 4,
    type: 'chat',
    time: '第八周 · 周六下午',
    bg: 'street',
    speaker: 'zhouran',
    char: 'zhouran',
    lines: [
      { who: 'narrator', text: '周六下午四点。你在城南见到她。她手里拿着一个很小的纸盒。' },
      { who: 'zhouran', text: '给你。' },
      { who: 'narrator', text: '盒子里是一只旧耳机。正是当年坏掉的那一只。' },
      { who: 'zhouran', text: '另一只我扔了。' }
    ],
    choices: [
      { text: '接过来', mech: 'exit_escalate', npcEffects: { zhouran: { affection: 5 } }, next: 'n033r4' },
      { text: '「你留着吧。」', mech: 'voice_boundary', next: 'n033r4' },
      { text: '「为什么给我这个？」', mech: 'voice_express', next: 'n033r4' }
    ],
    next: 'n033r4'
  },

  n033r4: {
    id: 'n033r4',
    chapter: 4,
    type: 'chat',
    time: '第八周 · 周六下午',
    bg: 'street',
    speaker: 'zhouran',
    char: 'zhouran',
    lines: [
      { who: 'zhouran', text: '不知道……就是觉得它应该回你这里。' },
      { who: 'narrator', text: '她看了一眼马路对面。' },
      { who: 'zhouran', text: '我以前一直想问。' }
    ],
    choices: [
      { text: '等她继续说', mech: 'loyalty_wait', next: 'n033r5' },
      { text: '「你说。」', mech: 'voice_express', next: 'n033r5' },
      { text: '「如果不方便就算了。」', mech: 'voice_boundary', next: 'n033r5' }
    ],
    next: 'n033r5'
  },

  n033r5: {
    id: 'n033r5',
    chapter: 4,
    type: 'chat',
    time: '第八周 · 周六下午',
    bg: 'street',
    speaker: 'zhouran',
    char: 'zhouran',
    lines: [
      { who: 'zhouran', text: '你当年最后一次见我的时候，是不是其实已经想走了？' }
    ],
    choices: [
      { text: '「是。」', mech: 'confess', next: 'n033r6' },
      { text: '「不是。」', mech: 'voice_express', next: 'n033r6' },
      { text: '「我不知道。」', mech: 'loyalty_wait', next: 'n033r6' }
    ],
    next: 'n033r6'
  },

  n033r6: {
    id: 'n033r6',
    chapter: 4,
    type: 'chat',
    time: '第八周 · 周六下午',
    bg: 'street',
    speaker: 'zhouran',
    char: 'zhouran',
    lines: [
      { who: 'narrator', text: '她把纸盒重新盖好。' },
      { who: 'zhouran', text: '其实我今天没想让你留下。我就是想见你一次。看看现在的你。' }
    ],
    choices: [
      { text: '「那你看到了什么？」', mech: 'exit_escalate', npcEffects: { zhouran: { affection: 3 } }, next: 'n033r7' },
      { text: '「我也很高兴见到你。」', mech: 'voice_express', next: 'n033r7' },
      { text: '「那就这样吧。」', mech: 'voice_boundary', next: 'n033r7' }
    ],
    next: 'n033r7'
  },

  n033r7: {
    id: 'n033r7',
    chapter: 4,
    type: 'chat',
    time: '第八周 · 周六下午',
    bg: 'street',
    speaker: 'zhouran',
    char: 'zhouran',
    lines: [
      { who: 'zhouran', text: '还是你。但不是以前那个了。' },
      { who: 'narrator', text: '她说完，转身去路边拦车。车停下来的时候，她已经拉开了车门。' },
      { who: 'zhouran', text: '对了。那张车票不用还我。你留着吧。就当……' },
      { who: 'narrator', text: '她停了很久。' },
      { who: 'zhouran', text: '当我们真的去过。' },
      { who: 'narrator', text: '车门关上。她没有再回头。' }
    ],
    next: 'n040'
  },

  r040: {
    id: 'r040',
    chapter: 4,
    type: 'chat',
    time: '第八周 · 最后一夜',
    bg: 'street',
    speaker: 'zhouran',
    char: 'zhouran',
    lines: [
      { who: 'narrator', text: '最后一夜，23:41。手机亮了一下。' },
      { who: 'zhouran', text: '我今天已经搬完了。以后应该不会再联系你了……' },
      { who: 'narrator', text: '过了十秒。' }
    ],
    choices: [
      { text: '回一句「保重」', mech: 'voice_boundary', next: 'n041' },
      { text: '不回复', mech: 'loyalty_wait', next: 'n041' }
    ],
    next: 'n041'
  }
}

  if (typeof module !== "undefined" && module.exports) module.exports = LS.scenes
})(typeof window !== "undefined" ? window : globalThis)
