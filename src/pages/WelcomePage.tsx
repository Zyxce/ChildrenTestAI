import React from 'react'
import { useNavigate } from 'react-router-dom'
import style from '../styles/pages/WelcomePage.module.css'

const WelcomePage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className={style.page}>
      <div className={style.pageWrapper}>
        <h1 className={style.pageTitle}>Детский психологический тест</h1>
        <p className={style.pageText}>
          Помогаем понять эмоциональное состояние вашего ребенка
        </p>
        <button className={style.pageBtn} onClick={() => navigate('/upload')}>
          Начать тест
        </button>
      </div>
    </div>
  )
}

export default WelcomePage
