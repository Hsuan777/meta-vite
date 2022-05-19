<script setup>
  import { reactive, onMounted } from 'vue';
  import axios from "axios";
  import TopNav from '@/components/TopNav.vue';
  import SideNav from '@/components/SideNav.vue';
  import { useRouter } from 'vue-router';
  import { apiUrlStore } from '@/store/api';
  import { authStore } from '@/store/auth';

  const apiUrl = apiUrlStore();
  const auth = authStore();
  const router = useRouter();

  const checkSignin = async () => {
    const token = localStorage.getItem('metawall');
    if (!token) return router.push({ name: 'signin'});
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    await axios.get(apiUrl.userCheck).then((res) => {
      if (res.data.status) {
        auth.user = res.data.data
      }
    }).catch(() => {
      router.push({ name: 'signin'})
    })
  }
  checkSignin();
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
