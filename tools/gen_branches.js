// 给 web 剧情插入「每个选项后的长串分支」（据主体框架：4 角色 × 6 机制生成）
const fs = require('fs')
const path = require('path')
const p = path.join(__dirname, '..', 'web', 'js', 'data', 'scenes.js')
let src = fs.readFileSync(p, 'utf8')

if (src.indexOf('x014a:') >= 0) {
  console.log('scenes 已打过分支补丁，跳过')
  process.exit(0)
}

const BLOCK = `  /* ===================== 扩展分支：每个选项后的长串剧情 ===================== */

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
      { text: '「周五见，等我。」', mech: 'voice_express', effects: { bond: 5 }, next: 'n020' },
      { text: '「嗯，路上小心。」', mech: 'loyalty_wait', effects: { bond: 2 }, next: 'n020' }
    ],
    next: 'n020'
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
      { text: '「这张好看，给你。」', mech: 'exit_escalate', effects: { heart: 5, ambiguity: 5, secrecy: 3 }, npcEffects: { linwan: { affection: 6, dependency: 4 } }, next: 'n020' },
      { text: '「我还有事，先走了。」', mech: 'voice_boundary', effects: { boundary: 4 }, next: 'n020' }
    ],
    next: 'n020'
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
      { text: '碰杯，一饮而尽', mech: 'exit_escalate', effects: { heart: 4, ambiguity: 4, secrecy: 3 }, npcEffects: { shenjia: { affection: 6 } }, next: 'n020' },
      { text: '「我开车，只抿一口。」', mech: 'voice_boundary', effects: { boundary: 4 }, next: 'n020' }
    ],
    next: 'n020'
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
      { text: '「还没睡？」发给林晚', mech: 'exit_escalate', effects: { heart: 5, ambiguity: 6, secrecy: 5 }, npcEffects: { linwan: { affection: 7, dependency: 4 } }, next: 'n020' },
      { text: '什么都不做，放下手机', mech: 'deactivate', effects: { boundary: 2 }, next: 'n020' }
    ],
    next: 'n020'
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
      { text: '「那以后常打给你。」', mech: 'exit_escalate', effects: { heart: 6, ambiguity: 8, secrecy: 5 }, npcEffects: { linwan: { affection: 8, dependency: 6 } }, next: 'n021' },
      { text: '「睡吧，我也困了。」', mech: 'voice_boundary', effects: { boundary: 4 }, next: 'n021' }
    ],
    next: 'n021'
  },
  x024a: {
    id: 'x024a', chapter: 2, type: 'narrative', time: '深夜', bg: 'room_night', speaker: 'xunian',
    lines: [
      { who: 'narrator', text: '你把手机翻过来，屏幕朝上。' },
      { who: 'xunian', text: '……同事？' },
      { who: 'narrator', text: '她没接，只是把手机轻轻翻回去，塞进你手里。' }
    ],
    choices: [
      { text: '「对不起，这周我有点飘。」', mech: 'voice_express', effects: { bond: 6, guilt: -5, boundary: 3 }, flags: ['apologized'], next: 'n025' },
      { text: '「只是同事，真的。」', mech: 'rationalization', effects: { secrecy: 8, guilt: 4, bond: -3 }, next: 'n025' }
    ],
    next: 'n025'
  },
  x024b: {
    id: 'x024b', chapter: 2, type: 'narrative', time: '深夜', bg: 'room_night', speaker: 'xunian',
    lines: [
      { who: 'xunian', text: '嗯。' },
      { who: 'narrator', text: '她转身去倒水，杯子碰出很轻的一声。' }
    ],
    choices: [
      { text: '「你信我吗？」', mech: 'voice_express', effects: { bond: 5, guilt: -3 }, next: 'n025' },
      { text: '（沉默）', mech: 'neglect', attach: { avoidance: 3 }, effects: { bond: -4, secrecy: 3 }, next: 'n025' }
    ],
    next: 'n025'
  },
  x024c: {
    id: 'x024c', chapter: 2, type: 'narrative', time: '深夜', bg: 'room_night', speaker: 'xunian',
    lines: [
      { who: 'narrator', text: '你扣下手机。她没追问，背对着你洗了杯子。' },
      { who: 'xunian', text: '水有点凉，我帮你热一下。' }
    ],
    choices: [
      { text: '「我去洗澡。」', mech: 'deactivate', effects: { secrecy: 6, bond: -3 }, next: 'n025' },
      { text: '「你也早点睡。」', mech: 'voice_express', effects: { bond: 4, boundary: 2 }, next: 'n025' }
    ],
    next: 'n025'
  },
  x024d: {
    id: 'x024d', chapter: 2, type: 'narrative', time: '深夜', bg: 'room_night', speaker: 'xunian',
    lines: [
      { who: 'xunian', text: '我改签了，想给你个惊喜。' },
      { who: 'narrator', text: '她盯着你两秒，那两秒很长。' }
    ],
    choices: [
      { text: '「怎么不早说。」', mech: 'voice_express', effects: { bond: 3, guilt: -2 }, next: 'n025' },
      { text: '「……也好。」', mech: 'neglect', attach: { avoidance: 4 }, effects: { bond: -5, secrecy: 4 }, next: 'n025' }
    ],
    next: 'n025'
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
      { text: '「帮我戴上。」', mech: 'exit_escalate', effects: { heart: 7, ambiguity: 9, secrecy: 7, guilt: 5 }, npcEffects: { linwan: { affection: 10, dependency: 9 } }, next: 'n040' },
      { text: '「太贵重了，留着吧。」', mech: 'voice_boundary', effects: { boundary: 5 }, next: 'n040' }
    ],
    next: 'n040'
  },
  x040a: {
    id: 'x040a', chapter: 4, type: 'narrative', time: '深夜', bg: 'street',
    lines: [
      { who: 'narrator', text: '车开到城西，在楼下你没立刻上楼。' },
      { who: 'narrator', text: '你拨了林晚的电话，响了三声。' }
    ],
    choices: [
      { text: '「我到了，上来吗？」', mech: 'exit_escalate', effects: { heart: 12, ambiguity: 14, secrecy: 10, guilt: 8, bond: -10 }, subEffects: { attachmentAnx: 16, sunkCost: 10 }, npcEffects: { linwan: { affection: 16, dependency: 14 } }, flags: ['went_up'], next: 'n041' },
      { text: '「算了，掉头回家。」', mech: 'voice_boundary', effects: { boundary: 8, bond: 4 }, next: 'n041' }
    ],
    next: 'n041'
  },
  x040b: {
    id: 'x040b', chapter: 4, type: 'narrative', time: '深夜', bg: 'room_night',
    lines: [
      { who: 'narrator', text: '你给林晚发：我们到此为止吧，对不起。' },
      { who: 'narrator', text: '三秒后，她回了一个句号。' }
    ],
    choices: [
      { text: '发完就放下手机', mech: 'voice_boundary', effects: { boundary: 8, ambiguity: -6, guilt: -4, bond: 3 }, next: 'n041' },
      { text: '她回句号，你又想解释', mech: 'rationalization', effects: { secrecy: 6, guilt: 4, ambiguity: 4 }, next: 'n041' }
    ],
    next: 'n041'
  },
  x040c: {
    id: 'x040c', chapter: 4, type: 'narrative', time: '深夜', bg: 'home_evening', speaker: 'xunian',
    lines: [
      { who: 'narrator', text: '许念听完，把手机放下，沉默了很久。' },
      { who: 'xunian', text: '……我大概猜到了。' }
    ],
    choices: [
      { text: '「我先睡沙发。」', mech: 'confess', effects: { boundary: 6, secrecy: -12, bond: 8, guilt: -6 }, next: 'n041' },
      { text: '「你要怎么处理都行。」', mech: 'neglect', effects: { bond: -4, secrecy: 4 }, next: 'n041' }
    ],
    next: 'n041'
  },
  x040d: {
    id: 'x040d', chapter: 4, type: 'narrative', time: '深夜', bg: 'home_evening',
    lines: [
      { who: 'narrator', text: '你坐在客厅，电视没开，到天亮。' },
      { who: 'narrator', text: '凌晨四点，你摸到手机，某个头像还亮着。' }
    ],
    choices: [
      { text: '「假装什么都没发生」', mech: 'neglect', effects: { secrecy: 8, guilt: 6, bond: -5 }, next: 'n041' },
      { text: '凌晨给一个人发「在吗」', mech: 'deactivate', effects: { ambiguity: 3, secrecy: 4 }, next: 'n041' }
    ],
    next: 'n041'
  },
`

