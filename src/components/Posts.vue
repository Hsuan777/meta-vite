<template>
  <div>
    <div class="d-flex align-items-center mb-4">
      <select class="form-select border border-dark border-2 w-25 me-4 bg-white"
        aria-label="last news feed" @change="changeSort($event.target.value)">
        <option selected value="desc">最新貼文</option>
        <option value="asc">從舊到新</option>
      </select>
      <div class="input-group">
        <input type="text" v-model="inputQuery" @keyup.enter="searchData" class="form-control border border-dark border-2 bg-white"
          placeholder="搜尋貼文"
          aria-label="search post" aria-describedby="search post">
        <button class="btn btn-primary" type="button" @click="searchData">
          <i class="bi bi-search"></i>
        </button>
      </div>
    </div>
    <ul class="list-unstyled">
      <template v-if="postsData.length === 0">
        <li class="border-shadow-bottom border border-dark border-2 rounded bg-white">
          <div class="d-flex ps-4 py-5 border-bottom border-dark border-2">
            <span class="border border-dark bg-danger d-flex rounded-circle" style="width: 9px; height: 9px"></span>
            <span class="border border-dark bg-warning d-flex rounded-circle mx-1" style="width: 9px; height: 9px"></span>
            <span class="border border-dark bg-success d-flex rounded-circle" style="width: 9px; height: 9px"></span>
          </div>
          <div class="d-flex justify-content-center align-items-center p-8">
            <p class="text-black-50 mb-0">找不到相關動態喔！快去新增一則動態吧！</p>
          </div>
        </li>
      </template>
      <template v-else>
        <li v-for="item in postsData" :key="item['_id']" class="border-shadow-bottom p-8 border border-dark border-2 rounded bg-white mb-4">
          <div class="d-flex align-items-center mb-4">
            <img class="rounded-circle" :src="item.user.avatar" alt="" style="width: 45px; height: 45px;">
            <p class="ms-4 mb-0">{{item.user.name}}<br><span class="text-black-50">{{item.createdAt}}</span></p>
          </div>
          <p class="mb-2">{{item.content}}</p>
          <template v-if="item.image.length > 0">
            <img v-for="image in item.image" class="img-fluid rounded border border-dark border-2 mb-2" :src="image.url" :alt="`${item.user.name}'s Image`">
          </template>
          <div class="d-flex border-top pt-2">
            <button @click="changeLike" class="btn btn-link text-decoration-none d-flex algin-items-center">
              <i class="bi bi-hand-thumbs-up me-2"></i>
              {{item.likes.length}}
            </button>
            <input @click="openComment(item['_id'])" type="button" value="留言" class="btn btn-link text-decoration-none">
          </div>
          <div v-if="currentPostId === item['_id']">
            <p >開始留言</p>
            <div class="input-group">
              <!-- <img src="avatar" alt="name"> -->
              <input type="text" v-model="inputQuery" @keyup.enter="searchData" class="form-control border border-dark border-2 bg-white"
                placeholder="留言..."
                aria-label="search post" aria-describedby="search post">
              <input type="button" value="送出留言" class="btn btn-primary">
            </div>
          </div>
        </li>
      </template>
    </ul>
  </div>
</template>
<script setup>
  import { ref, reactive, onMounted } from 'vue';
  import axios from 'axios';
  import moment from 'moment';
  const apiUrl = `${import.meta.env.VITE_API_URL}/posts`;
  const token = localStorage.getItem('metawall');
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  const inputQuery = ref("");
  const currentTimeSort = ref("desc");
  const postsData = reactive([]);
  const getData = () => {
    axios.get(apiUrl).then((res) => {
      updateData(res.data.data);
    })
  };
  const changeSort = (timeSort) => {
    currentTimeSort.value = timeSort;
    const query = inputQuery.value !== "" 
      ? `?timeSort=${timeSort}&q=${inputQuery.value}` : `?timeSort=${timeSort}`;
    axios.get(apiUrl + query).then((res) => {
      updateData(res.data.data)
    })  
  }
  const searchData = () => {
    axios.get(apiUrl + `?q=${inputQuery.value}&timeSort=${currentTimeSort.value}`).then((res) => {
      updateData(res.data.data);
    })
  }
  const updateData = (data) => {
    postsData.length = 0;
    postsData.push(...data);
    postsData.forEach((item, index) => {
      postsData[index].createdAt = moment(item.createdAt).format('YYYY/MM/DD h:mm:ss');
    })
  }
  const currentPostId = ref('');
  const openComment = (postId) => {
    currentPostId.value = postId;
  }
  
  onMounted(() => {
    if (!token) return
    getData();
  })
</script>
