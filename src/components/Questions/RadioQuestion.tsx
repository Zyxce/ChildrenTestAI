import React from 'react'

interface RadioQuestionProps {
  question: string
  options: string[]
  value: string | null
  onChange: (value: string) => void
}

const RadioQuestion: React.FC<RadioQuestionProps> = ({
  question,
  options,
  value,
  onChange,
}) => {
  return (
    <div className="radio-question">
      <h3>{question}</h3>
      <div className="radio-options">
        {options.map((option) => (
          <label key={option} className="radio-option">
            <input
              type="radio"
              name={question}
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

export default RadioQuestion
