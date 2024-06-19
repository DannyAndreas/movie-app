import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { GuestSessionContext, RatingsProvider } from '../services/GuestSessionContext'
import AppHeader from '../header/Header'
import RatedMovie from '../RatedMovie/RatedMovie'
import SearchMovie from '../SearchMovie/SearchMovie'
import './App.css'
// eslint-disable-next-line no-undef
const API_KEY = process.env.REACT_APP_API_KEY
const App = () => {
  const [searched, setSearched] = useState([])
  const [rated, setRated] = useState([])
  const [guestSessionId, setGuestSessionId] = useState(null)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('1')

  useEffect(() => {
    createGuestSession() // Вызов функции при монтировании компонента
  }, []) // Пустой массив зависимостей, чтобы вызвать эффект только при монтировании

  const handleTabChange = (key) => {
    setActiveTab(key) // Вызов функции для поиска фильмов
  }

  const createGuestSession = async () => {
    try {
      const response = await axios.get('https://api.themoviedb.org/3/authentication/guest_session/new', {
        params: {
          api_key: API_KEY
        }
      })
      if (response.data.success) {
        setGuestSessionId(response.data.guest_session_id)
        // Сессия успешно создана
        console.log('Guest session ID:', response.data.guest_session_id)
        // Дальнейшие действия с ID сессии
      } else {
        // Обработка ошибки создания сессии
        console.error('Failed to create guest session')
      }
    } catch (error) {
      // Обработка ошибок запроса
      console.error('Error creating guest session:', error)
      setError(error)
    }
  }

  return (
    <RatingsProvider>
      <GuestSessionContext.Provider value={guestSessionId}>
        <AppHeader onTabChange={handleTabChange} />
        {error && <div className="error-message">Произошла ошибка: {error.message} - попробуйте использовать VPN</div>}
        {activeTab === '1' && <SearchMovie setSearched={setSearched} setError={setError} searched={searched} />}
        {activeTab === '2' && <RatedMovie setRated={setRated} setError={setError} rated={rated} />}
      </GuestSessionContext.Provider>
    </RatingsProvider>
  )
}

export default App
