<template>
  <div id="AcceptanceManagementPlus">
    <el-dialog title="新增" :visible.sync="ManagementNewOpenL" width="40%" center @open="open" @close="close" :before-close="gbq">
      <div style="padding: 25px">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
          <el-form-item label="项目名称" prop="projectName">
            <el-select v-model="ruleForm.projectName" placeholder="请选择" @change="projectChange($event)">
              <el-option v-for="item in projectNames" :key="item.id" :label="item.projectName" :value="item.projectName"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="阶段" prop="stage">
            <el-checkbox-group v-model="ruleForm.stage">
              <div class="CheckLayout">
                <div><el-checkbox label="前期研究" name="type"></el-checkbox></div>
                <div style="margin-left: 60px"><el-checkbox label="设计阶段" name="type"></el-checkbox></div>
              </div>
              <div class="CheckLayout">
                <div><el-checkbox label="制管阶段" name="type"></el-checkbox></div>
                <div style="margin-left: 60px"><el-checkbox label="涂敷阶段" name="type"></el-checkbox></div>
              </div>
              <div class="CheckLayout">
                <div><el-checkbox label="陆地预制阶段" name="type"></el-checkbox></div>
                <div style="margin-left: 32px"><el-checkbox label="海上施工阶段" name="type"></el-checkbox></div>
              </div>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="文件名称" prop="attachmentss">
            <el-upload
              ref="myUpload"
              class="upload-demo"
              drag
              action="http://10.72.66.27:9090/oss/upload/csp/uploadMaterial"
              :file-list="UploadedFiles"
              :before-upload="astrict"
              :on-remove="del"
              :on-success="triumph"
              :on-exceed="exceed"
              multiple
              :limit="1"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">支持pdf格式的单个文件上传</div>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <div style="width: 99.5%; border: 1px solid #cccccc"></div>
      <div style="height: 10px"></div>
      <div class="jklh">
        <el-button type="primary" @click="CreateProjectManagementAdd('ruleForm')">保存</el-button>
        <el-button @click="CloseTheNewManagementComponent">取消</el-button>
      </div>
      <div style="height: 10px"></div>
    </el-dialog>
  </div>
</template>
<script>
import {
  acceptanceReportList,
  acceptanceReportSave,
  acceptanceReportRemove,
  acceptanceReportUpdate,
  acceptanceReportDetails,
  acceptanceReportProject,
  acceptanceReportDownload,
} from '@/api/AcceptanceManagement.js'
export default {
  props: ['ManagementNewOpenL'],
  data() {
    //   var checkAgeUploadedFiles = (rule, value, callback) => {
    //     console.log()
    //   if (value.length === 0) {
    //     callback(new Error('请上传文件'));
    //   }else {
    //     callback();
    //   }
    // };
    return {
      //上传的文件
      UploadedFiles: [],
      attachments: {},
      ruleForm: {
        projectName: '',
        projectId: '',
        stage: [],
        attachmentss: [],
      },
      rules: {
        projectName: [{ required: true, message: '请输入项目名称', trigger: 'change' }],
        stage: [{ required: true, message: '请选择阶段', trigger: 'change' }],
        attachmentss: [{ required: true, message: '上传文件', trigger: 'change' }],
      },
      //下拉项目名称数组
      projectNames: [],
    }
  },
  methods: {
    /******************文件操作区域********************** */
    //上传文件前的钩子限制文件类型
    astrict(file, fileList) {
      let type1 = file.name.substring(file.name.lastIndexOf('.') + 1)
      let type = type1.trim().toLowerCase()
      // console.log(type, '***********')
      const isvideo = type === 'pdf'
      if (!isvideo) {
        this.$message.error('只支持pdf格式文件上传')
      }
      return isvideo
    },
    //文件上传成功的钩子
    triumph(response, file, fileList) {
      let obj = {
        fileSize: response.data[0].byteToStr,
        fileId: response.data[0].id,
        fileType: response.data[0].objType,
        fileUrl: response.data[0].url,
        fileName: response.data[0].originalName,
      }
      this.attachments = obj
      //  console.log( this.attachments,"*********")
      this.ruleForm.attachmentss = fileList
      //  console.log(this.ruleForm.attachmentss,"+++")
      this.$refs.ruleForm.clearValidate('attachmentss')
    },
    //删除文件的钩子
    del(file, fileList) {
      //  console.log(file)
      //  console.log(fileList)
      this.ruleForm.attachmentss = fileList
      if (fileList.length === 0) {
        this.attachments = {}
      }
    },
    //文件超出限制钩子
    exceed(files, fileList) {
      this.$message.warning(`只能上传单个文件`)
    },
    /**************************************** */
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
    //关闭前的回调
    gbq(done) {
      if (this.ruleForm.projectName != '' || this.ruleForm.stage.length != 0 || this.ruleForm.attachmentss != 0) {
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
    //点击取消
    CloseTheNewManagementComponent() {
      // console.log(this.ruleForm.projectName)
      // console.log(this.ruleForm.stage)
      // console.log(this.UploadedFiles)
      if (this.ruleForm.projectName != '' || this.ruleForm.stage.length != 0 || this.ruleForm.attachmentss.length != 0) {
        console.log(4654654654654)
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
    //关闭钩子
    close() {
      this.ruleForm.projectId = ''
      this.ruleForm.stage = []
      this.attachments = {}
      this.UploadedFiles = []
      this.ruleForm.attachmentss = []
      this.$refs.myUpload.clearFiles()
      this.ruleForm.projectName = ''
      this.$emit('ManagementAddClose', false)
      this.clearValidate('ruleForm')
    },
    //打开钩子
    open() {
      // console.log(222222222222222)
      acceptanceReportProject().then(res => {
        // console.log("dakdoak")
        // console.log(res)
        this.projectNames = res.data.data
      })
      this.clearValidate('ruleForm')
    },
    //新增确定
    CreateProjectManagementAdd(formName) {
      // console.log(this.ruleForm.stage)
      let srt = this.ruleForm.stage.toString('、')
      // console.log(srt)
      this.$refs[formName].validate(valid => {
        if (valid) {
          let obj = {
            projectName: this.ruleForm.projectName,
            stage: srt,
            attachments: this.attachments, //this.ruleForm.fileName[0],
            projectId: this.ruleForm.projectId,
          }
          acceptanceReportSave(obj).then(res => {
            // console.log(res,"上传")
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
  //   acceptanceReportProject().then(res=>{
  //     // console.log("dakdoak")
  //     // console.log(res)
  //     this.projectNames = res.data.data;
  //   })
  // },
}
</script>
<style lang="scss">
#AcceptanceManagementPlus {
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
    width: 42%;
    padding-top: 15px;
    padding-left: 10px;
    font-family: PingFang SC;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 20px;
    letter-spacing: 0px;
    color: #333333;
  }
  .signright {
    width: 57%;
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
    padding-top: 15px;
    padding-left: 10px;
    font-family: PingFang SC;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 20px;
    letter-spacing: 0px;
    color: #333333;
  }
  .departmentrig {
    width: 70%;
    padding-top: 10px;
  }
  .CheckLayout {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
  .division {
    width: 100%;
    height: 1px;
    background-color: #cccccc;
  }
  .BottomPosition {
    margin-left: 52%;
  }
  /*************************** */
  .el-form-item__content {
    margin-left: 70%;
  }
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
  .el-form-item__label {
    line-height: 45px !important;
  }
  .el-dialog--center .el-dialog__body {
    padding: 0px !important;
  }
  .jklh {
    text-align: right;
    margin-right: 20px;
  }
}
</style>