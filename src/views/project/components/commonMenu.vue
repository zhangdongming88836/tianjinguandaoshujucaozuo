<template>
<div></div>
  <!-- <div id="commonMenu">
    <el-menu
      router
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="transparent"
      text-color="#ffffff"
      active-text-color="#135bd1"
      :unique-opened="true"
      mode="horizontal"
    >
      <template v-for="v in routes" v-if="!v.hidden">
        <template v-for="item in v.children">
          <el-submenu v-if="item.children" :index="item.path" :key="item.name">
            <template slot="title">
              <i class="iconfont" :class="item.meta.icon"></i>
              <span>{{ item.meta.title }}</span>
            </template>
            <el-menu-item v-if="!value.hidden" v-for="value in item.children" :index="item.path + '/' + value.path" :key="value.name">
              {{ value.meta.title }}
            </el-menu-item>
          </el-submenu>
          <el-menu-item v-if="item.meta !== undefined && !item.children" :index="item.path" :key="item.name">
            <i class="iconfont" :class="item.meta.icon"></i>
            <span slot="title" class="home_title">{{ item.meta.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div> -->
</template>
<script>
export default {
  data() {
    return {}
  },
  props: {
    routes: {
      type: Array,
      default: false,
    },
  },
}
</script>
<style lang="scss">
#commonMenu {
  .el-menu {
    border-right: none;
    .el-submenu__title,
    .el-menu-item {
      height: 50px;
      line-height: 50px;
    }
    .el-menu-item.is-active,
    .el-submenu__title:hover,
    .el-menu-item:hover,
    .el-submenu.is-active .el-submenu__title {
      background: #0f5aaf !important;
      color: #fff !important;
      i {
        color: #fff !important;
      }
    }
    .iconfont {
      margin-right: 3px;
    }
  }
}
.el-menu--horizontal {
  background: #ffffff;
  .el-menu-item {
    color: #333333 !important;
    padding: 0px 20px !important;
    margin-left: 18px !important;
  }
  .home_title {
    color: #ffffff;
  }
  .el-submenu__title:hover,
  .el-menu-item:hover {
    background: #ffffff !important;
    color: rgb(61, 155, 209) !important;
    font-weight: 600;
  }
  .el-menu-item.is-active {
    background: #e1f0ff !important;
    color: rgb(26, 104, 206) !important;
    font-weight: 600;
  }
}
</style>