// src/utils/fileValidation.ts
export const validateFile = (file: File): string | null => {
  const validTypes = ['image/jpeg', 'image/png', 'image/jpg']

  if (!validTypes.includes(file.type)) {
    return 'Пожалуйста, загружайте только JPG/PNG изображения'
  }

  if (file.size > 5 * 1024 * 1024) {
    return 'Файл слишком большой. Максимальный размер: 5MB'
  }

  return null
}

export const getFilePreview = (file: File): string => {
  return URL.createObjectURL(file)
}
