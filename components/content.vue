<template>
  <div class="content">
    <notifications
      group="alert"
      position="top center"
    />
    <div v-if="data.region && data.region.center">
      {{ 'You are at La:' + data.region.center.latitude.toFixed(4) + ' Lo:' + data.region.center.longitude.toFixed(4) }}
    </div>

    <div class="input-field">
      <div class="input">
        <input
          v-model.trim="loc.addr"
          v-focus
          type="text"
          @keyup.enter="get"
        >
        <label>input your location, or -></label>
        <i
          v-if="fetching"
          class="fas fa-spinner fa-pulse"
        />
        <i
          v-else
          class="fas fa-location-arrow"
          title="Get Position"
          @click="getPosition"
        />
      </div>
    </div>

    <section
      v-if="data.total"
      class="items container"
    >
      <div
        v-for="(v, i) in data.businesses"
        :key="i"
      >
        <item-com :chunk="v" />
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
  name: 'ContentCom',
  components: {
    ItemCom
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
  head () {
    return {
      script: [
        { src: '/label.js' }
      ]
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
      const { addr, longitude, latitude } = this.loc
      if (!addr && !longitude && !latitude) {
        return this.$notify({
          group: 'alert',
          type: 'warn',
          title: 'Invalid Request',
          text: 'Lack of Location Message'
        })
      }

      try {
        this.fetching = true
        const { data } = await axios.post('/getdata', {
          qstr: addr
            ? {
                location: addr
              }
            : {
                latitude,
                longitude
              }
        })
        this.data = data || {}
        this.clear()
      } catch (ex) {
        console.error(ex.message)
        this.$notify({
          group: 'alert',
          type: 'error',
          title: 'Request Faild',
          text: 'Invalid Location or Network Error'
        })
      } finally {
        this.fetching = false
      }
    },
    getPosition () {
      this.fetching = true
      navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
        this.fetching = false
        this.loc.latitude = latitude
        this.loc.longitude = longitude
        this.get()
      }, err => {
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
