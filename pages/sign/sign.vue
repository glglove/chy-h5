<template>
	<container :containerLoading="containerLoading">
		<view id="sign" class="page content" slot="container-slot">
			
			<!--轮播图-->
			<view class="box">		
				<u-swiper :list="swiperList"></u-swiper>
			</view>
			<div class="titWrap">
				常用应用
			</div>
			<u-grid :col="4" @click="handerClickItem">
				<u-grid-item  :index="index" v-for="(item, index) in gridItems" :key="item.path" >
					<div class="icon-list u-f-ajc" :style="{background: bgColor[index]}">
						<!-- <icon-svg :icon-class="item.icon"></icon-svg> -->
						<img :src="item.picUrl" alt="" class="itemPic">
					</div>
					<div class="text">{{item.name}}</div>					
				</u-grid-item>
			</u-grid>

			<!-- <view class="scrollBox">
				<mescroll-uni 
					ref="mescrollRef" 
					@init="mescrollInit" 
					@down="downCallback" 
					@up="upCallback" 
					:down="downOption" 
					:up="upOption" 
					id="dataList"
				>
					<view v-for="(data, key) in dataList" :key="key"> 
						{{data.name}}----{{key}}
					</view>
				</mescroll-uni>				
			</view> -->

		</view>

		<!--引用骨架屏组件-->
		<u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton>		
	</container>		
</template>

