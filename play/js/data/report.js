;(function (root) {
  const LS = (root.LS = root.LS || {})
/**
 * 报告文案模板
 *
 * 调性：损友吐槽风 —— 90% 轻松 + 最后一句扎心
 * 所有数字通过插槽注入，支持条件变体
 */

// 六维雷达（学名 → 报告呈现）
const dimensions = [
  {
    key: 'ambiguity',
    label: '暧昧浓度',
    science: {
      title: '关系边界模糊（Boundary Ambiguity）',
      body:
        '指一段关系缺乏明确定义的状态。研究表明，边界的模糊往往是渐进发生的，而不是某一次决策的结果——这也是它难以被察觉的原因。'
    }
  },
  {
    key: 'secrecy',
    label: '删记录手速',
    science: {
      title: '隐瞒与信息控制（Secrecy）',
      body:
        '隐瞒不只是"不说"，还包括主动的信息管理：删记录、改备注、选择性陈述。研究发现，隐瞒带来的心理成本会随时间累积。'
    }
  },
  {
    key: 'reliance',
    label: '上头程度',
    science: {
      title: '情感寄托 / 依恋转移（Attachment Transfer）',
      body:
        '指本应在主要关系中满足的情感需求，被转移到关系外的对象身上。这通常是渐进发生的，且当事人往往不会自我觉察。'
    }
  },
  {
    key: 'noBoundary',
    label: '说不能力',
    inverted: true,
    source: 'boundary',
    science: {
      title: '边界设定（Boundary Setting）',
      body:
        '在亲密关系中主动表达并维持个人界限的能力。它是一项技能，而非道德判断——可以通过练习提高。'
    }
  },
  {
    key: 'vanity',
    label: '被需要的瘾',
    science: {
      title: '被需要需求（Need to be Needed）',
      body:
        '与依恋焦虑相关。当一个人主要通过"被他人需要"来确认自我价值时，会更容易在关系外寻求这种确认。'
    }
  },
  {
    key: 'guilt',
    label: '心虚指数',
    science: {
      title: '愧疚与认知失调（Guilt / Cognitive Dissonance）',
      body:
        'Festinger 指出，当行为与自我认知冲突时，人会倾向于改变认知而非行为——这就是"给自己找理由"的来源。'
    }
  }
]

// 段位
const ranks = [
  {
    min: 0,
    max: 20,
    name: '清汤寡水',
    line: '这八周基本没什么动静。你甚至有点像来参加文明观赏的。'
  },
  {
    min: 21,
    max: 40,
    name: '青铜守门员',
    line: '有过机会，也有过犹豫，最后主要靠一句"算了"。'
  },
  {
    min: 41,
    max: 60,
    name: '白银暧昧师',
    line: '没有干什么特别严重的事，但聊天记录看起来挺热闹。'
  },
  {
    min: 61,
    max: 80,
    name: '黄金端水大师',
    line: '每个人都照顾到了，就是自己快忙死了。'
  },
  {
    min: 81,
    max: 100,
    name: '王者 · 自爆卡车',
    line: '你不是来做测试的，你是来给我们增加工作量的。'
  }
]

// 依恋象限 → 角色映射
const quadrants = {
  secure: {
    name: '安全型',
    character: 'xunian',
    headline: '你最像许念。',
    line: '你和她都习惯把日子过稳。',
    diff: '问题是，太稳的时候，谁都容易忘记问一句"你还好吗"。'
  },
  preoccupied: {
    name: '痴迷型',
    character: 'linwan',
    headline: '你最像林晚。',
    line: '你们都很在意"被需要"。',
    diff: '她想确认你不会走，你想确认自己对她有多重要。'
  },
  dismissing: {
    name: '疏离型',
    character: 'shenyan',
    headline: '你最像沈砚。',
    line: '你们都很会给别人空间。',
    diff: '所以也都很会把真正想要的东西藏起来。'
  },
  fearful: {
    name: '恐惧型',
    character: 'zhouran',
    headline: '你最像周然。',
    line: '想往前走，又害怕伸手以后，发现自己什么都没有。',
    diff: '她不敢要现在，你不敢要结果。'
  }
}

// 行为回放分类
const replayTypes = [
  { key: 'firstContact', label: '第一次深夜长谈', mech: ['voice_express', 'hyperactivate'] },
  { key: 'firstSecret', label: '第一次隐瞒', mech: ['rationalization', 'secrecy'] },
  { key: 'firstInitiative', label: '第一次主动联系', flag: 'initiated_contact' },
  { key: 'firstCross', label: '第一次越过边界', mech: ['exit_escalate'] }
]

// 合理化话术统计文案
function rationalizationLine(count, topText) {
  if (!topText) return null
  if (count >= 3) {
    return `这段时间你说了 ${count} 次「${topText}」。你没说给别人听，是说给自己听的。`
  }
  if (count > 0) {
    return `你说过一次「${topText}」。你知道自己在说什么。`
  }
  return null
}

// 序列模式文案
const patternLines = {
  relapse: '你的边界不是没有，是可以谈。你拒绝过，然后过几天又答应了。',
  compensate: '你越界以后，会突然对许念很好。这不是弥补，至少不完全是。',
  noBoundaryEver: '这八周你一次都没有主动画过线。你只靠对方不越线。',
  escalator: '每一步都很小，小到你很难说自己究竟从哪一步开始改变。',
  coldTurkey: '你有过动摇，但你收住了。这并不容易。',
  selfDeception: '你很擅长给自己的行为找一个听起来合理的解释：「只是朋友」「只是工作」「只是以前认识」「只是聊到这里」。'
}

// 读懂了吗
const insightLines = {
  linwan: {
    misread: '你以为林晚是故意的。',
    insight: '其实她只是怕一个人待着。'
  },
  shenyan: {
    misread: '你以为沈砚在玩你。',
    insight: '其实她只是不敢要。她看起来最强，其实最怕。'
  },
  zhouran: {
    misread: '你以为周然想复合。',
    insight: '其实她只是想确认自己没有被浪费。'
  },
  xunian: {
    misread: '你以为许念什么都不知道。',
    insight: '其实她一直在看。'
  }
}

const disclaimer = '本结果为娱乐性互动推演，不构成任何心理测评结论。'

const closing = [
  '以上结果，仅供娱乐。别往心里去。',
  '',
  '屏幕暗下来。房间里只剩电脑风扇的声音。',
  '你正准备关电脑，手机忽然亮了一下。没有新消息，只是时间变了。23:47。',
  '',
  '如果你真的有一个许念——',
  '今晚，回她消息。'
]

const notFate = '类型不是判决，它只是你现在的习惯。'

// 参考的研究方向（关于页展示）
const refs = [
  {
    group: '依恋理论',
    items: [
      'Bowlby, J. (1969). Attachment and Loss. New York: Basic Books.',
      'Brennan, K. A., Clark, C. L., & Shaver, P. R. (1998). Self-report measurement of adult attachment.'
    ]
  },
  {
    group: '亲密关系与隐瞒',
    items: [
      'Afifi, W. A., & Steuber, K. (2010). The cycle of concealment in families.',
      'Vangelisti, A. L., & Gerstenberger, M. (2004). Communication and social support in infidelity.'
    ]
  },
  {
    group: '认知失调与自我合理化',
    items: [
      'Festinger, L. (1957). A Theory of Cognitive Dissonance. Stanford University Press.',
      'Baumeister, R. F. (1991). Escaping the Self.'
    ]
  }
]

LS.report = {
  dimensions,
  ranks,
  quadrants,
  replayTypes,
  patternLines,
  insightLines,
  rationalizationLine,
  refs,
  disclaimer,
  closing,
  notFate
}

  if (typeof module !== "undefined" && module.exports) module.exports = LS.report
})(typeof window !== "undefined" ? window : globalThis)
