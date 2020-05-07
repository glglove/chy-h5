<!--
  User: gaol
  Date: 2020/2/1
  功能：单行输入框验证组件
-->

<template>
  <el-form-item
    :label="isTitle ? obj.FieldName : ''"
    :prop="prop"
    :rules="rules"
    v-if="!obj.Hidden"
  >
    <!-- <i 
      class="el-icon-warning-outline" 
      v-show="obj.FieldCode==='HelpUrl'"
      title="注网址需加上http">
    </i> -->

    <!--图形验证码 和 短信验证码 、登陆密码-->
    <span 
      v-if="obj.FieldCode != 'verificationPicCode' && 
      obj.FieldCode != 'verificationMobileCode' &&
      obj.FieldCode != 'verificationPassWord'">
      <el-input 
        clearable 
        style="width: 400px" 
        size="medium" 
        v-model="obj.FieldValue" 
        :placeholder="obj.Tips ||　'请输入'"
      ></el-input>
    </span>


    <span v-else>
      <div 
        class="u-f-ac"
        v-if="obj.FieldCode === 'verificationPicCode'"
      >
        <el-input 
          clearable 
          style="width: 270px;margin-left:30px" 
          size="medium" 
          v-model="obj.FieldValue" 
          :placeholder="obj.Tips ||　'请输入'"
        ></el-input>
        <div 
          class="picBox"
          style="display: inline-block;height: 40px;width:130px"
          @click="changePicCode"
        >
          <el-image
            style="width: 100%; height: 100%"
            :src="obj.picCodeUrl"
            fit="fill"
          >
          </el-image>
        </div>
      </div>

      <div 
        v-if="obj.FieldCode === 'verificationMobileCode'"      
        class="u-f-ac"
        style="position:relative; left: 30px">
        <el-input 
          clearable 
          style="width: 400px" 
          size="medium" 
          v-model="obj.FieldValue" 
          :placeholder="obj.Tips ||　'请输入'"
        >
        </el-input>  
        <el-button
          v-show="!obj.isSendingStatus"
          style="position: absolute; top: 6px; left: 290px;"
          type="text"
          size="mini"
          @click.native="getMobileCode"
        >获取短信验证码</el-button>
        <el-button
          v-show="obj.isSendingStatus"
          style="position: absolute; top: 6px; left: 290px;"
          type="text"
          size="mini"          
        >
        {{obj.countdown}}秒后重新获取
        </el-button>
      </div>    

      <div 
        v-if="obj.FieldCode === 'verificationPassWord'"      
        class="u-f-ac"
        style="position:relative; left: 30px">
        <el-input 
          clearable 
          style="width: 400px" 
          size="medium" 
          v-model="obj.FieldValue" 
          :placeholder="obj.Tips ||　'请输入'"
        >
        </el-input>  
        <i
          class="el-icon-s-help"
          style="position: absolute; top: 15px; right: 70px;cursor: pointer"
          type="text"
          size="mini"
        >
        </i>
      </div>        
    </span>
    
  </el-form-item>
</template>

