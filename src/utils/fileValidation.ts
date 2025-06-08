import { VALID_FILE_TYPES, MAX_FILE_SIZE } from '../configs/constants'

export const validateFile = (file: File): string | null => {
  if (!VALID_FILE_TYPES.includes(file.type)) {
    return 'Пожалуйста, загружайте только JPG/PNG изображения'
  }

  if (file.size > MAX_FILE_SIZE) {
    return 'Файл слишком большой. Максимальный размер: 5MB'
  }

  return null
}
export const getFilePreview = (file: File): string => {
  return URL.createObjectURL(file)
}
