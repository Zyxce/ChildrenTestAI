import '../styles/components/App.css'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from '../Routes'
import { Provider } from 'react-redux'
import FloatingBubbles from './FloatingBubles'
import store from '../store'

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div className="App">
          <FloatingBubbles />
          <AppRoutes />
        </div>
      </BrowserRouter>
    </Provider>
  )
}

export default App
