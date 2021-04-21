import Message from './Message';
import Participant from './Participant'

export default interface Discussion {
  _id: string
  name: string
  participants: Array<Participant>
  me: Participant
  messages: Array<Message>
}