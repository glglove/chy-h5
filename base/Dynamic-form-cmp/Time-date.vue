<!--
  User: xxxxxxx
  Date: 2019/2/26
  功能：时分
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

  const parseTime = function (time) {
    const values = (time || '').split(':')
    if (values.length >= 2) {
      const hours = parseInt(values[0], 10)
      const minutes = parseInt(values[1], 10)

      return {
        hours,
        minutes
      }
    }
    /* istanbul ignore next */
    return null
  }

  const compareTime = function (time1, time2) {
    const value1 = parseTime(time1)
    const value2 = parseTime(time2)

    const minutes1 = value1.minutes + value1.hours * 60
    const minutes2 = value2.minutes + value2.hours * 60

    if (minutes1 === minutes2) {
      return 0
    }

    return minutes1 > minutes2 ? 1 : -1
  }

  const formatTime = function (time) {
    return (time.hours < 10 ? '0' + time.hours : time.hours) + ':' + (time.minutes < 10 ? '0' + time.minutes : time.minutes)
  }

  const nextTime = function (time, step) {
    const timeValue = parseTime(time)
    const stepValue = parseTime(step)

    const next = {
      hours: timeValue.hours,
      minutes: timeValue.minutes
    }

    next.minutes += stepValue.minutes
    next.hours += stepValue.hours

    next.hours += Math.floor(next.minutes / 60)
    next.minutes = next.minutes % 60

    return formatTime(next)
  }
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
        start: '00:00',
        end: '24:00',
        step: '00:30',
        picker: null
      }
    },
    created () {
      // 根据配置修改时间间隔
      this.step = this.obj.TimeBreak || this.step
      // 初始化数据源
      let data = this.items()
      // 初始化pick
      this.picker = new Picker({
        data: [data],
        selectedIndex: [0],
        title: `${this.obj.FieldName}`
      })

      this.picker.on('picker.select', (selectedVal, selectedIndex) => {
        this.obj.FieldValue = data[selectedIndex[0]].text
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
    computed: {
    },
    methods: {
      handlePick () {
        this.picker.show()
      },
      items () {
        const start = this.start
        const end = this.end
        const step = this.step

        const result = []

        if (start && end && step) {
          let current = start
          while (compareTime(current, end) <= 0) {
            result.push({
              text: current,
              value: current,
              disabled: compareTime(current, this.minTime || '-1:-1') <= 0 ||
                compareTime(current, this.maxTime || '100:100') >= 0
            })
            current = nextTime(current, step)
          }
        }
        return result
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
