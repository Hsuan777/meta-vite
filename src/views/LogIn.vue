<template>
  <!-- eslint-disable -->
  <div class="container d-flex align-items-center vh-100">
    <div class="row justify-content-center align-items-center w-100">
      <div class="col-md-4">
        <img src="@/assets/images/metawall.svg" alt="" class="ms-auto">
      </div>
      <div class="col-md-4 text-center">
        <h1 class="text-primary">MetaWall</h1>
        <p>到元宇宙展開全新社交圈</p>
        <from>
          <div class="form-floating mb-3">
            <input type="email" class="form-control border-dark border-2 bg-white" id="floatingInput"
              placeholder="name@example.com">
            <label for="floatingInput">Email address</label>
          </div>
          <div class="form-floating mb-5">
            <input type="password" class="form-control border-dark border-2 bg-white"
              id="floatingPassword" placeholder="Password">
            <label for="floatingPassword">Password</label>
          </div>
          <p class="d-none text-danger mb-2">帳號或密碼錯誤，請重新輸入！</p>
          <input type="submit" value="登入" class="border-shadow btn btn-primary w-100 btn-block py-3 mb-2">
          <router-link to="/signup" class="text-decoration-none">註冊帳號</router-link>
        </from>
      </div>
    </div>
  </div>
</template>
