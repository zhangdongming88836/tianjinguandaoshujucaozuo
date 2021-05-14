<template>
  <div id="NewProjecanagement">
    <el-dialog title="海管查看" :visible.sync="ProjectManagementView" width="30%" center @open="open" @close="close" >
      <div style="padding:25px">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" disabled>
      <el-form-item label="海管名称" prop="pipeName">
            <el-input v-model="ruleForm.pipeName" style="width:192px;" placeholder="请选择"></el-input>
          </el-form-item>
          <el-form-item label="海管编号" prop="pipeNumber">
            <el-input v-model="ruleForm.pipeNumber" style="width:192px;" placeholder="请选择"></el-input>
          </el-form-item>
          <el-form-item label="所属公司" prop="ownedCompany">
          <el-select v-model="ruleForm.ownedCompanyName" placeholder="请选择所属公司">
          <el-option v-for="item in Companys" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
          </el-form-item>
          <el-form-item label="所属作业区" prop="ownedWorkArea">
           <el-select v-model="ruleForm.ownedWorkAreaName" placeholder="请选择所属作业区">
          <el-option v-for="item in OperationAreas" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
          </el-form-item>
          <el-form-item label="所属项目" prop="ownedProjectId">
           <el-select v-model="ruleForm.ownedProject" placeholder="请选择所属项目">
          <el-option v-for="item in ownedProjectIds" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
          </el-form-item>
        </el-form>
      </div>
       <div style="width:99.5%;border:1px solid #cccccc"></div>
        <div style="height:10px"></div>
        <div style="height:10px"></div>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="ProjectManagementView = false">取 消</el-button>
        <el-button type="primary" @click="ProjectManagementView = false">确 定</el-button>
      </span> -->
    </el-dialog>
  </div>
</template>
<script>
import { statisticalseasipeList,statisticalseasiperemove,statisticalseasipdetails,statisticalseasipsave,statisticalseasiupdate,statisticalseasiprojectAll } from '@/api/subsea'
export default {
  props: ['ProjectManagementView',"id"],
  data() {
    return {
     ruleForm: {
       //海管名称
        pipeName: '',
        //海管编号
        pipeNumber: '',
        //公司id
        ownedCompany: '',
        //所属公司名字
        ownedCompanyName: '',
        //作业区id
        ownedWorkArea: '',
        //作业区名字
        ownedWorkAreaName: '',
        //项目id
        ownedProjectId: '',
        //项目名字
        ownedProject: '',
       id:""
      },
      rules: {
        // ownedCompany: [{ required: true, message: '请输入所属公司', trigger: 'change' }],
        // ownedWorkArea: [{ required: true, message: '请输入所属作业区', trigger: 'change' }],
        // projectName: [{ required: true, message: '请输入项目名称', trigger: 'blur' }],
      },
        //所属公司下拉
      Companys: [
        {
          label: '花花',
          value: '1',
        },
      ],
      //所属作业区
      OperationAreas: [
        {
          label: '花花',
          value: '1',
        },
      ],
      
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
        statisticalseasipdetails(this.ruleForm.id).then(res=>{
          console.log(res)
          this.ruleForm = res.data.data
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
     watch:{
      id: {
      immediate: true,
      deep: true,
      handler(newName, oldName) {
        // console.log(newName);
        this.ruleForm.id = newName;
        //  console.log(oldName)
      },
    }
  }
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
       .el-dialog--center .el-dialog__body{
    padding: 0px !important;
  }
  .jklh{
    text-align: right;
    margin-right:20px;
  } 
}
</style>