// src/pages/QuestionnairePage.tsx
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { submitSurvey } from '../services/api'
import { Section, Question } from '../types' // Импортируем Question
import QuestionContainer from '../components/Questions/QuestionContainer'
import rawQuestionsData from '../data/questions.json'

// Явно утверждаем тип импортированных данных
const questionsData = rawQuestionsData as { sections: Section[] }

const QuestionnairePage: React.FC = () => {
  const navigate = useNavigate()
  const { taskId } = useSelector((state: RootState) => state.upload)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Используем статически импортированные данные с утверждением типа
  const [sections] = useState<Section[]>(questionsData.sections)

  useEffect(() => {
    if (!taskId) {
      navigate('/upload')
    }
  }, [taskId, navigate])

  const handleAnswerChange = (questionId: string, value: any) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  const handleSubmit = async () => {
    if (!taskId) {
      setError(
        'Отсутствует идентификатор задачи. Пожалуйста, начните тест заново.'
      )
      return
    }

    try {
      setIsSubmitting(true)

      // Преобразуем значения в строки
      const stringAnswers: Record<string, string> = {}
      Object.entries(answers).forEach(([key, value]) => {
        stringAnswers[key] = value?.toString() || ''
      })

      await submitSurvey(taskId, stringAnswers)
      navigate('/report')
    } catch (err) {
      console.error('Ошибка при отправке ответов:', err)
      setError('Ошибка при отправке ответов. Пожалуйста, попробуйте снова.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Проверка заполнения всех обязательных вопросов
  const allRequiredAnswered = sections.every((section) =>
    section.fields.every(
      (field) =>
        !field.required ||
        (answers[field.id] !== undefined &&
          answers[field.id] !== null &&
          answers[field.id] !== '')
    )
  )

  return (
    <div className="questionnaire-page">
      <h2>Психологический опросник</h2>

      {sections.map((section, index) => (
        <div key={`section-${index}`} className="question-section">
          <h3>{section.title}</h3>
          <div className="questions-grid">
            {section.fields.map((field) => (
              <QuestionContainer
                key={`question-${field.id}`}
                question={field}
                value={
                  answers[field.id] ??
                  (field.type === 'text' || field.type === 'textarea'
                    ? ''
                    : null)
                }
                onChange={(value) => handleAnswerChange(field.id, value)}
              />
            ))}
          </div>
        </div>
      ))}

      {error && <div className="error-message">{error}</div>}

      <button
        onClick={handleSubmit}
        disabled={!allRequiredAnswered || isSubmitting}
        className={`submit-btn ${
          !allRequiredAnswered || isSubmitting ? 'disabled' : ''
        }`}
      >
        {isSubmitting ? 'Отправка...' : 'Отправить ответы'}
      </button>
    </div>
  )
}

export default QuestionnairePage
