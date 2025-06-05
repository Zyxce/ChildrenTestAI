import React from 'react'

interface RatingQuestionProps {
  question: string
  value: string | null // Изменяем тип на string | null
  onChange: (value: string) => void // Изменяем тип принимаемого значения
}

const RatingQuestion: React.FC<RatingQuestionProps> = ({
  question,
  value,
  onChange,
}) => {
  return (
    <div className="rating-question">
      <h3>{question}</h3>
      <div className="rating-options">
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            type="button"
            className={`rating-button ${
              value === num.toString() ? 'selected' : ''
            }`}
            onClick={() => onChange(num.toString())} // Преобразуем число в строку
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  )
}

export default RatingQuestion
