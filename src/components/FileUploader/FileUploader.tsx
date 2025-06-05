// src/components/FileUploader.tsx
import React, { useState, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import FileUploadField from './FileUploadField'
import { uploadFiles } from '../../store/uploadSlice'
import type { RootState, AppDispatch } from '../../store'
import { handleApiError } from '../../services/api'
import attentionIcon from '../../assets/images/attention.svg'
import style from '../../styles/components/FileUploader/FileUploader.module.css'

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
  const [uploadError, setUploadError] = useState<string | null>(null) // Добавляем состояние ошибки
  const { loading, error } = useSelector((state: RootState) => state.upload)
  const [isSuccess, setIsSuccess] = useState(false)

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

    const filesToSend = {
      'house-tree-person': files['house-tree-person']!.file,
      'imaginary-animal': files['imaginary-animal']!.file,
      'self-portrait': files['self-portrait']!.file,
    }

    try {
      await dispatch(uploadFiles(filesToSend)).unwrap()
      navigate('/survey')
      setIsSuccess(true)
      setTimeout(() => navigate('/survey'), 1500)
    } catch (err) {
      const errorMessage = handleApiError(err)
      setUploadError(errorMessage)
    }
  }, [dispatch, files, navigate, allFilesUploaded])
  return (
    <div className={style.uploaderContainer}>
      <div className={style.uploaderTop}>
        <h2 className={style.uploaderTitle}>Загрузите фотографии рисунков</h2>
        <div className={style.uploaderAttention}>
          <img src={attentionIcon} alt={'Attention'}></img>
          <p>
            Допустимые форматы файлов: jpg, jpeg, png, pdf. Размер не более 5 Мб
          </p>
        </div>
      </div>

      {UPLOAD_FIELDS.map((field) => (
        <FileUploadField
          key={field.id}
          label={field.label}
          previewUrl={files[field.id]?.preview}
          onFileChange={(file) => handleFileChange(field.id, file)}
          onRemove={() => handleRemove(field.id)}
        />
      ))}

      {uploadError && (
        <p className="mt-2 text-sm text-red-600">
          Ошибка загрузки: {uploadError}
        </p>
      )}
      {isSuccess && (
        <div className="success-message">
          Фото успешно загружены! Переходим к опросу...
        </div>
      )}

      <div className={style.uploaderBottom}>
        <p>Шаг 1/3</p>
        <button
          onClick={handleSubmit}
          disabled={!allFilesUploaded || loading}
          className={
            !allFilesUploaded || loading ? style.btnMuted : style.btnDefault
          }
        >
          Далее
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12H19M19 12L13 6M19 12L13 18"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default FileUploader
