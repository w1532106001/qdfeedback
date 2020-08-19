<template>
  <!-- 所有的内容要被根节点包含起来 -->
  <div id="home">
    <Header></Header>

    <div class="home" v-if="issue">
      <vue-fab
        icon-type="iconfont"
        icon="icon-fenpeijiaose"
        fabItemAnimate="default"
        :scrollAutoHide="false"
        :hidden="floatingButtonHide"
        mainBtnColor="#16C2C2"
        @clickMainBtn="clickFloatingButton"
      ></vue-fab>

      <van-row>
        <van-row>
          <van-col span="6" style="font-weight: bold;">创建者</van-col>
          <van-col span="8" style="font-weight: bold;">时间</van-col>
          <van-col span="4" style="font-weight: bold;">编号</van-col>
          <van-col span="6" style="font-weight: bold;">状态</van-col>
        </van-row>
        <van-row>
          <van-col :style="{color: 'red'}" span="6">{{issue.creator | getUserName(userList)}}</van-col>
          <van-col span="8">{{issue.issueDate | formatDate}}</van-col>
          <van-col span="4">{{issue.id}}</van-col>
          <van-col span="6">{{statusList[issue.status].text}}</van-col>
        </van-row>
      </van-row>
      <van-row v-if="isHandler">
        <van-col span="6" style="font-weight: bold;line-height: 2.5;">暂时无法处理</van-col>
        <van-col span="8">
          <van-switch :value="checked" @input="isTemporarilyUnableToProcess" />
        </van-col>
      </van-row>

      <van-row>
        <van-row>
          <van-col span="24" style="font-weight: bold;">手机信息</van-col>
        </van-row>
        <van-row class="border_class">
          <van-row>
            <van-col span="6">品牌:</van-col>
            <van-col span="6">{{issue.phoneBrand}}</van-col>
            <van-col span="6">手机型号:</van-col>
            <van-col span="6">{{issue.phoneModel}}</van-col>
          </van-row>
          <van-row>
            <van-col span="6">系统:</van-col>
            <van-col :style="{color: 'red'}" span="6">{{issue.system}}</van-col>
            <van-col span="6">系统版本:</van-col>
            <van-col span="6">{{issue.phoneIos}}</van-col>
          </van-row>
          <van-row>
            <van-col span="6">网络分类:</van-col>
            <van-col span="6">{{phoneNetworkCategoryList[issue.phoneNetworkCategory-1].text}}</van-col>
            <van-col span="6">网络状态:</van-col>
            <van-col span="6">{{phoneNetworkStatusList[issue.phoneNetworkStatus].text}}</van-col>
          </van-row>
        </van-row>
      </van-row>

      <van-row>
        <van-row>
          <van-col span="24" style="font-weight: bold;">米奇信息</van-col>
        </van-row>
        <van-row class="border_class">
          <van-row>
            <van-col span="6">米奇账号:</van-col>
            <van-col span="8">{{issue.mobile}}</van-col>
            <van-col span="4">身份:</van-col>
            <van-col :style="{color: 'red'}" span="6">{{levelList[issue.level].text}}</van-col>
          </van-row>
          <van-row>
            <van-col span="6">学段:</van-col>
            <van-col :style="{color: 'red'}" span="6">{{stageList[issue.stage-1].text}}</van-col>
            <van-col span="6">菜单:</van-col>
            <van-col :style="{color: 'red'}" span="6">{{menuList[issue.menu-1].text}}</van-col>
          </van-row>
          <van-row>
            <van-col span="6">严重度:</van-col>
            <van-col span="6">{{clazzList[issue.clazz].text}}</van-col>
            <van-col span="6">出错率:</van-col>
            <van-col span="6">{{failRateList[issue.failRate-1].text}}</van-col>
          </van-row>
          <van-row>
            <van-col span="6">版本号:</van-col>
            <van-col span="6">{{issue.version}}</van-col>
          </van-row>
        </van-row>
      </van-row>

      <van-row>
        <van-row>
          <van-col span="24" style="font-weight: bold;">问题信息</van-col>
        </van-row>
        <van-row class="border_class">
          <van-row>
            <van-col span="6">问题分类:</van-col>
            <van-col :style="{color: 'red'}" span="6">{{issueCategoryList[issue.category-1].text}}</van-col>
          </van-row>
          <van-row>
            <van-col span="6">问题描述:</van-col>
            <van-col :style="{color: 'red'}" span="18">{{issue.testComments}}</van-col>
          </van-row>
        </van-row>
      </van-row>

      <van-row v-if="images.length>0">
        <van-row>
          <van-col span="24">图片</van-col>
        </van-row>
        <van-row style="padding:0">
          <van-image-preview v-model="show" :images="images" />
          <van-swipe :autoplay="999999" :loop="false" :width="150" :height="200">
            <van-swipe-item
              class="items"
              style="width:100px;padding:8px"
              v-for="(item,index) in images"
              :key="index"
              @click="clickImageItem"
            >
              <van-image class="detailImage" :src="item" fit="fill">
                <template v-slot:loading>
                  <van-loading type="spinner" size="20" />
                </template>
              </van-image>
            </van-swipe-item>
          </van-swipe>
        </van-row>
      </van-row>

      <van-row v-if="videos.length>0">
        <van-row>
          <van-col span="24">视频</van-col>
        </van-row>
        <van-row style="padding:0">
          <van-swipe :autoplay="999999" :loop="false" :width="150" :height="200" type="video/mp4">
            <van-swipe-item
              class="items"
              style="width:200px;padding:8px"
              v-for="(item,index) in videos"
              :key="index"
            >
              <video class="detailImage" controls="controls">
                <source :src="item" type="video/mp4" />
              </video>
            </van-swipe-item>
          </van-swipe>
        </van-row>
      </van-row>

      <!-- 消息 -->
      <van-row v-if="messageList.length>0">
        <van-row style="text-align: -webkit-center;text-align: center;font-weight: bold;">消息</van-row>
        <van-row class="border_class">
          <van-row v-for="(item,index) in messageList" :key="index">
            <van-col span="4">时间:</van-col>
            <van-col span="8">{{item.messageDate | formatDate}}</van-col>
            <van-col span="4">名字:</van-col>
            <van-col span="8">{{item.userId | getUserName(userList)}}</van-col>
            <van-col span="6" v-if="item.issueStatus==2">处理意见:</van-col>
            <van-col span="10" v-else>二次测试回复:</van-col>
            <van-col span="14">{{item.message | checkNull}}</van-col>
          </van-row>
        </van-row>
      </van-row>

      <!-- 分配 -->
      <van-row v-if="isShowAssignment" class="assignmentButton">
        <van-row style="padding: 0;">
          <van-col
            span="6"
            style="height: 50px;text-align: center;line-height: 50px;font-weight: bold;"
          >任务分配</van-col>
          <van-col span="18">
            <van-dropdown-menu direction="up" style="    margin-left: auto;  right: 10px;">
              <van-dropdown-item v-model="user_value" :options="userList" />
            </van-dropdown-menu>
          </van-col>
        </van-row>
        <van-row>
          <van-col span="10" offset="6">
            <van-button size="large" round type="info" @click="assignmentIssue">分配</van-button>
          </van-col>
        </van-row>
      </van-row>
      <!-- 处理 -->
      <van-row v-if="isShowHandler">
        <van-col span="24" style="font-weight: bold;">处理意见</van-col>
        <van-col span="24" class="border_class">
          <textarea v-model="handler_comments" style="width:100%;height:50px;border:0" />
        </van-col>
        <van-col span="10" offset="6">
          <van-button size="large" round type="info" @click="processingOpinions">提交</van-button>
        </van-col>
      </van-row>
      <!-- 关闭或打回问题 -->
      <van-row v-if="isShowColse">
        <van-col span="24" style="font-weight: bold;">二次测试反馈</van-col>
        <van-col span="24" class="border_class">
          <textarea v-model="second_test_comments" style="width:100%;height:50px;border:0" />
        </van-col>
        <van-col v-if="isShowUnsolved" span="8" offset="2">
          <van-button size="large" round type="info" @click="closeIssue">关闭问题</van-button>
        </van-col>
        <van-col v-else span="20" offset="2">
          <van-button size="large" round type="info" @click="closeIssue">关闭问题</van-button>
        </van-col>
        <van-col span="8" offset="2" v-if="isShowUnsolved">
          <van-button size="large" round type="info" @click="unsolvedIssue">未解决</van-button>
        </van-col>
      </van-row>
    </div>
  </div>
