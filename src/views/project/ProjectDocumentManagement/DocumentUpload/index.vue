<template>
  <div id="upload">
    <el-dialog title="文档上传" :visible.sync="UploadOpen" width="50%" center @open="open" @close="close" :before-close="gbq">
      <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <div class="conter">
            <el-row>
              <el-col :span="12">
                <el-form-item label="文档名称:" prop="documentName">
                  <el-input v-model="ruleForm.documentName" placeholder="请输入" maxlength="20" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="文档编号:" prop="documentNumber">
                  <el-input v-model="ruleForm.documentNumber" placeholder="请输入" maxlength="20"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="版本号:" prop="version">
                  <el-input v-model="ruleForm.version" placeholder="请输入" maxlength="20"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="搜索关键字:" prop="queryKey">
                  <el-input v-model="ruleForm.queryKey" placeholder="多个关键字之间请用:分割" maxlength="20"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="承包商:" prop="contractor">
                  <el-input v-model="ruleForm.contractor" placeholder="请输入" maxlength="20"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="合同编号:" prop="contractNumber">
                  <el-input v-model="ruleForm.contractNumber" placeholder="请输入" maxlength="20"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div class="AddDisplayTree">
                  <el-form-item label="文档位置:" prop="documentLocation">
                    <el-input
                      v-model="ruleForm.documentLocation"
                      @focus="inpuTfocus"
                      @blur="inpuTblur"
                      placeholder="请输入"
                      suffix-icon="el-icon-arrow-down"
                    ></el-input>
                  </el-form-item>
                  <div class="DocumentTree" v-if="opens">
                    <div class="play">
                      <el-tree @node-click="handleNodeClick" :props="props" :load="loadNode" accordion lazy ref="asyncTree"> </el-tree>
                    </div>
                    <div>
                      <div style="width: 150px; margin-left: 70%; margin-bottom: 5px">
                        <el-button type="primary" @click="SelectDocumentTree">确定</el-button>
                        <el-button @click="CancelDocumentTree">取消</el-button>
                      </div>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="附件" prop="attachmentss">
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
                    <div class="el-upload__tip" slot="tip">只能上传pdf/word/dwg格式的单个文件上传</div>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div class="SplitLine"></div>
          <div class="syuio">
            <el-form-item>
              <el-button size="medium" type="primary" @click="submitForm('ruleForm')">确定</el-button>
              <el-button size="medium" @click="resetForm">取消</el-button>
            </el-form-item>
          </div>
          <div style="height:1px;margin-top:-11px;"></div>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>>
