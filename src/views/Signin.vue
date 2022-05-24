<script setup>
  import { ref, reactive, watch, onMounted } from "vue";
  import { useRouter } from 'vue-router';
  import { apiSignin } from '@/apis/metawall.js';

  const router = useRouter();
  const userInfo = reactive({});
  const hasError = ref(false);
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
  const onGoogleSignUp = (googleUser) => {
    const apiURL = `${import.meta.env.VITE_API_URL}/user/TPSignup`;
    // The ID token you need to pass to your backend:
    const id_token = googleUser.getAuthResponse().id_token;
    axios.post(apiURL, {provider: 'google'}, {headers: {'Authorization': `Bearer ${id_token}`}}).then((res) => {
      console.log(res);
    })
  }
  // 嘗試登入，若沒有此帳號則用 google 註冊
  const onGoogleSignIn = (googleUser) => {
    const profile = googleUser.getBasicProfile();
    const id_token = googleUser.getAuthResponse().id_token;
    const googleUserInfo = {
      email: profile.getEmail(),
      password: id_token
    }
    apiSignin(googleUserInfo).then((res) => {
      if (res.data.status === 'success') {
        const token = res.headers.authorization.split(' ')[1];
        localStorage.setItem('metawall', token);
        router.replace({ name: 'home' });
        hasError.value = false;
      }
    }).catch(() => {
      onGoogleSignUp();
    })
  }
  watch(() => hasError.value ,(newValue) => {
    if (newValue) {
      userInfo.email = "";
      userInfo.password = "";
    };
  })
  const googleSignInInit = () => {
    window.gapi.load('auth2', () => {
      window.gapi.auth2.init({
        client_id: '765558807453-ocoieb5d0n5p4g5oqg49so6to75rt7d2.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        // 舊版本需要此插件
        plugin_name: 'chat',
      });
    });
    window.gapi.signin2.render('google-sign-in-button', {
      scope: 'profile email',
      width: 'auto',
      height: 50,
      longtitle: true,
      theme: 'light',
      onsuccess: onGoogleSignIn,
      onfailure: (err) => {
        console.log(err);
      }
    });
  }
  onMounted(() => {
    googleSignInInit();
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
        <div id="google-sign-in-button"></div>
      </div>
    </div>
  </div>
</template>
