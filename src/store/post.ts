import { defineStore } from 'pinia';
import http from '../http';
import type { ImageProps, ListReqType } from './utils';
import type { UserDataProps } from './user';

export interface PostProps {
  _id?: string;
  title: string;
  excerpt?: string;
  content?: string;
  image?: ImageProps | string;
  createdAt?: string;
  column: string;
  author?: string | UserDataProps;
  isHTML?: boolean;
}

export interface GlobalPostsProps {
  data: PostProps[];
  currentPage: number;
  total: number;
  cid: string
}

export const usePostStore = defineStore('post', {
  state: (): GlobalPostsProps => ({
    data: [],
    currentPage: 0,
    total: 0,
    cid: ''
  }),
  actions: {
    // 缓存优化 重新进入页面无需重新发送请求
    async fetchPosts(params: ListReqType = {}) {
      const { cid = '', currentPage = 1, pageSize = 3 } = params;
      if (this.currentPage < currentPage || this.cid !== cid) {
        const { data } = await http.get(`/columns/${cid}/posts?currentPage=${currentPage}&pageSize=${pageSize}`);
        const { count, list } = data.data;
        if (cid !== this.cid) {
          this.$patch({
            currentPage,
            total: count,
            data: [...list],
            cid: cid
          });
        } else {
          this.$patch({
            currentPage,
            total: count,
            data: [...this.data, ...list],
          });
        }
      }
      console.log('fetchPosts')
    },
    async fetchPost(id: string) {
      const { data: rawData } = await http.get(`/posts/${id}`);
      return rawData.data
    },
    async updatePost(id: string, payload: PostProps) {
      const { data: rawData } = await http.patch(`/posts/${id}`, payload);
      const { data } = rawData;
      const index = this.data.findIndex((post) => post._id === id);
      if (index !== -1) {
        this.data[index] = data;
      }
    },
    async createPost(payload: PostProps) {
      const { data: rawData } = await http.post('/posts/', payload);
      const { data } = rawData;
      this.data.push(data);
    },
    async deletePost(id: string) {
      const { data: rawData } = await http.delete(`/posts/${id}`);
      const { data } = rawData;
      this.data = this.data.filter((post) => post._id !== id);
      return data;
    },
  },
  getters: {
    getPosts: (state) => (cid: string) => {
      return state.data
    },
    getPostsByCid: (state) => (cid: string) => {
      return state.data
        .filter((post) => post.column === cid)
        .sort((a, b) => {
          return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
        });
    },
  },
});