<script>
	// 引入mescroll-mixins.js
	// import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js"
	import { miniProApi } from '@/utils/mixins.js'
	import LoadMore from '@/components/uni-load-more/uni-load-more'
	import signApi from '@/api/sign.js'
  	import IconSvg from '@/components/Icon-svg/index'
	import {mapGetters} from 'vuex'
	export default {
		// mixins: [ MescrollMixin, miniProApi], //如果在页面中引入的话， 这里一定需要 MescrollMixin 放在 miniProApi前面 否则上/下拉刷新不会生效，因为此时 还没有初始化mescorll
		mixins: [ miniProApi], // 这里一定需要 MescrollMixin 放在 miniProApi前面 否则上/下拉刷新不会生效， 在 miniProApi中 引入了 MescrollMixin 故不再页面中引入了
		components:{
			LoadMore,
			IconSvg
		},
		props: {
			title: {
				type: String,
				default: '应用'
			},
			gridItems: {
				type: Array,
				default: () => {
					return [
						{
							path: '/checkWork',
							name: '考勤',
							icon: 'notice',
							picUrl: require('@/assets/pic/code.jpg'),
							hidden: false,							
						},
						{
							path: '/employee',
							name: '员工',
							icon: 'employee',
							picUrl: require('@/assets/pic/code.jpg'),
							hidden: false,							
						},
						{
							path: '/socialSecurity',
							name: '社保',
							picUrl: require('@/assets/pic/code.jpg'),
							icon: 'socialSecurity',
							hidden: false,						
						},							
						{
							path: '/platform',
							name: '平台',
							picUrl: require('@/assets/pic/code.jpg'),
							icon: 'platform',
							hidden: false,								
						},
						{
							path: '/notice',
							name: '公告',
							picUrl: require('@/assets/pic/code.jpg'),
							icon: 'notice',
							hidden: false,							
						},
						{
							path: '/manage',
							name: '管理',
							picUrl: require('@/assets/pic/code.jpg'),
							icon: 'manage',
							hidden: false,							
						},
						{
							path: '/approvalFlow',
							name: '审批',
							picUrl: require('@/assets/pic/code.jpg'),
							icon: 'notice',
							hidden: false,							
						}
					]
				}

			}			
		},
		computed: {
			signContentBoxHeight() {
				return `height: ${this.pHeight - 150}px`
			}
		},
		data() {
			let that = this
			return {
				loading: true,
				bgColor: ['#65C5F4', '#34CAD6', '#FF8E8E', '#FF9E50', '#6FCA6C', '#65C5F4', '#34CAD6', '#FF8E8E', '#FF9E50', '#6FCA6C', '#FF8E8E', '#FF9E50', '#6FCA6C'],
				swiperList: [{
						image: 'http://img.zcool.cn/community/01449657fddbe4a84a0e282b8b3b2d.jpg@2o.jpg',
						title: '蒹葭苍苍，白露为霜。所谓伊人，在水一方'
					},
					{
						image: 'http://img.zcool.cn/community/01449657fddbe4a84a0e282b8b3b2d.jpg@2o.jpg',
						title: '溯洄从之，道阻且长。溯游从之，宛在水中央'
					},
					{
						image: 'http://img.zcool.cn/community/01449657fddbe4a84a0e282b8b3b2d.jpg@2o.jpg',
						title: '蒹葭萋萋，白露未晞。所谓伊人，在水之湄'
					}
				],
				// 列表数据
				dataList: [
					{
						name: '测试'
					},
					{
						name: '测试'
					},
					{
						name: '测试'
					},
					{
						name: '测试'
					},
					{
						name: '测试'
					},
					{
						name: '测试'
					},
					{
						name: '测试'
					},
					{
						name: '测试'
					},
					{
						name: '测试'
					},
					{
						name: '测试'
					},
					{
						name: '测试'
					},
					{
						name: '测试'
					},
					{
						name: '测试'
					},
					{
						name: '测试'
					},
					{
						name: '测试'
					},
					{
						name: '测试'
					},
					{
						name: '测试'
					},
					{
						name: '测试'
					},
					{
						name: '测试'
					},
					{
						name: '测试'
					},
					{
						name: '测试'
					},
					{
						name: '测试'
					},
					{
						name: '测试'
					},
					{
						name: '测试'
					},
					{
						name: '测试'
					},
					{
						name: '测试'
					},
					{
						name: '测试'
					},																																																																																														
				],	
				mescroll:null, 
				upOption: {
					auto: false, //是否在初始化完毕之后自动执行一次上拉加载的回调
					use: true, // 是否启用下拉刷新 如果配置false,则不会初始化上拉刷新的布局
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
						icon: require("@/components/mescroll-uni/components/mescroll-uni/mescroll-empty.png"), //图标,默认null
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
			}
		},
		// 自定义导航按钮被点击时
		onNavigationBarButtonTap(e){
			debugger
			/**打印e 的结果
			 * 
			 * {"text": "**", "fontSrc" : "/static/font/iconfont.ttf" , "fontSize" : "22px" , "float" : "right" , "id" : "xiaoxi" , "redDot" : true , "__cb__" : {"id" : "plus91557906063813" , "htmlId" : "204513757" } , "index" : 1 }}
			**/
			console.log(JSON.stringify(e))
			switch(e.id){
				// 获取导航栏指定按钮
				case 'xiaoxi':
					let pages = getCurrentPages()		
					let page = pages[pages.length - 1]
					let currentWebview = page.$getAppWebview()
					let titleObj = currentWebview.getStyle().titleNView
					//console.log(JSON.stringify(titleObj.buttons[e.index]))
					// 修改指定按钮样式
					if(titleObj.buttons[e.index].redDot){
						// 取消按钮右上角红点
						titleObj.buttons[e.index].redDot = false
						currentWebview.setStyle({
							titleNView: titleObj
						})
					}
				break
			}
		},	
		onLoad() {
			// debugger
			console.log("-------------sign.vue中signContentBoxHeight",this.signContentBoxHeight)
			// 通过延时模拟向后端请求数据，调隐藏骨架屏
			setTimeout(() => {
				this.loading = false;
			}, 5000)
		},
		onShow() {

		},
		methods: {
			//onload 之前的 生命周期
			onComLoad () {
				
			},
			// 下载图片
			downLoadPic(name){
				console.log("55555555555555555555")
				let url = this.$configs.baseImgsUrl + this.$configs.baseUrlConfigs.imgs_bg[name]
				uni.downloadFile({
					url: url,
					success: (res) => {
							if(res.statusCode === 200 && res.tempFilePath){
								console.log("99999999999",res)
								// res.tempFilePath
								switch(name){
									case 'sign_bg':
										this.bg['sign_bg'] = res.tempFilePath
									break
									case 'carousel_01':
										this.carousel_01 = res.tempFilePath
									break
									case 'carousel_02':
										this.carousel_02 = res.tempFilePath
									break
									case 'carousel_03':
										this.carousel_03 = res.tempFilePath
									break
								}
								// uni.saveFile({
								// 	
								// }) 
							}
					},
					fail: (error) => {
						
					}
				})					
			},
			// 刷新页面
			refreshPage() {
				debugger

			},
			// 下拉刷新
			downRefreshPage(page, mescroll){
				debugger
				if(mescroll){
					console.log("下拉刷新")	
					mescroll.endSuccess(10, false)				
				}
			},
			// 上拉加载
			upRefreshPage(page, mescroll){
				debugger
				if(mescroll){
					console.log("上拉刷新")	
					mescroll.endSuccess(1)						
				}
			},
			handerClickItem(idx){
				// debugger
				let obj = this.gridItems[idx]
				let path = obj.path
				switch(path){
					// case '/checkWork':
					// 	break
					// case '/employee':
					// 	break	
					// case '/socialSecurity':
					// 	break
					// case '/platform':
					// 	break		
					// case '/notice':
					// 	break
					// case '/manage':
					// 	break	
					// case '/approvalFlow':
					// 	break	
				}
				let resPath = this.$findPageUrl(path)
				this.navigatePage(resPath)					
			},
			/*mescroll下拉刷新的回调, 有三种处理方式:*/
			downCallback1(){
				debugger
				// 第1种: 请求具体接口
				uni.request({
					url: 'xxxx',
					success: () => {
						// 请求成功,隐藏加载状态
						this.mescroll.endSuccess()
					},
					fail: () => {
						// 请求失败,隐藏加载状态
						this.mescroll.endErr()
					}
				})
				// 第2种: 下拉刷新和上拉加载调同样的接口, 那么不用第1种方式, 直接mescroll.resetUpScroll()即可
				this.mescroll.resetUpScroll(); // 重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
				// 第3种: 下拉刷新什么也不处理, 可直接调用或者延时一会调用 mescroll.endSuccess() 结束即可
				this.mescroll.endSuccess()
				// 若整个downCallback方法仅调用this.mescroll.resetUpScroll(),则downCallback方法可删 (mixins已默认,大部分都是这个情况~)
			},							
		}
	}
</script>

<style lang="less" scoped>
uni-page-body {
	height: 100%
}
#sign {
	// position: absolute;
	// top: 0;
	// left: 0;
	// right: 0;
	// bottom: 0;
	// margin: auto;	
	// min-height: 1110upx;
	padding-bottom: calc(var(--window-bottom));
	background-color: rgba(251,250,249,1);
	box-sizing:  border-box;
	.titWrap {
		color: #999;
		padding: 20upx;
		background-color: #f5f5f5
	}
	.u-grid-item {
		.icon-list {
			width: 112upx;
			height: 112upx;
			text-align: center;
			line-height: 112upx;
			border-radius: 5.6upx;
			cursor: pointer;
			&:active {
				background: #cccccc !important
			}
			&:hover {
				cursor:pointer
			}
			svg {
				width: 76upx;
				height: 76upx;
				vertical-align: middle	
			}
			.itemPic {
				width: 76upx;
				height: 76upx;
			}

		}
		.text {
			font-size: 24upx;
			margin-top: 10upx
		}		
	}
	.scrollBox {
		/deep/.mescroll-uni-warp {
			.mescroll-uni {
				position:  relative !important;
				height: calc(100vh - 1000upx) !important
			}
		}
	}
}
</style>

