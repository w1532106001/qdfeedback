<template>
  <van-tabs sticky>
    <van-tab title="单词清单">
      <listen></listen>
    </van-tab>
    <van-tab title="个人统计">
      <listen-count></listen-count>
    </van-tab>
  </van-tabs>
</template>
<script>
import listen from "@/view/issue/listen";
import listenCount from "@/view/issue/listenCount";
export default {
  components: {
    listen,
    listenCount,
  },
  data() {
    return {
      components: {
        listen,
        listenCount,
      },
    };
  },
  methods: {},
  created() {},
};
</script>
<style>
</style>