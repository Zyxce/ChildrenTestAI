import React from 'react'

const EMOJIS = ['😊', '😐', '😢', '😠', '😴']

interface EmojiQuestionProps {
  question: string
  value: string // Теперь только строка
  onChange: (value: string) => void
}

const EmojiQuestion: React.FC<EmojiQuestionProps> = ({
  question,
  value,
  onChange,
}) => {
  return (
    <div className="emoji-question">
      <h3>{question}</h3>
      <div className="emoji-options">
        {EMOJIS.map((emoji) => (
          <button
            key={emoji}
            type="button"
            className={`emoji-button ${value === emoji ? 'selected' : ''}`}
            onClick={() => onChange(emoji)}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  )
}

export default EmojiQuestion
