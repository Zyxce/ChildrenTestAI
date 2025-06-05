import React from 'react'

// Объект для отображения числовых значений на текстовые
const optionsMap: Record<string, string> = {
  '1': 'Очень редко',
  '2': 'Редко',
  '3': 'Иногда',
  '4': 'Часто',
  '5': 'Всегда',
}

interface RadioQuestionProps {
  question: string
  options: string[] // Принимаем числовые опции ["1", "2", "3", "4", "5"]
  value: string
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
            <span>{optionsMap[option] || option}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

export default RadioQuestion
