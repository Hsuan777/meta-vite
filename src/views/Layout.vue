<template>
  <div class="container-fluid bg-white border-bottom border-dark border-2">
    <Navbar/>
  </div>
  <div class="container pt-12">
    <div class="row">
      <div class="col-md-8">
        <router-view/>
      </div>
      <div class="col-md-4">
        <SideNav/>
      </div>
    </div>
  </div>
  
</template>

<!-- <script>
import Navbar from '@/components/Navbar.vue';
import SideNav from '@/components/SideNav.vue';

export default {
  components: {
    Navbar,
    SideNav
  },
};
</script> -->

<script setup>
import Navbar from '@/components/Navbar.vue';
import SideNav from '@/components/SideNav.vue';

</script>

<style lang="scss">

</style>
