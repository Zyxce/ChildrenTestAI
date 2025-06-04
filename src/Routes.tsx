// src/Routes.tsx
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import UploadPhotosPage from './pages/UploadPhotosPage'
import QuestionnairePage from './pages/QuestionnairePage' // Создадим позже
import WelcomePage from './pages/WelcomePage' // Создадим позже
import { ReportPage } from './pages/ReportPage' // Создадим позже
import { AuthRoute } from './components/AuthRoute'
import Layout from './components/Layout'

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/upload" element={<UploadPhotosPage />} />
        <Route
          path="/survey"
          element={
            <AuthRoute>
              <QuestionnairePage />
            </AuthRoute>
          }
        />
        <Route
          path="/report"
          element={
            <AuthRoute>
              <ReportPage />
            </AuthRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
