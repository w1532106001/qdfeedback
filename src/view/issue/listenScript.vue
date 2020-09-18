<template>
  <div>
    <Header :title="'核心单词:'+coreWord"></Header>
    <van-cell center title="是否需要弹窗：">
      <template #right-icon>
        <van-switch v-model="isNeedDialog" size="24" />
      </template>
    </van-cell>

    <van-pull-refresh v-model="refreshing" @refresh="onRefresh" v-if="wordScriptInfo!=null">
      <van-list :finished="finished" finished-text="没有更多了">
        <van-cell v-for="(item,scriptIndex) in wordScriptInfo.scriptInfoList" :key="item.scriptid">
          <div>
            <van-row :style="{background: 'gray'}">
              <van-col span="4">英文：</van-col>
              <van-col span="16">{{item.script_eng}}</van-col>

              <van-col span="4">
                <van-loading
                  type="spinner"
                  color="#1989fa"
                  v-if="item.isPlaying=='loading'"
                  size="50"
                />

                <van-icon
                  v-else
                  :name="item.isPlaying=='true'?'stop-circle-o':'play-circle-o'"
                  @click="playAudio(item,scriptIndex)"
                  size="50"
                />
              </van-col>
            </van-row>
            <van-row :style="{background: 'gray'}">
              <van-col span="4">中文：</van-col>
              <van-col span="16">{{item.script_chn}}</van-col>
            </van-row>
            <van-row :style="{background: 'gray'}">
              <van-col span="4">出处：</van-col>
              <van-col span="16">{{item.title_chinese}}---{{item.subtitle_english}}</van-col>
            </van-row>
            <van-row>
              <van-col span="6">
                <van-button @click="updateListenStatus(item,0,scriptIndex)">正确</van-button>
              </van-col>
              <van-col span="12">
                <van-button @click="updateListenStatus(item,1,scriptIndex)">核心单词没有在音频中</van-button>
              </van-col>
              <van-col span="6">
                <van-button @click="updateListenStatus(item,2,scriptIndex)">歌曲</van-button>
              </van-col>
            </van-row>
            <van-row>
              <van-col span="12">
                <van-button @click="updateListenStatus(item,3,scriptIndex)">例句重复</van-button>
              </van-col>
              <van-col span="12">
                <van-button @click="updateListenStatus(item,4,scriptIndex)">例句翻译有误</van-button>
              </van-col>
            </van-row>
            <van-row>
              <van-col span="12">
                <van-button @click="updateListenStatus(item,5,scriptIndex)">例句切割不完整</van-button>
              </van-col>
              <van-col span="12">
                <van-button @click="updateListenStatus(item,6,scriptIndex)">不要</van-button>
              </van-col>
            </van-row>
          </div>
        </van-cell>
      </van-list>
    </van-pull-refresh>

    <!-- <van-collapse v-model="activeNames" accordion v-if="wordScriptInfo!=null">
      <van-collapse-item
        :title="levelItem"
        :name="levelItem"
        :key="levelItem"
        v-for="(levelItem) in levelList"
      >
      
      </van-collapse-item>
    </van-collapse>-->
    <!-- 通用错误 -->
    <van-empty v-else image="error" :description="'数据异常scriptId:'+wordId" />
  </div>
</template>
<script>
import Header from "@/view/issue/header";
import Vue from "vue";

