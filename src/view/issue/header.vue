<template>
  <div style="height:50px; ">
    <van-nav-bar
      style="	background: #66c6f2;
	background-size: 100% 100%;
	width:100%;
	position: fixed;
	z-index: 999;
	top:0"
      :title="title"
      left-text
      left-arrow
      :z-index="999"
      @click-left="onBack"
    >
    </van-nav-bar>
  </div>
</template>
<script>
import { NavBar } from "vant";
export default {
  name: "headerNav",
  components: {
    [NavBar.name]: NavBar
  },
  props: {
    title: String,
    
  },
  methods: {
    onBack() {
      history.back();
    }
  }
};
</script>
<style>
.van-nav-bar {
  background: #66c6f2;
  background-size: 100% 100%;
  width: 100%;
  position: fixed;
  z-index: 999;
  top: 0;
}
.van-nav-bar__title {
  color: #fff;
}
.van-icon-arrow-left:before {
  content: "\F008";
  color: #fff;
}
.van-icon-user-o:before {
  content: "\F0CC";
  color: #fff;
  font-size: 0.6rem;
}
</style>