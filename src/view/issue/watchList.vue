 <template>
  <van-row class="dropdown-item-icon">
    <!-- <van-notice-bar v-if="num!=0" style="color: red;"
  :text="message"

  left-icon="volume-o"
/> -->
    <van-popup v-model="show" position="bottom" :style="{ height: '35%' }">
      <van-datetime-picker
        v-model="currentDate"
        @cancel="colsePopup"
        @confirm="selectDate"
        type="date"
      />
    </van-popup>
    <van-dropdown-menu>
      <van-dropdown-item v-model="status_value" :options="statusList" @change="onRefresh" />
      <van-dropdown-item v-model="user_value" :options="userList" @change="onRefresh" />
      <van-dropdown-item v-model="level_value" :options="levelList" @change="onRefresh" />
    </van-dropdown-menu>
    <van-dropdown-menu>
      <van-dropdown-item v-model="stage_value" :options="stageList" @change="onRefresh" />
      <van-dropdown-item v-model="system_value" :options="systemList" @change="onRefresh" />
      <van-dropdown-item v-model="handle_value" :options="handleList" @change="onRefresh" />
    </van-dropdown-menu>
    <van-row>
      <van-col span="8" style="padding:0">
        <van-dropdown-menu>
          <van-dropdown-item
            v-model="issue_category_value"
            :options="issueCategoryList"
            @change="onRefresh"
          />
        </van-dropdown-menu>
      </van-col>
      <van-col span="16" @click="showPopup" style="padding:0">
        <van-button type="default" style="width: 50%;height: 50px;">
          <van-col>{{btn_select_date_text}}</van-col>
        </van-button>
      </van-col>
    </van-row>
    <div class="issueList">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          :offset="80"
          :immediate-check="false"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-cell
            v-for="(item,index) in list"
            :key="item.id"
            :style="getBackgroundColor(index)"
            @click="clickItem(item.id)"
          >
            <van-row style="padding-left: 10px;">
              <van-col span="3" style="font-weight:bold;">ID</van-col>
              <van-col span="7" style="font-weight:bold;">时间</van-col>
              <van-col span="5" style="font-weight:bold;">提交人</van-col>
              <van-col span="5" style="font-weight:bold;">系统</van-col>
              <van-col span="4" style="font-weight:bold;">状态</van-col>
            </van-row>
            <van-row style="padding-left: 10px;">
              <van-col span="3">{{item.id}}</van-col>
              <van-col span="7">{{item.issueDate | formatDate}}</van-col>
              <van-col span="5">{{item.creator | getUserName(userList)}}</van-col>
              <van-col span="5">{{item.system}}</van-col>
              <van-col :style="changeColor(item.status)" span="4">{{statusList[item.status+1].text}}</van-col>
            </van-row>
          </van-cell>
        </van-list>
      </van-pull-refresh>
    </div>
  </van-row>
</template>
 
<script>
import detail from "@/view/issue/detail";

