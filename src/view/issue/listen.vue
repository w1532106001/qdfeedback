<template>
  <van-index-bar>
    <div v-for="(item) in wordList" :key="item.alphabet">
      <van-index-anchor :index="item.alphabet" :key="item.alphabet" />
      <van-cell
        @click="selectItem(item.wordId,item.wordName)"
        v-for="(item) in item.wordList"
        :key="item.id"
      >
        <van-col span="6">{{item.wordName}}</van-col>
        <van-col span="6">序号({{item.sort}})</van-col>
        <van-col span="6">{{getHandlerName(item.sort)}}</van-col>
      </van-cell>
    </div>
  </van-index-bar>
</template>
<script>
import listenScript from "@/view/issue/listenScript";

export default {
  data() {
    return {
      components: { listenScript },
      wordList: null,
      nameList: [
        "慕富强",
        "赵剑萍",
        "孙怀宽",
        "郭继锴",
        "冯娟娟",
        "施旻",
        "陈菲菲",
        "叶菁",
        "傅曉峻",
        "慕玲玲",
        "孙怀宽",
        "李春凤",
        "程醇",
        "章士骏",
        "彭浩宇",
        "龚杰",
        "何创举",
        "王鹏程",
        "胡小兰",
        "冯丽芳",
        "张晶",
        "贺东昶",
        "黄明玲",
        "穆晔",
        "曹镇川",
        "王浩晨",
        "曹佳楼",
        "任栩辉",
        "慕富强",
        "孙怀宽",
        "孙怀宽",
        "孙怀宽",
        "孙怀宽",
        "孙怀宽",
        "孙怀宽",
      ],
    };
  },
  methods: {
    selectItem(wordId, wordName) {
      console.log(wordId);
      this.router.push({
        name: "listenScript",
        params: { wordId: wordId, wordName: wordName },
      });
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
    getWordList() {
      this.showLoading();
      this.axios
        .get("/scriptWordList")
        .then((res) => {
          if (res.data.status == 0) {
            var data = res.data.data;
            if (data != null) {
              this.wordList = data;
            }
          }
          this.hideLoading();
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getNeedLsit(alphabet) {
      if (this.wordList == null) {
        return null;
      }
      this.wordList.forEach((element) => {
        if (element.alphabet == alphabet) {
          return element.wordList;
        }
      });
      return null;
    },
    getHandlerName(index) {
      let name = "";
      let nameIndex = parseInt((index - 1) / 50);
      if (nameIndex < this.nameList.length) {
        name = this.nameList[nameIndex];
      }
      return name;
    },
  },
  created() {
    this.getWordList();
  },
};
</script>
<style>
</style>