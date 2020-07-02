<!--
  User: xxxxxxx
  Date: 2020/6/16
  功能： 审批流list 组件
-->
<style lang="scss" scoped src = "">
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
    <view class="flowListCmp">
        <!-- dataList: {{dataList}} -->
        <!-- list: {{list}} -->
        <u-swipe-action
            v-for="(item, key) in list"
            :key="key"
            :show="item.show" 
            :index="key" 
            @click="click" 
            @open="open"
            :options="options"
        >

            <!-- <view> -->
                <!-- <view class="titInfo u-f-jsb">
                    <view>名称：{{item.CompanyApprovalName}}</view>
                    <view>{{ item.RDT | replaceTime }}</view>
                </view>
                <view>{{item.Title}}</view>
                <view>{{item.TodoEmps}}</view> -->
			<view class="item u-border-bottom">
				<image mode="aspectFill" :src="item.images" />
				<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
				<view class="title-wrap">
					<text class="title u-line-2">{{ item.title }}</text>
				</view>
			</view>
            <!-- </view> -->
        </u-swipe-action>
    </view>
</template>

<script>
import { miniProApi } from '@/utils/mixins.js'
export default  {
    mixins: [ miniProApi ],
    props: {
        flowListData: {
            type: Array,
            default: () => {
                return []
            }
        },
        list: {
            type: Array,
            default: () => {
                return [
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
                ]
            }
        },
        options: {
            type: Array,
            deault: () => {
                return [
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
                ]
            }
        }
    },
    data(){
        return {
              
        }
    },
    computed: {
        dataList() {
            this.flowListData.forEach((item, key) => {
                this.$set(item, 'show', false)
            })
            return this.flowListData            
        }
    },
    onComLoad(){
       
    },
    onLoad(){

    },
    onReady(){
    },
    methods: {
        _initData(){

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
        }        
    },
}   
</script>
