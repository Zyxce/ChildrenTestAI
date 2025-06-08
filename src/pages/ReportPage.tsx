// src/pages/ReportPage.tsx
import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { useNavigate } from 'react-router-dom'
import { resetUploadState } from '../store/uploadSlice'
import { Document, Page, pdfjs } from 'react-pdf'
import style from '../styles/pages/ReportPage.module.css'
import { useMediaQuery } from 'react-responsive'
import { VscLoading } from 'react-icons/vsc'
import { useReportStatusPolling } from '../hooks/useReportStatusPolling'
import { usePdfLoader } from '../hooks/usePdfLoader'
import { useResponsiveContainer } from '../hooks/useResponsiveContainer'

pdfjs.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.min.js`

const API_BASE_URL = 'https://sirius-draw-test-94500a1b4a2f.herokuapp.com'

export const ReportPage: React.FC = () => {
  const taskId = useSelector((state: RootState) => state.upload.taskId)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [numPages, setNumPages] = useState<number>(0)

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

  return (
    <div className={style.page} ref={containerRef}>
      <div className={style.progress}>
        <div className={style.completed}></div>
        <div className={style.noCompleted}></div>
      </div>
      <div className={style.pageWrapper}>
        <h1 className={style.pageTitle}>Ваш отчёт</h1>

        {status === 'processing' && !errorMessage && (
          <div className={style.processСontainer}>
            <p className={style.analysisText}>Анализ в процессе...</p>
            <VscLoading className={style.icon} />
          </div>
        )}

        {status === 'ready' && (
          <>
            {(loadingPdf || !pdfUrl) && (
              <div className={style.processСontainer}>
                <p className={style.analysisText}>Загрузка документа...</p>
                <VscLoading className={style.icon} />
              </div>
            )}

            {pdfUrl && !loadingPdf && (
              <Document
                file={pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={null}
                error={<p>Не удалось отобразить PDF.</p>}
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

            {pdfUrl && !loadingPdf && (
              <div className={style.downloadBtn}>
                <a
                  href={`${API_BASE_URL}/report/${taskId}`}
                  download={`psychology_report_${taskId}.pdf`}
                  className={style.btnSubmitDefault}
                >
                  Скачать PDF
                </a>
              </div>
            )}
          </>
        )}

        {(status === 'error' || pdfError) && (
          <div className={style.errorContainer}>
            <p className={style.errorMessage}>
              {errorMessage || pdfError || 'Произошла неизвестная ошибка'}
            </p>
            <button onClick={handleReset} className={style.btnSubmitDefault}>
              Начать новый тест
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
