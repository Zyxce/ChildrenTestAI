// src/Routes.tsx
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import UploadPhotosPage from './pages/UploadPhotosPage'
import QuestionnairePage from './pages/QuestionnairePage' // Создадим позже
import WelcomePage from './pages/WelcomePage' // Создадим позже
import { ReportPage } from './pages/ReportPage' // Создадим позже

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/upload" element={<UploadPhotosPage />} />
      <Route path="/survey" element={<QuestionnairePage />} />
      <Route path="/report" element={<ReportPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRoutes
