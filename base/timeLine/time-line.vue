<template>
  <div class="time-line-wrapper">
    <ul class="timeLines">
      <li class="item" v-for="i in data">
        <div class="left-item">
          <span class="line"></span>
          <span class="circle out-circle"></span>
          <span class="circle in-circle"></span>
        </div>
        <div class="right-item">
          <div class="item time-wrapper">
            <yd-icon name="time" size=".28rem" color="#56BC4E"></yd-icon>
            <span class="text">
              <span class="type" style="color: #959595;margin-right: 0.1rem">签到</span>
              <span class="time">8:00</span>
            </span>
          </div>
          <div class="item location-wrapper">
            <yd-icon name="location" size=".28rem" color="#00AEEF"></yd-icon>
            <span class="text">星巴克咖啡</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      data: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    data () {
      return {
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/variable.styl"
  @import "~common/css/mixin.styl"
  .time-line-wrapper
    padding 10px 0
    background $color-g
    .timeLines
      .item
        display flex
        .left-item
          position relative
          flex 0 0 0.5rem
          .line
            display: inline-block;
            position: absolute;
            left: 50%;
            height: 100%;
            border-left: 2px solid #ddd;
            transform: translateX(-50%);
          .circle
            display: inline-block;
            width: 0.12rem;
            height: 0.12rem;
            background: #ddd;
            border-radius: 50%;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate3d(-50%, -50%, 0);
          .out-circle
            width: 0.2rem;
            height: 0.2rem;
            background: $color-g
        .right-item
          flex 1
          position relative
          min-height 1.3rem
          background #ffffff
          border-radius 0.1rem
          margin 0.1rem 0.5rem 0.1rem 0.1rem
          padding 0.22rem 0.29rem
          &:before
            content:""
            width:0
            height:0
            position:absolute
            left: -6px
            top: 50%
            transform translateY(-50%)
            border-top: solid 6px transparent
            border-right: solid 6px white
            border-bottom: solid 6px transparent
          .time-wrapper
            margin-bottom 0.26rem
            i
              margin-right 0.15rem
            .text
              display inline-block
              line-height 0.28rem
          .location-wrapper
            i
              margin-right 0.15rem
            .text
              display inline-block
              line-height 0.28rem
</style>
