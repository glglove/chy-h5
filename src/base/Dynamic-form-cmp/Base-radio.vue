<!--
  User: xxxxxxx
  Date: 2019/2/25
  功能：xxxxxx
-->

<template>
  <yd-accordion class="h5-checkbox__container">
    <yd-accordion-item :title="obj.FieldName">
      <yd-radio-group v-model="obj.FieldValue" color="#00aeef" class="content-checkbox-group">
        <yd-radio :val="source.Code" v-for="source in dataSource" :key="source.Code">{{source.Name}}</yd-radio>
      </yd-radio-group>
    </yd-accordion-item>
  </yd-accordion>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import { getDicByKey } from '@/api/permission'
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
        dataSource: []
      }
    },
    created () {
      this.obj.FieldValue = this.obj.FieldValue.toString()
    },
    mounted () {
      this.$nextTick(() => {
        this._getDicByKey(this.obj.ModuleCode, this.obj.ModuleCode, this.obj.DSType, this.obj.DataSource)
      })
    },
    methods: {
      // 获取字典表数据源数据
      _getDicByKey (appCode, moduleCode, dicType, dicCode) {
        getDicByKey(appCode, moduleCode, dicType, dicCode).then(res => {
          if (res.data.State === REQ_OK) {
            this.dataSource = res.data.Data
          }
        })
      }
    },
    watch: {
      obj: {
        handler (newValue, oldValue) {
          // 每当obj的值改变则发送事件update:obj , 并且把值传过去
          this.obj.FieldValue = this.obj.FieldValue.toString()
          this.$emit('update:obj', newValue)
        },
        deep: true
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .h5-checkbox__container
    .content-checkbox-group
      padding 0.24rem
</style>
