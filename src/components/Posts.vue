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
          <img v-if="item.image" class="img-fluid rounded border border-dark border-2" :src="item.image" :alt="`${item.user.name}'s Image`">
        </li>
      </template>
    </ul>
  </div>
</template>
<script>
import {ref, reactive} from 'vue';
import axios from 'axios';
import moment from 'moment';

export default {
  setup() {
    const inputQuery = ref("");
    const currentTimeSort = ref("desc");
    let postsData = reactive([]);
    const apiurl = 'https://metawall.herokuapp.com/posts';
    const getData = () => {
      axios.get(apiurl).then((res) => {
        updateData(res.data.data);
      })
    };
    const changeSort = (timeSort) => {
      currentTimeSort.value = timeSort;
      const query = inputQuery.value !== "" 
        ? `?timeSort=${timeSort}&q=${inputQuery.value}` : `?timeSort=${timeSort}`;
      axios.get(apiurl + query).then((res) => {
        updateData(res.data.data)
      })  
    }
    const searchData = () => {
      axios.get(apiurl + `?q=${inputQuery.value}&timeSort=${currentTimeSort.value}`).then((res) => {
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
    getData();
    return {inputQuery, postsData, changeSort, searchData}
  }
};
</script>