const redirects = [
  ["        flags: ['chose_partner_weekend'],\n        next: 'n020'", "        flags: ['chose_partner_weekend'],\n        next: 'x014a'"],
  ["        flags: ['went_with_linwan'],\n        next: 'n020'", "        flags: ['went_with_linwan'],\n        next: 'x014b'"],
  ["        flags: ['went_with_shenjia'],\n        next: 'n020'", "        flags: ['went_with_shenjia'],\n        next: 'x014c'"],
  ["        attach: { avoidance: 5 },\n        effects: { bond: -3, boundary: 2 },\n        next: 'n020'", "        attach: { avoidance: 5 },\n        effects: { bond: -3, boundary: 2 },\n        next: 'x014d'"],
  ["        flags: ['voice_call_linwan', 'first_boundary_cross'],\n        next: 'n021'", "        flags: ['voice_call_linwan', 'first_boundary_cross'],\n        next: 'x020a'"],
  ["        flags: ['showed_phone'],\n        next: 'n025'", "        flags: ['showed_phone'],\n        next: 'x024a'"],
  ["        flags: ['lied_to_partner'],\n        next: 'n025'", "        flags: ['lied_to_partner'],\n        next: 'x024b'"],
  ["        flags: ['hid_phone'],\n        next: 'n025'", "        flags: ['hid_phone'],\n        next: 'x024c'"],
  ["        flags: ['deflected_question'],\n        next: 'n025'", "        flags: ['deflected_question'],\n        next: 'x024d'"],
  ["        flags: ['agreed_meet', 'second_boundary_cross'],\n        next: 'n040'", "        flags: ['agreed_meet', 'second_boundary_cross'],\n        next: 'x033a'"],
  ["        flags: ['went_out'],\n        next: 'n041'", "        flags: ['went_out'],\n        next: 'x040a'"],
  ["        flags: ['ended_it'],\n        next: 'n041'", "        flags: ['ended_it'],\n        next: 'x040b'"],
  ["        flags: ['confessed'],\n        next: 'n041'", "        flags: ['confessed'],\n        next: 'x040c'"],
  ["        flags: ['silent_ending'],\n        next: 'n041'", "        flags: ['silent_ending'],\n        next: 'x040d'"]
]

let missed = 0
redirects.forEach(([a, b]) => {
  if (src.indexOf(a) < 0) { console.log('NOT FOUND:', a.replace(/\n/g, ' ').slice(0, 50)); missed++ }
  src = src.replace(a, b)
})

if (missed > 0) { console.log('有 ' + missed + ' 处未找到，已中止以免破坏文件'); process.exit(1) }

src = src.replace('  n042: {', BLOCK + '\n  n042: {')
fs.writeFileSync(p, src)
console.log('scenes 已插入 20 个扩展分支节点')
