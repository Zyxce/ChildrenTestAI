import { handleApiError, extractApiError } from '../apiErrorHandler'

describe('apiErrorHandler', () => {
  test('handleApiError returns error message', () => {
    const error = new Error('Test error')
    expect(handleApiError(error)).toBe('Test error')
  })

  test('handleApiError returns string for string input', () => {
    expect(handleApiError('String error')).toBe('String error')
  })

  test('handleApiError returns default for unknown', () => {
    expect(handleApiError(null)).toBe('Неизвестная ошибка')
  })

  test('extractApiError returns detail from response', async () => {
    const response = {
      json: jest.fn().mockResolvedValue({ detail: 'Detailed error' }),
      status: 400,
      statusText: 'Bad Request',
    } as any

    const error = await extractApiError(response)
    expect(error).toBe('Detailed error')
  })

  test('extractApiError returns status when parsing fails', async () => {
    const response = {
      json: jest.fn().mockRejectedValue(new Error('Parse error')),
      status: 500,
      statusText: 'Server Error',
    } as any

    const error = await extractApiError(response)
    expect(error).toBe('Ошибка 500: Server Error')
  })
})
