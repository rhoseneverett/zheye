import { defineStore } from 'pinia'
import http from '../http'
import type { ImageProps, ResponseType } from './utils'

export interface UserDataProps {
  nickName?: string;
  _id?: string;
  column?: string;
  email?: string;
  avatar?: ImageProps;
  description?: string;
}

export interface UserProps {
  token: string;
  isLogin: boolean;
  data: UserDataProps | null;
}

export const useUserStore = defineStore('user', {
  state: (): UserProps => ({
    token: localStorage.getItem('token') || '',
    isLogin: false,
    data: null
  }),
  actions: {
    async login(email: string, password: string) {
      const payload = {
        email,
        password
      }
      const { data } = await http.post<ResponseType>('/user/login', payload)
      console.log(data)
      const { token } = data.data
      this.token = token
      localStorage.setItem('token', token)
    },
    logout() {
      this.token = ''
      this.isLogin = false
      localStorage.removeItem('token')
      delete http.defaults.headers.common.Authorization
    },
    async fetchCurrentUser() {
      const { data } = await http.get<ResponseType>('/user/current')
      this.isLogin = true
      this.data = { ...data.data }
    }
  }
})
