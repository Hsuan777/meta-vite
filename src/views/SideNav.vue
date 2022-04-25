<template>
  <div class="px-6 py-8 border border-dark border-2 rounded bg-white">
    <router-link class="border-shadow btn btn-primary py-4 w-100 d-block mb-6"
      to="/postnewsfeed">張貼動態</router-link>
    <ul class="list-unstyled">
      <li class="mb-5">
        <a href="" class="d-flex align-items-center text-decoration-none">
          <img class="img-fluid me-4 rounded-circle border border-dark border-2 d-flex" src="https://fakeimg.pl/50x50/" alt="">
          <span href="#" class="text-black">邊緣小杰</span>
        </a>
      </li>
      <li class="mb-5">
        <a href="" class="d-flex align-items-center text-decoration-none">
          <div class="bg-third me-4 p-4 rounded-circle border border-dark border-2">
            <i class="bi bi-bell d-flex"></i>
          </div>
          <span href="#" class="text-black">追蹤名單</span>
        </a>
      </li>
      <li class="">
        <a href="" class="d-flex align-items-center text-decoration-none">
          <div class="bg-third me-4 p-4 rounded-circle border border-dark border-2">
            <i class="bi bi-hand-thumbs-up d-flex"></i>
          </div>
          <span href="#" class="text-black">我按讚的文章</span>
        </a>
      </li>
    </ul>
  </div>
</template>
