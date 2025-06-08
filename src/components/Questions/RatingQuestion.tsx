// src/components/Questions/RatingQuestion.tsx
import React, { useState } from 'react'
import style from '../../styles/components/Questions/RatingQuestion.module.css'

interface RatingQuestionProps {
  question: string
  value: string | null
  onChange: (value: string) => void
  min?: number
  max?: number
  hasError?: boolean
}

const RatingQuestion: React.FC<RatingQuestionProps> = ({
  question,
  value,
  onChange,
  min = 1,
  max = 5,
  hasError = false,
}) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null)
  const ratingOptions = Array.from({ length: max - min + 1 }, (_, i) => min + i)
  const numericValue = value ? parseInt(value, 10) : null

  return (
    <div
      className={`${style.quectionContainer} ${
        hasError ? style.containerError : ''
      }`}
    >
      <h3 className={style.quectionTitle}>{question}</h3>
      <div
        className={style.quectionOptions}
        onMouseLeave={() => setHoverValue(null)}
      >
        {ratingOptions.map((num) => (
          <button
            key={num}
            type="button"
            className={`${style.quectionScale} ${
              (numericValue !== null && num <= numericValue) ||
              (hoverValue !== null && num <= hoverValue)
                ? style.quectionScaleActive
                : ''
            }`}
            onClick={() => onChange(num.toString())}
            onMouseEnter={() => setHoverValue(num)}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  )
}

export default RatingQuestion
