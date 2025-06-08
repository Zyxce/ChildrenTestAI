// src/components/FileUploader/FileUploader.tsx
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import FileUploadField from './FileUploadField'
import { uploadFiles } from '../../store/uploadSlice'
import type { RootState, AppDispatch } from '../../store'
import { handleApiError } from '../../utils/apiErrorHandler'
import attentionIcon from '../../assets/images/attention.svg'
import style from '../../styles/components/FileUploader/FileUploader.module.css'
import { useFileUploadManager } from '../../hooks/useFileUploadManager'
import { UPLOAD_FIELDS } from '../../configs/constants'

const FileUploader: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { loading, error } = useSelector((state: RootState) => state.upload)

  const { files, handleFileChange, handleRemove, allFilesUploaded } =
    useFileUploadManager(UPLOAD_FIELDS)

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
    } catch (err) {
      const errorMessage = handleApiError(err)
      console.error('Upload error:', errorMessage)
    }
  }, [dispatch, files, navigate, allFilesUploaded])

  return (
    <div className={style.uploaderContainer}>
      <div className={style.uploaderTop}>
        <h2 className={style.uploaderTitle}>Загрузите фотографии рисунков</h2>
        <div className={style.uploaderAttention}>
          <img src={attentionIcon} alt={'Attention'} />
          <p>Допустимые форматы файлов: jpg, jpeg, png. Размер не более 5 Мб</p>
        </div>
      </div>

      <div className={style.uploadField}>
        {UPLOAD_FIELDS.map((field) => (
          <FileUploadField
            key={field.id}
            label={field.label}
            previewUrl={files[field.id]?.preview}
            onFileChange={(file) => handleFileChange(field.id, file)}
            onRemove={() => handleRemove(field.id)}
          />
        ))}
      </div>

      {error && <div className={style.errorMessage}>{error}</div>}

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
