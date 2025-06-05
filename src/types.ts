// src/types.ts

// Тип для шкалы рейтинговых вопросов
export interface QuestionScale {
  min: number
  max: number
}

// Все возможные типы вопросов
export type QuestionType =
  | 'rating'
  | 'emoji'
  | 'text'
  | 'date'
  | 'radio'
  | 'textarea'

// Основной интерфейс для вопроса
export interface Question {
  id: string
  type: QuestionType
  question: string
  required?: boolean
  options?: string[] // Для вопросов типа 'radio'
  scale?: QuestionScale // Для вопросов типа 'rating'
  rows?: number // Для вопросов типа 'textarea'
}

// Интерфейс для раздела анкеты
export interface Section {
  title: string
  fields: Question[]
}

// Тип для значения ответа
export type AnswerValue = string | null

// Интерфейс для коллекции ответов
export interface Answers {
  [key: string]: AnswerValue
}

// Типы для API
export type TaskIdResponse = {
  task_id: string
}

export type SurveySubmission = {
  taskId: string
  survey: Answers
}

export type ReportStatus = {
  status: 'processing' | 'ready' | 'error'
  pdf_url?: string
}
