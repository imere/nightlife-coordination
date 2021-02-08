import Vue from 'vue'

Vue.use({
  install (instance) {
    instance.directive('focus', {
      inserted (el) {
        el.focus()
      }
    })
  }
})
