<template>
  <div id="NewProjecanagements">
    <el-dialog title="新增" :visible.sync="ManagementNewOpenL" width="30%" center @open="open" @close="close" :before-close="gbq">
      <div style="padding:25px">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="海管名称" prop="pipeName">
            <el-input v-model="ruleForm.pipeName" style="width: 192px" placeholder="请输入" maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="海管编号" prop="pipeNumber">
            <el-input v-model="ruleForm.pipeNumber" style="width: 192px" placeholder="请输入" maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="所属公司" prop="ownedCompany">
            <el-select v-model="ruleForm.ownedCompany" placeholder="请选择所属公司" @change="checkTheHomework">
              <el-option v-for="item in Companys" :key="item.id" :label="item.name" :value="item.id"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属作业区" prop="ownedWorkArea">
            <el-select v-model="ruleForm.ownedWorkArea" placeholder="请选择所属作业区" @change="checkTheProject">
              <el-option v-for="item in OperationAreas" :key="item.id" :label="item.name" :value="item.id"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属项目" prop="ownedProjectId">
            <el-select v-model="ruleForm.ownedProjectId" placeholder="请选择所属项目" @change="projectChange">
              <el-option v-for="item in ownedProjectIds" :key="item.id" :label="item.projectName" :value="item.id"> </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
          <div style="width:99.5%;border:1px solid #cccccc"></div>
        <div style="height:10px"></div>
        <div class="jklh">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="CreateProjectManagementAdd('ruleForm')">确 定</el-button>
      </div>
      <div style="height:10px"></div>
    </el-dialog>
  </div>
</template>
<script>
import {
  statisticalseasipeList,
  statisticalseasiperemove,
  statisticalseasipdetails,
  statisticalseasipsave,
  statisticalseasiupdate,
  statisticalseasiprojectAll,
  statisticalseasipcompany,
  statisticalseasipworkArea,
  statisticalseasipproject,
} from '@/api/subsea'
import { calidatePassword } from '@/utils/validate'
export default {
  props: ['ManagementNewOpenL'],
  data() {
    var validatepiPeNumber = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入海管编号'))
      } else if (!calidatePassword(value)) {
        callback(new Error('格式错误'))
      } else {
        callback()
      }
    }
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
      },
      rules: {
        ownedCompany: [{ required: true, message: '请输入所属公司', trigger: 'change' }],
        ownedWorkArea: [{ required: true, message: '请输入所属作业区', trigger: 'change' }],
        ownedProjectId: [{ required: true, message: '请输入所属项目', trigger: 'change' }],
        pipeName: [{ required: true, message: '请输入海管名称', trigger: 'blur' }],
        pipeNumber: [{ required: true, validator: validatepiPeNumber, trigger: 'blur' }],
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
      //所属项目下拉
      ownedProjectIds: [
        {
          label: '花花',
          value: '1',
        },
      ],
    }
  },
  methods: {
    /********************下拉选择获取区域******************** */
    //选择所属公司值变化获取作业区数据
    checkTheHomework(val) {
          //清空作业区id
       this.ruleForm.ownedWorkArea = '',
        //清空作业区名字
         this.ruleForm.ownedWorkAreaName ='',
        //清空项目id
         this.ruleForm.ownedProjectId ='',
        //清空项目名字
         this.ruleForm.ownedProject = '',
      statisticalseasipworkArea(val).then(res => {
        this.OperationAreas = res.data.data
      })
      let obj = {}
      obj = this.Companys.find(item => {
        return item.id === val
      })
      this.ruleForm.ownedCompanyName = obj.name
    },
    //通过作业区值变化获取项目数据
    checkTheProject(val) {
       //清空项目id
         this.ruleForm.ownedProjectId ='',
        //清空项目名字
         this.ruleForm.ownedProject = '',
      statisticalseasipproject(val).then(res => {
        this.ownedProjectIds = res.data.data
      })
      let obj = {}
      obj = this.OperationAreas.find(item => {
        return item.id === val
      })
      this.ruleForm.ownedWorkAreaName = obj.name
    },
    //下拉项目变化
    projectChange(val) {
      let obj = {}
      obj = this.ownedProjectIds.find(item => {
        return item.id === val
      })
      this.ruleForm.ownedProject = obj.projectName
    },
    /************************************** */
    //取消
    cancel() {
      if (
        this.ruleForm.pipeName != '' ||
        this.ruleForm.pipeNumber != '' ||
        this.ruleForm.ownedCompany != '' ||
        this.ruleForm.projectName != '' ||
        this.ruleForm.ownedWorkArea != '' ||
        this.ruleForm.ownedWorkAreaName != '' ||
        this.ruleForm.ownedProjectId != '' ||
        this.ruleForm.ownedProject != ''
      ) {
        this.$confirm('如果关闭将无法保存已填写的内容?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            this.$emit('ManagementAddClose', false)
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消',
            })
          })
      } else {
        this.$emit('ManagementAddClose', false)
      }
    },
    //关闭前的钩子
    gbq(done) {
      if (
        this.ruleForm.pipeName != '' ||
        this.ruleForm.pipeNumber != '' ||
        this.ruleForm.ownedCompany != '' ||
        this.ruleForm.projectName != '' ||
        this.ruleForm.ownedWorkArea != '' ||
        this.ruleForm.ownedWorkAreaName != '' ||
        this.ruleForm.ownedProjectId != '' ||
        this.ruleForm.ownedProject != ''
      ) {
        this.$confirm('如果关闭将无法保存已填写的内容?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            done()
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消',
            })
          })
      } else {
        done()
      }
    },
    //关闭钩子
    close() {
      console.log(1111111111)
      this.$emit('ManagementAddClose', false)
      this.clearValidate('ruleForm')
      //海管名称
      this.ruleForm.pipeName = ''
      //海管编号
      this.ruleForm.pipeNumber = ''
      //公司id
      this.ruleForm.ownedCompany = ''
      //所属公司名字
      this.ruleForm.projectName = ''
      //作业区id
      this.ruleForm.ownedWorkArea = ''
      //作业区名字
      this.ruleForm.ownedWorkAreaName = ''
      //项目id
      this.ruleForm.ownedProjectId = ''
      //项目名字
      this.ruleForm.ownedProject = ''
         //清空所属作业区
      this.OperationAreas = []
      //清空所属项目下拉
      this.ownedProjectIds = []
    },
    //打开钩子
    async open() {
      await statisticalseasipcompany().then(res => {
        console.log(res)
        this.Companys = res.data.data
      })
      this.clearValidate('ruleForm')
    },
    //新增确定
    CreateProjectManagementAdd(formName) {
      console.log(11111111111111)
      this.$refs[formName].validate(valid => {
        if (valid) {
          statisticalseasipsave(this.ruleForm).then(res => {
            if (res.data.code == 200) {
              this.$message({
                message: `${res.data.msg}`,
                type: 'success',
              })
              this.$emit('PublicAccessLisk')
              this.$emit('ManagementAddClose', false)
            } else {
              this.$message({
                message: `${res.data.msg}`,
                type: 'warning',
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    //清空验证
    clearValidate(formName) {
      this.$refs[formName].clearValidate()
    },
  },
}
</script>
<style lang="scss">
#NewProjecanagements {
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