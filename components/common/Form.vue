<!--
  User: gaol
  Date: 2020/01/26
  功能： form 基础组件
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>
.el-row
    height 100%
    background #f4f7f9
    .app-wrapper
        height 100%
        .routerCotentBox
            height calc(100vh - 60px)
            .contentBox
                height 100%
</style>

<template>
    <el-row :span="24">
        <div class="app-wrapper">
            <el-form 
                ref="formObj"
                :formObj="formObj"
                :label-width="formObj.labelWidth"
            >

                <el-form-item 
                    v-for="(item, index) in formObj.inputs"
                    :key="index"
                    :label="item.label"
                    :rules="itemRules(item)"
                    :prop="'inputs.' + index + '.inputValue'">
                    <el-input
                        :style="{width:item.width,marginLeft:'-100px'}"
                        v-model= 'item.inputValue'
                        :placeholder="item.placeholder"
                    >
                    {{item.inputValue}}
                    </el-input>
                </el-form-item>
            </el-form>
        </div>
    </el-row>
</template>

<script type="text/ecmascript-6">
import MenuCmp from '@/components/common/Menu.vue'
export default {
    components: {
        MenuCmp
    },
    props: {
        formObj: {
            type: Object,
            default: () => {
                return {
                    labelWidth: '80px',
                    inputs: [
                        {
                            label: '',
                            width: '300px',
                            placeholder: '请填写用户名',
                            inputValue: '',
                            required: true,
                            messageTit: '请填写用户名',
                            validatorPass: (obj, callback) => {
                                return (obj, callback) => {
                                    if(obj && obj.required){
                                        if(obj.inputValue) {
                                            callback()
                                        }else {
                                            callback(new Error(`${obj.messageTit}`))
                                        }
                                    }else {
                                        callback()
                                    }                                    
                                }
                            },                            
                        },
                        {
                            label: '',                          
                            width: '300px',
                            placeholder: '请填写密码',
                            inputValue: '',
                            required: false,
                            messageTit: '请填写密码',                            
                        }
                    ]
                }
            }
        },
        formObjRules:{
            type: Array,
            default: () => {
                return [
                    {}
                ]
            }
        }
    },
    data() {
        return {
            activeIndex: '1'
        }
    },
    methods:{
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      itemRules(obj){
        return {
            required: obj.required,
            validator: obj.validatorPass(rule, value, callback),
            trigger: 'blur'
        }
      }        
    }
}
</script>
