<!--
  User: xxxxxxx
  Date: 2020/6/16
  功能：审批流-我发起的
-->
<style lang="scss" scoped src = "">
#myStart {
    .ding {
        height: 300rpx;
        background-color: aquamarine;
    }
    .st {
        height: 100rpx;
        width: 750rpx;
        background-color: #fff;
        // z-index: 900;
        /* top: 300upx; */
    }
    .sticky-fixed {
        /* #ifdef H5 */
        position: sticky;
        top: 44px;
        /* #endif */
        /* #ifndef H5 */
        position: fixed;
        top: 0;
        /* #endif */
        z-index: 900;
    }
    .xiala {
        height: 2500px;
        background-color: #eee;
        padding-top: 100rpx;
    }
}
</style>
<template>
    <container>
        <view id="myStart" slot="container-slot" class="page animated fadeInLeft fast">
            我发起的页面 
            <view class="ding">顶部实现</view>

            <view :class="{'st':true,'sticky-fixed': isF}">我是浮动栏</view>

            <u-sticky offset-top="0" @fixed="startFixed" index="one">
                <view :class="{'st':true}">我是浮动栏1</view>
            </u-sticky>                
   
            <u-sticky offset-top="0" index="two" @fixed="startFixed">
                <view :class="{'st':true}">我是浮动栏2</view>
            </u-sticky>           

            <view class="xiala">文章内容</view>  
        </view>
    </container>
</template>

<script>
export default  {
    data(){
        return {
            yuanH: uni.upx2px(300),
            isF: false, 
        }
    },
    methods: {
        onPageScroll(e) {
            // console.log(this.yuanH)
            // console.log("e.scrollTop",e.scrollTop)
            //#ifdef H5
            this.isF = true
            // #endif
            // #ifndef H5
            if (this.yuanH > e.scrollTop) {
                this.isF = false
            } else {
                this.isF = true
            }
            // #endif
        },
        // 吸顶组件吸顶时触发
        startFixed(index){
            debugger
        },
    },
}   
</script>
