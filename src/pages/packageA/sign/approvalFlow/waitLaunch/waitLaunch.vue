<!--
  User: xxxxxxx
  Date: 2020/6/16
  功能：审批流-待办
-->
<style lang="scss" scoped src = "">
#waitLaunch {
.tabs {

}
.contentList { 
    height: calc(100vh - 250upx);
    .flowListWrap {
        height: 100%;
        .contentList_mescroll {
            /deep/.mescroll-uni {
                z-index: -1 !important
            }
        }
        .flowListitem {
            // height: 140upx;
            padding: 0 20upx;
            box-sizing: border-box;
            &:active {
                background-color:rgba(96, 98, 102,.1);
            }
            .titInfo {
                font-size: 24upx;
                color: #9d9d9d;
                line-height: 24upx;
            }
            .approvalPeople {
                height: 56upx;
                width: 700upx;
                font-size: 28upx;
                color: #9d9d9d;
            }
        }
    }
}
.contentSlot {
    height: 100%;    
    .contentTit {
        height: 80upx;
        line-height: 80upx;
        text-align: center
    }
    .content_box {
        height: calc(100vh - 160upx);
        overflow: auto;
        .groupWrap {
            padding: 0 40upx;
            .tit {
                font-size: 30upx;
                font-weight: 600
            }
        }  
    }  
}
.u-tag {
    // display: inline-block;
    font-size: 24upx;
    padding: 20upx 20upx;
    &.currentTagClass {
        color: #ffffff;
        background-color: rgb(0, 174, 239);
    }
    &.tagClass {
        color: #454545;
        background-color: #ffffff
    }    
}
.footerBox {
    width: 100%;
    .u-btn {
        margin: 0 10upx;
        color: rgb(96, 98, 102) !important;
        &:nth-of-type(1){
            background-color:rgb(0, 174, 239) !important;
            color: #ffffff !important
        }
    }
}
}
</style>
<template>
    <container
        ref="containerCmp"
        :containerAllloading.sync="containerAllloading"
        :containerLoading="containerLoading"
    >
        <view 
            id="waitLaunch" 
            slot="container-slot" 
            class="page animated fadeInLeft fast"
        >
            <u-navbar 
                title-color="#fff" 
                back-icon-color="#ffffff" 
                :is-fixed="isFixed" 
                :is-back="isBack" 
                :background="background" 
                :back-text-style="{color: '#fff'}" 
                :back-icon-name="backIconName" 
                :back-text="backText"
            >
                <view class="slot-wrap" v-if="useSlot">
                    <view class="search-wrap" v-if="search">
                        <!-- 如果使用u-search组件，必须要给v-model绑定一个变量 -->
                        <u-search v-model="keyword" :show-action="true" height="56" :action-style="{color: '#fff'}"></u-search>
                    </view>
                </view>
                <view class="navbar-right u-f-ajc u-p-r-30" slot="right" v-if="true">
                    <!-- <view class="message-box right-item u-m-r-20">
                        <u-icon name="chat" size="38"></u-icon>
                        <u-badge count="18" size="mini" :offset="[14, 58]"></u-badge>
                    </view> -->
                    <view class="dot-box right-item">
                        <u-icon name="list-dot" size="58" @click="clickSearchCondition"></u-icon>
                        <!-- <u-badge size="mini" :is-dot="true" :offset="[14, 18]"></u-badge> -->
                    </view>
                </view>
            </u-navbar>    
                      
            <u-tabs 
                :list="list" 
                :is-scroll="false" 
                :current="currentTabIndex" 
                @change="changeTab"
                class="tabs">
            </u-tabs>

            <!-- flowListData: {{flowListData}} -->
            <view class="contentList">


					<!-- <view v-for="(data, key) in dataList" :key="key"> 
						{{data.name}}----{{key}}
					</view> -->                   
                <view class="flowListWrap" v-if="!showEmptyPage">
                    <mescroll-uni 
                        class="mescroll_contentList_wrap"
                        ref="mescrollRef" 
                        :height="scrollHeight"
                        @init="mescrollInit" 
                        @down="downCallback" 
                        @up="upCallback" 
                        :down="downOption" 
                        :up="upOption" 
                        id="dataList"
                    >                        
                        <u-swipe-action
                            v-for="(item, key) in flowListData"
                            :key="key"
                            :show="item.show" 
                            :index="key" 
                            @click="click" 
                            @open="open"
                            :options="options"
                        >

                            <view 
                                class="flowListitem 
                                u-f-jc u-f-column 
                                line u-p-t-10 u-p-b-10"
                                @click="scanItemDetail(item)"
                            > 
                                <view class="titInfo u-f-jsb">
                                    <view>名称：{{item.CompanyApprovalName}}</view>
                                    <view>{{ item.RDT | replaceTime }}</view>
                                </view>
                                <view class="tit">{{item.Title}}</view>
                                <view class="approvalPeople ellipsis1">当前审批人：{{item.TodoEmps}}</view>
                            </view>
                        </u-swipe-action>
                    </mescroll-uni>
                </view>          

                <view v-if="showEmptyPage">
                    <!---无数据显示----->
                    <empty-page 
                        ref="emptyPageCmp"
                        :showEmptyPage.sync="showEmptyPage"
                        :emptyType="emptyType" 
                        :emptyText="emptyText"
                        :showEmptyPageBtn.sync="showEmptyPageBtn"
                        :showBtnType = "showBtnType"
                        :showBtnStyle="showBtnStyle"
                        @emitEmptyPageRefresh="emitEmptyPageRefresh"
                    ></empty-page>
                </view>
            </view>    

            <popup-cmp
                ref="popupCmp"
                length="80%"
                :popupDirection="popupDirection"
                @emitPopupCmp_close="emitPopupCmp_close"
                @emitPopupCmp_open="emitPopupCmp_open"
            >
                <view slot="content" class="contentSlot">
                    <view class="contentTit">筛选</view>
                    <view class="content_box">
                        <view 
                            class="groupWrap u-m-t-10"
                            v-for="(group, key) in statusList"
                            :key="key"
                        >
                            <p class="tit">{{group.tit}}</p>
                            <view  class="" style="width: 100%">
                                <u-tag 
                                    class="u-m-15"
                                    v-for="(btnItem, idx) in group.btnList"
                                    :key="idx"
                                    :text="btnItem.name"
                                    :class="((currentStatusIndex==idx && key == 0) 
                                                || (currrentDateIndex == idx && key == 1) 
                                                || (currentTypeIndex == idx && key == 2)) ? 'currentTagClass':'tagClass'"
                                    shape="circle"
                                    :index="idx"
                                    @click="handlerClickTags(key, idx)"
                                >
                                </u-tag>
                            </view>
                        </view>
                    </view>

                    <view class="footerBox u-fi-ajc marginAuto center">
                        <u-button 
                            size="medium"
                            :ripple="true" 
                            ripple-bg-color="#909399"
                            style="width: 80upx"
                            @click="handlerSure"
                        >确认</u-button>
                        <u-button
                            size="medium"
                            :ripple="true" 
                            ripple-bg-color="#909399"
                            style="width: 80upx"
                            @click="handlerCancel"
                        >取消</u-button>
                        <u-button
                            size="medium"
                            :ripple="true" 
                            ripple-bg-color="#909399"                        
                            style="width: 80upx"
                            @click="handlerReset"
                        >重置</u-button>
                    </view>                      
                </view>              
            </popup-cmp>
        </view>
    </container>
