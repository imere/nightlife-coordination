<template>
  <div>
    <div v-if="typeof error.statusCode === 'number'">
      <p>{{ error.statusCode }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: [Object, String],
      default: () => ({})
    }
  },
  head () {
    return {
      title: Number(this.error.statusCode) || Error
    }
  }
}
</script>
