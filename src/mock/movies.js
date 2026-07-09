// 国内 + 国外电影 Mock 数据
// 海报来源: OMDb API (https://img.omdbapi.com/) 提供真实电影海报

const OMDb = (imdbId) => `https://img.omdbapi.com/?apikey=trilogy&i=${imdbId}`

export const mockMovies = [
  // ===== 华语电影 =====
  {
    id: 1,
    title: '流浪地球2',
    originalTitle: 'The Wandering Earth II',
    region: 'china',
    year: 2023,
    rating: 7.9,
    genres: ['科幻', '冒险'],
    director: '郭帆',
    cast: ['吴京', '刘德华', '李雪健', '沙溢'],
    runtime: 173,
    imdbId: 'tt13539646',
    poster: OMDb('tt13539646'),
    backdrop: OMDb('tt13539646'),
    trailerUrl: 'https://www.youtube.com/embed/6QGG4OKWblo',
    summary: '太阳即将毁灭，人类在地球表面建造出巨大的推进器，寻找新的家园。然而宇宙之路危机四伏，为了拯救地球，流浪地球时代的年轻人再次挺身而出，展开争分夺秒的生死之战。',
    isHot: true
  },
  {
    id: 2,
    title: '哪吒之魔童降世',
    originalTitle: 'Ne Zha',
    region: 'china',
    year: 2019,
    rating: 8.4,
    genres: ['动画', '奇幻'],
    director: '饺子',
    cast: ['吕艳婷', '囧森瑟夫', '瀚墨'],
    runtime: 110,
    imdbId: 'tt10627720',
    poster: OMDb('tt10627720'),
    backdrop: OMDb('tt10627720'),
    trailerUrl: 'https://www.youtube.com/embed/da7mKvCuNvc',
    summary: '天地灵气孕育出一颗能量巨大的混元珠，元始天尊将混元珠提炼成灵珠和魔丸，灵珠投胎为人，助周伐纣时可堪大用；而魔丸则会诞出魔王，为祸人间。',
    isHot: true
  },
  {
    id: 3,
    title: '满江红',
    originalTitle: 'Full River Red',
    region: 'china',
    year: 2023,
    rating: 7.0,
    genres: ['剧情', '悬疑', '喜剧'],
    director: '张艺谋',
    cast: ['沈腾', '易烊千玺', '张译', '雷佳音'],
    runtime: 159,
    imdbId: 'tt21148018',
    poster: OMDb('tt21148018'),
    backdrop: OMDb('tt21148018'),
    trailerUrl: 'https://www.youtube.com/embed/MoZJ-8Frm8M',
    summary: '南宋绍兴年间，岳飞死后四年，秦桧率兵与金国会谈。会谈前夜，金国使者死在宰相驻地，所携密信也不翼而飞。小兵张大与亲兵营副统领孙均机缘巧合被裹挟进巨大阴谋之中。',
    isHot: true
  },
  {
    id: 4,
    title: '长津湖',
    originalTitle: 'The Battle at Lake Changjin',
    region: 'china',
    year: 2021,
    rating: 7.4,
    genres: ['战争', '历史'],
    director: '陈凯歌 / 徐克 / 林超贤',
    cast: ['吴京', '易烊千玺', '段奕宏', '朱亚文'],
    runtime: 176,
    imdbId: 'tt13462900',
    poster: OMDb('tt13462900'),
    backdrop: OMDb('tt13462900'),
    trailerUrl: 'https://www.youtube.com/embed/LfjUF0Af0CM',
    summary: '1950年，中国志愿军部队与美军在朝鲜长津湖地区交战，中国人民志愿军第9兵团将美军1个多师分割包围于长津湖地区，歼敌1.3万余人，扭转了战场态势。',
    isHot: false
  },
  {
    id: 5,
    title: '你好，李焕英',
    originalTitle: 'Hi, Mom',
    region: 'china',
    year: 2021,
    rating: 7.8,
    genres: ['喜剧', '剧情'],
    director: '贾玲',
    cast: ['贾玲', '张小斐', '沈腾', '陈赫'],
    runtime: 128,
    imdbId: 'tt13364790',
    poster: OMDb('tt13364790'),
    backdrop: OMDb('tt13364790'),
    trailerUrl: 'https://www.youtube.com/embed/DYHLLhWcXQM',
    summary: '2001年的某一天，刚刚考上大学的贾晓玲经历了人生中的一次大起大落。一心想要成为母亲骄傲的她，却因母亲突遭严重意外而悲痛万分。在情绪崩溃的状态下，贾晓玲竟意外回到了1981年。',
    isHot: false
  },
  {
    id: 6,
    title: '封神第一部',
    originalTitle: 'Creation of the Gods I',
    region: 'china',
    year: 2023,
    rating: 7.8,
    genres: ['奇幻', '战争', '古装'],
    director: '乌尔善',
    cast: ['费翔', '李雪健', '黄渤', '于适'],
    runtime: 148,
    imdbId: 'tt24656918',
    poster: OMDb('tt24656918'),
    backdrop: OMDb('tt24656918'),
    trailerUrl: 'https://www.youtube.com/embed/i7q1Ahr4I2U',
    summary: '殷商末年，商王殷寿暴虐无道。西伯侯之子姬发觉醒，各方势力暗流涌动，风云变幻端倪初显，一场席卷三界的封神大战即将拉开序幕。',
    isHot: false
  },
  // ===== 欧美电影 =====
  {
    id: 7,
    title: '奥本海默',
    originalTitle: 'Oppenheimer',
    region: 'america',
    year: 2023,
    rating: 8.8,
    genres: ['剧情', '传记', '历史'],
    director: '克里斯托弗·诺兰',
    cast: ['基里安·墨菲', '艾米莉·布朗特', '马特·达蒙', '小罗伯特·唐尼'],
    runtime: 180,
    imdbId: 'tt15398776',
    poster: OMDb('tt15398776'),
    backdrop: OMDb('tt15398776'),
    trailerUrl: 'https://www.youtube.com/embed/uYPbbksJxIg',
    summary: '当美国在日本投下原子弹时，整个世界都为这一事件感到震惊。本片聚焦于"原子弹之父"罗伯特·奥本海默——这位才华横溢的物理学家，在创造出一件改变战争进程的武器后，又试图应对其所带来的道德困境。',
    isHot: true
  },
  {
    id: 8,
    title: '沙丘2',
    originalTitle: 'Dune: Part Two',
    region: 'america',
    year: 2024,
    rating: 8.6,
    genres: ['科幻', '冒险'],
    director: '丹尼斯·维伦纽瓦',
    cast: ['提莫西·查拉梅', '赞达亚', '丽贝卡·弗格森'],
    runtime: 166,
    imdbId: 'tt15239678',
    poster: OMDb('tt15239678'),
    backdrop: OMDb('tt15239678'),
    trailerUrl: 'https://www.youtube.com/embed/Way9Dexny3w',
    summary: '保罗·厄崔迪与契妮和弗雷曼人联手，踏上对致其家毁人亡的阴谋者的复仇之路。当面对一生挚爱和已知宇宙命运之间的抉择时，他将努力阻止只有他能预见的可怕未来。',
    isHot: true
  },
  {
    id: 9,
    title: '蜘蛛侠：纵横宇宙',
    originalTitle: 'Spider-Man: Across the Spider-Verse',
    region: 'america',
    year: 2023,
    rating: 8.5,
    genres: ['动画', '动作', '科幻'],
    director: '乔伊姆·多斯·桑托斯 / 凯普·鲍尔斯',
    cast: ['沙梅克·摩尔', '海莉·斯坦菲尔德', '奥斯卡·伊萨克'],
    runtime: 140,
    imdbId: 'tt9362722',
    poster: OMDb('tt9362722'),
    backdrop: OMDb('tt9362722'),
    trailerUrl: 'https://www.youtube.com/embed/shW9i6k8cB0',
    summary: '与格温·史黛西重逢后，布鲁克林的友好邻居蜘蛛侠被弹射到多元宇宙，在那里他遇到了一群负责保护多元宇宙存在的蜘蛛侠。但当英雄们在处理新威胁的方式上产生分歧时，迈尔斯发现自己与另一群蜘蛛侠对立。',
    isHot: true
  },
  {
    id: 10,
    title: '盗梦空间',
    originalTitle: 'Inception',
    region: 'america',
    year: 2010,
    rating: 9.3,
    genres: ['科幻', '悬疑', '动作'],
    director: '克里斯托弗·诺兰',
    cast: ['莱昂纳多·迪卡普里奥', '约瑟夫·高登-莱维特', '艾利奥特·佩吉'],
    runtime: 148,
    imdbId: 'tt1375666',
    poster: OMDb('tt1375666'),
    backdrop: OMDb('tt1375666'),
    trailerUrl: 'https://www.youtube.com/embed/YoHD9XEInc0',
    summary: '道姆·柯布是一位经验老道的窃贼——在人们精神最为脆弱的睡梦中，他能潜入别人的梦境中盗取潜意识中的秘密。这一罕见的技能让他成为企业间谍中令人垂涎的对象，也让他失去了一切。',
    isHot: false
  },
  {
    id: 11,
    title: '肖申克的救赎',
    originalTitle: 'The Shawshank Redemption',
    region: 'america',
    year: 1994,
    rating: 9.7,
    genres: ['剧情', '犯罪'],
    director: '弗兰克·德拉邦特',
    cast: ['蒂姆·罗宾斯', '摩根·弗里曼'],
    runtime: 142,
    imdbId: 'tt0111161',
    poster: OMDb('tt0111161'),
    backdrop: OMDb('tt0111161'),
    trailerUrl: 'https://www.youtube.com/embed/6hB3S9bIaco',
    summary: '银行家安迪因被误判杀害妻子及其情人而入狱，在鲨堡监狱中，他凭借自己的智慧与毅力，历经20年凿出一条通往自由的隧道，最终实现自我救赎的传奇故事。',
    isHot: false
  },
  {
    id: 12,
    title: '星际穿越',
    originalTitle: 'Interstellar',
    region: 'america',
    year: 2014,
    rating: 9.4,
    genres: ['科幻', '冒险', '剧情'],
    director: '克里斯托弗·诺兰',
    cast: ['马修·麦康纳', '安妮·海瑟薇', '杰西卡·查斯坦'],
    runtime: 169,
    imdbId: 'tt0816692',
    poster: OMDb('tt0816692'),
    backdrop: OMDb('tt0816692'),
    trailerUrl: 'https://www.youtube.com/embed/zSWdZVtXT7E',
    summary: '在不久的未来，地球气候发生剧烈变化，粮食作物濒临灭绝。前NASA宇航员库珀利用土星附近的虫洞，与其他科学家一起穿越到遥远星系寻找人类的新家园。',
    isHot: false
  },
  // ===== 日本电影 =====
  {
    id: 13,
    title: '你想活出怎样的人生',
    originalTitle: '君たちはどう生きるか',
    region: 'japan',
    year: 2023,
    rating: 7.8,
    genres: ['动画', '奇幻', '剧情'],
    director: '宫崎骏',
    cast: ['山时聪真', '菅田将晖', '柴崎幸'],
    runtime: 124,
    imdbId: 'tt6587046',
    poster: OMDb('tt6587046'),
    backdrop: OMDb('tt6587046'),
    trailerUrl: 'https://www.youtube.com/embed/t5khm-VjEu4',
    summary: '少年牧真人在母亲去世后，随父亲搬到乡下。在那里，一只苍鹭带领他进入一个神秘的塔楼，穿越到奇幻世界展开冒险，并最终找到人生真谛。',
    isHot: true
  },
  {
    id: 14,
    title: '千与千寻',
    originalTitle: '千と千尋の神隠し',
    region: 'japan',
    year: 2001,
    rating: 9.4,
    genres: ['动画', '奇幻', '冒险'],
    director: '宫崎骏',
    cast: ['柊瑠美', '入野自由', '夏木真理'],
    runtime: 125,
    imdbId: 'tt0245429',
    poster: OMDb('tt0245429'),
    backdrop: OMDb('tt0245429'),
    trailerUrl: 'https://www.youtube.com/embed/ByXuk9QqQkk',
    summary: '少女千寻意外来到神隐世界，为了救爸爸妈妈，她开始在汤婆婆的浴场工作，经历了各种奇幻冒险，最终凭借自己的勇气和善良找到了回家的路。',
    isHot: false
  },
  {
    id: 15,
    title: '铃芽之旅',
    originalTitle: 'すずめの戸締まり',
    region: 'japan',
    year: 2022,
    rating: 7.6,
    genres: ['动画', '冒险', '奇幻'],
    director: '新海诚',
    cast: ['原菜乃华', '松村北斗', '深津绘里'],
    runtime: 122,
    imdbId: 'tt16428256',
    poster: OMDb('tt16428256'),
    backdrop: OMDb('tt16428256'),
    trailerUrl: 'https://www.youtube.com/embed/4OiDf2mrV7s',
    summary: '17岁少女铃芽遇到了寻找"门"的青年宗像草太，两人一起踏上关闭灾祸之源的旅程。在旅途中，日本各地开始出现灾难的"门"，铃芽必须将它们一扇扇关掉。',
    isHot: false
  },
  // ===== 韩国电影 =====
  {
    id: 16,
    title: '寄生虫',
    originalTitle: '기생충',
    region: 'korea',
    year: 2019,
    rating: 8.8,
    genres: ['剧情', '悬疑', '喜剧'],
    director: '奉俊昊',
    cast: ['宋康昊', '李善均', '赵汝贞', '崔宇植'],
    runtime: 132,
    imdbId: 'tt6751668',
    poster: OMDb('tt6751668'),
    backdrop: OMDb('tt6751668'),
    trailerUrl: 'https://www.youtube.com/embed/5xH0HfJHsaY',
    summary: '一家四口全是无业游民的父亲基泽一家，直到长子基宇靠着伪造的文凭来到富豪朴社长的家应征家教，两个天差地别的家庭卷入一连串意外事件中。',
    isHot: true
  },
  {
    id: 17,
    title: '釜山行',
    originalTitle: '부산행',
    region: 'korea',
    year: 2016,
    rating: 8.5,
    genres: ['动作', '恐怖', '惊悚'],
    director: '延尚昊',
    cast: ['孔刘', '郑裕美', '马东锡', '金秀安'],
    runtime: 118,
    imdbId: 'tt5700672',
    poster: OMDb('tt5700672'),
    backdrop: OMDb('tt5700672'),
    trailerUrl: 'https://www.youtube.com/embed/1dPDO3Tfab0',
    summary: '证券基金经纪人石宇带着女儿秀安乘坐KTX高速列车前往釜山，然而一场突如其来的丧尸病毒在列车上蔓延，乘客们必须在封闭的列车上为生存而战。',
    isHot: false
  },
  // ===== 其他地区 =====
  {
    id: 18,
    title: '三傻大闹宝莱坞',
    originalTitle: '3 Idiots',
    region: 'other',
    year: 2009,
    rating: 9.2,
    genres: ['喜剧', '剧情', '爱情'],
    director: '拉库马·希拉尼',
    cast: ['阿米尔·汗', '卡琳娜·卡普', '马达范'],
    runtime: 170,
    imdbId: 'tt1187043',
    poster: OMDb('tt1187043'),
    backdrop: OMDb('tt1187043'),
    trailerUrl: 'https://www.youtube.com/embed/K0eDlFX9GMc',
    summary: '讲述了三位主人公法兰、拉杜与兰彻之间的大学故事。兰彻是一个与众不同的大学生，他鼓励朋友们去追寻自己的梦想，而不是墨守成规。',
    isHot: false
  }
]

// 按地区筛选
export function getMoviesByRegion(region) {
  if (!region || region === 'all') return mockMovies
  return mockMovies.filter(m => m.region === region)
}

// 获取热门电影
export function getHotMovies() {
  return mockMovies.filter(m => m.isHot)
}

// 获取最新上映
export function getLatestMovies(count = 8) {
  return [...mockMovies].sort((a, b) => b.year - a.year).slice(0, count)
}

// 按 ID 获取
export function getMovieById(id) {
  return mockMovies.find(m => m.id === Number(id)) || null
}

// 搜索电影
export function searchMovies(query) {
  const q = query.toLowerCase()
  return mockMovies.filter(m =>
    m.title.includes(q) ||
    m.originalTitle.toLowerCase().includes(q) ||
    m.director.includes(q) ||
    m.cast.some(c => c.includes(q))
  )
}
