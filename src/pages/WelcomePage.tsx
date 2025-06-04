// src/pages/WelcomePage.tsx
import React from 'react'
import { useNavigate } from 'react-router-dom'

const WelcomePage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="welcome-page">
      <h1>Детский психологический тест</h1>
      <p>Помогаем понять эмоциональное состояние вашего ребенка</p>
      <button onClick={() => navigate('/upload')}>Начать тест</button>
    </div>
  )
}

export default WelcomePage
