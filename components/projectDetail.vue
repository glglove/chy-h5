<!--
  User: gaol
  Date: 2020/01/26
  功能： 查看项目详情页面
-->

<style lang="stylus" rel="sheet/stylus" scoped>
.col
    float none
    margin 0 auto
.page_projectDetail
    min-height calc(100vh - 110px)
    margin-top 30px
    .card-box
        min-height calc(100vh - 110px)
        .header
            padding 15px
            .money
                color red
                font-size 16px
        .detail_main
            text-align left
        .detail_content_box
            margin-top 20px
            .detail_content_tit
                font-size 16px
                text-align left
            .container
                line-height 40px
                text-align left
            .file
                text-align left 
                font-weight 600
                color #000
</style>

<template>
    <el-row>
        <el-col :span="12" class="col">
            <div :class="['page_projectDetail', noData?'not_found':'']">
                <el-card class="card-box">
                    <div class="header line u-f-ac u-f-jsb">
                        <h3>对接企业微信和钉钉的工时管理系统</h3>
                        <span class="money">
                            $5000
                        </span>
                    </div>
                    
                    <div class="detail_main marginT20" style="color:#999;font-size: 14px">
                        <p>
                            发布日期：
                            <span style="padding-left: 10px">2020-2-20</span>
                        </p>
                        <p class="marginT20">
                            项目周期：
                            <span style="padding-left: 10px">3天</span>
                        </p>
                    </div> 

                    <div class="detail_content_box">
                        <h3 class="detail_content_tit">需求描述</h3>
                        <div class="line container">
                            基于GOST程序新增几个功能

                            https://github.com/nuerzh/gost
                            gi


                            1.指定IP绑定出口方式

                            2.基于多IP列表形式绑定，服务器IP如下

                            3.服务端有多个网卡，实现源进源出

                            4.服务端支持端口复用机制，并支持多核心CPU绑定。

                            如有疑问可以加下我 QQ 8610516
                        </div>
                        <div class="file marginT20">
                            附件
                        </div>
                    </div>
                </el-card>
            </div>          
        </el-col>
    </el-row>
</template>

<script type="text/ecmascript-6">
    import MenuCmp from '@/components/common/Menu.vue'
    export default {
        components:{
            MenuCmp
        },
        data() {
            return {
                noData: false
            }
        },
        created(){
            document.getElementById("app").scrollTop = 0            
        },
    }
</script>
