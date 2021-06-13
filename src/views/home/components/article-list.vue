<template>
  <div class="article-list">
    <van-pull-refresh v-model="isreFreshLoading" success-text="请求成功" @refresh="onRefresh">
      <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败, 点击重新加载"
      @load="onLoad"
      >
        <!-- <van-cell v-for="(article, index) in list" :key="index" :title="article.title" /> -->
        <ArticleItem v-for="(article, index) in list" :key="index" :article="article" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/acticle'
import ArticleItem from '@/components/article-item'
export default {
  name: 'ArticleList', // 组件名
  components: {
    ArticleItem
  }, // 调用组件
  props: { // 引入传递的参数
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [], // 存储列表数据的数组
      loading: false, // 控制加载中的状态
      finished: false, // 控制无数据加载的状态
      timestamp: null, // 请求获取下一页数据的时间戳
      error: false, // 控制列表请求失败的提示状态
      isreFreshLoading: false // 控制下拉刷新的状态
    }
  }, // 绑定属性
  computed: {}, // 计算属性
  watch: {}, // 监听
  created () {}, // 组件实例创建时调用
  mounted () {}, // 组件实例绑定时调用
  methods: {
    async onLoad () {
      try {
        // 获取数据
        const { data } = await getArticles({
          channel_id: this.channel.id, // 频道id
          timestamp: this.timestamp || Date.now(), // 请求数据的页码,按时间来进行请求
          with_top: 1 // 是否包含置顶文章
        })
        // 放入list
        const { results } = data.data
        this.list.push(...results)
        // 数据加载完成后把加载状态设为结束
        this.loading = false
        // 判断是否全部加载完成
        if (results.length) {
          // 更新获取下一页
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    },

    // 当下拉刷新的时候会触发调用该函数
    async onRefresh () {
      try {
        // 获取数据
        const { data } = await getArticles({
          channel_id: this.channel.id, // 频道id
          timestamp: Date.now(), // 获取最新数据
          with_top: 1 // 是否包含置顶文章
        })
        // 将数据追加到列表的顶部
        this.list.unshift(...data.data.results)
      } catch (err) {
        console.log('请求失败', err)
      }
      // 关闭下拉刷新的状态
      this.isreFreshLoading = false
    }
  } // 绑定数据
}
</script>

<style lang="less">
.article-list{
  height: 79vh;
  overflow-y: auto;
}
</style>
