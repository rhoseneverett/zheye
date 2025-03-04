import { h, render } from 'vue'
import Message from './Message.vue'
type MessageType = 'success' | 'error' | 'default'

const createMessage = (message: string, type: MessageType, timeout = 2000) => {
  const messageVnode = h(Message, {
    message,
    type
  })
  const mountNode = document.createElement('div')
  document.body.appendChild(mountNode)
  render(messageVnode, mountNode)
  const destory = () => {
    render(null, mountNode)
    document.body.removeChild(mountNode)
  }
  if (timeout) {
    setTimeout(() => {
      destory()
    }, timeout)
  }
}

export default createMessage
