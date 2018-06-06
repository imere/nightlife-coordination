<template>
<div class="page">

<nav-com/>

<div class="main">

  <header>
    <i class="fas fa-glass-martini"></i>
    <span>Nightlife Coordination</span>
  </header>

  <content-com/>

</div>

</div>
</template>
<script>
import NavCom from '~/components/nav.vue'
import ContentCom from '~/components/content.vue'
export default {
  components: {
    NavCom,
    ContentCom
  }
}
</script>
<style lang="scss">
@import '~/assets/conf.scss';
.page {
  position: relative;

  .main {
    position: relative;
    display: flex;
    flex-flow: column wrap;
    width: 100%;
    padding: 0 $main-pad 0 ($nav-w + $main-pad);
    text-align: center;
    background-color: $primary;
    header {
      padding-top: 100px;
      font-size: 40px;
      font-family: "Agnes-Bold", Helvetica, Georgia, "sans-serif";
      user-select: none;
    }
  }
}
</style>
