<template>
  <div>
    <keep-alive>
      <components ref="watchListPage" :is="page" />
    </keep-alive>
    <div ref="container" style="height: 38px;">
      <van-sticky :container="page">
        <van-tabbar v-model="active" @change="onChange" click="clickTab">
          <van-tabbar-item name="home" icon="upgrade">反馈问题</van-tabbar-item>
          <van-tabbar-item name="watchList" icon="search" :info="infoNum">查看问题</van-tabbar-item>
          <van-tabbar-item name="listen" icon="audio">听力</van-tabbar-item>
        </van-tabbar>
      </van-sticky>
    </div>
  </div>
</template>
<script>
import create from "@/view/issue/create";
import watchList from "@/view/issue/watchList";
import login from "@/view/issue/login";
import listen from "@/view/issue/listen";
export default {
  name: "mainPage",
  data() {
    return {
      page: create,
      infoNum: 0,
      active: "home",
      components: { create, watchList, login, listen }
    };
  },
  methods: {
    onChange(name) {
      this.page =
        name == "home" ? create : name == "watchList" ? watchList : listen;
    },
    getNum() {
      var user = JSON.parse(window.sessionStorage.getItem("user"));

      var params = new URLSearchParams();
      params.append("handlerId", user.userId);
      this.axios
        .post("/getNum", params)
        .then(res => {
          if (res.data.status == 0) {
            let num = res.data.data;
            if (num == 0) {
              this.infoNum = null;
            } else {
              this.infoNum = num;
            }
          } else {
            this.$notify({ type: "danger", message: res.data.msg });
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  },
  created() {
    this.getNum();
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      //  这里的vm指的就是vue实例，可以用来当做this使用
      if (from.name == "detail") {
        vm.active = "search";
        vm.page = watchList;
      } else if (from.name == "listenScript") {
        vm.active = "listen";
        vm.page = listen;
      }
    });
  }
};
</script>

<style>
body {
  font-size: 16px;
  background-color: #f8f8f8;
  -webkit-font-smoothing: antialiased;
}
</style>
