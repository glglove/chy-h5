<!--
  User: xxxxxxx
  Date: 2017/11/20
  功能：富文本编辑器组件
-->

<template>
  <div class="editBox">
    <!--富文本编辑器 quill-editor-start-->
    <quill-editor 
      v-model="nativeContent"
      ref="myTextEditor"
      :aria-placeholder="placeholder"
      @change="onChange($event)"
      @ready="onEditorReady($event)"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
    >
    </quill-editor>
    <!--富文本编辑器 quill-editor-end-->

    <!--图片裁剪上传的组件-start-->
    <crop-upload
      ref="cropUpload"
      :width="width"
      :height="height"
      :fileName="fileName"
      :uploadUrl="uploadUrl"
      @uploadSuccess="onUploadSuccess"
    ></crop-upload>
    <!--图片裁剪上传的组件-end-->
  </div>
</template>
<script>
  import { quillEditor } from 'vue-quill-editor'
  import CropUpload from './cropUpload'
  import {mapGetters} from 'vuex'
  import { UPLOAD_URL, FILE_URL } from '@/api/config'

  export default {
    props: {
      placeholder: {
        type: String,
        default: ''
      }
    },
    computed: {
      editor () {
        return this.$refs.myTextEditor.quill
      },
    },
    components: {
      quillEditor,
      CropUpload
    },
    watch: {
      obj (newVal, oldVal) {
        debugger
        // obj变化后 触发父组件进行更新
        this.nativeContent = newVal.FieldValue
        // this.$emit("update:obj", newVal)
      },
      nativeContent (newVal, oldVal) {
        debugger
        if (this.editor) {
          this.nativeContent = newVal
          try{
            this.obj.FieldValue = this.nativeContent

            // 将富文本内容 获取其中的字符串
            function handleContent (html) {
              let re1 = new RegExp("<.+?>","g")//匹配html标签的正则表达式，"g"是搜索匹配多个符合的内容
              let msg = html.replace(re1,'')//执行替换成空字符
              return msg
            }    

            // this.obj.DisplayValue = handleContent(this.nativeContent)
            this.obj.DisplayValue = this.nativeContent
          }catch(error){

          }
        }
      },
    },   
    data () {
      return {
        nativeContent: `<p>hello world</p>`,          
        editorOption: {
          theme: 'bubble',           
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],//加粗，斜体，下划线，删除线
              ['blockquote', 'code-block'], //引用，代码块
              [{ 'list': 'ordered'}, { 'list': 'bullet' }], //列表
              [{ 'script': 'sub'}, { 'script': 'super' }], // 上下标
              [{ 'indent': '-1'}, { 'indent': '+1' }],  // 缩进
              [{ 'direction': 'rtl' }],    // 文本方向      
              [{ 'size': ['small', false, 'large', 'huge'] }], // 字体大小
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],  //几级标题                     
              [{ 'color': [] }, { 'background': [] }],  // 字体颜色，字体背景颜色
              [{ 'font': [] }],  //字体
              [{ 'align': [] }], //对齐方式
              // ['clean'], //清除字体样式
              // ['image','video'] //上传图片、上传视频
            ]            
          }
        },
        /* 编辑器的内容 */
        value: '',
        /* 上传图片的地址 */
        uploadUrl: UPLOAD_URL,
        /* 上传图片的file控件name */
        fileName: 'upImg',
        /* 图片大小 */
        maxSize: {
          type: Number,
          default: 400 // kb
        },
        /* 使用使用裁切 */
        canCrop: {
          type: Boolean,
          default: false
        },
        /* 裁切的最小尺寸 */
        width: 400,
        /* 裁切的最小尺寸 */
        height: 300
      }
    },    
    created () {
      debugger
      // this.$message.success({
      //   type: 'info',
      //   message: "aitrs-edit编辑器中created打印 obj"
      // })
      console.log("aitrs-edit编辑器中打印 obj", this.obj)
    },
    mounted () {
      this.$nextTick(() => {
        debugger    
        console.log("aitrs-edit中 mounted-------", this.flowContent)

        this.nativeContent = this.flowContent

        this.editorOption.placeholder = this.placeholder

        // console.log(document.querySelector(`.${this.quilleditorToolNum}`))
      })  
    },
    beforeUpdate() {

    },
    updated(){
      debugger
      console.log("aitrs-edit中 updated-------", this.obj)
    },
    beforeDestroy(){
      this.$bus.$off('clearFlowEditor')
    },
    methods: {
      // 编辑器准备好
      onEditorReady () {
        // this.$message.success("编辑器已准备好")
        if(this.flowEditorContentVal){
          this.nativeContent = this.flowEditorContentVal
        }        
      },
      // 获取焦点
      onEditorFocus(val, editor){
        // console.log(val); // 富文本获得焦点时的内容
        // editor.enable(false); // 在获取焦点的时候禁用
      },
      // 失去焦点
      onEditorBlur({editor}){
        debugger
        this.$emit("editorEmit", editor.delta['ops'][0].insert)
      },
      resetContent () {
        this.nativeContent = ''
      },
      onChange ({ editor, html, text }) {
        debugger
        // console.log('editor change!', editor, html, text)
        this.$emit('editorEmit', html, text)
      },
      /* 选择上传图片切换 */
      onFileChange (e) {
        let fileInput = e.target
        if (fileInput.files.length === 0) {
          return
        }
        if (fileInput.files[0].size > 1024 * 1024 * this.maxSize) {
          this.$message.info('图片过大，请重新上传')
          return
        }
        if (!this.uploadUrl) {
          return
        }
        // let self = this
        let data = new FormData()
        for (let i in fileInput.files) {
          data.append(fileInput.files[i].name, fileInput.files[i]) // 通过append向form对象添加数据
        }
        data.append('Method', 'UploadAttachments') // 添加form表单中其他数据
        // data.append('noticeCode', this.noticeCode)
        this.editor.focus()
        // 原生上传图片
        this.upImg(data)
      },
      /* 裁切上传成功 res根据上传接口值获取 */
      onUploadSuccess: function (res) {
        this.editor.focus()
        this.editor.insertEmbed(this.editor.getSelection().index, 'image', FILE_URL + res.Data[0].Url)
      },
      /* 点击上传图片按钮 */
      imgClick () {
        this.canCrop = false
        if (this.canCrop) {
          this.$refs.cropUpload.showUpload()
        } else {
          /* 创建input file 不裁切，自己控制 */
          var input = document.createElement('input')
          input.type = 'file'
          input.multiple = 'multiple'
          input.className = 'imgUpload'
          input.name = this.fileName
          input.accept = 'image/jpeg,image/png,image/jpg,image/gif'
          input.onchange = this.onFileChange
          input.click()
        }
      },
      upImg (params) {
        let self = this
        let request = new XMLHttpRequest()
        request.open('post', this.uploadUrl, true)
        request.onreadystatechange = function () {
          if (request.readyState === 4) {
            if (request.status === 200) {
              let json = JSON.parse(request.response)
              if (json.State === 1) {
                self.$emit('upImgSuccess', json)
                if (json.Data) {
                  for (let i = 0; i < json.Data.length; i++) {
                    self.editor.insertEmbed(self.editor.getSelection().index, 'image', FILE_URL + json.Data[i].Url)
                  }
                }
              } else {
                self.$emit('upImgError', json)
              }
            } else if (parseInt(request.status / 100) === 4) {
              self.$emit('upImgError')
            }
          }
        }
        try {
          request.send(params || null)
        } catch (e) {
          self.$emit('upImgError')
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .quill-editor
    border 1px solid #d8dce5
    border-radius 4px
    .ql-toolbar
      text-align left !important
    .ql-container
      min-height 120px
      max-height 300px
      .ql-editor
        height 120px
      .ql-tooltip
        // left 0 !important
    .ql-snow
      border 0
      border-bottom 1px solid #d8dce5
      &:last-child
        border-bottom 0
      .ql-picker
        height 42px !important
    .ql-snow
      .ql-editor
        img
          max-width: 480px
        .ql-video
          max-width: 480px
      .ql-picker
        height 42px !important
        line-height 40px
    .imgUpload
      background: none;
      border: none;
      cursor: pointer;
      display: inline-block;
      float: left;
      height: 24px;
      padding: 3px 5px;
      width: 28px;
      position: absolute;
      opacity: 0;
      left 0
      &:hover
        cursor pointer
</style>
