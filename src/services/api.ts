// src/services/api.ts
import { TaskIdResponse } from '../types'

const API_BASE_URL = 'https://sirius-draw-test-94500a1b4a2f.herokuapp.com'

export const uploadPhotos = async (
  formData: FormData
): Promise<TaskIdResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error('Upload failed:', error)
    throw error
  }
}
