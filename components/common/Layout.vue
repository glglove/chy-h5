<!--
  User: gaol
  Date: 2020/01/26
  功能： 基础页面组件
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>
.layout
    // height calc(100vh - 0px)
    min-height 100%
    background #f4f7f9
    .app-wrapper
        min-height 100%
        .routerCotentBox
            // min-height calc(100vh - 60px)
            // overflow auto
            // height calc(100vh - 60px)
            // height 100%
            .contentBox
                // height calc(100vh - 60px)
                min-height 100%
</style>

<template>
    <el-row :span="24" class="layout animated fadeIn">
        <div class="app-wrapper">

            <menu-cmp class="menuBox"></menu-cmp>

            <div class="routerCotentBox">
                <transition name="fade" mode="out-in">
                    <keep-alive>
                        <div class="contentBox">
                            <router-view></router-view>
                        </div>
                    </keep-alive>
                </transition>
            </div>    
        </div>   

        <footer-cmp></footer-cmp> 
    </el-row>    
</template>

<script type="text/ecmascript-6">
import MenuCmp from '@/components/common/Menu.vue'
import FooterCmp from '@/components/common/Footer.vue'
export default {
    components: {
        MenuCmp,
        FooterCmp
    },
    data() {
        return {
            activeIndex: '1'
        }
    },
    created(){
        // console.log("---------",this.$checkNetWork_mobile())
    },
    methods:{
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }        
    }
}
</script>
