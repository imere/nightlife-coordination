<template>
<div class="nav">

<notifications group="tip" position="top center" />
<i class="fas fa-angle-right"></i>

<div class="nav-top">
  <i class="fas fa-user-circle"></i>
  <div v-if="$store.state.user" class="username">{{ $store.state.user }}</div>
  <div v-else class="username" style="font-weight: 600;">Join and Enjoy</div>
  <div v-if="$store.state.user" class="logout" title="logout" @click="logout"><i class="fas fa-sign-out-alt"></i></div>
</div>
<div class="nav-content">
  <div class="wrap" v-if="$store.state.user">
    <div class="list">
      <div class="rec" v-for="(v, i) in list" :key="v.id">
        <a :href="v.url" target="_blank">{{ v.name }}</a>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="inputs">
      <div class="user">
        <input type="text" :class="[utest?'ok':'warn']" v-model.trim="user" @keyup.enter="login" placeholder="Username"/>
        <div class="user-info" @click="utip" @mouseenter.once="utip">
          <i class="fas fa-info-circle fa-fw"></i>
        </div>
      </div>
      <div class="pass">
        <input type="password" :class="[ptest?'ok':'warn']" v-model.trim="pass" @keyup.enter="login" placeholder="Password"/>
        <div class="pass-info" @click="ptip" @mouseenter.once="ptip">
          <i class="fas fa-info-circle fa-fw"></i>
        </div>
      </div>
    </div>
    <div class="buttons">
      <button type="button" @click="register">Register</button>
      <button type="button" @click="login">Login</button>
    </div>
  </div>
</div>
<div class="nav-bottom">
  <div><a href="https://www.linkedin.com/in/lu-z-3b15a8154/"><i class="fab fa-linkedin fa-fw"></i>imere</a></div>
</div>

