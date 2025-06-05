// src/components/Questions/RatingQuestion.tsx
import React from 'react'

interface RatingQuestionProps {
  question: string
  value: string | null
  onChange: (value: string) => void
  min?: number
  max?: number
}

const RatingQuestion: React.FC<RatingQuestionProps> = ({
  question,
  value,
  onChange,
  min = 1,
  max = 5,
}) => {
  const ratingOptions = Array.from({ length: max - min + 1 }, (_, i) => min + i)

  return (
    <div className="rating-question">
      <h3>{question}</h3>
      <div className="rating-options">
        {ratingOptions.map((num) => (
          <button
            key={num}
            type="button"
            className={`rating-button ${
              value === num.toString() ? 'selected' : ''
            }`}
            onClick={() => onChange(num.toString())}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  )
}

export default RatingQuestion
