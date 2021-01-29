import Vue from 'vue'

Vue.use({
  install (instance) {
    instance.directive('focus', function (el) {
      el.focus()
    })
  }
})
