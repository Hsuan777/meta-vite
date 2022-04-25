<template>
  <div class="container pt-12">
    <div class="row">
      <div class="col-md-8">
        <h2 class="text-center border border-dark border-2 py-4 bg-white mb-4
          position-relative border-overlap border-overlap-start fw-bold">我按讚的貼文</h2>
        <ul class="list-unstyled">
          <li class="border-shadow-bottom p-4 bg-white border border-dark border-2 rounded-3">
            <div class="d-flex align-items-center">
              <img src="https://fakeimg.pl/40x40/" alt="" class="img-fluid me-4 rounded-circle">
              <div class="w-100">
                <p class="fw-bold mb-0">愛爾敏</p>
                <p class="text-black-50 mb-0">追蹤時間：2022/1/10 12:00 </p>
              </div>
              <div class="d-flex me-6">
                <button class="btn btn-link text-decoration-none fw-bold">
                  <i class="bi bi-hand-thumbs-up"></i>
                  <span class="text-nowrap text-dark">取消</span>
                </button>
                <button class="btn btn-link link-dark text-decoration-none fw-bold">
                  <i class="bi bi-arrow-right-circle"></i>
                  <span class="text-nowrap">查看</span>
                </button>
              </div>
            </div>
          </li>
        </ul>
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