</template>
<script>
import "@vant/touch-emulator";
import Header from "@/view/issue/header";

export default {
  components: { Header },
  data() {
    return {
      floatingButtonHide: true,
      issueId: this.$route.params.issueId,
      issue: null,
      messageList: [],
      user_value: null,
      userList: JSON.parse(sessionStorage.getItem("userList")),
      user: JSON.parse(sessionStorage.getItem("user")),
      isShowAssignment: false,
      isShowHandler: false,
      isShowColse: false,
      isShowUnsolved: true,
      handler_comments: "",
      second_test_comments: "",
      statusList: [
        { text: "待处理", value: 0 },
        { text: "进行中", value: 1 },
        { text: "待审核", value: 2 },
        { text: "已关闭", value: 3 }
      ],
      levelList: [
        { text: "学生", value: 0 },
        { text: "vip学生", value: 1 },
        { text: "老师", value: 2 },
        { text: "认证老师", value: 3 }
      ],
      stageList: [
        { text: "小学", value: 0 },
        { text: "初中", value: 1 },
        { text: "高中", value: 2 },
        { text: "大学", value: 3 },
        { text: "留学", value: 4 },
        { text: "幼儿", value: 5 }
      ],
      menuList: [
        { text: "单词学习", value: 0 },
        { text: "同步学习", value: 1 },
        { text: "组卷", value: 2 },
        { text: "考试分析", value: 3 },
        { text: "我", value: 4 }
      ],
      phoneNetworkStatusList: [
        { text: "有网络", value: 0 },
        { text: "无网络", value: 1 },
        { text: "切换到WIFI", value: 2 },
        { text: "切换到移动", value: 3 }
      ],
      phoneNetworkCategoryList: [
        { text: "WIFI", value: 0 },
        { text: "4G", value: 1 }
      ],
      clazzList: [
        { text: "高", value: 0 },
        { text: "中", value: 1 },
        { text: "低", value: 2 }
      ],
      failRateList: [
        { text: "偶尔", value: 0 },
        { text: "每次", value: 1 }
      ],
      issueCategoryList: [
        { text: "技术", value: 0 },
        { text: "内容", value: 1 },
        { text: "界面", value: 2 },
        { text: "其他", value: 3 }
      ],
      show: false,
      index: 0,
      images: [],
      videos: [],
      isHandler: false,
      checked: false
    };
  },
  methods: {
    getIssue() {
      this.isShowAssignment = false;
      this.isShowHandler = false;
      this.isShowColse = false;
      var params = new URLSearchParams();
      params.append("issueId", this.issueId);
      this.showLoading();
      this.axios
        .post("/getIssue", params)
        .then(res => {
          if (res.data.status == 0) {
            var data = res.data.data;
            if (data != null) {
              this.issue = data.issue;
              this.check(data.issue);

              this.messageList = data.messageList;
              this.images = [];
              this.videos = [];
              if (data.issue.mediaUrls != null && data.issue.mediaUrls != "") {
                var medias = data.issue.mediaUrls.split(",");
                for (var i = 0; i < medias.length; i++) {
                  if (
                    -1 != medias[i].indexOf(".jpg") ||
                    -1 != medias[i].indexOf(".jpeg") ||
                    -1 != medias[i].indexOf(".png") ||
                    -1 != medias[i].indexOf(".heic") ||
                    -1 != medias[i].indexOf(".JPG") ||
                    -1 != medias[i].indexOf(".JPEG") ||
                    -1 != medias[i].indexOf(".PNG") ||
                    -1 != medias[i].indexOf(".HEIC")
                  ) {
                    this.images.push(
                      "http://106.14.191.77:9003/index/media/" +
                        medias[i].trim()
                    );
                  } else {
                    this.videos.push(
                      "http://106.14.191.77:9003/index/media/" +
                        medias[i].trim()
                    );
                  }
                }
              }
            }
          }
          this.hideLoading();
        })
        .catch(err => {
          console.error(err);
        });
    },
    onChange(index) {
      this.index = index;
    },
    clickImageItem() {
      this.show = true;
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
    },
    assignmentIssue() {
      if (this.user_value == null) {
        this.$toast.fail("请选择处理者");
        return;
      }
      var params = new URLSearchParams();
      params.append("issueId", this.issue.id);
      params.append("userId", this.user_value);
      this.showLoading();
      this.axios
        .post("/assignmentIssue", params)
        .then(res => {
          if (res.data.status == 0) {
            this.$toast.fail("分配成功");
            this.hideLoading();
            this.getIssue();
            return;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    processingOpinions() {
      var params = new URLSearchParams();
      params.append("issueId", this.issue.id);
      params.append("userId", this.user.userId);
      params.append("message", this.handler_comments);
      params.append("status", "2");
      this.handler_comments = "";
      this.showLoading();
      this.axios
        .post("/createMessage", params)
        .then(res => {
          if (res.data.status == 0) {
            this.$toast.fail("处理成功");
            this.hideLoading();
            this.getIssue();
            return;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    closeIssue() {
      var params = new URLSearchParams();
      params.append("issueId", this.issue.id);
      params.append("userId", this.user.userId);
      params.append("message", this.second_test_comments);
      params.append("status", "3");
      this.second_test_comments = "";

      this.showLoading();
      this.axios
        .post("/createMessage", params)
        .then(res => {
          if (res.data.status == 0) {
            this.$toast.fail("处理成功");
            this.hideLoading();
            this.getIssue();
            return;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    unsolvedIssue() {
      var params = new URLSearchParams();
      params.append("issueId", this.issue.id);
      params.append("userId", this.user.userId);
      params.append("message", this.second_test_comments);
      params.append("status", "1");
      this.second_test_comments = "";

      this.showLoading();
      this.axios
        .post("/createMessage", params)
        .then(res => {
          if (res.data.status == 0) {
            this.$toast.fail("提交成功");
            this.hideLoading();
            this.getIssue();
            return;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    isTemporarilyUnableToProcess(checked) {
      var params = new URLSearchParams();
      params.append("issueId", this.issue.id);
      params.append("isTemporarilyUnableToProcess", checked);
      this.showLoading();
      this.axios
        .post("/isTemporarilyUnableToProcess", params)
        .then(res => {
          if (res.data.status == 0) {
            this.$toast.fail("修改成功");
            this.hideLoading();
            this.getIssue();
            return;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    check(issue) {
      this.floatingButtonHide = true;

      if (issue.status != 0) {
        /**
         * 如果是管理员 显示floatingButton
         */
        if (this.user.usertypeid == "100") {
          this.floatingButtonHide = false;
        }
      }

      if (issue.category == 2) {
        /**
         * 待处理
         */
        if (issue.status == 0) {
          /**
           * 关闭菜单
           */
          this.isShowColse = true;
          this.isShowUnsolved = false;
          /**
           * 如果是管理员 出现分配菜单
           */
          if (this.user.usertypeid == "100") {
            this.isShowAssignment = true;
          }
        }
      } else {
        /**
         * 待处理
         */
        if (issue.status == 0) {
          /**
           * 如果是管理员 出现分配菜单
           */
          if (this.user.usertypeid == "100") {
            this.isShowAssignment = true;
          }
        }
      }
      /**
       * 处理中
       */
      if (issue.status == 1) {
        /**
         * 判断进来的用户是不是处理者 如果是处理者 出现反馈菜单
         */
        if (this.user.userId == issue.handlerId) {
          this.isShowHandler = true;
        }
      }
      /**
       * 已处理
       */
      if (issue.status == 2) {
        /**
         * 如果进来的用户是创建者 出现二次反馈菜单
         */
        if (this.user.userId == issue.creator) {
          this.isShowColse = true;
          this.isShowUnsolved = true;
        }
      }

      if (this.user.userId == issue.handlerId) {
        this.isHandler = true;
        this.checked = issue.isTemporarilyUnableToProcess;
      } else {
        this.isHandler = false;
        this.checked = issue.isTemporarilyUnableToProcess;
      }
    },
    clickFloatingButton() {
      this.user_value = null;
      this.isShowAssignment = true;
    }
  },
  filters: {
    formatDate: function(value) {
      let moment = require("moment");
      return moment(value).format("MM/DD HH:mm");
    },
    getUserName: function(value, userList) {
      for (var i = 0; i < userList.length; i++) {
        if (userList[i].value == value) {
          return userList[i].text;
        }
      }
    },
    checkNull: function(value) {
      if (value == null || value == undefined || value == "") {
        return "";
      }
      return value;
    }
  },
  created() {
    this.getIssue();
  }
};
</script>

<style lang="less" >
.home {
  padding: 8px;
}
.van-row {
  padding: 0;
}
.border_class {
  border: 1px solid #ccc !important;
  border-radius: 16px !important;
}
.detailImage {
  width: 100%;
  height: 100%;
}
.van-swipe__indicators {
  display: block;
}
.van-col {
  font-size: 14px;
  padding: 5px;
}
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>