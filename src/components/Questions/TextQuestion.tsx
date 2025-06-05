// src/components/Questions/TextQuestion.tsx
import React from 'react'

interface TextQuestionProps {
  question: string
  value: string
  onChange: (value: string) => void
  rows?: number
}

const TextQuestion: React.FC<TextQuestionProps> = ({
  question,
  value,
  onChange,
  rows = 4,
}) => {
  return (
    <div className="text-question">
      <h3>{question}</h3>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder="Введите ваш ответ..."
      />
    </div>
  )
}

export default TextQuestion
