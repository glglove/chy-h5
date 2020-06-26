<!--
  User: xxxxxxx
  Date: 2017/11/20
  功能：附件上传
-->

<template>
  <div class="uploadFile-wrapper">
    <div class="file">
      选 择
      <input type="file" multiple="multiple" ref="fileUpload" @change="preview()">
    </div>
    <div class="file-submit" @click="uploadFile()">
      上 传
    </div>
    <div class="text" :class="redORgreen ? 'c-green' : 'c-red'" v-html="redORgreen ? '上传成功！' : '上传失败！'" v-if="okUpload"></div>
    <div class="showFileName" v-if="filecontent.length > 0">
      <ul class="files-content">
        <li class="item" v-for="(item, index) in filecontent">
          <span class="name">{{parseInt(index)+1}}. {{item.name}}</span>
          <i class="el-icon-close name-icon" style="margin-left: 20px" @click="delfile(index)"></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { attachmentPost } from '@/api/notice'
  import { REQ_OK, UPLOAD_NUM } from '@/api/config'
  import { Message } from 'element-ui'
  export default {
    props: {
      noticeCode: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        fileName: '',
        filecontent: [],
        okUpload: false,
        redORgreen: false
      }
    },
    methods: {
      preview () {
        let files = this.$refs.fileUpload.files
        files = Object.keys(files).map(function (k) { return files[k] })
        if (files.filter((item) => item.size > 2 * 1024 * 1024).length > 0) {
          Message.error('上传文件不得大于2M')
          return false
        }
        let arr = this.filecontent.concat(files)
        if (arr.length > UPLOAD_NUM) {
          Message.error('上传文件不得大于5个')
          return false
        }
        this.filecontent = arr
        this.fileName = files[0].name
      },
      uploadFile () {
        attachmentPost(this.filecontent, this.noticeCode).then((res) => {
          if (res.data.State === REQ_OK) {
            this.okUpload = true
            this.redORgreen = true
          } else {
            this.okUpload = true
            this.redORgreen = false
          }
        }).catch(() => {
          this.okUpload = true
          this.redORgreen = false
        })
      },
      delfile (i) {
        this.filecontent.splice(i, 1)
      }
    },
    watch: {
      'filecontent': {
        handler (newValue, oldValue) {
          this.$emit('fileChange', this.filecontent)
        },
        deep: true
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/variable"

  .uploadFile-wrapper
    .text
      display block
      &.c-red
        color red
      &.c-green
        color: #5daf34
    .file
      position: relative
      display: inline-block
      cursor: pointer;
      background: #fff;
      border: 1px solid #d8dce5;
      color: #5a5e66;
      border-radius: 4px
      height 40px
      width 70px
      overflow: hidden
      text-align center
      text-decoration: none
      text-indent: 0
      line-height: 40px
      input
        position: absolute
        height 40px
        width 70px
        left 0
        top: 0
        opacity: 0
        &:hover
          cursor pointer
      &:hover
        color: #3B8BE3;
        border-color: rgb(196, 220, 247);
        background-color: rgb(235, 243, 252);
        cursor pointer
    .showFileName
      position: relative
      vertical-align top
      .files-content
        .name-icon
          transition:All 0.2s ease-in-out
          &:hover
            color: $color
            cursor pointer
            transform:rotate(90deg) scale(1.5)
    .file-submit
      position: relative
      display: inline-block
      background: #fff;
      border: 1px solid #d8dce5;
      color: #5a5e66;
      border-radius: 4px
      height 40px
      width 70px
      overflow: hidden
      text-align center
      line-height: 40px
      &:hover
        color: #3B8BE3;
        border-color: rgb(196, 220, 247);
        background-color: rgb(235, 243, 252);
        cursor pointer

</style>
