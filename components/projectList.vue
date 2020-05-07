<!--
  User: gaol
  Date: 2020/01/26
  功能： 项目市场 页面
-->

<style lang="stylus" rel="sheetstylus" scoped>
.page_projectList
    min-height calc(100vh - 110px)
    .projectRow
        float none
    .catBox
        .cat
            padding-bottom 10px
            border-bottom 1px solid silver
            box-sizing border-box
            .tit
                width 130px
                font-size 14px
                color #151519
            .cat_item_box
                .catitem
                    border none 
                    color #999
                    &:first-child
                        background-color #1890ff
                        color #ffffff
        .buget
            .tit
                width 130px
                font-size 14px 
                color #151519
            .buget_item_box
                .bugetitem
                    border none 
                    color #999
                    &:first-child
                        background-color #1890ff
                        color #ffffff                
    .catProjectListBox
        .catprojectitem
            .leftContent
            .rightContent
                .top
                    font-size 14px
                    font-weight 400
                    .top_left
                    .top_right
                      .money
                          color #f00
                .bottom
                    font-size 14px
                    font-weight 400

</style>

<template>
    <div :class="['page_projectList', noData?'not_found':'']">
        <el-row class="projectListBox marginT50">
            <el-col :span="12" class="projectRow marginAuto">
                <div class="searchBox u-f-ac u-f-jsb">
                    <el-input 
                        class="u-fs2 marginR5"
                        placeholder="输入关键词,搜索您感兴趣的项目,例如：小程序，网站，微信"
                    ></el-input>
                    <el-button 
                        style="width: 80px"
                        type="primary" icon="el-icon-search"></el-button>
                    <el-button 
                        style="font-size: 14px;font-weight:400"
                        type="primary"
                        @click.native="releaseDemand">免费发布需求</el-button>
                </div>

                <div class="catBox marginT30">
                    <el-card
                        shadow="never"
                        class="card-box"
                    >
                        <div class="cat u-f-ac u-f-jsb">
                            <div class="tit">应用类型：</div>
                            <div class="cat_item_box u-f-ac u-f-wrap">
                                <el-button
                                    class="catitem margin5"
                                    v-for="(item, key) in appTypes"
                                    :key="key"
                                    size="mini"
                                >
                                    {{item.typeName}}
                                </el-button>
                            </div>
                        </div>

                        <div class="buget marginT20 u-f-ac u-f-jsb">
                            <div class="tit">金额范围：</div>
                            <div class="buget_item_box u-f-ac u-f-wrap">
                                <el-button
                                    class="bugetitem margin5"
                                    v-for="(item, key) in bugets"
                                    :key="key"
                                    size="mini"
                                >
                                    {{item.money}}
                                </el-button>
                            </div>
                        </div>
                    </el-card>
                </div>

                <div class="catProjectListBox marginT10" v-loading = 'loading'>
                    <el-card
                        shadow="hover"
                        class="card-box"
                    >
                        <div class="catprojectitem u-f-ac u-f-jsb">
                            <div class="leftContent u-f0 marginR10">
                                <el-image style="width: 50px" it="contain" :src="require('@/assets/logo.png')"></el-image>
                            </div>

                            <div class="rightContent u-f1">
                                <div class="top u-f-ac u-f-jsb">
                                    <div class="top_left">
                                        <h4 class="tit">
                                            企业ERP系统包含OA功能
                                        </h4>
                                        <div class="tag marginT10">
                                            <el-tag size="mini">项目</el-tag>
                                            <el-tag size="mini">企业应用</el-tag>
                                            <el-tag size="mini">6个月</el-tag>
                                        </div>
                                    </div>
                                    <div class="top_right">
                                        <div class="money">
                                            <span>$10000-50000</span>
                                        </div>
                                    </div>
                                </div>   
                                <div class="bottom u-f-ac u-f-jsb">
                                    <div class="marginT20">
                                        <span style="font-size: 14px;color:#999">项目详情简介：</span>
                                        <el-button type="text" size="mini" @click.native="scanDetail">查看</el-button>
                                    </div>
                                    <div class="u-f-ac u-f-jsb">
                                        <p class="time marginR10" style="font-size: 14px;color:#999">发布于 2020-02-19</p>
                                        <el-button type="text" size="mini">查看联系方式</el-button>                                        
                                    </div>
                                </div>   
                            </div>
                        </div>
                    </el-card>

                    <el-pagination
                        style="width:100%;text-align:right"
                        class="paginationCmp marginT5"
                        background
                        layout="prev, pager, next"
                        :total="1000">
                    </el-pagination>
                </div>       
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
                loading: false,
                noData: false,
                appTypes: [
                    {
                        typeName: '不限'
                    },
                    {
                        typeName: '大数据',
                    },
                    {
                        typeName: '区块链',
                    },
                    {
                        typeName: '人工智能',
                    },
                    {
                        typeName: '云计算',
                    },
                    {
                        typeName: '游戏开发',
                    },
                    {
                        typeName: 'HTML5应用',
                    },
                    {
                        typeName: '物联网',
                    },
                    {
                        typeName: 'APP开发',
                    },
                    {
                        typeName: '网站开发',
                    },
                    {
                        typeName: '微信/小程序',
                    },                                                                                                                                                                                    
                ],
                bugets: [
                    {
                        money: '不限',
                    },
                    {
                        money: '5000以下'
                    },
                    {
                        money: '5000-10000'
                    },
                    {
                        money: '10000-50000'
                    },
                    {
                        money: '50000-100000'
                    },
                    {
                        money: '100000-500000'
                    },
                    {
                        money: '500000及以上'
                    }
                ]
            }
        },
        created(){
            document.getElementById("app").scrollTop = 0
        },
        methods: {
            scanDetail(){
                this.$router.push({
                    path: '/projectDetail'
                })
            },
            releaseDemand(){
                this.$router.push({
                    path: '/selectDemandTypes'
                })
            }
        }
    }
</script>
