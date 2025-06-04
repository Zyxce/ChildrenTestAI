import React from 'react'
import FileUploader from '../components/FileUploader/FileUploader'

const UploadPhotosPage: React.FC = () => {
  return (
    <div className="upload-photos-page">
      <header>{/* Шапка с логотипом и т.д. */}</header>
      <main>
        <FileUploader />
      </main>
      <footer>{/* Подвал */}</footer>
    </div>
  )
}

export default UploadPhotosPage