</template>

<script>
import { miniProApi } from '@/utils/mixins.js'
import FlowListCmp from '../flowList-cmp'
import {
    todolist,
    // myJoinFlow,
    // send
} from '@/api/workFlow'
export default  {
    mixins: [ miniProApi ],
    components: {
        FlowListCmp
    },
    data(){
        return {
            backText: '返回',
            backIconName: 'arrow-left',
            right: false,
            showAction: false,
            rightSlot: false,
            useSlot: true,
            background: {
                'background-image': 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
            },
            isBack: true,
            search: true,
            custom: true,
            isFixed: true,
            keyword: '',
            // #ifdef MP
            slotRight: false,
            // #endif
            // #ifndef MP
            slotRight: false,
            // #endif
            list: [
                {
					name: '待办审批'
                }, 
                {
					name: '我已审批'
                }
            ],
            currentTabIndex: 0,
            mescroll:null, 
            upOption: {
                auto: false, //是否在初始化完毕之后自动执行一次上拉加载的回调
                use: true, // 是否启用上拉刷新 如果配置false,则不会初始化上拉刷新的布局
                isBounce: true, //是否允许橡皮筋回弹效果, 默认不允许
                page: {
                    num: 1, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
                    size: 10,  // pageSize 为miniProApi data中的共有值
                    time: null,  //加载第一页数据服务器返回的时间 (可空); 防止用户翻页时,后台新增了数据从而导致下一页数据重复;
                },
                textLoading: '加载中 ...',  //上拉加载中的文本
                textNoMore: '-- END --',  // 没有更多数据的提示文本
                bgColor: 'transparent', // 下拉区域背景颜色 
                textColor: 'gray', // 下拉文本的颜色 (当bgColor配置了颜色,textColor未配置时,则会默认为白色 1.2.4新增) 
                noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
                empty: {//列表第一页无任何数据时,显示的空提示布局; 需配置warpId或clearEmptyId才生效;
                    //列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
                    // warpId:	"xxid", //父布局的id (1.3.5版本支持传入dom元素)													
                    use: false, // 是否启用
                    btnText: '返回', // 按钮文本
                    icon:require("@/components/mescroll-uni/components/mescroll-uni/mescroll-empty.png"), //图标,默认null
                    tip: "暂无相关数据~", //提示							
                }, 
                toTop: {
                    //回到顶部按钮
                    // src: "../img/mescroll-totop.png", //图片路径,默认null,支持网络图
                    offset: 1000 //列表滚动1000px才显示回到顶部按钮	
                },					
                clearEmptyId: "dataList", //相当于同时设置了clearId和empty.warpId; 简化写法;默认null，配置了此项后数据请求里就不需要配置if(pageindex == 1) {self.tableData = [];}
            },
            // 下拉刷新的配置(可选, 90%的情况无需配置)
            downOption: { 
                use: true, // 是否启用下拉刷新 如果配置false,则不会初始化下拉刷新的布局
                auto: false, //是否在初始化完毕之后自动执行一次下拉加载的回调
            },	            
            flowListData: [],
            options: [
                {
                    text: '收藏',
                    style: {
                        backgroundColor: '#007aff'
                    }
                },
                {
                    text: '删除',
                    style: {
                        backgroundColor: '#dd524d'
                    }
                }                    
            ],
            queryTodoObj: {
                key: '',
                no: '',
                flowSortNo: '',
                dept: '',
                starter: '',
                days: '',
                begin: '',
                end: '',
                wfState: -1,
                taskSta: '',
                pageSize: 10,
                pageNum: 1                
            },
            queryMyObj: {
                key: '',
                no: '',
                flowSortNo: '',
                dept: '',
                starter: '',
                days: '',
                begin: '',
                end: '',
                wfSta: -1,
                pageSize: 10,
                pageNum: 1
            },                      
            popupDirection: 'right',
            statusList: [
                {
                    tit: '状态',
                    btnList: [
                        {
                            id: 1,
                            name: '审批中',
                        },
                        {
                            id: 2,
                            name: '审批通过',
                        },
                        {
                            id: 3,
                            name: '审批拒绝',
                        },
                        {
                            id: 4,
                            name: '审批已撤回',
                        },
                        {
                            id: 5,
                            name: '全部',
                        },                                                                                                
                    ]
                },
                {
                    tit: '日期',
                    btnList: [
                        {
                            id: 1,
                            name: '本月',
                        },
                        {
                            id: 2,
                            name: '上月',
                        },
                        {
                            id: 3,
                            name: '三个月内',
                        },
                        {
                            id: 4,
                            name: '六个月内',
                        },
                        {
                            id: 5,
                            name: '一年以内',
                        },    
                        {
                            id: 6,
                            name: '全部',
                        },                                                                                                                     
                    ]
                }, 
                {
                    tit: '类型',
                    btnList: [
                        {
                            id: 1,
                            name: '人事',
                        },
                        {
                            id: 2,
                            name: '财务',
                        },
                        {
                            id: 3,
                            name: '出勤类',
                        },                                                                                               
                    ]
                },                               
            ],
            currentStatusIndex: -1,
            currrentDateIndex: -1,
            currentTypeIndex: -1,
        }
    },
    computed: {
        scrollHeight(){
            let height = this.pHeight - 84
            return `${height}px`
        }
    },
    onLoad() {
        this.getData()
    },
    onShow() {

    },    
    methods: {
        changeTab(index) {
            this.currentTabIndex = index;
        },
        emitEmptyPageRefresh(){

        },
        clickSearchCondition(e){
            // debugger
            // this.showPopup = !this.showPopup
            this.$refs.popupCmp.openPop()
        },
        // 下拉刷新
        downRefreshPage(page, mescroll){
            debugger
            if(mescroll){
                console.log("下拉刷新")	
                mescroll.endSuccess(10, false)				
            }
        },
        click(index, index1) {
            debugger
            if(index1 == 1) {
                this.flowListData.splice(index, 1);
                this.$u.toast(`删除了第${index}个cell`);
            } else {
                this.flowListData[index].show = false;
                this.$u.toast(`收藏成功`);
            }
        },
        // 如果打开一个的时候，不需要关闭其他，则无需实现本方法
        open(index) {
            // 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
            // 原本为'false'，再次设置为'false'会无效
            this.flowListData[index].show = true;
            this.flowListData.map((val, idx) => {
                if(index != idx) this.flowListData[idx].show = false;
            })
        },        
        // 上拉加载
        upRefreshPage(page, mescroll){
            debugger
            if(mescroll){
                console.log("上拉刷新")	
                mescroll.endSuccess(10, false)						
            }
        },  
        // 查看详情
        scanItemDetail(row){
            debugger
            let queryObj = {
                no: row.FK_Flow,
                name: row.CompanyApprovalName,
                workId: row.WorkId,
                nodeId: row.FK_Node
            }               
            this.togoPage("/pages/packageA/sign/approvalFlow/waitLaunch/launchDetail/launchDetail", queryObj)
        },       
        // 数据初始化
        getData () {
            this.showLoading("正在加载", true)
            todolist(this.queryTodoObj).then(res => {
                debugger
                this.hideLoading()
                if (res.data.State === this.REQ_OK) {
                    this.flowListData = res.data.Data
                } else {
                    this.$refs.containerCmp.$refs.uTips.show({
                        title: `${res.data.Error}`,
                        type: 'warning',
                        duration: '3000'                    
                    })
                }
            }).catch(() => {
                this.hideLoading()
                this.$refs.containerCmp.$refs.uTips.show({
                    title: `待办数据获取失败，请重试`,
                    type: 'warning',
                    duration: '3000'                    
                })
            })
        },     
        handlerClickTags(key, idx){
            // debugger
            if(key == 0){
                this.currentStatusIndex = idx
            }else if (key == 1){
                this.currrentDateIndex = idx
            }else if(key == 2){
                this.currentTypeIndex = idx
            }            
        },
        handlerSure(){
            this.showLoading("正在加载",true)
        },
        handlerCancel(){
            this.$refs.popupCmp.closePop()
        },
        handlerReset(){
            this.currentStatusIndex = -1
            this.currrentDateIndex = -1
            this.currentTypeIndex = -1
        }
    },
}   
</script>
