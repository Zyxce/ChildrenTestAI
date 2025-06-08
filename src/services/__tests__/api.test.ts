import { setupServer } from 'msw/node'
import { uploadPhotos, submitSurvey, getReportStatus } from '../api'
import { handlers } from '../../mocks/handlers'

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('api', () => {
  test('uploadPhotos returns task id', async () => {
    const files = [new File(['content'], 'drawing1.png', { type: 'image/png' })]

    const result = await uploadPhotos(files)
    expect(result).toEqual({ task_id: 'mock-task-id' })
  })

  test('submitSurvey succeeds', async () => {
    await expect(
      submitSurvey('task123', { q1: 'answer' })
    ).resolves.not.toThrow()
  })

  test('getReportStatus returns ready status', async () => {
    const result = await getReportStatus('task123')
    expect(result.status).toBe('ready')
  })
})
