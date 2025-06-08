// src/utils/apiErrorHandler.ts
export const handleApiError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message
  }
  if (typeof error === 'string') {
    return error
  }
  return 'Неизвестная ошибка'
}

export const extractApiError = async (response: Response): Promise<string> => {
  try {
    const errorData = await response.json()
    return (
      errorData.detail ||
      errorData.message ||
      `Ошибка ${response.status}: ${response.statusText}`
    )
  } catch (e) {
    return `Ошибка ${response.status}: ${response.statusText}`
  }
}
