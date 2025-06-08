import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { useEffect } from 'react'

export const useTaskIdGuard = (redirectPath = '/upload') => {
  const navigate = useNavigate()
  const location = useLocation() // Используем хук для получения location
  const taskId = useSelector((state: RootState) => state.upload.taskId)

  useEffect(() => {
    if (!taskId) {
      navigate(redirectPath, {
        replace: true,
        state: { from: location.pathname }, // Используем location из хука
      })
    }
  }, [taskId, navigate, redirectPath, location]) // Добавляем location в зависимости

  return taskId
}
