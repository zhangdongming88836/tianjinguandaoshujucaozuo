<template>
  <div id="NewAcceptanceInformation">
    <el-dialog title="新增" :visible.sync="ManagementNewOpenL" width="60%" center @open="open" @close="close" :before-close="gbq">
      <div style="padding: 25px">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="20px" class="demo-ruleForm">
          <div style="border: 1px solid #cccccc; margin-bottom: 50px">
            <div class="bidingDocument">
              <h1 class="yy">海底管道数字化资产完工审查申请表</h1>
            </div>
            <!-- ******************************************** -->
            <div class="layout">
              <div class="layoutLeft">
                <div class="layoutLeftwez">
                  <div>
                    <img style="width: 8px; height: 8px; margin-right: 5px" src="../../../../../../assets/menu/xh.png" alt="" />
                  </div>
                  <div>完工工程项目名称</div>
                </div>
              </div>
              <div class="layoutRight">
                <div class="layoutRightbj">
                  <el-form-item label="" prop="projectName">
                    <el-select v-model="ruleForm.projectName" placeholder="请选择" @change="projectChange($event)">
                      <el-option v-for="item in projectNames" :key="item.id" :label="item.projectName" :value="item.projectName"> </el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>
            </div>
            <!-- ******************************************** -->
            <!-- ******************************************** -->
            <div class="layout">
              <div class="layoutLeft">
                <div class="layoutLeftwez">
                  <div>
                    <img style="width: 8px; height: 8px; margin-right: 5px" src="../../../../../../assets/menu/xh.png" alt="" />
                  </div>
                  <div>承包商/供应商名称</div>
                </div>
              </div>
              <div class="layoutRight">
                <div class="layoutRightbjn">
                  <el-form-item label="" prop="contractorName">
                    <el-input v-model="ruleForm.contractorName" style="width: 350px" placeholder="请输入" maxlength="20"></el-input>
                  </el-form-item>
                </div>
              </div>
            </div>
            <!-- ******************************************** -->
            <!-- ******************************************** -->
            <div class="layout">
              <div class="layoutLeft">
                <div class="layoutLeftwez">
                  <div>
                    <img style="width: 8px; height: 8px; margin-right: 5px" src="../../../../../../assets/menu/xh.png" alt="" />
                  </div>
                  <div>完工资产提交范围</div>
                </div>
              </div>
              <div class="layoutRight">
                <div class="layoutRightbjn">
                  <el-form-item label="" prop="submissionScope">
                    <el-input v-model="ruleForm.submissionScope" style="width: 350px" placeholder="请输入" maxlength="20"></el-input>
                  </el-form-item>
                </div>
              </div>
            </div>
            <!-- ******************************************** -->
            <!-- ******************************************** -->
            <div class="layout">
              <div class="layoutLeft">
                <div class="layoutLeftwez">
                  <div>
                    <img style="width: 8px; height: 8px; margin-right: 5px" src="../../../../../../assets/menu/xh.png" alt="" />
                  </div>
                  <div>承包商/供应商负责人</div>
                </div>
              </div>
              <div class="layoutRight">
                <div class="layoutRightbjn">
                  <el-form-item label="" prop="contractorPrincipal">
                    <el-input v-model="ruleForm.contractorPrincipal" style="width: 300px" placeholder="请输入" maxlength="20"></el-input>
                  </el-form-item>
                </div>
              </div>
            </div>
            <!-- ******************************************** -->
            <!-- ******************************************** -->
            <div class="layout">
              <div class="layoutLeft">
                <div class="layoutLeftwez">
                  <div>
                    <img style="width: 8px; height: 8px; margin-right: 5px" src="../../../../../../assets/menu/xh.png" alt="" />
                  </div>
                  <div>承包商/供应商联系方式</div>
                </div>
              </div>
              <div class="layoutRight">
                <div class="layoutRightbjns">
                  <el-form-item label="" prop="contractorDetails">
                    <el-input v-model="ruleForm.contractorDetails" style="width: 300px" placeholder="请输入" maxlength="11"></el-input>
                  </el-form-item>
                </div>
              </div>
            </div>
            <!-- ******************************************** -->
            <!-- ******************************************** -->
            <div class="layout">
              <div class="layoutLefts">
                <div class="layoutLeftwezs">
                  <div>
                    <img style="width: 8px; height: 8px; margin-right: 5px" src="../../../../../../assets/menu/xh.png" alt="" />
                  </div>
                  <div>具备完工审查条件</div>
                </div>
              </div>
              <div class="layoutRights">
                <div style="margin-top: 25px">
                  <el-form-item label="" prop="reviewConditions">
                    <el-input
                      resize="none"
                      class="TextField"
                      type="textarea"
                      placeholder="请输入内容"
                      v-model="ruleForm.reviewConditions"
                      :autosize="{ minRows: 4, maxRows: 4 }"
                    >
                    </el-input>
                  </el-form-item>
                </div>
              </div>
            </div>
            <!-- ******************************************** -->
            <!-- ******************************************** -->
            <div class="layout">
              <div class="layoutLeftm">
                <div class="sign">海管项目负责人签字</div>
                <div class="signright">
                  <div style="width: 90%; margin: 0 auto">
                    <el-input v-model="ruleForm.projectPrincipal" placeholder="请输入" maxlength="5"></el-input>
                  </div>
                </div>
              </div>
              <div class="layoutRightw">
                <div class="department">EDLS部门负责人签字</div>
                <div class="departmentrig">
                  <div style="width: 28%; margin-left: 10px">
                    <el-input v-model="ruleForm.edisPrincipal" placeholder="请输入" maxlength="5"></el-input>
                  </div>
                </div>
              </div>
            </div>
            <!-- ******************************************** -->
          </div>
        </el-form>
      </div>
      <div style="width: 99.5%; border: 1px solid #cccccc"></div>
      <div style="height: 10px"></div>
      <div class="jklh">
        <el-button type="primary" @click="CreateProjectManagementAdd('ruleForm')">确定</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
      <div style="height: 10px"></div>
    </el-dialog>
  </div>
