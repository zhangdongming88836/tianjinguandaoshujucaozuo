<template>
  <div id="NewProjecanagement">
    <el-dialog title="查看" :visible.sync="ProjectManagementView" width="30%" center @open="open" @close="close" >
      <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" disabled>
           <el-form-item label="平台名称" prop="platformName">
            <el-input v-model="ruleForm.platformName" style="width:192px;" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="网址链接" prop="link">
            <el-input v-model="ruleForm.link" style="width:192px;" placeholder="请输入"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="ProjectManagementView = false">取 消</el-button>
        <el-button type="primary" @click="ProjectManagementView = false">确 定</el-button>
      </span> -->
    </el-dialog>
  </div>
</template>
<script>
import {hotSpotList,hotSpotremove,hotSpotupdate,hotSpotdetails} from "@/api/hotspot.js"
export default {
  props: ['ProjectManagementView','id'],
  data() {
    return {
     ruleForm: {
       //网址链接
       link:"",
       //平台名称
       platformName:"",
       id:""
      },
      // rules: {
      //   platformName: [{ required: true, message: '请输入平台名称', trigger: 'blur' }],
      //   link: [{ required: true, message: '请输入网址链接', trigger: 'blur' }],
      // },   
    }
  },
  methods: {
    //关闭钩子
    close() {
        console.log(1111111111)
      this.$emit('ProjectManagementViewClose', false)
      this.clearValidate('ruleForm')
    },
    //打开钩子
    open() {
             hotSpotdetails(this.ruleForm.id).then( res => {
      console.log(res)
      this.ruleForm = res.data.data;
    })
    },
    //新增确定
  CreateProjectManagementAdd(formName) {
      console.log(11111111111111)
    this.$refs[formName].validate(valid => {
      if (valid) {
        alert('submit!')
      } else {
        console.log('error submit!!')
        return false
      }
    })
  },
  //清空验证
    clearValidate(formName) {
      this.$refs[formName].clearValidate();
    }, 
  },
    watch: {
    id: {
      immediate: true,
      deep: true,
      handler(newName, oldName) {
        // console.log(newName);
        this.ruleForm.id = newName;
        //  console.log(oldName)
      },
    }
  },
}
</script>
<style lang="scss">
#NewProjecanagement {
  /*************************** */

  .el-transfer-panel {
    width: 220px !important;
    height: 435px !important;
  }
  .el-transfer-panel__list.is-filterable {
    height: 200px;
  }
  .el-dialog__header {
    background-color: #0075cb;
  }
  .el-dialog__title {
    margin-left: -95% !important;
    width: 32px;
    height: 22px;
    font-family: PingFang SC;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 22px;
    letter-spacing: 0px;
    color: #ffffff;
  }
  .el-icon-close:before {
    color: #e4e4e4;
  }
}
</style>