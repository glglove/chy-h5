<!--
  User: gaol
  Date: 2020/01/26
  功能： home 页面
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>
.svg-icon 
    width: 36px;
    height: 36px;
    vertical-align: middle;
    fill: #2193FF;
    overflow: hidden;
  
.containerBox
    height 100%
    .topBannerBox
        position relative
        width 100%
        min-height 300px
        .top_tit_box
            position absolute
            top 0
            bottom 0 
            right 0
            left 0
            width 100%
            height 70%
            margin auto
            .titWrap
                margin 0 auto
                .tit_head
                    width 100%
                    font-size 33px
                    color #ffffff
                    font-weight 500
                    letter-spacing 50px
                .tit_middle
                    width 100%
                    font-size 33px
                    font-weight 400
                    color #ffffff
                    margin-top 20px
                    letter-spacing 20px
                .releaseBtn
                    width 100%
                    margin-top 40px
    .recommend
        margin-bottom 50px
        .tit
            font-size 27px
            font-weight 800
        .recommendContainer
            width 70%
            margin 0 auto
            .recommendItem
                width 48%
                >>>.el-table
                    background-color #F4F7F9 !important   
                    .rightColumn_name
                        color #039be5    
                    .rightColumn_money
                        color rgba(0, 0, 0, 0.87)       
    .carousel
        width 70%
        margin 0 auto
        .el-carousel
            overflow-y hidden
            .el-carousel__item
                // position relative
                // display inline-block
                background-color #ffffff
                .carouselTit
                    position absolute
                    top 55%
                    left 50%
                    transform translate(-50%, -50%)
                    .tip
                        // width 185px
                        font-weight 300
                        font-size 15px
                        line-height 25px
                        margin-top 10px
    .stepBox
        .step
            font-size 27px
        .item
            .step_num
                width 60px
                height 60px
                line-height 60px
                border-radius 50%
                margin-right 10px
                font-size 20px
                color #ffffff
                font-weight 600
                vertical-align middle
                background-color gray
            .step_tit_box
                .step_tit_head
                    font-size 17px
                    font-weight bold
                .step_tit_bottom
                    font-size 13px
                    &:nth-of-type(1)
                        margin-top 13px
                    &:nth-of-type(2)
                        margin-top 5px
    .releaseBox
        .tit 
            font-size 27px
            font-weight 800
</style>

