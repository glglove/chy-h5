<!--
  User: xxxxxxx
  Date: 2019/2/25
  功能：form表单多行输入框
-->

<template>
  <yd-cell-group :title="obj.FieldName">
    <yd-cell-item>
      <yd-textarea slot="right" :placeholder="obj.Tips || '请输入'" maxlength="3000"></yd-textarea>
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

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
