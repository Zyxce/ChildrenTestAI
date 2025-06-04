// src/store/uploadSlice.ts
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
    // Изменён тип параметра
    try {
      const formData = new FormData()

      // Используем правильные имена полей согласно API
      formData.append('house_tree_person', files['house-tree-person'])
      formData.append('imaginary_animal', files['imaginary-animal'])
      formData.append('self_portrait', files['self-portrait'])

      return await uploadPhotos(formData)
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
