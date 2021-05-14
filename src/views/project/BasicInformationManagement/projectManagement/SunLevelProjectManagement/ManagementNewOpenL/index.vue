<template>
  <div id="NewProjecanagement">
    <el-dialog title="新增" :visible.sync="ManagementNewOpenL" width="30%" center @open="open" @close="close" :before-close="gbq">
      <div style="padding:25px">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
          <el-form-item label="项目名称" prop="projectName">
            <el-input v-model="ruleForm.projectName" style="width:192px;" maxlength="20" placeholder="请输入项目名称"></el-input>
          </el-form-item>
          <el-form-item label="所属公司" prop="ownedCompany">
          <el-select v-model="ruleForm.ownedCompany" placeholder="请选择所属公司" @change="checkTheHomework">
          <el-option v-for="item in Companys" :key="item.id" :label="item.name" :value="item.id"> </el-option>
        </el-select>
          </el-form-item>
          <el-form-item label="所属作业区" prop="ownedWorkArea">
           <el-select v-model="ruleForm.ownedWorkArea" placeholder="请选择所属作业区"  @change="checkTheProject">
          <el-option v-for="item in OperationAreas" :key="item.id" :label="item.name" :value="item.id"> </el-option>
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
import { projectInformationList,projectInformationcompany,projectInformationworkArea,projectInformationproject,projectInformationsave,projectInformasaveAfter } from '@/api/PM'
export default {
  props: ['ManagementNewOpenL'],
  data() {
    return {
      ruleForm: {
        projectName: '',
         //所属公司选中id
       ownedCompany: '',
       //所属公司选中名字
       ownedCompanyName:"",
       //所属作业区选中id
       ownedWorkArea: '',
        //所属作业区选中名字
       ownedWorkAreaName:""
      },
      rules: {
        ownedCompany: [{ required: true, message: '请输入所属公司', trigger: 'change' }],
        ownedWorkArea: [{ required: true, message: '请输入所属作业区', trigger: 'change' }],
        projectName: [{ required: true, message: '请输入项目名称', trigger: 'blur' }],
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
    /********************下拉获取区域************************ */
      //通过公司id查询作业区
    checkTheHomework(val){
        //清空所属作业区
       this.ruleForm.ownedWorkArea=''
        //清空所属作业区选中名字
       this.ruleForm.ownedWorkAreaName=""
      projectInformationworkArea(val).then( res=>{
        // console.log(res,"////////")
        this.OperationAreas = res.data.data;
      })
       let obj = {}
      obj = this.Companys.find(item => {
        //这里的userList就是上面遍历的数据源
        return item.id === val //筛选出匹配数据
      })
      // console.log(obj);//获取的 name
      // console.log(this.ruleForm.projectName)
      this.ruleForm.ownedCompanyName = obj.name
    },
    //获取作业区的id
    checkTheProject(val){
       let obj = {}
      obj = this.OperationAreas.find(item => {
        //这里的userList就是上面遍历的数据源
        return item.id === val //筛选出匹配数据
      })
      // console.log(obj);//获取的 name
      // console.log(this.ruleForm.projectName)
      this.ruleForm.ownedWorkAreaName = obj.name
    },
    /****************************************** */
        //取消
    cancel(){
         if(this.ruleForm.projectName != "" || this.ruleForm.ownedCompany != "" || this.ruleForm.ownedWorkArea!= ''){
         this.$confirm('如果关闭将无法保存已填写的内容?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$emit('ManagementAddClose', false)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消',
          })
        })
     }else{
       this.$emit('ManagementAddClose', false)
     }
    },
     //关闭前的回调
    gbq(done){
     if(this.ruleForm.projectName != "" || this.ruleForm.ownedCompany != "" || this.ruleForm.ownedWorkArea!= ''){
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
     }else{
       done()
     }
       
    },
    //关闭钩子
    close() {
        console.log(1111111111)
      this.$emit('ManagementAddClose', false)
      this.clearValidate('ruleForm')
        this.ruleForm.projectName= ''
        this.ruleForm.ownedCompany= ''
        this.ruleForm.ownedWorkArea= '' 
        this.Companys = []
        this.OperationAreas = []
    },
    //打开钩子
    open() {
       projectInformationcompany().then(res=>{
      // console.log(res,"*********")
      this.Companys = res.data.data;
    });
    this.clearValidate('ruleForm')
    },
    //新增确定
  CreateProjectManagementAdd(formName) {
      // console.log(11111111111111)
    this.$refs[formName].validate(valid => {
      if (valid) {
              const loading = this.$loading({
          lock: true,
          text: '加载中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        projectInformationsave(this.ruleForm).then(res=>{
          if(res.data.code == 200){
            projectInformasaveAfter(res.data.data).then(res =>{
              
            })
              loading.close();
            this.$message({
          message: `${res.data.msg}`,
          type: 'success'
        });
        this.$emit("PublicAccessLisk")
        this.$emit('ManagementAddClose', false)
          }else{
            loading.close();
             this.$message({
          message: `${res.data.msg}`,
          type: 'warning'
        });
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
      this.$refs[formName].clearValidate();
    }, 
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
   .el-dialog--center .el-dialog__body{
    padding: 0px !important;
  }
  .jklh{
    text-align: right;
    margin-right:20px;
  } 
}
</style>