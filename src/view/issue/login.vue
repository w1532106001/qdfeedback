<template>
  <div>
    <van-cell-group>
      <van-field
        v-model="username"
        required
        clearable
        label="用户名"
        :border="true"
        placeholder="请输入用户名"
        @click-right-icon="$toast('question')"
      />

      <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" required />
    </van-cell-group>
    <van-row style="padding:8px">
      <van-col span="10" offset="6">
        <van-button size="large" round type="info" @click="login">登录</van-button>
      </van-col>
    </van-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: null,
      password: null
    };
  },
  methods: {
    login() {
      var params = new URLSearchParams();
      params.append("email", this.username);
      params.append("pwd", this.$md5(this.password));
      this.axios
        .post("/user_login", params)
        .then(res => {
          if (res.data.status == 0) {
            var userInfo = {
              username: this.username,
              password: this.password
            };
            localStorage.setItem("userInfo", JSON.stringify(userInfo));
            sessionStorage.setItem("user", JSON.stringify(res.data.data));
            this.loadUserList();

            this.$notify({ type: "success", message: "登录成功" });
          } else {
            this.$notify({ type: "danger", message: res.data.msg });
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    loadUserList() {
      this.showLoading();
      this.axios
        .post("/userList")
        .then(res => {
          if (res.data.status == 0) {
            var arr = res.data.data;
            var json = [];
            var json1 = [];
            var first = {
              text: "所有人",
              value: 0
            };
            json.push(first);
            for (let key of Object.keys(arr)) {
              var j = {};
              j.text = arr[key];
              j.value = key;
              // 这里还可以继续添加属性 j.属性 = 值
              json.push(j);
              json1.push(j);
            }
            sessionStorage.setItem("userList", JSON.stringify(json1));
            sessionStorage.setItem("userList2", JSON.stringify(json));
            this.hideLoading();
            this.router.push({ name: "main" });
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    showLoading() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
        mask: true
      });
    },
    hideLoading() {
      this.$toast.clear();
    }
  },
  created() {
    var userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo != null) {
      this.username = userInfo.username;
      this.password = userInfo.password;
    }
  }
};
</script>
<style>
</style>