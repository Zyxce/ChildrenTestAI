import { useState, useEffect, useCallback } from 'react'
import { getReportStatus } from '../services/api'

export const useReportStatusPolling = (taskId: string | null) => {
  const [status, setStatus] = useState<'processing' | 'ready' | 'error'>(
    'processing'
  )
  const [errorMessage, setErrorMessage] = useState('')

  const fetchStatus = useCallback(async () => {
    if (!taskId) return

    try {
      const res = await getReportStatus(taskId)
      if (res.status === 'ready') setStatus('ready')
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Unknown error')
      setStatus('error')
    }
  }, [taskId])

  useEffect(() => {
    if (status !== 'processing') return

    fetchStatus()
    const intervalId = setInterval(fetchStatus, 15000)
    return () => clearInterval(intervalId)
  }, [fetchStatus, status])

  // Таймаут обработки
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (status === 'processing') {
        setErrorMessage(
          'Формирование отчета занимает больше времени, чем обычно'
        )
        setStatus('error')
      }
    }, 300000)

    return () => clearTimeout(timeoutId)
  }, [status])

  return { status, errorMessage, setStatus, setErrorMessage }
}
