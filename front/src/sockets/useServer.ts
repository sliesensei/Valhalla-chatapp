import axios from "axios";

class Server {

  private async get(endpoint: string) {
    const token = localStorage.getItem('userToken');
    try {
      const res = await axios.get<any>(endpoint, {
        baseURL: 'http://127.0.0.1:8080',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer ${token}`
        }
      });
      return ({ variant: 'success', data: res.data });
    } catch ({ response }) {
      if (response.status === 401) {
        localStorage.clear();
        window.location.replace('/');
      }
      const res = JSON.parse(response.request.response ?? '{}')
      return ({ variant: 'error', data: res });
    }
  }

  private async post(endpoint: string, body: any) {
    const token = localStorage.getItem('userToken');
    try {
      const res = await axios.post<any>(endpoint, body, {
        baseURL: 'http://127.0.0.1:8080',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer ${token}`
        }
      });
      return ({ variant: 'success', ...res });
    } catch ({ response, status }) {
      if (status === 401) {
        localStorage.clear();
        window.location = {
          ...window.location,
          pathname: '/',
        }
      }
      const res = JSON.parse(response?.request?.response ?? '{}')
      return ({ variant: 'error', data: res });
    }
  }

  signup(user: any) {
    return this.post('/users', user);
  }

  async signin(credentials: any) {
    const { data, ...rest } = await this.post('/login', credentials);
    localStorage.setItem('userToken', data?.token);
    localStorage.setItem('userId', data?.userId);
    return { data, ...rest };
  }

  get invites() {
    const { post, get } = this;
    return {
      get list() {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          return null;
        }
        return get('/invite/');
      },
      accept(token: string) {
        return post('/accept', { token })
      }
    }
  }

  confirm(token: string) {
    return this.post('/confirmations/' + token, {})
  }

  room(roomId: string) {
    const { post, get } = this
    return {
      get messages() {
        return get(`/rooms/${roomId}/messages`);
      },
      get leave() {
        return post('/leave', { roomId }).then(() => {
          window.location.reload(false);
        })
      },
      invite(username: string) {
        return post('/invite', { roomId, username })
      }
    }
  }

  get rooms() {
    const { post, get } = this
    return {
      getAll: () => {
        return get('/rooms');
      },
      create: (name: string) => {
        return post('/rooms', { name })
      },
    }
  }
}

const server = new Server()
export default server;
