<!--
  User: xxxxxxx
  Date: 2020/6/16
  功能：考勤页面
-->
<style lang="less" scoped src = "">
.map_container{
  position: absolute;
  top: 0;
  bottom: 80px;
  left: 0;
  right: 0;
}
.map{
  width: 100%;
  height: 100%;
}
.map_text{
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0px;
  height: 80px;
  background: #fff;
  padding: 0 15px;
  overflow-y: scroll;
}
text{
  margin: 3px 0;
  display: block;
  font-size:12px;
}
.h1{
  margin: 15px 0;
  font-size:15px;
}
</style>
<template>
    <container
        ref="containerCmp"
        :containerAllloading="containerAllloading"
        :containerLoading = "containerLoading"
    >
        <view id="checkWork" class="page animated fadeInLeft fast" slot="container-slot">
            考勤页面

            <view class="map_container" :style="mapContBotm">

                <map class="map" 
                    id="map" 
                    :longitude="longitude" 
                    :latitude="latitude" 
                    scale="14" 
                    :markers="markers" 
                    @markertap="makertap"
                ></map>

                <!-- <b-map 
                    class="map-contain" 
                    :scroll-wheel-zoom="true" 
                    :center="center" 
                    :zoom="zoom" 
                    MapType="BMAP_SATELLITE_MAP" 
                    @ready="mapReady">
                        <bm-geolocation 
                            anchor="BMAP_ANCHOR_BOTTOM_RIGHT" 
                            @locationSuccess="getMyLocation()" 
                            :showAddressBar="true"
                            :autoLocation="true"
                        ></bm-geolocation>
                        <bm-marker 
                            @dragend="markerDrag" 
                            :position="center" 
                            :dragging="true" 
                            animation="BMAP_ANIMATION_BOUNCE">
                        <bm-label content="我爱北京天安门" :labelStyle="{color: 'red', fontSize : '24px'}" :offset="{width: -35, height: 30}"/> 
                    </bm-marker>
                </b-map>     -->

            </view>
            <view class="map_text" :style="mapTxtHeight">
                <view 
                    @click="tabhospital(index)" 
                    class="uni-flex" 
                    v-for="(item,index) in textData" 
                    :key="index" 
                    style="border-bottom:1px solid #E4E4E4;min-height:80px;height:auto"
                >
                    <view class="uni-flex-item">
                        <text class="h1">{{item.name}}</text>
                        <text>{{item.distance?(item.distance>1000?((item.distance/1000)+'公里'):(item.distance+'米')):''}}{{item.address!=''?('&nbsp;|&nbsp;'+item.address):''}}</text>
                    </view>
                    <view 
                        v-if="item.tel" 
                        @click.native.stop="phonecall(item.tel)" 
                        style="width: 30px;height:30px;border-radius: 50%;border:1px solid #9f9f9f;text-align:center;margin-top:20px;margin-right:10px">
                        <img src="@/assets/pic/wechat_types.png" alt="" style="width:14px;height:14px;margin-top:8px">
                        <text>电话</text>
                    </view>
                </view>
            </view>
        </view>
    </container>
</template>

<script>
import { miniProApi } from '@/utils/mixins.js'
import MapLoader from '@/utils/AMap.js'
// import amap from '@/utils/js_sdk/js-amap/amap-wx.js'
import base from '@/api/base'
import {
    getForm
} from '@/api/workFlow'
var markersData = []
var poisData=[]

