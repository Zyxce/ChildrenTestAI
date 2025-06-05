// src/pages/ReportPage.tsx
import React, { useEffect, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { useDispatch } from 'react-redux'
import { resetUploadState } from '../store/uploadSlice'
import { getReportStatus, ReportResponse } from '../services/api'
import { useNavigate } from 'react-router-dom'

// Переименовали, чтобы не путать с интерфейсом из API:
type LoadingStatus = 'processing' | 'ready' | 'error'

export const ReportPage: React.FC = () => {
  const taskId = useSelector((state: RootState) => state.upload.taskId)
  const [status, setStatus] = useState<LoadingStatus>('processing')
  const [reportUrl, setReportUrl] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

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

  const fetchStatus = useCallback(async () => {
    if (!taskId) {
      setErrorMessage('Task ID не найден. Пожалуйста, начните тест заново.')
      setStatus('error')
      return
    }

    try {
      const res = await getReportStatus(taskId)

      // Исправлено: используем status и pdf_url из ответа
      if (res.status === 'processing') {
        setStatus('processing')
      } else if (res.status === 'ready') {
        setStatus('ready')
        if (res.pdf_url) {
          // Исправлено: pdf_url вместо url
          setReportUrl(res.pdf_url)
        } else {
          setErrorMessage('Ссылка на отчёт недоступна')
          setStatus('error')
        }
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
        <div className="report-actions">
          <a
            href={reportUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="view-report-btn"
          >
            Просмотреть отчет
          </a>
          <a
            href={reportUrl}
            download={`psychology_report_${taskId}.pdf`}
            className="download-report-btn"
          >
            Скачать отчет
          </a>
        </div>
      )}

      {(status === 'error' || status === 'ready') && (
        <button
          onClick={handleReset}
          className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Начать новый тест
        </button>
      )}
    </div>
  )
}
