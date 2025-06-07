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

pdfjs.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.min.js`

const API_BASE_URL = 'https://sirius-draw-test-94500a1b4a2f.herokuapp.com'

export const ReportPage: React.FC = () => {
  const taskId = useSelector((state: RootState) => state.upload.taskId)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [numPages, setNumPages] = useState<number>(0)
  const [pdfUrl, setPdfUrl] = useState<string>('')

  // Destructure all values from the hook including setter functions
  const { status, errorMessage, setStatus, setErrorMessage } =
    useReportStatusPolling(taskId)

  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState<number>(600)

  const isDesktop = useMediaQuery({ minWidth: 1200 })
  const isTablet = useMediaQuery({ minWidth: 641, maxWidth: 1199 })
  const isMobile = useMediaQuery({ maxWidth: 640 })

  useEffect(() => {
    if (isDesktop) setContainerWidth(776)
    else if (isTablet) setContainerWidth(552)
    else if (isMobile) setContainerWidth(264)
  }, [isDesktop, isTablet, isMobile])

  // Handle missing taskId
  useEffect(() => {
    if (!taskId) {
      setErrorMessage('Task ID не найден. Пожалуйста, начните тест заново.')
      setStatus('error')
    }
  }, [taskId, setErrorMessage, setStatus])

  // Load PDF when report is ready
  useEffect(() => {
    if (status !== 'ready' || !taskId) return

    fetch(`/report/${taskId}`)
      .then((res) => {
        if (!res.headers.get('Content-Type')?.includes('application/pdf')) {
          throw new Error('Пришел не PDF, а HTML')
        }
        return res.blob()
      })
      .then((blob) => setPdfUrl(URL.createObjectURL(blob)))
      .catch((err) => {
        setErrorMessage('Не удалось загрузить PDF: ' + err.message)
      })
  }, [status, taskId, setErrorMessage])

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
  }

  const handleReset = () => {
    dispatch(resetUploadState())
    navigate('/')
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
            {!pdfUrl && (
              <div className={style.processСontainer}>
                <p className={style.analysisText}>Загрузка документа...</p>
                <VscLoading className={style.icon} />
              </div>
            )}

            {pdfUrl && (
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

            <div className={style.downloadBtn}>
              <a
                href={`${API_BASE_URL}/report/${taskId}`}
                download={`psychology_report_${taskId}.pdf`}
                className={style.btnSubmitDefault}
              >
                Скачать PDF
              </a>
            </div>
          </>
        )}

        {status === 'error' && (
          <div className="text-center py-6">
            <p className="text-red-500 mb-4">{errorMessage}</p>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Начать новый тест
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
