import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import AllRoutes from './AllRoutes'

function App() {

  return (
    <>
      <div className='w-full min-h-screen bg-[#ebf8ff] bg-opacity-75 relative App'>
        <BrowserRouter >
          <Navbar />
          <AllRoutes />
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