export default {
  data() {
    return {
      components: { detail },
      offsetTop: "", //获取滚动位置，下次进来的时候，设置滚动高度为这个值
      num:0,
      message:"",
      status_value: 0,
      user_value: 0,
      level_value: 0,
      stage_value: 0,
      system_value: 0,
      handle_value: 0,
      issue_category_value: 0,
      pageNum: 0,
      list: [],
      show: false,
      loading: true,
      finished: false,
      isLoading: false,
      isFirst: true,
      currentDate: new Date(),
      btn_select_date_text: "选择时间",
      statusList: [
        { text: "全部状态", value: 0 },
        { text: "待处理", value: 1 },
        { text: "进行中", value: 2 },
        { text: "待审核", value: 3 },
        { text: "已关闭", value: 4 }
      ],
      userList: [
        { text: "所有身份", value: 0 },
        { text: "学生", value: 1 },
        { text: "vip学生", value: 2 }
      ],
      levelList: [
        { text: "所有身份", value: 0 },
        { text: "学生", value: 1 },
        { text: "vip学生", value: 2 },
        { text: "老师", value: 3 },
        { text: "认证老师", value: 4 }
      ],
      stageList: [
        { text: "所有学段", value: 0 },
        { text: "小学", value: 1 },
        { text: "初中", value: 2 },
        { text: "高中", value: 3 },
        { text: "大学", value: 4 },
        { text: "留学", value: 5 },
        { text: "幼儿", value: 6 }
      ],
      systemList: [
        { text: "所有系统", value: 0 },
        { text: "Android", value: 1 },
        { text: "IOS", value: 2 }
      ],
      issueCategoryList: [
        { text: "所有分类", value: 0 },
        { text: "技术", value: 1 },
        { text: "内容", value: 2 },
        { text: "界面", value: 3 },
        { text: "其他", value: 4 }
      ],
      handleList: [{ text: "处理者", value: 0 }, { text: "我", value: 1 }],
      devHandlerList:[{text: '程醇',value:624115}
      ,{text: '孙怀宽',value:9} 
      ,{text: '龚杰',value:400931} 
      ,{text: '李春凤',value:413333} 
      ,{text: '章士骏',value:426451} 
      ,{text: '何创举',value:400007} 
      ,{text: '王浩晨',value:638041}
      ,{text: '穆晔',value:638046}
      ]
      
    };
  },

  methods: {
    saveDefaultData() {
      window.sessionStorage.setItem("watch_list_status_value", this.status_value);
      window.sessionStorage.setItem("watch_list_user_value", this.user_value);
      window.sessionStorage.setItem("watch_list_level_value", this.level_value);
      window.sessionStorage.setItem("watch_list_stage_value", this.stage_value);
      window.sessionStorage.setItem("watch_list_system_value", this.system_value);
      window.sessionStorage.setItem("watch_list_handle_value", this.handle_value);
      window.sessionStorage.setItem("watch_list_issue_category_value", this.issue_category_value);
      window.sessionStorage.setItem("watch_list_btn_select_date_text", this.btn_select_date_text);
    },
    loadUserList() {
      this.userList = JSON.parse(window.sessionStorage.getItem("userList2"));
    },
    onLoad() {
      this.showLoading();
      var user = JSON.parse(window.sessionStorage.getItem("user"));
      var params = new URLSearchParams();
      if (this.status_value == 0) {
        params.append("status", "");
      } else {
        params.append("status", this.statusList[this.status_value].value - 1);
      }
      if (this.level_value == 0) {
        params.append("level", "");
      } else {
        params.append("level", this.levelList[this.level_value].value - 1);
      }
      if (this.stage_value == 0) {
        params.append("stage", "");
      } else {
        params.append("stage", this.stageList[this.stage_value].value);
      }
      if (this.system_value == 0) {
        params.append("system", "");
      } else {
        params.append("system", this.systemList[this.system_value].text);
      }
      if (this.user_value == 0) {
        params.append("userId", "");
      } else {
        params.append("userId", this.user_value);
      }
     if (this.handle_value == 0) {
        params.append("handlerId", "");
      } else if (this.handle_value == 1){
        params.append("handlerId", user.userId);
      }else{
        params.append("handlerId", this.handle_value);
      }
      if (this.issue_category_value == 0) {
        params.append("category", "");
      } else {
        params.append("category", this.issue_category_value);
      }
      if (this.btn_select_date_text == "选择时间") {
        params.append("date", "");
      } else {
        params.append("date", this.btn_select_date_text.replace(/\//g, "-"));
      }
      params.append("pageSize", this.pageNum);
      this.axios
        .post("/newListIssue", params)
        .then(res => {
          if (res.data.status == 0) {
            // 请求返回
            let list = res.data.data.content;
            // loading 初始化true
            // 每次调用接口 loading为true
            if (this.loading) {
              this.loading = false;
              this.list = [...this.list, ...list];
              // 如果list总数大于登录返回总记录数停止循环
              if (this.list.length >= res.data.data.totalElements) {
                this.finished = true;
              } else {
                this.finished = false;
              }
              // 请求页自增
              this.pageNum++;
            }

            this.hideLoading();
            return;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    onRefresh() {
      this.saveDefaultData();
      this.isLoading = false;
      this.loading = true;
      this.pageNum = 0;
      this.showLoading();
      var user = JSON.parse(window.sessionStorage.getItem("user"));
      var params = new URLSearchParams();
      if (this.status_value == 0) {
        params.append("status", "");
      } else {
        params.append("status", this.statusList[this.status_value].value - 1);
      }
      if (this.level_value == 0) {
        params.append("level", "");
      } else {
        params.append("level", this.levelList[this.level_value].value - 1);
      }
      if (this.stage_value == 0) {
        params.append("stage", "");
      } else {
        params.append("stage", this.stageList[this.stage_value].value);
      }
      if (this.system_value == 0) {
        params.append("system", "");
      } else {
        params.append("system", this.systemList[this.system_value].text);
      }
      if (this.user_value == 0) {
        params.append("userId", "");
      } else {
        params.append("userId", this.user_value);
      }
      if (this.handle_value == 0) {
        params.append("handlerId", "");
      } else if (this.handle_value == 1){
        params.append("handlerId", user.userId);
      }else{
        params.append("handlerId", this.handle_value);
      }
      
      if (this.issue_category_value == 0) {
        params.append("category", "");
      } else {
        params.append("category", this.issue_category_value);
      }
      if (this.btn_select_date_text == "选择时间") {
        params.append("date", "");
      } else {
        params.append("date", this.btn_select_date_text.replace(/\//g, "-"));
      }
      params.append("pageSize", this.pageNum);
      this.axios
        .post("/newListIssue", params)
        .then(res => {
          if (res.data.status == 0) {
            // 请求返回
            let list = res.data.data.content;
            if (this.pageNum == 0) {
              this.list = [];
            }
            // 循环添加值
            this.list = [...this.list, ...list];

            // 如果list总数大于登录返回总记录数停止循环
            if (this.list.length >= res.data.data.totalElements) {
              this.finished = true;
            } else {
              this.finished = false;
            }
            this.loading = false;

            // 请求页自增
            this.pageNum++;
            this.hideLoading();

            return;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    clickItem(issueId) {
      //路由跳转携带IssueId
      this.router.push({ name: "detail", params: { issueId: issueId } });
    },
    changeColor(value) {
      switch (value) {
        case 0:
          return { color: "#000000" };
          break;
        case 1:
          return { color: "rgb(245,166,35)" };
          break;
        case 2:
          return { color: "rgb(208,2,27)" };
          break;
        case 3:
          return { color: "blue" };
          break;
      }
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
    showPopup() {
      this.show = true;
    },
    colsePopup() {
      this.show = false;
    },
    selectDate() {
      this.show = false;
      this.btn_select_date_text = this.formatDate(this.currentDate);
      this.onRefresh();
    },
    formatDate: function(value) {
      let date = new Date(value);
      let moment = require("moment");
      return moment(date).format("YYYY/MM/DD");
    },
    getBackgroundColor(id) {
      return id % 2 ? {} : { background: "#EEEEEE" };
    },
    initDefaultData() {
      var status_value = window.sessionStorage.getItem("watch_list_status_value");
      if(undefined != status_value){
        this.status_value = parseInt(status_value);
      }
      var user_value = window.sessionStorage.getItem("watch_list_user_value");
       if(undefined != user_value){
        this.user_value = parseInt(user_value);
      }
      var level_value = window.sessionStorage.getItem("watch_list_level_value");
       if(undefined != level_value){
        this.level_value = parseInt(level_value);
      }
      var stage_value = window.sessionStorage.getItem("watch_list_stage_value");
       if(undefined != stage_value){
        this.stage_value = parseInt(stage_value);
      }
      var system_value = window.sessionStorage.getItem("watch_list_system_value");
       if(undefined != system_value){
        this.system_value = parseInt(system_value);
      }
      var handle_value = window.sessionStorage.getItem("watch_list_handle_value");
       if(undefined != handle_value){
        this.handle_value = parseInt(handle_value);
      }
      var issue_category_value = window.sessionStorage.getItem("watch_list_issue_category_value");
       if(undefined != issue_category_value){
        this.issue_category_value = parseInt(issue_category_value);
      }
      var btn_select_date_text = window.sessionStorage.getItem("watch_list_btn_select_date_text");
       if(btn_select_date_text!=null&&btn_select_date_text!=""&&btn_select_date_text!=undefined){
        this.btn_select_date_text = btn_select_date_text;
      }
    },
 
  },

  created() {
    if (this.isFirst) {
      this.isFirst = false;
      this.loadUserList();
    }
    this.initDefaultData();
          var user = JSON.parse(window.sessionStorage.getItem("user"));

  //重新赋予处理者列表
      for (let index = 0; index < this.devHandlerList.length; index++) {
        const element = this.devHandlerList[index];
        if(user.userId==element.value){
          break;
        }
        this.handleList.push(element);
      }
this.onRefresh();
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
    }
  },
  activated() {
    // keep-alive组件 页面进入的时候设置滚动高度
    document.documentElement.scrollTop = this.offsetTop;
  },
  deactivated() {
    //keep-alive 组件停用时调用（简单理解为组件离开的时候）。
    // 获取页面滚动高度，这个钩子有可能会拿不到数据，因为这个钩子执行的慢，可以用beforeRouteLeave代替
    this.offsetTop = document.documentElement.scrollTop;
  }
};
</script>
<style lang="less">
.dropdown-item-icon {
  .van-col {
    font-size: 14px;
    padding: 5px;
  }
}
.issueList {
  .van-cell {
    padding: 0;
    line-height: 16px;
  }
}
</style>