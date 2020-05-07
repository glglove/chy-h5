<!--
  User: gaol
  Date: 2020/01/26
  功能： menu 导航组件
-->

<style lang="less" scoped>
  .svg-icon {
    width: 20px;
    height: 20px;
    vertical-align: middle;
    margin-top: -3.5px;
    fill: currentColor;
    overflow: hidden;
  }
.top-box {
    position: relative;
    .menuBox {
        ul {
            padding-left: 20%;
            box-sizing: border-box;
            li {
                // float: right !important;
                font-size: 16px !important;
                .el-submenu__title {
                    font-size: 16px !important;
                    i {
                        display: none !important
                    }
                }
                .el-menu-item {

                }
            }
        }
    }
    .top-login-box {
        position: absolute;
        top: 15px;
        right: 10px;
        width: 200px;
    }
}
</style>

<template>
    <div class="top-box">
        <div class="menuBox">
            <el-menu
                :default-active="activeIndex"
                :staticEnableDefaultPopOutImage="false"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
                background-color="#151519"
                text-color="#fff"
                router
                active-text-color="#ffd04b">

                <el-menu-item index="/index">首页</el-menu-item>

                <!-- <el-submenu index="2">
                    <template slot="title">项目大厅</template>
                    <el-menu-item index="2-1">选项1</el-menu-item>
                    <el-menu-item index="2-2">选项2</el-menu-item>
                    <el-menu-item index="2-3">选项3</el-menu-item>
                </el-submenu>-->

                <el-menu-item index="/projectList">项目市场</el-menu-item>

                <el-menu-item index="/selectDemandTypes">发布需求</el-menu-item>


                <el-menu-item index="/turnDeveloper">成为开发者</el-menu-item>

            </el-menu>
        </div>

        <div class="top-login-box" v-if="isLogin">
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link marginR10">
                    <icon-svg :icon-class="people"></icon-svg>
                    <span style="color:rgb(255, 255, 255);background-color:rgb(21, 21, 25);display:inline-block;margin-top:10px">个人中心</span>
                    <i class="el-icon-arrow-down el-icon--right" style="color:#ffffff;margin-left:-1px;vertical-align:middle"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="myProject">查看记录</el-dropdown-item>
                    <el-dropdown-item command="myRelease">我的发布</el-dropdown-item>
                    <el-dropdown-item command="searchProject">匹配私活</el-dropdown-item>
                    <el-dropdown-item command="turnVip">成为vip</el-dropdown-item>
                    <el-dropdown-item command="loginOut">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>

            <!-- <el-button 
                type="primary"
                size="mini"
                @click.native="handlerPersonal">
                升级为vip
            </el-button>            -->
        </div>
        <div class="top-login-box" v-if="!isLogin">
            <el-button 
                type="primary" 
                size="mini"
                @click.native="handlerLogin">
                登陆
            </el-button>
            <el-button 
                type="primary" 
                size="mini"
                @click.native="handlerRegister">
                注册
            </el-button>         
        </div>        
    </div>
</template>

<script type="text/ecmascript-6">
  import iconSvg from '@/components/common/Icon-svg/index'
export default {
    components: {
        iconSvg
    },
    data() {
        return {
            activeIndex: '/index',
            isLogin: true,
            people: 'avator' 
        }
    },
    created(){

    },
    watch: {
        '$route': {
            handler(to, from) {
                debugger
                this.activeIndex = to.path
                switch(this.activeIndex){
                    case '/projectDetail':
                        this.activeIndex = "/projectList"
                        break
                    case '/releaseDemand':
                        this.activeIndex = "/selectDemandTypes"
                        break
                    default:
                        this.activeIndex = "/index"
                        break
                }
            },
            immediate: true
        }
    },
    methods:{
      handleSelect(key, keyPath) {
          debugger
        console.log(key, keyPath);
        // switch(key){
        //     case '/index':
        //         this.activeIndex = '1'
        //         break
        //     case '/projectList':
        //         this.activeIndex = '2'
        //         break
        //     case '/selectDemandTypes':
        //         this.activeIndex = '3'
        //         break
        // }
        this.activeIndex = key
      },
      // 登陆
      handlerLogin(){
        this.$router.push({
            path: '/login'
        })
      },
      // 注册
      handlerRegister(){
        this.$router.push({
            path: '/register'
        })
      },
      //个人中心
      handlerPersonal(){
        this.$router.push({
            path: '/personalCenter',
        })
      },
      handleCommand(command){
          switch(command){
            case 'myProject':
                this.$router.push({
                    path: '/personalCenter/myProject',
                    query: {
                        flag: command
                    }
                })
                break
            case 'myRelease':
                this.$router.push({
                    path: '/personalCenter/myRelease',
                    query: {
                        flag: command
                    }
                })
                break                
            case 'searchProject':
                this.$router.push({
                    path: '/personalCenter/searchProject',
                    query: {
                        flag: command
                    }
                })
                break
            case 'turnVip':
                this.$router.push({
                    path: '/personalCenter/turnVip',
                    query: {
                        flag: command
                    }
                })
            break
            case 'loginOut':
                this.isLogin = false
                break
          }
      },    
    }
}
</script>
