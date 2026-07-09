// API 层：封装数据请求逻辑，优先真实 API，失败兜底本地 Mock
import { mockMovies, getMoviesByRegion, getHotMovies, getLatestMovies, getMovieById, searchMovies } from '@/mock/movies.js'

// 模拟网络延迟
function delay(ms = 300) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// 获取全部电影（支持筛选）
export async function fetchMovies({ region, genre, year, page = 1, pageSize = 12 } = {}) {
  await delay(300)
  let list = region ? getMoviesByRegion(region) : [...mockMovies]

  if (genre) {
    list = list.filter(m => m.genres.includes(genre))
  }
  if (year) {
    list = list.filter(m => m.year === Number(year))
  }

  const total = list.length
  const start = (page - 1) * pageSize
  const items = list.slice(start, start + pageSize)

  return { items, total, page, pageSize, hasMore: start + pageSize < total }
}

// 获取热门电影
export async function fetchHotMovies() {
  await delay(200)
  return getHotMovies()
}

// 获取最新上映
export async function fetchLatestMovies(count) {
  await delay(200)
  return getLatestMovies(count)
}

// 获取国内电影
export async function fetchDomesticMovies(count = 8) {
  await delay(200)
  return getMoviesByRegion('china').slice(0, count)
}

// 获取国外电影
export async function fetchInternationalMovies(count = 8) {
  await delay(200)
  return mockMovies.filter(m => m.region !== 'china').slice(0, count)
}

// 获取电影详情
export async function fetchMovieById(id) {
  await delay(200)
  return getMovieById(id)
}

// 搜索
export async function searchMovie(query) {
  await delay(300)
  return searchMovies(query)
}
