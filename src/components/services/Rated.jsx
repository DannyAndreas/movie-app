import React, { useState, useContext } from 'react'
import { Rate } from 'antd'
import axios from 'axios'

import { GuestSessionContext, RatingsContext } from '../services/GuestSessionContext'

const Rated = ({ movieId }) => {
  const guestSessionId = useContext(GuestSessionContext)
  const { ratings, updateRating } = useContext(RatingsContext)
  const [rating, setRating] = useState(ratings[movieId] || 0)
  // eslint-disable-next-line no-undef
  const API_KEY = process.env.REACT_APP_API_KEY

  const handleRating = (value) => {
    setRating(value)
    updateRating(movieId, value)
    axios
      .post(
        `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${API_KEY}&guest_session_id=${guestSessionId}`,
        { value: value }
      )
      .then((response) => {
        if (response.status === 201) {
          console.log('Рейтинг успешно отправлен')
        }
      })
      .catch((error) => {
        console.error('Ошибка при отправке рейтинга:', error)
      })
  }

  return (
    <Rate
      count={10}
      allowHalf
      value={rating}
      onChange={handleRating} // Вызываем функцию при изменении рейтинга
      style={{ position: 'absolute', bottom: '15px', left: '44%', fontSize: '17px' }}
    />
  )
}

export default Rated
