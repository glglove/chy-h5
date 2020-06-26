<!--
  User: fanqingyu
  Date: 2017/6/23 16:10
  功能：
-->

<template>
  <div class="footer-tab">
    <yd-tabbar>
      <yd-tabbar-item title="企信" link="/home" type="link" tag="div">
        <yd-icon name="home" slot="icon"></yd-icon>
      </yd-tabbar-item>
      <yd-tabbar-item title="应用" link="/application" type="link" tag="div">
        <yd-icon name="like" slot="icon"></yd-icon>
      </yd-tabbar-item>
      <yd-tabbar-item title="工作" link="/work" type="link" tag="div">
        <yd-icon name="order" slot="icon"></yd-icon>
      </yd-tabbar-item>
      <yd-tabbar-item title="我的" link="/mine" type="link" tag="div">
        <yd-icon name="ucenter" slot="icon"></yd-icon>
      </yd-tabbar-item>
    </yd-tabbar>
  </div>
</template>

<script>
  export default {}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/css/variable.styl"
  .footer-tab
    position: fixed
    bottom: 0
    left: 0
    width: 100%
    color: #ffffff
    background: #00a9e4
    .tabbbar-top-line-color
      font-size 0.24rem!important
      .yd-tabbar-item
        i
          font-size 0.4rem!important
    .router-link-active
      color $color!important
</style>
