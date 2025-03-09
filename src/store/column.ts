import { defineStore } from 'pinia';
import http from '../http';
import type { ImageProps,ListReqType } from './utils';

export interface ColumnProps {
  _id: string;
  title: string;
  avatar?: ImageProps;
  description: string;
}

export interface GlobalColumnsProps {
  data: ColumnProps[]; // 直接使用数组存储数据
  currentPage: number;
  total: number;
}

export const useColumnStore = defineStore('column', {
  state: (): GlobalColumnsProps => ({
    data: [],
    currentPage: 0,
    total: 0,
  }),
  actions: {
    async fetchColumns(params: ListReqType = {}) {
      const { currentPage = 1, pageSize = 6 } = params;
      if (this.currentPage < currentPage) {
        const { data } = await http.get(`/columns?currentPage=${currentPage}&pageSize=${pageSize}`);
        const { count, list } = data.data;
        //更新state
        this.$patch({
          currentPage,
          total: count,
          data: [...this.data, ...list], 
        });
      }
    },
    async fetchColumn(cid: string) {
      const columnExists = this.data.some((column) => column._id === cid);
      if (!columnExists) {
        const { data: rawData } = await http.get(`/columns/${cid}`);
        const { data } = rawData;
        this.data.push(data);
      }
    },
  },
  getters: {
    getColumns(state) {
      return state.data;
    },
    getColumnById(state) {
      return (id: string) => state.data.find((column) => column._id === id);
    },
  },
});