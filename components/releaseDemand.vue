<!--
  User: gaol
  Date: 2020/01/26
  功能： 发布需求-填写指定类型需求 页面
-->

<style lang="stylus" rel="sheetStylus" scoped>
>>>.el-upload
    width 100% !important
    .el-upload-dragger
        width 100% !important
.demand-container
    height 100%
    .tit_left
        float left
        font-size 18px
        font-weight 600
    .tit_right
        float right
        margin-right 50px
    .card-box_third
        >>>.el-card__body
            height 130px !important
</style>

<template>
    <el-row 
        class="demand-container">
        <el-col :span="14" style="margin: 0 auto; float: none">
            <el-form ref="formObj" :model="formObj" :rules="formObjRules" label-width="120px">
                <el-card class="card-box_first marginT50" type="card">
                    <div slot="header" class="clearfix">
                        <span class="tit_left">基本信息</span>
                        <!-- selectAppTypeObj:{{selectAppTypeObj}} -->
                        <span class="tit_right">
                            应用类型：
                            <el-button 
                                type="text" 
                                size="mini"
                                style="color:black;font-size: 20px"
                            >{{selectAppTypeObj.name}}</el-button>
                            <el-popover
                                style="margin-right: 30px"
                                placement="top"
                                width="630"
                                v-model="showPop"
                            >
                                <div class="u-f-ac u-f-wrap">
                                    <el-button
                                        style="margin: 5px"
                                        v-for="(item, key) in AppTypes"
                                        size="mini"
                                        :key="key"
                                        :type="selectAppIndex == key? 'primary':''"
                                        :icon="selectAppIndex== key? 'el-icon-success': ''"
                                        @click.native="selectAppType(item,key)"
                                    >
                                        {{item.name}}
                                    </el-button>
                                </div>

                                <div style="text-align: right; margin: 0">
                                    <el-button size="mini" type="text" @click.native="cancelPop">取消</el-button>
                                    <el-button type="primary" size="mini" @click.native="savePop">确定</el-button>
                                </div>                                
                                <el-button type="text" size="mini"  slot="reference">修改</el-button>
                            </el-popover>
                        </span>
                    </div>
                    <div class="container">
                        <el-form-item label="需求标题" prop="tit">
                            <el-input 
                                v-model="formObj.tit"
                                placeholder="请输入需求标题,如电商类网站开发，APP开发"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="预算" prop="budget">
                            <span class="u-f-ac u-f-jsb">
                                <el-input
                                    v-model="formObj.budget"
                                    placeholder="请输入预算,默认: 可商议"
                                ></el-input>
                                <el-button type="info" style="margin-left: 5px">元</el-button>
                            </span>
                        </el-form-item>
                        <el-form-item label="周期" prop="timeLimit">
                            <span class="u-f-ac u-f-jsb">
                                <el-input
                                    v-model="formObj.timeLimit"
                                    placeholder="您希望任务周期为几天"
                                ></el-input>
                                <el-button type="info" style="margin-left:5px">天</el-button>
                            </span>
                        </el-form-item>                        
                    </div>
                </el-card>

                <el-card class="card-box_secend marginT20" type="card">
                    <div slot="header" class="clearfix">
                        <span class="tit_left">需求信息</span>
                    </div>
                    <div class="container">
                        <el-form-item prop="content" :rules="formObjRules.contentRules">
                            <editor-cmp @editorEmit="editorEmit"></editor-cmp>
                        </el-form-item>

                        <el-form-item label="附件">
                            <el-col :span="24">
                                <span>
                                    <el-upload
                                        drag
                                        action="https://jsonplaceholder.typicode.com/posts/"
                                        multiple>
                                    <i class="el-icon-upload"></i>
                                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传, 支持总大小不超过5M的文件</em></div>
                                    <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
                                    </el-upload>  
                                </span>
                            </el-col>                          
                        </el-form-item>
                    </div>
                </el-card>        


                <el-card class="card-box_third marginT20 marginB30" type="card">
                    <div slot="header" class="clearfix">
                        <span class="tit_left">联系信息</span>
                        <!-- <span>
                            应用类型：移动应用
                            <el-button type="text" size="mini" @click.native="editCat">修改</el-button>
                        </span> -->
                    </div>
                    <div class="container" style="padding-bottom: 80px">
                        <el-col :span="12">
                            <el-form-item label="姓名" prop="contactName" label-width="120px">
                                <el-input 
                                    v-model="formObj.contactName"
                                    placeholder="请输入联系人">

                                </el-input>                                
                            </el-form-item>
                            <el-form-item label="电话" prop="contactPhone">
                                <el-input 
                                    v-model="formObj.contactPhone"
                                    placeholder="请输入联系电话">
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </div>
                </el-card>                   
            </el-form>
        </el-col>

        <div class="footerBox marginB50">
            <el-button 
                style="width: 300px;height: 40px;font-size: 16px;border-radius: 20px;box-shadow: 0 2px 10px silver"
                type="primary" 
                size="mini" 
                @click.native="saveRelease"
            >保存并发布</el-button>
        </div>
    </el-row>
