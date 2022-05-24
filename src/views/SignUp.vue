<script setup>
  import { reactive, watch, onMounted } from 'vue';
  import axios from 'axios';
  const apiURL = `${import.meta.env.VITE_API_URL}/user/signup`;
  const userInfo = reactive({});
  const errorInfo = reactive({});
  const signup = () => {
    if (userInfo.name.length <= 2) {
      errorInfo.name = '暱稱至少 2 個字元以上'
    } else errorInfo.name = '';
    if (userInfo.password.length <= 8) {
      errorInfo.password = '密碼需大於 8 碼';
    } else errorInfo.password = '';
    if (userInfo.confirmPassword !== userInfo.password) {
      errorInfo.confirmPassword = '密碼不一致';
    } else errorInfo.confirmPassword = '';
    let hasError = Object.keys(errorInfo).every((item) => errorInfo[item] === '');
    if (hasError) {
      axios.post(apiURL, userInfo).then((res) => {
        if (res.data.status === 200) {
          resetForm();
        }
      }).catch((res) => {
        if (res.response.data.message) {
          errorInfo.email = res.response.data.message;
        }
      })
    }
  }
  const resetForm = () => {
    Object.keys(userInfo).forEach((item) => userInfo[item] = '');
  };

  const onGoogleSignUp = (googleUser) => {
    const apiURL = `${import.meta.env.VITE_API_URL}/user/TPSignup`;
    // The ID token you need to pass to your backend:
    const id_token = googleUser.getAuthResponse().id_token;
    axios.post(apiURL, {provider: 'google'}, {headers: {'Authorization': `Bearer ${id_token}`}}).then((res) => {
      console.log(res);
    })
  }
  watch(() => userInfo.email ,(newValue) => {
    if (newValue) errorInfo.email = '';
  })
  onMounted(() => {
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
      onsuccess: onGoogleSignUp,
      onfailure: (err) => {
        console.log(err);
      }
    });
  })
</script>

<template>
  <div class="container d-flex align-items-center vh-100">
    <div class="row justify-content-center align-items-center w-100">
      <div class="col-md-4">
        <img src="@/assets/images/metawall.svg" alt="" class="ms-auto">
      </div>
      <div class="col-md-4">
        <h1 class="text-primary">MetaWall</h1>
        <p class="text-center">註冊</p>
        <form  @submit="signup">
          <div class="form-floating mb-3">
            <input v-model="userInfo.name" type="text" class="form-control border-dark border-2 bg-white"
              id="floatingInput" placeholder="暱稱" required>
            <label for="floatingInput">暱稱</label>
            <p v-if="errorInfo.name" class="text-danger mt-1 mb-2">{{errorInfo.name}}</p>
          </div>
          <div class="form-floating mb-3">
            <input  v-model="userInfo.email" type="email" class="form-control border-dark border-2 bg-white"
              id="floatingEmail" placeholder="name@example.com" required>
            <label for="floatingEmail">Email address</label>
            <p v-if="errorInfo.email" class="text-danger mt-1 mb-2">{{errorInfo.email}}</p>
          </div>
          <div class="form-floating mb-5">
            <input v-model="userInfo.password" type="password" class="form-control border-dark border-2 bg-white"
              id="floatingPassword" placeholder="Password" required>
            <label for="floatingPassword">Password</label>
            <p v-if="errorInfo.password" class="text-danger mt-1 mb-2">{{errorInfo.password}}</p>
          </div>
          <div v-if="userInfo.password" class="form-floating mb-5">
            <input v-model="userInfo.confirmPassword" type="password" class="form-control border-dark border-2 bg-white"
              id="floatingConfirmPassword" placeholder="Password" required>
            <label for="floatingConfirmPassword">Confirm Password</label>
            <p v-if="errorInfo.confirmPassword" class="text-danger mt-1 mb-2">{{errorInfo.confirmPassword}}</p>
          </div>
          <input type="submit" value="註冊" class="btn btn-secondary w-100 btn-block py-3 mb-2">
          <router-link to="/" class="text-decoration-none text-center d-block">登入</router-link>
        </form>
        <p class="text-center my-3">or</p>
        <div id="google-sign-in-button"></div>
      </div>
    </div>
  </div>
</template>
