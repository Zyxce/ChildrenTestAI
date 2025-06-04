import React, { useCallback } from 'react'

interface FileUploadFieldProps {
  label: string
  previewUrl?: string
  onFileChange: (file: File) => void
  onRemove: () => void
}

const FileUploadField: React.FC<FileUploadFieldProps> = ({
  label,
  previewUrl,
  onFileChange,
  onRemove,
}) => {
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0]

        // Валидация типа файла
        if (!file.type.match('image/jpeg|image/png|image/jpg')) {
          alert('Пожалуйста, загружайте только JPG/PNG изображения')
          return
        }

        // Валидация размера файла (макс 5MB)
        if (file.size > 5 * 1024 * 1024) {
          alert('Файл слишком большой. Максимальный размер: 5MB')
          return
        }

        onFileChange(file)
      }
    },
    [onFileChange]
  )

  return (
    <div className="file-upload-field">
      <label className="field-label">{label}</label>

      <div className="preview-container">
        {previewUrl ? (
          <>
            <img src={previewUrl} alt="Preview" className="preview-image" />
            <button type="button" onClick={onRemove} className="remove-button">
              ×
            </button>
          </>
        ) : (
          <div className="upload-placeholder">
            <span>+ Загрузить фото</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input"
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default FileUploadField