<template>
    <div class="home_page">
        <el-row>
            <el-col :span="24">
                <div class="containerBox">
                    <div class="topBannerBox">
                        <el-image
                            style="width: 100%; height: 100%"
                            :src="topBannerPic"  
                            fit="contain"                      
                        >
                        </el-image>
                        <div class="top_tit_box u-f-ac u-f-wrap">
                            <div class="titWrap">
                                <!-- <p class="tit_head u-f0">全网最新项目</p> -->
                                <p class="tit_middle u-f0">全网最新私活,项目，快！全！真！</p>
                                <div class="releaseBtn u-f0">
                                    <el-button 
                                        style="width: 250px;height: 50px;border-radius:100px"
                                        type="primary"
                                        round
                                        @click.native="scanNeeds">
                                        查看私活项目
                                    </el-button>                                    
                                    <el-button 
                                        style="width: 250px;height: 50px;border-radius:100px"
                                        round
                                        @click.native="release">
                                        免费发布需求
                                    </el-button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <el-row class="wrap1330 recommend marginT50">
                        <el-col :span="24">
                            <div class="marginB30" style="font-size: 18px;font-weight: 300">今日新增私活: <span style="color:#F44336;font-weight:bold">2</span> 总私活数: <span style="color: #009688;font-weight: bold">807</span> 已订阅数: <span style="color: #2196F3;font-weight: bold">4690</span></div>
                            <div class="tit marginB50">
                                推荐项目
                            </div>

                            <!-- projectData: {{projectData}} -->
                            <ul class="recommendContainer u-f-ac u-f-ajc">
                                <li class="recommendItem">
                                    <el-table
                                        :data="projectData.leftData"
                                        :header-cell-style="{
                                           'background-color': '#ffffff',
                                            'color': 'rgba(0, 0, 0, 0.87)',
                                            'border-bottom': '1px rgba(0, 0, 0, 0.07) solid'  
                                        }"  
                                        @row-click="handlerClickRow"                                      
                                        >
                                        <el-table-column
                                            prop="projectName"
                                            label="项目"
                                            text-over
                                            class-name="rightColumn_name"
                                            show-overflow-tooltip
                                        >
                                        </el-table-column>
                                        <el-table-column
                                            prop="budget"
                                            label="预算"
                                            class-name="rightColumn_money"
                                            width="80">
                                        </el-table-column>
                                    </el-table>
                                </li>

                                <li class="recommendItem marginL20">
                                    <el-table
                                        :data="projectData.rightData"
                                        :header-cell-style="{
                                           'background-color': '#ffffff',
                                            'color': 'rgba(0, 0, 0, 0.87)',
                                            'border-bottom': '1px rgba(0, 0, 0, 0.07) solid'  
                                        }"
                                        @row-click="handlerClickRow"
                                        >
                                        <el-table-column
                                            prop="projectName"
                                            label="项目"
                                            show-overflow-tooltip
                                            class-name="rightColumn_name"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                            prop="budget"
                                            label="预算"
                                            width="80"
                                            class-name="rightColumn_money">
                                        </el-table-column>
                                    </el-table>                                    
                                </li>                                
                            </ul>
                        </el-col>
                    </el-row>

                    <el-row class="carousel">
                        <el-col :span="24">
                            <el-carousel 
                                height="350px"
                                :interval="2500"
                                arrow="never"
                                type="card"
                                direction="horizontal"
                                :autoplay="true">
                                <el-carousel-item 
                                    v-for="(item, key) in carousel"
                                    :key="key"
                                >
                                    <!-- <h3 class="small">{{item.titName}}</h3> -->
                                    <!-- <el-image
                                        :src="topBannerPic"
                                        fit="contain"   
                                        style="width: 200px;margin-top: 30px"
                                    >
                                    </el-image> -->
                                    <icon-svg :icon-class="item.svgStr" class="marginT50"></icon-svg>                                        
                                    <div class="carouselTit">
                                        <h5>{{item.titName}}</h5>
                                        <P class="tip" v-show="key ==0">发现最新匹配的项目信息,<br>
                                         立即给您邮件推送,获取信息,快人一步！</P>
                                        <P class="tip" v-show="key ==1">已收集<span style="color: #039be5">UpWork, Freelancer</span>, <br><span style="color: #039be5">Coding码市, YesPmp, OsChina众包</span>, <br><span>SxSoft, TaskCity, 猿急送, 猪八戒 等知名平台最新项目</span></P>
                                        <P class="tip" v-show="key ==2">可发布关于Logo设计,Flash动画,<br>电子商务,网页美工及设计,微信<br>
                                         公众平台,VBA,Ipad,知识产权,财<br>税,科技,品牌设计,营销推广, 网络<br>编辑,网站建设,电商,游戏,影视动<br>漫,软件开发相关私活,并为您推<br>荐合适的优秀专业人才</P>                                                                             
                                    </div>
                                </el-carousel-item>
                            </el-carousel>
                        </el-col>
                    </el-row>


                    <!--引入 发布需求组件--start-->
                    <app-types-cmp 
                        :appTypes="appTypes"
                        :isSelectFlag="false"></app-types-cmp>
                    <!--引入 发布需求组件--end-->

                    <el-row class="stepBox marginT50">
                        <el-col :span="24">
                            <h3 class="step">4步，完成您的项目</h3>
                            <ul class="u-f-ac u-f-ajc marginT30">
                                <li class="item u-f-ac u-f-ajc margin20">
                                    <div class="step_num">1</div>
                                    <div class="step_tit_box">
                                        <div class="step_tit_head">发布需求</div>
                                        <p class="step_tit_bottom">免费发布项目需求</p>
                                        <p class="step_tit_bottom">极速对接开发资源</p>
                                    </div>
                                </li>
                                <li class="item u-f-ac u-f-ajc margin20">
                                    <div class="step_num">2</div>
                                    <div class="step_tit_box">
                                        <div class="step_tit_head">发布需求</div>
                                        <p class="step_tit_bottom">免费发布项目需求</p>
                                        <p class="step_tit_bottom">极速对接开发资源</p>
                                    </div>
                                </li>
                                <li class="item u-f-ac u-f-ajc margin20">
                                    <div class="step_num">3</div>
                                    <div class="step_tit_box">
                                        <div class="step_tit_head">发布需求</div>
                                        <p class="step_tit_bottom">免费发布项目需求</p>
                                        <p class="step_tit_bottom">极速对接开发资源</p>
                                    </div>
                                </li>
                                <li class="item u-f-ac u-f-ajc margin20">
                                    <div class="step_num">4</div>
                                    <div class="step_tit_box">
                                        <div class="step_tit_head">发布需求</div>
                                        <p class="step_tit_bottom">免费发布项目需求</p>
                                        <p class="step_tit_bottom">极速对接开发资源</p>
                                    </div>
                                </li>                                
                            </ul>
                        </el-col>
                    </el-row>

                    <el-row class="releaseBox marginT50 marginB50">
                        <el-col :span="24">
                            <div class="tit">现在，开始体验专业的服务</div>
                            <div class="marginT50 marginB30">
                                <el-button 
                                    type="primary"
                                    style="width: 300px;
                                        height: 50px;
                                        border-radius: 100px;
                                        box-shadow:0px 1px 10px 0px #97a8be"
                                        @click.native="release"
                                >免费发布需求</el-button>
                                <el-button 
                                    style="width: 300px;
                                    height: 50px;
                                    border-radius: 100px;
                                    box-shadow:0px 1px 10px 0px #97a8be"
                                >预约项目管家</el-button>
                            </div>
                        </el-col>
                    </el-row>                    
                </div>

            </el-col>
        </el-row>
        <!-- <footer-cmp></footer-cmp> -->
    </div>
