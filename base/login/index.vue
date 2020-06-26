<!--
  User: xxxxxxx
  Date: 2017/11/13
  功能：xxxxxx
-->

<template>
  <div class="login-container">
    <yd-navbar title="登录">
    </yd-navbar>
    <yd-cell-group>
      <yd-cell-item class="companyCode">
        <icon-svg slot="icon" :icon-class="user"></icon-svg>
        <span slot="left"></span>
        <yd-input slot="right" required v-model="loginForm.companyCode" max="20" placeholder="请输入企业号"></yd-input>
      </yd-cell-item>

      <yd-cell-item class="user">
        <icon-svg slot="icon" :icon-class="user"></icon-svg>
        <span slot="left"></span>
        <yd-input slot="right" required v-model="loginForm.username" max="20" placeholder="请输入用户名"></yd-input>
      </yd-cell-item>
      <yd-cell-item class="pwd">
        <icon-svg slot="icon" :icon-class="password"></icon-svg>
        <span slot="left"></span>
        <yd-input slot="right" type="password" v-model="loginForm.password" placeholder="请输入密码"></yd-input>
      </yd-cell-item>
    </yd-cell-group>
    <yd-button-group>
      <yd-button size="large" @click.native="handleLogin">登录</yd-button>
    </yd-button-group>
  </div>
</template>

<script type="text/ecmascript-6">
  import * as config from 'api/config'
  import iconSvg from '@/base/Icon-svg/index'
  export default {
    name: 'login',
    data () {
      return {
        loginForm: {
          companyCode: '80000000',
          username: '90032',
          password: '868686'
        },
        user: 'user',
        password: 'password'
      }
    },
    methods: {
      showPwd () {
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      },
      handleLogin () {
        this.$dialog.loading.open('正在登录...')
        this.$store.dispatch('LoginByUsername', this.loginForm).then((res) => {
          this.$dialog.loading.close()
          if (res === config.ERR_OK) {
            this.$router.replace({path: '/'})
          } else {
            this.switchError(res)
            this.$dialog.notify({mes: `登录失败，${this.errorText}，请重试!`, timeout: 3000})
          }
        }).catch((res) => {
          this.switchError(res)
          this.$dialog.loading.close()
          this.$dialog.notify({mes: `登录失败，${this.errorText}，请重试!`, timeout: 3000})
        })
      },
      switchError (num) {
        switch (num) {
          case config.NO_USER:
            this.errorText = '用户不存在'
            break
          case config.LIMIT_LOGIN:
            this.errorText = '用户被限制登录'
            break
          case config.ERR_PWD:
            this.errorText = '密码错误'
            break
          case config.DOUBLE_DEVICE:
            this.errorText = '多设备登录'
            break
          case config.NO_ACTIVE:
            this.errorText = '用户未激活'
            break
          case config.STOP_USER:
            this.errorText = '用户已停用'
            break
          default:
            this.errorText = '登录失败'
        }
      }
    },
    created () {
      // window.addEventListener('hashchange', this.afterQRScan)
    },
    destroyed () {
      // window.removeEventListener('hashchange', this.afterQRScan)
    },
    components: {
      iconSvg
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/variable.styl"
  @import "~common/css/mixin.styl"
  .login-container
    position fixed
    top 0
    left 0
    bottom 0
    width 100%
    height 100%
    background #ffffff
    z-index 50
    .yd-cell-left
      color #999999
      .svg-icon
        width 0.32rem
  .yd-input-success:after
    color: $color !important
  .yd-input-password-open:after
    color: #b2b2b2 !important
</style>
