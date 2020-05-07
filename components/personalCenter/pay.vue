<!--
  User: gaol
  Date: 2020/01/26
  功能： 个人中心——支付页面
-->

<style lang="stylus" rel="sheetStylus" scoped>
.page_pay
    min-height calc(100vh - 110px)
    .el-col
        margin 0 auto 
        float none
</style>

<template>
    <div :class="['page_pay']">
        <el-row>
            <el-col :span="12">
                <el-image :src="require('@/assets/pic/code.jpg')" fit="fill"></el-image>
            </el-col>
        </el-row>
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
                noData: true
            }
        }
    }
</script>
