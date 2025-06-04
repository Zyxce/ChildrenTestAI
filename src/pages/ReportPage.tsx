// src/pages/ReportPage.tsx
import React, { useEffect, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { getReportStatus, ReportResponse } from '../services/api'

// Переименовали, чтобы не путать с интерфейсом из API:
type LoadingStatus = 'processing' | 'ready' | 'error'

export const ReportPage: React.FC = () => {
  const taskId = useSelector((state: RootState) => state.upload.taskId)
  const [status, setStatus] = useState<LoadingStatus>('processing')
  const [reportUrl, setReportUrl] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const fetchStatus = useCallback(async () => {
    if (!taskId) {
      setErrorMessage(
        'Task ID не найден. Пожалуйста, пройдите загрузку фотографий заново.'
      )
      setStatus('error')
      return
    }
    try {
      const res: ReportResponse = await getReportStatus(taskId)
      if (res.status === 'processing') {
        setStatus('processing')
      } else if (res.status === 'ready') {
        setStatus('ready')
        if (res.url) {
          setReportUrl(res.url)
        } else {
          setErrorMessage('Ссылка на отчёт не пришла от сервера.')
          setStatus('error')
        }
      }
    } catch (err: any) {
      console.error(err)
      setErrorMessage(err.message || 'Ошибка при получении статуса отчёта')
      setStatus('error')
    }
  }, [taskId])

  useEffect(() => {
    fetchStatus()
    const interval = setInterval(fetchStatus, 15000)
    return () => clearInterval(interval)
  }, [fetchStatus])

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
        <div className="space-y-4">
          <p className="text-green-600">Отчёт готов!</p>
          <a
            href={reportUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Просмотреть отчет
          </a>
          <a
            href={reportUrl}
            download={`report_${taskId}.pdf`}
            className="block px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Скачать отчет
          </a>
        </div>
      )}

      {status === 'error' && (
        <div className="text-red-600">
          <p>Произошла ошибка:</p>
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  )
}
