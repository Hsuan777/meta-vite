<script setup>
  import { useRouter } from 'vue-router';
  import { authStore } from '@/store/auth';

  const auth = authStore();
  const router = useRouter();
  const signout = () => {
    // const auth2 = window.gapi.auth2.getAuthInstance();
    // localStorage.removeItem('metawall');
    // // 登出 Google 帳號
    // window.gapi.auth2.getAuthInstance().disconnect();
    // auth2.signOut();
    // 讓其有時間差，否則會再次登入
    setTimeout(() => {
      router.push({ name: 'signin' });
    }, 1000);
  }
</script>

<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg navbar-white bg-white">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">MataWall</a>
        <button class="navbar-toggler" type="button"
          data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false"
          aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="dropdown">
          <img class="rounded-circle" :src="auth.user.avatar" alt="" style="width: 30px; height: 30px;">
          <a class="text-decoration-none" href="#" id="navbarDropdown" role="button"
          data-bs-toggle="dropdown" aria-expanded="false">
            Member
          </a>
          <ul class="dropdown-menu dropdown-menu-end text-center
            rounded-0 py-0 border-overlap border-overlap-end"
            aria-labelledby="navbarDropdown">
            <li class="bg-white">
              <router-link class="dropdown-item border border-dark border-2 border-bottom-0 py-2"
                to="/user">我的貼文牆</router-link>
            </li>
            <li class="bg-white">
              <router-link class="dropdown-item border border-dark border-2 border-bottom-0 py-2"
                to="/settings">修改個人資料</router-link>
            </li>
            <li class="bg-white">
              <a class="dropdown-item border border-dark border-2 py-2" @click.prevent="signout">登出</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<style lang="scss">
  .navbar-brand {
    font-family: 'Paytone One', sans-serif;
  }
  #navbarDropdown {
    font-family: 'Azeret Mono', monospace;
  }
</style>
