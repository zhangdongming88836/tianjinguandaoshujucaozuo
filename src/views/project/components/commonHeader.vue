<template>
  <div id="commonHeader">
    <div class="left">
      <!-- <img :src="require('../../../assets/header/title.png')" /> -->
    </div>
    <div id="commonMenu">
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
            <el-submenu v-if="item.children" :index="item.path" :key="item.name" >
              <template slot="title">
                <i class="iconfont" :class="item.meta.icon"></i>
                <span class="booloks">{{ item.meta.title }}</span>
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
    </div>
    <div class="right">
      <p class="user" @click="handleShowUser">
        <i class="iconfont iconmenu_icon_user"></i>
        你好，{{ name }}
        <i class="iconfont iconicon_arrow_down1"></i>
      </p>
      <div class="right_bot" :class="userShow">
        <div class="right_bot_top clear">
          <div class="top_left">
            <i class="iconfont iconmenu_icon_user2"></i>
          </div>
          <div class="top_right">
            <p>
              <span>{{ name }}</span
              ><span>{{ department }}</span>
            </p>
            <p>{{ company }}</p>
          </div>
        </div>
        <ul class="right_bot_bot">
          <li @click="logout"><i class="iconfont iconicon_close"></i>登出</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { logout } from '@/api/login'
import { getStore, removeStore } from '@/utils/localStorage'

export default {
  props: {
    routes: {
      type: Array,
      default: false,
    },
  },
  data() {
    return {
      userShow: '',
      name: '',
      department: '',
      company: '',
    }
  },
  created() {
    let userData = JSON.parse(getStore('loginUserData'))
    this.name = userData.name
    this.company = userData.company
    this.department = userData.department
  },
  methods: {
    logout() {
      this.$alert('确定退出登录吗？', '', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
      })
        .then(() => {
          logout()
            .then(response => {
              this.$store
                .dispatch('LogOut')
                .then(() => {
                  removeStore('loginUserData')
                  window.location.href = '/newlogin'
                })
                .catch(() => {})
            })
            .catch(error => {
              this.$message({ message: '操作失败，请刷新重试！', type: 'error' })
            })
        })
        .catch(action => {
          console.log(action)
        })
    },
    handleShowUser() {
      if (this.userShow === '') {
        this.userShow = 'userShow'
        this.name = JSON.parse(getStore('loginUserData')).name
        this.company = JSON.parse(getStore('loginUserData')).company
        this.department = JSON.parse(getStore('loginUserData')).department
      } else {
        this.userShow = ''
      }
    },
  },
}
</script>
<style lang="scss">
#commonHeader {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  line-height: 60px;
  box-sizing: border-box;
  padding: 0 26px;
  //   background: #0075cb url('../../../assets/header/topbar.png') no-repeat;
  .iconfont {
    vertical-align: middle;
    color: #fff;
  }
  .center_left_bot,
  .center_right_bot,
  .right_bot {
    z-index: 999;
  }
  .line {
    width: 1px;
    height: 24px;
    margin: 8px 5px 0;
    background: #cad8e8;
  }
  .right {
    position: relative;
    .user {
      color: #fff;
      cursor: pointer;
    }
    .iconmenu_icon_user {
      font-size: 40px;
    }
    .right_bot {
      display: none;
      position: absolute;
      top: 60px;
      right: -24px;
      width: 220px;
      background-color: #ffffff;
      box-shadow: 0px 2px 4px 0px rgba(141, 141, 141, 0.5);
      border: solid 1px #dae0e6;
      .right_bot_top {
        box-sizing: border-box;
        padding: 15px 12px;
        border-bottom: 1px solid #ccc;
        .iconfont {
          color: #424e67;
        }
        .top_left,
        .top_right {
          float: left;
        }
        .top_left {
          width: 40px;
          height: 40px;
          line-height: 40px;
          margin-right: 10px;
          border-radius: 50%;
          .iconmenu_icon_user2 {
            font-size: 40px;
            color: #0075cb;
          }
        }
        .top_right {
          p {
            width: 135px;
            line-height: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 12px;
            color: #999;
          }
          p:nth-child(1) {
            span:nth-child(1) {
              margin-right: 25px;
              color: #333;
            }
            span:nth-child(2) {
              box-sizing: border-box;
              padding: 5px 8px;
              background-color: #d0e8f9;
              border-radius: 12px;
              color: #0068b4;
            }
          }
        }
      }
      .right_bot_bot {
        li {
          height: 40px;
          line-height: 40px;
          box-sizing: border-box;
          padding: 0 16px;
          color: #424e67;
          i {
            margin-right: 6px;
            color: #424e67;
          }
          &:hover {
            cursor: pointer;
            background: #eff3f5;
          }
        }
      }
    }
    .userShow {
      display: block;
    }
  }
}
/**************************************************/
#commonMenu {
  .el-menu {
    border-right: none;
    .el-submenu__title,
    .el-menu-item {
      height: 60px;
      line-height:22px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items:center;
      position: relative;
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
  .el-menu--horizontal>.el-submenu .el-submenu__icon-arrow {
    position: absolute;
    top: 33px;
    right: 5px;
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
  .NavigationLayout {
    display: flex;
    flex-direction: column;
  }
}
</style>