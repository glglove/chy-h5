<!--
  User: xxxxxxx
  Date: 2020/6/16
  功能：空页面组件
-->
<template>
	<u-empty :text="emptyText" :mode="emptyType" v-if="showEmptyPage">
        <u-button 
            v-if="showEmptyPageBtn && showBtnType == 1"
            slot="bottom"
            size="mini" 
            :style='showBtnStyle'
            :ripple="true" 
            ripple-bg-color="#909399"
            @click="handlerClickEmptyBtn"
        >返回</u-button>
        <u-button 
            v-if="showEmptyPageBtn && showBtnType == 2"
            slot="bottom"
            :style='showBtnStyle'
            size="mini" 
            :ripple="true" 
            ripple-bg-color="#909399"
            @click="handlerClickEmptyRefreshBtn"
        >重新刷新</u-button>        
	</u-empty>  
</template>

<script>
import { REQ_OK } from '@/api/config'
// import { miniProApi } from '@/utils/mixins.js''
export default  {
    props: {
        showEmptyPage: {
            type: Boolean,
            default: false
        },
        emptyType: {
            type: String,
            default: 'data', // //car 、page、search、address、wifi、order、coupon、favor、permission、history、news、message、list、data
        },
        emptyText: {
            type: String,
            default: '暂无数据'
        },
        // 是否显示 操作按钮
        showEmptyPageBtn: {
            type: Boolean,
            default: true
        },
        // 操作按钮的类型
        showBtnType: {
            type: Number,
            default: 1  // 1是 返回按钮  2 是重新刷新按钮
        },        
        showBtnStyle: {
            type: Object,
            default: () => {
                return {
                    'backgroundColor': 'rgba(41,121,255,1)',
                    'color':'rgb(255,255,255)' 
                }
            }
        }
    },
    data(){
        return {
                  
        }
    },
    // minxin中增加的一个 在onLoad之前的钩子函数 
    onComLoad(){

    },
	onLoad(options) {
        // debugger
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
        // 点击 无数据页面的 返回btn
        handlerClickEmptyBtn(){
            uni.navigateBack({
                delta: 1
            })				
        },
        // 
        handlerClickEmptyRefreshBtn(){
            this.$emit("emitEmptyPageRefresh")
        }
    }
}   
</script>

<style scoped lang="scss">
    .u-empty {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto
    }
</style>
