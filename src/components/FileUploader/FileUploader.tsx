// src/components/FileUploader.tsx
import React, { useState, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import FileUploadField from './FileUploadField'
import { uploadFiles } from '../../store/uploadSlice'
import type { RootState, AppDispatch } from '../../store'
import { handleApiError } from '../../services/api'

// Определяем набор ID-полей строго из константы
const UPLOAD_FIELDS = [
  { id: 'house-tree-person', label: 'Дом/Дерево/Человек' },
  { id: 'imaginary-animal', label: 'Несуществующее животное' },
  { id: 'self-portrait', label: 'Автопортрет' },
] as const

type FieldId = (typeof UPLOAD_FIELDS)[number]['id']

type FileEntry = { file: File; preview: string }
type FilesState = Record<FieldId, FileEntry | null>

const FileUploader: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { loading, error } = useSelector((state: RootState) => state.upload)

  // Инициализируем state с нужными ключами
  const initialFiles: FilesState = UPLOAD_FIELDS.reduce((acc, field) => {
    acc[field.id] = null
    return acc
  }, {} as FilesState)

  const [files, setFiles] = useState<FilesState>(initialFiles)

  const handleFileChange = useCallback((fieldId: FieldId, file: File) => {
    const preview = URL.createObjectURL(file)
    setFiles((prev) => ({ ...prev, [fieldId]: { file, preview } }))
  }, [])

  const handleRemove = useCallback((fieldId: FieldId) => {
    setFiles((prev) => {
      const entry = prev[fieldId]
      if (entry?.preview) {
        URL.revokeObjectURL(entry.preview)
      }
      return { ...prev, [fieldId]: null }
    })
  }, [])

  useEffect(() => {
    return () => {
      // Очистка при размонтировании компонента
      Object.values(files).forEach((fileEntry) => {
        if (fileEntry?.preview) {
          URL.revokeObjectURL(fileEntry.preview)
        }
      })
    }
  }, [files])

  const allFilesUploaded = Object.values(files).every((entry) => entry !== null)

  const handleSubmit = useCallback(async () => {
    if (!allFilesUploaded) return
    const fileList = Object.values(files).map((e) => e!.file)
    try {
      await dispatch(uploadFiles(fileList)).unwrap()
      navigate('/survey')
    } catch (err) {
      const errorMessage = handleApiError(err)
    }
  }, [dispatch, files, navigate, allFilesUploaded])

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Загрузите рисунки</h2>

      {UPLOAD_FIELDS.map((field) => (
        <FileUploadField
          key={field.id}
          label={field.label}
          previewUrl={files[field.id]?.preview}
          onFileChange={(file) => handleFileChange(field.id, file)}
          onRemove={() => handleRemove(field.id)}
        />
      ))}

      {error && (
        <p className="mt-2 text-sm text-red-600">Ошибка загрузки: {error}</p>
      )}

      <button
        onClick={handleSubmit}
        disabled={!allFilesUploaded || loading}
        className={`
          mt-6 w-full py-2 rounded text-white
          ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : allFilesUploaded
              ? 'bg-blue-500 hover:bg-blue-600'
              : 'bg-blue-200 cursor-not-allowed'
          }
        `}
      >
        {loading ? 'Загрузка...' : 'Отправить фото'}
      </button>
    </div>
  )
}

export default FileUploader
