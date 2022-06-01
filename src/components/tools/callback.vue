<script setup>
  import { useRoute, useRouter } from 'vue-router';
  import { apiTPCallback } from '@/apis/metawall.js';

  const route = useRoute();
  const router = useRouter();
  if (route.query.onceToken) {
    apiTPCallback(route.query.onceToken).then((res) => {
      if (res.data.status === 'success') {
        const token = res.headers.authorization.split(' ')[1];
        localStorage.setItem('metawall', token);
        router.replace({ name: 'home' });
      } else {
        router.replace({ name: 'signin' });
      }
    }).catch(() => {
      router.replace({ name: 'signin' });
    })
  }
</script>

<template>
  <div class="hidden"></div>
</template>