</template>
<script>
import {
  projectAcceptanceInformationzjProject,
  projectAcceptanceInformationList,
  projectAcceptanceInformationSave,
  projectAcceptanceInformationRemove,
  projectAcceptanceInformationUpdate,
  projectAcceptanceInformationDetails,
} from '@/api/GenerateReport.js'
//正则
import { SeatHand } from '../../../../../../utils/validate.js'
export default {
  props: ['ManagementNewOpenL'],
  data() {
    var validatorDatails = (rule, value, callback) => {
      // //验证里的过滤方法先把用户名过滤
      // this.ruleForm.personName = stripscript(value)
      // value = this.ruleForm.personName
      if (value === '') {
        callback(new Error('请输入联系方式'))
      } else if (!SeatHand(value)) {
        callback(new Error('格式错误'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        projectName: '',
        projectId: '',
        contractorName: '',
        submissionScope: '',
        contractorPrincipal: '',
        contractorDetails: '',
        reviewConditions: '',
        projectPrincipal: '',
        edisPrincipal: '',
      },
      rules: {
        projectName: [{ required: true, message: '请输入完工项目名称', trigger: 'change' }],
        contractorName: [{ required: true, message: '请输入承包商/供应商名称', trigger: 'blur' }],
        submissionScope: [{ required: true, message: '请输入完工资产提交范围', trigger: 'blur' }],
        contractorPrincipal: [{ required: true, message: '请输入承包商/供应商负责人', trigger: 'blur' }],
        contractorDetails: [{ required: true, validator: validatorDatails, trigger: 'blur' }],
        reviewConditions: [{ required: true, message: '请输入具备完工审查条件', trigger: 'blur' }],
      },
      //完成工程名字下拉数字
      projectNames: [],
    }
  },
  methods: {
    //项目名称改变
    projectChange(val) {
      let obj = {}
      obj = this.projectNames.find(item => {
        //这里的userList就是上面遍历的数据源
        return item.projectName === val //筛选出匹配数据
      })
      // console.log(obj);//获取的 name
      // console.log(this.ruleForm.projectName)
      this.ruleForm.projectId = obj.id
    },
    //取消
    cancel() {
      if (
        this.ruleForm.projectName != '' ||
        this.ruleForm.projectId != '' ||
        this.ruleForm.contractorName != '' ||
        this.ruleForm.submissionScope != '' ||
        this.ruleForm.contractorPrincipal != '' ||
        this.ruleForm.contractorDetails != '' ||
        this.ruleForm.reviewConditions != '' ||
        this.ruleForm.projectPrincipal != '' ||
        this.ruleForm.edisPrincipal != ''
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
    //关闭前的回调
    gbq(done) {
      if (
        this.ruleForm.projectName != '' ||
        this.ruleForm.projectId != '' ||
        this.ruleForm.contractorName != '' ||
        this.ruleForm.submissionScope != '' ||
        this.ruleForm.contractorPrincipal != '' ||
        this.ruleForm.contractorDetails != '' ||
        this.ruleForm.reviewConditions != '' ||
        this.ruleForm.projectPrincipal != '' ||
        this.ruleForm.edisPrincipal != ''
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
      // console.log(1111111111)
      this.$emit('ManagementAddClose', false)
      this.clearValidate('ruleForm')

      this.ruleForm.projectName = ''
      this.ruleForm.projectId = ''
      this.ruleForm.contractorName = ''
      this.ruleForm.submissionScope = ''
      this.ruleForm.contractorPrincipal = ''
      this.ruleForm.contractorDetails = ''
      this.ruleForm.reviewConditions = ''
      this.ruleForm.projectPrincipal = ''
      this.ruleForm.edisPrincipal = ''
    },
    //打开钩子
    open() {
      projectAcceptanceInformationzjProject().then(res => {
        // console.log(res,"**************")
        this.projectNames = res.data.data
      })
      this.clearValidate('ruleForm')
      // projectAcceptanceInformationzjProject().then(res => {
      //   console.log(res)
      //   this.projectNames = res.data.data
      // })
    },
    //新增确定
    CreateProjectManagementAdd(formName) {
      console.log(11111111111111)
      this.$refs[formName].validate(valid => {
        if (valid) {
          projectAcceptanceInformationSave(this.ruleForm).then(res => {
            console.log(res)
            if (res.data.code == 200) {
              this.$message({
                message: `${res.data.msg}`,
                type: 'success',
              })
              this.$emit('ManagementAddClose', false)
              this.$emit('PublicAccessLisk')
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
  // created(){
  //   projectAcceptanceInformationzjProject().then(res => {
  //       // console.log(res,"**************")
  //       this.projectNames = res.data.data
  //     })
  // }
}
</script>
<style lang="scss">
#NewAcceptanceInformation {
  .bidingDocument {
    width: 100%;
    height: 50px;
    text-align: center;
    line-height: 50px;
    margin-top: -10px;
    background-color: #eaf2fb;
  }
  .yy {
    font-family: PingFang SC;
    font-size: 16px;
    font-weight: 600;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #333333;
  }
  .layout {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
  .DividingLine {
    width: 100%;
    height: 1px;
    background-color: #cccccc;
  }
  .layoutLeft {
    width: 36%;
    height: 48px;
    border-bottom: 1px solid #cccccc;
  }
  .layoutLefts {
    width: 36%;
    height: 130px;
    border-bottom: 1px solid #cccccc;
  }
  .layoutRight {
    width: 64%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    height: 48px;
    border-bottom: 1px solid #cccccc;
    border-left: 1px solid #cccccc;
  }
  .layoutRights {
    width: 64%;
    height: 130px;
    border-bottom: 1px solid #cccccc;
    border-left: 1px solid #cccccc;
  }
  .layoutLeftwez {
    width: 160px;
    height: 20px;
    margin: 15px auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    font-family: PingFang SC;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 20px;
    letter-spacing: 0px;
    color: #333333;
  }
  .layoutLeftwezs {
    width: 125px;
    height: 20px;
    margin: 56px auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    font-family: PingFang SC;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 20px;
    letter-spacing: 0px;
    color: #333333;
  }
  .TextField {
    width: 96%;
    overflow-y: hidden;
    //  overflow-y:scroll;
  }
  .layoutLeftm {
    width: 36%;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .sign {
    width: 60%;
    text-align: center;
    font-family: PingFang SC;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 48px;
    letter-spacing: 0px;
    color: #333333;
  }
  .signright {
    width: 40%;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 5px;
    border-left: 1px solid #cccccc;
  }
  .layoutRightw {
    width: 64%;
    border-left: 1px solid #cccccc;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .department {
    width: 30%;
    text-align: center;
    font-family: PingFang SC;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 48px;
    letter-spacing: 0px;
    color: #333333;
  }
  .departmentrig {
    width: 70%;
    padding-top: 10px;
  }
  .BottomLayout {
    width: 150px;
    margin-left: 80%;
  }
  .layoutRightbj {
    margin-left: 10px;
  }
  .layoutRightbjn {
    margin-left: 10px;
  }
  .layoutRightbjns {
    margin-left: 10px;
  }
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
  .el-form-item__content {
    line-height: 45px !important;
  }
  .el-select {
    width: 300px;
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