// src/services/api.ts
import { TaskIdResponse, Answers, ReportStatus } from '../types'

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

// ... остальной код ...
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
        task_id: taskId, // Ключ изменен на task_id
        survey: answers,
      }),
    })

    if (!response.ok) {
      let errorMessage = `Ошибка ${response.status}: ${response.statusText}`
      try {
        const errorData = await response.json()
        console.error('Детали ошибки сервера:', errorData) // Добавлено логирование
        if (errorData.detail) {
          errorMessage = errorData.detail
        } else if (errorData.message) {
          errorMessage = errorData.message
        }
      } catch (e) {
        console.error('Ошибка парсинга JSON:', e)
      }
      throw new Error(errorMessage)
    }
  } catch (error) {
    console.error('Полная ошибка API:', error) // Добавлено логирование
    throw new Error(handleApiError(error))
  }
}

// В src/services/api.ts обновите getReportStatus:
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

export const handleApiError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message
  }
  return 'Неизвестная ошибка'
}
