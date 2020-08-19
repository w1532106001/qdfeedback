// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant';
import 'vant/lib/index.css';
import axios from 'axios'
import qs from 'qs'
import md5 from 'js-md5';
import VideoPlayer from 'vue-video-player'
import moment from 'moment'
import VueFab from 'vue-float-action-button'
import './assets/iconfont/iconfont.css'

require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)

Vue.use(VueFab,  {
  // opitons 可选iconfont图标或MaterialIcons
  iconType: 'MaterialDesign'
  // iconType: 'iconfont'
} )

Vue.use(Vant);
Vue.config.productionTip = false
Vue.prototype.$ajax = axios
Vue.prototype.axios = axios;
Vue.prototype.$qs = qs
Vue.prototype.$md5 = md5;
Vue.prototype.router = router;

// axios 配置

axios.defaults.timeout = 5000;

//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

// axios.defaults.headers.post['Content-Type'] = 'json';

axios.defaults.baseURL = '/index';

// axios.defaults.baseURL = 'http://106.14.191.77:9003/index';



new Vue({
  router,
  el:'#app',render: h => h(App)
})
