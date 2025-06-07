import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { submitSurvey } from '../services/api'
import { Section, Question } from '../types'
import { useAnswerTransformer } from '../hooks/useAnswerTransformer' // Добавляем импорт хука
import QuestionContainer from '../components/Questions/QuestionContainer'
import rawQuestionsData from '../data/questions.json'
import style from '../styles/pages/QuestionnairePage.module.css'
import handIcon from '../assets/images/hand.svg'
import flagIcon from '../assets/images/flag.svg'

const questionsData = rawQuestionsData as { sections: Section[] }

const QuestionnairePage: React.FC = () => {
  const navigate = useNavigate()
  const { taskId } = useSelector((state: RootState) => state.upload)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  //хук для трансформации данных
  const transformAnswers = useAnswerTransformer()

  const [sections] = useState<Section[]>(questionsData.sections)

  // Выделяем первую секцию отдельно
  const firstSection = sections[0]
  // Остальные секции
  const otherSections = sections.slice(1)

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

      // Используем хук для преобразования ответов
      const transformed = transformAnswers(answers)

      // Удаляем неиспользуемые текстовые поля
      delete transformed.developmentNotes
      delete transformed.strengths
      delete transformed.areasForDevelopment
      delete transformed.consultedSpecialists

      await submitSurvey(taskId, transformed)
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
        {/* Отдельный блок для первой секции */}
        <div className={style.firstSection}>
          <h3 className={style.sectionTitle}>{firstSection.title}</h3>
          <div className={style.questionsContainer}>
            {firstSection.fields.map((field) => (
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
          <div className={style.attention}>
            <div className={style.attentionTop}>
              <img src={handIcon} alt={'hand'} className={style.handIcon}></img>
              <p className={style.attentionText}>
                Пожалуйста, внимательно прочитайте каждый вопрос и выберите
                наиболее подходящий вариант ответа, отражающий поведение и
                эмоциональное состояние вашего ребенка в течение последних 2-4
                недель. Отвечайте максимально честно и искренне, так как от
                этого зависит точность оценки психоэмоционального развития
                Вашего ребенка.
              </p>
            </div>
            <div className={style.attentionBottom}>
              <img src={flagIcon} alt={'flag'} className={style.flagIcon}></img>
              <p className={style.attentionText}>
                Все вопросы обязательны к заполнению
              </p>
            </div>
          </div>
        </div>

        {/* Остальные секции */}
        {otherSections.map((section, index) => (
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

        <div className={style.pageBottom}>
          <p className={style.stepDesktop}>Шаг 2/3</p>
          <div className={style.buttonsContainer}>
            <button
              onClick={() => navigate('/upload')}
              className={style.backBtn}
            >
              К загрузке рисунков
            </button>

            <button
              onClick={handleSubmit}
              disabled={!allRequiredAnswered || isSubmitting}
              className={` ${
                !allRequiredAnswered || isSubmitting
                  ? style.btnSubmitMuted
                  : style.btnSubmitDefault
              }`}
            >
              Узнать результаты
            </button>
            <p className={style.stepMobile}>Шаг 2/3</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuestionnairePage
