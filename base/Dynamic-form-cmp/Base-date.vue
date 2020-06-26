<!--
  User: xxxxxxx
  Date: 2019/2/26
  功能：时间组件
-->

<template>
  <yd-cell-group>
    <yd-cell-item arrow>
      <span slot="left">{{obj.FieldName}}：</span>
      <yd-datetime :type="obj.Format" v-model="obj.FieldValue" slot="right" :init-emit="false"></yd-datetime>
    </yd-cell-item>
  </yd-cell-group>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      sid: {
        type: Number,
        default: 0
      },
      obj: {
        type: Object,
        default: {}
      },
      isTitle: {
        type: Boolean,
        default: true
      }
    },
    created () {
      console.log('进来了', this.obj)
    },
    methods: {},
    watch: {
      obj: {
        handler (newValue, oldValue) {
          // 每当obj的值改变则发送事件update:obj , 并且把值传过去
          this.$emit('update:obj', newValue)
        },
        deep: true
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
