import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import TodoContainer from './components/TodoContainer'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <div className='px-10 lg:px-6'>
        <h1 className='tab:text-4xl text-2xl text-[gray] text-center font-medium tab:py-8 pt-6 pb-4 bg-white'>Get Things Done!</h1>
        <Header />
        <TodoContainer />
        <Toaster  position="top-right" toastOptions={{
          style: {
            fontSize: '1.3rem',
          }
        }} />
    </div>
  )
}

export default App
