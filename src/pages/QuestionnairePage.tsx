// src/pages/QuestionnairePage.tsx
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RootState } from '../store'
import { submitSurvey } from '../services/api'
import { Section, Question } from '../types'
import { useAnswerTransformer } from '../hooks/useAnswerTransformer'
import { surveySchema, SurveyFormData } from '../validation/schemas'
import QuestionContainer from '../components/Questions/QuestionContainer'
import rawQuestionsData from '../data/questions.json'
import style from '../styles/pages/QuestionnairePage.module.css'
import handIcon from '../assets/images/hand.svg'
import flagIcon from '../assets/images/flag.svg'

const questionsData = rawQuestionsData as { sections: Section[] }

const QuestionnairePage: React.FC = () => {
  const navigate = useNavigate()
  const { taskId } = useSelector((state: RootState) => state.upload)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const transformAnswers = useAnswerTransformer()

  const [sections] = useState<Section[]>(questionsData.sections)
  const firstSection = sections[0]
  const otherSections = sections.slice(1)

  // Инициализация формы с валидацией
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<SurveyFormData>({
    resolver: zodResolver(surveySchema(sections)),
    mode: 'onChange',
    defaultValues: sections.reduce((acc, section) => {
      section.fields.forEach((field) => {
        acc[field.id] =
          field.type === 'text' || field.type === 'textarea' ? '' : null
      })
      return acc
    }, {} as SurveyFormData),
  })

  useEffect(() => {
    if (!taskId) {
      navigate('/upload')
    }
  }, [taskId, navigate])

  const onSubmit: SubmitHandler<SurveyFormData> = async (data) => {
    if (!taskId) {
      setError(
        'Отсутствует идентификатор задачи. Пожалуйста, начните тест заново.'
      )
      return
    }

    try {
      setIsSubmitting(true)

      // Преобразуем ответы в нужный формат
      const transformed = transformAnswers(data)

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

  return (
    <div className={style.page}>
      <div className={style.progress}>
        <div className={style.completed}></div>
        <div className={style.noCompleted}></div>
      </div>
      <div className={style.pageWrapper}>
        {/* Первая секция */}
        <div className={style.firstSection}>
          <h3 className={style.sectionTitle}>{firstSection.title}</h3>
          <div className={style.questionsContainer}>
            {firstSection.fields.map((field) => (
              <div
                key={`question-${field.id}`}
                className={style.questionWrapper}
              >
                <Controller
                  name={field.id}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <QuestionContainer
                      question={field}
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
                {errors[field.id] && (
                  <p className={style.errorMessage}>
                    {errors[field.id]?.message?.toString()}
                  </p>
                )}
              </div>
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
                <div
                  key={`question-${field.id}`}
                  className={style.questionWrapper}
                >
                  <Controller
                    name={field.id}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <QuestionContainer
                        question={field}
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                  {errors[field.id] && (
                    <p className={style.errorMessage}>
                      {errors[field.id]?.message?.toString()}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {error && <div className={style.errorMessage}>{error}</div>}

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
              onClick={handleSubmit(onSubmit)}
              disabled={!isValid || isSubmitting || !isDirty}
              className={` ${style.btnSubmit} ${
                !isValid || isSubmitting || !isDirty
                  ? style.btnSubmitMuted
                  : style.btnSubmitDefault
              }`}
            >
              {isSubmitting ? 'Отправка...' : 'Узнать результаты'}
            </button>
            <p className={style.stepMobile}>Шаг 2/3</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuestionnairePage
