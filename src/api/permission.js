/**
 * Created by Administrator on 2020/6/18.
 * 公共接口
 */
import http from '@/utils/http'
/*
* 
* @param {*} Method 
  @param pageSize
  @param pageIndex
* @param {} loading  是否显示loading
* @param {} loadingText  loading 的文字
* 
*/
export async function getEmpListByCompanyCode (params = {}, loading = false, loadingText = "加载中...") {
  // debugger
  const url = `/API/PA`;
  var data = {
    Module: 'workFlow',
    Method: 'GetEmpListByCompanyCode',
    PageSize: 10,
    PageIndex: 1
  }
  params = Object.assign(data, params)
  return http.post( url,{
      ...params
  },{
      loading,
      loadingText
  })
}	

/*
*  获取组织列表
* @param {*} Method 
  @param pageSize
  @param pageIndex
* @param {} loading  是否显示loading
* @param {} loadingText  loading 的文字
* 
*/
export async function getOrgList (params = {}, loading = false, loadingText = "加载中...") {
  // debugger
  const url = `/Wage/PA`;
  var data = {
    Module: 'workFlow',
    Method: 'GetOrgList',
    PageSize: 10,
    PageIndex: 1
  }
  params = Object.assign(data, params)
  return http.post( url,{
      ...params
  },{
      loading,
      loadingText
  })
}	



/**
 * 获取岗位列表
 * * @param {*} Method 
    @param pageSize
    @param pageIndex
* @param {} loading  是否显示loading
* @param {} loadingText  loading 的文字
 */
export async function getPositionList (params = {}, loading = false, loadingText = "加载中...") {
  // debugger
  const url = `/Wage/PA`;
  var data = {
    Module: 'workFlow',
    Method: 'GetPositionList',
    PageSize: 100,
    PageIndex: 1
  }
  params = Object.assign(data, params)
  return http.post( url,{
      ...params
  },{
      loading,
      loadingText
  })
}	


/**
 * 获取权限菜单
 * 
 */
export async function getMenu (params = {}, loading = false, loadingText = "加载中...") {
  // debugger
  const url = `/API/Account`;
  var data = {
    Module: 'workFlow',
    Method: 'GetVUEMenu',
  }
  params = Object.assign(data, params)
  return http.post( url,{
      ...params
  },{
      loading,
      loadingText
  })
}	

/**
 * 获取组织与员工的混合树形数据
 */
export async function getMixedTree (params = {}, loading = false, loadingText = "加载中...") {
  // debugger
  const url = `/Wage/PA`;
  var data = {
    Module: 'workFlow',
    Method: 'getMixedTree',
  }
  params = Object.assign(data, params)
  return http.post( url,{
      ...params
  },{
      loading,
      loadingText
  })
}	

/**
 *
 * @param AppCode 业务领域(Notice-公告, WorkFlow-工作流, CA-考勤, Wage-薪资, Policy-社保, PA-员工)
 */
export async function GetRoleRange (params = {}, loading = false, loadingText = "加载中...") {
  // debugger
  const url = `/API/Account`;
  var data = {
    Module: 'workFlow',
    Method: 'GetRoleRange',
    AppCode: '',
  }
  params = Object.assign(data, params)
  return http.post( url,{
      ...params
  },{
      loading,
      loadingText
  })
}	


/**
 * 文本类型字典表
 * @param AppCode 业务领域
 * @param AppCode 业务领域
 * @param moduleCode 模块类型,
 * @param DicCode 字典编号 Module--模块  ContentType--文本 TimeBreak--时间刻度 DateFormat--时间日期格式 Currency--币种
 * @param PCode 上级字典项编号
 */
export async function getDicByKey (params = {}, loading = false, loadingText = "加载中...") {
  // debugger
  const url = `/API/Dic`;
  var data = {
    Module: 'workFlow',
    Method: 'GetDicByKey',
    AppCode: 'SyS',
    moduleCode: 'SYS',
    DicType: 'SYS',
    DicCode: 'ContentType',
    PCode: ''
  }
  params = Object.assign(data, params)
  return http.post( url,{
      ...params
  },{
      loading,
      loadingText
  })
}	


/**
 * 数据源列表
 * @param moduleCode 业务模块
 * @param DicType 字典表类型
 */
export async function getDicCollection (params = {}, loading = false, loadingText = "加载中...") {
  // debugger
  const url = `/API/Dic`;
  var data = {
    Module: 'workFlow',
    Method: 'GetDicCollection',
    AppCode: 'SyS',
    moduleCode: 'SYS',
    DicType: 'SYS'
  }
  params = Object.assign(data, params)
  return http.post( url,{
      ...params
  },{
      loading,
      loadingText
  })
}
