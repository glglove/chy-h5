
/**
 * Created by Administrator on 2018/10/16.
 * function : mixin
 */
// import base from '@/api/base.js'
// import commApi from '@/api/comm.js'
// import { debug } from 'utils';
// import { getDeviceApi } from '@/utils/deviceApi.js'
// import getEnterType from '@/utils/miniProSceneType.js'
import {mapGetters} from 'vuex' 

import { REQ_OK } from '@/api/configs'
// import {
//   getBusinessTypeList
// } from '@/api/approve'

// import { getRoleRange } from '@/api/permission'
import BaseCalculate from '@/base/Dynamic-form-cmp/Base-calculate'
import BaseCheckbox from '@/base/Dynamic-form-cmp/Base-checkbox'
import BaseDate from '@/base/Dynamic-form-cmp/Base-date'
import BaseExplain from '@/base/Dynamic-form-cmp/Base-explain'
import BaseInput from '@/base/Dynamic-form-cmp/Base-input'
import BaseRadio from '@/base/Dynamic-form-cmp/Base-radio'
import BaseSelect from '@/base/Dynamic-form-cmp/Base-select'
import BaseSwitch from '@/base/Dynamic-form-cmp/Base-switch'
import EmpSelect from '@/base/Dynamic-form-cmp/Emp-select'
import ImgUpload from '@/base/Dynamic-form-cmp/Img-upload'
import MapUpload from '@/base/Dynamic-form-cmp/Map-upload'
import MoneyInput from '@/base/Dynamic-form-cmp/Money-input'
import MonthSelect from '@/base/Dynamic-form-cmp/Month-select'
import MulSelect from '@/base/Dynamic-form-cmp/Mul-select'
import NumInput from '@/base/Dynamic-form-cmp/Num-input'
import OrgSelect from '@/base/Dynamic-form-cmp/Org-select'
import RangeDate from '@/base/Dynamic-form-cmp/Range-date'
import TextareaInput from '@/base/Dynamic-form-cmp/Textarea-input'
import TimeDate from '@/base/Dynamic-form-cmp/Time-date'

// 审批流组件类型
export const flowControlTypeMixin = {
    components: {
        BaseCalculate,
        BaseCheckbox,
        BaseDate,
        BaseExplain,
        BaseInput,
        BaseRadio,
        BaseSelect,
        BaseSwitch,
        EmpSelect,
        ImgUpload,
        MapUpload,
        MoneyInput,
        MonthSelect,
        MulSelect,
        NumInput,
        OrgSelect,
        RangeDate,
        TextareaInput,
        TimeDate
    },
	data () {
		return {
		
		}
	},
	computed: {
		...mapGetters(['userToken'])
	},
	watch:{
	  
	},
	async onLoad(options) {

	},	
	onShow() {	
		console.log('workFlowMixins onShow')
	},
	// 页面初次渲染完成
	onReady(){
		console.log('workFlowMixins onReady')
	},
	onHide(){
		console.log('workFlowMixins onHide')
	},
	onUnload (){
		console.log('workFlowMixins onUnload')
	},
    methods: {
        currentTabComponent (controlType) {
            if (controlType) {
                switch (controlType) {
                case '1':
                    return BaseInput
                case '2':
                    return TextareaInput
                case '3':
                    return NumInput
                case '4':
                    return MoneyInput
                case '5':
                    return BaseSelect
                case '6':
                    return MulSelect
                case '7':
                    return BaseDate
                case '8':
                    return RangeDate
                case '9':
                    return TimeDate
                case '10':
                    return MonthSelect
                case '11':
                    return BaseSwitch
                case '12':
                    return BaseRadio
                case '13':
                    return BaseCheckbox
                case '14':
                    return ImgUpload
                case '15':
                    return ImgUpload
                case '16':
                    return BaseCalculate
                case '19':
                    return EmpSelect
                case '20':
                    return OrgSelect
                case '22':
                    return MapUpload
                case '23':
                    return TextareaInput
                case '24':
                    return BaseExplain
                }
            }
        }
    },
}

// 审批流自动登录
export const flowAutoLogin = {
    components: {
      
    },
	data () {
		return {
		
		}
	},
	computed: {
		...mapGetters(['userToken'])
	},
	watch:{
	  
	},
	async onLoad(options) {

	},	
	onShow() {	
		console.log('workFlowMixins onShow')
	},
	// 页面初次渲染完成
	onReady(){
		console.log('workFlowMixins onReady')
	},
	onHide(){
		console.log('workFlowMixins onHide')
	},
	onUnload (){
		console.log('workFlowMixins onUnload')
	},
    methods: {

    },
}

export const flowCommonFn = {
    components: {
      
    },
	data () {
		return {
            filterTime: [
                '本月',
                '上月',
                '三个月内',
                '六个月内',
                '一年以内',
                '全部'
            ],
            filterType: []		
		}
	},
	computed: {
		...mapGetters(['userToken'])
	},
	watch:{
	  
	},
	async onLoad(options) {
        this._getBusinessTypeList()
	},	
	onShow() {	
		console.log('workFlowMixins onShow')
	},
	// 页面初次渲染完成
	onReady(){
		console.log('workFlowMixins onReady')
	},
	onHide(){
		console.log('workFlowMixins onHide')
	},
	onUnload (){
		console.log('workFlowMixins onUnload')
	},
    methods: {
        // 业务类型字典表
        _getBusinessTypeList () {
            // getBusinessTypeList().then(res => {
            //     if (res.data.State === REQ_OK) {
            //         this.filterType = res.data.Data
            //     }
            // })
        },
        getCurrentTime (param) {
            let date, year, month, preMonth, day, nextMonth, dayNum
            switch (param.currentTime) {
              case 0:
                date = new Date()
                year = date.getFullYear()
                month = date.getMonth() + 1
                preMonth = year + '.' + month + '.01' // 当月第一天
                day = new Date(year, month, 0)
                nextMonth = year + '.' + month + '.' + day.getDate() // 当月最后一天
                dayNum = ''
                break
              case 1:
                date = new Date()
                year = date.getFullYear()
                month = date.getMonth()
                preMonth = year + '.' + month + '.01' // 上月第一天
                day = new Date(year, month, 0)
                nextMonth = year + '.' + month + '.' + day.getDate() // 上月最后一天
                dayNum = ''
                break
              case 2:
                dayNum = 92
                preMonth = ''
                nextMonth = ''
                break
              case 3:
                dayNum = 183
                preMonth = ''
                nextMonth = ''
                break
              case 4:
                dayNum = 365
                preMonth = ''
                nextMonth = ''
                break
              case 5:
                dayNum = ''
                preMonth = ''
                nextMonth = ''
                break
            }
            return {preMonth, nextMonth, dayNum}
        }        
    },
}

