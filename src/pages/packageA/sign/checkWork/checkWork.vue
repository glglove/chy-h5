<!--
  User: xxxxxxx
  Date: 2020/6/16
  功能：考勤页面
-->
<style lang="less" scoped src = "">

</style>
<template>
    <container
        :containerAllloading="containerAllloading"
        :containerLoading = "containerLoading"
        ref="containerCmp"
    >
        <view id="checkWork" class="page animated fadeInLeft fast" slot="container-slot">
            考勤页面
        </view>
    </container>
</template>

<script>

export default  {
    data(){
        return {
            
        }
    }
}   
</script>
