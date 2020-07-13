// 高德的API有现成的SDK支撑安卓/IOS 但是没有专门的API支撑H5（或者说不用专门支撑）

// 当uniapp中调用高德API的时候就会遇到问题:

// 因为直接用引入外部js肯定不行了 (uniapp项目中压根就没有 html 页面,这也是我最无语的地方，为这事找了一两天的解决方法)

// 所以为了解决这个问题就必须引入在线jsAPI

// 下面就介绍步骤

// 1.引入在线jsAPI 专门新建个工具类，这样当需要调用地图的时候直接引用该方法就行

// a.直接引用js肯定不行，所以采用回调函数的方式引入

// b.因为高德的API是异步的，所以我们把他封装成Promise函数

import base from '@/api/base'
export default function MapLoader() {
    return new Promise((resolve, reject) => {
      if (window.AMap) {
        resolve(window.AMap);
      } else {
          var script = document.createElement('script');
           script.type = "text/javascript";
           script.async = true;
          script.src = `https://webapi.amap.com/maps?v=1.4.15&key= ${base.amapConfigs.aitras_web}&callback=initAMap`;
          script.onerror = reject;
            document.head.appendChild(script);
      }
      window.initAMap = () => {
        resolve(window.AMap);
      }
    })
}