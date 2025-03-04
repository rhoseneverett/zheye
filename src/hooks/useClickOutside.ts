import { onMounted, onUnmounted, ref, type Ref} from 'vue'

const useClickOutside = (myElement:Ref<null|HTMLElement>) => {
  const outside = ref(false)
  const handler = (e:MouseEvent) => {
    if(myElement.value){
      //如果点击的目标元素不在 myElement 内，并且下拉菜单是打开的，则表示在外面
      if(!myElement.value.contains(e.target as HTMLElement)){
        outside.value = true
        //必须设置else 不然只能触发第一次更新
      }else{
        outside.value = false
      }
    }
  }
  onMounted(() => {
    document.addEventListener('click',handler)
  })
  
  onUnmounted(() => {
    document.removeEventListener('click',handler)
  })
  return outside
}

export default useClickOutside
