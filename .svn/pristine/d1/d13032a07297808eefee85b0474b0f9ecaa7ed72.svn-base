<template>
  <div>
    <div style="text-align: left; margin: 5px">
      <el-input clearable prefix-icon="iconfont icon-sousuo" v-model="searchTableInfo" placeholder="请输入用户姓名关键词" style="width:240px"></el-input>
    </div>

    <!--科目信息表格-->
    <el-table :height="tableHeight"
              ref="yonghuTable"
              border
              :data="yonghuData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
              tooltip-effect="dark"
              style="width: auto"
              :row-style="{height:'25px',width:'auto'}"
    >
      <!--多选框-->
      <el-table-column type="selection" width="auto"></el-table-column>
      <el-table-column sortable align="center" prop="user_name" label="姓名" width="auto">
        <template slot-scope="{row,$index}">
          <span>{{row.user_name}}</span>
        </template>
      </el-table-column>
      <el-table-column sortable align="center" prop="user_level" label="用户等级" width="auto">
        <template slot-scope="{row,$index}">
          <el-tag type="info" v-if="row.user_level === 0">未验证用户</el-tag>
          <el-tag v-else-if="row.user_level === 1">用户</el-tag>
        </template>
      </el-table-column>
      <el-table-column sortable align="center" prop="login_username" label="用户名" width="auto">
        <template slot-scope="{row,$index}">
          <span>{{row.login_username}}</span>
        </template>
      </el-table-column>
      <el-table-column sortable align="center" prop="user_state" label="用户状态" width="auto">
        <template slot-scope="{row,$index}">
          <el-select v-if="showSelect[$index]"
                     style="width: 100%"
                     v-model="row.user_state"
                     filterable
          >
            <el-option
              id="user_stateSelect"
              v-for="item in user_stateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <span v-if="!showSelect[$index]">
              <el-tag v-if="row.user_state === 0">正常</el-tag>
              <el-tag type="info" v-else-if="row.user_state === 1">禁止登录</el-tag>
              <el-tag type="danger" v-else-if="row.user_state === 2">已删除</el-tag>
          </span>
        </template>
      </el-table-column>
      <!--操作列-->
      <el-table-column align="center" label="操作" width="400px" fixed="right">
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

          <el-button size="mini" @click="getAllLoginip(row)">
            登录信息
          </el-button>
          <!--删除提示-->
          <el-popover placement="top" >
            <h5 align="center">确定删除？</h5>
            <div style="text-align: center; margin: 0">
              <el-button type="danger" size="mini" @click="deleteRow(row)">确 定</el-button>
            </div>
            <el-button size="mini" slot="reference">删 除</el-button>
          </el-popover>

          <!--重置提示-->
          <el-popover placement="top" >
            <h5 align="center">确定重置密码为jidegaimima1234？</h5>
            <div style="text-align: center; margin: 0">
              <el-button type="danger" size="mini" @click="replaceRow(row)">确 定</el-button>
            </div>
            <el-button size="mini" slot="reference">重置密码</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>


    <el-dialog title="登录信息" :visible.sync="dialogVisible">
      <el-table :height="tableHeight"
                ref="loginipTable"
                border
                :data="allLoginipData"
                tooltip-effect="dark"
                style="width: auto"
                :row-style="{height:'25px',width:'auto'}"
      >
        <el-table-column align="center" prop="ip_date" label="登录时间" width="auto">
        </el-table-column>
        <el-table-column align="center" prop="ip_city" label="登录地点" width="auto">
        </el-table-column>
        <el-table-column align="center" prop="ip_ip" label="登录IP" width="auto">
        </el-table-column>
        <el-table-column align="center" prop="ip_device" label="登录设备" width="auto">
        </el-table-column>
        <el-table-column align="center" prop="ip_OS" label="操作系统" width="auto">
        </el-table-column>
      </el-table>
    </el-dialog>

    <!--分页-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="yonghuData.length">
    </el-pagination>
  </div>
</template>

