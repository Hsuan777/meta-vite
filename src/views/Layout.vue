<script setup>
  import { reactive, onMounted } from 'vue';
  import axios from "axios";
  import TopNav from '@/components/TopNav.vue';
  import SideNav from '@/components/SideNav.vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const userInfo = reactive({});
  const checkSignin = async () => {
    const token = localStorage.getItem('metawall');
    if (!token) return router.push({ name: 'signin'});
    const apiUrl = `${import.meta.env.VITE_API_URL}/user/check`;
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    await axios.get(apiUrl).then((res) => {
      if (res.data.status) {
        userInfo.name = res.data.data.name
        userInfo.avatar = res.data.data.avatar
      }
    }).catch(() => {
      router.push({ name: 'signin'})
    })
  }
  checkSignin();
</script>

<template>
  <div class="container-fluid bg-white border-bottom border-dark border-2">
    <TopNav :avatar="userInfo.avatar"/>
  </div>
  <div class="container pt-12">
    <div class="row">
      <div class="col-md-8">
        <router-view/>
      </div>
      <div class="col-md-4">
        <SideNav :name="userInfo.name" :avatar="userInfo.avatar" />
      </div>
    </div>
  </div>
  
</template>

<style lang="scss">

</style>
