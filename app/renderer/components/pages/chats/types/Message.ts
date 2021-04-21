export default interface Message {
  _id: string
  content: string
  contentType: 'text' | 'file' | 'emoji'
  sender: string
  reply?: string
  date?: Date
};