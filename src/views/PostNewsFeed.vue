<template>
  <div class="container pt-12">
    <div class="row">
      <div class="col-md-8">
        <h2 class="text-center border border-dark border-2 py-4 bg-white mb-4
          position-relative border-overlap border-overlap-start">張貼動態</h2>
        <div class="p-8 shadow-lg border border-dark border-2 rounded bg-white">
          <!-- eslint-disable-next-line -->
          <label for="newsFeedTextarea" class="mb-1 d-block">貼文內容</label>
          <textarea name="" id="newsFeedTextarea"
            cols="30" rows="10" class="w-100 mb-4 border border-dark border-2"></textarea>
          <input type="button" value="上傳圖片" class="btn btn-dark px-8 py-1 mb-4">
          <img src="" alt="" class="d-none mb-8">
          <div class="d-flex justify-content-center">
             <input type="button" class="w-50 mx-auto py-4 btn btn-secondary bg-black-50"
               value="送出貼文">
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <SideNav/>
      </div>
    </div>
  </div>
</template>
<script>
import SideNav from '@/views/SideNav.vue';

export default {
  components: {
    SideNav,
  },
};
</script>
