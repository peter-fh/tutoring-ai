type MessageContent = {
  type: 'text'
  text: string
}

export type Message = {
  role: 'user' | 'assistant' | 'system'
  content: MessageContent[]
}
