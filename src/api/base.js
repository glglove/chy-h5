import configs from './configs'
import http from '@/utils/http'

export default class base {
   static imgs_bg = configs.baseUrlConfigs.imgs_bg; // 网络图片地址集合对象
   static miniproConfings= configs.miniproConfings;     // 小程序配置信息 （appid、secret）
   static amapConfigs = configs.amapConfigs; // 高德配置信息
   static baseUrl= configs.baseUrl;   // 基础地址
   static baseInterfaceMap= configs.baseUrlConfigs; // 所有请求接口的集合对象
//    static http= http; 
//    static get = http.get.bind(http);          //get 请求
//    static post = http.post.bind(http);      // post 请求
  //  upload = http.httpUPLOAD.bind(http);   // 上传
//    static delete = http.delete.bind(http);
}