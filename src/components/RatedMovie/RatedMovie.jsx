import React, { useState, useContext } from 'react'

import { GuestSessionContext, RatingsContext } from '../services/GuestSessionContext'
import Movie from '../movie/Movie'
import Warning from '../Warning/Warning'
import MyLayout from '../ui/MyLayout/MyLayout'

const RatedMovie = () => {
  const { ratings } = useContext(RatingsContext)
  const guestSessionId = useContext(GuestSessionContext)
  const [rated, setRated] = useState([])
  const [error, setError] = useState(null)

  React.useEffect(() => {
    if (Object.keys(ratings).length > 0) {
      fetchRatedMovies(guestSessionId)
    }
  }, [ratings])

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

  // eslint-disable-next-line no-undef
  const API_KEY = process.env.REACT_APP_API_KEY

  const fetchRatedMovies = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?api_key=${API_KEY}&language=en-US&page=1`
      )
      if (!response.ok) {
        throw new Error('Ошибка загрузки данных')
      }
      const data = await response.json()
      const updatedMovies = data.results.map((movie) => ({
        ...movie,
        userRating: ratings[movie.id] || movie.rating // Добавляем пользовательскую оценку, если она есть
      }))
      setRated(updatedMovies)
      setError(null)
    } catch (error) {
      if (!navigator.onLine) {
        setError('Возможно, ваше интернет-соединение пропало')
      } else {
        setError(error.message)
      }
    }
  }

  return (
    <MyLayout style={layoutStyle} siderStyle={siderStyle} contentStyle={contentStyle} footerStyle={footerStyle}>
      <div className="movies-list">
        {rated.length > 0 ? (
          rated.map((movie) => (
            <Movie guestSessionId={guestSessionId} key={movie.id} movie={movie} userRating={movie.userRating} />
          ))
        ) : (
          <Warning type="info" message="No results found." />
        )}
      </div>

      {error && <Warning message={error} type="error" />}
    </MyLayout>
  )
}

export default RatedMovie
