<!---
---USER: gaol
---Date:20200626
---描述： 待办审批详情
--->
<style lang="scss" scoped>
#launchDetail {
    height: 100vh !important;
    .contentBox {
        height: calc(100% - 88upx)
    }
}
</style>

<template>
    <container 
        ref="containerCmp"
        :containerAllloading="containerAllloading"
        :containerLoading = "containerLoading"
    >
        <view id="launchDetail" class="page animated fadeInLeft fast" slot="container-slot">
			<u-navbar :is-back="true" :title="title" :border-bottom="true">
				<view class="u-f u-f-jfd u-p-r-20" style="width: 100%;">
					<!-- <view class="camera u-f u-row-center">
						<u-icon name="camera-fill" color="#000000" size="48"></u-icon>
					</view> -->
				</view>
			</u-navbar>  

            <view class="contentBox">
                详情内容区
            </view>            
        </view>
    </container>
</template>


<script>
import { miniProApi } from '@/utils/mixins.js'
import {
    getForm
} from '@/api/workFlow'

export default {
    mixins: [ miniProApi ],
    data(){
        return {
            obj: null,
            title: '详情',
            flowNo: '',
            flowWorkId: '',
            flowNodeId: '',
            roleRange: '',
            showAddComment: false,
            showSend: false,
            showRefuse: false,
            showShift: false,
            showAskfor: false,
            showReturnBack: false,
            showCc: false,
            showHuiQianInit: false,
            showHungUp: false,
            showHistory: false,
            historyList: []
        }
    },
    onLoad(options){
        debugger
        this.$nextTick(() => {
            // this.$refs.containerCmp.$refs.uTips.show({
            //     title: '数据获取失败，请重试',
            //     type: 'warning'            
            // })              
        })

        try {
            this.title = JSON.parse(decodeURIComponent(options.name))
            this.flowNo = JSON.parse(decodeURIComponent(options.no))
            this.flowWorkId = JSON.parse(decodeURIComponent(options.workId))
            this.flowNodeId = JSON.parse(decodeURIComponent(options.nodeId))
            this.roleRange = JSON.parse(decodeURIComponent(options.roleRange))
        } catch (error) {
            
        }     
        
        this._getForm()
    },
	onShow() {	
	},
	// 页面初次渲染完成
	onReady(){      
	},
	onHide(){
	},
	onUnload (){
	},
    methods: {
      // 获取详情
      _getForm () {
        this.showLoading('正在加载...')
        let params = {
            no: this.flowNo,
            workId: this.flowWorkId,
            nodeId: this.flowNodeId,
            roleRange: 0            
        }
        getForm(params).then(res => {
            
          this.hideLoading()
          if (res.data.State === this.REQ_OK) {
            this.obj = res.data.Data
            this.title = this.obj.Flow.StarterName + this.obj.Flow.FlowName
          } else {
            this.$nextTick(() => {
                this.$refs.containerCmp.$refs.uTips.show({
                    title: '详情获取失败，请重试',
                    type: 'warning',
                    duration: '2500'
                })
            })
          }
        }).catch(() => {
            this.hideLoading()
            this.$nextTick(() => {
                this.$refs.containerCmp.$refs.uTips.show({
                    title: '详情获取失败，请重试',
                    type: 'warning',
                    duration: '2500'
                })
            })
        })
      },        
    },
}
</script>