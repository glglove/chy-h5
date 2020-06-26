<!--
  User: xxxxxxx
  Date: 2017/12/11
  功能：没有数据
-->

<template>
  <div class="no-result">
    <div class="text">暂无数据！</div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/variable.styl"
  .no-result
    position relative
    width 100%
    height 100%
    text-align center
    .text
      position fixed
      top: 50%
      width 100%
      transform translateY(-50%)
      margin 0 auto
      color $color-text-aa
      font-size $font-size-medium
</style>
