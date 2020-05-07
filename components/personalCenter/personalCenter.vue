<!--
  User: gaol
  Date: 2020/01/26
  功能： 个人中心 页面
-->

<style lang="stylus" rel="sheetStylus" scoped>
.page_personalCenter
    min-height calc(100vh - 110px)
    .el-row
        margin-top 20px
        min-height calc(100vh - 110px)
        .colWrap
            float none
            margin 0 auto
            .col_fixed
                position fixed 
                top 100px
                left 200px
            .col_right
                // border 1px solid red
                margin-left 380px
                margin-top 20px
                padding-bottom 100px
                box-sizing border-box
                .card-right
                    // height calc(100vh - 200px)
</style>

<template>
    <div :class="['page_personalCenter', noData?'not_found':'']">
        <el-row>
            <el-col class="colWrap" :span="20">
                <el-col class="col_fixed" :span="4">
                    <el-menu
                    :default-active="currentActive"
                    class="el-menu-vertical-demo"
                    :router="true"
                    @open="handleOpen"
                    @close="handleClose"
                    @select="handleSelect">
                    <el-menu-item index="/personalCenter/myProject">
                        <i class="el-icon-menu"></i>
                        <span slot="title">查看记录</span>
                    </el-menu-item>                    
                    <el-menu-item index="/personalCenter/myRelease">
                        <i class="el-icon-menu"></i>
                        <span slot="title">我的发布</span>
                    </el-menu-item>                    
                    <el-menu-item index="/personalCenter/searchProject">
                        <i class="el-icon-menu"></i>
                        <span slot="title">匹配项目</span>
                    </el-menu-item>
                    <el-menu-item index="/personalCenter/turnVip">
                        <i class="el-icon-setting"></i>
                        <span slot="title">升级为vip</span>
                    </el-menu-item>
                    </el-menu>                    
                </el-col>


                <el-col class="col_right" :span="16">
                    <el-card class="card-right">
                        <router-view></router-view>
                    </el-card>
                </el-col>
            </el-col>
        </el-row>
    </div>
</template>

<script type="text/ecmascript-6">
    import MenuCmp from '@/components/common/Menu.vue'
    export default {
        components:{
            MenuCmp
        },
        data() {
            return {
                noData: false,
                currentActive: '/personalCenter/myProject',
            }
        },
        watch: {
            '$route':{
                handler(to, from){
                    debugger
                    this.currentActive = to.path
                },
                immediate: true
            }
        },
        created(){
            debugger
            // try {
            //     if(this.$route.query.flag){
            //         this.currentActive = '/personalCenter/' + this.$route.query.flag
            //     }
            // } catch (error) {
                
            // }
        },
        methods: {
            handleOpen(key, keyPath) {
                debugger
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            handleSelect(key, keyPath){
                debugger
                console.log(key, keyPath)
                console.log(window.scrollY)
                window.scrollTo(0,0)
                console.log(document.getElementById("app").scrollTop)
                document.getElementById("app").scrollTop = 0

                // switch(key){
                //     case '1':
                //         this.$router.push({
                //             path: '/personalCenter/myProject',
                //         })
                //         break
                //     case '2':
                //         this.$router.push({
                //             path: '/personalCenter/myRelease'
                //         })
                //         break
                //     case '3':
                //         this.$router.push({
                //             path: '/personalCenter/searchProject'
                //         })
                //         break
                //     case '4':
                //         this.$router.push({
                //             path: '/personalCenter/trunVip'
                //         })
                //         break
                // }
            }           
        }
    }
</script>
