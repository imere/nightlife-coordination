<template>
  <div class="page">
    <nav-com />

    <div class="main">
      <header>
        <i class="fas fa-glass-martini" />
        <span>Nightlife Coordination</span>
      </header>

      <content-com />
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
.page {
  position: relative;
  .main {
    position: relative;
    display: flex;
    flex-flow: column wrap;
    width: 100%;
    padding: 0 $main-pad 0 $nav-w;
    text-align: center;
    background-color: $primary;
    header {
      padding-top: 70px;
      font-size: 40px;
      font-family: 'Courgette', cursive;
      user-select: none;
    }
  }
}
@media (max-width: 520px) {
  .page {
    .main {
      header {
        font-size: 30px;
        padding-top: 65px;
      }
    }
  }
}
</style>
