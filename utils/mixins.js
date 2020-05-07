/**
 * Created by Administrator on 2020/2/1.
 * function : mixin
 */

// import CommonInput from '@/base/Common-input/Common-input'
// import CommonSelect from '@/base/Common-select/Common-select'


// // PA控件类型（包含规则验证）--------------------------------------------------------------------------------------------
// import BaseInputRule from '@/base/PA-common-cmp/Table-control-rule-cmp/Base-input'
// import TextareaInputRule from '@/base/PA-common-cmp/Table-control-rule-cmp/Textarea-input'
// import NumInputRule from '@/base/PA-common-cmp/Table-control-rule-cmp/Num-input'
// import MoneyInputRule from '@/base/PA-common-cmp/Table-control-rule-cmp/Money-input'
// import BaseSelectRule from '@/base/PA-common-cmp/Table-control-rule-cmp/Base-select'
// import MultipleSelectRule from '@/base/PA-common-cmp/Table-control-rule-cmp/Multiple-select'
// import BaseDateRule from '@/base/PA-common-cmp/Table-control-rule-cmp/Base-date'
// import RangeDateRule from '@/base/PA-common-cmp/Table-control-rule-cmp/Range-date'
// import TimeDateRule from '@/base/PA-common-cmp/Table-control-rule-cmp/Time-date'
// import MonthSelectRule from '@/base/PA-common-cmp/Table-control-rule-cmp/Month-select'
// import BaseSwitchRule from '@/base/PA-common-cmp/Table-control-rule-cmp/Base-switch'

// // PA控件类型 （包括 验证规则组件）
// import BaseRadioRule from '@/base/PA-common-cmp/Table-control-rule-cmp/Base-radio'
// import BaseCheckboxRule from '@/base/PA-common-cmp/Table-control-rule-cmp/Base-checkbox'
// // 上传图片
// import BaseImgUploadRule from '@/base/PA-common-cmp/Table-control-rule-cmp/Base-img-upload'
// // 上传附件
// import BaseFileUploadRule from '@/base/PA-common-cmp/Table-control-rule-cmp/Base-file-upload'
// import BaseEmpUploadRule from '@/base/PA-common-cmp/Table-control-rule-cmp/Base-emp-select'
// import BaseOrgUploadRule from '@/base/PA-common-cmp/Table-control-rule-cmp/Base-org-select'
// import BaseOrgAndEmpRule from '@/base/PA-common-cmp/Table-control-rule-cmp/Base-org-and-emp-select'
// import BaseCalculateRule from '@/base/PA-common-cmp/Table-control-rule-cmp/Base-calculate'
// import BaseEditorRule from '@/base/PA-common-cmp/Table-control-rule-cmp/Base-editor'
// import BaseExplainRule from '@/base/PA-common-cmp/Table-control-rule-cmp/Base-explain'

// 接口-----------------------------------------------------------------------------------------------------
// import { REQ_OK, BASE_URL } from '@/api/config'

import BaseInputRule from '@/components/common/form-input'
// vuex --------------------------------------------------------------------------------------------------
import { mapGetters } from 'vuex'

// PA 页面表单控件类型 以及控件规则验证
export const ControlAndRuleMixin = {
  methods: {
    currentComponent (controlType) {
      if (controlType) {
        switch (controlType) {
          case '1':
            // 单行文本输入框
            return BaseInputRule
          case '2':
            // 多行文本输入框
            // return TextareaInputRule
          case '3':
            // 数字输入框
            return NumInputRule
          case '4':
            // 金额 输入框
            return MoneyInputRule
          case '5':
            // 二级的 单选下拉框
            // return BaseSelectRule
          case '6':
            // 多选下拉框 二级的
            // return MultipleSelectRule
          case '7':
            // 日期选择器
            // return BaseDateRule
          case '8':
            // 有范围的日期选择器
            // return RangeDateRule
          case '9':
            // 时间选择器
            // return TimeDateRule
          case '10':
            // 月份选择器
            // return MonthSelectRule
          case '11':
            // 是否
            // return BaseSwitchRule
          case '12':
            // 单选
            // return BaseRadioRule
          case '13':
            // 多选
            // return BaseCheckboxRule
          case '14':
            // 上传 图片
            // return BaseImgUploadRule
          case '15':
            // 上传附件
            // return BaseFileUploadRule
          case '16':
            // 计算公式 显示框
            // return BaseCalculateRule
          case '19':
            //  按人员选择 的显示框
            // return BaseEmpUploadRule
          case '20':
            // 按组织选择 的显示框
            // return BaseOrgUploadRule
          case '21':
            // 按岗位选择后的显示input组件
            // return BaseOrgAndEmpRule
        //   case '22':
        //     // 地图显示器组件
        //     return BaseMapUploadRule
          case '23':
            // 编辑器显示组件
            // return BaseEditorRule
          case '24':
            // 说明框显示组件
            // return BaseExplainRule
        }
      }
    }
  },
  components: {
    BaseInputRule,
    // TextareaInputRule,
    // NumInputRule,
    // MoneyInputRule,
    // BaseSelectRule,
    // MultipleSelectRule,
    // BaseDateRule,
    // RangeDateRule,
    // TimeDateRule,
    // MonthSelectRule,
    // BaseSwitchRule,
    // BaseRadioRule,
    // BaseCheckboxRule,
    // BaseImgUploadRule,
    // BaseFileUploadRule,
    // BaseEmpUploadRule,
    // BaseOrgUploadRule,
    // BaseMapUploadRule,
    // BaseCalculateRule,
    // BaseEditorRule,
    // BaseExplainRule,
    // BaseOrgAndEmpRule
  }
}




