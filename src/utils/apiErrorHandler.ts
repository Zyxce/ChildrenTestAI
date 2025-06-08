export const handleApiError = (error: unknown): string => {
  if (error instanceof Error) return error.message
  if (typeof error === 'string') return error
  return 'Unknown error'
}

export const extractApiError = async (response: Response): Promise<string> => {
  try {
    const errorData = await response.json()
    return (
      errorData.detail ||
      errorData.message ||
      `Error ${response.status}: ${response.statusText}`
    )
  } catch (e) {
    return `Error ${response.status}: ${response.statusText}`
  }
}
