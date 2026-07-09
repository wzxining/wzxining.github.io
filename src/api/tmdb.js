// TMDB API 核心服务
const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YmNlZDVjMjQ0MDJjMjM0NzBiOTgzZDNlMDczNDQzMyIsIm5iZiI6MTc4MzU2NTA5OC4yNjQsInN1YiI6IjZhNGYwYjJhOTRhYzRhZmZhZGEwOTE3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.M_iuzBK8HIqwwOAZJwvoMiQlCRQEH09ODist-P1vjJc'
const BASE_URL = 'https://api.themoviedb.org/3'
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'

// 海报占位图（深色底 + 提示文字）
const FALLBACK_POSTER = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="500" height="750" fill="#1c2129"><rect width="500" height="750"/><text x="250" y="365" text-anchor="middle" fill="#6e7681" font-size="24">暂无海报</text></svg>'
)}`

const headers = {
  Authorization: `Bearer ${ACCESS_TOKEN}`,
  'Content-Type': 'application/json;charset=utf-8'
}

// 地区映射：original_language → 项目 region 字段
function mapRegion(lang) {
  const map = { zh: 'china', en: 'america', ja: 'japan', ko: 'korea' }
  return map[lang] || 'other'
}

// 项目 region → TMDB country code
const REGION_COUNTRY = {
  china: 'CN',
  america: 'US',
  japan: 'JP',
  korea: 'KR'
}

// 项目 genre 名称 → TMDB genre ID
const GENRE_ID_MAP = {
  '动作': 28, '冒险': 12, '动画': 16, '奇幻': 14,
  '科幻': 878, '剧情': 18, '悬疑': 9648, '喜剧': 35,
  '战争': 10752, '历史': 36, '犯罪': 80, '恐怖': 27,
  '惊悚': 53, '爱情': 10749, '纪录片': 99
}

// TMDB genre ID → 中文名（列表接口的备用映射）
const GENRE_NAME_MAP = {
  28: '动作', 12: '冒险', 16: '动画', 35: '喜剧', 80: '犯罪',
  99: '纪录', 18: '剧情', 10751: '家庭', 14: '奇幻', 36: '历史',
  27: '恐怖', 10402: '音乐', 9648: '悬疑', 10749: '爱情', 878: '科幻',
  10770: '电视电影', 53: '惊悚', 10752: '战争', 37: '西部'
}

// 通用 fetch 封装
async function fetchTMDB(path, params = {}) {
  const url = new URL(`${BASE_URL}${path}`)
  url.searchParams.set('language', 'zh-CN')
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') {
      url.searchParams.set(k, v)
    }
  })
  const res = await fetch(url.toString(), { headers })
  if (!res.ok) throw new Error(`TMDB API Error: ${res.status}`)
  return res.json()
}

// 统一数据标准化：TMDB 格式 → 项目格式
function normalizeMovie(movie) {
  // 类型名称：详情接口返回 {id, name} 对象，列表接口返回 genre_ids 数字
  let genreNames = []
  if (movie.genres?.length) {
    genreNames = movie.genres.map(g => g.name)
  } else if (movie.genre_ids?.length) {
    genreNames = movie.genre_ids.map(id => GENRE_NAME_MAP[id] || '').filter(Boolean)
  }

  const normalized = {
    id: movie.id,
    title: movie.title || movie.original_title || '未知片名',
    originalTitle: movie.original_title || movie.title || '',
    poster: movie.poster_path ? `${IMAGE_BASE_URL}/w500${movie.poster_path}` : FALLBACK_POSTER,
    backdrop: movie.backdrop_path ? `${IMAGE_BASE_URL}/w1280${movie.backdrop_path}` : null,
    summary: movie.overview || '暂无简介',
    rating: movie.vote_average || 0,
    year: movie.release_date ? new Date(movie.release_date).getFullYear() : 0,
    genres: genreNames,
    region: mapRegion(movie.original_language)
  }

  // 默认值（列表接口不会返回这些字段）
  normalized.director = '未知'
  normalized.cast = []
  normalized.runtime = 0
  normalized.trailerUrl = null

  // 详情接口才有的字段
  if (movie.runtime) normalized.runtime = movie.runtime
  if (movie.credits) {
    const crew = movie.credits.crew || []
    normalized.director = crew.find(c => c.job === 'Director')?.name || '未知'
    normalized.cast = (movie.credits.cast || []).slice(0, 10).map(c => c.name)
  }
  if (movie.videos) {
    const trailer = (movie.videos.results || []).find(
      v => v.type === 'Trailer' && v.site === 'YouTube'
    )
    normalized.trailerUrl = trailer ? `https://www.youtube.com/embed/${trailer.key}` : null
  }
  return normalized
}

// ===== 对外 API =====

// 热门电影
export async function getPopular(page = 1) {
  const data = await fetchTMDB('/movie/popular', { page })
  return {
    items: (data.results || []).map(normalizeMovie),
    total: data.total_results,
    page: data.page,
    hasMore: data.page < data.total_pages
  }
}

// 正在上映
export async function getNowPlaying(page = 1) {
  const data = await fetchTMDB('/movie/now_playing', { page })
  return {
    items: (data.results || []).map(normalizeMovie),
    total: data.total_results,
    page: data.page,
    hasMore: data.page < data.total_pages
  }
}

// 按条件发现电影（筛选+分页）
export async function discoverMovies({ region, genre, year, page = 1 } = {}) {
  const params = { page, sort_by: 'popularity.desc' }

  if (region && REGION_COUNTRY[region]) {
    params.with_origin_country = REGION_COUNTRY[region]
  }
  // region === 'other'：不加任何 country 筛选，展示全部地区
  if (genre && GENRE_ID_MAP[genre]) {
    params.with_genres = GENRE_ID_MAP[genre]
  }
  if (year) {
    params.primary_release_year = year
  }

  const data = await fetchTMDB('/discover/movie', params)
  return {
    items: (data.results || []).map(normalizeMovie),
    total: data.total_results,
    page: data.page,
    hasMore: data.page < data.total_pages
  }
}

// 搜索电影
export async function searchMovies(query, page = 1) {
  if (!query) return { items: [], total: 0, page: 1, hasMore: false }
  const data = await fetchTMDB('/search/movie', { query, page })
  return {
    items: (data.results || []).map(normalizeMovie),
    total: data.total_results,
    page: data.page,
    hasMore: data.page < data.total_pages
  }
}

// 电影详情（含演职员 + 预告片）
export async function getMovieDetail(id) {
  const data = await fetchTMDB(`/movie/${id}`, {
    append_to_response: 'credits,videos'
  })
  return normalizeMovie(data)
}

// 相似推荐
export async function getSimilarMovies(id, page = 1) {
  const data = await fetchTMDB(`/movie/${id}/similar`, { page })
  return {
    items: (data.results || []).map(n => ({
      id: n.id,
      title: n.title || n.original_title,
      poster: n.poster_path ? `${IMAGE_BASE_URL}/w500${n.poster_path}` : FALLBACK_POSTER,
      rating: n.vote_average || 0,
      year: n.release_date ? new Date(n.release_date).getFullYear() : 0,
      region: mapRegion(n.original_language)
    })),
    total: data.total_results
  }
}
