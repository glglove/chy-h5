<!--测试页面-->
<style lang="scss" scoped>
	.list{
		width: 100%;
		padding: 18rpx 3%;
		box-sizing: border-box;
		border-bottom: 1rpx solid #EFEFEF;
    }

	.item {
		display: flex;
		padding: 20rpx;
	}
	
	image {
		width: 120rpx;
		flex: 0 0 120rpx;
		height: 120rpx;
		margin-right: 20rpx;
		border-radius: 12rpx;
	}
	
	.title {
		text-align: left;
		font-size: 28rpx;
		color: $u-content-color;
		margin-top: 20rpx;
	}    
</style>
<template>
    <container 
        ref="containerCmp"
        :containerAllloading="containerAllloading"
        :containerLoading = "containerLoading"
        >
        <view 
            id="test" 
            class="page" 
            slot="container-slot"
        >
            <mescroll-uni 
                class="mescroll_contentList_wrap"
                ref="mescrollRef" 
                height="500"
                @init="mescrollInit" 
                @down="downCallback" 
                @up="upCallback" 
                :down="downOption" 
                :up="upOption" 
                id="dataList"
            >    
                <view class="wrap">
                    <u-swipe-action :show="item.show" :index="index" 
                        v-for="(item, index) in list" :key="item.id" 
                        @click="click" @open="open"
                        :options="options"
                    >
                        <view class="item u-border-bottom">
                            <image mode="aspectFill" :src="item.images" />
                            <!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
                            <view class="title-wrap">
                                <text class="title u-line-2">{{ item.title }}</text>
                            </view>
                        </view>
                    </u-swipe-action>
                </view>
            </mescroll-uni>
        </view>
    </container>
</template>
 
<script>
	import { mapGetters } from 'vuex'	
	import { miniProApi } from '@/utils/mixins.js'
	export default {
		mixins:[
			miniProApi
		],
		onLoad() {

		},
		data() {
			return {
				list: [
					{
						id: 1,
						title: '长安回望绣成堆，山顶千门次第开，一骑红尘妃子笑，无人知是荔枝来',
						images: 'https://cdn.uviewui.com/uview/common/logo.png',
						show: false
					},
					{
						id: 2,
						title: '新丰绿树起黄埃，数骑渔阳探使回，霓裳一曲千峰上，舞破中原始下来',
						images: 'https://cdn.uviewui.com/uview/common/logo.png',
						show: false
					},
					{
						id: 3,
						title: '登临送目，正故国晚秋，天气初肃。千里澄江似练，翠峰如簇',
						images: 'https://cdn.uviewui.com/uview/common/logo.png',
						show: false,
					}
				],
				disabled: false,
				btnWidth: 180,
				show: false,
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
                // 配置下拉刷新数据
				downOption: {
					auto: false,
				},
				// 配置上拉加载数据
				upOption:{
					isBounce:true,
					textNoMore:'到底啦'
				},
				dataList: []
			}
		},
		computed:{
			...mapGetters([
				'userId',
				'userInfo',
				'userToken',
				'socketStatus'
			])
		},
		// 关闭websocket【必须在实例销毁之前关闭,否则会是underfined错误】
		beforeDestroy() {
			
        },
        methods: {
			click(index, index1) {
				if(index1 == 1) {
					this.list.splice(index, 1);
					this.$u.toast(`删除了第${index}个cell`);
				} else {
					this.list[index].show = false;
					this.$u.toast(`收藏成功`);
				}
			},
			// 如果打开一个的时候，不需要关闭其他，则无需实现本方法
			open(index) {
				// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
				// 原本为'false'，再次设置为'false'会无效
				this.list[index].show = true;
				this.list.map((val, idx) => {
					if(index != idx) this.list[idx].show = false;
				})
			},            
            /*下拉刷新的回调 */
			downCallback(mescroll) {
				// 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 mescroll.num=1, 再触发upCallback方法 )
				this.dataList = [];
				mescroll.resetUpScroll()  //重置上拉加载的数据
			},
			/*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
			upCallback(mescroll) {
                console.log("mescroll.num=" + mescroll.num + ", mescroll.size=" + mescroll.size);								
                //mescroll.endSuccess(curPageData.length, hasNext); //必传参数(当前页的数据个数, 是否有下一页true/false)
                if(this.dataList.length <= 50){
                    setTimeout(()=>{
                        for(var i=0;i<10;i++){
                            this.dataList.push(i)
                        }
                        mescroll.endSuccess(this.dataList.length);
                        console.log("执行了上拉加载");
                    },1000)						
                }else{
                    //联网失败的回调,隐藏下拉刷新的状态
                    mescroll.endErr();
                    mescroll.endUpScroll(true);
                    console.log("上拉加载完毕");
                }   
            }         
        },
	}
</script>
