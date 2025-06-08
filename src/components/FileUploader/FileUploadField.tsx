import React, { useCallback } from 'react'
import uploadPhotoIcon from '../../assets/images/uploadPhotos.svg'
import removePhotoIcon from '../../assets/images/removePhotos.svg'
import style from '../../styles/components/FileUploader/FileUploadField.module.css'
import { validateFile } from '../../utils/fileValidation'

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

        const error = validateFile(file)
        if (error) {
          alert(error)
          return
        }

        onFileChange(file)
      }
    },
    [onFileChange]
  )

  return (
    <div className={style.fieldContaner}>
      {previewUrl ? (
        <div className={style.uploadContainer}>
          <img src={previewUrl} alt="Preview" className={style.previewImage} />
          <div className={style.inputContainer}>
            <input
              type="file"
              accept="image/*"
              onClick={(e) => (e.currentTarget.value = '')}
              onChange={handleFileChange}
              className={style.inputField}
            />
            <img src={removePhotoIcon} alt={'remove'} onClick={onRemove} />
          </div>
        </div>
      ) : (
        <div className={style.uploadContainer}>
          <div className={style.inputContainer}>
            <input
              type="file"
              accept="image/*"
              onClick={(e) => (e.currentTarget.value = '')}
              onChange={handleFileChange}
              className={style.inputField}
            />
            <img src={uploadPhotoIcon} alt={'upload'} />
          </div>
        </div>
      )}
      <p className={style.fieldLabel}>{label}</p>
    </div>
  )
}

export default FileUploadField
