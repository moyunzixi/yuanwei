// 第二轮加厚：把 5 大枢纽分支加深到第 3 层，并新增 4 个「每日收束独白」节点（承载人物前史）
const fs = require('fs')
const path = require('path')
const p = path.join(__dirname, '..', 'web', 'js', 'data', 'scenes.js')
let src = fs.readFileSync(p, 'utf8')

if (src.indexOf('x014a3:') >= 0) {
  console.log('已加厚，跳过')
  process.exit(0)
}

const BLOCK2 = `  /* ===================== 第二轮加厚：第3层分支 + 每日独白 ===================== */

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
`

// 把第 2 层叶子的 next 重定向到第 3 层
const flows = [
  ['x014a2', 'n020', 'x014a3'],
  ['x014b2', 'n020', 'x014b3'],
  ['x014c2', 'n020', 'x014c3'],
  ['x014d2', 'n020', 'x014d3'],
  ['x020a2', 'n021', 'x020a3'],
  ['x024a', 'n025', 'x024a3'],
  ['x024b', 'n025', 'x024b3'],
  ['x024c', 'n025', 'x024c3'],
  ['x024d', 'n025', 'x024d3'],
  ['x033a2', 'n040', 'x033a3'],
  ['x040a', 'n041', 'x040a3'],
  ['x040b', 'n041', 'x040b3'],
  ['x040c', 'n041', 'x040c3'],
  ['x040d', 'n041', 'x040d3']
]

function reflow(id, oldNext, newNext) {
  const re = new RegExp('  ' + id + ': \\{[\\s\\S]*?\\n  \\},')
  const m = src.match(re)
  if (!m) { console.log('NO BLOCK', id); return }
  const block = m[0].replace(new RegExp("'" + oldNext + "'", 'g'), "'" + newNext + "'")
  src = src.replace(re, block)
}

let missed = 0
flows.forEach(([a, b, c]) => {
  const before = src
  reflow(a, b, c)
  if (src === before) { console.log('reflow 失败:', a); missed++ }
})
if (missed > 0) { console.log('有 ' + missed + ' 处 reflow 失败，已中止'); process.exit(1) }

src = src.replace('  n042: {', BLOCK2 + '\n  n042: {')
fs.writeFileSync(p, src)
console.log('加厚完成：5 大枢纽分支加深到第3层，新增 4 个每日独白节点')
