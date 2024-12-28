import { useEffect, useRef, useState } from 'react'
import './Chat.css'
import { useGlobalState } from '../GlobalState'
import { Message, newMessage } from '../types/message'
import MarkTeX from './MarkTeX'
import imageCompression from 'browser-image-compression'

const APIEndpoint = '/question'
const IntroEndpoint = '/introduction'
const ImageEndpoint = '/image'



function Chat() {
  const { 
    conversation, 
    addMessage,  
    chatLoaded,
  } = useGlobalState()
  const [message, setMessage] = useState('')
  const {question, course, detailLevel} = useGlobalState()
  const [messages, setMessages] = useState<string[]>([])
  const [aiMessage, setAiMessage] = useState('')
  const [lock, setLock] = useState(false)
  const [file, setFile] = useState('')
  const [image, setImage] = useState('')

  async function intro() {
    setLock(true)
    const request = new Request(IntroEndpoint, {
      method: 'GET'
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

    setMessages([answer])
    const end_time = performance.now()
    console.log(`Response took ${(end_time - start_time) / 1000}`)
    setLock(false)
  }

  async function readImage(image: string) {

    const request = new Request(ImageEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: String(image),
    })
    const response = await fetch(request)
    const reader = response.body!.getReader()
    const decoder = new TextDecoder('utf-8')

    const {value} = await reader.read()

    const transcription = decoder.decode(value, { stream: true})

    return transcription
  }

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
      setLock(true)
      const fileName = file
      setFile('')

      var current_message = message
      if (image) {
        current_message += `\n\n*[uploaded ${fileName}]*`
      }

      var json_message: any = newMessage(message, "user")
      const fullConversation = [...conversation, json_message]

      setMessages([...messages!, current_message])
      setMessage("")

      var image_transcription = ""
      if (image) {
        setAiMessage("*Transcribing Image...*")
        image_transcription = await readImage(image)
        fullConversation.push(newMessage(image_transcription, 'user'))
        setAiMessage("")
      }

      console.log("IMAGE TRANSCRIPTION:\n", image_transcription)


      const aiMessagePromise = ask(fullConversation)
      const aiMessage = await aiMessagePromise

      setMessages([...messages!, current_message, aiMessage])
      addMessage(newMessage(message, "user"))
      if (image) {
        addMessage(newMessage(image_transcription, 'user'))
      } 
      addMessage(newMessage(aiMessage, "assistant"))

      setImage('')
      setLock(false)
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

  useEffect(() => {
    if (chatLoaded){
      intro()
    }
  }, [chatLoaded])


  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileButtonClick = () => {
    fileInputRef!.current!.click()
  }

const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const img = event.target.files?.[0];
    if (img) {
      setFile(img.name)
      const options = {
        maxSizeMB: 0.1,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      }

      const compressedFile = await imageCompression(img, options);
      console.log(`Transcribing ${compressedFile.size / 1024 / 1024}MB file`);
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader!.result!.toString())
      }
      reader.readAsDataURL(compressedFile)
    }
  };

  return (
    <>
      <div className="chat">
        <h1 className="title">MAT AI Assistant</h1>
        <div className="messages">
          {messages && messages.map((message, index) => (
            <span key={index}className={index % 2 == 1 ? "question" : "output"}>
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
              style={{backgroundColor: file !== "" ? "#114444" : "#1d1d1d"}}
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
