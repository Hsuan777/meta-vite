<script setup>
  import {ref, reactive} from 'vue';
  import axios from 'axios';
  import { apiUrlStore } from '@/store/api';

  const apiUrl = apiUrlStore();

  const token = localStorage.getItem('metawall');
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  const inputContent = ref("");
  const imageFile = ref(null);
  const imageInfo = reactive({});
  
  const postData = async () => {
    const userId = await axios.get(apiUrl.userProfile).then((res) => userId.value = res.data.data._id);
    const photos = Array.from(imageFile.value.files);
    const form = new FormData();
    photos.forEach((item) => {
      form.append("photos", item);
    })
    form.append("user", userId);
    form.append("content", inputContent.value);
    const settings = {
      method: "post",
      url: apiUrl.posts,
      mimeType: "multipart/form-data",
    };
    settings.data = form;
    axios(settings).then((res) => {
      if (res.data.status ===  "success") {
        imageInfo.link = ""
        inputContent.value = "";
      }
    })
  }
</script>

<template>
  <div>
    <h2 class="text-center border border-dark border-2 py-4 bg-white mb-4
      position-relative border-overlap border-overlap-start fw-bold">張貼動態</h2>
    <div class="p-8 shadow-lg border border-dark border-2 rounded bg-white">
      <label for="newsFeedTextarea" class="mb-1 d-block">貼文內容</label>
      <textarea v-model="inputContent" name="" id="newsFeedTextarea"
        cols="30" rows="10" class="w-100 mb-4 border border-dark border-2"></textarea>
      <input ref="imageFile" type="file" name="photos" class="d-none btn btn-dark px-8 py-1 mb-4" multiple="multiple">
      <input type="button" value="上傳圖片" class="btn btn-dark px-8 py-1 mb-4" @click="imageFile.click()">
      <div v-if="imageInfo.link" class="mb-8">
        <img :src="imageInfo.link" :alt="imageInfo.name" class="img-fluid">
      </div>
      <div class="d-flex justify-content-center">
        <input type="button" class="w-50 mx-auto py-4 btn btn-secondary bg-black-50"
          value="送出貼文" @click="postData" :disabled="!inputContent">
      </div>
    </div>
  </div>
</template>