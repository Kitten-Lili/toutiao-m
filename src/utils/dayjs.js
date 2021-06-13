import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn' // 加载中文语言包
import relativeTime from 'dayjs/plugin/relativeTime'
import Vue from 'vue'

// 配置使用 relativeTime 插件处理相对时间
dayjs.extend(relativeTime)
// dayjs默认语言是英文， 我们这里配置为中文
dayjs.locale('zh-cn')
// 获取当前最新时间
// dayjs().format('YYYY-MM-DD')
// 定义一个全局过滤器
// 参数一：过滤器名称
// 参数二：过滤器函数
// 使用方式：{{ 表达式 | 过滤器名称 }}
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
  // return 123
})
