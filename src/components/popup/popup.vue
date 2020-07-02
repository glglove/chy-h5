<!--
  User: xxxxxxx
  Date: 2020/6/16
  功能：popup弹出组件
-->
<template>
    <u-popup 
        v-model="showPopup" 
        @close="closePop" 
        @open="openPop" 
        :mode="popupDirection" 
        :length="length"
        :border-radius="borderRadius"
        :safe-area-inset-bottom="safeAreaInsetBottom"
        :mask-close-able="maskCloseAble"
        :mask="mask"
        :closeable="closeable"
        :close-icon-pos="closeIconPos"
        :close-icon-color="closeIconColor"
        :close-icon-size="closeIconSize"
    >
        <view 
            v-if="popupDirection == 'center'" 
            style="width: 400rpx;height: 400rpx"
        >
            <!-- <view class="close-btn">
                <u-button @click="showPopup = false;" size="medium">关闭弹窗</u-button>
            </view> -->
            <slot name="content"></slot>
        </view>
        <view class="contentBox" v-if="popupDirection != 'center'">
            <!-- <u-button size="medium" @click="showPopup = false;">关闭弹窗</u-button> -->
            <slot name="content"></slot>
        </view>
    </u-popup> 
</template>

<script>
import { REQ_OK } from '@/api/config'
// import { miniProApi } from '@/utils/mixins.js''
export default  {
    props: {
        mask: {
            type: Boolean,
            default: true
        },
        length: {
            type: [Number, String],
            default: '50%', // 此值可以是数值(单位rpx)，auto，百分比等，内部会自动处理对应的逻辑。 如果为auto的时候，表示弹窗的宽度 | 高度由内容撑开。
        },
        popupDirection: {
            type: String,
            default: 'left', //left top right bottom center
        },
        borderRadius: {
            type: Number,
            default: 10
        },
        zIndex: {
            type: Number,
            default: 10075
        },
        safeAreaInsetBottom: {
            type: Boolean,
            default: true  // 是否开启底部安全区适配
        },
        maskCloseAble: {
            type: Boolean,
            default: true, //  点击遮罩是否可以关闭弹出层
        },
        closeable: {
            type: Boolean,
            default: true, //是否显示关闭图标  
        },
        closeIconPos: {
            type: String,
            default: 'top-right', //  自定义关闭图标位置，top-left为左上角，top-right为右上角，bottom-left为左下角，bottom-right为右下角
        },
        closeIconColor: {
            type: String,
            default: '#909399' // 关闭图标的颜色
        },
        closeIconSize: {
            type: [String, Number],
            default: 30 // 关闭图标的大小，单位rpx	String | Number	
        },
        customStyle: { //用户自定义样式
            type: Object,
            default: () => {
                return {}
            } 
        }
    },
    data(){
        return {
            showPopup: false,   
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
        closePop () {
            // this.$emit("emitPopupCmp_close")
            this.showPopup = false
        },
        openPop() {
            // this.$emit("emitPopupCmp_open")
            this.showPopup = true
        },
    }
}   
</script>

<style scoped lang="scss">
.contentBox {
    position: relative;
    height: 100%;
}
</style>
