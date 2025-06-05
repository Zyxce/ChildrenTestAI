import React from 'react'

const EMOJI_OPTIONS = [
  { value: 'Хорошее', label: '😊 Хорошее' },
  { value: 'Удовлетворительное', label: '😐 Удовлетворительное' },
  { value: 'Плохое', label: '😢 Плохое' },
  { value: 'Раздраженное', label: '😠 Раздраженное' },
  { value: 'Уставшее', label: '😴 Уставшее' },
]

interface EmojiQuestionProps {
  question: string
  value: string // Теперь только строка
  onChange: (value: string) => void
}

const EmojiQuestion: React.FC<EmojiQuestionProps> = ({
  question,
  value,
  onChange,
}) => (
  <div className="emoji-question">
    <h3>{question}</h3>
    <div className="emoji-options">
      {EMOJI_OPTIONS.map((option) => (
        <button
          key={option.value}
          className={`emoji-button ${value === option.value ? 'selected' : ''}`}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  </div>
)

export default EmojiQuestion
