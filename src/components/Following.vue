<script setup>
  import { reactive } from 'vue';
  import moment from 'moment';
  import { apiFollowingList } from '@/apis/metawall.js';

  const followingList = reactive([]);
  apiFollowingList().then((res) => {
    if (res.data.status === 'success') {
      followingList.length = 0;
      followingList.push(...res.data.data);
      followingList.forEach((item, index) => {
        followingList[index].diffDay = moment(item.createdAt).diff(moment(), 'day');
        followingList[index].createdAt = moment(item.createdAt).format('YYYY/MM/DD HH:mm:ss');
      })
    }
  })
</script>

<template>
  <div>
    <h2 class="text-center border border-dark border-2 py-4 bg-white mb-4
      position-relative border-overlap border-overlap-start fw-bold">追蹤名單</h2>
    <ul class="list-unstyled">
      <li v-for="item in followingList" :key="item._id" class="border-shadow-bottom p-4 bg-white border border-dark border-2 rounded-3">
        <div class="d-flex align-items-center">
          <img :src="item.avatar" alt="" class="img-fluid me-4 rounded-circle" style="width: 40px; height: 40px;">
          <div class="w-100">
            <p class="mb-0">{{item.name}}</p>
            <p class="d-flex mb-0">
              <span class="text-black-50">追蹤時間：{{item.createdAt}}</span>
              <span class="ms-auto">您已經追蹤 {{item.diffDay}} 天！</span>
            </p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
