import React from 'react'
import RatingQuestion from './RatingQuestion'
import EmojiQuestion from './EmojiQuestion'
import TextQuestion from './TextQuestion'
import DateQuestion from './DateQuestion'
import RadioQuestion from './RadioQuestion'
import { Question } from '../../types'

interface QuestionContainerProps {
  questions: Question[]
  answers: Record<string, any>
  onAnswerChange: (id: string, value: any) => void
}

const QuestionContainer: React.FC<QuestionContainerProps> = ({
  questions,
  answers,
  onAnswerChange,
}) => {
  const renderQuestion = (q: Question) => {
    switch (q.type) {
      case 'rating':
        return (
          <RatingQuestion
            key={q.id}
            question={q.question}
            value={answers[q.id] || null}
            onChange={(value) => onAnswerChange(q.id, value)}
          />
        )
      case 'emoji':
        return (
          <EmojiQuestion
            key={q.id}
            question={q.question}
            value={answers[q.id] || null}
            onChange={(value) => onAnswerChange(q.id, value)}
          />
        )
      case 'text':
        return (
          <TextQuestion
            key={q.id}
            question={q.question}
            value={answers[q.id] || ''}
            onChange={(value) => onAnswerChange(q.id, value)}
          />
        )
      case 'date':
        return (
          <DateQuestion
            key={q.id}
            question={q.question}
            value={answers[q.id] || null}
            onChange={(value) => onAnswerChange(q.id, value)}
          />
        )
      case 'radio':
        return (
          <RadioQuestion
            key={q.id}
            question={q.question}
            options={q.options || []}
            value={answers[q.id] || null}
            onChange={(value) => onAnswerChange(q.id, value)}
          />
        )
      default:
        return <div key={q.id}>Неизвестный тип вопроса: {q.type}</div>
    }
  }

  return (
    <div className="question-container">{questions.map(renderQuestion)}</div>
  )
}

export default QuestionContainer
