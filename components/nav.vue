<template>
  <div class="nav">
    <notifications
      group="tip"
      position="top center"
    />
    <i class="fas fa-angle-right" />

    <div class="nav-top">
      <i class="fas fa-user-circle" />
      <div
        v-if="$store.state.user"
        class="username"
      >
        {{ $store.state.user }}
      </div>
      <div
        v-else
        class="username"
        style="font-weight: 600;"
      >
        Join and Enjoy
      </div>
      <div
        v-if="$store.state.user"
        class="logout"
        title="logout"
        @click="logout"
      >
        <i class="fas fa-sign-out-alt" />
      </div>
    </div>
    <div class="nav-content">
      <div
        v-if="$store.state.user"
        class="wrap"
      >
        <div class="list">
          <div
            v-for="(v, i) in list"
            :id="v.id"
            :key="i"
            class="rec"
          >
            <a
              :href="v.url"
              :title="v.alias"
              target="_blank"
            >{{ v.name }}</a>
            <i
              class="far fa-trash-alt"
              :data-id="v.id"
              @click="delmark"
            />
          </div>
        </div>
      </div>
      <div v-else>
        <div class="inputs">
          <div class="user">
            <input
              v-model.trim="user"
              type="text"
              :class="[utest?'ok':'warn']"
              placeholder="Username"
              @keyup.enter="login"
            >
            <div
              class="user-info"
              @click="utip"
              @mouseenter.once="utip"
            >
              <i class="fas fa-info-circle fa-fw" />
            </div>
          </div>
          <div class="pass">
            <input
              v-model.trim="pass"
              type="password"
              :class="[ptest?'ok':'warn']"
              placeholder="Password"
              @keyup.enter="login"
            >
            <div
              class="pass-info"
              @click="ptip"
              @mouseenter.once="ptip"
            >
              <i class="fas fa-info-circle fa-fw" />
            </div>
          </div>
        </div>
        <div class="buttons">
          <button
            type="button"
            @click="register"
          >
            Register
          </button>
          <button
            type="button"
            @click="login"
          >
            Login
          </button>
        </div>
      </div>
    </div>
    <div class="nav-bottom">
      <div><a href="https://www.linkedin.com/in/lu-z-3b15a8154/"><i class="fab fa-linkedin fa-fw" />imere</a></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'NavCom',
  data () {
    return {
      user: '',
      pass: '',
      list: {}
    }
  },
  computed: {
    utest () {
      return /^[a-zA-Z]{1}[0-9a-zA-Z]{4,9}$/.test(this.user)
    },
    ptest () {
      return /^[0-9a-zA-Z]{5,15}$/.test(this.pass)
    }
  },
  mounted () {
    if (this.$store.state.user) {
      this.getList()
      this.$root.$on('getList', this.getList)
    }
  },
  beforeUnmount () {
    this.$root.$off('getList')
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
      const user = this.user
      const pass = this.pass
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
      const user = this.user
      const pass = this.pass
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
          this.$root.$on('getList', this.getList)
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
      const user = paramUser || this.$store.state.user
      try {
        const { data } = await axios.post('/mark/get', { user })
        this.list = data.marks
      } catch (ex) {
        this.$notify({
          group: 'tip',
          type: 'error',
          text: 'Get Marks Error'
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
      this.$root.$off('getList')
    },
    async delmark (ev) {
      const user = this.$store.state.user
      const tg = ev.currentTarget
      const id = tg.dataset.id
      if (!user || !id) {
        return this.$noitfy({
          group: 'tip',
          type: 'error',
          text: 'Bad Request'
        })
      } else {
        const f = confirm('confirm to delete')
        if (f) {
          try {
            await axios.post('/mark/del', { user, id })
            tg.parentNode.parentNode.removeChild(tg.parentNode)
            this.$notify({
              group: 'tip',
              text: 'unmarked'
            })
          } catch (ex) {
            console.error(ex)
            this.$notify({
              group: 'tip',
              type: 'error',
              text: ex.response.data.msg || ex.message
            })
          }
        }
      }
    }
  }
}
</script>

<style lang="scss">
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
    .wrap {
      .list {
        .rec {
          position: relative;
          .fa-trash-alt {
            position: absolute;
            width: 30px;
            height: 30px;
            line-height: 30px;
            cursor: pointer;
          }
          &>* {
            transition: all 0.2s linear;
            &:hover {
              color: rgb(200, 200, 200);
            }
          }
        }
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
      .wrap {
        width: 100%;
        height: 100%;
        .list {
          width: 100%;
          height: 100%;
          display: flex;
          overflow-y: auto;
          flex-direction: column;
          .rec {
            display: inline-block;
            width: 100%;
            max-height: 40px;
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
          overflow-y: auto;
          .rec {
            display: inline-block;
            width: 90%;
            max-height: 35px;
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
