<template>
  <div id="app">
    <keep-alive :include="['mainPage']">
    <router-view />
    </keep-alive>
   
   
  </div>
</template>

<script>
export default {
 
   data() {
    return {
     
    }
  },
  created(){
          this.router.push({ name: 'login'})
  }
  

}
</script>

<style>
body {
  font-size: 16px;
  background-color: #f8f8f8;
  -webkit-font-smoothing: antialiased;
}
</style>
