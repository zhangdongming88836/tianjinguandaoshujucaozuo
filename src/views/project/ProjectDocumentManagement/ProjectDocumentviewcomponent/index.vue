<template>
  <div id="Projectview">
    <el-dialog title="文档查看" :visible.sync="ViewEngineeringDocuments" width="70%" center @open="open" @close="close">
      <div class="centebt">
        <div class="ProjectViewLayout">
          <div class="titlea">文档名称</div>
           <el-tooltip class="item" effect="dark" :content="documentation.documentName" placement="top">
          <div class="GetMessage">{{ documentation.documentName }}</div>
          </el-tooltip>
          <div class="titlea">文档编号</div>
          <div class="GetMessage">{{ documentation.documentNumber }}</div>
        </div>
        <div class="ProjectViewLayout">
          <div class="titlea">文档格式</div>
          <div class="GetMessage">{{objs.fileType}}</div>
          <div class="titlea">版本号</div>
          <div class="GetMessage">{{ documentation.version }}</div>
        </div>
        <div class="ProjectViewLayout">
          <div class="titlea">文档大小</div>
          <div class="GetMessage">{{objs.fileSize}}</div>
          <div class="titlea">搜索关键字</div>
            <el-tooltip class="item" effect="dark" :content="documentation.queryKey" placement="top">
          <div class="GetMessage">{{ documentation.queryKey }}</div>
          </el-tooltip>
        </div>
        <div class="ProjectViewLayout">
          <div class="titlea">文档创建时间</div>
          <div class="GetMessage">{{ documentation.createTime }}</div>
          <div class="titlea">创建人</div>
          <div class="GetMessage">{{ documentation.createByName }}</div>
        </div>
        <div class="ProjectViewLayout">
          <div class="titlea">文档修改时间</div>
          <div class="GetMessage">{{ documentation.updateTime }}</div>
          <div class="titlea">修改人</div>
          <div class="GetMessage">{{ documentation.updateByName }}</div>
        </div>
        <div class="ProjectViewLayout">
          <div class="titlead">文档位置</div>
          <el-tooltip class="item" effect="dark" :content="documentation.documentLocation" placement="top">
             <div class="GetMessager">{{ documentation.documentLocation }}</div>
          </el-tooltip>
        </div>
      </div>
    </el-dialog>
  </div>
</template>>
<script>
import {
  engineeringDocumentsInformationIist,
  engineeringDocumentsInformationsave,
  engineeringDocumentsInformationtoremove,
  engineeringDocumentsInformationtodetails,
} from '@/api/ProjectManagementinterface'
export default {
  props: ['ViewEngineeringDocuments', 'id'],
  data() {
    return {
      id: '',
      documentation: {},
      objs: {},
    }
  },
  methods: {
    open() {
      engineeringDocumentsInformationtodetails(this.id).then(res => {
        console.log(res)
        this.documentation = res.data.data.edi
        this.objs = res.data.data.edi.attachments
      })
    },
    close() {
      this.$emit('ViewAndCloseEngineeringDocuments', false)
    },
  },
  watch: {
    id: {
      handler(val) {
        this.id = val
      },
    },
  },
}
</script>
<style lang="scss">
#Projectview {
  .centebt {
    width: 842px;
    height: 365px;
    margin: 0 auto;
    border: solid 1px #cccccc;
  }
  .ProjectViewLayout {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
  .titlea {
    width: 140px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    color: #333333;
    border-bottom: solid 1px #cccccc;
    background-color: #f6f6f6;
  }
  .GetMessage {
    width: 281px;
    height: 60px;
    padding-left: 10px;
    line-height: 60px;
    border-bottom: solid 1px #cccccc;
     white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .titlead {
    width: 156px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    color: #333333;
    border-bottom: solid 1px #cccccc;
    background-color: #f6f6f6;
  }
  .GetMessager {
    width: 95%;
    height: 60px;
    padding-left: 10px;
    line-height: 60px;
    border-bottom: solid 1px #cccccc;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
}
</style>