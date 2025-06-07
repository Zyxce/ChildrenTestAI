import React from 'react'
import style from '../../styles/components/Questions/EmojiQuestion.module.css'

const EMOJI_OPTIONS = [
  { value: 'Хорошее', label: 'Хорошее', emoji: '😊' },
  { value: 'Удовлетворительное', label: 'Удовлетворительное', emoji: '😐' },
  { value: 'Плохое', label: 'Плохое', emoji: '😢 ' },
  { value: 'Раздраженное', label: 'Раздраженное', emoji: '😠' },
  { value: 'Уставшее', label: 'Уставшее', emoji: '😴' },
]

interface EmojiQuestionProps {
  question: string
  value: string
  onChange: (value: string) => void
}

const EmojiQuestion: React.FC<EmojiQuestionProps> = ({
  question,
  value,
  onChange,
}) => (
  <div className={style.questionContainer}>
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
