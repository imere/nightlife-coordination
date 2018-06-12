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
  <div v-for="(v, i) in data.businesses" :key="i">
    <item-com :chunk="v"/>
  </div>
</section>

<section v-else>
  <p>Nothing to Show</p>
</section>

</div>
</template>
<script>
import axios from 'axios'
import ItemCom from './item.vue'
export default {
  name: 'content-com',
  head () {
    return {
      script: [
        { src: '/label.js' }
      ]
    }
  },
  components: {
    ItemCom
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
  data () {
    return {
      fetching: false,
      data: {},
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
    getPosition () {
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
@media (max-width: 770px) {
  .content {
    .input-field {
      margin: 30px auto 20px;
    }
  }
}
</style>
