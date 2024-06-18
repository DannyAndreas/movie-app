import axios from 'axios'

// eslint-disable-next-line no-undef
const API_KEY = process.env.REACT_APP_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

const movieService = async (filter, page) => {
  if (!filter) return { results: [], totalPages: 0 } // Возвращаем пустой массив и 0 страниц, если фильтр пустой
  try {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      params: {
        query: filter,
        api_key: API_KEY,
        language: 'en-US',
        page: page
      }
    })
    // Возвращаем результаты поиска и общее количество страниц
    return { results: response.data.results || [], totalPages: response.data.total_pages }
  } catch (error) {
    if (!navigator.onLine) {
      throw new Error('Возможно, ваше интернет-соединение пропало')
    } else {
      throw error
    }
  }
}
export default movieService
