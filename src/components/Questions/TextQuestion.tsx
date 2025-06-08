import React from 'react'
import style from '../../styles/components/Questions/TextQuestion.module.css'
interface TextQuestionProps {
  type: string
  question: string
  value: string
  onChange: (value: string) => void
  rows?: number
  hasError?: boolean
  errorMessage?: string
}

const TextQuestion: React.FC<TextQuestionProps> = ({
  question,
  value,
  onChange,
  rows = 4,
  hasError = false,
  errorMessage,
  type,
}) => {
  const inputClasses = `${style.questionInput} ${
    value.trim() ? style.questionInputValue : ''
  } ${hasError || errorMessage ? style.questionInputError : ''}`
  const textAreaClasses = `${style.questionTextArea} ${
    value.trim() ? style.questionTextAreaValue : ''
  } ${hasError ? style.questionTextAreaError : ''}`

  if (type === 'text') {
    return (
      <div className={style.questionContainer}>
        <h3 className={style.questionTitle}>{question}</h3>
        <input
          value={value}
          className={inputClasses}
          onChange={(e) => onChange(e.target.value)}
        />
        {hasError && errorMessage && (
          <p className={style.errorMessage}>{errorMessage}</p>
        )}
      </div>
    )
  } else {
    return (
      <div className={style.questionContainer}>
        <h3 className={style.questionTitle}>{question}</h3>
        <textarea
          value={value}
          className={textAreaClasses}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
        />
        {hasError && errorMessage && (
          <p className={style.errorMessage}>{errorMessage}</p>
        )}
      </div>
    )
  }
}

export default TextQuestion
