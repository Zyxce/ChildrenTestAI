import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'util'

global.TransformStream = class {
  constructor() {
    throw new Error('TransformStream is not implemented in this environment')
  }
} as any

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder as any

if (typeof window.URL.createObjectURL === 'undefined') {
  Object.defineProperty(window.URL, 'createObjectURL', {
    value: jest.fn(),
  })
}
