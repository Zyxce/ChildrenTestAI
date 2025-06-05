import '../styles/components/App.css'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from '../Routes'
import { Provider } from 'react-redux'
import store from '../store'

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <AppRoutes />
        </div>
      </BrowserRouter>
    </Provider>
  )
}

export default App
