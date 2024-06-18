import React, { useEffect, useState, useContext } from 'react'
import { Card } from 'antd'

import { GenreContext } from '../services/GenreContext'
import Spiner from '../spin/Spiner'
import Rated from '../services/Rated'
import './Movie.css'

const Movie = ({ movie }) => {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // получаем контекст с жанрами
  const { genres } = useContext(GenreContext)

  const genreElements = movie.genre_ids.map((genreId) => {
    const genre = genres.find((g) => g.id === genreId)
    return genre ? (
      <span key={genreId} className="genre">
        {genre.name}
      </span>
    ) : null
  })

  // сокращение описаия фильма
  const [shortenedDescription, setShortenedDescription] = useState('')
  useEffect(() => {
    const maxLength = 150
    const movieDescription = movie.overview
    let shortened = movieDescription.substr(0, maxLength + 1)
    const lastSpaceIndex = shortened.lastIndexOf(' ')

    if (lastSpaceIndex > -1 && lastSpaceIndex < maxLength) {
      shortened = shortened.substr(0, lastSpaceIndex)
    }

    setShortenedDescription(movieDescription.length > maxLength ? shortened + '...' : movieDescription)
  }, [])

  // получаем изображение фильма

  const Poster = () => {
    const imageURL = 'https://image.tmdb.org/t/p/w500' + movie.poster_path
    const placeholder = (
      <img
        src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/726b2d20509971.562ec74e76577.jpg"
        alt={movie.title}
        style={{ maxWidth: '183px', maxHeight: '281px', minHeight: '281px', borderRadius: '8px 8px 8px 8px' }}
      />
    )

    // возвращаем либо изображение фильма, либо заполнитель
    return movie.poster_path !== null ? (
      <img
        src={imageURL}
        alt={movie.title}
        style={{ maxWidth: '183px', maxHeight: '281px', minHeight: '281px', borderRadius: '8px 8px 8px 8px' }}
      />
    ) : (
      placeholder
    )
  }

  // изменяем дату полученную в формате 22.22.2222 в May 22, 2222
  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('en-US', options)
  }

  const apiDate = movie.release_date
  const formattedDate = formatDate(apiDate)

  // сокращаем оценку с полученно 0.000 до 0.0
  const shortenedRaiting = parseFloat(movie.vote_average.toFixed(1))

  // получения цвета в зависимости от оценки
  function getRatingColor(shortenedRaiting) {
    if (shortenedRaiting >= 0 && shortenedRaiting < 3) {
      return '#E90000' // Красный
    } else if (shortenedRaiting >= 3 && shortenedRaiting < 5) {
      return '#E97E00' // Оранжевый
    } else if (shortenedRaiting >= 5 && shortenedRaiting < 7) {
      return '#E9D100' // Желтый
    } else if (shortenedRaiting >= 7) {
      return '#66E900' // Зеленый
    }
  }

  // цвет для текущей оценки
  const ratingColor = getRatingColor(shortenedRaiting)

  // стиль для элемента оценки
  const ratingStyle = {
    color: ratingColor,
    border: ` 2px solid ${ratingColor}`
  }

  return (
    <div className="oneMovieItem">
      <Card
        hoverable
        style={{ display: 'flex', maxHeight: '281px', minHeight: '281px', minWidth: '451px', maxWidth: '451px' }}
        cover={loading ? <Spiner size="large" style={{ padding: '86px 0' }} /> : <Poster />}
      >
        {' '}
        <div className="movieBody">
          <div className="movieAppHeader">
            <h4 className="movieTitle"> {movie.title}</h4>
            <h5 className="movieRate" style={ratingStyle}>
              {shortenedRaiting}
            </h5>
          </div>

          <h5 className="releaseDate">{formattedDate}</h5>
          <h5 className="genres">{genreElements}</h5>
          <h5 className="description">{shortenedDescription}</h5>
          <Rated movieId={movie.id} />
        </div>
      </Card>
    </div>
  )
}
export default Movie
