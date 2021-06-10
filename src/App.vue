<template>
  <div id="app">
    <router-view />
    <div>
      <van-button type="primary">主要按钮</van-button>
      <van-button type="info">信息按钮</van-button>
      <van-button type="default">默认按钮</van-button>
      <van-button type="warning">警告按钮</van-button>
      <van-button type="danger">危险按钮</van-button>
    </div>
    <h1>哈哈</h1>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
h1 {
  width: 745px;
  height: 64px;
  background-color: pink;
}
</style>
