import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

// eslint-disable-next-line no-undef
const API_KEY = process.env.REACT_APP_API_KEY
// Создаем контекст
export const GenreContext = createContext()
// Создаем провайдер контекста
export const GenreProvider = ({ children }) => {
  const [genres, setGenres] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    // Функция для загрузки данных о жанрах
    const fetchGenres = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list', {
          params: {
            api_key: API_KEY
          }
        })
        setGenres(response.data.genres)
      } catch (error) {
        console.error('Ошибка при загрузке жанров:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchGenres()
  }, [])

  return <GenreContext.Provider value={{ genres, loading }}>{children}</GenreContext.Provider>
}