<script>
  import Clipboard from 'clipboard'

  var qs = require('qs');
  export default {
    data () {
      //输入校验
      let validInsert = (rule, value, callback) => {
        if (!value) {
          callback(new Error("请输入科目名称！"));
        } else {
          callback();
        }
      };

      return {
        searchTableInfo:"",
        currentPage: 1,
        pageSize: 15,
        tableHeight: window.innerHeight * 0.85,
        yonghuData: [],
        showEdit: [], //显示编辑框
        showBtn: [],
        showSelect: [],
        allLoginipData: [],
        dialogVisible: false,
        user_stateOptions: [
          {
            value: '0',
            label: '正常'
          },
          {
            value: '1',
            label: '禁止登录'
          }
        ]
      }
    },

    mounted () {
      this.getAllYonghu();
    },

    watch: {
      //搜索
      searchTableInfo(){
        var searchTableInfo = this.searchTableInfo;
        if(searchTableInfo){
          this.yonghuData = this.yonghuData.filter(value => value.user_name.indexOf(this.searchTableInfo) !== -1)
        } else {
          this.getAllYonghu();
        }
      },
    },

    methods: {
      //取消全选
      cancelSelection() {
        this.$refs.yonghuTable.clearSelection();
      },

      //获取用户列表
      getAllYonghu() {
        var getData = this;
        this.$axios.get('users/getYonghu')
          .then((res) => {
            getData.yonghuData = res.data.result;
          })
          .catch((err) =>{
            console.log(err);
            alert('获取信息失败！');
          })
      },

      //编辑科目（行）
      //点击编辑
      handleEdit(index) {
        this.$set(this.showEdit,index,true)
        this.$set(this.showSelect,index,true)
        this.$set(this.showBtn,index,true)
      },
      //取消编辑
      handleCancle(index) {
        this.$set(this.showEdit,index,false)
        this.$set(this.showSelect,index,false)
        this.$set(this.showBtn,index,false)
      },
      //点击更新
      handleUpdate(row) {
        var params = qs.stringify({
          user_id: row.user_id,
          user_state: row.user_state
        })
        this.$axios.post('/users/updateUserState', params)
          .then(res => {
            if (res.status === 200 && res.data && res.data.code === 200) {
              this.$message({
                message: '修改成功！',
                type: 'success',
              });
              this.$router.go(0);
            } else if (res.status === 200 && res.data && res.data.code === 201) {
              this.$notify({
                title: '修改失败！',
                type: 'error'
              });
            }
          });
      },

      //删除（行）
      deleteRow(row) {
        var params = qs.stringify({
          user_id: row.user_id
        })
        this.$axios.post('/users/deleteUser', params)
          .then(res => {
            if (res.status === 200 && res.data && res.data.code === 200) {
              this.$message({
                message: '删除成功！',
                type: 'success',
              });
              this.$router.go(0);
            } else if (res.status === 200 && res.data && res.data.code === 201) {
              this.$notify({
                title: '删除失败！',
                type: 'error'
              });
            }
          });
      },

      //重置密码
      replaceRow(row) {
        var params = qs.stringify({
          user_id: row.user_id
        })
        this.$axios.post('/passReplace', params)
          .then(res => {
            if (res.status === 200 && res.data && res.data.code === 200) {
              this.$message({
                message: '重置成功！',
                type: 'success',
              });
              this.$router.go(0);
            } else if (res.status === 200 && res.data && res.data.code === 201) {
              this.$notify({
                title: '重置失败！',
                type: 'error'
              });
            }
          });
      },

      //获取登录信息
      getAllLoginip (row) {
        this.dialogVisible = true
        var getData = this;
        this.$axios.get('/loginip/getAllByUserId', {
          params: {
            user_id: row.user_id
          }
        })
          .then((res) => {
            getData.allLoginipData = res.data.result;
          })
          .catch((err) => {
            console.log(err);
            alert('获取登录信息失败！');
          })
      },

      handleSizeChange: function (size) {
        this.pagesize = size
      },
      handleCurrentChange: function (currentPage) {
        this.currentPage = currentPage
      }
    }
  }
</script>

<style scoped>

</style>
