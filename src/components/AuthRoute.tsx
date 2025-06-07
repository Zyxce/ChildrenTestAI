// src/components/AuthRoute.tsx
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { RootState } from '../store'

interface AuthRouteProps {
  children: React.ReactNode
}

export const AuthRoute = ({ children }: AuthRouteProps) => {
  const location = useLocation()
  const { taskId } = useSelector((state: RootState) => state.upload)

  if (!taskId) {
    return <Navigate to="/upload" state={{ from: location }} replace />
  }

  return children
}
