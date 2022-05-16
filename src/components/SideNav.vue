<template>
  <div class="px-6 py-8 border border-dark border-2 rounded bg-white">
    <router-link class="border-shadow btn btn-primary py-4 w-100 d-block mb-6"
      to="/post">張貼動態</router-link>
    <ul class="list-unstyled">
      <li class="mb-5">
        <router-link to="/user" class="d-flex align-items-center text-decoration-none link-dark">
          <img class="img-fluid me-4 rounded-circle border border-dark border-2 d-flex" src="https://fakeimg.pl/50x50/" alt="">
          邊緣小杰
        </router-link>
      </li>
      <li class="mb-5">
        <router-link to="/following" class="d-flex align-items-center text-decoration-none link-dark">
          <div class="bg-third me-4 p-4 rounded-circle border border-dark border-2">
            <i class="bi bi-bell d-flex"></i>
          </div>
          追蹤名單
        </router-link>
      </li>
      <li class="">
        <router-link to="/likes" class="d-flex align-items-center text-decoration-none link-dark">
          <div class="bg-third me-4 p-4 rounded-circle border border-dark border-2">
            <i class="bi bi-hand-thumbs-up d-flex"></i>
          </div>
          我按讚的文章
        </router-link>
      </li>
    </ul>
  </div>
</template>
