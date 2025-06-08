// src/pages/ReportPage.tsx
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { useNavigate } from 'react-router-dom'
import { resetUploadState } from '../store/uploadSlice'
import { Document, Page, pdfjs } from 'react-pdf'
import style from '../styles/pages/ReportPage.module.css'
import { VscLoading } from 'react-icons/vsc'
import { useReportStatusPolling } from '../hooks/useReportStatusPolling'
import { usePdfLoader } from '../hooks/usePdfLoader'
import { useResponsiveContainer } from '../hooks/useResponsiveContainer'
import { MdErrorOutline } from 'react-icons/md'
import { IoReload } from 'react-icons/io5'
import { GoDownload } from 'react-icons/go'
import { FaCopy } from 'react-icons/fa'

pdfjs.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.min.js`

const API_BASE_URL = 'https://sirius-draw-test-94500a1b4a2f.herokuapp.com'

export const ReportPage: React.FC = () => {
  const taskId = useSelector((state: RootState) => state.upload.taskId)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [numPages, setNumPages] = useState<number>(0)
  const [isCopied, setIsCopied] = useState<boolean>(false)

  const { status, errorMessage } = useReportStatusPolling(taskId)
  const { pdfUrl, loadingPdf, pdfError } = usePdfLoader(status, taskId)
  const { containerRef, containerWidth } = useResponsiveContainer()

  const handleReset = () => {
    dispatch(resetUploadState())
    navigate('/')
  }
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
  }

  const copyReportLink = () => {
    const reportLink = `${API_BASE_URL}/report/${taskId}`
    navigator.clipboard
      .writeText(reportLink)
      .then(() => {
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000) // Сбрасываем статус через 2 секунды
      })
      .catch((err) => {
        console.error('Ошибка при копировании: ', err)
      })
  }

  const pageClasses = `${style.page} ${
    status === 'error' || pdfError ? style.pageError : ''
  } ${status === 'processing' && !errorMessage ? style.pageAnalysis : ''}
  ${(status === 'ready' && loadingPdf) || !pdfUrl ? style.pageAnalysis : ''}`

  return (
    <div className={pageClasses} ref={containerRef}>
      <div className={style.progress}>
        <div className={style.completed}></div>
        <div className={style.noCompleted}></div>
      </div>
      <div className={style.pageWrapper}>
        {status === 'processing' && !errorMessage && (
          <div className={style.processСontainer}>
            <VscLoading className={style.iconTop} />
            <p className={style.analysisText}>Анализ в процессе...</p>
            <VscLoading className={style.icon} />
          </div>
        )}
        {status === 'ready' && (loadingPdf || !pdfUrl) && (
          <div className={style.processСontainer}>
            <VscLoading className={style.iconTop} />
            <p className={style.analysisText}>Загрузка документа...</p>
            <VscLoading className={style.icon} />
          </div>
        )}

        {status === 'ready' && (
          <div className={style.reportContainer}>
            <h1 className={style.pageTitle}>Ваш отчёт</h1>
            <div className={style.reportDocumentContainer}>
              {pdfUrl && !loadingPdf && (
                <Document
                  file={pdfUrl}
                  onLoadSuccess={onDocumentLoadSuccess}
                  loading={null}
                  error={
                    <p style={{ color: 'red', display: 'flex' }}>
                      <MdErrorOutline />
                      Не удалось отобразить PDF.
                    </p>
                  }
                >
                  {Array.from({ length: numPages }).map((_, i) => (
                    <Page
                      key={i}
                      pageNumber={i + 1}
                      width={containerWidth}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                      className="mb-4"
                    />
                  ))}
                </Document>
              )}
            </div>

            {pdfUrl && !loadingPdf && (
              <div className={style.btnContainer}>
                <div className={style.btnDownloadContainer}>
                  <a
                    href={`${API_BASE_URL}/report/${taskId}`}
                    download={`psychology_report_${taskId}.pdf`}
                    className={style.btnDownload}
                  >
                    Скачать PDF
                    <GoDownload className={style.icon} />
                  </a>
                </div>
                {isCopied ? (
                  <button
                    onClick={copyReportLink}
                    className={style.btnCopied}
                    disabled={isCopied}
                  >
                    Скопировано!
                  </button>
                ) : (
                  <button
                    onClick={copyReportLink}
                    className={style.btnCopy}
                    disabled={isCopied}
                  >
                    Копировать ссылку
                    <FaCopy className={style.icon} />
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {(status === 'error' || pdfError) && (
          <div className={style.errorContainer}>
            <p className={style.errorMessage}>
              <MdErrorOutline className={style.icon} />
              {errorMessage || pdfError || 'Произошла неизвестная ошибка'}
            </p>
            <button onClick={handleReset} className={style.btnReload}>
              Начать новый тест <IoReload className={style.icon} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