export default {
  components: { Header },
  data() {
    return {
      activeNames: ["level1"],
      isNeedDialog: true,
      finished: false,
      refreshing: false,
      wordId: this.$route.params.wordId,
      // listenList: null,
      wordScriptInfo: null,
      audio: null,
      coreWord: this.$route.params.wordName,
      selectWordList: [],
      levelList: [
        "level1",
        "level2",
        "level3",
        // "level4",
        // "level5",
        // "level6",
        // "level7",
        // "level8",
        // "level9"
      ],
    };
  },
  methods: {
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
    getWordScriptInfo() {
      this.showLoading();
      var self = this;
      this.axios
        .get("/scriptWordInfo/" + this.wordId)
        .then((res) => {
          if (res.data.status == 0) {
            var data = res.data.data;
            if (data != null) {
              self.wordScriptInfo = data;
              // self.levelList.forEach(element => {
              //   self.wordScriptInfo[element].forEach(element2 => {
              //     element2.isPlaying = false;
              //   });
              // });
              if (self.wordScriptInfo.scriptInfoList.length <= 0) {
                self.finished = true;
              }
            }
          }
          self.refreshing = false;
          this.hideLoading();
        })
        .catch((err) => {
          this.hideLoading();
          console.error(err);
        });
    },
    // getListenList() {
    //   this.showLoading();
    //   this.axios
    //     .get("/listenList")
    //     .then(res => {
    //       if (res.data.status == 0) {
    //         var data = res.data.data;
    //         if (data != null) {
    //           this.listenList = data;
    //         }
    //       }
    //       this.hideLoading();
    //       this.getWordScriptInfo();
    //     })
    //     .catch(err => {
    //       console.error(err);
    //     });
    // },
    playAudio(item, scriptIndex) {
      var self = this;
      switch (item.isPlaying) {
        case "loading":
          return;
        case "true":
          if (this.audio) {
            this.audio.pause();
            item.isPlaying = "false";
            self.$set(self.wordScriptInfo.scriptInfoList, scriptIndex, item);
          }
          return;
      }
      self.audio = new Audio();
      self.audio.src = item.mp3;
      item.isPlaying = "loading";
      self.$set(self.wordScriptInfo.scriptInfoList, scriptIndex, item);
      self.audio.onended = () => {
        item.isPlaying = "false";
        self.$set(self.wordScriptInfo.scriptInfoList, scriptIndex, item);
      };
      var playPromise = self.audio.play();
      if (playPromise) {
        playPromise
          .then(() => {
            item.isPlaying = "true";
            self.$set(self.wordScriptInfo.scriptInfoList, scriptIndex, item);
          })
          .catch((e) => {
            // 音频加载失败
            self.$notify({ type: "danger", message: "音频播放失败" });
            item.isPlaying = "false";
            self.$set(self.wordScriptInfo.scriptInfoList, scriptIndex, item);
          });
      }
    },
    updateListenStatus(item, scriptStatus, scriptIndex) {
      if (this.audio) {
        this.audio.pause();
        item.isPlaying = "false";
        this.$set(this.wordScriptInfo.scriptInfoList, scriptIndex, item);
      }
      var user = JSON.parse(window.sessionStorage.getItem("user"));

      var params = new FormData();
      params.append("scriptId", item.scriptid);
      params.append("scriptStatus", scriptStatus);
      params.append("realName", user.realName);
      params.append("userId ", user.userId);
      params.append("wordId ", this.wordId);
      params.append("wordName ", this.coreWord);
      if (this.isNeedDialog) {
        var title = "";
        switch (scriptStatus) {
          case 0:
            title = "正确";
            break;
          case 1:
            title = "核心单词没有在音频中";
            break;
          case 2:
            title = "歌曲";
            break;
          case 3:
            title = "例句重复";
            break;
          case 4:
            title = "例句翻译有误";
            break;
          case 5:
            title = "例句切割不完整";
            break;
          case 6:
            title = "不要";
            break;
          default:
            return;
        }
        this.$dialog
          .confirm({
            title: title,
            message: "",
          })
          .then(() => {
            // on confirm

            this.showLoading();
            this.axios
              .post("/updateListenStatus", params)
              .then((res) => {
                if (res.data.status == 0) {
                  var data = res.data.data;
                  if (data != null) {
                    this.$delete(
                      this.wordScriptInfo.scriptInfoList,
                      scriptIndex
                    );
                    if (this.wordScriptInfo.scriptInfoList.length <= 0) {
                      this.onRefresh();
                    }
                  }
                }
                this.hideLoading();
              })
              .catch((err) => {
                this.hideLoading();
                console.error(err);
              });
          })
          .catch(() => {
            // on cancel
          });
      } else {
        this.showLoading();
        this.axios
          .post("/updateListenStatus", params)
          .then((res) => {
            if (res.data.status == 0) {
              var data = res.data.data;
              if (data != null) {
                this.$delete(this.wordScriptInfo.scriptInfoList, scriptIndex);
                if (this.wordScriptInfo.scriptInfoList.length <= 0) {
                  this.onRefresh();
                }
              }
            }
            this.hideLoading();
          })
          .catch((err) => {
            this.hideLoading();
            console.error(err);
          });
      }
    },
    onBack() {
      history.back();
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;
      this.getWordScriptInfo();
    },
  },

  created() {
    this.onRefresh();
  },
};
</script>
<style lang="less">
.wt-header {
  .header {
    display: flex;
    justify-content: space-between;
    height: 2rem;
    line-height: 2rem;
    font-size: 0.8rem;
    .title {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    &.primary {
      background: #1bb5f1;
      color: #fff;
      border: 0;
    }
    &.danger {
      background: #ef4f4f;
      color: #fff;
      border: 0;
    }
  }
}
audio {
  width: 300px;
  height: 80px;
}
</style>