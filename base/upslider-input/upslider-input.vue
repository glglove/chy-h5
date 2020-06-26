<!--
  User: xxxxxxx
  Date: 2017/12/8
  功能：向上滑出input
-->

<template>
  <div class="upslider-input" v-if="isActiveInput">
    <div class="yd-mask" @click="isActiveInput = false" style="z-index: 1500; background-color: rgb(0, 0, 0); opacity: 0.4; pointer-events: auto;"></div>
    <div class="content" :class="{'active-bottomInput' : isActiveInput}" ref="content">
      <textarea placeholder="请输入反馈内容" @focus="onFocus()" @blur="onBlur()" v-model="feedback.feedbackText"></textarea>
      <!--<yd-checkbox v-model="feedback.isAllPublic" :disabled="!isPublic">是否公开</yd-checkbox>-->
      <yd-button style="margin-top: 15px" :disabled="!feedback.feedbackText ? true : false" size="large" @click.native="send()">发送</yd-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      isPublic: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        feedback: {
          feedbackText: '',
          isAllPublic: false
        },
        isActiveInput: false
      }
    },
    methods: {
      onFocus () {
        console.log('获得焦点')
      },
      onBlur () {
        console.log('失去焦点')
      },
      show () {
        this.isActiveInput = true
      },
      hide () {
        this.isActiveInput = false
      },
      send () {
        if (this.isPublic) {
          this.feedback.isAllPublic = true
        }
        this.$emit('sendFeedback', this.feedback)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/variable.styl"
  @import "~common/css/mixin.styl"
  .upslider-input
    .content
      position: fixed;
      bottom: 0;
      left: 0;
      padding 10px
      width: 100%;
      z-index: 1502;
      background-color: #efeff4;
      -webkit-transform: translateY(100%);
      transform: translateY(100%);
      -webkit-transition: -webkit-transform .2s;
      transition: -webkit-transform .2s;
      transition: transform .2s;
      transition: transform .2s,-webkit-transform .2s;
      &.active-bottomInput
        -webkit-transform: translate(0)
        transform: translate(0)
      textarea
        color: #555;
        height: 100px;
        line-height:15px;
        font-size 16px
        width: 100%;
        padding: 5px;
        border-radius 5px
        margin-bottom 5px
        border: 1px solid #E5E5E5;
        background: #FBFBFB;
        outline: 0;
      .yd-checkbox
        margin-left 2px
      .yd-checkbox-text
        display inline-block
        line-height 20px
</style>
