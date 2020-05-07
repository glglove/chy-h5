<!--
  User: gaol
  Date: 2020/01/26
  功能： 个人中心——我的发布
-->

<style lang="stylus" rel="sheetStylus" scoped>
.page_myRelease
    min-height calc(100vh - 110px)
</style>

<template>
    <div :class="['page_myRelease']">
        <el-table
            :data="tableData"
            border
        >
            <el-table-column
                label="id"
                prop="id"
            >

            </el-table-column>
            <el-table-column
                label="标题"
                prop="tit"
            >

            </el-table-column>

            <el-table-column
                label="预算"
                prop="buget"
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
                noData: true,
                tableData: []
            }
        }
    }
</script>
