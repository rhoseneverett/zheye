import axios from 'axios';
import { useGlobalStore } from '@/store/global';
import { useUserStore } from '@/store/user';

// 创建 Axios 实例
const http = axios.create({
  baseURL: 'https://apis.imooc.com/api/', // 设置默认的 baseURL
});

// if(store.state.token){
//   http.defaults.headers.Authorization = `Bearer ${store.state.token}`;
// }

// 请求拦截器
http.interceptors.request.use((config) => {
  // 添加 icode 参数
  if (config.method === 'get' || config.method === 'delete') {
    config.params = { ...config.params, icode: 'DC6A0C8FF186884D' };
  } else {
    if (config.data instanceof FormData) {
      config.data.append('icode', 'DC6A0C8FF186884D');
    } else {
      config.data = { ...config.data, icode: 'DC6A0C8FF186884D' };
    }
  }
  const userStore = useUserStore();
  if (userStore.token) {
    config.headers.Authorization = `Bearer ${userStore.token}`;
  }
  // 开启全局 loading
  // store.commit('setLoading', true);
  // store.commit('setError', { status: false, message: '' })
  const globalStore = useGlobalStore();
  globalStore.setLoading(true)
  globalStore.setError({ status: false, message: '' })
  return config;
});

// 响应拦截器
http.interceptors.response.use(
  (response) => {
    // 关闭全局 loading
    // store.commit('setLoading', false);
    const globalStore = useGlobalStore();
    globalStore.loading = false
    return response;
  },
  (e) => {
    const { error } = e.response.data
    // store.commit('setError', { status: true, message: error })
    // store.commit('setLoading', false);
    const globalStore = useGlobalStore();
    globalStore.loading = false
    globalStore.setError({ status: true, message: error })
    return Promise.reject(error);
  }
);

// 导出封装后的 Axios 实例
export default http;