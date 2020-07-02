<!--
  User: xxxxxxx
  Date: 2019/2/26
  功能：xxxxxx
-->

<template>
  <yd-cell-group>
    <yd-cell-item>
      <span slot="left">{{obj.FieldName}}：</span>
      <yd-input slot="right" type="number" :required="obj.Required" v-model="obj.FieldValue" max="20" :placeholder="obj.Tips || '请输入'"></yd-input>
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
      console.log('进来了')
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
