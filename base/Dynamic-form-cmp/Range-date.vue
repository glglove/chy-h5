<!--
  User: xxxxxxx
  Date: 2019/2/26
  功能：xxxxxx
-->

<template>
  <yd-cell-group :title="obj.FieldName">
    <yd-cell-item arrow>
      <span slot="left">开始时间：</span>
      <yd-datetime
        :type="obj.Format"
        v-model="startDate"
        slot="right"
        :init-emit="false"
        placeholder="选择开始时间"
        @callback="handleStartDate"
      ></yd-datetime>
    </yd-cell-item>
    <yd-cell-item arrow>
      <span slot="left">结束时间：</span>
      <yd-datetime
        :type="obj.Format"
        v-model="endDate"
        slot="right"
        :init-emit="false"
        placeholder="选择结束时间"
        @callback="handleEndDate"
      >
      </yd-datetime>
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
    data () {
      return {
        startDate: '',
        endDate: ''
      }
    },
    created () {
      console.log('进来了', this.obj)
    },
    methods: {
      handleStartDate () {
        console.log('开始')
      },
      handleEndDate () {
        console.log('结束')
      }
    },
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
