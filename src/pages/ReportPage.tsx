import React, { useEffect, useState, useCallback, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { getReportStatus } from '../services/api'
import { useNavigate } from 'react-router-dom'
import { resetUploadState } from '../store/uploadSlice'
import { Document, Page, pdfjs } from 'react-pdf'
import style from '../styles/pages/ReportPage.module.css'

// Воркер из public
pdfjs.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.min.js`

const API_BASE_URL = 'https://sirius-draw-test-94500a1b4a2f.herokuapp.com'

export const ReportPage: React.FC = () => {
  const taskId = useSelector((state: RootState) => state.upload.taskId)
  const [status, setStatus] = useState<'processing' | 'ready' | 'error'>(
    'processing'
  )
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [numPages, setNumPages] = useState<number>(0)
  const [pdfUrl, setPdfUrl] = useState<string>('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Контейнер для измерения ширины
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState<number>(600)

  // Подгоняем ширину под контейнер
  useEffect(() => {
    const updateWidth = () => {
      const w = containerRef.current?.offsetWidth
      if (w) setContainerWidth(w)
    }
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  // Проверка наличия taskId
  useEffect(() => {
    if (!taskId) {
      setErrorMessage('Task ID не найден. Пожалуйста, начните тест заново.')
      setStatus('error')
    }
  }, [taskId])

  // Таймаут на 5 минут
  useEffect(() => {
    const timer = setTimeout(() => {
      if (status === 'processing') {
        setErrorMessage(
          'Отчет готовится дольше обычного. Пожалуйста, попробуйте позже.'
        )
        setStatus('error')
      }
    }, 300000)
    return () => clearTimeout(timer)
  }, [status])

  // Опрашиваем статус обработки
  const fetchStatus = useCallback(async () => {
    try {
      const res = await getReportStatus(taskId!)
      if (res.status === 'ready') {
        setStatus('ready')
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Ошибка при получении статуса')
      setStatus('error')
    }
  }, [taskId])

  useEffect(() => {
    if (status !== 'processing') return
    fetchStatus()
    const id = setInterval(fetchStatus, 15000)
    return () => clearInterval(id)
  }, [fetchStatus, status])

  // Как только готов, загружаем PDF как Blob
  useEffect(() => {
    if (status !== 'ready' || !taskId) return

    fetch(`/report/${taskId}`)
      .then((res) => {
        const ct = res.headers.get('Content-Type') || ''
        if (!ct.includes('application/pdf')) {
          throw new Error('Пришел не PDF, а HTML')
        }
        return res.blob()
      })
      .then((blob) => {
        setPdfUrl(URL.createObjectURL(blob))
      })
      .catch((err) => {
        setErrorMessage('Не удалось загрузить PDF: ' + err.message)
        setStatus('error')
      })
  }, [status, taskId])

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
  }

  const handleReset = () => {
    dispatch(resetUploadState())
    navigate('/')
  }

  return (
    <div className={style.page} ref={containerRef}>
      <h1 className="text-2xl font-semibold mb-6">Ваш отчёт</h1>

      {status === 'processing' && !errorMessage && (
        <div className="text-center py-10">
          <div className="animate-spin inline-block mb-4">
            <svg className="w-12 h-12" viewBox="0 0 50 50">
              <circle
                className="opacity-25"
                cx="25"
                cy="25"
                r="20"
                stroke="currentColor"
                strokeWidth="5"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M25 5a20 20 0 1 0 20 20"
              />
            </svg>
          </div>
          <p className="text-lg">Анализ в процессе...</p>
        </div>
      )}

      {status === 'ready' && (
        <>
          {!pdfUrl && <p>Загрузка документа...</p>}

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

          <div className="flex gap-4 mt-4">
            <a
              href={`${API_BASE_URL}/report/${taskId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Открыть в новой вкладке
            </a>
            <a
              href={`${API_BASE_URL}/report/${taskId}`}
              download={`psychology_report_${taskId}.pdf`}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
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
  )
}
