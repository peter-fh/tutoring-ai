import { useEffect, useRef, useState } from 'react'
import './Chat.css'
import { useGlobalState } from '../GlobalState'
import { Message, newMessage, newMessageWithImage } from '../types/message'
import MarkTeX from './MarkTeX'

const APIEndpoint = '/question'



function Chat() {
  const { 
    conversation, 
    addMessage,  
  } = useGlobalState()
  const [message, setMessage] = useState('')
  const {question, course, detailLevel} = useGlobalState()
  const [messages, setMessages] = useState<string[]>([])
  const [aiMessage, setAiMessage] = useState('')
  const [lock, setLock] = useState(false)
  const [file, setFile] = useState(false)
  const [image, setImage] = useState('')


  async function ask(conversation: Message[]) {
    const request = new Request(APIEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Course': course,
        'Brevity': detailLevel,
        'Type': question,
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
      setAiMessage(answer)
    }
    setAiMessage('')

    const end_time = performance.now()
    console.log(`Response took ${(end_time - start_time) / 1000}`)

    return answer
  }

  const handleSendMessage = async () => {
    if (!lock && (message || image)) {
      var current_message = message
      var json_message: any = newMessage(message, "user")
      if (image) {
        json_message = newMessageWithImage(message, image)
      }
      setLock(true)
      const fullConversation = [...conversation, json_message]
      if (image) {
        fullConversation.push(newMessage(image, "user"))
        current_message += "\n*[uploaded image]*"
      }
      setMessages([...messages!, current_message])
      setMessage("")
      const aiMessagePromise = ask(fullConversation)
      const aiMessage = await aiMessagePromise
      setMessages([...messages!, current_message, aiMessage])
      addMessage(newMessage(message, "user"))
      if (image) {

        addMessage(newMessage(image, "user"))
      } 
      addMessage(newMessage(aiMessage, "assistant"))
      setLock(false)
      setImage('')
      setFile(false)
    } else if (!lock) {
      setMessage("")
    }
  }

  const enterListener = (e: KeyboardEvent) => {
    if (e.key == "Enter") {
      e.preventDefault()
      handleSendMessage()
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", enterListener, false)

    return () => {
      document.removeEventListener("keydown", enterListener, false)
    }
  })


  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileButtonClick = () => {
    fileInputRef!.current!.click()
  }

const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const img = event.target.files?.[0];
    if (img) {
      setFile(true)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader!.result!.toString())
      }
      reader.readAsDataURL(img)
    }
  };

  return (
    <>
      <div className="chat">
        <h1 className="title">MAT AI Assistant</h1>
        <div className="messages">
          <span className="output">
            <p>
              Hello! I'm an AI chatbot powered by Chat-GPT. I use context specific to Concordia to provide
              better explanations. AI makes mistakes, so please double check any answers you are given.
            </p>
          </span>
          {messages && messages.map((message, index) => (
            <span key={index}className={index % 2 == 0 ? "question" : "output"}>
              <MarkTeX content={message}/>
            </span>
          ))}
          {aiMessage != '' && (
            <span key={-1}className="output">
              <MarkTeX content={aiMessage}/>
            </span>
          )}
        </div>
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
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept=".png,.jpg,.jpeg,.gif"
            onChange={handleFileChange}
            />
          <div className="button-container">
            <button 
              className="button" 
              onClick={handleSendMessage}
            >
              <i className="fa-solid fa-arrow-up"/>
            </button>
            <button 
              className="button" 
              onClick={handleFileButtonClick}
              style={{backgroundColor: file === true ? "#114444" : "#1d1d1d"}}
            >
              <i className="fa-solid fa-paperclip"/>
            </button>
          </div>
        </div>
        <div className="chat-background"/>
      </div>
    </>
  )
}


export default Chat
