
<!--
  User: gaol
  Date: 2020/01/26
  功能： 个人中心——匹配项目
-->

<style lang="stylus" rel="sheetStylus" scoped>
.page_searchProject
    min-height calc(100vh - 110px)
</style>

<template>
    <div :class="['page_searchProject']">
        <div class="searchBox u-f-ac">
           <el-select v-model="searchObj.type">
               <el-option
                v-for="(type, key) in types"
                :key="key"
                :label="type.name"
                :value="type.value"
            ></el-option>
           </el-select>
           <el-input class="marginL10 marginR10" placeholder="数据关键词"></el-input>
           <el-button type="primary">查询</el-button>
        </div>

        <el-table
            :class="['marginT20']"
            v-loading="loading"
            border
            max-height="300"
            :data="tableData"
        >
           <el-table-column
             label="序号"
           >

           </el-table-column>
           <el-table-column
             label="标题"
           >

           </el-table-column>
           <el-table-column
             label="项目预算"
           >

           </el-table-column>
           <el-table-column
             label="项目周期"
           >

           </el-table-column>     
           <el-table-column
             label="联系方式"
           >
           </el-table-column>                                          
        </el-table>
    </div>
</template>

<script type="text/ecmascript-6">
    import MenuCmp from '@/components/common/Menu.vue'
    export default {
        components:{
            MenuCmp
        },
        data() {
            return {
                loading: false,
                noData: true,
                tableData: [],
                searchObj: {
                    type: ''
                },
                types: [
                    {
                        name: '移动应用',
                        value: '1'
                    },
                    {
                        name: 'H5应用',
                        value: '2'
                    },
                    {
                        name: '微信应用',
                        value: '3'
                    },
                    {
                        name: '企业应用',
                        value: '4'
                    },
                    {
                        name: 'web应用',
                        value: '5'
                    },
                    {
                        name: '工具应用',
                        value: '6'
                    },
                    {
                        name: '设计',
                        value: '7'
                    },
                    {
                        name: '区块链',
                        value: '8'
                    },
                    {
                        name: '大数据',
                        value: '9'
                    },
                    {
                        name: '人工只能',
                        value: '10'
                    },                                                                                                                                                                                    
                ],
            }
        }
    }
</script>
