<!--
  User: xxxxxxx
  Date: 2019/2/26
  功能：说明
-->

<template>
  <yd-accordion>
    <yd-accordion-item :title="obj.FieldName">
      <div style="padding: .24rem;" v-html="obj.FieldValue">
      </div>
    </yd-accordion-item>
  </yd-accordion>
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
