// src/components/Questions/EmojiQuestion.tsx
import React from 'react'
import style from '../../styles/components/Questions/EmojiQuestion.module.css'
import { EMOJI_OPTIONS } from '../../configs/constants'
interface EmojiQuestionProps {
  question: string
  value: string
  onChange: (value: string) => void
  hasError?: boolean
}

const EmojiQuestion: React.FC<EmojiQuestionProps> = ({
  question,
  value,
  onChange,
  hasError = false,
}) => (
  <div
    className={`${style.questionContainer} ${
      hasError ? style.containerError : ''
    }`}
  >
    <h3 className={style.questionTitle}>{question}</h3>
    <div className={style.questionOptions}>
      {EMOJI_OPTIONS.map((option) => (
        <div
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`${style.optionContainer} ${
            value === option.value ? style.optionContainerActive : ''
          }`}
        >
          <p className={style.questionEmoji}>{option.emoji}</p>
          <p className={style.questionText}>{option.label}</p>
        </div>
      ))}
    </div>
  </div>
)

export default EmojiQuestion
