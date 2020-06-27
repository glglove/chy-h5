<!--
  User: xxxxxxx
  Date: 2020/6/16
  功能：审批流-发起审批-添加审批详情保存页面
-->
<style lang="scss" scoped src = "">
#newLaunch {
    .collapseWrap {
        background-color: rgba(243,244,246,1)
    }
    /deep/.u-collapse-head {
        padding: 12px 0 0 15px !important
    }
    /deep/.u-card__head {
        display: none;
    }
    .collapse-item {
        color: #9d9d9d;
    }

    .footerBox {
        position: fixed;
        bottom: 20upx;
        width: 100%;
        .btn {
            width: 45%;
        }
    }
}
</style>
<template>
    <container 
        ref="containerCmp" 
        :containerAllloading.sync="containerAllloading"
        :containerLoading="containerLoading">
        <view id="newLaunch" slot="container-slot" class="page animated fadeInLeft fast">
            <!-- itemList： {{itemList}} -->  
			<u-navbar :is-back="true" :title="title" :border-bottom="true">
				<view class="u-f u-f-jfd u-p-r-20" style="width: 100%;">
					<view class="camera u-f u-row-center">
						<u-icon name="camera-fill" color="#000000" size="48"></u-icon>
					</view>
				</view>
			</u-navbar>  

            <template v-if="!showEmptyPage">
                <view class="contentBox">
                    内容区
                </view>
                <view class="footerBox u-f-jsb wrap960">
                    <u-button 
                        class="btn u-f0  borderBox" 
                        type="primary" 
                        :loading="submitLoading"
                        @click="submit">提交</u-button>
                    <u-button 
                        class="btn u-f0 borderBox" 
                        type="default"
                        @click="cancelSubmit"
                    >取消</u-button>
                </view>
            </template>

            <!---无数据显示----->
            <empty-page 
                ref="emptyPageCmp"
                :showEmptyPage.sync="showEmptyPage"
                :emptyType="emptyType" 
                :emptyText="emptyText"
                :showEmptyPageBtn.sync="showEmptyPageBtn"
                :showBtnType = "showBtnType"
                :showBtnStyle="showBtnStyle"
                @emitEmptyPageRefresh="emitEmptyPageRefresh"
            ></empty-page>
        </view>
    </container>
</template>

