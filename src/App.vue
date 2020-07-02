<script>
	export default {
        onLaunch: function() {
            console.log('App Launch');
            // #ifdef APP-PLUS
            // 检测升级
            uni.request({
                url: 'https://uniapp.dcloud.io/update', //检查更新的服务器地址
                data: {
                    appid: plus.runtime.appid,
                    version: plus.runtime.version,
                    imei: plus.device.imei
                },
                success: (res) => {
                    if (res.statusCode == 200 && res.data.isUpdate) {
                        let openUrl = plus.os.name === 'iOS' ? res.data.iOS : res.data.Android;
                        // 提醒用户更新
                        uni.showModal({
                            title: '更新提示',
                            content: res.data.note ? res.data.note : '是否选择更新',
                            success: (showResult) => {
                                if (showResult.confirm) {
                                    plus.runtime.openURL(openUrl);
                                }
                            }
                        })
                    }
                }
            })
            // #endif
        },
        onShow: function() {
            console.log('App Show')
        },
        onHide: function() {
            console.log('App Hide')
        },
		globalData: {
			test: ''
		}
	}
</script>

<style lang="scss" rel="stylesheet/stylus">
	@import "./assets/css/my-iconfont.css"; // 一定要放在 所有样式引入的最前面
	/**H5 端 nprogress 进度条 颜色设置*/
	#nprogress .bar {
      background: #00AEEF !important; //自定义颜色
    }
	/*每个页面公共css */
    /* #ifndef APP-PLUS-NVUE */
    /* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
	@import './assets/css/uni.css';	
	@import "./assets/css/index.css";
	@import "uview-ui/index.scss"
	/*#endif*/
</style>
