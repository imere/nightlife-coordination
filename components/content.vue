<template>
<div class="content">

<notifications group="alert" position="top center" />
<div v-if="data.region && data.region.center">
  {{ 'You are at La:' + data.region.center.latitude.toFixed(4) + ' Lo:' + data.region.center.longitude.toFixed(4) }}
</div>

<div class="input-field">
  <div class="input">
    <input type="text" v-focus v-model.trim.focus="loc.addr" @keyup.enter="get"/>
    <label>input your location, or -></label>
    <i v-if="fetching" class="fas fa-spinner fa-pulse"></i>
    <i v-else class="fas fa-location-arrow" title="Get Position" @click="getPosition"></i>
  </div>
</div>

<section class="items container" v-if="data.total">
  <div class="item" v-for="(v, i) in data.businesses" :key="i">
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
      <button type="button" :title="$store.state.user?'':'Login to use'" :chunk="v" @click="mark">Mark</button>
    </div>
  </div>
</section>

<section v-else>
  <p>Nothing to Show</p>
</section>

</div>
</template>
<script>
import axios from 'axios'
import { altImg } from '~/config/config'
import { dats } from '~/config/test'
export default {
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
  data () {
    return {
      altImg: altImg,
      fetching: false,
      data: dats || {},
      loc: {
        addr: '',
        latitude: null,
        longitude: null
      }
    }
  },
  methods: {
    clear () {
      this.loc = {
        addr: '',
        latitude: null,
        longitude: null
      }
    },
    async get () {
      this.fetching = true
      let qstr = {}
      if (this.loc.addr) {
        qstr = {
          location: this.loc.addr
        }
      } else if (this.loc.latitude && this.loc.longitude) {
        qstr = {
          latitude: this.loc.latitude,
          longitude: this.loc.longitude
        }
      } else {
        this.fetching = false
        return this.$notify({
          group: 'alert',
          type: 'warn',
          title: 'Invalid Request',
          text: 'Lack of Location Message'
        })
      }
      try {
        let { data } = await axios.post('/getdata', { qstr })
        this.data = data || {}
        console.log(data)
        this.fetching = false
        this.clear()
      } catch (ex) {
        this.fetching = false
        console.error(ex.message)
        this.$notify({
          group: 'alert',
          type: 'error',
          title: 'Request Faild',
          text: 'Invalid Location or Network Error'
        })
      }
    },
    getPosition (ev) {
      this.fetching = true
      navigator.geolocation.getCurrentPosition(v => {
        this.loc.latitude = v.coords.latitude
        this.loc.longitude = v.coords.longitude
        this.get()
      }, err => {
        this.fetching = false
        console.error(err)
        this.$notify({
          group: 'alert',
          type: 'error',
          text: err.message,
          duration: 2500
        })
      })
    },
    async mark (ev) {
      console.log(ev.currentTarget.getAttribute('chunk'))
      if (!this.$store.state.user) {
        this.$notify({
          group: 'alert',
          type: 'warn',
          text: 'login to mark'
        })
      } else {
        let user = this.$store.state.user
        try {
          await axios.post('/marks/add', { user })
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
.content {
  .input-field {
    margin: 50px auto 40px;
    .input {
      position: relative;
      display: inline;
      width: 100%;
      height: 100%;
      font-size: 1.5rem;
      input {
        max-width: 100%;
        max-height: 100%;
        margin-bottom: -2px;
        background-color: transparent;
        border-width: 0;
        border-bottom: 1px solid $input-bottom-co;
        padding: 0 (20px + $ic-location-pad * 2) 0 0;
        transition: all 0.2s cubic-bezier(0.15, 0.49, 0.62, 1.04);
        &:focus {
          outline: none;
          border-bottom-width: 2px;
          border-bottom-color: $input-bottom-co-focus;
        }
      }
      label {
        position: absolute;
        left: 0;
        top: 0;
        font-size: 1em;
        height: 100%;
        pointer-events: none;
        transition: all 0.5s cubic-bezier(0.6, 0.4, 0.3, 0.6);
        user-select: none;
      }
      .fa-location-arrow {
        position: absolute;
        top: 50%;
        right: $ic-location-pad;
        width: 20px;
        height: 20px;
        line-height: 20px;
        transform: translateY(-50%);
        cursor: pointer;
        transition: all 1.5s, linear;
        opacity: 1;
        &:hover {
          opacity: 0.7;
        }
      }
      .fa-spinner {
        position: absolute;
        top: 25%;
        right: $ic-location-pad;
        line-height: 20px;
        transform: translateY(-50%);
      }
    }
  }
  .items {
    display: block;
    padding: 20px 0;
    border-top: 1px solid;
    border-bottom: 1px solid;
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
  }
}
@media (max-width: 410px) {
  .content {
    .input-field {
      .input {
        label {
          font-size: 0.7em;
        }
      }
    }
  }
}
@media (max-width: 520px) {
  .content {
    .items {
      .item {
        .img {
          width: 160px;
          height: 120px;
        }
      }
    }
  }
}
@media (max-width: 550px) {
  .content {
    .items {
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
  }
}
@media (max-width: 770px) {
  .content {
    .input-field {
      margin: 30px auto 20px;
    }
    .items {
      .item {
        .img {
          margin: 0 auto;
        }
      }
    }
  }
}
@media (max-width: 991px) {
  .content {
    .items {
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
  }
}
</style>
