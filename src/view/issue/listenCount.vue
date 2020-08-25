<template>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="confirm"
    />
    <van-row />
    <van-list :finished="finished" finished-text="没有更多了">
      <van-cell v-for="item in userList" :key="item.value" :title="item.text" :value="item.count" />
    </van-list>
  </van-pull-refresh>
</template>
<script>
export default {
  data() {
    return {
      userList: JSON.parse(sessionStorage.getItem("userList")),
      finished: false,
      refreshing: false,
      date: "",
      show: false,
      minDate: new Date(2010, 0, 1),
      maxDate: new Date(2099, 1, 31),
      currentDate: new Date(),
    };
  },
  methods: {
    formatDate(date) {
      return `${date.getMonth() + 1}/${date.getDate()}`;
    },
    onConfirm(date) {
      this.show = false;
      this.date = this.formatDate(date);
    },
    showLoading() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
        mask: true,
      });
    },
    hideLoading() {
      this.$toast.clear();
    },
    
    getListenCount() {
      this.showLoading();
      var self = this;
        let y = this.currentDate.getFullYear()
        let m = this.currentDate.getMonth() + 1
            m = m < 10 ? '0' + m : m;  
        let d = this.currentDate.getDate()
            d = d < 10 ? ('0' + d) : d;  
      let time = `${y}${m}${d}`;
      debugger
      this.axios
        .get("/getDailyListenCount/" + time)
        .then((res) => {
          if (res.data.status == 0) {
            var data = res.data.data;
            if (data != null) {
              for (let index = 0; index < this.userList.length; index++) {
                const element = this.userList[index];
                let count = data[element.value];
                if (count == undefined) {
                  count = 0;
                }
                element.count = count;
              }
              self.userList.sort(function (a, b) {
                return a.count - b.count;
              });
            } else {
              self.finished = true;
            }
          }
          self.refreshing = false;
          this.hideLoading();
        })
        .catch((err) => {
          console.error(err);
        });
    },
    onRefresh() {
      this.finished = false;
      this.getListenCount();
    },
    confirm() {
      this.date = this.formatDate(new Date());
      this.onRefresh();
    },
  },
  created() {
    this.date = this.formatDate(new Date());
    this.onRefresh();
  },
};
</script>
<style>
.van-cell__value {
  position: relative;
  overflow: hidden;
  color: #969799;
  text-align: left;
  vertical-align: middle;
  word-wrap: break-word;
}
</style>