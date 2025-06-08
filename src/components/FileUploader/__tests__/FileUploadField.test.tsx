import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import FileUploadField from '../FileUploadField'

describe('FileUploadField', () => {
  const onFileChange = jest.fn()
  const onRemove = jest.fn()

  test('renders without preview', () => {
    render(
      <FileUploadField
        label="Test Field"
        onFileChange={onFileChange}
        onRemove={onRemove}
      />
    )

    expect(screen.getByText('Test Field')).toBeInTheDocument()
    expect(screen.getByAltText('upload')).toBeInTheDocument()
  })

  test('renders with preview', () => {
    render(
      <FileUploadField
        label="Test Field"
        previewUrl="preview-url"
        onFileChange={onFileChange}
        onRemove={onRemove}
      />
    )

    expect(screen.getByAltText('Preview')).toHaveAttribute('src', 'preview-url')
    expect(screen.getByAltText('remove')).toBeInTheDocument()
  })

  test('triggers file change', () => {
    render(
      <FileUploadField
        label="Test Field"
        onFileChange={onFileChange}
        onRemove={onRemove}
      />
    )

    const file = new File(['content'], 'file.png', { type: 'image/png' })
    const input = screen.getByTestId('file-input')

    fireEvent.change(input, { target: { files: [file] } })
    expect(onFileChange).toHaveBeenCalledWith(file)
  })

  test('triggers remove', () => {
    render(
      <FileUploadField
        label="Test Field"
        previewUrl="preview-url"
        onFileChange={onFileChange}
        onRemove={onRemove}
      />
    )

    fireEvent.click(screen.getByAltText('remove'))
    expect(onRemove).toHaveBeenCalled()
  })
})
