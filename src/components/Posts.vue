<script setup>
  import { ref, reactive } from 'vue';
  import moment from 'moment';
  import { authStore } from '@/store/auth';
  import { 
    apiGetPost,
    apiGetPosts,
    apiPostLikes,
    apiPostComment,
    apiDeleteComment } from '@/apis/metawall.js'

  const auth = authStore();

  const inputQuery = ref("");
  const currentTimeSort = ref("desc");
  const postsData = reactive([]);
  
  const changeSort = (timeSort) => {
    currentTimeSort.value = timeSort;
    const query = inputQuery.value !== "" 
      ? `timeSort=${timeSort}&q=${inputQuery.value}` : `timeSort=${timeSort}`;
    apiGetPosts(query).then((res) => {
      if (res.data.status === 'success') {
        updateData(res.data.data);
      }
    })  
  }
  const searchData = () => {
    const query = `q=${inputQuery.value}&timeSort=${currentTimeSort.value}`;
    apiGetPosts(query).then((res) => {
      updateData(res.data.data)
    }) 
  }
  const updateData = (data) => {
    postsData.length = 0;
    postsData.push(...data);
    postsData.forEach((item, index) => {
      postsData[index].createdAt = moment(item.createdAt).format('YYYY/MM/DD h:mm:ss');
    })
  }
  const postLikes = (postId) => {
    apiPostLikes(postId).then((res) => {
      if (res.data.status === 'success'){
        renderPostData(postId);
      }
    })
  }
  const renderPostData = (postId) => {
    apiGetPost(postId).then((res) => {
      if (res.data.status === 'success') {
        console.log(res.data.data);
        postsData.forEach((item, index) => {
          if (item._id === res.data.data._id) {
            postsData[index].likes = res.data.data.likes;
            postsData[index].comments = res.data.data.comments;
          }
        })
      }
    })
  }
  const currentPostId = ref('');
  const inputComment = ref('');
  const openComment = (postId) => {
    currentPostId.value = postId;
  }
  const postComment = (postId) => {
    apiPostComment(postId, {comment: inputComment.value}).then((res) => {
      if (res.data.status === 'success') {
        renderPostData(postId);
        inputComment.value = '';
      }
    }).catch((err) => {
      console.log(err);
      console.log('留言失敗');
    })
  }
  const deleteComment = (commentId) => {
    apiDeleteComment(commentId).then((res) => {
      if (res.data.status === 'success') {
        renderPostData(currentPostId.value);
      }
    })
  }
  apiGetPosts().then((res) => {
    updateData(res.data.data);
  })
</script>

<template>
  <div>
    <div class="d-flex align-items-center mb-4">
      <select @change="changeSort($event.target.value)" class="form-select border border-dark border-2 w-25 me-4 bg-white"
        aria-label="last news feed">
        <option selected value="desc">最新貼文</option>
        <option value="asc">從舊到新</option>
      </select>
      <div class="input-group">
        <input v-model="inputQuery" @keyup.enter="searchData" type="text" class="form-control border border-dark border-2 bg-white"
          placeholder="搜尋貼文"
          aria-label="search post" aria-describedby="search post">
        <button @click="searchData" class="btn btn-primary" type="button">
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
          <div class="d-flex border-top pt-2 mb-5">
            <button @click="postLikes(item['_id'])" class="btn btn-link text-decoration-none d-flex algin-items-center">
              <i class="bi bi-hand-thumbs-up me-2"></i>
              {{item.likes.length}}
            </button>
            <input @click="openComment(item['_id'])" type="button" value="留言" class="btn btn-link text-decoration-none">
          </div>
          <div v-if="currentPostId === item['_id']">
            <div class="input-group mb-5">
              <img :src="auth.user.avatar" :alt="auth.user.name" class="rounded-circle me-3" style="width: 45px; height: 45px;">
              <input type="text" v-model="inputComment" @keyup.enter="postComment(item['_id'])" class="form-control border border-dark border-2 bg-white"
                placeholder="留言..."
                aria-label="search post" aria-describedby="search post">
              <input @click="postComment(item['_id'])" type="button" value="送出留言" class="btn btn-primary">
            </div>
          </div>
          <ul v-if="item.comments.length > 0" class="list-unstyled">
            <li v-for="record in item.comments" class="bg-light p-4 rounded-3 mb-5">
              <div class="d-flex align-items-center mb-1">
                <img class="rounded-circle" :src="item.user.avatar" alt="" style="width: 45px; height: 45px;">
                <p class="ms-4 mb-0">{{item.user.name}}<br><span class="text-black-50">{{item.createdAt}}</span></p>
              </div>
              <p class="ms-8 ps-7 mb-0 d-flex justify-content-between">
                {{record.comment}}
                <span @click="deleteComment(record._id)" class="text-secondary">刪除</span>
              </p>
            </li>
          </ul>
        </li>
      </template>
    </ul>
  </div>
</template>

