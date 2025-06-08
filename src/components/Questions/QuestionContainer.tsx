// src/components/Questions/QuestionContainer.tsx
import React from 'react'
import RatingQuestion from './RatingQuestion'
import EmojiQuestion from './EmojiQuestion'
import TextQuestion from './TextQuestion'
import DateQuestion from './DateQuestion'
import RadioQuestion from './RadioQuestion'
import { Question } from '../../types'
import style from '../../styles/components/Questions/QuestionContainer.module.css'

interface QuestionContainerProps {
  question: Question
  value: any
  onChange: (value: any) => void
  error?: string
}

const QuestionContainer: React.FC<QuestionContainerProps> = ({
  question,
  value,
  onChange,
  error,
}) => {
  switch (question.type) {
    case 'rating':
      return (
        <RatingQuestion
          question={question.question}
          value={value}
          onChange={onChange}
          min={question.scale?.min || 1}
          max={question.scale?.max || 5}
          hasError={!!error}
        />
      )
    case 'emoji':
      return (
        <EmojiQuestion
          question={question.question}
          value={value}
          onChange={onChange}
          hasError={!!error}
        />
      )
    case 'text':
    case 'textarea':
      return (
        <TextQuestion
          question={question.question}
          value={value || ''}
          onChange={onChange}
          rows={question.rows || (question.type === 'textarea' ? 5 : 4)}
          hasError={!!error}
        />
      )
    case 'date':
      return (
        <DateQuestion
          question={question.question}
          value={value}
          onChange={onChange}
          hasError={!!error}
        />
      )
    case 'radio':
      return (
        <div className={style.radioContainer}>
          <RadioQuestion
            question={question.question}
            options={question.options || []}
            value={value}
            onChange={onChange}
            hasError={!!error}
          />
        </div>
      )
    default:
      return <div>Неизвестный тип вопроса: {question.type}</div>
  }
}

export default QuestionContainer
