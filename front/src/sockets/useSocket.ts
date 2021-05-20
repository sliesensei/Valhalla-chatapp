import socketio from "socket.io-client";


class Socket {
  private socket;
  constructor() {
    const userId = localStorage.getItem('userId');
    this.socket = socketio('http://127.0.0.1:8080', {
      query: {
        id: userId ?? ''
      }
    })
  }
  signup(payload: any) {
    this.socket.emit('signup', payload)
  }
  send(roomId: string, message: string) {
    const token = localStorage.getItem('userToken');
    this.socket.emit('message', token, roomId, message)
  }

  onMessage(cb: (...args: any[]) => void) {
    this.socket.on('message', cb);
  }

  offMessage(cb: (...args: any[]) => void) {
    this.socket.off('message', cb);
  }
}

let socket: Socket;

export default function useSocket() {
  if (!socket) {
    socket = new Socket()
  }
  return socket;
}