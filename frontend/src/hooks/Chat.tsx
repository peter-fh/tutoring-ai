import { useState } from 'react'
import './Chat.css'
import { useGlobalState } from '../GlobalState'
import { Message, newMessage } from '../types/message'

const APIEndpoint = '/question'



function Chat() {
  const [message, setMessage] = useState('')
  const {question, course, detailLevel} = useGlobalState()
  const { 
    conversation, 
    addMessage,  
  } = useGlobalState()
  const messages: string[] = []


  async function ask(conversation: Message[]) {
    const request = new Request(APIEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Course': course,
        'Brevity': detailLevel,
        'Type': question
      },
      body: JSON.stringify(conversation)
    })
    const start_time = performance.now()
    const response = await fetch(request)
    const reader = response.body!.getReader()
    const decoder = new TextDecoder('utf-8')
    var answer = ""

    while (true) {
      const {value, done} = await reader.read()
      if (done) {
        break
      }

      const chunk = decoder.decode(value, { stream: true})
      answer += chunk
    }

    const end_time = performance.now()
    console.log(`Response took ${(end_time - start_time) / 1000}`)

    return answer
  }

  const handleSendMessage = async () => {
    const fullConversation = [...conversation, newMessage(message, "user")]
    fullConversation.push(newMessage(message, "user"))
    messages.push(message)
    const aiMessagePromise = ask(fullConversation)
    const aiMessage = await aiMessagePromise

    messages.push(aiMessage)

    addMessage(newMessage(message, "user"))

    addMessage(newMessage(aiMessage, "assitant"))
    console.log(messages)
  }

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
          <button  className="send-button" onClick={handleSendMessage}>Ask</button>
        </div>
        <div className="chat-background"/>
      </div>
    </>
  )
}


export default Chat
