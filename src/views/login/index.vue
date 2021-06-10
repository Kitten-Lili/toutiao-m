<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar title="登录" class="page-nav-bar" />
    <!-- /导航栏 -->

    <!-- 登录表单 -->
    <van-form @submit="onSubmit">
      <van-field
      v-model="user.mobile"
      name="手机号"
      placeholder="请输入手机号"
      :rules="[{ required: true, message: '请填写手机号' }]"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji login-container"></i>
      </van-field>
      <van-field
      v-model="user.code"
      name="验证码"
      placeholder="请输入验证码"
      :rules="[{ required: true, message: '请填写验证码' }]"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma login-container"></i>
        <template #button>
          <van-button round size="small" type="default" class="send-sms-btn">获取验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button block type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
    <!-- /登录表单 -->
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 验证码
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onSubmit () {
      // 获取表单数据
      const user = this.user

      // 表单验证

      // 提交表单请求登录
      try {
        const res = await login(user)
        console.log('登录成功', res)
      } catch (err) {
        if (err.response.status === 400) {
          console.log('手机号或验证码错误')
        } else {
          console.log('登录失败,请稍后再试', err)
        }
      }
      // 根据请求响应结果处理后续操作
    }
  }
}
</script>

<style lang="less">
.login-container {
  font-size: 37px;
}
.send-sms-btn {
  width: 152px;
  height: 46px;
  line-height: 46px;
  background-color: #ededed;
  font-size: 22px;
}
.login-btn-wrap {
  padding: 53px 33px;
  .login-btn {
    background-color: #6db4fb;
    border: none;
  }
}
</style>
