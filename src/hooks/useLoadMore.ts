import type { Store } from "pinia"
import { type ComputedRef, computed } from 'vue'

interface LoadOptions {
  currentPage: ComputedRef<number>;
  total: ComputedRef<number>;
  pageSize?: number;
  [key: string]: any;
}

//Store<string, any> 第一个参数是id类型通常为string，第二个参数为state类型
const useLoadMore = (store: Store<string, any>, actionName: string, options: LoadOptions) => {
  const { currentPage, total, pageSize = 3, ...restOptions } = options
  const requestParams = computed(() => {
    return {
      ...restOptions,
      currentPage: currentPage.value + 1,
      pageSize
    }
  })
  const loadMorePage = () => {
    //直接调用store action
    store[actionName](requestParams.value)
  }
  const isLastPage = computed(() => {
    if(total.value === 0) return true
    return Math.ceil(total.value / pageSize) === currentPage.value
  })
  return {
    currentPage,
    loadMorePage,
    isLastPage
  }
}


export default useLoadMore