<!--
  User: gaol
  Date: 2020/01/26
  功能： error 页面
-->

<style lang="stylus" rel="sheetStylus" scoped>
.page_error
    min-height calc(100vh - 110px)
</style>

<template>
    <div :class="['page_error', noData?'error':'']">

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
