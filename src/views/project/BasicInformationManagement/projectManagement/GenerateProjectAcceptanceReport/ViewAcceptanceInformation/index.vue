<template>
  <div id="SubmarinePipelineViewnm">
    <el-dialog title="查看" :visible.sync="ProjectManagementView" width="60%" center @open="open" @close="close" >
     <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="20px" class="demo-ruleForm" disabled>
          <div style="border: 1px solid #cccccc; margin-bottom: 50px">
            <div class="bidingDocument">
              <h1 class="yy">海底管道数字化资产完工审查申请表</h1>
            </div>
            <!-- ******************************************** -->
            <div class="layout">
              <div class="layoutLeft">
                <div class="layoutLeftwez">
                  <!-- <div>
                    <img style="width: 8px; height: 8px; margin-right: 5px" src="../../../../../../assets/menu/xh.png" alt="" />
                  </div> -->
                  <div>完整工程项目名称</div>
                </div>
              </div>
              <div class="layoutRight">
                <div class="layoutRightbj">
                  <el-form-item label="" prop="projectName">
                    <el-select v-model="ruleForm.projectName" placeholder="请选择">
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
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
                  <!-- <div>
                    <img style="width: 8px; height: 8px; margin-right: 5px" src="../../../../../../assets/menu/xh.png" alt="" />
                  </div> -->
                  <div>承包商/供应商名称</div>
                </div>
              </div>
              <div class="layoutRight">
                <div>
                  <el-form-item label="" prop="contractorName">
                    <el-input v-model="ruleForm.contractorName" style="width:350px" placeholder="请选择"></el-input>
                  </el-form-item>
                </div>
              </div>
            </div>
            <!-- ******************************************** -->
            <!-- ******************************************** -->
            <div class="layout">
              <div class="layoutLeft">
                <div class="layoutLeftwez">
                  <!-- <div>
                    <img style="width: 8px; height: 8px; margin-right: 5px" src="../../../../../../assets/menu/xh.png" alt="" />
                  </div> -->
                  <div>完工资产提交范围</div>
                </div>
              </div>
              <div class="layoutRight">
                <div>
                  <el-form-item label="" prop="submissionScope">
                    <el-input v-model="ruleForm.submissionScope" style="width:350px" placeholder="请选择"></el-input>
                  </el-form-item>
                </div>
              </div>
            </div>
            <!-- ******************************************** -->
            <!-- ******************************************** -->
            <div class="layout">
              <div class="layoutLeft">
                <div class="layoutLeftwez">
                  <!-- <div>
                    <img style="width: 8px; height: 8px; margin-right: 5px" src="../../../../../../assets/menu/xh.png" alt="" />
                  </div> -->
                  <div>承包商/供应商负责人</div>
                </div>
              </div>
              <div class="layoutRight">
                <div>
                  <el-form-item label="" prop="contractorPrincipal">
                    <el-input v-model="ruleForm.contractorPrincipal" style="width: 300px" placeholder="请选择"></el-input>
                  </el-form-item>
                </div>
              </div>
            </div>
            <!-- ******************************************** -->
            <!-- ******************************************** -->
            <div class="layout">
              <div class="layoutLeft">
                <div class="layoutLeftwez">
                  <!-- <div>
                    <img style="width: 8px; height: 8px; margin-right: 5px" src="../../../../../../assets/menu/xh.png" alt="" />
                  </div> -->
                  <div>承包商/供应商联系方式</div>
                </div>
              </div>
              <div class="layoutRight">
                <div>
                  <el-form-item label="" prop="contractorDetails">
                    <el-input v-model="ruleForm.contractorDetails" style="width: 300px" placeholder="请选择"></el-input>
                  </el-form-item>
                </div>
              </div>
            </div>
            <!-- ******************************************** -->
            <!-- ******************************************** -->
            <div class="layout">
              <div class="layoutLefts">
                <div class="layoutLeftwezs">
                  <!-- <div>
                    <img style="width: 8px; height: 8px; margin-right: 5px" src="../../../../../../assets/menu/xh.png" alt="" />
                  </div> -->
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
                  <div style="width:90%;margin:0 auto;">
                  <el-input v-model="ruleForm.projectPrincipal"  placeholder="请输入"></el-input>
                  </div>
                </div>
              </div>
              <div class="layoutRightw">
                <div class="department">EDLS部门负责人签字</div>
                <div class="departmentrig">
                   <div style="width:28%;margin-left:10px;">
                  <el-input v-model="ruleForm.edisPrincipal"  placeholder="请输入"></el-input>
                   </div>
                </div>
              </div>
            </div>
            <!-- ******************************************** -->
          </div>
          <!-- <div class="DividingLine"></div>
          <div style="margin-left:81.5%;">
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </div> -->
        </el-form>
      </div>
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
export default {
  props: ['ProjectManagementView','id'],
  data() {
    return {
     ruleForm: {
        projectName:"",
        contractorName:'',
        submissionScope:"",
        contractorPrincipal:"",
        contractorDetails:"",
        reviewConditions:"",
        projectPrincipal:"",
        edisPrincipal:"",
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
       projectAcceptanceInformationDetails(this.ruleForm.id).then(res => {
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
    watch: {
    id: {
      immediate: true,
      deep: true,
      handler(newName, oldName) {
        // console.log(newName);
        this.ruleForm.id = newName
        //  console.log(oldName)
      },
    },
  },
}
</script>
<style lang="scss">
#SubmarinePipelineViewnm {
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
    width: 150px;
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
    width: 150px;
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
    line-height:48px;
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
    line-height:48px;
    letter-spacing: 0px;
    color: #333333;
  }
  .departmentrig {
    width: 70%;
    padding-top: 10px;
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
}
</style>