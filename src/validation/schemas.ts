import { z } from 'zod'
import { Question, Section } from '../types'

// схемы базовые для разных вопрос
export const ratingSchema = z.enum(['1', '2', '3', '4', '5'])
export const emojiSchema = z.enum([
  'Хорошее',
  'Удовлетворительное',
  'Плохое',
  'Раздраженное',
  'Уставшее',
])

// схема для текстового инпута
export const textSchema = z
  .string()
  .refine((value) => /^[а-яёА-ЯЁ]*$/.test(value), {
    message: 'Только русские буквы без символов и знаков',
  })

export const dateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Неверный формат даты')
export const radioSchema = z.enum([
  '1',
  '2',
  '3',
  '4',
  '5',
  'Мальчик',
  'Девочка',
])

// С схема для отдельных вопросов
export const questionSchema = (question: Question) => {
  let schema: z.ZodTypeAny

  switch (question.type) {
    case 'rating':
      schema = ratingSchema
      break
    case 'emoji':
      schema = emojiSchema
      break
    case 'text':
    case 'textarea':
      schema = textSchema
      break
    case 'date':
      schema = dateSchema
      break
    case 'radio':
      schema = radioSchema
      break
    default:
      schema = z.any()
  }

  // проверка на рекьюред
  if (question.required) {
    return schema.refine(
      (value) => value !== undefined && value !== '' && value !== null,
      { message: 'Обязательное поле' }
    )
  }

  return schema.optional()
}

// схема для всей анкеты
export const surveySchema = (sections: Section[]) => {
  const shape: Record<string, z.ZodTypeAny> = {}

  sections.forEach((section) => {
    section.fields.forEach((field) => {
      shape[field.id] = questionSchema(field)
    })
  })

  return z.object(shape)
}

export type SurveyFormData = z.infer<ReturnType<typeof surveySchema>>
