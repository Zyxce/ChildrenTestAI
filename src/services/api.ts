// src/services/api.ts
import { TaskIdResponse, SurveySubmission, ReportStatus } from '../types'

const API_BASE_URL = 'https://sirius-draw-test-94500a1b4a2f.herokuapp.com'

export const uploadPhotos = async (
  formData: FormData
): Promise<TaskIdResponse> => {
  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new Error(`Ошибка загрузки: ${response.status}`)
  }

  return response.json()
}

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
): Promise<ReportStatus> => {
  const response = await fetch(`${API_BASE_URL}/report/${taskId}`)

  if (!response.ok) {
    throw new Error(`Ошибка получения статуса: ${response.status}`)
  }

  return response.json()
}
