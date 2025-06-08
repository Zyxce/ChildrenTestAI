import { validateFile, getFilePreview } from '../fileValidation'

describe('fileValidation', () => {
  const validFile = new File([''], 'test.png', { type: 'image/png' })
  const invalidTypeFile = new File([''], 'test.gif', { type: 'image/gif' })
  const largeFile = new File([new ArrayBuffer(6 * 1024 * 1024)], 'large.png', {
    type: 'image/png',
  })

  test('validateFile returns null for valid file', () => {
    expect(validateFile(validFile)).toBeNull()
  })

  test('validateFile returns error for invalid file type', () => {
    expect(validateFile(invalidTypeFile)).toBe(
      'Пожалуйста, загружайте только JPG/PNG изображения'
    )
  })

  test('validateFile returns error for large file', () => {
    expect(validateFile(largeFile)).toBe(
      'Файл слишком большой. Максимальный размер: 5MB'
    )
  })

  test('getFilePreview returns object URL', () => {
    const mockCreateObjectURL = jest.spyOn(URL, 'createObjectURL')
    mockCreateObjectURL.mockReturnValue('blob:test')

    const preview = getFilePreview(validFile)
    expect(preview).toBe('blob:test')
    expect(mockCreateObjectURL).toHaveBeenCalledWith(validFile)
  })
})