</div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'nav-com',
  data () {
    return {
      user: '',
      pass: '',
      list: {}
    }
  },
  methods: {
    clear () {
      this.user = ''
      this.pass = ''
    },
    utip () {
      this.$notify({
        group: 'tip',
        text: '5-10 alphanum with leading alpha',
        duration: 2500
      })
    },
    ptip () {
      this.$notify({
        group: 'tip',
        text: '5-15 alphanum',
        duration: 2500
      })
    },
    async register () {
      let user = this.user
      let pass = this.pass
      if (!user || !pass) {
        this.$notify({
          group: 'tip',
          type: 'warn',
          text: 'input fileds required'
        })
      } else if (!/^[a-zA-Z]{1}[0-9a-zA-Z]{4,9}$/.test(user)) {
        return this.$notify({
          group: 'tip',
          type: 'error',
          text: 'invalid username'
        })
      } else if (!/^[0-9a-zA-Z]{5,15}$/.test(pass)) {
        return this.$notify({
          group: 'tip',
          type: 'error',
          text: 'invalid password'
        })
      } else {
        try {
          await axios.post('/user/register', { user, pass })
          this.$notify({
            group: 'tip',
            text: 'register success'
          })
        } catch (ex) {
          this.$notify({
            group: 'tip',
            type: 'error',
            text: ex.response.data.msg || ex.message
          })
          console.error(ex.message)
        }
      }
    },
    async login () {
      let user = this.user
      let pass = this.pass
      if (!user || !pass) {
        this.$notify({
          group: 'tip',
          type: 'warn',
          text: 'input fileds required'
        })
      } else if (!/^[a-zA-Z]{1}[0-9a-zA-Z]{4,9}$/.test(user)) {
        return this.$notify({
          group: 'tip',
          type: 'error',
          text: 'invalid username'
        })
      } else if (!/^[0-9a-zA-Z]{5,15}$/.test(pass)) {
        return this.$notify({
          group: 'tip',
          type: 'error',
          text: 'invalid password'
        })
      } else {
        try {
          await this.$store.dispatch('login', { user, pass })
          this.clear()
          this.$notify({
            group: 'tip',
            text: 'login success'
          })
          this.getList(user)
        } catch (ex) {
          this.$notify({
            group: 'tip',
            type: 'error',
            text: ex.response.data.msg || ex.message
          })
          console.error(ex)
        }
      }
    },
    async getList (paramUser) {
      let user = paramUser || this.$store.state.user
      try {
        let { data } = await axios.post('/mark/get', { user })
        this.list = data.marks
      } catch (ex) {
        this.$notify({
          group: 'tip',
          type: 'error',
          text: 'Get Data Error'
        })
      }
    },
    async logout () {
      await this.$store.dispatch('logout')
      this.list = {}
      this.$notify({
        group: 'tip',
        text: 'Logged out'
      })
    }
  },
  computed: {
    utest () {
      return /^[a-zA-Z]{1}[0-9a-zA-Z]{4,9}$/.test(this.user)
    },
    ptest () {
      return /^[0-9a-zA-Z]{5,15}$/.test(this.pass)
    }
  }
}
</script>
<style lang="scss">
@import '~/assets/conf.scss';
.nav {
  position: fixed;
  background-color: $primary;
  text-align: center;
  vertical-align: middle;
  opacity: 0.5;
  transition: all 0.1s cubic-bezier(0.4, 0.6, 0.3, 0.4);
  z-index: 200;
  overflow: hidden;
  user-select: none;
  .nav-top, .nav-content, nav-bottom {
    position: relative;
  }
  &>div {
    &>* {
      overflow: hidden;
    }
  }
  .nav-top {
    .logout {
      position: absolute;
      top: 50%;
      right: 20px;
      transform: translateY(-50%);
      display: inline-block;
      transition: all 0.2s linear;
      cursor: pointer;
      &:hover {
        color: rgba(200, 200, 200, 0.7);
      }
    }
  }
  .nav-content {
    .inputs {
      position: relative;
      width: 100%;
      .user, .pass {
        display: inline-block;
        position: relative;
        width: 90%;
        input {
          width: 100%;
          margin: 10px 0;
          padding-right: 30px;
          background-color: transparent;
          &.ok {
            border-color: #00ff00;
          }
          &.warn {
            border-color: #ff0000;
          }
        }
        .user-info, .pass-info {
          position: absolute;
          right: 0;
          bottom: 15px;
          width: 30px;
          height: 30px;
          &:hover {
            cursor: pointer;
            .fa-info-circle {
              color: rgba(250, 250, 250, 0.8);
            }
          }
        }
      }
    }
    .buttons {
      width: 100%;
      button {
        @include btn-pri;
        display: block;
        margin: 10px 0;
      }
    }
  }
  .nav-bottom {
    a {
      display: inline;
      transition: all 0.3s linear;
      &:hover {
        color: rgba(200, 200, 200, 0.7);
      }
      .fa-linkedin {
        line-height: 20px;
      }
    }
  }
  &:hover {
    padding-right: 0;
    opacity: 1;
    background-color: rgba(121, 85, 72, 0.8);
    .fa-angle-right {
      display: none;
    }
  }
}
@media (min-width: 770px) {
  .nav {
    width: $nav-w;
    height: 100%;
    padding-right: $nav-w;
    &>div {
      width: 100%;
      font-size: 1.4em;
    }
    .nav-top {
      height: 10%;
      .fa-user-circle {
        position: absolute;
        top: 50%;
        left: 20px;
        transform: translate(-50%, -50%);
      }
      .username {
        display: inline-block;
        max-width: 60%;
        line-height: 71.35px;
        text-align: right;
        -webkit-line-clamp: 1;
        text-overflow: ellipsis;
      }
    }
    .nav-content {
      height: 80%;
      padding: 60px 10px;
      &>div {
        width: 100%;
        overflow: hidden;
        text-align: center;
      }
      .buttons {
        button {
          width: inherit;
        }
      }
    }
    .nav-bottom {
      width: 100%;
      height: 10%;
      &>* {
        display: inline-block;
        width: 100%;
      }
    }
    &:hover {
      width: 300px;
    }
    .fa-angle-right {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      width: 30px;
      height: 30px;
      font-size: 3em;
      line-height: 30px;
      transition: all 0.2s, linear;
    }
  }
}
@media (max-width: 770px) {
  .nav {
    width: 100%;
    height: $nav-w;
    text-align: center;
    &>div {
      width: 100%;
      font-size: 1.4em;
      overflow: hidden;
    }
    .nav-top {
      width: 100%;
      height: $nav-w;
      .fa-user-circle {
        position: absolute;
        top: 50%;
        left: 20px;
        transform: translate(-50%, -50%);
      }
      .username {
        display: inline-block;
        max-width: 70%;
        line-height: $nav-w;
        text-align: center;
        -webkit-line-clamp: 1;
        text-overflow: ellipsis;
      }
    }
    .nav-content {
      width: 100%;
      height: 65%;
      padding: 0 5%;
      &>div {
        display: inline-block;
        width: 90%;
        overflow: hidden;
      }
      .buttons {
        display: flex;
        justify-content: space-around;
        button {
          max-width: 50%;
        }
      }
      .wrap {
        width: 100%;
        height: 100%;
        .list {
          width: 100%;
          height: 100%;
          display: flex;
          overflow-y: auto;
          flex-flow: row wrap;
          .rec {
            display: inline-block;
            max-width: 50%;
            max-height: min-content;
            padding-right: 30px;
            -webkit-line-clamp: 1;
            text-overflow: ellipsis;
            text-align: left;
            overflow: hidden;
          }
        }
      }
    }
    .nav-bottom {
      width: 100%;
      height: 10%;
      &>* {
        display: inline-block;
        width: 100%;
      }
    }
    &:hover {
      height: 300px;
    }
    .fa-angle-right {
      display: none;
    }
  }
}
</style>
