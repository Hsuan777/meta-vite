<script setup>
  import { reactive, ref, watch } from 'vue';
  import router from '@/router';
  import { apiSignup } from '@/apis/metawall.js';

  const userInfo = reactive({});
  const errorInfo = reactive({});
  const successMessage = ref('');

  const signup = () => {
    if (userInfo.name.length < 2) {
      errorInfo.name = '暱稱至少 2 個字元以上'
    } else errorInfo.name = '';
    if (userInfo.password.length < 8) {
      errorInfo.password = '密碼需大於等於 8 碼';
    } else errorInfo.password = '';
    if (userInfo.confirmPassword !== userInfo.password) {
      errorInfo.confirmPassword = '密碼不一致';
    } else errorInfo.confirmPassword = '';
    let noError = Object.keys(errorInfo).every((item) => errorInfo[item] === '');
    if (noError) {
      apiSignup(userInfo).then((res) => {
        if (res.data.status === 'success') {
          resetForm();
          successMessage.value = '已註冊成功，請重新登入';
          setTimeout(() => {
            router.push({name: 'signin'});
          }, 2000);
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
  watch(() => userInfo.email ,(newValue) => {
    if (newValue) errorInfo.email = '';
  })
</script>

<template>
  <div class="container d-flex align-items-center vh-100">
    <div class="row justify-content-center align-items-center w-100">
      <div class="col-md-4">
        <img src="@/assets/images/metawall.svg" alt="" class="ms-auto">
      </div>
      <div class="col-md-4">
        <h1 class="text-primary text-center mb-3">MetaWall</h1>
        <form  @submit.prevent="signup">
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
          <p v-if="errorInfo.email" class="text-danger text-center mb-5">{{errorInfo.email}}</p>
          <p v-if="successMessage" class="text-primary text-center mb-5">{{successMessage}}</p>
          <input type="submit" value="註冊" class="btn btn-secondary w-100 btn-block py-3 mb-2">
          <router-link to="/" class="text-decoration-none text-center d-block">登入</router-link>
        </form>
      </div>
    </div>
  </div>
</template>
