<template>
  <div class="errPage-container">
    <img :src="errGif" alt="" >
    <div class="text">数据加载失败，请重试！</div>
  </div>
</template>

<script>
import errGif from '@/assets/401_images/401.gif'

export default {
  data () {
    return {
      errGif: errGif + '?' + +new Date(),
      dialogVisible: false
    }
  },
  methods: {
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/variable.styl"
  @import "~common/css/mixin.styl"
  .errPage-container
    position fixed
    top: 45px
    left 0px
    bottom 0px
    width: 100%
    background: #fff;
    img
      width 100%
      padding 100px
      padding-bottom 30px
      border-top-1px()
    .text
      text-align: center
      color: $color-line
</style>
