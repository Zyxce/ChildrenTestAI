import React from 'react'

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
    <div className="date-question">
      <h3>{question}</h3>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export default DateQuestion
