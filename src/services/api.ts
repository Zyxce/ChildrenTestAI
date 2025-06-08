// src/services/api.ts
import { TaskIdResponse, Answers, ReportStatus } from '../types'
import { extractApiError, handleApiError } from '../utils/apiErrorHandler'

const API_BASE_URL = 'https://sirius-draw-test-94500a1b4a2f.herokuapp.com'
export interface ReportResponse {
  status: 'processing' | 'ready'
  url?: string
}
// ... существующий код ...

export const uploadPhotos = async (
  files: File[] // Принимаем массив файлов
): Promise<TaskIdResponse> => {
  try {
    const formData = new FormData()

    // Добавляем все файлы в поле "files"
    files.forEach((file) => {
      formData.append('files', file)
    })

    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(
        errorData.detail || `Ошибка ${response.status}: ${response.statusText}`
      )
    }

    return response.json()
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Ошибка загрузки: ${error.message}`)
    }
    throw new Error('Неизвестная ошибка при загрузке')
  }
}

export const submitSurvey = async (
  taskId: string,
  answers: Answers
): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/submit-survey`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        task_id: taskId,
        survey: answers,
      }),
    })

    if (!response.ok) {
      const errorMessage = await extractApiError(response)
      throw new Error(errorMessage)
    }
  } catch (error) {
    throw new Error(handleApiError(error))
  }
}

export const getReportStatus = async (
  taskId: string
): Promise<ReportStatus> => {
  try {
    const response = await fetch(`${API_BASE_URL}/report/${taskId}`)

    if (!response.ok) {
      if (response.status === 404) {
        return { status: 'processing' }
      }

      const errorText = await response.text()
      throw new Error(`Ошибка ${response.status}: ${errorText}`)
    }

    // Если ответ PDF - считаем готовым
    if (response.headers.get('content-type')?.includes('application/pdf')) {
      return { status: 'ready' }
    }

    return response.json()
  } catch (error) {
    console.error('Ошибка при проверке статуса:', error)
    return { status: 'processing' }
  }
}
