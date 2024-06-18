import React, { useState } from 'react'

export const GuestSessionContext = React.createContext(null)

export const RatingsContext = React.createContext()

// Обертка для предоставления контекста оценок
export const RatingsProvider = ({ children }) => {
  const [ratings, setRatings] = useState({})

  // Функция для обновления оценок
  const updateRating = (movieId, rating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [movieId]: rating
    }))
  }

  return <RatingsContext.Provider value={{ ratings, updateRating }}>{children}</RatingsContext.Provider>
}
