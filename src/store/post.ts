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
  data: PostProps[]; // 直接使用数组存储文章数据
}

export const usePostStore = defineStore('post', {
  state: (): GlobalPostsProps => ({
    data: [],
  }),
  actions: {
    async fetchPosts(params: ListReqType = {}) {
      const { cid = '', currentPage = 1, pageSize = 5 } = params;
      const { data } = await http.get( `/columns/${cid}/posts?currentPage=${currentPage}&pageSize=${pageSize}` );
      const { list } = data.data;
      if (currentPage === 1) {
        this.data = list;
      } else {
        this.data = [...this.data, ...list];
      }
    },
    async fetchPost(id: string) {
      const certainPost = this.data.find((post) => post._id === id);
      if (!certainPost) {
        const { data: rawData } = await http.get(`/posts/${id}`);
        const { data } = rawData;
        this.data.push(data);
        return data;
      } else {
        return certainPost;
      }
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
    getCurrentPost: (state) => (id: string) => {
      return state.data.find((post) => post._id === id);
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