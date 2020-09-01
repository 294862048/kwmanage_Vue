<template>
  <div>
    <el-steps :active="active" simple finish-status="success">
      <el-step title="基本信息" icon="el-icon-s-flag"></el-step>
      <el-step title="选择录入人" icon="el-icon-s-order"></el-step>
      <el-step title="选择审核人" icon="el-icon-s-claim"></el-step>
    </el-steps>
<!--    基本信息录入-->
    <div class="basicInfo" v-if="active === 0">
      <el-form ref="insertLutiFormRef" :rules="insertRules" :model="insertLutiForm" label-width="80px">
        <el-form-item label="录题编号" prop="luti_code">
          <el-input :clearable="true"
                    type="text"
                    v-model="insertLutiForm.luti_code"
                    auto-complete="off"
                    placeholder="请输入录题编号">
          </el-input>
        </el-form-item>

        <el-form-item label="学校" style="width: 100%" prop="xuexiao_mingcheng">
          <el-select style="width: 100%"
                     v-model="insertLutiForm.xuexiao_mingcheng"
                     filterable
                     placeholder="请选择学校(可以搜索)">
            <el-option v-for="item in xuexiaoOptions"
                       :key="item.xuexiao_id"
                       :label="item.xuexiao_mingcheng"
                       :value="item.xuexiao_id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="科目" style="width: 100%" prop="kemu_mingcheng">
          <el-select style="width: 100%"
                     v-model="insertLutiForm.kemu_mingcheng"
                     filterable
                     placeholder="请选择科目(可以搜索)">
            <el-option v-for="item in kemuOptions"
                       :key="item.kemu_id"
                       :label="item.kemu_mingcheng"
                       :value="item.kemu_id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="录题说明" style="width: 100%" prop="luti_shuoming">
          <el-input :rows="7" type="textarea" v-model="insertLutiForm.luti_shuoming">
          </el-input>
        </el-form-item>

        <el-form-item label="截止时间" style="width: 100%" prop="luti_jiezhishijian">
          <el-input type="textarea" v-model="insertLutiForm.luti_jiezhishijian" placeholder="请输入截止时间">
          </el-input>
        </el-form-item>

        <el-form-item label="录入备注" style="width: 100%" prop="luti_lurubeizhu">
          <el-input type="textarea" v-model="insertLutiForm.luti_lurubeizhu" placeholder="请输入给录入人备注">
          </el-input>
        </el-form-item>

        <el-form-item label="审核备注" style="width: 100%" prop="luti_shenhebeizhu">
          <el-input type="textarea" v-model="insertLutiForm.luti_shenhebeizhu" placeholder="请输入给审核人备注">
          </el-input>
        </el-form-item>
      </el-form>
    </div>

<!--    录入人-->
    <div class="lururen" v-if="active === 1">
      <div style="text-align:left" class="headtext">
        <p style="font-size: 25px">&nbsp;</p> &nbsp;&nbsp;&nbsp;
      </div>
      <el-row>
        <el-col :span="6"><div class="grid-content bg-purple">&nbsp;</div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple-light">
          <el-transfer v-model="lururen"
                       :props="{key: 'user_id', label: 'user_name'}"
                       :data="lururenList"
                       :titles="['待选人员', '已选人员']"
                       @change="handleChange"
                       style="text-align: left"
          >
          </el-transfer>
        </div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">&nbsp;</div></el-col>
      </el-row>
      <div style="text-align:left" class="headtext">
        <p style="font-size: 25px">&nbsp;</p> &nbsp;&nbsp;&nbsp;
      </div>
    </div>

<!--    审核人-->
    <div class="shenheren" v-if="active === 2">
      <div style="text-align:left" class="headtext">
        <p style="font-size: 25px">&nbsp;</p> &nbsp;&nbsp;&nbsp;
      </div>
      <el-row>
        <el-col :span="6"><div class="grid-content bg-purple">&nbsp;</div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple-light">
          <el-transfer v-model="shenheren"
                       :props="{key: 'user_id', label: 'user_name'}"
                       :data="shenherenList"
                       :titles="['待选人员', '已选人员']"
                       @change="handleChange"
                       style="text-align: left"
          >
          </el-transfer>
        </div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">&nbsp;</div></el-col>
      </el-row>
      <div style="text-align:left" class="headtext">
        <p style="font-size: 25px">&nbsp;</p> &nbsp;&nbsp;&nbsp;
      </div>
    </div>

    <div class="btn">
      <el-button style="margin-top: 12px" @click="prev" v-if="active === 1 || active === 2">上一步</el-button>
      <el-button style="margin-top: 12px" @click="next" v-if="active === 0 || active === 1">下一步</el-button>
      <el-button style="margin-top: 12px" @click="addLuti" v-if="active === 2">提交</el-button>
    </div>
  </div>
</template>

