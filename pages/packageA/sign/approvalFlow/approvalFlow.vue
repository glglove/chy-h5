<!--
  User: xxxxxxx
  Date: 2020/6/16
  功能：审批流页面
-->
<style lang="scss" scoped src = "">
#approvalFlow {

}
.catTit {
    text-indent: 16upx;
    font-size: 32upx;
}
.grid-text {
    font-size: 28rpx;
    margin-top: 4rpx;
    color: $u-type-info;
    // color: red;
}
</style>
<template>
    <container ref="containerCmp">
        <view id="approvalFlow" slot="container-slot" class="page animated fadeInLeft fast">
            <view class="catTit">
                常用
            </view>
            <u-grid :col="4" @click="handlerClickCat">
                <u-grid-item index="startLaunch">
                    <u-icon name="photo" :size="92" color='red'></u-icon>
                    <view class="grid-text">发起审批</view>
                </u-grid-item>
                <u-grid-item index="waitLaunch">
                    <u-icon name="lock" :size="92" color='red'></u-icon>
                    <view class="grid-text">待办审批</view>
                </u-grid-item>
                <u-grid-item index="copyToMe">
                    <u-icon name="hourglass" :size="92" color='red'></u-icon>
                    <view class="grid-text">抄送我的</view>
                </u-grid-item>
            </u-grid>   
            <view class="catTit">
                其他
            </view>     

            <u-grid :col="4"  @click="handlerClickCat">
                <u-grid-item index="onTheWay">
                    <u-icon name="photo" :size="92" color='red'></u-icon>
                    <view class="grid-text">在途</view>
                </u-grid-item>
                <u-grid-item index="myStart">
                    <u-icon name="lock" :size="92" color='red'></u-icon>
                    <view class="grid-text">我发起的</view>
                </u-grid-item>
                <u-grid-item index="myFollow">
                    <u-icon name="hourglass" :size="92" color='red'></u-icon>
                    <view class="grid-text">我关注的</view>
                </u-grid-item>
                <u-grid-item index="myPending">
                    <u-icon name="hourglass" :size="92" color='red'></u-icon>
                    <view class="grid-text">我挂起的</view>
                </u-grid-item>                
            </u-grid>                 
        </view>
    </container>
</template>

<script>
// 引入mescroll-mixins.js
import MescrollMixin from "@/components/mescroll-uni/components/mescroll-uni/mescroll-mixins.js"
import { miniProApi } from '@/utils/mixins.js'
export default  {
    mixins: [
        MescrollMixin,
        miniProApi
    ], // 这里一定需要 MescrollMixin 放在 miniProApi前面 否则上/下拉刷新不会生效，因为此时 还没有初始化mescorll
    data(){
        return {
            
        }
    },
    methods: {
        handlerClickCat(str){
            // debugger
            let resUrl = this.$findPageUrl(str)
            this.togoPage(resUrl)
            // this.$refs.containerCmp.$refs.uToast.show({
            //     title: '正在加载',
            //     type: 'default',
            //     duration: 100,
            //     url: resUrl
            // })
        }
    },
}   
</script>
