<template>
  <div>
    <div style="text-align: left; margin: 5px">
      <el-input clearable prefix-icon="el-icon-search" v-model="searchTableInfo" placeholder="请输录题编号入关键词" style="width:240px"></el-input>
    </div>
    <!--    教师信息表格-->
    <el-table ref="lutiTable"
              class="lutiTable"
              :height="tableHeight"
              border
              :data="MyLuruDataList.slice((currentPage-1)*pageSize, currentPage * pageSize)"
              tooltip-effect="dark"
              :row-style="{height:'25px',width:'auto'}"
              style="width: auto"
    >
      <!--多选框-->
      <el-table-column type="selection" width="auto"></el-table-column>
      <el-table-column align="center" prop="luti_code" label="录题编号" width="auto">
      </el-table-column>
      <el-table-column align="center" prop="xuexiao_mingcheng" label="学校名称" width="auto">
      </el-table-column>
      <el-table-column align="center" prop="kemu_mingcheng" label="科目名称" width="auto">
      </el-table-column>
      <el-table-column align="center" prop="luti_shuoming" label="录题说明" width="auto">
      </el-table-column>
      <el-table-column align="center" prop="luti_jiezhishijian" label="截止时间" width="auto">
      </el-table-column>
      <el-table-column align="center" prop="lutistate_lurubeizhu" label="录入备注" width="auto">
      </el-table-column>
      <el-table-column align="center" prop="lutistate_lurustate" label="录入状态" width="auto">
        <template slot-scope="{row,$index}">
          <el-tag type="warning" v-if="row.lutistate_lurustate === 0">进行中</el-tag>
          <el-tag v-else-if="row.lutistate_lurustate === 1">已完成</el-tag>
        </template>
      </el-table-column>
<!--      <el-table-column align="center" prop="lutistate_shenhestate" label="审核状态" width="auto">-->
<!--        <template slot-scope="{row,$index}">-->
<!--          <span>-->
<!--            <el-tag type="info" v-if="row.lutistate_shenhestate === 0">未开始</el-tag>-->
<!--            <el-tag type="warning" v-else-if="row.lutistate_shenhestate === 1">进行中</el-tag>-->
<!--            <el-tag v-else-if="row.lutistate_shenhestate === 2">已完成</el-tag>-->
<!--          </span>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column align="center" prop="lutistate_state" label="总状态" width="auto">
        <template slot-scope="{row,$index}">
          <el-tag type="warning" v-if="row.lutistate_state === 0">录入中</el-tag>
          <el-tag type="warning" v-else-if="row.lutistate_state === 1">审核中</el-tag>
          <el-tag v-else-if="row.lutistate_state === 2">已完成</el-tag>
          <el-tag type="danger" v-else-if="row.lutistate_state === 3">已删除</el-tag>
        </template>
      </el-table-column>
      <!--操作列-->
      <el-table-column align="center" label="操作" width="240px" fixed="right">
        <template slot-scope="{row,$index}">
          <!--完成提示-->
          <el-popover placement="top" >
            <h5 align="center">确定完成？不可逆向操作！</h5>
            <div style="text-align: center; margin: 0">
              <el-button type="danger" size="mini" @click="successRow(row)">确 定</el-button>
            </div>
            <el-button size="mini" slot="reference">录入完成</el-button>
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
      :total="MyLuruDataList.length">
    </el-pagination>
  </div>
</template>

<script>
  var qs = require('qs');
  export default {
    name: 'MyLuruTask',
    data() {
      return {
        tableHeight: window.innerHeight * 0.85,
        MyLuruDataList: [],
        searchTableInfo:"",
        currentPage: 1,
        pageSize: 15,
      }
    },

    watch: {
      //搜索
      searchTableInfo(){
        var searchTableInfo = this.searchTableInfo;
        if(searchTableInfo){
          this.MyLuruDataList = this.MyLuruDataList.filter(value => value.luti_code.indexOf(this.searchTableInfo) !== -1)
        } else {
          this.getAllLutiByLururenId()
        }
      },
    },

    mounted () {
      this.getAllLutiByLururenId()
    },

    methods: {
      //获取全部录题信息
      getAllLutiByLururenId() {
        var getData = this;
        this.$axios.get('/luti/getAllLutiByLururenId', {
          params:{
            lutistate_lururenid: sessionStorage.getItem("user_id")
          }
        })
          .then((res) => {
            getData.MyLuruDataList = res.data.result;
          })
          .catch((err) =>{
            console.log(err);
            alert('获取考试信息失败！');
          })

      },

      //完成（行）
      successRow(row) {
        var params = qs.stringify({
          luti_id: row.luti_id,
          lutistate_lururenid: sessionStorage.getItem("user_id")
        })
        console.log(row.luti_id)
        this.$axios.post('luti/accLuruTask', params)
          .then(res => {
            if (res.status === 200 && res.data && res.data.code === 200) {
              this.$message({
                message: '操作成功！',
                type: 'success',
              });
              this.$router.go(0);
            } else if (res.status === 200 && res.data && res.data.code === 201) {
              this.$notify({
                title: '操作失败！',
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
