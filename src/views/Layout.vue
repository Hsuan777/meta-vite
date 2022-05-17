<script setup>
  import { onMounted } from 'vue';
  import axios from "axios";
  import TopNav from '@/components/TopNav.vue';
  import SideNav from '@/components/SideNav.vue';
import router from '../router';

  const checkSignin = () => {
    const token = localStorage.getItem('metawall');
    if (!token) return
    const apiUrl = `${import.meta.env.VITE_API_URL}/user/check`;
    const options = {
      method: 'get',
      url: apiUrl,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios(options).then((res) => {
      if (res.data.status === 'success') {
        router.push({ name: 'home' });
      } else {
        router.push({ name: 'signin'})
      }
    })
  }
  onMounted(() => {
    checkSignin
  })
</script>

<template>
  <div class="container-fluid bg-white border-bottom border-dark border-2">
    <TopNav/>
  </div>
  <div class="container pt-12">
    <div class="row">
      <div class="col-md-8">
        <router-view/>
      </div>
      <div class="col-md-4">
        <SideNav/>
      </div>
    </div>
  </div>
  
</template>

<style lang="scss">

</style>
