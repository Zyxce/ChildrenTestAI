import { renderHook, act } from '@testing-library/react'
import { useFileUploadManager } from '../useFileUploadManager'

const fields = [
  { id: 'field1', label: 'Field 1' },
  { id: 'field2', label: 'Field 2' },
]

describe('useFileUploadManager', () => {
  beforeAll(() => {
    // Мокаем URL.createObjectURL
    global.URL.createObjectURL = jest.fn(() => 'mock-url')
  })

  afterEach(() => {
    // Очищаем все моки после каждого теста
    jest.clearAllMocks()
  })

  test('initializes with empty files', () => {
    const { result } = renderHook(() => useFileUploadManager(fields))
    expect(result.current.files).toEqual({
      field1: null,
      field2: null,
    })
  })

  test('handles file change', () => {
    const { result } = renderHook(() => useFileUploadManager(fields))
    const file = new File(['content'], 'file.png', { type: 'image/png' })

    act(() => {
      result.current.handleFileChange('field1', file)
    })

    expect(result.current.files.field1).toEqual({
      file,
      preview: 'mock-url',
    })
    expect(URL.createObjectURL).toHaveBeenCalledWith(file)
  })

  test('handles file removal', () => {
    const { result } = renderHook(() => useFileUploadManager(fields))
    const file = new File(['content'], 'file.png', { type: 'image/png' })

    act(() => {
      result.current.handleFileChange('field1', file)
    })

    act(() => {
      result.current.handleRemove('field1')
    })

    expect(result.current.files.field1).toBeNull()
  })

  test('checks if all files are uploaded', () => {
    const { result } = renderHook(() => useFileUploadManager(fields))
    const file = new File(['content'], 'file.png', { type: 'image/png' })

    expect(result.current.allFilesUploaded).toBe(false)

    act(() => {
      result.current.handleFileChange('field1', file)
      result.current.handleFileChange('field2', file)
    })

    expect(result.current.allFilesUploaded).toBe(true)
  })
})
