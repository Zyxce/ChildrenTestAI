import { Answers } from '../types'

export const transformAnswers = (answers: Answers): Answers => {
  const radioMap: Record<string, string> = {
    'Очень редко': '1',
    Редко: '2',
    Иногда: '3',
    Часто: '4',
    Всегда: '5',
  }

  return Object.entries(answers).reduce((acc, [key, value]) => {
    if (
      key.startsWith('q1_') ||
      key.startsWith('q2_') ||
      key.startsWith('q3_')
    ) {
      acc[key] = radioMap[value as string] || value
    } else if (key === 'childGender') {
      acc[key] = value === 'Мальчик' ? 'male' : 'female'
    } else {
      acc[key] = value?.toString() || ''
    }
    return acc
  }, {} as Answers)
}
