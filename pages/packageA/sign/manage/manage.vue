<!--
  User: xxxxxxx
  Date: 2020/6/16
  功能：管理页面
-->
<style lang="less" scoped src = "">

</style>
<template>
    <container :containerLoading="containerLoading">
        <view id="manage" class="page" slot="container-slot">
            管理页面
        </view>
    </container>
</template>

<script>
import { miniProApi } from '@/utils/mixins.js'
export default  {
    mixins: [ miniProApi ],
    data(){
        return {
            
        }
    }
}   
</script>
