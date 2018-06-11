<template>
<div class="item" :chunk="chunk">

  <div class="img">
    <img :src="v.image_url || altImg" :alt="v.alias" :title="v.alias"></img>
  </div>
  <div class="desc">
    <div class="name">
      <h5>{{ v.name }}</h5>
    </div>
    <div class="addr"><i class="fas fa-map-marker-alt fa-fw"></i> {{ v.location.display_address.join(', ') }}</div>
    <div class="dist"><i class="fas fa-road fa-fw"></i> {{ v.distance.toFixed(2) }}</div>
    <div class="coords"><i class="fas fa-globe fa-fw"></i> {{ 'La:' + v.coordinates.latitude.toFixed(4) + ' Lo:' + v.coordinates.longitude.toFixed(4) }}</div>
    <div class="rating">
      <i class="fas fa-star fa-fw"></i> {{ v.rating }}
    </div>
    <div class="phone">
      <i class="fas fa-phone fa-rotate-90 fa-fw"></i> {{ v.display_phone }}
    </div>
  </div>
  <div class="operations">
    <button type="button" ><a :href="v.url" target="_blank">Have a Look</a></button>
    <button type="button" :title="$store.state.user?'':'Login to use'" @click="mark">Mark</button>
  </div>

</div>
</template>
<script>
import axios from 'axios'
import { altImg } from '~/config/config'
export default {
  name: 'item-com',
  props: ['chunk'],
  data () {
    return {
      altImg: altImg,
      v: this.chunk
    }
  },
  methods: {
    async mark () {
      if (!this.$store.state.user) {
        this.$notify({
          group: 'alert',
          type: 'warn',
          text: 'login to mark'
        })
      } else {
        let user = this.$store.state.user
        let mark = JSON.stringify(this.chunk)
        try {
          await axios.post('/mark/add', { user, mark })
          this.$notify({
            group: 'alert',
            text: 'marked'
          })
        } catch (ex) {
          console.error(ex)
          this.$notify({
            group: 'alert',
            type: 'error',
            text: ex.response.data.msg || ex.message
          })
        }
      }
    }
  }
}
</script>
<style lang="scss">
@import '~/assets/conf.scss';
.item {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  width: 100%;
  padding: 20px 30px;
  margin: 1rem 0;
  align-self: center;
  background-color: $item-bg-co;
  transition: all 0.4s cubic-bezier(0.23, 0.38, 0, 1.08);
  &:hover {
    transform: translateY(-3px);
    box-shadow: $item-shadow-hover;
  }
  * {
    max-width: 100%;
  }
  .img {
    width: 200px;
    height: 150px;
    border-radius: 3px;
    overflow: hidden;
    img {
      width: inherit;
      height: inherit;
    }
  }
  .desc {
    flex-grow: 1;
    padding: 0 20px;
    cursor: context-menu;
    &>div {
      display: flex;
      display: -webkit-box;
      padding: 4px 0;
    }
    .name {
      font-family: 'Tauri', sans-serif;
      * {
        margin: 0;
      }
    }
  }
  .operations {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 20px 0;
    button {
      width: 100%;
      margin: 0 10px;
      @include btn-pri;
    }
  }
}
@media (max-width: 520px) {
  .item {
    .img {
      width: 160px;
      height: 120px;
    }
  }
}
@media (max-width: 550px) {
  .item {
    .desc {
      &>div {
        display: inline-block;
        margin: 0 auto;
      }
      &:not(:nth-of-type(1)) {
        font-size: 1em;
      }
    }
    .operations {
      button {
        border-width: 0;
        max-width: 50%;
        &:nth-of-type(1) {
          border-color: $primary;
          border-right-width: 1px;
        }
        &:nth-of-type(2) {
          border-color: $primary;
          border-left-width: 1px;
        }
      }
    }
  }
}
@media (max-width: 770px) {
  .items {
    .item {
      .img {
        margin: 0 auto;
      }
    }
  }
}
@media (max-width: 991px) {
  .item {
    .operations {
      display: block;
      width: 100%;
      button {
        margin: 3px auto;
      }
    }
  }
}
</style>
