import React from 'react'
import ReactDOM from 'react-dom/client'

import { GenreProvider } from './components/services/GenreContext'
import App from './components/app/App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <GenreProvider>
    <App />
  </GenreProvider>
)
