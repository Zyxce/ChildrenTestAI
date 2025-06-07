// src/hooks/useAnswerTransformer.ts
import { useCallback } from 'react'

export const useAnswerTransformer = () => {
  return useCallback((answers: Record<string, any>) => {
    const radioMap: Record<string, string> = {
      'Очень редко': '1',
      Редко: '2',
      Иногда: '3',
      Часто: '4',
      Всегда: '5',
    }

    return Object.entries(answers).reduce((acc, [key, value]) => {
      // Преобразование радио-кнопок в числовые значения
      if (
        key.startsWith('q1_') ||
        key.startsWith('q2_') ||
        key.startsWith('q3_')
      ) {
        acc[key] = radioMap[value] || value
      }
      // Преобразование пола
      else if (key === 'childGender') {
        acc[key] = value === 'Мальчик' ? 'male' : 'female'
      }
      // Остальные поля
      else {
        acc[key] = value?.toString() || ''
      }
      return acc
    }, {} as Record<string, string>)
  }, [])
}
