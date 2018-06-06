<template>
  <div class="loading" v-if="loading">
    <p>Loading.....</p>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: true
  }),
  mounted () {
    this.loading = false
  },
  methods: {
    finish () {
      this.loading = false
    }
  }
}
</script>

<style scoped>
  .loading {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(150, 150, 150, 0.7);
    text-align: center;
    padding-top: 100px;
    font-size: 30px;
    z-index: 9999;
  }
</style>
