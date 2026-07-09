export const REGIONS = [
  { key: 'all', label: '全部' },
  { key: 'china', label: '华语' },
  { key: 'america', label: '欧美' },
  { key: 'japan', label: '日本' },
  { key: 'korea', label: '韩国' },
  { key: 'other', label: '其他' }
]

export const GENRES = [
  '动作', '喜剧', '爱情', '科幻', '悬疑',
  '恐怖', '动画', '剧情', '纪录片', '战争'
]

export const YEARS = Array.from({ length: 30 }, (_, i) => 2026 - i)
