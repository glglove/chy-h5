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
.u-grid-item-box {
    .iconWrap {
        width:100upx;
        height:100upx;
        border-radius: 10upx;
        &:nth-of-type(1) {
            background: #65C5F4;
        }
    }
}

.grid-text {
    font-size: 26rpx;
    margin-top: 6rpx;
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
                    <view class="iconWrap u-f-ajc" :style="{'background':'rgb(101, 197, 244)'}">
                        <u-icon name="faqishenpi" size="44" color='#ffffff' custom-prefix="my-iconfont"></u-icon>
                    </view>
                    <view class="grid-text">发起审批</view>
                </u-grid-item>
                <u-grid-item index="waitLaunch">
                    <view class="iconWrap u-f-ajc" :style="{'background':'rgb(101, 197, 244)'}">
                        <u-icon name="daishenpi" size="68" color='#ffffff' custom-prefix="my-iconfont"></u-icon>
                    </view>
                    <view class="grid-text">待办审批</view>
                </u-grid-item>
                <u-grid-item index="copyToMe">
                    <view class="iconWrap u-f-ajc" :style="{'background':'rgb(255, 142, 142)'}">
                        <u-icon name="chaosongwode3" size="52" color='#ffffff' custom-prefix="my-iconfont"></u-icon>
                    </view>                    
                    <view class="grid-text">抄送我的</view>
                </u-grid-item>
            </u-grid>   
            <view class="catTit">
                其他
            </view>     

            <u-grid :col="4"  @click="handlerClickCat">
                <u-grid-item index="onTheWay">
                    <view class="iconWrap u-f-ajc" :style="{'background':'rgb(101, 197, 244)'}">
                        <u-icon name="zaitushebei" size="52" color='#ffffff' custom-prefix="my-iconfont"></u-icon>
                    </view>                      
                    <view class="grid-text">在途</view>
                </u-grid-item>
                <u-grid-item index="myStart">
                    <view class="iconWrap u-f-ajc" :style="{'background':'rgb(52, 202, 214)'}">
                        <u-icon name="wofaqide2" size="48" color='#ffffff' custom-prefix="my-iconfont"></u-icon>
                    </view>                      
                    <view class="grid-text">我发起的</view>
                </u-grid-item>
                <u-grid-item index="myFollow">
                    <view class="iconWrap u-f-ajc" :style="{'background':'rgb(255, 142, 142)'}">
                        <u-icon name="woguanzhude" size="48" color='#ffffff' custom-prefix="my-iconfont"></u-icon>
                    </view>                         
                    <view class="grid-text">我关注的</view>
                </u-grid-item>
                <u-grid-item index="myPending">
                    <view class="iconWrap u-f-ajc" :style="{'background':'rgb(255, 158, 80)'}">
                        <u-icon name="woguaqide" size="58" color='#ffffff' custom-prefix="my-iconfont"></u-icon>
                    </view>                        
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
            this.togoPage(resUrl, {}, "navigate")
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