<script>
  var qs = require('qs');
  export default {
    name: 'CreateTask',
    data () {
      let validInsertLuti_code = (rule, value, callback) => {
        if (!value) {
          callback(new Error("请输入录题编号！"));
        } else {
          callback();
        }
      };

      let validInsertXuexiao_mingcheng = (rule, value, callback) => {
        if (!value) {
          callback(new Error("请选择学校名称！"));
        } else {
          callback();
        }
      };

      let validInsertKemu_mingcheng = (rule, value, callback) => {
        if (!value) {
          callback(new Error("请选择科目名称！"));
        } else {
          callback();
        }
      };

      return {
        type: 1,
        active: 0,
        xuexiaoOptions: [],//学校选项
        kemuOptions: [],//科目选项
        lururenList: [],//录题人list
        lururen: [],
        shenherenList: [],//审核人list
        shenheren: [],
        insertLutiForm: {
          luti_code: '',
          xuexiao_mingcheng: '',
          kemu_mingcheng: '',
          luti_shuoming: '题库：\n' + '知识大纲：\n' + '知识点：\n' + '出题人：\n' + '难度：',
          luti_jiezhishijian: '',
          luti_lurubeizhu: '',
          luti_shenhebeizhu: '',
        },
        //输入规则
        insertRules: {
          luti_code: [
            { required: true, validator: validInsertLuti_code , trigger: "blur" }
          ],
          xuexiao_mingcheng: [
            { required: true, validator: validInsertXuexiao_mingcheng , trigger: "blur"}
          ],
          kemu_mingcheng: [
            { required: true, validator: validInsertKemu_mingcheng ,  trigger: "blur"}
          ],
          luti_shuoming: [
            { required: false,  trigger: "blur" }
          ],
          luti_jiezhishijian: [
            { required: false,  trigger: "blur" }
          ],
          luti_lurubeizhu: [
            { required: false,  trigger: "blur" }
          ],
          luti_shenhebeizhu: [
            { required: false,  trigger: "blur" }
          ]
        },
      };
    },

    mounted () {
      this.getAllKemu_mingcheng();
      this.getAllXuexiao_mingcheng();
      this.getLururen();
      this.getShenheren();
    },

    methods: {
      //步骤条
      prev () {
        --this.type;
        --this.active;
        if (this.active < 0) this.active = 0;
      },
      next () {
        if (this.type === 1) {
          this.$refs.insertLutiFormRef.validate((valid) => {
            if (valid) {
              this.type++
              if (this.active++ > 2) this.active = 0;
            }
          });
        } else {
          this.type++
          if (this.active++ > 2) this.active = 0;
          console.log(this.lururen)
        }
      },

      //获取新增时的学校选项
      getAllXuexiao_mingcheng () {
        var getData = this;
        this.$axios.get('manage/xuexiao/getAll')
          .then((res) => {
            getData.xuexiaoOptions = res.data.result;
          })
          .catch((err) => {
            console.log(err);
            alert('获取学校选项失败！');
          })
      },

      //获取新增时的科目选项
      getAllKemu_mingcheng () {
        var getData = this;
        this.$axios.get('manage/kemu/getAll')
          .then((res) => {
            getData.kemuOptions = res.data.result;
          })
          .catch((err) => {
            console.log(err);
            alert('获取科目选项失败！');
          })
      },

      //获取录入人
      getLururen () {
        var getData = this;
        this.$axios.get('luti/getIdAndName')
          .then((res) => {
            getData.lururenList = res.data.result;
          })
          .catch((err) => {
            console.log(err);
            alert('获取录题人失败！');
          })
      },

      getShenheren () {
        var getData = this;
        this.$axios.get('luti/getIdAndName')
          .then((res) => {
            getData.shenherenList = res.data.result;
          })
          .catch((err) => {
            console.log(err);
            alert('获取录题人失败！');
          })
      },

      handleChange (value, direction, movedKeys) {
        //可以通过direction回调right/left 来进行操作，right：把数字移到右边，left把数据移到左边
        if (direction === "right") {

        }
        if (direction === "left") {

        }
      },

      //提交
      addLuti () {
        console.log(this.shenheren)
        var params = qs.stringify({
          luti_code: this.insertLutiForm.luti_code,
          xuexiao_id: this.insertLutiForm.xuexiao_mingcheng,
          kemu_id: this.insertLutiForm.kemu_mingcheng,
          luti_shuoming: this.insertLutiForm.luti_shuoming,
          luti_jiezhishijian: this.insertLutiForm.luti_jiezhishijian,
          luti_lurubeizhu: this.insertLutiForm.luti_lurubeizhu,
          luti_shenhebeizhu: this.insertLutiForm.luti_shenhebeizhu,
          lururens: JSON.stringify(this.lururen),
          shenherens: JSON.stringify(this.shenheren)
        })
        this.$axios.post('/luti/addluti', params)
          .then(res => {
            if (res.status === 200 && res.data && res.data.code === (2001||2002) ) {
              this.$router.go(0);
              this.$message({
                title: '录题添加成功！',
                type: 'success'
              });
            } else if (res.status === 200 && res.data && res.data.code === 201) {
              this.$message({
                title: '添加失败！',
                type: 'error'
              });
            }
          });
      }
    }
  }
</script>

<style scoped>
  .el-transfer-panel{
    width: 500px;
    height: 600px;
  }
</style>