</template>

<script type="text/ecmascript-6">
    import MenuCmp from '@/components/common/Menu.vue'
    import AppTypesCmp from '@/components/common/AppTypes.vue'
    import EditorCmp from '@/components/common/editor/editor.vue'

    import bigDataTypes from '@/assets/pic/bigData_types.png'
    import blockChainTypes from '@/assets/pic/blockChain_types.png'
    import brainPowerTypes from '@/assets/pic/brainPower_types.png'
    import cloudTypes from '@/assets/pic/cloud_types.png'
    import gamesTypes from '@/assets/pic/games_types.png'
    import html5Types from '@/assets/pic/html5_types.png'
    import IOTTypes from '@/assets/pic/IOT_types.png'
    import mobileTypes from '@/assets/pic/mobile_types.png'
    import webTypes from '@/assets/pic/web_types.png'
    import wechatTypes from '@/assets/pic/wechat_types.png'

    export default {
        props: {

        },
        components:{
            MenuCmp,
            AppTypesCmp,
            EditorCmp
        },
        data() {
            let contentValid = (rule, value, callback) => {
                if(!this.content){
                    callback(new Error("请输入需求内容"))
                }else {
                    callback()
                }
            }
            return {
                loading: false,
                noData: true,
                formObj: {
                    catgrary: '',
                    tit: '',
                    budget: '',
                    timeLimit: '',
                    content: '',
                    contactPhone: '',
                    contactName: ''
                },
                formObjRules: {
                    tit: [{required: true, message: '请输入需求名称', trigger: 'blur'}],
                    budget: [{required: false, message: '请输入预算金额', trigger: 'blur'}],
                    timeLimit: [{required: true, message: '请输入需求周期', trigger: 'blur'}],
                    content: [{required: true, validator: contentValid, trigger: ['blur','change']}],
                    contactPhone: [{required: true ,message: '请输入联系方式', trigger: ['blur','change']}],
                    contactName: [{required: true, message: '请输入联系人姓名', trigger: ['blur','change']}],
                },
                showPop: false, 
                selectAppIndex:0,
                selectAppTypeObj: {},
                AppTypes: [
                    {
                        id: '1',
                        src: bigDataTypes,
                        name: '大数据',
                        tip: "40,000+ 开发商",
                        isHover: false,
                        isSelected: false,
                    },
                    {
                        id: '2',
                        src: blockChainTypes,
                        name: '区块链',
                        tip: "80,000+ 开发商",
                        isHover: false,
                        isSelected: false,
                    },
                    {
                        id: '3',
                        src: brainPowerTypes,
                        name: '人工智能',
                        tip: "80,000+ 开发商",
                        isHover: false,
                        isSelected: false,
                    },
                    {
                        id: '4',
                        src: cloudTypes,
                        name: '云计算',
                        tip: "80,000+ 开发商",
                        isHover: false,
                        isSelected: false,
                    },
                    {
                        id: '5',
                        src: gamesTypes,
                        name: '游戏开发',
                        tip: "80,000+ 开发商",
                        isHover: false,
                        isSelected: false,
                    },
                    {
                        id: '6',
                        src: html5Types,
                        name: 'HTML5应用',
                        tip: "80,000+ 开发商",
                        isHover: false,
                        isSelected: false,
                    },
                    {
                        id: '7',
                        src: IOTTypes,
                        name: '物联网',
                        tip: "80,000+ 开发商",
                        isHover: false,
                        isSelected: false,
                    },
                    {
                        id: '8',
                        src: mobileTypes,
                        name: 'APP开发',
                        tip: "80,000+ 开发商",
                        isHover: false,
                        isSelected: false,
                    },
                    {
                        id: '9',
                        src: webTypes,
                        name: '网站开发',
                        tip: "80,000+ 开发商",
                        isHover: false,
                        isSelected: false,
                    },
                    {
                        id: '10',
                        src: wechatTypes,
                        name: '微信/小程序',
                        tip: "80,000+ 开发商",
                        isHover: false,
                        isSelected: false,
                    }                                                                                                                                                                                    
                ]                   
            }
        },
        created(){
            this.selectAppIndex = this.$route.query.id * 1 -1 
            this.selectAppTypeObj = this.AppTypes[this.selectAppIndex]
            document.getElementById("app").scrollTop = 0
        },
        methods: {
            // 修改应用类型
            // 保存发布
            saveRelease(){
                this.$refs.formObj.validate(valid => {
                    if(valid){

                    }else {

                    }
                })
            },
            editorEmit(text){
                debugger
                this.content = text
            }, 
            selectAppType(item, key){
                this.selectAppIndex = key
            },       
            savePop(){
                debugger
                this.selectAppTypeObj = this.AppTypes[this.selectAppIndex]
                this.showPop = false
            },
            cancelPop(){
                debugger
                this.showPop = false
            }    
        }
    }
</script>
