import React from 'react'
import FileUploader from '../components/FileUploader/FileUploader'
import style from '../styles/pages/UploadPhotosPage.module.css'

const UploadPhotosPage: React.FC = () => {
  return (
    <div className={style.page}>
      <div className={style.progress}>
        <div className={style.completed}></div>
        <div className={style.noCompleted}></div>
      </div>
      <div className={style.pageWrapper}>
        <FileUploader />
      </div>
    </div>
  )
}

export default UploadPhotosPage
