import React, { useState, useEffect } from 'react'
import { debounce } from 'lodash'

import Movie from '../movie/Movie'
import MyInput from '../ui/MyInput/MyInput'
import Warning from '../Warning/Warning'
import MyLayout from '../ui/MyLayout/MyLayout'
import movieService from '../services/MovieService'
import AppFooter from '../footer/Footer'
import './SearchMovie.css'

const SearchMovie = () => {
  const [filter, setFilter] = useState('return')
  const [currentPage, setCurrentPage] = useState(1)
  // const [itemsPerPage] = useState(10)
  const [searched, setSearched] = useState([])
  const [error, setError] = useState(null)
  const [totalPages, setTotalPages] = useState(0)

  // Функция для поиска фильмов

  const fetchMovies = async () => {
    try {
      const { results, totalPages } = await movieService(filter, currentPage)
      setSearched(results)
      setTotalPages(totalPages) // Обновляем состояние с общим количеством страниц
      setError(null)
    } catch (error) {
      setError(error.message)
    }
  }
  // задержка выполнения поиска при изменении фильтра
  const handleChange = (e) => {
    setFilter(e.target.value)
  }
  const debouncedSearchMovies = debounce((filter, currentPage) => {
    fetchMovies(filter, currentPage)
  }, 1000)

  useEffect(() => {
    if (filter) {
      debouncedSearchMovies(filter, currentPage)
    }
    return () => {
      debouncedSearchMovies.cancel()
    }
  }, [filter, currentPage])

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  // Стили для компонентов
  const contentStyle = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    color: '#000000',
    backgroundColor: '#FFFFFF'
  }

  const siderStyle = {
    textAlign: 'center',
    lineHeight: '120px',
    color: 'red',
    backgroundColor: '#FFFFFF',
    opacity: '0.5'
  }

  const layoutStyle = {
    borderRadius: 8,
    overflow: 'hidden'
  }
  const footerStyle = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#4096ff'
  }
  return (
    <>
      <MyLayout style={layoutStyle} siderStyle={siderStyle} contentStyle={contentStyle} footerStyle={footerStyle}>
        <MyInput type="text" value={filter} onChange={handleChange} />
        <div className="movies-list">
          {searched.length > 0 ? (
            searched.map((movie) => <Movie key={movie.id} movie={movie} />)
          ) : (
            <Warning type="info" message="No results found." />
          )}
        </div>
        {error && <Warning message={error} type="error" />}
      </MyLayout>
      <AppFooter totalPages={totalPages} onPageChange={handlePageChange} currentPage={currentPage} />
    </>
  )
}
export default SearchMovie
