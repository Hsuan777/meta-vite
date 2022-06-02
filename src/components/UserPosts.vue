<script setup>
  import { ref, reactive } from 'vue';
  import moment from 'moment';
  import { authStore } from '@/store/auth';
  import { apiGetPosts } from '@/apis/metawall.js';

  const auth = authStore();
  const inputQuery = ref("");
  const currentTimeSort = ref("desc");
  const userId = auth.user.id;
  const userPosts = reactive([]);

  const changeSort = (timeSort) => {
    currentTimeSort.value = timeSort;
    const query = inputQuery.value !== "" 
      ? `userId=${userId}&timeSort=${timeSort}&q=${inputQuery.value}` : `userId=${userId}&timeSort=${timeSort}`;
    apiGetPosts(query).then((res) => {
      if (res.data.status === 'success') {
        updateData(res.data.data);
      }
    })  
  }
  const searchData = () => {
    const query = `userId=${userId}&q=${inputQuery.value}&timeSort=${currentTimeSort.value}`;
    apiGetPosts(query).then((res) => {
      updateData(res.data.data)
    }) 
  }
  const updateData = (data) => {
    userPosts.length = 0;
    userPosts.push(...data);
    userPosts.forEach((item, index) => {
      userPosts[index].createdAt = moment(item.createdAt).format('YYYY/MM/DD HH:mm:ss');
    })
  }
  const getUserPosts = async () => {
    const query = `userId=${userId}`;
    apiGetPosts(query).then((res) => {
      updateData(res.data.data)
    }) 
  }
  getUserPosts();
</script>

<template>
  <div>
    <div class="d-flex align-items-center mb-4">
      <select @change="changeSort($event.target.value)" class="form-select border border-dark border-2 w-25 me-4 bg-white"
        aria-label="last news feed">
        <option selected value="dasc">最新貼文</option>
        <option value="asc">從舊到新</option>
      </select>
      <div class="input-group">
        <input v-model="inputQuery" @keyup.enter="searchData"  type="text" class="form-control border border-dark border-2 bg-white"
          placeholder="搜尋貼文"
          aria-label="search post" aria-describedby="search post">
        <button @click="searchData" class="btn btn-primary" type="button">
          <i class="bi bi-search"></i>
        </button>
      </div>
    </div>
    
    <ul class="list-unstyled">
      <template v-if="userPosts.length === 0">
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
        <li v-for="item in userPosts" :key="item._id" class="border-shadow-bottom p-8 border border-dark border-2 rounded bg-white mb-5">
        <div class="d-flex align-items-center mb-4">
          <img class="rounded-circle" :src="item.user.avatar" :alt="item.user.name" style="width: 45px; height: 45px;">
          <p class="ms-4 mb-0">{{item.user.name}}
            <br>
            <span class="text-black-50">{{item.createdAt}}</span>
          </p>
        </div>
        <p class="mb-2">{{item.content}}</p>
        <img v-for="item in item.image" :key="item.deleteHash" class="img-fluid rounded mb-2" :src="item.url" :alt="item.deleteHash">
      </li>
      </template>
      
    </ul>
  </div>
</template>
