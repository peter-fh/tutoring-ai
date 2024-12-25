import { useState } from 'react'
import './Chat.css'
import { useGlobalState } from '../GlobalState'
import { Message, newMessage } from '../types/message'
import MathTeX from './MarkTeX'

const APIEndpoint = '/question'



function Chat() {
  const [message, setMessage] = useState('')
  const {question, course, detailLevel} = useGlobalState()
  const { 
    conversation, 
    addMessage,  
  } = useGlobalState()
  const [messages, setMessages] = useState<string[]>([])
  const [aiMessage, setAiMessage] = useState('')


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
    console.log("Starting request")
    console.log(conversation)
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
      console.log(chunk)
      setAiMessage(answer)
    }
    setAiMessage('')

    const end_time = performance.now()
    console.log(`Response took ${(end_time - start_time) / 1000}`)

    return answer
  }

  const handleSendMessage = async () => {
    const fullConversation = [...conversation, newMessage(message, "user")]
    setMessages([...messages!, message])
    const aiMessagePromise = ask(fullConversation)
    const aiMessage = await aiMessagePromise
    setMessages([...messages!, message, aiMessage])

    addMessage(newMessage(message, "user"))
    addMessage(newMessage(aiMessage, "assistant"))
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
        {messages && messages.map((message, index) => (
          <span key={index}className="output">
            <MathTeX content={message}/>
          </span>
        ))}
        {aiMessage != '' && (
          <span key={-1}className="output">
            <MathTeX content={aiMessage}/>
          </span>
        )}
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
