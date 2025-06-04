import React, { useState, useCallback } from 'react'
import FileUploadField from './FileUploadField'

const UPLOAD_FIELDS = [
  { id: 'house-tree-person', label: 'Дом/Дерево/Человек' },
  { id: 'imaginary-animal', label: 'Несуществующее животное' },
  { id: 'self-portrait', label: 'Автопортрет' },
]

const FileUploader: React.FC = () => {
  const [files, setFiles] = useState<
    Record<string, { file: File; preview: string } | null>
  >({
    'house-tree-person': null,
    'imaginary-animal': null,
    'self-portrait': null,
  })

  const handleFileChange = useCallback((fieldId: string, file: File) => {
    const preview = URL.createObjectURL(file)
    setFiles((prev) => ({ ...prev, [fieldId]: { file, preview } }))
  }, [])

  const handleRemove = useCallback((fieldId: string) => {
    setFiles((prev) => {
      if (prev[fieldId]?.preview) {
        URL.revokeObjectURL(prev[fieldId]!.preview)
      }
      return { ...prev, [fieldId]: null }
    })
  }, [])

  const allFilesUploaded = Object.values(files).every((file) => file !== null)

  const handleSubmit = useCallback(() => {
    // Отправка файлов на сервер
    const formData = new FormData()
    Object.entries(files).forEach(([fieldId, fileData]) => {
      if (fileData) {
        formData.append(fieldId, fileData.file)
      }
    })

    // Здесь будет вызов API (реализуем в services/api.ts)
  }, [files])

  return (
    <div className="file-uploader">
      <h2>Загрузите рисунки</h2>

      {UPLOAD_FIELDS.map((field) => (
        <FileUploadField
          key={field.id}
          label={field.label}
          previewUrl={files[field.id]?.preview}
          onFileChange={(file) => handleFileChange(field.id, file)}
          onRemove={() => handleRemove(field.id)}
        />
      ))}

      <button
        color="primary"
        disabled={!allFilesUploaded}
        onClick={handleSubmit}
        className="submit-button"
      >
        Отправить фото
      </button>
    </div>
  )
}

export default FileUploader
