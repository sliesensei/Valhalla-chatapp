import socketio from "socket.io-client";


class Socket {
  private socket;
  constructor() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.socket = socketio('http://127.0.0.1:8080', {
        query: {
          id: userId
        }
      })
    } else {
      console.log(userId)
    }
  }
  disconnect() {
    this.socket?.disconnect();
  }

  signin(userId?: string) {
    this.socket?.emit('signin', userId)
  }
  send(roomId: string, message: string) {
    const token = localStorage.getItem('userToken');
    this.socket?.emit('message', token, roomId, message)
  }

  onMessage(cb: (...args: any[]) => void) {
    this.socket?.on('message', cb);
  }

  offMessage(cb: (...args: any[]) => void) {
    this.socket?.off('message', cb);
  }

  onInvite(cb: (...args: any[]) => void) {
    this.socket?.on('invite', cb);
  }

  offInvite(cb: (...args: any[]) => void) {
    this.socket?.off('invite', cb);
  }
}

let socket: Socket = new Socket();


export default function useSocket() {

  return socket;
}