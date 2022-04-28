<template>
  <div class="container pt-12">
    <div class="row">
      <div class="col-md-8">
        <h2 class="text-center border border-dark border-2 py-4 bg-white mb-4
          position-relative border-overlap border-overlap-start fw-bold">追蹤名單</h2>
        <ul class="list-unstyled">
          <li class="border-shadow-bottom p-4 bg-white border border-dark border-2 rounded-3">
            <div class="d-flex align-items-center">
              <img src="https://fakeimg.pl/40x40/" alt="" class="img-fluid me-4 rounded-circle">
              <div class="w-100">
                <p class="mb-0">愛</p>
                <p class="d-flex mb-0">
                  <span class="text-black-50">追蹤時間：2022/1/10 12:00</span>
                  <span class="ms-auto">您已追蹤 90 天！</span>
                </p>
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
