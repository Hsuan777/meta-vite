<script setup>
  import { ref, reactive } from 'vue';
  import moment from 'moment';
  import { apiGetPost, apiGetUserPosts } from '@/apis/metawall.js';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const postId = route.params.id;
  const userPost = ref({});
  const userPosts = reactive([]);

  const getUserPost = async (postId) => {
    await apiGetPost(postId).then((res) => {
      userPost.value = {...res.data.data};
      getUserPosts(userPost.value.user._id);
    })
  }
  const getUserPosts = async (userId) => {
    userPosts.length = 0;
    await apiGetUserPosts(userId).then((res) => {
      userPosts.push(...res.data.data.posts);
    })
  }
  getUserPost(postId);
</script>

<template>
  <div>
    <div class="text-center border border-dark border-2 bg-white mb-4
      position-relative border-overlap border-overlap-start fw-bold">
      <div class="d-flex align-items-center">
        <img :src="userPost?.user?.avatar" alt="" class="img-fluid me-4">
        <div class="text-start">
          <p class="fw-bold mb-0">{{userPost?.user?.name}}</p>
          <p class="text-black-50 mb-0">987,987 人追蹤</p>
        </div>
        <input type="button" value="追蹤" class="border-shadow btn btn-warning ms-auto me-4 py-2 px-8 border border-dark border-2">
      </div>
    </div>
    <div class="d-flex align-items-center mb-4">
      <select class="form-select border border-dark border-2 w-25 me-4 bg-white"
        aria-label="last news feed">
        <option selected value="last">最新貼文</option>
        <option value="old">從舊到新</option>
      </select>
      <div class="input-group">
        <input type="text" class="form-control border border-dark border-2 bg-white"
          placeholder="搜尋貼文"
          aria-label="search post" aria-describedby="search post">
        <button class="btn btn-primary" type="button">
          <i class="bi bi-search"></i>
        </button>
      </div>
    </div>
    <ul class="list-unstyled">
      <!-- 查看貼文置頂 -->
      <span class="text-black-50">查看貼文置頂</span>
      <li class="border-shadow-bottom p-8 border border-dark border-2 rounded bg-white mb-5">
        <div class="d-flex align-items-center mb-4">
          <img class="rounded-circle" :src="userPost?.user?.avatar" :alt="userPost?.user?.name" style="width: 45px; height: 45px;">
          <p class="ms-4 mb-0">
            {{userPost?.user?.name}}
            <br>
            <span class="text-black-50">{{moment(userPost.createdAt).format('YYYY/MM/DD HH:mm:ss')}}</span>
          </p>
        </div>
        <p class="mb-2">{{userPost.content}}</p>
        <img v-for="item in userPost.image" :key="item.deleteHash" class="img-fluid rounded" :src="item.url" :alt="item.deleteHash">
      </li>
      <!-- 其他貼文 -->
      <span class="text-black-50">其他貼文</span>
      <li v-for="item in userPosts" :key="item._id" class="border-shadow-bottom p-8 border border-dark border-2 rounded bg-white mb-5">
        <div class="d-flex align-items-center mb-4">
          <img class="rounded-circle" :src="item?.user?.avatar" :alt="item?.user?.name" style="width: 45px; height: 45px;">
          <p class="ms-4 mb-0">
            {{item?.user?.name}}
            <br>
            <span class="text-black-50">{{moment(item.createdAt).format('YYYY/MM/DD HH:mm:ss')}}</span>
          </p>
        </div>
        <p class="mb-2">{{item.content}}</p>
        <img v-for="item in item.image" :key="item.deleteHash" class="img-fluid rounded" :src="item.url" :alt="item.deleteHash">
      </li>
    </ul>
  </div>
</template>