<style lang="scss" scoped src = "">
	uni-page-body {
		height: 100%
	}
	#my {
		padding-bottom: calc(var(--window-bottom));
		// background-color: rgba(255,255,255,1);
		background-color: rgba(245,245,245,1);
	}
	.slot-wrap {
		display: flex;
		align-items: center;
		/* 如果您想让slot内容占满整个导航栏的宽度 */
		/* flex: 1; */
		/* 如果您想让slot内容与导航栏左右有空隙 */
		/* padding: 0 30rpx; */
	}	
	.camera {
		width: 108upx;
		height: 88upx;
		
		&:active{
			background-color: #ededed;
		}		
	}
	.user-box {
		background-color: #ffffff
	}
	.icon-myCard {
		color: red
	}
	.itemBox {
		background-color: #ffffff;
		padding: 20upx 32upx;
		.leftBox {
			// width: 200upx
		}
		.rightBox {
			// width: 200upx
		}
	}
</style>

<template>
	<container :containerLoading="containerLoading">
		<view id="my" class="page borderBox" slot="container-slot">
			<u-navbar :is-back="false" title="我的" :border-bottom="false">
				<view class="u-f u-f-jfd" style="width: 100%;">
					<view class="camera u-f u-row-center">
						<u-icon name="camera-fill" color="#000000" size="48"></u-icon>
					</view>
				</view>
			</u-navbar>
			
			<view class="u-f-ac user-box u-p-l-30 u-p-r-20 u-m-t-20">
				<view class="u-m-r-10 u-f-ac">
					<u-avatar :src="pic" size="140"></u-avatar>
				</view>
				<view class="u-flex-1 u-m-l-20">
					<view class="u-font-18">{{user.name}}</view>
					<view class="u-font-14 u-tips-color">企信号:{{user.empNo}}</view>
				</view>
				<view class="u-m-l-10 u-p-10">
					<u-icon name="scan" color="#969799" size="28"></u-icon>
				</view>
				<view class="u-m-l-10 u-p-10">
					<u-icon name="arrow-right" color="#969799" size="28"></u-icon>
				</view>
			</view>
			
			<!-- <u-cell-group class="u-m-t-20">
				<u-cell-item  title="我的名片">
					<u-icon slot="icon" size="32" color="red" name="coupon" class="icon-myCard"></u-icon>
				</u-cell-item>
			</u-cell-group> -->

			<view class="u-f-jsb u-p-l-32 u-p-r-32 itemBox click-able line u-m-t-20">
				<view class="leftBox u-f u-f-jc">
					<u-icon name="coupon" size="28" color="red"></u-icon>
					<view class="marginL5 u-f-ajc">我的名片</view>
				</view>
				<view class="rightBox">
					<u-icon name="arrow-right" color="#969799" size="28"></u-icon>
				</view>
			</view>		

			<view class="u-f-jsb u-p-l-32 u-p-r-32 itemBox line click-able">
				<view class="leftBox u-f u-f-jc">
					<u-icon name="coupon" size="28" color="red"></u-icon>
					<view class="marginL5 u-f-ajc">红包</view>
				</view>
				<view class="rightBox">
					<u-icon name="arrow-right" color="#969799" size="28"></u-icon>
				</view>
			</view>		

			<view class="u-f-jsb u-p-l-32 u-p-r-32 itemBox line click-able">
				<view class="leftBox u-f u-f-jc">
					<u-icon name="coupon" size="28" color="red"></u-icon>
					<view class="marginL5 u-f-ajc">收藏</view>
				</view>
				<view class="rightBox">
					<u-icon name="arrow-right" color="#969799" size="28"></u-icon>
				</view>
			</view>			

			<view class="u-f-jsb u-p-l-32 u-p-r-32 itemBox line click-able">
				<view class="leftBox u-f u-f-jc">
					<u-icon name="coupon" size="28" color="red"></u-icon>
					<view class="marginL5">福利社</view>
				</view>
				<view class="rightBox">
					<u-icon name="arrow-right" color="#969799" size="28"></u-icon>
				</view>
			</view>		

			<view class="u-f-jsb u-p-l-32 u-p-r-32 itemBox click-able">
				<view class="leftBox u-f u-f-jc">
					<u-icon name="coupon" size="28" color="red"></u-icon>
					<view class="marginL5">密码重置</view>
				</view>
				<view class="rightBox">
					<u-icon name="arrow-right" color="#969799" size="28"></u-icon>
				</view>
			</view>									
			
			<!-- <u-cell-group class="u-m-t-20">
				<u-cell-item icon="setting" title="设置"></u-cell-item>
			</u-cell-group>					 -->

			<view class="u-f-jsb u-p-l-32 u-p-r-32 itemBox click-able marginT20">
				<view class="leftBox u-f u-f-jc">
					<u-icon name="coupon" size="28" color="red"></u-icon>
					<view class="marginL5">设置</view>
				</view>
				<view class="rightBox">
					<u-icon name="arrow-right" color="#969799" size="28"></u-icon>
				</view>
			</view>		

			<view class="loginOutBtn marginT20">
				<u-button :custom-style="customBtnStyle" class="click-able" @click="handlerLoginOut">退出</u-button>
			</view>		
		</view>	
	</container>	
