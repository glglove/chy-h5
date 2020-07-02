<!--
  User: xxxxxxx
  Date: 2020/6/16
  功能：审批流-发起审批
-->
<style lang="scss" scoped src = "">
#startLaunch {
    .collapseWrap {
        background-color: rgba(243,244,246,1)
    }
    /deep/.u-collapse-head {
        padding: 12px 0 0 15px !important
    }
    /deep/.u-card__head {
        display: none;
    }
    .collapse-item {
        color: #9d9d9d;
    }
}
</style>
<template>
    <container
        ref="containerCmp"
        :containerAllloading.sync="containerAllloading"
        :containerLoading.sync = "containerLoading"
    >
        <view id="startLaunch" slot="container-slot" class="page animated fadeInLeft fast">
            <!-- itemList： {{itemList}} -->
            <!-- <u-sticky :offset-top="statusBarHeight + navbarHeight"> -->
                <u-collapse class="collapseWrap">
                    <u-collapse-item 
                        :title="item.Name" 
                        v-for="(item, index) in itemList" 
                        :key="index"
                        :index="index"
                    >
                        <u-card 
                            :title='item.BusinessAreaCode' 
                            sub-title="副标题">
                            <view class="" slot="body" >
                                <view 
                                    class="collapse-item click-able"
                                    :class="{'u-m-t-20 u-m-b-20': key!=0 && key!=(item.Flows.length-1)}"
                                    v-for="(flow, key) in item.Flows"
                                    :key="key"
                                    @click="handlerClickFlowItem(key, flow)"
                                >
                                    {{flow.Name}}
                                </view>                    
                            </view>
                            <!-- <view class="" slot="foot"><u-icon name="chat-fill" size="34" color="" label="30评论"></u-icon></view> -->
                        </u-card>                
                    </u-collapse-item>
                </u-collapse>   
            <!-- </u-sticky>                     -->
        </view>
    </container>
</template>

<script>
// import container from '@/components/container/container'
import { REQ_OK } from '@/api/config'
import { miniProApi } from '@/utils/mixins.js'
import {
    StartList
} from '@/api/workFlow'
export default  {
    mixins: [ miniProApi ],
    comments: {
        // container
    },
    data(){
        return {
            itemList: [],
            statusBarHeight: uni.getSystemInfoSync().statusBarHeight,// 状态栏高度，H5中，此值为0，因为H5不可操作状态栏            
            navbarHeight: 44
        }
    },
    // minxin中增加的一个 在onLoad之前的钩子函数 
    onComLoad(){

    },
	onLoad(options) {
        debugger
        this._getComList()
	},	
	onShow() {	
		console.log('onShow')
	},
	// 页面初次渲染完成
	onReady(){
		console.log('onReady')
	},
	onHide(){
		console.log('onHide')
	},
	onUnload (){
		console.log('onUnload')
    },
	onPullDownRefresh(){
		// 下拉刷新
		this.refreshPage()
		console.log('onPullDownRefresh')
	},
	onReachBottom (){
		// 上拉加载
		console.log(' onReachBottom')
	},
	onShareAppMessage(){
		console.log('onShareAppMessage')
    },
	onPageScroll(){
        // debugger
		console.log('onPageScroll')
	},
	onTabItemTap(){
		console.log('onTabItemTap')	
	},            
    methods: {
        _getComList(){
            this._StartList()
        },
        _StartList(){
            // debugger
            this.containerAllloading = true
            // this.containerLoading = true
            StartList().then(res => {
                this.containerAllloading = false
                // debugger
                if(res && res.data.State === REQ_OK){
                    this.itemList = res.data.Data
                    // let a = []
                    // for(let i = 0; i< 4; i++){
                    //     a = JSON.parse(JSON.stringify(this.itemList))
                    //     this.itemList = this.itemList.concat(a)
                    // }
                }else {
                  this.toast("请求失败")  
                }
            })
        },
        handlerClickFlowItem(idx, row){
            debugger
            let queryObj = {
                no: row.No,
                name: row.Name
            }    
            this.togoPage("/pages/packageA/sign/approvalFlow/startLaunch/newLaunch", queryObj)     
        }
    },
}   
</script>