export default  {
    mixins: [ miniProApi ],
    data(){
        return {
            resAmap:null,
            map: null,
            amapPlugin: null,
            key_wechat: base.amapConfigs.aitras_wechat,
            key_web: base.amapConfigs.aitras_web,
            markers: [{}, {}, {}],
            poisdatas: [{}, {}, {}],
            title: 'map',
            latitude: '38.913423', // 初始经度
            longitude: '116.368904',  // 初始维度
            zoom: 15,
            textData:[],
            mapContBotm:'',
            mapTxtHeight:''
        }
    },
    onLoad(){
        // #ifndef H5
        // 初始化 高德地图(非H5端)
        // this.initAmap() 
        // #endif
        // #ifdef H5
        // H5端 初始化 高德地图
        // this.initAmap_web()
        // #endif
        // 初始化 百度地图
        // this.initMap()
    },
    onShow(){

    },
    onReady(){

    },
    methods: {
        initMap () {
            let _this = this
            var map = new BMap.Map('map');
            var point = new BMap.Point(108.95, 34.27);
            map.centerAndZoom(point, 15);
            map.addControl(new BMap.MapTypeControl());
            map.enableScrollWheelZoom(true);
            map.enableDoubleClickZoom(true);
            var geolocation = new BMap.Geolocation();
            geolocation.getCurrentPosition(function (r) {
                var mk = new BMap.Marker(r.point);
                map.addOverlay(mk); // 标出所在地
                map.panTo(r.point); // 地图中心移动
                var point = new BMap.Point(r.point.lng, r.point.lat); // 用所定位的经纬度查找所在地省市街道等信息
                var opts = {
                width: 150,
                height: 50,
                title: '地址：'
                }
                var gc = new BMap.Geocoder();
                gc.getLocation(point, function (rs) {
                // var addComp = rs.addressComponents;
                console.log('rs', rs)
                _this.description = rs.business
                var infoWindow = new BMap.InfoWindow(_this.description, opts);// 创建信息窗口对象
                mk.addEventListener('click', function () {
                    map.openInfoWindow(infoWindow, point);
                });
                map.enableScrollWheelZoom(true);
                map.openInfoWindow(infoWindow, point);// 开启信息窗口
                });
            }, {enableHighAccuracy: true})
        },  
        // 初始化 高德地图 （H5端） 
        async initAmap_web () {
            let that=this;
            try {
                this.resAmap = await MapLoader();
                this.$nextTick(function() {
                    // this.getBroewerLatLng();
                    var map = new this.resAmap.Map('map', {
                        center: [this.longitude , this.latitude],
                        zoom: this.zoom
                    });
                    this.map = map;
                    console.log(this.map)
                    this.resAmap.plugin('AMap.Geolocation', () => {
                        var geolocation = new this.resAmap.Geolocation({
                            enableHighAccuracy: true, //是否使用高精度定位，默认:true
                            timeout: 10000, //超过10秒后停止定位，默认：5s
                            buttonPosition: 'RB', //定位按钮的停靠位置
                            // buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                            zoomToAccuracy: true, //定位成功后是否自动调整地图视野到定位点

                        });
                        map.addControl(geolocation);
                        geolocation.getCurrentPosition(function(status, result) {
                            if (status == 'complete') {
                                onComplete(result)
                            } else {
                                onError(result)
                            }
                        });

                    });
                    
                    //解析定位结果
                    var then = this;

                    function onComplete(data) {
                        console.log(data) // 获取到的定位信息
                        then.latitude = data.latitude;
                        then.longitude = data.longitude;
                    }

                    function onError(data) {
                        console.log(data) // 定位失败的信息
                    }

                })
            } catch (e) {
                console.log(e)
            }
        },        
        // 初始化 高德地图 （非H5端） 
        initAmap () {
            debugger
            let that=this;
            this.amapPlugin = new amap.AMapWX({//初始化
                //#ifndef H5
                key: this.key_wechat,  //该key 是在高德中申请的微信小程序key
                //#endif
                //#ifdef H5
                key: this.key_web
                //#endif
            })
            console.log("初始化的高德地图对象---------",this.amapPlugin)
            this.$nextTick(() => {
                this.amapPlugin.getRegeo({//我的位置
                    iconPath: "@/assets/pic/wechat-types.png",
                    iconWidth: 48,
                    iconHeight: 48,
                    success: function(data){
                        debugger						
                        that.latitude= data[0].latitude;					
                        that.longitude= data[0].longitude;	
                        // that.toast(that.latitude)			
                    },
                    fail: function (err) {
                        console.log(err)
                        // window.alert(err)
                    },
                })

                let params = {
                    iconPathSelected: '@/assets/pic/web-types.png"',
                    iconPath: '@/assets/pic/study-types.png',
                    success: function(data){
                        markersData = data.markers;					
                        poisData = data.poisData;
                    
                        if(markersData.length > 0){
                            that.markers = markersData	
                            that.textData = poisData
                            that.mapContBotm = 'bottom:400px'
                            that.mapTxtHeight = 'height:400px';
                        }else{
                            uni.getLocation({
                                type: 'gcj02',
                                geocode:true,
                                success: function(res) {
                                    debugger
                                    that.latitude=res.latitude						 
                                    that.longitude=res.longitude			  
                                },
                                fail: function(res){
                                    debugger
                                    console.log(res)						  
                                }
                            })
                            
                            that.textData= [{
                                name: '抱歉，未找到结果',
                                address: ''
                            }]
                            
                        }
                    
                    },
                    fail: function(info){
                        debugger
                        console.log(info)
                    }
                }
                params.querykeywords='医院'//显示附近的医院
                this.$nextTick(() => {
                    this.amapPlugin.getPoiAround(params)    
                })
            })
        },
        makertap: function(e) {
            var id = e.markerId;
            var that = this;
            that.showMarkerInfo(poisData,id);
            that.changeMarkerColor(markersData,id);
        },
        showMarkerInfo: function(data,i){
            var that = this;				
            that.textData=[{
            name: data[i].name,
            address: data[i].address,
            distance:data[i].distance,
            tel:data[i].tel
            }]	
            that.mapContBotm='bottom:80px'
            that.mapTxtHeight='height:80px';
        },
        changeMarkerColor: function(data,i){
            var that = this;
            var markers = [];
            for(var j = 0; j < data.length; j++){
                if(j==i){
                data[j].iconPath = "../../../static/img/marker_checked.png"; //如：..­/..­/img/marker_checked.png
                }else{
                data[j].iconPath = "../../../static/img/marker.png"; //如：..­/..­/img/marker.png
                }
                markers.push({
                id: data[j].id,
                latitude: data[j].latitude,
                longitude: data[j].longitude,
                iconPath: data[j].iconPath,
                width: data[j].width,
                height: data[j].height,
                });
            }
            that.markers=markers
            
            },    
        phonecall:function(e){
            if(JSON.stringify(e)==''||JSON.stringify(e)=='[]'){
                // util.showTip('抱歉，未查询到此医院的电话')
                this.$nextTick(() => {
                    this.$refs.containerCmp.$refs.uTips.show({
                        title:'抱歉，未查询到此医院的电话',
                        type: 'warning'
                    })
                })
            }else{					
                uni.makePhoneCall({
                    phoneNumber: e 
                });
            }
        },
        tabhospital(e){
            var id = e;
            var that = this;
            that.showMarkerInfo(poisData,id);
            that.changeMarkerColor(markersData,id);
        }
    }
}   
</script>
