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
<script>
import {ref, reactive} from 'vue';
import axios from 'axios';
export default {
  setup() {
    const apiUrl = `${import.meta.env.VITE_API_URL}/posts`
    const inputContent = ref("");
    const imageFile = ref(null);
    const imageInfo = reactive({});
    const imgur = {
      id: "e7bdb6b252f9fe5",
    } 
    const uploadImageToImgur = (e) => {
      const file = e.target.files[0];
      let form = new FormData();
      let settings = {
        method: "POST",
        url: "https://api.imgur.com/3/image",
        headers: {
          Authorization: `Client-ID ${imgur.id}`
        },
        mimeType: "multipart/form-data"
      };
      form.append("image", file);
      form.append("name", file.name);
      settings.data = form;
      axios(settings).then((res) => {
        imageInfo.link = res.data.data.link;
        imageInfo.name = res.data.data.name;
        e.target.value = "";
      })
    }
    const postData = () => {
      const user = JSON.parse(localStorage.getItem('metawall'));
      const photos = Array.from(imageFile.value.files);
      const form = new FormData();
      photos.forEach((item) => {
        form.append("photos", item);
      })
      form.append("user", user.id);
      form.append("content", inputContent.value);
      const settings = {
        method: "post",
        url: apiUrl,
        mimeType: "multipart/form-data",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      settings.data = form;
      axios(settings).then((res) => {
        if (res.data.status ===  "success") {
          imageInfo.link = ""
          inputContent.value = "";
        }
      })
    }
    return {inputContent, imageInfo, imageFile, uploadImageToImgur, postData}
  }
};
</script>
