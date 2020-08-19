<template>
  <!-- <div style="display: flex;flex-direction: column;height: 85vh;display: -webkit-flex;"> -->
  <div>
    <!-- <van-tabs style="flex: 2;width: 100%;overflow-y: scroll;" active="a" sticky> -->
    <van-row></van-row>
    <van-tabs active="a" sticky>
      <van-tab title="米奇信息" name="a" class="dropDwonIcon">
        <van-row>
          <!-- <van-col span="4">米奇账号</van-col>
          <van-col span="8" v-model="username"></van-col>-->
          <van-col span="13">
            <van-cell-group>
              <van-field
                class="borderBottomInput"
                style="background-color: #F8F8F8;"
                v-model="username"
                clearable
                label="米奇账号:"
                placeholder
                bind:click-icon="onClickIcon"
                label-width="60px"
              />
            </van-cell-group>
          </van-col>
          <van-col span="11">
            <van-cell-group>
              <van-field
                class="borderBottomInput"
                style="background-color: #F8F8F8;"
                v-model="version"
                label="版本号:"
                placeholder
                required
                label-width="60px"
              />
            </van-cell-group>
          </van-col>
        </van-row>

        <van-row>
          <van-col span="13">
            <van-cell-group>
              <van-field
                class="borderBottomInput"
                style="background-color: #F8F8F8;"
                v-model="phoneModel"
                label="手机型号:"
                placeholder
                required
                label-width="60px"
              />
            </van-cell-group>
          </van-col>
          <van-col span="11">
            <van-cell-group style>
              <van-field
                class="borderBottomInput"
                style="background-color: #F8F8F8;"
                v-model="phoneIos"
                clearable
                label="系统版本:"
                placeholder
                bind:click-icon="onClickIcon"
                required
                label-width="60px"
              />
            </van-cell-group>
          </van-col>
        </van-row>

        <van-row>
          <van-col span="13">
            <van-cell-group>
              <van-field
                class="borderBottomInput"
                style="background-color: #F8F8F8;"
                v-model="phoneBrand"
                label="手机品牌:"
                placeholder
                required
                label-width="60px"
              />
            </van-cell-group>
          </van-col>
          <van-col span="4" class="dropdown_text">系统</van-col>
          <van-col span="7">
            <van-dropdown-menu>
              <van-dropdown-item v-model="system_value" :options="systemList" />
            </van-dropdown-menu>
          </van-col>
        </van-row>

        <van-row>
          <van-col span="5" class="dropdown_text">身份</van-col>
          <van-col span="7">
            <van-dropdown-menu>
              <van-dropdown-item v-model="level_value" :options="levelList" />
            </van-dropdown-menu>
          </van-col>
          <van-col span="5" class="dropdown_text">严重度</van-col>
          <van-col span="7">
            <van-dropdown-menu>
              <van-dropdown-item v-model="clazz_value" :options="clazzList" />
            </van-dropdown-menu>
          </van-col>
        </van-row>

        <van-row>
          <van-col span="5" class="dropdown_text">网络状态</van-col>
          <van-col span="7">
            <van-dropdown-menu>
              <van-dropdown-item v-model="network_status_value" :options="networkStatusList" />
            </van-dropdown-menu>
          </van-col>
          <van-col span="5" class="dropdown_text">
            <span style="color:red;">*</span>网络分类
          </van-col>
          <van-col span="7">
            <van-dropdown-menu>
              <van-dropdown-item v-model="network_category_value" :options="networkCategoryList" />
            </van-dropdown-menu>
          </van-col>
        </van-row>

        <van-row>
          <van-col span="5" class="dropdown_text">
            <span style="color:red;">*</span>学段
          </van-col>
          <van-col span="7">
            <van-dropdown-menu>
              <van-dropdown-item v-model="stage_value" :options="stageList" />
            </van-dropdown-menu>
          </van-col>
          <van-col span="5" class="dropdown_text">
            <span style="color:red;">*</span>问题分类
          </van-col>
          <van-col span="7">
            <van-dropdown-menu>
              <van-dropdown-item v-model="issue_category_value" :options="issueCategoryList" />
            </van-dropdown-menu>
          </van-col>
        </van-row>

        <van-row>
          <van-col span="5" class="dropdown_text">
            <span style="color:red;">*</span>菜单
          </van-col>
          <van-col span="7">
            <van-dropdown-menu>
              <van-dropdown-item v-model="menu_value" :options="menuList" />
            </van-dropdown-menu>
          </van-col>
          <van-col span="5" class="dropdown_text" required>
            <span style="color:red;">*</span>出错率
          </van-col>
          <van-col span="7">
            <van-dropdown-menu>
              <van-dropdown-item v-model="fail_rate_value" :options="failRateList" />
            </van-dropdown-menu>
          </van-col>
        </van-row>
      </van-tab>
      <van-tab title="设备信息" name="b">
        <section style="display: block;" class="van-doc-demo-block">
          <h2
            style="padding-top: 20px;margin: 0;padding: 15px 8px 8px;;color: rgba(69, 90, 100, 0.6);
        font-weight: normal;font-size: 14px;"
          >请选择系统状态</h2>
          <van-row>
            <van-col span="24">
              <van-dropdown-menu>
                <van-dropdown-item v-model="phone_status_value" :options="phoneStatusList" />
              </van-dropdown-menu>
            </van-col>
          </van-row>
        </section>
        <section style="display: block;" class="van-doc-demo-block">
          <h2
            style="padding-top: 20px;margin: 0;padding: 15px 8px 8px;;color: rgba(69, 90, 100, 0.6);
        font-weight: normal;font-size: 14px;"
          >请选择声音播放类型</h2>
          <van-row>
            <van-col span="24">
              <van-dropdown-menu>
                <van-dropdown-item
                  v-model="phone_sound_category_value"
                  :options="phoneSoundCategoryList"
                />
              </van-dropdown-menu>
            </van-col>
          </van-row>
        </section>
        <section style="display: block;" class="van-doc-demo-block">
          <h2
            style="padding-top: 20px;margin: 0;padding: 15px 8px 8px;;color: rgba(69, 90, 100, 0.6);
        font-weight: normal;font-size: 14px;"
          >请选择声音播放状态</h2>
          <van-row>
            <van-col span="24">
              <van-dropdown-menu>
                <van-dropdown-item
                  v-model="Phone_sound_status_value"
                  :options="PhoneSoundStatusList"
                />
              </van-dropdown-menu>
            </van-col>
          </van-row>
        </section>
        <section style="display: block;" class="van-doc-demo-block">
          <h2
            style="padding-top: 20px;margin: 0;padding: 15px 8px 8px;;color: rgba(69, 90, 100, 0.6);
        font-weight: normal;font-size: 14px;"
          >请选择麦克风状态</h2>
          <van-row>
            <van-col span="24">
              <van-dropdown-menu>
                <van-dropdown-item
                  v-model="microphone_status_value"
                  :options="microphoneStatusList"
                />
              </van-dropdown-menu>
            </van-col>
          </van-row>
        </section>
        <section style="display: block;" class="van-doc-demo-block">
          <h2
            style="padding-top: 20px;margin: 0;padding: 15px 8px 8px;;color: rgba(69, 90, 100, 0.6);
        font-weight: normal;font-size: 14px;"
          >请选择麦克风类型</h2>
          <van-row>
            <van-col span="24">
              <van-dropdown-menu>
                <van-dropdown-item
                  v-model="microphone_category_value"
                  :options="microphoneCategoryList"
                />
              </van-dropdown-menu>
            </van-col>
          </van-row>
        </section>
        <section style="display: block;" class="van-doc-demo-block">
          <h2
            style="padding-top: 20px;margin: 0;padding: 15px 8px 8px;;color: rgba(69, 90, 100, 0.6);
        font-weight: normal;font-size: 14px;"
          >请选择摄像头状态</h2>
          <van-row>
            <van-col span="24">
              <van-dropdown-menu>
                <van-dropdown-item
                  v-model="phone_camera_status_value"
                  :options="phoneCameraStatusList"
                />
              </van-dropdown-menu>
            </van-col>
          </van-row>
        </section>
        <section style="display: block;" class="van-doc-demo-block">
          <h2
            style="padding-top: 20px;margin: 0;padding: 15px 8px 8px;;color: rgba(69, 90, 100, 0.6);
        font-weight: normal;font-size: 14px;"
          >请选择手机存储空间状态</h2>
          <van-row>
            <van-col span="24">
              <van-dropdown-menu>
                <van-dropdown-item
                  v-model="phone_storage_status_value"
                  :options="phoneStorageStatusList"
                />
              </van-dropdown-menu>
            </van-col>
          </van-row>
        </section>
        <section style="display: block;" class="van-doc-demo-block">
          <h2
            style="padding-top: 20px;margin: 0;padding: 15px 8px 8px;;color: rgba(69, 90, 100, 0.6);
        font-weight: normal;font-size: 14px;"
          >请选择手机电量状态</h2>
          <van-row>
            <van-col span="24">
              <van-dropdown-menu>
                <van-dropdown-item
                  v-model="phone_electricity_status_value"
                  :options="phoneElectricityStatusList"
                />
              </van-dropdown-menu>
            </van-col>
          </van-row>
        </section>
        <section style="display: block;" class="van-doc-demo-block">
          <h2
            style="padding-top: 20px;margin: 0;padding: 15px 8px 8px;;color: rgba(69, 90, 100, 0.6);
        font-weight: normal;font-size: 14px;"
          >请选择手机屏幕方向锁定</h2>
          <van-row>
            <van-col span="24">
              <van-dropdown-menu>
                <van-dropdown-item
                  v-model="phone_screen_orientation_lock_value"
                  :options="phoneScreenOrientationLockList"
                />
              </van-dropdown-menu>
            </van-col>
          </van-row>
        </section>
        <section style="display: block;" class="van-doc-demo-block">
          <h2
            style="padding-top: 20px;margin: 0;padding: 15px 8px 8px;;color: rgba(69, 90, 100, 0.6);
        font-weight: normal;font-size: 14px;"
          >请选择手机屏幕关闭开启状态</h2>
          <van-row>
            <van-col span="24">
              <van-dropdown-menu>
                <van-dropdown-item
                  v-model="phone_screen_open_status_value"
                  :options="phoneScreenOpenStatusList"
                />
              </van-dropdown-menu>
            </van-col>
          </van-row>
        </section>
        <section style="display: block;" class="van-doc-demo-block">
          <h2
            style="padding-top: 20px;margin: 0;padding: 15px 8px 8px;;color: rgba(69, 90, 100, 0.6);
        font-weight: normal;font-size: 14px;"
          >请选择手势动作</h2>
          <van-row>
            <van-col span="24">
              <van-dropdown-menu>
                <van-dropdown-item
                  v-model="phone_gesture_action_value"
                  :options="phoneGestureActionList"
                />
              </van-dropdown-menu>
            </van-col>
          </van-row>
        </section>
      </van-tab>
    </van-tabs>
    <!-- <div style="flex:1;"> -->
    <div>
      <div class="submit_message_text">提交信息</div>
      <van-row class="border_class">
        <van-col span="24">图片/视频</van-col>
        <van-uploader
          :max-count="9"
          preview-size="50px"
          v-model="fileList"
          accept="image/*, video/*"
          multiple
        />
        <van-col span="24">文字描述</van-col>
        <van-col span="24">
          <textarea style="width:100%;height:120px;border:0" v-model="test_comments" />
        </van-col>
      </van-row>
      <van-row style="padding:8px">
        <van-col span="10" offset="6">
          <van-button size="large" round type="info" @click="clickCreateIssue">提交</van-button>
        </van-col>
      </van-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userId: null,
      username: "",
      version: "",
      phoneIos: "",
      phoneModel: "",
      phoneBrand: "",
      level_value: null,
      clazz_value: null,
      phone_status_value: 0,
      phone_sound_category_value: 0,
      Phone_sound_status_value: 0,
      microphone_status_value: 0,
      microphone_category_value: 0,
      phone_camera_status_value: 0,
      phone_storage_status_value: 0,
      phone_electricity_status_value: 0,
      phone_screen_orientation_lock_value: 0,
      phone_screen_open_status_value: 0,
      phone_gesture_action_value: 0,
      network_status_value: null,
      network_category_value: null,
      stage_value: null,
      issue_category_value: null,
      menu_value: null,
      fail_rate_value: null,
      test_comments: "",
      system_value: 0,
      levelList: [
        { text: "学生", value: 0 },
        { text: "vip学生", value: 1 },
        { text: "老师", value: 2 },
        { text: "认证老师", value: 3 }
      ],
      clazzList: [
        { text: "高", value: 0 },
        { text: "中", value: 1 },
        { text: "低", value: 2 }
      ],
      networkStatusList: [
        { text: "有网络", value: 0 },
        { text: "无网络", value: 1 },
        { text: "切换到WIFI", value: 2 },
        { text: "切换到移动", value: 3 }
      ],
      networkCategoryList: [
        { text: "WIFI", value: 0 },
        { text: "4G", value: 1 }
      ],
      stageList: [
        { text: "小学", value: 0 },
        { text: "初中", value: 1 },
        { text: "高中", value: 2 },
        { text: "大学", value: 3 },
        { text: "留学", value: 4 },
        { text: "幼儿", value: 5 }
      ],
      issueCategoryList: [
        { text: "技术", value: 0 },
        { text: "内容", value: 1 },
        { text: "界面", value: 2 },
        { text: "其他", value: 3 }
      ],
      menuList: [
        { text: "单词学习", value: 0 },
        { text: "同步学习", value: 1 },
        { text: "组卷", value: 2 },
        { text: "考试分析", value: 3 },
        { text: "我", value: 4 }
      ],
      phoneStatusList: [
        { text: "系统正常运行", value: 0 },
        { text: "系统中断后功能恢复:长时间不用休眠唤醒后", value: 1 },
        { text: "系统中断后功能恢复:突然来电话接听后", value: 2 },
        { text: "系统中断后功能恢复:突然来短信", value: 3 },
        { text: "系统中断后功能恢复:进入锁屏后解锁", value: 4 },
        { text: "系统中断后功能恢复:切换到后台再回来", value: 5 },
        { text: "系统中断后功能恢复:进入锁屏后解锁", value: 6 },
        { text: "系统中断后功能恢复:按power按键挂起系统后", value: 7 },
        { text: "系统中断后功能恢复:使用过程中强行关机", value: 8 }
      ],
      phoneSoundCategoryList: [
        { text: "喇叭", value: 0 },
        { text: "静音", value: 1 },
        { text: "耳机", value: 2 },
        { text: "蓝牙耳机", value: 3 }
      ],
      PhoneSoundStatusList: [
        { text: "插入耳机(播放声音前)", value: 0 },
        { text: "插入耳机(播放声音中)", value: 1 },
        { text: "使用蓝牙耳机(播放声音中)", value: 2 },
        { text: "使用蓝牙耳机(播放声音中)", value: 3 },
        { text: "拔出耳机(播放声音时)", value: 4 },
        { text: "断开蓝牙耳机(播放声音时)", value: 5 },
        { text: "开启静音(播放声音前)", value: 6 },
        { text: "开启静音(播放声音中)", value: 7 },
        { text: "取消静音(播放声音前)", value: 8 },
        { text: "取消静音(播放声音中)", value: 9 },
        { text: "增加音量(播放声音前)", value: 10 },
        { text: "增加音量(播放声音中)", value: 11 },
        { text: "减少音量(播放声音前)", value: 12 },
        { text: "减少音量(播放声音中)", value: 13 }
      ],
      microphoneStatusList: [
        { text: "各类麦克风功能正常", value: 0 },
        { text: "各类麦克风间切换(麦克风使用过程中)", value: 1 },
        { text: "无麦克风访问权限", value: 2 }
      ],
      microphoneCategoryList: [
        { text: "本机麦克风", value: 0 },
        { text: "耳机麦克风", value: 1 },
        { text: "蓝牙耳机麦克风", value: 2 }
      ],
      phoneCameraStatusList: [
        { text: "前置摄像头", value: 0 },
        { text: "后置摄像头", value: 1 },
        { text: "APP无访问权限", value: 2 }
      ],
      phoneStorageStatusList: [
        { text: "空间充足", value: 0 },
        { text: "空间不足", value: 1 },
        { text: "APP无访问权限", value: 2 }
      ],
      phoneElectricityStatusList: [
        { text: "正常电量", value: 0 },
        { text: "低电量", value: 1 },
        { text: "电量不足自动关机", value: 2 },
        { text: "充电时", value: 3 }
      ],
      phoneScreenOrientationLockList: [
        { text: "横竖屏锁定未开启", value: 0 },
        { text: "横屏锁定开启", value: 1 },
        { text: "竖屏锁定开启", value: 2 }
      ],
      phoneScreenOpenStatusList: [
        { text: "轻按Power键关闭屏幕", value: 0 },
        { text: "自动进入休眠后再开启", value: 1 }
      ],
      phoneGestureActionList: [
        { text: "点击", value: 0 },
        { text: "滑动", value: 1 },
        { text: "放大", value: 2 },
        { text: "缩小", value: 3 }
      ],
      systemList: [{ text: "IOS", value: 0 }, { text: "Android", value: 1 }],
      failRateList: [{ text: "偶尔", value: 0 }, { text: "每次", value: 1 }],
      fileList: []
    };
  },

  methods: {
    clickCreateIssue() {
      if (this.checkNullString(this.username)) {
        this.$toast.fail({
          message: "米奇账号不能为空",
          forbidClick: true,
          closeOnClick: true,
          duration: 1000
        });
        return;
      }
      if (this.checkNullString(this.version)) {
        this.$toast.fail({
          message: "版本号不能为空",
          forbidClick: true,
          closeOnClick: true,
          duration: 1000
        });
        return;
      }
      if (this.checkNullString(this.phoneModel)) {
        this.$toast.fail({
          message: "手机型号不能为空",
          forbidClick: true,
          closeOnClick: true,
          duration: 1000
        });
        return;
      }
      if (this.checkNullString(this.phoneIos)) {
        this.$toast.fail({
          message: "系统版本不能为空",
          forbidClick: true,
          closeOnClick: true,
          duration: 1000
        });
        return;
      }
      if (this.checkNullString(this.phoneBrand)) {
        this.$toast.fail({
          message: "手机品牌不能为空",
          forbidClick: true,
          closeOnClick: true,
          duration: 1000
        });
        return;
      }

      if (isNaN(this.level_value)) {
        this.$toast.fail({
          message: "请选择身份",
          forbidClick: true,
          closeOnClick: true,
          duration: 1000
        });
        return;
      }
      if (isNaN(this.clazz_value)) {
        this.$toast.fail({
          message: "请选择严重度",
          forbidClick: true,
          closeOnClick: true,
          duration: 1000
        });
        return;
      }
      if (isNaN(this.network_status_value)) {
        this.$toast.fail({
          message: "请选择网络状态",
          forbidClick: true,
          closeOnClick: true,
          duration: 1000
        });
        return;
      }
      if (this.checkNull(this.network_category_value)) {
        this.$toast.fail({
          message: "请选择网络分类",
          forbidClick: true,
          closeOnClick: true,
          duration: 1000
        });
        return;
      }
      if (this.checkNull(this.stage_value)) {
        this.$toast.fail({
          message: "请选择学段",
          forbidClick: true,
          closeOnClick: true,
          duration: 1000
        });
        return;
      }
      if (this.checkNull(this.issue_category_value)) {
        this.$toast.fail({
          message: "请选择问题分类",
          forbidClick: true,
          closeOnClick: true,
          duration: 1000
        });
        return;
      }
      if (this.checkNull(this.menu_value)) {
        this.$toast.fail({
          message: "请选择菜单",
          forbidClick: true,
          closeOnClick: true,
          duration: 1000
        });
        return;
      }
      if (this.checkNull(this.fail_rate_value)) {
        this.$toast.fail({
          message: "请选择出错率",
          forbidClick: true,
          closeOnClick: true,
          duration: 1000
        });
        return;
      }
      if (this.fileList != null && this.fileList.length > 0) {
        //判断fileList是不是同时包含视频和图片
        var hasImage = false;
        var hasVideo = false;
        var hasOtherFile = false;
        for (var i = 0; i < this.fileList.length; i++) {
          let file = this.fileList[i];
          if(parseInt(file.file.size)>=parseInt(20971520)){
            this.$toast("文件不能大于20M");
            return;
          }
          if (file.file.type == "" || file.file.type == undefined) {
            this.$toast("文件后缀名不能为空");
            return;
          }
          switch (file.file.type) {
            case "video/mp4":
              hasVideo = true;
              break;
            case "video/quicktime":
              hasVideo = true;
              break;
            case "image/png":
              hasImage = true;
              break;
            case "image/jpeg":
              hasImage = true;
              break;
            case "image/heic":
              hasImage = true;
              break;
            default:
              hasOtherFile = true;
              break;
          }
        }
        if (hasOtherFile) {
          this.$toast("请选择图片或视频");
          return;
        }
        this.uploadFile();
      } else {
        this.createIssue("");
      }
    },
    initDefaultData() {
      this.phoneIos = localStorage.getItem("phoneIos");
      this.phoneModel = localStorage.getItem("phoneModel");
      this.username = localStorage.getItem("username");
      this.phoneBrand = localStorage.getItem("phoneBrand");
      var num = parseInt(localStorage.getItem("system_value"));
      this.system_value = isNaN(num) ? 0 : num;
      this.level_value = parseInt(localStorage.getItem("level"));
      this.clazz_value = parseInt(localStorage.getItem("clazz"));
      this.network_status_value = parseInt(
        localStorage.getItem("network_status_value")
      );
      var user = JSON.parse(sessionStorage.getItem("user"));
      if (user != null) {
        this.userId = user.userId;
      }
    },
    saveDefaultData() {
      localStorage.setItem("phoneIos", this.phoneIos);
      localStorage.setItem("phoneModel", this.phoneModel);
      localStorage.setItem("phoneBrand", this.phoneBrand);
      localStorage.setItem("system_value", this.system_value);
      localStorage.setItem("username", this.username);
      localStorage.setItem("level", this.level_value);
      localStorage.setItem("clazz", this.clazz_value);
      localStorage.setItem("network_status_value", this.network_status_value);
    },
    createIssue(mediaUrlsText) {
      var readyData = {
        clazz: this.clazz_value,
        category: this.issue_category_value + 1,
        creator: this.userId,
        version: this.version,
        phoneBrand: this.phoneBrand,
        phoneIos: this.phoneIos,
        phoneModel: this.phoneModel,
        testComments: this.test_comments,
        phoneStatus: this.phone_status_value,
        phoneSoundStatus: this.Phone_sound_status_value,
        phoneSoundCategory: this.phone_sound_category_value,
        microphoneStatus: this.microphone_status_value,
        microphoneCategory: this.microphone_category_value,
        phoneNetworkStatus: this.network_status_value,
        phoneNetworkCategory: this.network_category_value + 1,
        phoneCameraStatus: this.phone_camera_status_value,
        phoneStorageStatus: this.phone_storage_status_value,
        phoneElectricityStatus: this.phone_electricity_status_value,
        //分辨率
        phoneScreenResolution:
          parseInt(screen.availWidth * window.devicePixelRatio) +
          "*" +
          parseInt(screen.availHeight * window.devicePixelRatio),
        phoneScreenOrientationLock: this.phone_screen_orientation_lock_value,
        phoneScreenOpenStatus: this.phone_screen_open_status_value,
        phoneGestureAction: this.phone_gesture_action_value,
        mediaUrls: mediaUrlsText,
        failRate: this.fail_rate_value + 1,
        mobile: this.username,
        level: this.level_value,
        menu: this.menu_value + 1,
        stage: this.stage_value + 1,
        system: this.systemList[this.system_value].text
      };
      this.showLoading();
      this.axios
        .post("/createIssue", readyData)
        .then(res => {
          if (res.data.status == 0) {
            this.$notify({
              type: "success",
              message: "问题创建成功",
              duration: 0,
              onClick() {
                this.$notify.clear();
              }
            });
            this.saveDefaultData();
            //清除数据
            this.version = "";
            this.stage_value = null;
            this.network_category_value = null;
            this.issue_category_value = null;
            this.menu_value = null;
            this.fail_rate_value = null;
            this.test_comments = "";
            this.fileList = [];
          } else {
            this.$notify({
              type: "danger",
              message: res.data.msg,
              duration: 0,
              onClick() {
                this.$notify.clear();
              }
            });
          }
          this.hideLoading();
        })
        .catch(err => {
          this.hideLoading();
          console.error(err);
        });
    },
    uploadFile() {
      this.showLoading();
      let fd = new FormData();
      if (this.fileList && this.fileList.length) {
        // 判断是否是多图上传 多图则循环添加进去
        this.fileList.forEach(item => {
          fd.append("files", item.file); //第一个参数字符串可以填任意命名，第二个根据对象属性来找到file
        });
      } else {
        fd.append("files", this.fileList.file);
      }
      const axiosAjax = this.axios.create({
        timeout: 1000 * 60, //时间
        withCredentials: true //跨域携带cookie
      });
      axiosAjax
        .post("/file_upload", fd, {
          "Content-Type": "multipart/form-data"
        })
        .then(res => {
          if (res.data.status == 0) {
            this.$notify({ type: "success", message: "文件上传成功" });
            this.createIssue(res.data.data);
          } else {
            this.$notify({ type: "danger", message: "文件上传失败" });
          }
          this.hideLoading();
        })
        .catch(err => {
          this.hideLoading();
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
    },
    checkNull(value) {
      if (value == null) {
        return true;
      }
      return false;
    },
    checkNullString(value) {
      if (value == null || value == undefined || value == "") {
        return true;
      }
      return false;
    }
  },
  created() {
    this.initDefaultData();
  }
};
</script>
<style lang="less">
.van-col {
  font-size: 14px;
  padding: 5px;
}
.dropdown_text {
  text-align-last: center;
  padding-top: 18px !important;
}
.submit_message_text {
  text-align: center;
  font-weight: bold;
  padding: 8px;
}
.border_class {
  border: 1px solid #ccc !important;
  border-radius: 16px !important;
}
.borderBottomInput {
  .van-cell__value {
    border-bottom: #666 1px solid;
  }
}
</style>