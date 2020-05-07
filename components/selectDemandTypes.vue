<!--
  User: gaol
  Date: 2020/01/26
  功能： 发布需求-选择需求类型 页面
-->

<style lang="stylus" rel="sheetStylus" scoped>
.el-card
    background-color #F4F7F9 !important
.page_selectDemand
    min-height calc(100vh - 180px)
    .titBox
        height 30px
        line-height 30px
        // border-bottom 1px solid silver
    .grid-container
        width 70%
        margin 50px  auto 50px auto
        .item
            width 15%
            margin 10px
            &.isHover
                cursor pointer        
            .imageBox
                position relative
                width 80px
                height 80px
                margin 0 auto
                border-radius 50%
                border 1px solid #63B5FB            
                .image
                    position absolute
                    top 50%
                    left 50%
                    transform translate(-50%, -50%)
                    >>>.el-image__inner
                        width 50px
                        height 50px
            .card_bottom
                .tit_name
                    font-size 18px
                    font-weight 800
                    color #48576a
                    text-align center
                    margin-bottom 20px
                .bottom
                    height 35px
                    line-height 35px
                    // background #42A7FF
                    margin-top 10px
                    cursor pointer
                .bottom_release
                    height 35px
                    line-height 35px
                    background #42A7FF
                    margin-top 10px
                    cursor pointer
                    .release_text
                        font-size 18px
                        font-weight 400
                        color #ffffff !important
                .bottom_release_isSelect
                    height 35px
                    line-height 35px
                    // background #42A7FF
                    margin-top 10px
                    cursor pointer
                    &.isSelected
                        background-color red  
                        height 70px                
                    .release_text
                        font-size 15px
                        font-weight 300                  
                        color #ffffff !important                               
</style>

<template>
    <div class="page_selectDemand marginT20">
        <div class="titBox marginT10">
            <h4>
                选择需求的应用类型进行发布
            </h4>
        </div>        
        <el-row 
            :style="styleBox"
            class="grid-container wrap1330 u-f-ac u-f-ajc u-f-wrap">
            <!--发布需求选择类型页面---->
            <div 
                v-if="isSelectFlag"
                v-for="(item,key) in AppTypes"
                :key="item.id"
                :class="['item', `'item_${key}'`, item.isHover? 'isHover':'']"
                @mouseover="mouseoverStyle(item)"
                @mouseout="mouseoutStyle(item)"
                @click="handlerClick(item)"            
            >
                <el-card 
                    v-if="isSelectFlag"
                    type="card"
                    shadow="hover">
                    <div class="imageBox">
                        <el-image 
                            :src="item.src" 
                            class="image"
                            fit="fill">
                        </el-image>
                    </div>

                    <!--releaseDemand页面--->
                    <div :class="['card_bottom', 'marginT10']">
                        <span class="tit_name">{{item.name}}</span>
                        <div class="bottom clearfix" v-show="!item.isHover">
                            <el-button type="text" class="button" style="color: #48576a">{{item.tip}}</el-button>
                        </div>
                        <!-- item.isHover: {{item.isHover}} -->
                        <div 
                            class="bottom_release clearfix" 
                            v-show="item.isHover" 
                        >
                            <p class="release_text">发布需求</p>
                        </div>                                                    
                    </div>                
                </el-card>
            </div>
        </el-row>
    </div>
</template>

<script type="text/ecmascript-6">
    import MenuCmp from '@/components/common/Menu.vue'
    import FooterCmp from '@/components/common/Footer.vue'
    import AppTypesCmp from '@/components/common/AppTypes.vue'

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
        props: {
        },
        components:{
            MenuCmp,
            AppTypesCmp,
            FooterCmp
        },
        data() {
            return {
                noData: true,
                isSelectFlag: true,
                AppTypes: [
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
                        id: '8',
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
        computed: {
            styleBox(){
                return 'marginTop: 10px'
            }
        },
        created(){
            debugger
            console.log(this.$route.query.id)
        },
        methods: {
            // 发布指定类型的需求            
            handlerClick(item){
                debugger
                item.isSelected = true
                this.$router.push({
                    path: '/releaseDemand',
                    query: {
                        id: item.id
                    }
                })                
            },
            mouseoverStyle(item){
                // debugger
                item.isHover = true
            },
            mouseoutStyle(item){
                // debugger
                item.isHover = false
            },                     
        }
    }
</script>
