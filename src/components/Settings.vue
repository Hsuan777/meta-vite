<script setup>
  import { ref, reactive, watch } from 'vue';
  import axios from 'axios';
  import { apiUrlStore } from '@/store/api';
  import { apiGetUserProfile, apiPatchUserProfile, apiPostUserPassword } from '@/apis/metawall.js'

  const apiUrl = apiUrlStore();

  const token = localStorage.getItem('metawall');
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  const userInfo = reactive({});
  const getProfile = () => {
    apiGetUserProfile().then((res) => {
      userInfo.name = res.data.data.name;
      userInfo.avatar = res.data.data.avatar;
      userInfo.sex = res.data.data.sex;
    })
  }
  const updateProfileMessage = ref('');
  const updateProfile = () => {
    // userInfo.avatar = 'https://thumb.fakeface.rest/thumb_female_27_5a94a297efb15caf0e3d769ce1694953e8bf33e2.jpg';
    userInfo.avatar = 'https://i.pinimg.com/474x/82/ab/35/82ab3533ee71daf256f23c1ccf20ad6f--avatar-maker.jpg';
    apiPatchUserProfile(userInfo).then((res) => {
      if (res.data.status === 'success') {
        updateProfileMessage.value = res.data.status;
        getProfile();
      } else {
        updateProfileMessage.value = "failed";
      }
    }).catch(() => updateProfileMessage.value = "failed")
  }
  
  const pwd = reactive({});
  const updatePwdMessage = ref('');
  const updatePassword = () => {
    updatePwdMessage.value = '';
    const {password, confirmPassword} = pwd;
    if (password === confirmPassword) {
      apiPostUserPassword(pwd).then((res) => {
        pwd.password = '';
        pwd.confirmPassword = '';
        updatePwdMessage.value = res.data.status
      }).catch((err) => updatePwdMessage.value = err.response.data.message)
    } else {
      updatePwdMessage.value = '密碼不一致';
    }
  }
  getProfile();
</script>

<template>
  <div>
    <h2 class="text-center border border-dark border-2 py-4 bg-white mb-4
          position-relative border-overlap border-overlap-start fw-bold">修改個人資料</h2>
    <nav class="ps-3">
      <div class="nav nav-tabs" id="nav-tab" role="tablist">
        <button class="nav-link border border-bottom-0 border-end-0 border-dark border-2 bg-white active px-6 py-2" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">暱稱修改</button>
        <button class="nav-link border border-bottom-0 border-dark border-2 bg-white px-6 py-2" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">重設密碼</button>
      </div>
    </nav>
    <div class="tab-content border border-dark border-2 bg-white rounded-2 py-8" id="nav-tabContent">
      <div class="tab-pane fade show active py-8" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
        <div class="d-flex flex-column align-items-center w-75 mx-auto">
          <img :src="userInfo.avatar" alt="" class="rounded-circle border border-dark border-2 d-flex mb-4" style="width: 107px; height: 107px;">
          <input type="button" value="上傳大頭照" class="btn btn-dark px-6 py-1">
          <div class="w-100 mb-3">
            <label for="nickName" class="form-label text-start w-100">暱稱</label>
            <input v-model="userInfo.name" type="text" class="form-control bg-white border border-dark border-2" id="nickName" aria-describedby="emailHelp" :placeholder="userInfo.name">
          </div>
          <div class="w-100 mb-8">
            <label for="inlineCheckbox1" class="form-label text-start w-100">性別</label>
            <div class="form-check form-check-inline">
              <input v-model="userInfo.sex" class="form-check-input" type="radio" id="inlineCheckbox1" name="inlineRadioOptions" value="male">
              <label class="form-check-label" for="inlineCheckbox1">男性</label>
            </div>
            <div class="form-check form-check-inline">
              <input v-model="userInfo.sex" class="form-check-input" type="radio" id="inlineCheckbox2" name="inlineRadioOptions" value="female">
              <label class="form-check-label" for="inlineCheckbox2">女性</label>
            </div>
          </div>
          <div class="mb-4">
            <p class="d-none text-danger">1. 圖片寬高比必需為 1:1，請重新輸入 </p>
            <p class="d-none text-danger">2. 解析度寬度至少 300像素以上，請重新輸入</p>
          </div>
          <input @click="updateProfile" type="button" value="送出更新" class="border-shadow btn btn-primary w-100 py-4">
          <div v-if="updateProfileMessage" class="form-text">{{updateProfileMessage}}</div>
        </div>
      </div>
      <div class="tab-pane fade py-8" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
        <form @submit.prevent="updatePassword" class="d-flex flex-column mx-auto w-75">
          <div class="mb-3">
            <label for="newPassword" class="form-label">輸入新密碼</label>
            <input v-model="pwd.password" type="password" class="form-control bg-white border border-dark border-2" id="newPassword" aria-describedby="emailHelp" placeholder="輸入新密碼" required>
            <div v-if="updatePwdMessage" class="form-text" :class="updatePwdMessage !== 'success'? 'text-danger' : ''">{{updatePwdMessage}}</div>
          </div>
          <div class="mb-8">
            <label for="newPassworddAgain" class="form-label">再次輸入</label>
            <input v-model="pwd.confirmPassword" type="password" class="form-control bg-white border border-dark border-2" id="newPassworddAgain" placeholder="再次輸入" required>
          </div>
          <button type="submit" class="btn btn-secondary w-100 py-4 text-white">重設密碼</button>
        </form>
      </div>
    </div>
  </div>
</template>
