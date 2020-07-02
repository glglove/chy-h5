<!--
  User: xxxxxxx
  Date: 2019/2/25
  功能：form表单-单选下拉框
-->

<template>
  <view>
    <u-form-item 
      v-if="!obj.Hidden"    
      :label="isTitle ? obj.FieldName : '类型'"
      :prop="prop"
      :rules="rules"
      :label-position="obj.labelPosition || 'left'" 
      :label-width="obj.labelWidth || '150'"
    >
      <u-input 
        :border="border" 
        type="select" 
        :select-open="selectShow" 
        v-model="obj.FieldValue" 
        :placeholder="obj.Tips ||　'请选择'" 
        @click="selectShow = true"
      ></u-input>
    </u-form-item>
  </view>
</template>

<script type="text/ecmascript-6">
  // import Picker from 'better-picker'
  export default {
    props: {
      obj: {
        type: Object,
        default: {}
      },
      prop: {
        type: String,
        default: ''
      },
      orderProp: {
        type: String,
        default: ''
      },      
      isTitle: {
        type: Boolean,
        default: true
      },
      typeList: {
        type: Array,
        default: () => {
          return []
        }
      }   
    },
    data () {
      return {
        border: false,
        selectShow: false,
        rules: {
          reqired: this.obj.Reqired,
          // message: `请选择${this.obj.FieldName}类型`,
          trigger: ['change','blur'],
          validator: (rule, value, callback) => {
            // // 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
            // return this.$u.test.mobile(value);
            if(!this.obj.FieldValue){
              callback(new Error('请选择类型'))
            }else {
              callback()
            }
          }           
        },        
      }
    },
    onLoad() {
      
    },
    computed: {
      borderCurrent() {
        return this.border ? 0 : 1;
      }
    },
    onReady() {
      this.$refs.uForm.setRules(this.rules);
    },
    methods: {
      submit() {
        this.$refs.uForm.validate(valid => {
          if (valid) {
            if(!this.model.agreement) return this.$u.toast('请勾选协议');
            console.log('验证通过')
          } else {
            console.log('验证失败')
          }
        });
      },
		// 选择商品类型回调
		selectConfirm(e) {
			this.model.goodsType = ''
			e.map((val, index) => {
				this.model.goodsType += this.model.goodsType == '' ? val.label : '-' + val.label;
			})
		},      
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
