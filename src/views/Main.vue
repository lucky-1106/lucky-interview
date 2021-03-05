<template>
  <div class="main">
    <router-view />

    <van-tabbar route active-color="rgb(51, 136, 255)">
      <van-tabbar-item
        v-for="item in routerInfo"
        :key="item.name"
        icon-prefix="icon"
        class="iconfont"
        replace
        :to="item.path"
        :icon="item.meta.icon"
        >{{ item.name }}</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {
  created () {
    this.routerInfo = this.$router.options.routes[3].children
  },
  data () {
    return {
      routerInfo: []
    }
  },
  methods: {}
}
</script>

<style lang="less">
.main {
  height: 100%;
  .van-tabbar-item {
  color: #999;
  .van-tabbar-item__icon {
    margin-bottom: 8px;
    i {
      font-size: 20px;
      font-style: normal;
    }
  }
  .van-tabbar-item__text {
    font-size: 12px;
  }
}
}

</style>
