<script setup>
  import { ref, reactive, watch } from 'vue';
  import { apiPostPosts, apiGetUserProfile } from '@/apis/metawall.js';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const inputContent = ref("");
  const imageFile = ref(null);
  const submitMessage = ref("");
  const imagePreviewInfo = reactive({
    imagesBase64: [],
    errorMessage: [],
  })

  const postData = async () => {
    const userId = await apiGetUserProfile().then((res) => res.data.data._id);
    const photos = Array.from(imageFile.value.files);
    const form = new FormData();
    photos.forEach((item) => {
      form.append("photos", item);
    })
    form.append("user", userId);
    form.append("content", inputContent.value);
    inputContent.value = "";
    apiPostPosts(form, {mimeType: "multipart/form-data"}).then((res) => {
      if (res.data.status ===  "success") {
        submitMessage.value = "success";
        imagePreviewInfo.imagesBase64.length = 0;
        router.push({ name: 'home' });
      }
    })
  }
  const toUploadImages = ($event) => {
    imagePreviewInfo.imagesBase64.length = 0;
    imagePreviewInfo.errorMessage.length = 0;
    const currentImages = Array.from($event.target.files);
    const checkImageSize = currentImages.some((item) => item.size >=  2*1024*1024);
    if (currentImages.length > 10) {
      imagePreviewInfo.errorMessage.push('檔案數量不能超過 10 張');
      imagePreviewInfo.imagesBase64.length = 0;
    }
    if (checkImageSize) {
      imagePreviewInfo.errorMessage.push('檔案大小需在 2 MB 以內');
      imagePreviewInfo.imagesBase64.length = 0;
    }
    if (currentImages.length <= 10 && !checkImageSize) {
      currentImages.forEach((item) => {
        const reader = new FileReader();
        reader.readAsDataURL(item);
        reader.onload = ($event) => {
          imagePreviewInfo.imagesBase64.push($event.target.result);
        };
      })
    }
  };


  watch(inputContent, (newValsue) => {
    submitMessage.value = "";
  })
</script>

<template>
  <div>
    <h2 class="text-center border border-dark border-2 py-4 bg-white mb-4
      position-relative border-overlap border-overlap-start fw-bold">張貼動態</h2>
    <div class="p-8 shadow-lg border border-dark border-2 rounded bg-white">
      <label for="newsFeedTextarea" class="mb-1 d-block">貼文內容</label>
      <textarea v-model="inputContent" name="" id="newsFeedTextarea"
        cols="30" rows="10" class="w-100 mb-4 border border-dark border-2"></textarea>
      <input @change="toUploadImages($event)" ref="imageFile" type="file" name="photos" class="d-none btn btn-dark px-8 py-1 mb-4" multiple="multiple">
      <input type="button" value="上傳圖片" class="btn btn-dark px-8 py-1 mb-4" @click="imageFile.click()">
      <div v-if="imagePreviewInfo.imagesBase64.length > 0" class="d-flex justify-content-center flex-wrap align-items-center mb-8">
        <img v-for="(item, index) in imagePreviewInfo.imagesBase64" :key="`image${index}`" :src="item" :alt="`image${index}`" class="img-fluid w-25 h-25 mb-2 mx-3">
      </div>
      <p v-if="imagePreviewInfo.errorMessage.length > 0" class="d-flex flex-column align-items-center text-danger">
        <span v-for="(msg, index) in imagePreviewInfo.errorMessage" :key="index">{{index+1 +'. ' + msg}}</span>
      </p>
      <div class="d-flex justify-content-center">
        <input type="button" class="w-50 mx-auto py-4 btn btn-secondary bg-black-50"
          value="送出貼文" @click="postData" :disabled="!inputContent">
        <div v-if="submitMessage" class="form-text">{{submitMessage}}</div>
      </div>
    </div>
  </div>
</template>