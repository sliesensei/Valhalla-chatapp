import connect from 'socket.io-client';

class Socket {
  private socket: SocketIOClient.Socket;
  constructor() {
    this.socket = connect('http://localhost:8080')
  };

  send(channel: string, payload: any) {
    this.socket.emit(channel, payload);
  }

  register(channel: string, callback: Function) {
    this.socket.on(channel, callback);
  }
}

export default Socket;