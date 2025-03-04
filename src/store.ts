import { createStore } from 'vuex';
import http from './http';

export interface ResponseType<P = {}> {
  code: number;
  msg: string;
  data: P;
}

export interface UserProps {
  isLogin: boolean;
  nickName?: string;
  _id?: string;
  column?: string;
  email?: string;
  avatar?: ImageProps;
  description?: string;
}

export interface RuleProps {
  type: 'required' | 'password' | 'email';
  message: string;
  validator?: ()=>boolean;
}

export interface GlobalDataProps {
  error: GlobalErrorProps;
  token: string;
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
  loading: boolean;
}

export interface ImageProps {
  _id?: string;
  url?: string;
  createdAt?: string;
  fitUrl?: string;
}
export interface ColumnProps {
  _id: string;
  title: string;
  avatar?: ImageProps;
  description: string;
}
export interface PostProps {
  _id?: string;
  title: string;
  excerpt?: string;
  content?: string;
  image?: ImageProps | string;
  createdAt?: string;
  column: string;
  author?: string | UserProps;
}

export interface GlobalErrorProps {
  status: boolean;
  message?: string;
}

const store = createStore<GlobalDataProps>({
  state: {
    error:{ status: false },
    token: localStorage.getItem('token') || '',
    columns: [],
    posts: [],
    user: { isLogin: false },
    loading: false,
  },
  mutations: {
    createPost(state, newPost) {
      state.posts.push(newPost)
    },
    fetchColumns(state, rawData) {
      state.columns = rawData.data.list
    },
    fetchColumn(state, rawData) {
      state.columns = [rawData.data]
    },
    fetchPosts(state, rawData) {
      state.posts = rawData.data.list
    },
    setLoading(state, status) {
      state.loading = status
    },
    login(state, rawData) {
      const { token } = rawData.data
      state.token = token
      localStorage.setItem('token', token)
      // http.defaults.headers.common.Authorization = `Bearer ${token}`
    },
    fetchCurrentUser(state, rawData) {
      state.user = { isLogin: true, ...rawData.data }
    },
    setError(state, e: GlobalErrorProps) {
      state.error = e
    },
    logout(state) {
      state.token = ''
      state.user = { isLogin: false }
      localStorage.removeItem('token')
    }
  },
  actions: {
    async fetchColumns({ commit }) {
      const { data } = await http.get('/columns')
      commit('fetchColumns', data)
    },
    async fetchColumn({ commit }, cid) {
      const { data } = await http.get(`/columns/${cid}`)
      commit('fetchColumn', data)

    },
    async fetchPosts({ commit }, cid) {
      const { data } = await http.get(`/columns/${cid}/posts`)
      commit('fetchPosts', data)
    },
    async login ({ commit }, payload) {
      const { data } = await http.post('/user/login', payload);
      commit('login', data);
    },
    async fetchCurrentUser ({ commit }) {
      const { data } = await http.get('/user/current');
      commit('fetchCurrentUser', data);
    },
    async loginAndFetch ({ dispatch }, loginData) {
      await dispatch('login', loginData); // 等待登录完成
      await dispatch('fetchCurrentUser'); // 等待获取当前用户信息
    },
    async createPost({ commit }, payload) {
      const { data } = await http.post('/posts',payload);
      commit('createPost', data);
    },
  },
  getters: {
    //错写===成=，未报错
    getColumnById: (state) => (id: string) => {
      return state.columns.find(c => c._id === id)
    },
    getPostsByCid: (state) => (cid: string) => {
      return state.posts.filter(post => post.column === cid)
    }
  }
})

export default store