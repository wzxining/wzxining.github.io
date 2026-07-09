// API 层：封装 TMDB 真实数据请求
import {
  getPopular, getNowPlaying, discoverMovies,
  getMovieDetail, searchMovies, getSimilarMovies
} from './tmdb.js'

// 获取电影列表（支持筛选 + 分页）
export async function fetchMovies({ region, genre, year, page = 1 } = {}) {
  return discoverMovies({ region, genre, year, page })
}

// 获取热门电影
export async function fetchHotMovies() {
  const result = await getPopular(1)
  return result.items.slice(0, 8)
}

// 获取最新上映
export async function fetchLatestMovies(count = 8) {
  const result = await getNowPlaying(1)
  return result.items.slice(0, count)
}

// 获取华语电影
export async function fetchDomesticMovies(count = 8) {
  const result = await discoverMovies({ region: 'china', page: 1 })
  return result.items.slice(0, count)
}

// 获取国际电影
export async function fetchInternationalMovies(count = 8) {
  const result = await getNowPlaying(2)
  return result.items.slice(0, count)
}

// 获取电影详情
export async function fetchMovieById(id) {
  try {
    return await getMovieDetail(id)
  } catch {
    return null
  }
}

// 搜索电影
export async function searchMovie(query) {
  const result = await searchMovies(query, 1)
  return result.items
}

// 获取相似电影推荐
export async function fetchSimilarMovies(id, count = 6) {
  const result = await getSimilarMovies(id)
  return result.items.slice(0, count)
}
