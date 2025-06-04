import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import QuestionContainer from '../components/Questions/QuestionContainer'
import rawQuestions from '../data/questions.json'
import { submitSurvey } from '../services/api'
import { Question } from '../types'

const QuestionnairePage: React.FC = () => {
  const navigate = useNavigate()
  const { taskId } = useSelector((state: RootState) => state.upload)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const questionsData = rawQuestions as Question[]
  useEffect(() => {
    if (!taskId) {
      navigate('/upload')
    }
  }, [taskId, navigate])

  const handleAnswerChange = (questionId: string, value: any) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }))
  }

  const handleSubmit = async () => {
    if (!taskId) return

    setIsSubmitting(true)
    setError(null)

    try {
      await submitSurvey(taskId, answers)
      navigate('/report')
    } catch (err) {
      setError('Ошибка при отправке ответов. Пожалуйста, попробуйте снова.')
      console.error('Survey submission error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const allRequiredAnswered = questionsData.every((q) => {
    if (!q.required) return true
    return (
      answers[q.id] !== undefined &&
      answers[q.id] !== null &&
      answers[q.id] !== ''
    )
  })

  return (
    <div className="questionnaire-page">
      <h2>Психологический опросник</h2>

      <QuestionContainer
        questions={questionsData}
        answers={answers}
        onAnswerChange={handleAnswerChange}
      />

      {error && <div className="error-message">{error}</div>}

      <button
        onClick={handleSubmit}
        disabled={!allRequiredAnswered || isSubmitting}
      >
        {isSubmitting ? 'Отправка...' : 'Отправить ответы'}
      </button>
    </div>
  )
}

export default QuestionnairePage
