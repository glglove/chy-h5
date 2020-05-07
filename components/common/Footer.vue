<!--
  User: gaol
  Date: 2020/01/26
  功能： footer 基础组件
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>
.footerCmp
    // position fixed
    // bottom 0
    width  100%
    // height 50px
    text-align center
    padding 20px 
    background rgba(85,93,101,1)
    box-sizing border-box
    z-index 10000
    .foot_text
        font-size 12px
        color #999
</style>

<template>
    <div class="footerCmp">
        <p class="foot_text marginAuto u-f-jac">
            <el-image style="width: 80px;height: 80px;margin-right: 20px" fit="contain" :src="require('@/assets/pic/qrcode_gaolong.jpg')"></el-image>
            Copyright © 1998 - 2020 a.kui. All Rights Reserved.
        </p>
    </div>
</template>

<script type="text/ecmascript-6">
export default {

    data() {
        return {

        }
    },
    methods:{
      
    }
}
</script>
