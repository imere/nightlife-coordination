<template>
<div class="nav">

<i class="fas fa-angle-right"></i>

<div class="nav-top">
  <i class="fas fa-user-circle"></i>
  <div v-if="$store.state.user" class="username">{{ $store.state.user }}</div>
  <div v-else class="username">Join</div>
</div>
<div class="nav-content">
  <div v-if="$store.state.user">
  </div>
  <div v-else>
    <div class="inputs">
      <div class="user">
        <input type="text" :class="[utest?'ok':'warn']" v-model.trim="user" />
        <div class="user-info">
          <i class="fas fa-info-circle fa-fw"></i>
        </div>
      </div>
      <div class="pass">
        <input type="password" :class="[ptest?'ok':'warn']" v-model.trim="pass" />
        <div class="pass-info">
          <i class="fas fa-info-circle fa-fw"></i>
        </div>
      </div>
    </div>
    <div class="buttons">
      <button type="button">Register</button>
      <button type="button">Login</button>
    </div>
  </div>
</div>
<div class="nav-bottom">
  <div><a href="https://www.linkedin.com/in/lu-z-3b15a8154/"><i class="fab fa-linkedin fa-fw"></i>imere</a></div>
</div>

</div>
</template>
<script>
export default {
  data () {
    return {
      user: '',
      pass: ''
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
  height: 100%;
  width: $nav-w;
  padding-right: $nav-w;
  background-color: $primary;
  text-align: center;
  vertical-align: middle;
  opacity: 0.5;
  transition: all 0.1s cubic-bezier(0.4, 0.6, 0.3, 0.4);
  z-index: 200;
  .nav-top, .nav-content, nav-bottom {
    position: relative;
  }
  &>div {
    &>* {
      overflow: hidden;
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
    .fa-angle-right {
      display: none;
    }
  }
}
@media (min-width: 770px) {
  .nav {
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
    height: 50px;
    opacity: 0.8;
    &:hover {
      height: 300px;
    }
    .fa-angle-right {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%, 50%) rotate(90deg);
      width: 30px;
      height: 30px;
      font-size: 3em;
      line-height: 30px;
      transition: all 0.2s, linear;
    }
  }
}
</style>
