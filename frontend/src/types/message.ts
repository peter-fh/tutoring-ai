type MessageContent = {
  type: 'text'
  text: string
}

export type Message = {
  role: string
  content: MessageContent[]
}

export function newMessage(content: string, role: string) {
  const messageContent: MessageContent = {
    type: "text",
    text: content
  }
  return {
    role: role,
    content: [messageContent]
  }
}
