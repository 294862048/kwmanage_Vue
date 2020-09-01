<template>
  <div>
    <div style="text-align: left; margin: 5px">
      <el-input clearable prefix-icon="el-icon-search" v-model="searchTableInfo" placeholder="请输入文件名称关键词" style="width:240px"></el-input>
    </div>

    <!--  网盘内容表格-->
    <el-table :height="tableHeight"
            ref="netdiskTable"
            border
            :data="netdiskData.slice((currentPage-1)*pageSize, currentPage * pageSize)"
            tooltip-effect="dark"
            style="width: auto"
            :row-style="{height:'25px',width:'auto'}"
            :default-sort="{prop: 'netdisk_time', order: 'descending'}"
    >
      <el-table-column align="center" prop="netdisk_time" label="上传时间" width="auto" sortable>
      </el-table-column>
      <el-table-column align="center" prop="netdisk_name" label="文件名称" width="auto">
      </el-table-column>
      <el-table-column align="center" prop="netdisk_size" label="文件大小" width="auto" sortable>
      </el-table-column>
      <el-table-column align="center" prop="netdisk_icon" label="文件类型" width="auto">
      </el-table-column>
      <el-table-column align="center" prop="netdisk_uploaduser" label="上传人" width="auto">
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="{row,$index}">
          <a :href=row.netdisk_url>
            <el-button v-if="row.netdisk_icon.toLowerCase() == 'png'" size="mini" >预览</el-button>
            <el-button v-else-if="row.netdisk_icon.toLowerCase() == 'jpg'" size="mini" >预览</el-button>
            <el-button v-else-if="row.netdisk_icon.toLowerCase() == 'jpeg'" size="mini" >预览</el-button>
            <el-button v-else-if="row.netdisk_icon.toLowerCase() == 'gif'" size="mini" >预览</el-button>
            <el-button v-else-if="row.netdisk_icon.toLowerCase() == 'pdf'" size="mini" >预览</el-button>
            <el-button v-else-if="row.netdisk_icon.toLowerCase() == 'txt'" size="mini" >预览</el-button>

            <el-button v-else-if="row.netdisk_icon.toLowerCase() != 'png'" @click="filedownload(row)" size="mini" >下载</el-button>
            <el-button v-else-if="row.netdisk_icon.toLowerCase() != 'jpg'" @click="filedownload(row)" size="mini" >下载</el-button>
            <el-button v-else-if="row.netdisk_icon.toLowerCase() != 'jpeg'" @click="filedownload(row)" size="mini" >下载</el-button>
            <el-button v-else-if="row.netdisk_icon.toLowerCase() != 'gif'" @click="filedownload(row)" size="mini" >下载</el-button>
            <el-button v-else-if="row.netdisk_icon.toLowerCase() != 'pdf'" @click="filedownload(row)" size="mini" >下载</el-button>
            <el-button v-else-if="row.netdisk_icon.toLowerCase() != 'txt'" @click="filedownload(row)" size="mini" >下载</el-button>
          </a>
        </template>
      </el-table-column>
    </el-table>

    <!--    分页-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="netdiskData.length">
    </el-pagination>
  </div>
</template>

<script>
  var qs = require('qs');
  export default {
    name: 'NetDisk',
    data() {
      return{
        netdiskData: [],
        searchTableInfo:"",
        currentPage: 1,
        pageSize: 15,
        tableHeight: window.innerHeight * 0.85,
      }
    },

    mounted () {
      this.getAllNetdisk();
    },

    watch: {
      //搜索
      searchTableInfo(){
        var searchTableInfo = this.searchTableInfo;
        if(searchTableInfo){
          this.netdiskData = this.netdiskData.filter(value => value.netdisk_name.indexOf(this.searchTableInfo) !== -1)
        } else {
          this.getAllNetdisk();
        }
      },
    },

    methods: {
      //获取所有文件列表
      getAllNetdisk() {
        var getData = this;
        this.$axios.get('netdisk/getAll')
          .then((res) => {
            getData.netdiskData = res.data.result;
          })
          .catch((err) =>{
            console.log(err);
            alert('获取文件失败！');
          })
      },

      //文件下载
      filedownload(row) {
        var params = qs.stringify({
          netdisk_name: row.netdisk_name,
          netdisk_url: row.netdisk_url
        })
        this.$axios.post('netdisk/filedownload', params)
          .then(res => {
            if (res.status === 200 && res.data && res.data.code === 200) {
              this.$message({
                message: '恭喜你，这是一条成功消息',
                type: 'success',
              });
            } else if (res.status === 200 && res.data && res.data.code === 201) {
              this.$notify({
                title: '添加失败！',
                type: 'error'
              });
            }
          });
      },

      //图片下载
      imagedownload(row) {
        var params = qs.stringify({
          netdisk_url: row.netdisk_url,
          netdisk_name: row.netdisk_name
        })
        this.$axios.post('netdisk/imagedownload', params)
          .then(res => {
            if (res.status === 200 && res.data && res.data.code === 200) {
              this.$message({
                message: '恭喜你，这是一条成功消息',
                type: 'success',
              });
            } else if (res.status === 200 && res.data && res.data.code === 201) {
              this.$notify({
                title: '添加失败！',
                type: 'error'
              });
            }
          });
      },

      handleSizeChange: function (val) {
        this.pagesize = val
      },
      handleCurrentChange: function (val) {
        this.currentPage = val
      }
    }
  }
</script>

<style scoped>

</style>