</template>

<script type="text/ecmascript-6">
    import { projects } from '@/utils/mout/mout.js'
    import iconSvg from '@/components/common/Icon-svg/index'

    import MenuCmp from '@/components/common/Menu.vue'
    import FooterCmp from '@/components/common/Footer.vue'
    import AppTypesCmp from '@/components/common/AppTypes.vue'

    import topBannerPic from '@/assets/pic/top-banner.jpg'

    import bigDataTypes from '@/assets/pic/bigData_types.png'
    import blockChainTypes from '@/assets/pic/blockChain_types.png'
    import brainPowerTypes from '@/assets/pic/brainPower_types.png'
    import cloudTypes from '@/assets/pic/cloud_types.png'
    import gamesTypes from '@/assets/pic/games_types.png'
    import html5Types from '@/assets/pic/html5_types.png'
    import IOTTypes from '@/assets/pic/IOT_types.png'
    import mobileTypes from '@/assets/pic/mobile_types.png'
    import webTypes from '@/assets/pic/web_types.png'
    import wechatTypes from '@/assets/pic/wechat_types.png'
    export default {
        components:{
            AppTypesCmp,
            MenuCmp,
            FooterCmp,
            iconSvg
        },
        data() {
            return {
                loading: false,
                topBannerPic: topBannerPic,
                projectData: projects,
                timely: 'timely',
                cover: 'cover',
                shuoming: 'shuoming',
                carousel: [
                    {
                        picUrl: '',
                        svgStr: 'timely',
                        titName: '及时推送',
                        text: '发现最新匹配的项目信息,立即给您邮件推送,获取信息,快人一步！'
                    },
                    {
                        picUrl: '',
                        svgStr: 'cover',
                        titName: '覆盖面广',
                        text: '已收集UpWork, Freelancer, Coding码市, YesPmp, OsChina众包, SxSoft, TaskCity, 猿急送, 猪八戒 等知名平台最新项目。'
                    },
                    {
                        picUrl: '',
                        svgStr: 'shuoming',
                        titName: '发布说明',
                        text: '可发布关于Logo设计,Flash动画, 电子商务,网页美工及设计,微信公众平台,VBA,Ipad,知识产权,财税,科技,品牌设计,营销推广, 网络编辑,网站建设,电商,游戏,影视动漫,软件开发相关私活,并为您推荐合适的优秀专业人才'
                    },                                        
                ],
                appTypes: [
                    {
                        id: '1',
                        src: bigDataTypes,
                        name: '大数据',
                        tip: "40,000+ 开发商",
                        isHover: false,
                        isSelected: false,
                    },
                    {
                        id: '2',
                        src: blockChainTypes,
                        name: '区块链',
                        tip: "80,000+ 开发商",
                        isHover: false,
                        isSelected: false,
                    },
                    {
                        id: '3',
                        src: brainPowerTypes,
                        name: '人工智能',
                        tip: "80,000+ 开发商",
                        isHover: false,
                        isSelected: false,
                    },
                    {
                        id: '4',
                        src: cloudTypes,
                        name: '云计算',
                        tip: "80,000+ 开发商",
                        isHover: false,
                        isSelected: false,
                    },
                    {
                        id: '5',
                        src: gamesTypes,
                        name: '游戏开发',
                        tip: "80,000+ 开发商",
                        isHover: false,
                        isSelected: false,
                    },
                    {
                        id: '6',
                        src: html5Types,
                        name: 'HTML5应用',
                        tip: "80,000+ 开发商",
                        isHover: false,
                        isSelected: false,
                    },
                    {
                        id: '7',
                        src: IOTTypes,
                        name: '物联网',
                        tip: "80,000+ 开发商",
                        isHover: false,
                        isSelected: false,
                    },
                    {
                        id: 8,
                        src: mobileTypes,
                        name: 'APP开发',
                        tip: "80,000+ 开发商",
                        isHover: false,
                        isSelected: false,
                    },
                    {
                        id: '9',
                        src: webTypes,
                        name: '网站开发',
                        tip: "80,000+ 开发商",
                        isHover: false,
                        isSelected: false,
                    },
                    {
                        id: '10',
                        src: wechatTypes,
                        name: '微信/小程序',
                        tip: "80,000+ 开发商",
                        isHover: false,
                        isSelected: false,
                    }                                                                                                                                                                                    
                ]
            }
        },
        methods: {
            release(obj){
                this.$router.push({
                    path: '/selectDemandTypes'
                })
            },
            // 查看私活
            scanNeeds(){
                debugger
                let res = this.$hasLogin()
                console.log(res)
                this.$router.push({
                    path: '/projectList'
                })
            },
            handlerClickRow(row, event, column){
                debugger
                this.$router.push({
                    path:"/projectDetail",
                    query: {
                        id: row.id
                    }
                })
            }
        }
    }
</script>
