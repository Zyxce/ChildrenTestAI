import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import '../../styles/components/Questions/DateQuestion.css'
import style from '../../styles/components/Questions/DateQuestion.module.css'

interface DateQuestionProps {
  question: string
  value: string
  onChange: (value: string) => void
}

const DateQuestion: React.FC<DateQuestionProps> = ({
  question,
  value,
  onChange,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    value ? new Date(value) : null
  )

  return (
    <div className={style.questionContainer}>
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
        }`}
        placeholderText="дд.мм.гггг"
      />
    </div>
  )
}

export default DateQuestion
