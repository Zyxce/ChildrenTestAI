// src/components/Questions/RadioQuestion.tsx
import React from 'react'
import style from '../../styles/components/Questions/RadioQuestion.module.css'

const optionsMap: Record<string, string> = {
  '1': 'Очень редко',
  '2': 'Редко',
  '3': 'Иногда',
  '4': 'Часто',
  '5': 'Всегда',
}

interface RadioQuestionProps {
  question: string
  options: string[]
  value: string
  onChange: (value: string) => void
  hasError?: boolean
}

const RadioQuestion: React.FC<RadioQuestionProps> = ({
  question,
  options,
  value,
  onChange,
  hasError = false,
}) => {
  return (
    <div
      className={`${style.questionContainer} ${
        hasError ? style.containerError : ''
      }`}
    >
      <h3 className={style.questionTitle}>{question}</h3>
      <div className={style.questionOptions}>
        {options.map((option) => (
          <label key={option} className={style.questionLabel}>
            <input
              type="radio"
              name={question}
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
              className={style.hiddenInput}
            />
            <span
              className={`${style.customRadio} ${
                value === option ? style.customRadioChecked : ''
              }`}
            />
            <span className={style.questionOption}>
              {optionsMap[option] || option}
            </span>
          </label>
        ))}
      </div>
    </div>
  )
}

export default RadioQuestion
