<!--
  User: xxxxxxx
  Date: 2018/10/29
  功能：xxxxxx
-->

<template>
  <yd-cell-item>
    <span slot="left" v-if="showTitle">{{title}}：</span>
    <yd-input slot="right" v-model="obj.Default" placeholder="请输入内容" @blur="changeValue"></yd-input>
  </yd-cell-item>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      showTitle: {
        type: Boolean,
        default: true
      },
      title: {
        type: String,
        default: ''
      },
      sid: {
        type: Number,
        default: 0
      },
      obj: {
        type: Object,
        default: {}
      }
    },
    data () {
      return {
        selectValue: ''
      }
    },
    created () {
    },
    methods: {
      changeValue () {
        console.log(this.obj)
        // this.$emit('commonValue', Object.assign({}, this.obj, { EndValue: this.selectValue }, { Sid: this.sid }))
      }
    },
    watch: {
      obj: {
        handler (newValue, oldValue) {
          // 每当obj的值改变则发送事件update:obj , 并且把值传过去
          console.log('bbb', newValue, oldValue)
          this.$emit('update:obj', newValue)
        },
        deep: true
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
