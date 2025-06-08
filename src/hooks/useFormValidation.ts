import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { surveySchema, SurveyFormData } from '../validation/schemas'
import { Section } from '../types'
import { useMemo } from 'react'

export const useSurveyForm = (sections: Section[]) => {
  const schema = useMemo(() => surveySchema(sections), [sections])

  return useForm<SurveyFormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: sections.reduce((acc, section) => {
      section.fields.forEach((field) => {
        acc[field.id] =
          field.type === 'text' || field.type === 'textarea' ? '' : null
      })
      return acc
    }, {} as SurveyFormData),
  })
}
