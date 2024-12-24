import { useState } from 'react'
import './Chat.css'


function Chat() {
  const [message, setMessage] = useState('')
  const messages: string[] = []


  return (
    <>
      <div className="chat">
        <h1 className="title">MAT AI Assistant</h1>
        <span className="output">
          <p>
            Hello! I'm an AI chatbot powered by Chat-GPT. I use context specific to Concordia to provide
            better explanations. AI makes mistakes, so please double check any answers you are given.
          </p>
        </span>
        {messages.map((message, index) => (
          <span className="output">
            <p key={index}>{message}</p>
          </span>
        ))}
        <div className="input">
          <textarea
            onChange={(event) => {
              setMessage(event.target.value);
            }}
            value={message}
            rows={4} 
            cols={50} 
            placeholder="Enter your message here..."
            className="input-block"
          />
          <button id="sendButton" className="send-button">Ask</button>
        </div>
        <div className="chat-background"/>
      </div>
    </>
  )
}


export default Chat
