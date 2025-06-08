import uploadReducer, { resetUploadState, uploadFiles } from '../uploadSlice'
import { UploadState } from '../uploadSlice'

describe('uploadSlice', () => {
  const initialState: UploadState = {
    taskId: null,
    loading: false,
    error: null,
  }

  test('should handle initial state', () => {
    expect(uploadReducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })

  test('should handle resetUploadState', () => {
    const state = { ...initialState, taskId: '123', error: 'Error' }
    expect(uploadReducer(state, resetUploadState())).toEqual(initialState)
  })

  test('should handle uploadFiles.pending', () => {
    const action = { type: uploadFiles.pending.type }
    const state = uploadReducer(initialState, action)
    expect(state).toEqual({
      taskId: null,
      loading: true,
      error: null,
    })
  })

  test('should handle uploadFiles.fulfilled', () => {
    const payload = { task_id: 'task123' }
    const action = { type: uploadFiles.fulfilled.type, payload }
    const state = uploadReducer(initialState, action)
    expect(state).toEqual({
      taskId: 'task123',
      loading: false,
      error: null,
    })
  })

  test('should handle uploadFiles.rejected', () => {
    const error = 'Upload failed'
    const action = { type: uploadFiles.rejected.type, payload: error }
    const state = uploadReducer(initialState, action)
    expect(state).toEqual({
      taskId: null,
      loading: false,
      error: 'Upload failed',
    })
  })
})
