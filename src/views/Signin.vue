<script setup>
  import { ref, reactive, watch, onMounted } from "vue";
  import { useRouter } from 'vue-router';
  import { apiSignin } from '@/apis/metawall.js';

  const router = useRouter();
  const userInfo = reactive({});
  const hasError = ref(false);
  const googleSignInUrl = `${import.meta.env.VITE_API_URL}/user/google`;

  const signin = () => {
    apiSignin(userInfo).then((res) => {
      if (res.data.status === 'success') {
        const token = res.headers.authorization.split(' ')[1];
        localStorage.setItem('metawall', token);
        router.replace({ name: 'home' });
        hasError.value = false;
      }
    }).catch(() => {
      hasError.value = true
    })
  }

  watch(() => hasError.value ,(newValue) => {
    if (newValue) {
      userInfo.email = "";
      userInfo.password = "";
    };
  })
</script>

<template>
  <!-- eslint-disable -->
  <div class="container d-flex align-items-center vh-100">
    <div class="row justify-content-center align-items-center w-100">
      <div class="col-md-4">
        <img src="@/assets/images/metawall.svg" alt="" class="ms-auto">
      </div>
      <div class="col-md-4 text-center">
        <h1 class="text-primary">MetaWall</h1>
        <p>到元宇宙展開全新社交圈</p>
        <form @submit.prevent="signin">
          <div class="form-floating mb-3">
            <input v-model="userInfo.email" type="email" class="form-control border-dark border-2 bg-white" id="floatingInput"
              placeholder="name@example.com" required>
            <label for="floatingInput">Email address</label>
          </div>
          <div class="form-floating mb-5">
            <input v-model="userInfo.password" type="password" class="form-control border-dark border-2 bg-white"
              id="floatingPassword" placeholder="Password" required>
            <label for="floatingPassword">Password</label>
          </div>
          <p v-if="hasError" class="text-danger mb-2">帳號或密碼錯誤，請重新輸入！</p>
          <input type="submit" value="登入" class="border-shadow btn btn-primary w-100 btn-block py-3 mb-2">
          <router-link to="/signup" class="text-decoration-none">註冊帳號</router-link>
        </form>
        <p class="my-3">or</p>
        <a :href="googleSignInUrl" class="btn btn-outline-primary">Google SignIn</a>
      </div>
    </div>
  </div>
</template>
