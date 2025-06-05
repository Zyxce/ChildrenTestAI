import React, { useEffect, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { useDispatch } from 'react-redux'
import { resetUploadState } from '../store/uploadSlice'
import { getReportStatus } from '../services/api'
import { useNavigate } from 'react-router-dom'

// Константа с базовым URL API
const API_BASE_URL = 'https://sirius-draw-test-94500a1b4a2f.herokuapp.com'

export const ReportPage: React.FC = () => {
  const taskId = useSelector((state: RootState) => state.upload.taskId)
  const [status, setStatus] = useState<'processing' | 'ready' | 'error'>(
    'processing'
  )
  const [errorMessage, setErrorMessage] = useState<string>('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [contentType, setContentType] = useState<string>('')
  const [longProcessing, setLongProcessing] = useState(false)

  // Формируем URL для PDF отчёта
  const reportUrl = taskId ? `${API_BASE_URL}/report/${taskId}` : ''

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (status === 'processing') {
        setErrorMessage(
          'Отчет готовится дольше обычного. Пожалуйста, попробуйте позже.'
        )
        setStatus('error')
      }
    }, 300000) // 5 минут

    return () => clearTimeout(timeoutId)
  }, [status])

  useEffect(() => {
    if (status === 'ready' && reportUrl) {
      // Проверяем тип контента
      fetch(reportUrl, { method: 'HEAD' })
        .then((res) => {
          setContentType(res.headers.get('content-type') || '')
        })
        .catch(console.error)
    }
  }, [status, reportUrl])

  useEffect(() => {
    const longTimer = setTimeout(() => {
      if (status === 'processing') {
        setLongProcessing(true)
      }
    }, 300000) // 5 минут

    return () => clearTimeout(longTimer)
  }, [status])

  const fetchStatus = useCallback(async () => {
    if (!taskId) {
      setErrorMessage('Task ID не найден. Пожалуйста, начните тест заново.')
      setStatus('error')
      return
    }

    try {
      const res = await getReportStatus(taskId)

      if (res.status === 'processing') {
        setStatus('processing')
      } else if (res.status === 'ready') {
        setStatus('ready')
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Ошибка при получении статуса')
      setStatus('error')
    }
  }, [taskId])

  useEffect(() => {
    fetchStatus()
    const interval = setInterval(fetchStatus, 15000)
    return () => clearInterval(interval)
  }, [fetchStatus])

  const handleReset = () => {
    dispatch(resetUploadState())
    navigate('/')
  }

  return (
    <div className="max-w-xl mx-auto p-4">
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

      {status === 'ready' && reportUrl && (
        <div className="report-actions flex flex-col gap-4">
          {status === 'ready' && reportUrl && (
            <div>
              {contentType.includes('application/pdf') ? (
                <iframe
                  src={`https://docs.google.com/gview?url=${encodeURIComponent(
                    reportUrl
                  )}&embedded=true`}
                  className="w-full h-[500px]"
                  frameBorder="0"
                />
              ) : (
                <div className="text-center py-6">
                  <p>Отчет готов, но формат не поддерживается для просмотра</p>
                  <a
                    href={reportUrl}
                    download
                    className="px-4 py-2 bg-blue-500 text-white rounded mt-4 inline-block"
                  >
                    Скачать отчет
                  </a>
                </div>
              )}
            </div>
          )}

          <div className="flex gap-4 mt-4">
            <a
              href={reportUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Открыть в новой вкладке
            </a>
            <a
              href={reportUrl}
              download={`psychology_report_${taskId}.pdf`}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Скачать PDF
            </a>
          </div>
        </div>
      )}

      {status === 'processing' && longProcessing && (
        <div className="text-center py-6">
          <p>Обработка занимает больше времени, чем обычно</p>
          <p>Мы отправим уведомление, когда отчет будет готов</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded mt-4"
          >
            Проверить снова
          </button>
        </div>
      )}

      {(status === 'error' || errorMessage) && (
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
