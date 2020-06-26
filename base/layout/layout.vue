<!--
  User: xxxxxxx
  Date: 2017/12/5
  功能：xxxxxx
-->

<template>
  <div class="layout-wrapper">
    <yd-grids-group :rows="4" :title="title">
      <yd-grids-item  v-for="(item, index) in routes" :key="item.path" type="link" :link="item.path" tag="div">
        <div slot="icon" class="icon-list" :style="{background: bgColor[index]}">
          <icon-svg :icon-class="item.icon"></icon-svg>
        </div>
        <span slot="text">{{item.name}}</span>
      </yd-grids-item>
    </yd-grids-group>
  </div>
</template>
<script type="text/ecmascript-6">
  import IconSvg from '@/base/Icon-svg/index'
  export default {
    props: {
      title: {
        type: String,
        default: '应用'
      },
      routes: {
        type: Array
      }
    },
    data () {
      return {
        bgColor: ['#65C5F4', '#34CAD6', '#FF8E8E', '#FF9E50', '#6FCA6C', '#65C5F4', '#34CAD6', '#FF8E8E', '#FF9E50', '#6FCA6C', '#FF8E8E', '#FF9E50', '#6FCA6C']
      }
    },
    created () {
    },
    components: {
      IconSvg
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/variable.styl"
  .yd-gridstitle
    padding 0.3rem
    color $color-text-aa
  .yd-grids-4
    .yd-grids-item:not(:nth-child(4n)):before
      border 0
    .yd-grids-item:after
      border 0
  .icon-list
    width: 1rem;
    height: 1rem;
    text-align: center;
    line-height: 1rem;
    border-radius: 0.1rem
    cursor pointer
    &:active
      background: #cccccc !important
    &:hover
      cursor pointer
    svg
      width: 0.50rem;
      height: 0.50rem;
      vertical-align: middle
  .yd-grids-txt
    font-size 0.24rem
    margin-top 0.3rem
</style>
