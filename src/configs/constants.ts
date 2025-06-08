export const UPLOAD_FIELDS = [
  { id: 'house-tree-person', label: 'Дом, дерево, человек' },
  { id: 'imaginary-animal', label: 'Несуществующее животное' },
  { id: 'self-portrait', label: 'Автопортрет' },
] as const

export const EMOJI_OPTIONS = [
  { value: 'Хорошее', label: 'Хорошее', emoji: '😊' },
  { value: 'Удовлетворительное', label: 'Удовлетворительное', emoji: '😐' },
  { value: 'Плохое', label: 'Плохое', emoji: '😢' },
  { value: 'Раздраженное', label: 'Раздраженное', emoji: '😠' },
  { value: 'Уставшее', label: 'Уставшее', emoji: '😴' },
] as const

export const RADIO_OPTIONS_MAP: Record<string, string> = {
  '1': 'Очень редко',
  '2': 'Редко',
  '3': 'Иногда',
  '4': 'Часто',
  '5': 'Всегда',
}

export const API_BASE_URL =
  'https://sirius-draw-test-94500a1b4a2f.herokuapp.com'

export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

export const VALID_FILE_TYPES = ['image/jpeg', 'image/png', 'image/jpg']
