<template>
  <div>
    <div class="d-flex align-items-center mb-4">
      <select class="form-select border border-dark border-2 w-25 me-4 bg-white"
        aria-label="last news feed">
        <option selected value="last">最新貼文</option>
        <option value="old">從舊到新</option>
      </select>
      <div class="input-group">
        <input type="text" class="form-control border border-dark border-2 bg-white"
          placeholder="搜尋貼文"
          aria-label="search post" aria-describedby="search post">
        <button class="btn btn-primary" type="button">
          <i class="bi bi-search"></i>
        </button>
      </div>
    </div>
    <ul class="list-unstyled">
      <li class="border-shadow-bottom p-8 border border-dark border-2 rounded bg-white">
        <div class="d-flex align-items-center mb-4">
          <img class="rounded-circle" src="https://fakeimg.pl/45x45/" alt="">
          <p class="ms-4 mb-0">name<br><span class="text-black-50">2022/1/10 12:00</span></p>
        </div>
        <p class="mb-2">外面看起來就超冷....<br>我決定回被窩繼續睡.... </p>
        <img class="img-fluid rounded" src="https://fakeimg.pl/1024x250" alt="">
      </li>
    </ul>
  </div>
</template>
<script>

export default {
};
</script>
