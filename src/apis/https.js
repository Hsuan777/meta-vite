import axios from 'axios';
// import { useRouter } from 'vue-router';
import router from '@/router';

// const router = useRouter();
const errorHandle = (status, msg) => {
  switch(status) {
    case 400:
      // console.log(msg);
      break;
    case 401:
      // console.log('請重新登入後使用，謝謝。');
      router.push({name: 'signin'})
      break;
    case 404:
      // console.log('沒有這個請求喔');
      break;
    default:
      // console.log('有其他的錯誤:' + msg);
  }
}

// 重新建立 axios 另一個實體並設定
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

// 加入 request 攔截
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('metawall');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config
  } , 
  (error) => Promise.reject(error)  
)

// 加入 response 攔截
instance.interceptors.response.use(
  (response) => response, 
  (error) => {
    const { response } = error;
    if (response) {
      errorHandle(response.status, response.data.error);
      return Promise.reject(error);
    } else {
      if (!window.navigator.onLine) {
        console.log('網路出了點問題，請稍後再試');
      } else {
        return Promise.reject(error);
      }
    }
  }
)

export default (method, url, data = null) => {
  method = method.toLowerCase();
  if (method === 'get') return instance.get(url, {params: data});
  else if (method === 'post') return instance.post(url, data);
  else if (method === 'delete') return instance.delete(url, {params: data});
  else if (method === 'patch') return instance.delete(url, data);
  else console.log('未知的 method:' + method);
}
