<template>
<div class="content container">

<div class="input-field">
  <div class="input">
    <input type="text" v-model.trim="loc.addr" @keyup.enter="get"/>
    <label>input your location, or -></label>
    <i class="fas fa-location-arrow" @click="getLocation"></i>
  </div>
</div>

<div class="items" v-if="this.data[0]">
  <div class="item" v-for="i in 15">{{ i }}</div>
</div>

</div>
</template>
<script>
import axios from 'axios'
import qs from 'qs'
import { token } from '~/config/token.js'
export default {
  data () {
    return {
      fetching: false,
      data: [],
      loc: {
        addr: '',
        latitude: null,
        longitude: null
      }
    }
  },
  methods: {
    clear () {
      this.location = ''
      this.loc = {
        addr: '',
        latitude: null,
        longitude: null
      }
    },
    async get () {
      this.fetching = true
      let config = {
        headers: {'Authorization': token, 'Content-type': 'x-www-form-urlencoded'}
      }
      if (this.loc.addr) {
        config.params = qs.stringify({
          term: 'bar',
          location: this.loc.addr
        })
      } else if (this.loc.latitude && this.loc.longitude) {
        config.params = qs.stringify({
          term: 'bar',
          latitude: this.loc.latitude,
          longitude: this.loc.longitude
        })
      } else {
        return alert('Lack of Location Message')
      }
      try {
        console.log(config)
        let { data } = await axios.get('https://api.yelp.com/v3/businesses/search', config)
        this.data = JSON.parse(data).businesses || []
        console.log(data)
        this.fetching = false
        this.clear()
      } catch (ex) {
        this.fetching = false
        alert(ex.message)
      }
    },
    getLocation (ev) {
      navigator.geolocation.getCurrentPosition(v => {
        this.loc = v
      }, err => {
        console.error(err)
        alert('get position faild')
      })
    }
  }
}
</script>
<style lang="scss">
@import '~/assets/conf.scss';
.content {
  .input-field {
    margin: 60px auto 40px;
    .input {
      position: relative;
      display: inline;
      font-size: 1.5rem;
      input {
        margin-bottom: -2px;
        background-color: transparent;
        border-width: 0;
        border-bottom: 1px solid $input-bottom-co;
        padding: 0 (20px + $ic-location-pad * 2) 0 0;
        &:focus {
          outline: none;
          border-bottom-width: 2px;
        }
      }
      label {
        position: absolute;
        left: 0;
        pointer-events: none;
        transition: all 1s cubic-bezier(0.6, 0.4, 0.3, 0.6);
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
    }
  }
  .items {
    display: flex;
    flex-flow: row wrap;
  }
}
</style>
