<template>
    <div>
        <div class="home_footer">
       <div class="hf_box_left">
         <div class="paidng"><p>©2020-2021 失效分析数据库系统</p></div>
         <div class="paidngs"><p>©2020-2021 失效分析数据库系统 版权所有 All Rights Reserved 津ICP备15004239号</p></div>
       </div>
       <div class="hf_box_right">
         <div class="paidng"><p>电话：13157575757</p></div>
         <div class="paidngs"><p>邮箱：436354635@qq.com</p></div>
       </div>
    </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss">
.home_footer{
  display: flex;
  flex-direction:row;
  justify-content: center;
  background-color: #f4f6f9;
  padding:10px;
}
.hf_box_left{
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 10px;
}
.paidng{
  margin-bottom: 10px;
  font-family: PingFang SC;
	font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
  color: #666666;
}
.paidngs{
  margin-bottom: 5px;
  font-family: PingFang SC;
	font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
  color: #666666;
}
.hf_box_right{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-left: solid 1px #cccccc;
  padding-left: 10px;
}
</style>