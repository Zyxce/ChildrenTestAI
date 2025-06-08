import { http, HttpResponse } from 'msw'

export const handlers = [
  http.post('/upload', () => {
    return HttpResponse.json({ task_id: 'mock-task-id' })
  }),

  http.post('/submit-survey', () => {
    return new HttpResponse(null, { status: 200 })
  }),

  http.get('/report/:taskId', () => {
    return new HttpResponse('mock-pdf-content', {
      headers: {
        'Content-Type': 'application/pdf',
      },
    })
  }),
]
