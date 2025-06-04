import React from 'react'

interface RatingQuestionProps {
  question: string
  value: number | null
  onChange: (value: number) => void
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
            className={`rating-button ${value === num ? 'selected' : ''}`}
            onClick={() => onChange(num)}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  )
}

export default RatingQuestion
