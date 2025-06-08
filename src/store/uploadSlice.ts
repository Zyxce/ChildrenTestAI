import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { uploadPhotos } from '../services/api'

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

export const uploadFiles = createAsyncThunk(
  'upload/uploadFiles',
  async (
    files: {
      'house-tree-person': File
      'imaginary-animal': File
      'self-portrait': File
    },
    { rejectWithValue }
  ) => {
    try {
      //преобразование обьекта в массив
      const filesArray = [
        files['house-tree-person'],
        files['imaginary-animal'],
        files['self-portrait'],
      ]

      return await uploadPhotos(filesArray)
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      }
      return rejectWithValue('Unknown error')
    }
  }
)

const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    resetUploadState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadFiles.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(uploadFiles.fulfilled, (state, action) => {
        state.loading = false
        state.taskId = action.payload.task_id
      })
      .addCase(uploadFiles.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { resetUploadState } = uploadSlice.actions
export default uploadSlice.reducer
