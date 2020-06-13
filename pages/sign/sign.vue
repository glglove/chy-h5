<template>
	<container :containerLoading="containerLoading">
		<view id="sign" class="page content" slot="container-slot">
			
			<!--轮播图-->
			<view class="box">		

			</view>
			
			<u-grid :col="3" >
				<u-grid-item v-for="(item, index) in gridItems" :key="item.path">
					<div class="icon-list" :style="{background: bgColor[index]}">
						<icon-svg :icon-class="item.icon"></icon-svg>
						<div class="text">{{item.name}}</div>					
					</div>
				</u-grid-item>
			</u-grid>
		</view>
	</container>		
</template>

<script>
	import { miniProApi } from '@/utils/mixins.js'
	import LoadMore from '@/components/uni-load-more/uni-load-more'
	import signApi from '@/api/sign.js'
  	import IconSvg from '@/components/Icon-svg/index'
	import {mapGetters} from 'vuex'
	export default {
		mixins: [ miniProApi ],
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
							hidden: false,							
						},
						{
							path: '/employee',
							name: '员工',
							icon: 'employee',
							hidden: false,							
						},
						{
							path: '/socialSecurity',
							name: '社保',
							icon: 'socialSecurity',
							hidden: false,						
						},						
						{
							path: '/socialSecurity',
							name: '社保',
							icon: 'socialSecurity',
							hidden: false,						
						},	
						{
							path: '/platform',
							name: '平台',
							icon: 'platform',
							hidden: false,								
						},
						{
							path: '/notice',
							name: '公告',
							icon: 'notice',
							hidden: false,							
						},
						{
							path: '/manage',
							name: '管理',
							icon: 'manage',
							hidden: false,							
						},
						{
							path: '/approvalFlow',
							name: '审批',
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
			return {
				bgColor: ['#65C5F4', '#34CAD6', '#FF8E8E', '#FF9E50', '#6FCA6C', '#65C5F4', '#34CAD6', '#FF8E8E', '#FF9E50', '#6FCA6C', '#FF8E8E', '#FF9E50', '#6FCA6C']
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
			console.log("-------------sign.vue中signContentBoxHeight",this.signContentBoxHeight)

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
}
</style>

