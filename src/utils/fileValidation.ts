export const validateFile = (file: File): string | null => {
  const validTypes = ['image/jpeg', 'image/png', 'image/jpg']

  if (!validTypes.includes(file.type)) {
    return 'Please upload only JPG/PNG images'
  }

  if (file.size > 5 * 1024 * 1024) {
    return 'File is too large. Max size: 5MB'
  }

  return null
}

export const getFilePreview = (file: File): string => {
  return URL.createObjectURL(file)
}
