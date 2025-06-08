import { z } from 'zod'
import { Question, Section } from '../types'

// Базовые схемы для разных типов вопросов
export const ratingSchema = z.enum(['1', '2', '3', '4', '5'])
export const emojiSchema = z.enum([
  'Хорошее',
  'Удовлетворительное',
  'Плохое',
  'Раздраженное',
  'Уставшее',
])

// Обновленная схема для текста с проверкой на русские символы
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

// Схема для отдельного вопроса
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

  // Добавляем проверку обязательности
  if (question.required) {
    return schema.refine(
      (value) => value !== undefined && value !== '' && value !== null,
      { message: 'Обязательное поле' }
    )
  }

  return schema.optional()
}

// Схема для всей анкеты
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