<script type="text/ecmascript-6">
  import { validatEmail, validatMobilePhone, validatTel } from '@/utils/validate'

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
      isTitle: {
        type: Boolean,
        default: true
      }
    },
    data () {

      let validatePass = (rule, value, callback) => {
        // debugger
        if( this.obj.Role ){
          // 流转中 发起 、待办中的 表单字段 分组字段 明细表字段中的 字段权限
          if( this.obj.Role === 2){
            // role 1 是只读  2 是读写 4 是隐藏
            if (this.obj.Required && (this.obj.FieldValue === '' || !this.obj.FieldValue)) {
              callback(new Error(this.obj.FieldName + '不能为空'))
            } else if (this.obj.Required && this.obj.FieldValue && this.obj.FieldValue.length > 20) {
              callback(new Error('长度不能大于20字符'))
            } else if (this.obj.Required && this.obj.TextType == 1 && !validatEmail(this.obj.FieldValue)) {
              callback(this.obj.Required && new Error('邮箱格式不正确'))
            } else if (this.obj.Required && this.obj.TextType == 2 && !validatMobilePhone(this.obj.FieldValue)) {
              callback(new Error('手机格式不正确'))
            } else if (this.obj.Required && this.obj.TextType == 3 && !validatTel(this.obj.FieldValue)) {
              callback(new Error('电话格式不正确'))
            } else {
              callback()
            }
          }else {
            callback()
          }
        }else {
          if (this.obj.Required && (this.obj.FieldValue === '' || !this.obj.FieldValue)) {
            callback(new Error(this.obj.FieldName + '不能为空'))
          } else if (this.obj.Required && this.obj.FieldValue && this.obj.FieldValue.length > 20) {
            callback(new Error('长度不能大于20字符'))
          } else if (this.obj.Required && this.obj.TextType == 1 && !validatEmail(this.obj.FieldValue)) {
            callback(this.obj.Required && new Error('邮箱格式不正确'))
          } else if (this.obj.Required && this.obj.TextType == 2 && !validatMobilePhone(this.obj.FieldValue)) {
            callback(new Error('手机号格式不正确'))
          } else if (this.obj.Required && this.obj.TextType == 3 && !validatTel(this.obj.FieldValue)) {
            callback(new Error('电话格式不正确'))
          } else if(this.obj.FieldCode === 'setPassWord') {
            // 设置密码
            if(this.obj.FieldValue){
              localStorage.setItem("setPassWord",this.obj.FieldValue)
            }
            callback()
          }else if (this.obj.FieldCode === 'confirmPassWord'){
            // 确认密码的input
            try {
              let setPassWord = localStorage.getItem("setPassWord")
              console.log(setPassWord)
              console.log(this.obj.FieldValue)
              if(this.obj.FieldValue == setPassWord){
                console.log("pass")
                callback()
              }else {
                // 确认密码不一样
                console.log("fail")
                callback(new Error("两次密码不一样"))
              }
            } catch (error) {
              
            }
          } else {
            callback()
          }
        }
      }
      return {
        rules: {
          required: this.obj.Required,
          validator: validatePass,
          trigger: 'blur'
        }
      }
    },
    created () {
      this._initData()

      this.$nextTick(() => {
        this.$bus.$on("emitGetMobileCode", () => {
          if(this.obj.FieldCode === "mobileNumber"){
            if(!this.obj.FieldValue) {
              this.$notify({
                title: '提示',
                message: '请填写手机号码',
                duration: 3000
              })
            }else {
              debugger
              console.log(43555)
              console.log(this.obj.FieldValue)
              console.log(validatMobilePhone(this.obj.FieldValue))
              // 填写了手机号码的 需要校验手机号码的合理性
              if(validatMobilePhone(this.obj.FieldValue)){
                // 手机号码格式正确
                debugger
                this.$bus.$emit("validateMobilePhonePass")
              }else {
                // 手机号码格式不正确
                this.$notify({
                  title: '提示',
                  message: '手机号码格式不正确',
                  duration: 3000
                })                
              }
            }
          }else {
            // this.$bus.$off("emitGetMobileCode")
            // this.$bus.$off("validateMobilePhonePass")
          }         
        })

        if(this.obj.FieldCode === 'verificationMobileCode'){
          this.$bus.$on("validateMobilePhonePass", () => {
            this.obj.isSendingStatus = true
            this.$message({
              type: 'success',
              message: "验证码发送成功"
            })
            // 开启60s 倒计时定时器
            let timeObj = setInterval(() => {
              console.log(this.obj.countdown)
              if(this.obj.countdown == 0){
                clearInterval(timeObj)
                this.obj.isSendingStatus = false
                this.obj.countdown = 60
              }else {
                --this.obj.countdown
              }
            }, 1000)
          })
        }
      })
    },
    beforeDestroy(){
      this.$bus.$off("emitGetMobileCode")
      this.$bus.$off("validateMobilePhonePass")
    },
    methods: {
      _initData(){
        if(this.obj.FieldCode === "setPassWord"){
          try {
            localStorage.setItem("setPassWord","")
          } catch (error) {
            
          }
        }
      },
      getMobileCode(){
        this.$bus.$emit("emitGetMobileCode")
      },
      // 改变 图片验证吗
      changePicCode(){
        // 请求接口更换 验证码图片
        if(this.obj.picCodeUrl == require("../../assets/pic/picCode.png")){
          this.obj.picCodeUrl = require("../../assets/pic/successful.png")
        }else {
          this.obj.picCodeUrl = require("../../assets/pic/picCode.png")
        }
      },
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
