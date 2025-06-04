// src/services/api.ts
import { TaskIdResponse, SurveySubmission, ReportStatus } from '../types'

const API_BASE_URL = 'https://sirius-draw-test-94500a1b4a2f.herokuapp.com'
export interface ReportResponse {
  status: 'processing' | 'ready'
  url?: string
}
// ... существующий код ...

export const uploadPhotos = async (
  formData: FormData
): Promise<TaskIdResponse> => {
  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    // Детализация ошибки 422
    if (response.status === 422) {
      try {
        const errorData = await response.json()
        throw new Error(
          errorData.detail || `Validation error: ${JSON.stringify(errorData)}`
        )
      } catch (parseError) {
        throw new Error(`Unprocessable Entity: ${response.statusText}`)
      }
    }
    throw new Error(`Ошибка загрузки: ${response.status}`)
  }

  return response.json()
}

// ... остальной код ...
export const submitSurvey = async (
  taskId: string,
  answers: Record<string, any>
): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/submit-survey`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ taskId, answers }),
  })

  if (!response.ok) {
    throw new Error(`Ошибка отправки опроса: ${response.status}`)
  }
}

export const getReportStatus = async (
  taskId: string
): Promise<ReportResponse> => {
  const response = await fetch(`${API_BASE_URL}/report/${taskId}`)

  if (!response.ok) {
    throw new Error(`Ошибка получения статуса: ${response.status}`)
  }

  return response.json()
}

export const handleApiError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message
  }
  return 'Неизвестная ошибка'
}
