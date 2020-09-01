<template>
  <div>
    <div style="text-align: left; margin: 5px">
      <el-input clearable prefix-icon="iconfont icon-sousuo" v-model="searchTableInfo" placeholder="请输入姓名关键字" style="width:240px"></el-input>
    </div>
    <!--科目信息表格-->
    <el-table :height="tableHeight"
              ref="signupTable"
              border
              :data="signupData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
              tooltip-effect="dark"
              style="width: auto"
              :row-style="{height:'25px',width:'auto'}">
      <!--多选框-->
      <el-table-column type="selection" width="auto"></el-table-column>
      <el-table-column sortable align="center" prop="user_name" label="姓名" width="auto">
        <template slot-scope="{row,$index}">
          <span>{{row.user_name}}</span>
        </template>
      </el-table-column>
      <el-table-column sortable align="center" prop="login_username" label="用户名" width="auto">
        <template slot-scope="{row,$index}">
          <span>{{row.login_username}}</span>
        </template>
      </el-table-column>
      <!--操作列-->
      <el-table-column align="center" label="操作" width="240px" fixed="right">
        <template slot-scope="{row,$index}">
          <!--通过提示-->
          <el-popover placement="top" >
            <h5 align="center">确定通过？</h5>
            <div style="text-align: center; margin: 0">
              <el-button type="danger" size="mini" @click="successRow(row)">确 定</el-button>
            </div>
            <el-button size="mini" slot="reference">通过注册</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="signupData.length">
    </el-pagination>
  </div>
</template>

<script>
  var qs = require('qs');
  export default {
    name: 'SignupManage',
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
        signupData: [],
        showBtnOrdinary: true
      }
    },

    mounted () {
      this.getAllSignupUser();
    },

    watch: {
      //搜索
      searchTableInfo(){
        var searchTableInfo = this.searchTableInfo;
        if(searchTableInfo){
          this.signupData = this.signupData.filter(value => value.user_name.indexOf(this.searchTableInfo) !== -1)
        } else {
          this.getAllSignupUser();
        }
      },
    },

    methods: {
      //取消全选
      cancelSelection () {
        this.$refs.signupTable.clearSelection();
      },


      //获取全部科目列表
      getAllSignupUser () {
        var getData = this;
        this.$axios.get('users/getSignupUser')
          .then((res) => {
            getData.signupData = res.data.result;
          })
          .catch((err) => {
            console.log(err);
            alert('获取信息失败！');
          })
      },

      //通过（行）
      successRow(row) {
        var params = qs.stringify({
          user_id: row.user_id
        })
        this.$axios.post('users/updateSignupUser', params)
          .then(res => {
            if (res.status === 200 && res.data && res.data.code === 200) {
              this.$message({
                message: '通过成功！',
                type: 'success',
              });
              this.$router.go(0);
            } else if (res.status === 200 && res.data && res.data.code === 201) {
              this.$notify({
                title: '通过失败！',
                type: 'error'
              });
            }
          });
      },

      handleSizeChange: function (size) {
        this.pagesize = size
      },
      handleCurrentChange: function (currentPage) {
        this.currentPage = currentPage
      },
    }
  }
</script>

<style scoped>

</style>
