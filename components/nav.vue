<template>
<div class="nav">

<i class="fas fa-angle-right"></i>

</div>
</template>
<script>
</script>
<style lang="scss">
@import '~/assets/conf.scss';
.nav {
  position: absolute;
  height: 100%;
  width: $nav-w;
  background-color: rgba(80, 80, 80, 1);
  text-align: center;
  vertical-align: middle;
  opacity: 0.5;
  transition: opacity 0.4s cubic-bezier(0.4, 0.6, 0.3, 0.4);
  z-index: 1000;
  .fa-angle-right {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 30px;
    height: 30px;
    font-size: 3em;
    line-height: 30px;
    transition: all 0.2s, linear;
  }
  &:hover {
    opacity: 1;
    cursor: pointer;
  }
}
</style>
