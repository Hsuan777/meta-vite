import { defineStore } from 'pinia';

export const apiUrlStore = defineStore('Api', {
  state: () => ({
    posts: `${import.meta.env.VITE_API_URL}/posts`,
  }),
  getters: {
    
  },
  actions: {
    
  },
})