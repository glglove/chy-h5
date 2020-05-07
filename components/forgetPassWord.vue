<!--
  User: gaol
  Date: 2020/01/26
  功能： 忘记密码 页面
-->

<style lang="stylus" rel="sheetStylus" scoped>
>>>.el-form-item__error
    margin-left 30px !important
.forgetPassWordBox 
    width 100%
    .el-row
        height calc(100vh - 60px)
        width 100%
        .el-col
            position relative
            height 100%
            width 100%
            .forgetFormBox
                position absolute
                top 0
                left 0
                right 0
                bottom 0
                margin auto
                width 900px
                height 500px
                .el-card 
                    height 100%
                    .forgetItemBox
                        .firstStepForm
                            .fieldBox_mobileNumber_0
                                >>>.el-form-item
                                    .el-form-item__content
                                        .el-input 
                                            margin-left -150px
                        .secondStepForm
                            >>>.el-form-item
                                .el-form-item__content
                                    .el-input
                                        margin-left -150px
</style>

<template>
    <div class="forgetPassWordBox">
        <el-row>
            <el-col :span="24">
                <div class="forgetFormBox">
                    <el-card class="card-box">
                        <h3 class="marginB20">找回密码</h3>
                        <div class="stepTitBox">
                            <el-steps :active="currentActive" align-center>
                                <el-step title="输入您的账号" description=""></el-step>
                                <el-step title="安全验证与新密码设置" description=""></el-step>
                                <el-step title="设置成功" description=""></el-step>
                            </el-steps>
                        </div>

                        <div class="forgetItemBox marginT20">
                            <el-form 
                                v-if="currentActive == 1"
                                ref="firstStepForm"
                                :model="firstStepForm"
                                label-width="250px"
                                class="firstStepForm"
                            >
                                <!-- firstStepForm.Fields: {{firstStepForm.Fields}} -->
                                <div 
                                    :class="`fieldBox_${field.FieldCode}_${index}`"
                                    v-for="(field, index) in firstStepForm.Fields"
                                    :key="index"
                                >
                                    <!---动态显示form-item组件---->
                                    <component 
                                        :ref="`field_+ ${field.Id}`"
                                        :is="currentComponent(field.ControlType)"
                                        :isNeedCheck = 'true'
                                        :prop="'Fields.' + index + '.FieldValue'"
                                        :obj.sync="field"
                                        :isTitle="true"
                                    >
                                    </component>
                                </div>
                            </el-form>   

                            <el-form 
                                v-if="currentActive == 2"
                                ref="secondStepForm"
                                :model="secondStepForm"
                                label-width="250px"
                                class="secondStepForm"
                            >
                                <!-- secondStepForm.Fields: {{secondStepForm.Fields}} -->
                                <div 
                                    :class="`fieldBox_${field.FieldCode}_${index}`"
                                    v-for="(field, index) in secondStepForm.Fields"
                                    :key="index"
                                >
                                    <!---动态显示form-item组件---->
                                    <component 
                                        :ref="`field_+ ${field.Id}`"
                                        :is="currentComponent(field.ControlType)"
                                        :isNeedCheck = 'true'
                                        :prop="'Fields.' + index + '.FieldValue'"
                                        :obj.sync="field"
                                        :isTitle="true"
                                    >
                                    </component>
                                </div>
                            </el-form>     

                            <div class="thirdStepBox" v-if="currentActive == 3">
                                <div style="width:84px; height:84px;margin: 0 auto">
                                    <el-image
                                        :src="require('../assets/pic/successful.png')"
                                        style="width: 100%; height: 100%"
                                        fit="fill"
                                    >
                                    </el-image>
                                </div>
                                <p 
                                    style="color:rgb(21, 21, 25);font-weight: 700"
                                    class="marginT20">
                                    密码修改成功
                                </p>
                            </div>               
                        </div>        

                        <div class="footerBox marginT20">
                            <el-button 
                                type="primary"
                                style="width: 200px"
                                @click.native="nextStep"
                            >{{currentActive !=3 ? '下一步': '立即登陆'}}</el-button>
                        </div>                
                    </el-card>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script type="text/ecmascript-6">
    import MenuCmp from '@/components/common/Menu.vue'
    import FormCmp from '@/components/common/Form.vue'
    import { ControlAndRuleMixin } from '@/utils/mixins'
    export default {
        mixins:[ ControlAndRuleMixin ],
        components:{
            MenuCmp,
            FormCmp
        },
        data() {
            return {
                currentActive: 1, 
                firstStepForm: {
                    Fields: [
                        {
                            Id: 1,
                            Required: true,
                            FieldCode: 'mobileNumber',
                            FieldName: '手机号码', 
                            Tips: '请输入手机号码',
                            Hidden: false,
                            FieldValue: '',
                            ControlType: '1', // 控件类型
                            TextType: 2, // 1 表示 邮箱 2 表示 手机号码 3 表示 电话 4 手机号码或者邮箱
                        },
                        {
                            Id: 2,
                            FieldCode: 'verificationPicCode',
                            picCodeUrl: require('../assets/pic/picCode.png'),
                            Required: true,
                            FieldName: '校验码',
                            Tips: '请输入校验码',
                            Hidden: false, 
                            FieldValue: '',
                            ControlType: '1', // 控件类型
                            TextType: "", // 1 表示 邮箱 2 表示 手机号码 3 表示 电话 4 手机号码或者邮箱                            
                        },
                        {
                            Id: 3,
                            FieldCode: 'verificationMobileCode', 
                            Required: true,
                            FieldName: '短信验证码',
                            Tips: '请输入短信验证码',
                            isSendingStatus: false, // 短信验证码是否正在发送中
                            countdown: 60, // 倒计时 
                            Hidden: false, 
                            FieldValue: '',
                            ControlType: '1', // 控件类型
                            TextType: "", // 1 表示 邮箱 2 表示 手机号码 3 表示 电话 4 手机号码或者邮箱                            
                        }                                            
                    ]
                },
                secondStepForm: {
                    Fields: [
                        {
                            Id: 1,
                            Required: true,
                            FieldCode: 'setPassWord',
                            FieldName: '设置新密码',
                            Tips: '请输入密码',
                            Hidden: false, 
                            FieldValue: '',
                            ControlType: '1', // 控件类型
                            TextType: "", // 1 表示 邮箱 2 表示 手机号码 3 表示 电话 4 手机号码或者邮箱                            
                        },
                        {
                            Id: 2,
                            Required: true,
                            FieldCode: 'confirmPassWord',
                            FieldName: '确认新密码',
                            Tips: '请输入密码',
                            Hidden: false, 
                            FieldValue: '',
                            ControlType: '1', // 控件类型
                            TextType: "", // 1 表示 邮箱 2 表示 手机号码 3 表示 电话 4 手机号码或者邮箱                            
                        }                                       
                    ]
                }                
            }
        },
        methods: {
            submitLogin(){
                this.$refs.firstStepForm.validate(valid => {
                    if(valid){
                        this.$message({
                            type: 'info',
                            message: 'pass'
                        })
                    }else {

                    }
                })
            },
            handlerRegister(){
                this.$router.push({
                    path: '/register'
                })
            },
            nextStep(){
                if(this.currentActive == 1){
                    debugger
                    // 第一步
                    this.$refs.firstStepForm.validate(valid => {
                        debugger
                        if(valid){
                            this.currentActive = 2
                        }else {

                        }
                    })
                }else if(this.currentActive == 2){
                    debugger
                    // 第二步
                    this.$refs.secondStepForm.validate(valid => {
                        debugger
                        if(valid){
                            this.currentActive = 3
                        }else {

                        }
                    })          
                }else if(this.currentActive == 3){
                    this.$router.push({
                        path: '/login'
                    })
                } 

            }
        }
    }
</script>
