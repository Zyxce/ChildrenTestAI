import React from 'react'

interface TextQuestionProps {
  question: string
  value: string
  onChange: (value: string) => void
}

const TextQuestion: React.FC<TextQuestionProps> = ({
  question,
  value,
  onChange,
}) => {
  return (
    <div className="text-question">
      <h3>{question}</h3>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        placeholder="Введите ваш ответ..."
      />
    </div>
  )
}

export default TextQuestion
