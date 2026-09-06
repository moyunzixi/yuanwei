;(function (root) {
  const LS = (root.LS = root.LS || {})
/**
 * 隐藏模块 · 看看她曾经删除的话
 *
 * 解锁：通关后开放。前 6 条为基础记录，后 5 条按行为条件解锁，最后一条为终章。
 * 条件字段 cond 直接复用 LS.expr（支持 attr / npc / flag / choice / mechCount）。
 *
 * steps 的类型（k）：
 *   input  她打出来的一行（灰色，最终被删）
 *   pause  停顿
 *   stay   停留（带秒数）
 *   delete 删除动作
 *   modify 再修改
 *   send   最终发送（正常气泡）
 *   nosend 最后什么都没发
 */

LS.shadows = {
  title: '看看她曾经删除的话',
  subtitle: ['有些话不是没说过。', '只是你当时没有看见。'],

  intro: [
    { who: 'narrator', text: '你可以重新查看八周里的一些聊天记录。' },
    { who: 'narrator', text: '有些消息旁边，多了一行灰色的小字。' },
    { who: 'system', text: '「对方曾编辑过这条消息。」' },
    { who: 'narrator', text: '点击后，可以看到她最后删掉的那句话。' }
  ],
  systemIntro: ['这些话从未出现在聊天记录里。'],

  records: [
    {
      id: 'd1',
      char: 'xunian',
      time: '第一周 周三 21:14',
      scene: '第一次异地视频',
      sent: ['今天吃了三顿外卖。', '楼下那家的米饭是硬的。', '这边比想象中冷。你那边呢？'],
      steps: [
        { k: 'input', text: '你一个人在家，别总是不吃饭。' },
        { k: 'pause' },
        { k: 'input', text: '你那边呢？' },
        { k: 'modify' },
        { k: 'send', text: '你那边呢？' }
      ],
      narrator: [
        '她其实想问的不是你冷不冷。',
        '她只是想知道，自己不在的时候，你有没有好好吃饭。'
      ]
    },

    {
      id: 'd2',
      char: 'linwan',
      time: '第二周 周六 23:41',
      scene: '老地方吃饭之后',
      sent: ['今天挺开心的。', '谢谢你陪我吃饭。', '到家了吗？'],
      steps: [
        { k: 'input', text: '其实我本来不想找你的。' },
        { k: 'pause' },
        { k: 'input', text: '但看到你还在群里，就……' },
        { k: 'pause' },
        { k: 'input', text: '算了。' },
        { k: 'send', text: '到家了吗？' }
      ],
      narrator: [
        '她删掉了三句话。',
        '最后只留下了一句最像普通朋友的话。'
      ]
    },

    {
      id: 'd3',
      char: 'shenyan',
      time: '第三周 周一 18:26',
      scene: '项目会结束后',
      sent: ['今天那个情况，你处理得没问题。', '不用想太多。', '早点回去。'],
      steps: [
        { k: 'input', text: '我其实注意你一段时间了。' },
        { k: 'pause' },
        { k: 'input', text: '不是因为工作。' },
        { k: 'delete' },
        { k: 'send', text: '早点回去。' }
      ],
      narrator: [
        '她很少把一句话写第二遍。',
        '这一条，她改了三次。',
        '最后什么也没留下。'
      ]
    },

    {
      id: 'd4',
      char: 'zhouran',
      time: '第四周 周三 00:16',
      scene: '重新联系',
      sent: ['好久不见。', '我是周然。', '换号码了，存一下。'],
      steps: [
        { k: 'input', text: '我昨天翻到了以前的聊天记录。' },
        { k: 'delete' },
        { k: 'input', text: '有件事想问你……' },
        { k: 'delete' },
        { k: 'input', text: '你还记得我们最后一次见面吗？' },
        { k: 'delete' },
        { k: 'send', text: '换号码了，存一下。' }
      ],
      narrator: [
        '她真正想问的问题，从来不是让你存号码。',
        '她只是找不到一个合适的开头。'
      ]
    },

    {
      id: 'd5',
      char: 'xunian',
      time: '第五周 周五 22:53',
      scene: '她提前回来之后',
      sent: ['你今天怎么这么晚？'],
      steps: [
        { k: 'input', text: '我看到你手机了。' },
        { k: 'delete' },
        { k: 'input', text: '你是不是有事瞒着我？' },
        { k: 'delete' },
        { k: 'input', text: '我其实知道。' },
        { k: 'stay', text: '停留 17 秒' },
        { k: 'delete' },
        { k: 'nosend' }
      ],
      narrator: [
        '那天晚上，她坐在客厅等你。',
        '你进门的时候，她已经把手机扣在桌上。',
        '她只说了一句：'
      ],
      quote: '吃饭了吗？',
      after: ['你没有问她为什么这么晚还没睡。']
    },

    {
      id: 'd6',
      char: 'linwan',
      time: '第八周 周四 23:18',
      scene: '林晚约你周六见面',
      sent: ['周六下午有空吗？', '我有个东西想当面给你。'],
      steps: [
        { k: 'input', text: '我想最后再见你一次。' },
        { k: 'delete' },
        { k: 'input', text: '如果这次不见，以后可能就真的不会见了。' },
        { k: 'delete' },
        { k: 'input', text: '你别误会，我不是想怎么样。' },
        { k: 'delete' },
        { k: 'send', text: '我有个东西想当面给你。' }
      ],
      narrator: [
        '她把最重要的那一句删掉了。',
        '因为那句话一旦发出去，就已经不是"有个东西"。'
      ]
    },

    /* ---- 以下 5 条按行为条件解锁 ---- */

    {
      id: 'd7',
      char: 'xunian',
      time: '第七周 深夜 01:07',
      scene: '你正在删除三段聊天记录',
      cond: {
        any: [
          { attr: 'secrecy', op: '>=', value: 45 },
          { flag: 'deleted_record' },
          { mechCount: { mech: 'secrecy', op: '>=', value: 2 } }
        ]
      },
      sent: ['睡了吗？'],
      steps: [
        { k: 'input', text: '你最近是不是有什么事情没告诉我？' },
        { k: 'delete' },
        { k: 'input', text: '如果有，你可以直接说。' },
        { k: 'delete' },
        { k: 'input', text: '我不想查你的手机。' },
        { k: 'pause' },
        { k: 'input', text: '我只是想让你自己告诉我。' },
        { k: 'delete' },
        { k: 'nosend' }
      ],
      narrator: [
        '这条消息没有出现在你的手机里。',
        '你当时看到的，只有她第二天早上的一句：'
      ],
      quote: '早饭在锅里。'
    },

    {
      id: 'd8',
      char: 'xunian',
      time: '第七周 周三 18:42',
      scene: '「你最近好像很忙。」',
      cond: {
        any: [
          { flag: 'conflict_escalated' },
          { choice: { node: 'n030', index: 2 } },
          { choice: { node: 'n030', index: 3 } }
        ]
      },
      sent: ['你最近好像很忙。'],
      steps: [
        { k: 'input', text: '你是不是已经不太想回这个家了？' },
        { k: 'delete' },
        { k: 'input', text: '还是说，只是不太想回到我这里？' },
        { k: 'delete' },
        { k: 'input', text: '我问这个是不是有点烦？' },
        { k: 'delete' },
        { k: 'nosend' }
      ],
      narrator: [
        '她洗完最后一个碗。',
        '把水龙头关了。',
        '过了一会儿，她重新打开。',
        '又把那个碗洗了一遍。'
      ]
    },

    {
      id: 'd9',
      char: 'linwan',
      time: '第八周 周六 14:32',
      scene: '最后一次见面',
      cond: { all: [{ npc: 'linwan.affection', op: '>=', value: 50 }] },
      sent: ['你到了吗？'],
      steps: [
        { k: 'input', text: '你如果现在说不来了，我也不会怪你。' },
        { k: 'delete' },
        { k: 'input', text: '真的。' },
        { k: 'delete' },
        { k: 'input', text: '但是你最好别骗我。' },
        { k: 'delete' },
        { k: 'send', text: '路上慢点。' }
      ],
      narrator: ['她给你留了一个台阶。', '你没有发现。']
    },

    {
      id: 'd10',
      char: 'zhouran',
      time: '第四周 见面后 23:58',
      scene: '城南那家店之后',
      cond: { all: [{ npc: 'zhouran.affection', op: '>=', value: 40 }] },
      sent: ['今天谢谢你。'],
      steps: [
        { k: 'input', text: '其实我今天一直在等你问一句。' },
        { k: 'delete' },
        { k: 'input', text: '你当年为什么突然就不要我了？' },
        { k: 'delete' },
        { k: 'input', text: '我知道现在问这个没意义。' },
        { k: 'delete' },
        { k: 'input', text: '可是我想了两年。' },
        { k: 'delete' },
        { k: 'nosend' }
      ],
      narrator: [
        '那天她一个人坐在公交站。',
        '车来了两趟。',
        '她都没上。'
      ]
    },

    {
      id: 'd11',
      char: 'shenyan',
      time: '第三周 周五 23:12',
      scene: '电梯口分别之后',
      cond: { all: [{ npc: 'shenyan.affection', op: '>=', value: 40 }] },
      sent: ['今天聊得很愉快。', '早点休息。'],
      steps: [
        { k: 'input', text: '其实你不用每次都这么小心。' },
        { k: 'delete' },
        { k: 'input', text: '我知道你在躲什么。' },
        { k: 'delete' },
        { k: 'input', text: '但我不会逼你。' },
        { k: 'delete' },
        { k: 'send', text: '早点休息。' }
      ],
      narrator: [
        '她把一句解释删掉了。',
        '也把一句保证删掉了。',
        '她大概知道，有些保证说出来以后，就不再体面了。'
      ]
    }
  ],

  // 终章：没有人像，也不知道是谁
  final: {
    title: '如果当时没有删掉。',
    time: '第八周结束',
    lines: [
      { who: 'narrator', text: '系统没有告诉你这是谁。' },
      { who: 'narrator', text: '也没有告诉你这句话是不是曾经真的被输入过。' },
      { who: 'narrator', text: '屏幕上只有一行字。' },
      { who: 'quote', text: '其实我等你问我。' },
      { who: 'pause' },
      { who: 'quote', text: '等了很久。' },
      { who: 'quote', text: '后来就不想等了。' },
      { who: 'system', text: '屏幕停留三秒。' },
      { who: 'system', text: '以上内容不会影响本次结局。' },
      { who: 'system', text: '它们也从未被发送。' },
      { who: 'system', text: '请放心。' },
      { who: 'narrator', text: '你把手机放在桌上。' },
      { who: 'narrator', text: '过了一会儿，又拿起来。' },
      { who: 'narrator', text: '聊天记录里什么都没有。' },
      { who: 'narrator', text: '没有这句话。' },
      { who: 'narrator', text: '没有删除痕迹。' },
      { who: 'narrator', text: '没有任何证据证明它曾经存在。' },
      { who: 'narrator', text: '只有你知道。' },
      { who: 'narrator', text: '她们曾经把话打出来过。' },
      { who: 'narrator', text: '然后，一个字一个字地删掉。' }
    ]
  },

  outro: {
    allDone: [
      { who: 'system', text: '你已经看完了所有未发送记录。' },
      { who: 'system', text: '其中没有一句是在责怪你。' },
      { who: 'narrator', text: '这大概才是最难看的地方。' }
    ],
    buttons: ['退出', '再看一遍'],
    replay: [
      { who: 'narrator', text: '你重新点开了第一条。' },
      { who: 'quote', text: '你那边呢？' },
      { who: 'narrator', text: '很普通的一句话。' },
      { who: 'narrator', text: '你看了很久。' },
      { who: 'narrator', text: '然后才发现。' },
      { who: 'narrator', text: '她真正想问的，好像从来不是这个。' }
    ]
  }
}

  if (typeof module !== "undefined" && module.exports) module.exports = LS.shadows
})(typeof window !== "undefined" ? window : globalThis)
