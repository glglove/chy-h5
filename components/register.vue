<!--
  User: gaol
  Date: 2020/01/26
  功能： 注册 页面
-->

<style lang="stylus" rel="sheetStylus" scoped>
>>>.el-form-item__error
    margin-left 30px !important
.registerBox 
    width 100%
    .el-row
        height calc(100vh - 60px)
        width 100%
        .el-col
            position relative
            height 100%
            width 100%
            .loginFormBox
                position absolute
                top 0
                left 0
                right 0
                bottom 0
                margin auto
                width 500px
                height 500px
                .el-card 
                    height 100%
                    .loginItemBox
                        .el-form
                            .fieldBox
                                margin-bottom 30px  
                    .footerBox
                        margin-top -10px
                        .el-button
                            width 100%
                        .forgetPassWord
                            width 100%
                            padding-right 30px
                            color rgb(22, 155, 213)
                            margin-top 5px
                            margin-bottom 20px
                            text-align right
                            font-size 14px
                            cursor pointer
                            box-sizing border-box
                        .titBox
                            margin-top 20px
                            padding 0 25px
                            box-sizing border-box
                            .tit-noAccount
                                font-size 14px
                                color rgb(22, 155, 213)
                                cursor pointer
                            .tit-register
                                color rgb(22, 155, 213)
                                cursor pointer

</style>

<template>
    <div class="registerBox">
        <el-row>
            <el-col :span="24">
                <div class="loginFormBox">
                    <el-card class="card-box">
                        <h3 class="marginB20">注册</h3>
                        <div class="loginItemBox">
                            <el-form 
                                ref="loginFormObj"
                                :model="loginFormObj"
                            >
                                <!-- loginFormObj.Fields: {{loginFormObj.Fields}} -->
                                <div 
                                    class="fieldBox"
                                    v-for="(field, index) in loginFormObj.Fields"
                                    :key="index"
                                >
                                    <!---动态显示form-item组件---->
                                    <component 
                                        ref="`field_+ ${field.Id}`"
                                        :is="currentComponent(field.ControlType)"
                                        :isNeedCheck = 'true'
                                        :prop="'Fields.' + index + '.FieldValue'"
                                        :obj.sync="field"
                                        :isTitle="false"
                                    >
                                    </component>
                                </div>
                            </el-form>                            
                        </div>
                        <div class="footerBox">
                            <!-- <div class="forgetPassWord">
                                忘记密码
                            </div>                             -->
                            <el-button 
                                style="width: 400px"
                                type="primary"
                                @click.native="submitRegister"
                            >同意协议并注册</el-button>
                            <div class="titBox marginT20 u-f-ac u-f-jsb">
                                <span class="tit-noAccount">《服务协议》</span>
                                <span class="tit-register" @click="handlerLogin">已有账号? 去登陆</span>
                            </div>
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
                loginFormObj: {
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
                            TextType: 1, // 1 表示 邮箱 2 表示 手机号码 3 表示 电话 4 手机号码或者邮箱                            
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
                            TextType: 1, // 1 表示 邮箱 2 表示 手机号码 3 表示 电话 4 手机号码或者邮箱                            
                        },
                        {
                            Id: 4,
                            FieldCode: 'verificationPassWord',
                            Required: true,
                            FieldName: '登陆密码',
                            Tips: '登陆密码',
                            Hidden: false, 
                            FieldValue: '',
                            ControlType: '1', // 控件类型
                            TextType: 1, // 1 表示 邮箱 2 表示 手机号码 3 表示 电话 4 手机号码或者邮箱                            
                        },                                                
                    ]
                }
            }
        },
        methods: {
            submitRegister(){
                this.$refs.loginFormObj.validate(valid => {
                    if(valid){
                        this.$message({
                            type: 'info',
                            message: 'pass'
                        })
                    }else {

                    }
                })
            },
            handlerLogin(){
                this.$router.push({
                    path: '/login'
                })
            }
        }
    }
</script>
