import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { submitSurvey } from '../services/api'
import { Section, Question } from '../types'
import QuestionContainer from '../components/Questions/QuestionContainer'
import rawQuestionsData from '../data/questions.json'
import style from '../styles/pages/QuestionnairePage.module.css'

const questionsData = rawQuestionsData as { sections: Section[] }

const QuestionnairePage: React.FC = () => {
  const navigate = useNavigate()
  const { taskId } = useSelector((state: RootState) => state.upload)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

      const transformAnswers = (answers: Record<string, any>) => {
        const transformed: Record<string, string> = {}

        // Маппинг текстовых ответов на числовые значения
        const radioOptionsMap: Record<string, string> = {
          'Очень редко': '1',
          Редко: '2',
          Иногда: '3',
          Часто: '4',
          Всегда: '5',
        }

        Object.entries(answers).forEach(([key, value]) => {
          // Для вопросов q1_, q2_, q3_ преобразуем текст в число
          if (
            key.startsWith('q1_') ||
            key.startsWith('q2_') ||
            key.startsWith('q3_')
          ) {
            transformed[key] = radioOptionsMap[value] || value.toString()
          }
          // Для остальных полей обычное преобразование
          else {
            transformed[key] = value?.toString() || ''
          }
        })

        // Специальные преобразования
        if (answers.childGender) {
          transformed.childGender =
            answers.childGender === 'Мальчик' ? 'male' : 'female'
        }

        // Удаляем неиспользуемые текстовые поля
        delete transformed.developmentNotes
        delete transformed.strengths
        delete transformed.areasForDevelopment
        delete transformed.consultedSpecialists

        return transformed
      }

      await submitSurvey(taskId, transformAnswers(answers))
      navigate('/report')
    } catch (err) {
      console.error('Ошибка при отправке ответов:', err)
      setError('Ошибка при отправке ответов. Пожалуйста, попробуйте снова.')
    } finally {
      setIsSubmitting(false)
    }
  }

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
    <div className={style.page}>
      <div className={style.progress}>
        <div className={style.completed}></div>
        <div className={style.noCompleted}></div>
      </div>
      <div className={style.pageWrapper}>
        {sections.map((section, index) => (
          <div key={`section-${index}`} className={style.questionSection}>
            <h3 className={style.sectionTitle}>{section.title}</h3>
            <div className={style.questionsContainer}>
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

        <button onClick={() => navigate('/upload')} className={style.backBtn}>
          К загрузке рисунков
        </button>

        <button
          onClick={handleSubmit}
          disabled={!allRequiredAnswered || isSubmitting}
          className={`submit-btn ${
            !allRequiredAnswered || isSubmitting ? 'disabled' : ''
          }`}
        >
          Узнать результаты
        </button>
      </div>
    </div>
  )
}

export default QuestionnairePage
