import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import rawQuestions from '../data/questions.json'
import { submitSurvey } from '../services/api'
import { Question, Answers } from '../types'
import TextQuestion from '../components/Questions/TextQuestion'
import DateQuestion from '../components/Questions/DateQuestion'
import RadioQuestion from '../components/Questions/RadioQuestion'
import RatingQuestion from '../components/Questions/RatingQuestion'
import EmojiQuestion from '../components/Questions/EmojiQuestion'

const QuestionnairePage: React.FC = () => {
  const navigate = useNavigate()
  const { taskId } = useSelector((state: RootState) => state.upload)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const questionsData = rawQuestions as Question[]

  // Фильтрация вопросов по категориям
  const personalQuestions = questionsData.filter((q) =>
    ['childName', 'childDOB', 'childGender', 'parentName'].includes(q.id)
  )

  const sectionQuestions = questionsData.filter(
    (q) => q.id.startsWith('q') && q.type === 'rating'
  )

  const emotionalQuestion = questionsData.find((q) => q.id === 'emotionalState')

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
    if (!taskId) {
      setError(
        'Отсутствует идентификатор задачи. Пожалуйста, начните тест заново.'
      )
      return
    }

    try {
      setIsSubmitting(true)

      // Преобразуем числовые значения в строки перед отправкой
      const stringAnswers: Answers = {}
      Object.entries(answers).forEach(([key, value]) => {
        if (typeof value === 'number') {
          stringAnswers[key] = value.toString()
        } else {
          stringAnswers[key] = value
        }
      })

      await submitSurvey(taskId, stringAnswers) // Используем преобразованные ответы
      navigate('/report')
    } catch (err) {
      console.error('Ошибка при отправке:', err)
      setError('Ошибка при отправке ответов. Пожалуйста, попробуйте снова.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Проверка заполнения всех обязательных вопросов
  const allRequiredAnswered = questionsData.every((q) => {
    if (!q.required) return true
    const answer = answers[q.id]

    // Обновляем проверки для всех типов вопросов
    if (q.type === 'rating') return typeof answer === 'string' && answer !== ''
    if (q.type === 'date') return typeof answer === 'string' && answer !== ''
    if (q.type === 'emoji') return typeof answer === 'string' && answer !== ''
    if (q.type === 'radio') return typeof answer === 'string' && answer !== ''
    return answer !== null && answer !== ''
  })
  // Функция для безопасного получения строковых значений
  const getStringValue = (id: string): string => {
    const value = answers[id]
    return typeof value === 'string' ? value : ''
  }

  return (
    <div className="questionnaire-page">
      <h2>Психологический опросник</h2>

      {/* Блок личных данных */}
      <div className="personal-info-section">
        <h3>Основная информация</h3>
        {personalQuestions.map((question) => {
          switch (question.type) {
            case 'text':
              return (
                <TextQuestion
                  key={question.id}
                  question={question.question}
                  value={getStringValue(question.id)}
                  onChange={(value) => handleAnswerChange(question.id, value)}
                />
              )
            case 'date':
              return (
                <DateQuestion
                  key={question.id}
                  question={question.question}
                  value={getStringValue(question.id)}
                  onChange={(value) => handleAnswerChange(question.id, value)}
                />
              )
            case 'radio':
              return (
                <RadioQuestion
                  key={question.id}
                  question={question.question}
                  options={question.options || []}
                  value={getStringValue(question.id)}
                  onChange={(value) => handleAnswerChange(question.id, value)}
                />
              )
            default:
              return null
          }
        })}
      </div>

      {/* Блоки с вопросами по разделам */}
      {[1, 2, 3, 4].map((section) => (
        <div key={section} className="question-section">
          <h3>Раздел {section}</h3>
          <div className="questions-grid">
            {sectionQuestions
              .filter((q) => q.id.startsWith(`q${section}_`))
              .map((question) => (
                <RatingQuestion
                  key={question.id}
                  question={question.question}
                  value={(answers[question.id] as string | null) || null}
                  onChange={(value) => handleAnswerChange(question.id, value)}
                />
              ))}
          </div>
        </div>
      ))}

      {/* Блок эмоционального состояния */}
      {emotionalQuestion && (
        <div className="emotional-section">
          <h3>Эмоциональное состояние</h3>
          <EmojiQuestion
            question={emotionalQuestion.question}
            value={getStringValue(emotionalQuestion.id)}
            onChange={(value) =>
              handleAnswerChange(emotionalQuestion.id, value)
            }
          />
        </div>
      )}

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
