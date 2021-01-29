<template>
  <div class="wrapper">
    <div class="mask" />
    <nuxt />
  </div>
</template>

<style lang="scss">
.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background-color: $primary;
}
</style>
