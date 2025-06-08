import { useState, useEffect } from 'react'

export const usePdfLoader = (
  status: 'processing' | 'ready' | 'error',
  taskId: string | null
) => {
  const [pdfUrl, setPdfUrl] = useState('')
  const [loadingPdf, setLoadingPdf] = useState(false)
  const [pdfError, setPdfError] = useState<string | null>(null)

  useEffect(() => {
    if (status !== 'ready' || !taskId) return

    const loadPdf = async () => {
      try {
        setLoadingPdf(true)
        const response = await fetch(`/report/${taskId}`)

        if (
          !response.headers.get('Content-Type')?.includes('application/pdf')
        ) {
          throw new Error('Received non-PDF content')
        }

        const blob = await response.blob()
        setPdfUrl(URL.createObjectURL(blob))
      } catch (err) {
        setPdfError(
          'Failed to load PDF: ' +
            (err instanceof Error ? err.message : 'Unknown error')
        )
      } finally {
        setLoadingPdf(false)
      }
    }

    loadPdf()
  }, [status, taskId])

  // Cleanup
  useEffect(() => {
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl)
      }
    }
  }, [pdfUrl])

  return { pdfUrl, loadingPdf, pdfError }
}
