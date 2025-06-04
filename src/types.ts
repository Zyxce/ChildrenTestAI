// Типы для API ответов
export type TaskIdResponse = {
  task_id: string
}

export type FileUploadField = {
  id: string
  label: string
  file: File | null
  previewUrl: string | null
}
