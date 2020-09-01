<template>
  <div>
    <div style="text-align: left; margin: 5px">
      <el-input clearable prefix-icon="iconfont icon-sousuo" v-model="searchTableInfo" placeholder="请输入文件名称关键词" style="width:240px"></el-input>
    </div>

    <!--  网盘内容表格-->
    <el-table :height="tableHeight"
              ref="netdiskTable"
              border
              :data="myNetdiskData.slice((currentPage-1)*pageSize, currentPage * pageSize)"
              tooltip-effect="dark"
              style="width: auto"
              :row-style="{height:'25px',width:'auto'}"
              :default-sort="{prop: 'netdisk_time', order: 'descending'}"
    >
      <el-table-column align="center" prop="netdisk_time" label="上传时间" width="auto" sortable>
      </el-table-column>
      <el-table-column align="center" prop="netdisk_name" label="文件名称" width="auto">
        <template slot-scope="{row,$index}">
          <input class="edit-cell" v-if="showEdit[$index]" v-model="row.netdisk_name">
          <span v-if="!showEdit[$index]">{{row.netdisk_name}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="netdisk_size" label="文件大小" width="auto" sortable>
      </el-table-column>
      <el-table-column align="center" prop="netdisk_icon" label="文件类型" width="auto">
        <template slot-scope="{row,$index}">
          <input class="edit-cell" v-if="showEdit[$index]" v-model="row.netdisk_icon">
          <span v-if="!showEdit[$index]">{{row.netdisk_icon}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="netdisk_state" label="文件状态" width="auto">
        <template slot-scope="{row,$index}">
          <el-select v-if="showSelect[$index]"
                     style="width: 100%"
                     v-model="row.value"
                     filterable
          >
            <el-option
              v-for="item in netdisk_stateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <span v-if="!showSelect[$index]">
            <el-tag type="success" v-if="row.netdisk_state === 0">公共</el-tag>
            <el-tag type="danger" v-else-if="row.netdisk_state === 2">个人</el-tag>
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="{row,$index}">
          <el-button size="mini" @click.native="handleUpdate(row)" v-if="showBtn[$index]">
            更新
          </el-button>
          <el-button size="mini" @click.native="handleCancle($index)" v-if="showBtn[$index]">
            取消
          </el-button>

          <el-button size="mini" @click.native="handleEdit($index)" v-if="!showBtn[$index]">
            编辑
          </el-button>
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
          <!--删除提示-->
          <el-popover placement="top" >
            <h5 align="center">确定删除？</h5>
            <div style="text-align: center; margin: 0">
              <el-button type="danger" size="mini" @click="deleteRow(row)">确 定</el-button>
            </div>
            <el-button size="mini" slot="reference">删 除</el-button>
          </el-popover>
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
      :total="myNetdiskData.length">
    </el-pagination>
  </div>
</template>

<script>
  var qs = require('qs');
  export default {
    name: 'NetDiskOfMine',
    data() {
      return{
        searchTableInfo:"",
        currentPage: 1,
        pageSize: 15,
        showEdit: [], //显示编辑框
        showBtn: [],
        showSelect: [],
        myNetdiskData: [],
        tableHeight: window.innerHeight * 0.85,
        //文件状态
        // （绿色）公共0
        // （红色）个人2
        netdisk_stateOptions: [
          {
            value: '0',
            label: '公共'
          },
          {
            value: '2',
            label: '个人'
          }
        ]
      }
    },

    mounted () {
      this.getAllNetdiskByUserId();
    },

    watch: {
      //搜索
      searchTableInfo(){
        var searchTableInfo = this.searchTableInfo;
        if(searchTableInfo){
          this.myNetdiskData = this.myNetdiskData.filter(value => value.netdisk_name.indexOf(this.searchTableInfo) !== -1)
        } else {
          this.getAllNetdiskByUserId();
        }
      },
    },

    methods: {
      //获取个人所有文件列表
      getAllNetdiskByUserId() {
        var getData = this;
        this.$axios.get('netdisk/getAllByUserId',{
          params: {
            user_id: sessionStorage.getItem("user_id")
          }
        })
          .then((res) => {
            getData.myNetdiskData = res.data.result;
          })
          .catch((err) =>{
            console.log(err);
            alert('获取文件失败！');
          })
      },

      //文件下载
      filedownload(row) {
        var params = qs.stringify({
          netdisk_url: row.netdisk_url,
          netdisk_name: row.netdisk_name
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

      //删除（行）
      deleteRow(row) {
        var params = qs.stringify({
          netdisk_id: row.netdisk_id
        })
        this.$axios.post('/netdisk/deleteByNetdiskId', params)
          .then(res => {
            if (res.status === 200 && res.data && res.data.code === 200) {
              this.$message({
                message: '恭喜你，这是一条成功消息',
                type: 'success',
              });
              this.$router.go(0);
            } else if (res.status === 200 && res.data && res.data.code === 201) {
              this.$notify({
                title: '添加失败！',
                type: 'error'
              });
            }
          });
      },

      // 编辑（行）
      // 点击编辑
      handleEdit(index) {
        this.$set(this.showEdit,index,true)
        this.$set(this.showSelect,index,true)
        this.$set(this.showBtn,index,true)
      },
      // 取消编辑
      handleCancle(index) {
        this.$set(this.showEdit,index,false)
        this.$set(this.showSelect,index,false)
        this.$set(this.showBtn,index,false)
      },
      //点击更新
      handleUpdate(row) {
        var params = qs.stringify({
          netdisk_id: row.netdisk_id,
          netdisk_name: row.netdisk_name,
          netdisk_icon: row.netdisk_icon,
          netdisk_state: row.value
        })
        this.$axios.post('/netdisk/updateSingleFile', params)
          .then(res => {
            if (res.status === 200 && res.data && res.data.code === 200) {
              this.$message({
                message: '恭喜你，这是一条成功消息',
                type: 'success',
              });
              this.$router.go(0);
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
