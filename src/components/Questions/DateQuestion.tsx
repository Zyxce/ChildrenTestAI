import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import '../../styles/components/Questions/DateQuestion.css'
import style from '../../styles/components/Questions/DateQuestion.module.css'

interface DateQuestionProps {
  question: string
  value: string
  onChange: (value: string) => void
  hasError?: boolean
  errorMessage?: string
}

const DateQuestion: React.FC<DateQuestionProps> = ({
  question,
  value,
  onChange,
  hasError = false,
  errorMessage,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    value ? new Date(value) : null
  )

  return (
    <div
      className={`${style.questionContainer} ${
        hasError ? style.containerError : ''
      }`}
    >
      <h3 className={style.questionTitle}>{question}</h3>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => {
          setSelectedDate(date)
          onChange(date ? date.toISOString().split('T')[0] : '')
        }}
        dateFormat="dd.MM.yyyy"
        className={`custom-datepicker ${
          selectedDate ? 'custom-datepicker-selected' : ''
        } ${hasError ? 'custom-datepicker-error' : ''}`}
        placeholderText="дд.мм.гггг"
      />
      {hasError && errorMessage && (
        <p className={style.errorMessage}>{errorMessage}</p>
      )}
    </div>
  )
}

export default DateQuestion
