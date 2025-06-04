import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UploadState {
  taskId: string | null
  loading: boolean
  error: string | null
}

const initialState: UploadState = {
  taskId: null,
  loading: false,
  error: null,
}

const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    uploadStart(state) {
      state.loading = true
      state.error = null
    },
    uploadSuccess(state, action: PayloadAction<string>) {
      state.loading = false
      state.taskId = action.payload
    },
    uploadFailure(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const { uploadStart, uploadSuccess, uploadFailure } = uploadSlice.actions
export default uploadSlice.reducer
