<script setup>
  import { reactive } from 'vue';
  import moment from 'moment';
  import { apiGetLikeList, apiPostLikes, apiGetPost } from '@/apis/metawall.js';
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const likeList = reactive([]);
  const getListList = () => {
    apiGetLikeList().then((res) => {
      if (res.data.status === 'success') {
        likeList.length = 0;
        likeList.push(...res.data.data.likeList)
        likeList.forEach((item, index) => {
          likeList[index].createdAt = moment(item.createdAt).format('YYYY/MM/DD HH:mm:ss');
        })
        console.log(likeList);
      }
    })
  }
  const cancelLike = (postId) => {
    apiPostLikes(postId).then((res) => {
      if (res.data.status === 'success'){
        getListList();
      }
    })
  }
  const getUserPost = (postId) => {
    apiGetPost(postId).then((res) => {
      console.log(res.data.data);
        router.push({ name: 'PersonPost' });

    })
  }
  getListList();
</script>

<template>
  <div>
    <h2 class="text-center border border-dark border-2 py-4 bg-white mb-4
          position-relative border-overlap border-overlap-start fw-bold">我按讚的貼文</h2>
    <ul class="list-unstyled">
      <li v-for="item in likeList" :key="item._id" class="border-shadow-bottom p-4 bg-white border border-dark border-2 rounded-3 mb-3">
        <div class="d-flex align-items-center">
          <img :src="item.avatar" alt="" class="img-fluid me-4 rounded-circle">
          <div class="w-100">
            <p class="fw-bold mb-0">{{item?.user?.name}}</p>
            <p class="text-black-50 mb-0">發布時間：{{item.createdAt}} </p>
          </div>
          <div class="d-flex me-6">
            <button @click="cancelLike(item._id)" class="btn btn-link text-decoration-none fw-bold">
              <i class="bi bi-hand-thumbs-up"></i>
              <span class="text-nowrap text-dark">取消</span>
            </button>
            <router-link :to="`/person/${item._id}`" class="btn btn-link link-dark text-decoration-none fw-bold">
              <i class="bi bi-arrow-right-circle"></i>
              <span class="text-nowrap">查看</span>
            </router-link>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

