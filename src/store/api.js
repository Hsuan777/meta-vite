import { defineStore } from 'pinia';

const apiHost = import.meta.env.VITE_API_URL;

export const apiUrlStore = defineStore('Api', {
  state: () => ({
    posts: `${apiHost}/posts`,
    userCheck: `${apiHost}/user/check`,
    userProfile: `${apiHost}/user/profile`,
    userUpdatePwd: `${apiHost}/user/updatePassword`,
  }),
  getters: {
    
  },
  actions: {
    
  },
})