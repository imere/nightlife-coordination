<template>
<div class="wrapper">

<div class="mask">
</div>
<nuxt/>

</div>
</template>
<style lang="scss">
@import '~/assets/conf.scss';
.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>
