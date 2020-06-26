<!--
  User: xxxxxxx
  Date: 2019/2/26
  功能：xxxxxx
-->

<template>
  <yd-cell-group>
    <yd-cell-item arrow @click.native="handlePick">
      <span slot="left">{{obj.FieldName}}：</span>
      <span slot="right">{{obj.FieldValue}}</span>
    </yd-cell-item>
  </yd-cell-group>
</template>

<script type="text/ecmascript-6">
  // import Picker from 'better-picker'
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
        picker: null,
        dataMonth: [
          {
            text: '一月',
            value: '1'
          },
          {
            text: '二月',
            value: '2'
          },
          {
            text: '三月',
            value: '3'
          },
          {
            text: '四月',
            value: '4'
          },
          {
            text: '五月',
            value: '5'
          },
          {
            text: '六月',
            value: '6'
          },
          {
            text: '七月',
            value: '7'
          },
          {
            text: '八月',
            value: '8'
          },
          {
            text: '九月',
            value: '9'
          },
          {
            text: '十月',
            value: '10'
          },
          {
            text: '十一月',
            value: '11'
          },
          {
            text: '十二月',
            value: '12'
          }
        ]
      }
    },
    created () {
      // 初始化pick
      this.picker = new Picker({
        data: [this.dataMonth],
        selectedIndex: [0],
        title: `${this.obj.FieldName}`
      })

      this.picker.on('picker.select', (selectedVal, selectedIndex) => {
        this.obj.FieldValue = this.dataMonth[selectedIndex[0]].text
      })

      this.picker.on('picker.change', function (index, selectedIndex) {
        // console.log(index)
        // console.log(selectedIndex)
      })

      this.picker.on('picker.valuechange', function (selectedVal, selectedIndex) {
        // console.log(selectedVal)
        // console.log(selectedIndex)
      })
    },
    methods: {
      handlePick () {
        this.picker.show()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
