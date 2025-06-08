import { z } from 'zod'
import { Question, Section } from '../types' // Добавляем импорт типов

// Базовые схемы для разных типов вопросов
export const ratingSchema = z.enum(['1', '2', '3', '4', '5'])
export const emojiSchema = z.enum([
  'Хорошее',
  'Удовлетворительное',
  'Плохое',
  'Раздраженное',
  'Уставшее',
])
export const textSchema = z.string().min(1, 'Обязательное поле')
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
  switch (question.type) {
    case 'rating':
      return ratingSchema
    case 'emoji':
      return emojiSchema
    case 'text':
    case 'textarea':
      return textSchema
    case 'date':
      return dateSchema
    case 'radio':
      return radioSchema
    default:
      return z.any()
  }
}

// Схема для всей анкеты
export const surveySchema = (sections: Section[]) => {
  const shape: Record<string, z.ZodTypeAny> = {}

  sections.forEach((section) => {
    section.fields.forEach((field) => {
      shape[field.id] = field.required
        ? questionSchema(field)
        : questionSchema(field).optional()
    })
  })

  return z.object(shape)
}

export type SurveyFormData = z.infer<ReturnType<typeof surveySchema>>
