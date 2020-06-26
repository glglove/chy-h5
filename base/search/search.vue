<!--
  User: xxxxxxx
  Date: 2017/12/12
  功能：xxxxxx
-->

<template>
  <div class="search-wrapper">
    <div class="yd-search-input" v-show="!showFullpageSearch">
      <form class="search-input">
        <i class="search-icon"></i>
        <div class="yd-input">
          <input type="search" :placeholder="placeholder" v-model="keyword" autocomplete="off" @click="showFullpageSearch = true">
          <div class="yd-input-clear" @click="clearSearch"></div>
          <span class="yd-input-error" style="display: none;"></span>
          <span class="yd-input-warn" style="display: none;"></span>
          <span class="yd-input-success" style="display: none;"></span>
        </div>
      </form>
    </div>
    <div class="yd-search yd-search-fly yd-search-show my-search" style="top: -1px;" v-show="showFullpageSearch">
      <div class="yd-search-input">
        <form class="search-input">
          <i class="search-icon"></i>
          <div class="yd-input">
            <input type="search" :placeholder="placeholder" v-model="keyword" autocomplete="off" @keyup.enter="submitHandler">
            <a href="javascript:;" tabindex="-1" class="yd-input-clear" style="display: none;"></a>
            <span class="yd-input-error" style="display: none;"></span>
            <span class="yd-input-warn" style="display: none;"></span>
            <span class="yd-input-success" style="display: none;"></span>
          </div>
        </form>
        <a href="javascript:;" class="cancel-text" @click="showFullpageSearch = false">取消</a>
      </div>
      <div class="yd-search-list"></div>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      placeholder: {
        type: String,
        default: '搜索'
      }
    },
    data () {
      return {
        keyword: '',
        showFullpageSearch: false
      }
    },
    methods: {
      submitHandler () {
        if (this.keyword) {
          this.showFullpageSearch = false
          this.$emit('search', this.keyword)
        }
      },
      clearSearch () {
        this.keyword = ''
        this.$emit('clearSearch')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/variable.styl"
  @import "~common/css/mixin.styl"
  .yd-search-input
    padding: 0.1rem 0 0.1rem 0.1rem
    .search-input
      height: 0.6rem
      margin-right: 0.1rem
    .cancel-text
      color: $color !important
</style>