</template>

<script>
	// 引入mescroll-mixins.js
	// import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js"
	import uActionSheet from "uview-ui/components/u-action-sheet/u-action-sheet.vue";
	import photoPng from '@/static/imgs/icon/photo.png'
	import setPng from '@/static/imgs/icon/set.png'
	import cardPng from '@/static/imgs/icon/card.png'
	import achievementPng from '@/static/imgs/icon/achievement.png'
	import recordPng from '@/static/imgs/icon/record.png'
	import forwardRightPng from '@/static/imgs/icon/forward-right.png'
	import helpPng from '@/static/imgs/icon/help.png'
	import invitationPng from '@/static/imgs/icon/invitation.png'	
	
	// import FooterExplain from '@/pages/components/footerExplain/footerExplain'

	import { miniProApi } from '@/utils/mixins.js'
	
	import {
        mapGetters,
        mapMutations
    } from 'vuex'
	import myApi from '@/api/my.js'

	export default {
		mixins: [ miniProApi ],
        components: {
			// FooterExplain
			uActionSheet
        },	
		computed: {
			...mapGetters(['hasLogin', 'forcedLogin','userToken','userAvatarUrl','userInfo']),
		},
		watch:{

		},	
		data() {
			return {
				user: {
					name: '张10032',
					empNo: '89757'
				},
				customBtnStyle: {
					backgroundColor: '#00aeef !important', // 注意驼峰命名，并且值必须用引号包括，因为这是对象
					color: '#fff !important'
				}	
			}
		},

		onLoad() {
			// this.avaterPic = this.getAvaterPic()
			// console.log("--------------",this.$u)
		},
		onShow() {
			
		},
		onReady() {
			
		},
		onHide(){
			
		},
		onUnload(){
			
		},
		onPullDownRefresh(){
			
		},
		onReachBottom(){
			
		},
		onShareAppMessage(){
			
		},
		onPageScroll(){
			
		},
		onTabItemTap(){
			
		},
		methods:{
			...mapMutations(['loginOut']),
			onComLoad(){
		
			},			
			// 刷新页面
			refreshPage () {
				
			},
			// 下拉刷新
			downRefreshPage(page, mescroll){

			},
			// 上拉加载
			upRefreshPage(page, mescroll){

			},
			// 登陆
			bindLogin () {	
                this.navigatePage("../login/login?toPageUrl=../my/my&jumpType=1");
			},	
			// 退出登陆
			loginOut () {
				//#ifdef H5 || APP-PLUS
                // this.loginOut();
				this.$store.dispatch("setUserToken", '')
				// 清空locaStorage 中的 userToken
				this.setStorage("userToken", "")
				//#endif
				
				//#ifdef MP-WEIXIN
				
				//#endif
				
                /**
                 * 如果需要强制登录跳转回登录页面
                 */
                // if (this.forcedLogin) {
                //     uni.reLaunch({
                //         url: '../login/login',
                //     });
                // }				
			},	
			// 获取头像
			async getAvaterPic() {
				// debugger
				// console.log(this.getStorage("userInfo"))
				this.getStorage("userInfo").then(res => {
					// debugger
					// console.log("------------",res)
					if(res){
						this.photo_png = JSON.parse(res).headImg
					}
				})
			},
			handlerLoginOut(){
				this.confirm("确定退出吗？").then(res => {
					debugger
					console.log(res)
					let resUrl = this.$findPageUrl("login")
					this.togoPage(resUrl,{}, 'relaunch')
				}).catch(res => {
					debugger
				})
			},
		}
	}
</script>

