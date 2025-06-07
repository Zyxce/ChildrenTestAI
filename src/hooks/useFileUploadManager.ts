// src/hooks/useFileUploadManager.ts
import { useCallback, useEffect, useMemo, useState } from 'react'

type FileEntry = { file: File; preview: string }
type FilesState = Record<string, FileEntry | null>

export const useFileUploadManager = (
  fields: ReadonlyArray<{ id: string; label: string }>
) => {
  const [files, setFiles] = useState<FilesState>(() =>
    fields.reduce((acc, field) => ({ ...acc, [field.id]: null }), {})
  )

  const handleFileChange = useCallback((fieldId: string, file: File) => {
    const preview = URL.createObjectURL(file)
    setFiles((prev) => ({ ...prev, [fieldId]: { file, preview } }))
  }, [])

  const handleRemove = useCallback((fieldId: string) => {
    setFiles((prev) => {
      const prevFile = prev[fieldId]
      if (prevFile?.preview) URL.revokeObjectURL(prevFile.preview)
      return { ...prev, [fieldId]: null }
    })
  }, [])

  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      Object.values(files).forEach((file) => {
        if (file?.preview) URL.revokeObjectURL(file.preview)
      })
    }
  }, [files])

  const allFilesUploaded = useMemo(
    () => Object.values(files).every((file) => file !== null),
    [files]
  )

  return {
    files,
    handleFileChange,
    handleRemove,
    allFilesUploaded,
  }
}
