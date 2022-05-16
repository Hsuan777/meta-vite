<script setup>
  import { onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from "axios";
  import TopNav from '@/components/TopNav.vue';
  import SideNav from '@/components/SideNav.vue';

  onMounted(() => {
    const router = useRouter();
    const user = JSON.parse(localStorage.getItem('metawall'));
    if (!user) return router.push({ name: 'signin' });
    const apiUrl = `${import.meta.env.VITE_API_URL}/user/profile`;
    const options = {
        method: 'get',
        url: apiUrl,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
    axios(options).then((res) => {
      if (res.data.status === 'success') {
        router.push({ name: 'home' });
      }
    }).catch(() => router.push({ name: 'signin' }))
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
