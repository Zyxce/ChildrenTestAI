// src/types.ts
export interface Question {
  id: string
  type: 'rating' | 'emoji' | 'text' | 'date' | 'radio'
  question: string
  required?: boolean
  options?: string[] // Для radio вопросов
}

export type AnswerValue = string | null

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