<script>
import { REQ_OK } from '@/api/config'
import { miniProApi } from '@/utils/mixins.js'
import { flowAutoLogin, flowControlTypeMixin } from '@/utils/workFlowMixins'
import {
    start,
    getForm,
    saveMainValue,
    saveDetailValue,
    saveWork,
    send
} from '@/api/workFlow'
export default  {
    mixins: [ miniProApi, flowControlTypeMixin ],
    data(){
        return {
            title: '',
            no: '',
            workId: '',
            flowObj: {},
            currentMainTableObj: {},
            currentMainTableCode: '',
            currentDetailTableObj: {},
            currentDetailTableCode: '',
            functionRole: {},
            mainTables: [],
            detailTables: [],
            submitLoading: false                     
        }
    },
    // minxin中增加的一个 在onLoad之前的钩子函数 
    onComLoad(){

    },
	onLoad(options) {
        // debugger
        try {
            this.title = JSON.parse(decodeURIComponent(options.name))
            this.no = JSON.parse(decodeURIComponent(options.no))
        } catch (error) {
            
        } 
        this.handleStart()
	},	
	onShow() {	
		console.log('onShow')
	},
	// 页面初次渲染完成
	onReady(){
		console.log('onReady')
	},
	onHide(){
		console.log('onHide')
	},
	onUnload (){
		console.log('onUnload')
    },
	onPullDownRefresh(){
		// 下拉刷新
		this.refreshPage()
		console.log('onPullDownRefresh')
	},
	onReachBottom (){
		// 上拉加载
		console.log(' onReachBottom')
	},
	onShareAppMessage(){
		console.log('onShareAppMessage')
    },
	onPageScroll(){
        // debugger
		console.log('onPageScroll')
	},
	onTabItemTap(){
		console.log('onTabItemTap')	
	},            
    methods: {
        refreshPage(){
            this.handleStart()
        },
        // 发起初始页面获取workId
        _start (no) {
            let params = { ...no }
            // debugger
            return start(params).then(res => {
                if (res.data.State === REQ_OK) {
                    this.workId = res.data.Data
                    this.showEmptyPage = false
                    return true
                } else {
                    this.$refs.containerCmp.$res.uTips.show({
                        title: `${res.data.Error}`,
                        type: 'warning',
                        duration: '3000'
                    })
                    this.showEmptyPage = true
                    return false
                }
            }).catch(() => {
                let _this = this
                setTimeout(() => {
                    _this.$refs.containerCmp.$refs.uTips.show({
                        title: `数据获取失败，请重试`,
                        type: 'warning',
                        duration: '3000'
                    })   
                })                
                return false
            })
        },   
        emitEmptyPageRefresh(){
            debugger
            this.refreshPage()
        },           
        // 保存主表
        _saveMainValue (obj) {
            let params = {
                no: this.no,
                nodeId: this.no + '001',
                workId: this.workId,
                mainValue: obj
            }            
            return saveMainValue(params, 'true', '保存主表')
        },
        // 保存明细表
        _saveDetailValue (obj) {
            let params = {
                no: this.no,
                nodeId: this.no + '001',
                workId: this.workId,
                detailValue: obj
            }
            return saveDetailValue(params, 'true', '保存明细表')
        },
        // 保存实例存为草稿
        _saveWork () {
            let params = {
                no: this.no,
                nodeId: this.no + '001',
                workId: this.workId,
            }
            return saveWork(params)
        },        
        // 点击发起
        async handleStart () {
            let paramsNo = {
                no: this.no
            }
            let s = await this._start(paramsNo)
            debugger
            if (s) {
                // this.showLoading('正在加载...')
                this.containerAllloading = true
                let paramsForm = {
                    no: this.no,
                    workId: this.workId,
                    nodeId: this.no + '001',
                    roleRange: 0                
                }
                getForm( paramsForm ).then(res => {
                    // this.hideLoading()
                    this.containerAllloading = false
                    if (res.data.State === REQ_OK) {
                    this.$nextTick(() => {
                        this.flowObj = res.data.Data.Flow
                        this.mainTables = res.data.Data.MainTableInfos
                        this.functionRole = res.data.Data.FunctionRole
                        if (!this.mainTables.length) return
                        this.currentMainTableObj = res.data.Data.MainTableInfos[0]
                        this.currentMainTableCode = res.data.Data.MainTableInfos[0].TableCode
                        this.detailTables = res.data.Data.MainTableInfos[0].DetailTableInfos
                        if (!this.detailTables.length) return
                        this.currentDetailTableObj = res.data.Data.MainTableInfos[0].DetailTableInfos[0]
                        this.currentDetailTableCode = res.data.Data.MainTableInfos[0].DetailTableInfos[0].DetailTableCode
                    })
                    } else {
                        this.hideLoading()
                    }
                }).catch(() => {
                    // this.hideLoading()
                    this.containerAllloading = false
                    // this.$dialog.notify({mes: '数据获取失败，请重试'})
                    // this.toast('数据获取失败，请重试')
                    
                    this.$refs.containerCmp.$refs.uTips.show({
                        title: '数据获取失败，请重试',
                        type: 'warning'
                    })
                })
            } else {
                // this.$dialog.notify({mes: '数据获取失败，请重试'})
                // this.toast('数据获取失败，请重试')
            }
        },      
        // 提交发起
        _send () {
            let params = {
                no: this.no,
                workId: this.workId,
                nodeId: this.no + '001'
            }
            return send(params)
        },  
        submit(){
            this.submitLoading = true
            this.handleSaveStart()
        },
        cancelSubmit(){
            this.submitLoading = false
        },
        // 提交
        async handleSaveStart () {
            // this.$dialog.loading.open('正在提交...')
            this.showLoading('正在提交...',true, 2000).then(res => {
                this.submitLoading = false
            })
            let mainArr = []
            this.mainTables.forEach(table => {
            let tableArr = []
            table.Fields.forEach(field => {
                tableArr.push({
                CompanyTableCode: field.CompanyTableCode,
                CompanyFieldCode: field.CompanyFieldCode,
                FieldName: field.Name,
                Value: field.Default
                })
            })
            mainArr.push(tableArr)
            })
            let detailArr = []
            this.detailTables.forEach(table => {
            let tableArr = []
            table.Fields.forEach(field => {
                tableArr.push({
                CompanyTableCode: field.CompanyTableCode,
                CompanyFieldCode: field.CompanyFieldCode,
                FieldName: field.FieldName,
                Value: field.Default
                })
            })
            detailArr.push(tableArr)
            })
            let main = await this._saveMainValue(JSON.stringify(mainArr))
            let detail = await this._saveDetailValue(JSON.stringify(detailArr))
            if (main && detail) {
                this.success("提交成功", 2000).then(res => {
                    this.backPage(2)
                })
            } else {
                this.error("提交失败",2000)
            }
        }                
    },
}   
</script>