<script>
import {
  engineeringDocumentsInformationIist,
  engineeringDocumentsInformationsave,
  directoryTableEosOrg,
  engineeringDocumentsInformationtoSave,
} from '@/api/ProjectManagementinterface'
import { calidatePassword } from '@/utils/validate'
export default {
  props: ['UploadOpen'],
  data() {
    var validateversion = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输版入本号'))
      } else {
        if (!calidatePassword(value)) {
          callback(new Error('只支持英文和数字.'))
        }
        callback()
      }
    }
    var validatorDocumentNumber = (rule, value, callback) => {
      if (value === '') {
        callback()
      } else {
        if (!calidatePassword(value)) {
          callback(new Error('只支持英文和数字.'))
        }
        callback()
      }
    }
    var validatorContractNumber = (rule, value, callback) => {
      if (value === '') {
        callback()
      } else {
        if (!calidatePassword(value)) {
          callback(new Error('只支持英文和数字.'))
        }
        callback()
      }
    }
    return {
      /******************x新增的树文件按区域****************** */
      i: '',
      //新增文件树打开
      opens: false,

      //传入懒加载局部刷新的id
      uid: '',
      //根据level判断是否可以增删改
      level: '',
      //已选要新建文件的父级目录
      label: '',
      //选中树节点放到当前数组的中
      trees: [],
      props: [
        {
          label: '一级 1',
          children: [
            {
              label: '二级 1-1',
              children: [
                {
                  label: '三级 1-1-1',
                },
              ],
            },
          ],
        },
        {
          label: '一级 2',
          children: [
            {
              label: '二级 2-1',
              children: [
                {
                  label: '三级 2-1-1',
                },
              ],
            },
            {
              label: '二级 2-2',
              children: [
                {
                  label: '三级 2-2-1',
                },
              ],
            },
          ],
        },
        {
          label: '一级 3',
          children: [
            {
              label: '二级 3-1',
              children: [
                {
                  label: '三级 3-1-1',
                },
              ],
            },
            {
              label: '二级 3-2',
              children: [
                {
                  label: '三级 3-2-1',
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        children: 'children',
        label: 'label',
      },
      /*********************************** */
      /******************新增数据区域验证************************ */
          //上传的文件
       UploadedFiles:[],
       attachments:{},
      ruleForm: {
        documentName: '',
        documentNumber: '',
        version: '',
        queryKey: '',
        contractor: '',
        contractNumber: '',
        documentLocation: '', 
        //树的id
        directoryTableId: '10086',
        attachmentss:[],
      },
      rules: {
        documentName: [{ required: true, message: '请输入文档称', trigger: 'blur' }],
        version: [{ required: true, validator: validateversion, trigger: 'blur' }],
        documentNumber: [{ validator: validatorDocumentNumber, trigger: 'blur' }],
        contractNumber: [{ validator: validatorContractNumber, trigger: 'blur' }],
        documentLocation: [{ required: true, message: '请选择文档位置', trigger: 'change' }],
       attachmentss: [{required: true, message: '上传文件', trigger: 'change' }],
      },
      //  ats:[],
      /****************************************** */
    }
  },
  methods: {
    /**************获取焦点获取文件树******************** */
    //书的div显示
    inpuTfocus() {
      this.opens = true
    },
    //点击该节点
    handleNodeClick(data) {
      this.ruleForm.directoryTableId = data.id
      this.level = data.level
      this.label = data.label
      let str = data.level - 1
      this.trees.splice(str)
      this.trees.push(data)
    },
    //懒加载
    loadNode(node, resolve) {
      if (node.level === 0) {
        // console.log(node,111111111)
        // console.log(resolve,1111111111111)
        let data = []
        directoryTableEosOrg(10086).then(res => {
          // console.log(res);
          data = res.data.data
          return resolve(data)
        })
      }
      //   if (node.level > 5) return resolve([]);

      if (node.level > 0) {
        //   console.log(node,2222222222)
        // console.log(resolve,2222222222)
          this.ruleForm.directoryTableId = node.data.id
      this.level = node.data.level
      this.label = node.data.label
      let str = node.data.level - 1
      this.trees.splice(str)
      this.trees.push(node.data)
        this.i = setTimeout(() => {
          let data = []
          directoryTableEosOrg(node.data.id).then(res => {
            console.log(res, '***')
            data = res.data.data
            return resolve(data)
          })
        }, 50)
      }
    },
    //选中确定文档
    SelectDocumentTree() {
      let arr = []
      this.trees.forEach(item => {
        return arr.push(item.label)
      })
      console.log(arr)
      this.ruleForm.documentLocation = arr.join('/')
      console.log(this.ruleForm.documentLocation)
      this.opens = false
    },
    //取消树文档div
    CancelDocumentTree() {
      this.opens = false
    },
    /********************************** */
    /******************文件操作区域********************** */
    //上传文件前的钩子限制文件类型
    astrict(file, fileList){
        let type1 = file.name.substring(file.name.lastIndexOf('.') + 1)
      let type = type1.trim().toLowerCase()
      // console.log(type, '***********')
      const isvideo = type === 'pdf' || type === 'doc' || type === 'dwg'|| type === 'docx'
      if (!isvideo) {
        this.$message.error('只支持pdf/word/dwg格式文件')
      }
      return isvideo
    },
    //文件上传成功的钩子
    triumph(response, file, fileList){
        let obj = {
        fileSize: response.data[0].byteToStr,
        fileId: response.data[0].id,
        fileType: response.data[0].objType,
        fileUrl: response.data[0].url,
        fileName: response.data[0].originalName,
      }
      this.ruleForm.documentName = response.data[0].originalName
     this.attachments = obj
    //  console.log( this.attachments,"*********")
     this.ruleForm.attachmentss=fileList
    //  console.log(this.ruleForm.attachmentss,"+++")
     this.$refs.ruleForm.clearValidate('attachmentss')
    },
    //删除文件的钩子
    del(file,fileList){
    //  console.log(file)
    //  console.log(fileList)
    this.ruleForm.attachmentss = fileList 
      if(fileList.length === 0){
        this.attachments = {}
      }
    },
      //文件超出限制钩子
    exceed(files, fileList) {
      this.$message.warning(`只能上传单个文件`)
    },
    /**************************************** */
    open() {
      // directoryTableEosOrg(10086).then(res => {
      //   // console.log(res, '123456+++')
      //   this.props = res.data.data[0]
      // })
      this.clearValidate('ruleForm')
    },
    //取消
    resetForm() {
      if (
        this.ruleForm.documentName != '' ||
        this.ruleForm.documentNumber != '' ||
        this.ruleForm.version != '' ||
        this.ruleForm.queryKey != '' ||
        this.ruleForm.contractor != '' ||
        this.ruleForm.contractNumber != '' ||
        this.ruleForm.documentLocation != ''||
        this.ruleForm.attachmentss.length !=0
        // this.ats.length > 0
      ) {
        this.$confirm('如果关闭将无法保存已填写的内容?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            this.$emit('UploadClose', false)
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消',
            })
          })
      } else {
        this.$emit('UploadClose', false)
      }
    },
    //关闭前的回调
    gbq(done) {
      if (
        this.ruleForm.documentName != '' ||
        this.ruleForm.documentNumber != '' ||
        this.ruleForm.version != '' ||
        this.ruleForm.queryKey != '' ||
        this.ruleForm.contractor != '' ||
        this.ruleForm.contractNumber != '' ||
        this.ruleForm.documentLocation != ''||
        this.ruleForm.attachmentss.length !=0
        // this.ats.length > 0
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
    close() {
      this.$emit('UploadClose', false)
      this.clearValidate('ruleForm')
      this.ruleForm.documentName = ''
      this.ruleForm.documentNumber = ''
      this.ruleForm.version = ''
      this.ruleForm.queryKey = ''
      this.ruleForm.contractor = ''
      this.ruleForm.contractNumber = ''
      this.ruleForm.documentLocation = ''
      this.ats = []
      this.opens = false
        this.$refs.myUpload.clearFiles()
    },
    //确定上传
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let obj = {
        documentName:this.ruleForm.documentName,
        documentNumber:this.ruleForm.documentNumber,
        version:this.ruleForm.version,
        queryKey:this.ruleForm.queryKey,
        contractor:this.ruleForm.contractor,
        contractNumber:this.ruleForm.contractNumber,
        documentLocation:this.ruleForm.documentLocation, 
        //树的id
        directoryTableId:this.ruleForm.directoryTableId,
        attachments:this.attachments
          }
          engineeringDocumentsInformationtoSave(obj).then(res => {
            if (res.data.code == 201) {
              this.$confirm(`${res.data.msg}`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
              })
                .then(() => {
                  engineeringDocumentsInformationsave(res.data.data).then(res => {
                    if (res.data.code == 200) {
                      this.$message({
                        message: `${res.data.msg}`,
                        type: 'success',
                      })
                      this.$emit('UploadClose', false)
                      this.$emit('getAllThe')
                      this.$emit('trreselct')
                    } else {
                      this.$message({
                        message: `${res.data.msg}`,
                        type: 'warning',
                      })
                    }
                  })
                })
                .catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消',
                  })
                })
            } else if (res.data.code == 500) {
              this.$message({
                message: `${res.data.msg}`,
                type: 'warning',
              })
            } else {
              //  console.log(res)
              engineeringDocumentsInformationsave(res.data.data).then(res => {
                if (res.data.code == 200) {
                  this.$message({
                    message: `${res.data.msg}`,
                    type: 'success',
                  })
                  this.$emit('UploadClose', false)
                  this.$emit('trreselct')
                  this.$emit('getAllThe')
                } else {
                  this.$message({
                    message: `${res.data.msg}`,
                    type: 'warning',
                  })
                }
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
#upload {
  .conter {
    padding:25px;
  }
  .SplitLine {
    width: 100%;
    height: 1px;
    margin-bottom: 10px;
    background-color: #cccccc;
  }
  .AddDisplayTree {
    position: relative;
  }
  .DocumentTree {
    width: 84%;
    position: absolute;
    top: 28px;
    left: 100px;
    border: 1px solid #cccccc;
    background-color: #ffffff;
    z-index: 1;
  }
  .play {
    width: 500px;
    margin: 10px auto;
  }
  /************************************ */
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
    margin-left: -90% !important;
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
  .element.style {
    margin-left: 590px;
  }
  .el-dialog--center .el-dialog__body{
    padding: 0px !important;
  }
  .syuio{
    text-align: right;
    margin-right:20px;
  }
}
</style>