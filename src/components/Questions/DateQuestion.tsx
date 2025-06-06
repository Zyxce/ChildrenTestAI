import React from 'react'
import style from '../../styles/components/Questions/DateQuestion.module.css'

interface DateQuestionProps {
  question: string
  value: string // Теперь только строка
  onChange: (value: string) => void
}

const DateQuestion: React.FC<DateQuestionProps> = ({
  question,
  value,
  onChange,
}) => {
  return (
    <div className={style.questionContainer}>
      <h3 className={style.questionTitle}>{question}</h3>
      <input
        className={style.questionDate}
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export default DateQuestion
