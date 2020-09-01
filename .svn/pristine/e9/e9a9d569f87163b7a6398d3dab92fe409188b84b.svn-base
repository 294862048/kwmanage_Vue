<template>
  <el-upload
    class="upload-demo"
    ref="upload"
    action="http://localhost:8888/api/netdisk/upload"
    :on-preview="handlePreview"
    :before-upload="beforeUpload"
    :data="uploadData"
    :on-error = "error"
    :on-success="successResave"
    :on-remove="handleRemove"
    :file-list="fileList"
    :auto-upload="false">
    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
    <div slot="tip" class="el-upload__tip">单个文件上传大小不能超过1GB，单次文件上传大小不能超过2GB</div>
  </el-upload>
</template>

<script>
  var qs = require('qs');
  export default {
    name: 'NetDiskUpload',
    data() {
      return {
        fileList: [],
        uploadData: null
      };
    },

    methods: {
      //上传
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      beforeUpload (file) {
        this.uploadData = {
          user_id: sessionStorage.getItem("user_id"),
          netdisk_uploaduser: sessionStorage.getItem("login_username")
        };
        let promise = new Promise((resolve) => {
          this.$nextTick(function () {
            resolve(true);
          });
        });
        return promise; //通过返回一个promis对象解决
      },
      //上传成功钩子
      successResave(res, file, fileList){
        if(res.status === 200 && res.data && res.data.code === 201){
          alert("保存成功")
          this.proType="";
          this.mobanname="";
          this.value5="";
        }
      },
      //失败钩子
      error(response, file, fileList){
        console.log(response)
      },
      // submitUpload() {
      //   this.$refs.upload.submit();
      // },
      // handleRemove(file, fileList) {
      //   console.log(file, fileList);
      // },
      // handlePreview(file) {
      //   console.log(file);
      // },
      // handleExceed (files, fileList) {
      //   this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      // },
      // beforeRemove (file, fileList) {
      //   return this.$confirm(`确定移除 ${file.name}？`)
      // },
      // handleSuccess (response) {
      //   this.url = response
      //   this.$emit('onUpload')
      //   this.$message.warning('上传成功')
      // },
      // clear () {
      //   this.$refs.upload.clearFiles()
      // }
    }
  }
</script>

<style scoped>

</style>
