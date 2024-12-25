// import { useState } from 'react'
import './App.css'
import Modal from './hooks/Modal'
import Sidebar from './hooks/Sidebar'
import Chat from './hooks/Chat'
import { MathJaxContext } from 'better-react-mathjax'

function App() {

  return (
    <>
      <MathJaxContext>
        <Modal/>
        <Sidebar/>
        <Chat/>
      </MathJaxContext>
    </>
  )
}

export default App
