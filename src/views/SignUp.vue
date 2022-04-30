<template>
  <!-- eslint-disable -->
  <div class="container d-flex align-items-center vh-100">
    <div class="row justify-content-center align-items-center w-100">
      <div class="col-md-4">
        <img src="@/assets/images/metawall.svg" alt="" class="ms-auto">
      </div>
      <div class="col-md-4 text-center">
        <h1 class="text-primary">MetaWall</h1>
        <p>註冊</p>
        <from>
          <div class="form-floating mb-3">
            <input type="text" class="form-control border-dark border-2 bg-white"
              id="floatingInput" placeholder="暱稱">
            <label for="floatingInput">暱稱</label>
            <p class="d-none text-danger mt-1 mb-2">暱稱至少 2 個字元以上</p>
          </div>
          <div class="form-floating mb-3">
            <input type="email" class="form-control border-dark border-2 bg-white"
              id="floatingEmail" placeholder="name@example.com">
            <label for="floatingEmail">Email address</label>
            <p class="d-none text-danger mt-1 mb-2">帳號已被註冊，請替換新的 Email！</p>
          </div>
          <div class="form-floating mb-5">
            <input type="password" class="form-control border-dark border-2 bg-white"
              id="floatingPassword" placeholder="Password">
            <label for="floatingPassword">Password</label>
            <p class="d-none text-danger mt-1 mb-2">密碼需至少 8 碼以上，並中英混合</p>
          </div>
          <input type="submit" value="註冊" class="btn btn-secondary w-100 btn-block py-3 mb-2">
          <router-link to="/" class="text-decoration-none">登入</router-link>
        </from>
      </div>
    </div>
  </div>
</template>
