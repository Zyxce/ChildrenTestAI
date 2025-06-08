// src/components/Questions/TextQuestion.tsx
import React from 'react'
import style from '../../styles/components/Questions/TextQuestion.module.css'

interface TextQuestionProps {
  question: string
  value: string
  onChange: (value: string) => void
  rows?: number
  hasError?: boolean
}

const TextQuestion: React.FC<TextQuestionProps> = ({
  question,
  value,
  onChange,
  rows = 4,
  hasError = false,
}) => {
  const inputClasses = `${style.questionInput} ${
    value.trim() ? style.questionInputValue : ''
  } ${hasError ? style.questionInputError : ''}`

  return (
    <div className={style.questionContainer}>
      <h3 className={style.questionTitle}>{question}</h3>
      <textarea
        value={value}
        className={inputClasses}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
      />
    </div>
  )
}

export default TextQuestion
