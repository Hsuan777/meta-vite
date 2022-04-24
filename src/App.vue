<template>
  <div class="container-fluid bg-white border-bottom border-dark border-2">
    <NavbarView/>
  </div>
  <router-view/>
</template>

<script>
import NavbarView from '@/views/NavbarView.vue';

export default {
  components: {
    NavbarView,
  },
};
</script>

<style lang="scss">

</style>
