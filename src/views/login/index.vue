<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar title="登录" class="page-nav-bar" />
    <!-- /导航栏 -->

    <!-- 登录表单 -->
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
      v-model="user.mobile"
      name="mobile"
      placeholder="请输入手机号"
      :rules="userFormRules.mobile"
      type="number"
      maxlength="11"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji login-container"></i>
      </van-field>
      <van-field
      v-model="user.code"
      name="code"
      placeholder="请输入验证码"
      :rules="userFormRules.code"
      type="number"
      maxlength="6"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma login-container"></i>
        <template #button>
          <van-count-down v-if="isCountDownShow" :time=" 1000 * 10" format="ss s" @finish="isCountDownShow = false" />
          <van-button
          v-else
          round
          size="small"
          type="default"
          class="send-sms-btn"
          @click="onSendSms"
          native-type="button"
          >获取验证码
          </van-button>
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
import { login, sendSms } from '@/api/user'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 验证码
      },
      userFormRules: { // 自定义验证表单
        mobile: [{
          required: true,
          message: '请填写手机号'
        }, {
          pattern: /1[3|5|7|8]\d{9}/,
          message: '手机号格式错误'
        }],
        code: [{
          required: true,
          message: '请输入验证码'
        }, {
          pattern: /\d{6}/,
          message: '验证码必须为6位'
        }]
      },
      isCountDownShow: false // 是否展示倒计时
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    // 登录事件
    async onSubmit () {
      // 获取表单数据
      const user = this.user

      // 表单验证

      // 加载提示
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0 // 持续时间, 默认2s, 如果为0, 则一直展示
      })

      // 提交表单请求登录
      try {
        const res = await login(user)
        console.log('登录成功', res)
        this.$toast.success('登录成功')
      } catch (err) {
        if (err.response.status === 400) {
          console.log('手机号或验证码错误')
          this.$toast.fail('手机号或验证码错误')
        } else {
          console.log('登录失败,请稍后再试', err)
          this.$toast.fail('登录失败,请稍后再试')
        }
      }
      // 根据请求响应结果处理后续操作
    },
    // 发送验证码
    async onSendSms () {
      // 1. 校验手机号
      try {
        await this.$refs.loginForm.validate('mobile')
        console.log('验证通过')
      } catch (err) {
        return console.log('验证失败', err)
      }
      // 2. 验证通过, 显示倒计时
      this.isCountDownShow = true
      // 3. 请求发送验证码
      try {
        await sendSms(this.user.mobile)
        // console.log('发送成功', res)
        this.$toast('发送成功')
      } catch (err) {
        if (err.response.status === 429) {
          this.$toast.success('发送太频繁了, 请稍后重试')
        } else {
          this.$toast.fail('发送失败, 请稍后重试')
        }
        this.isCountDownShow = false
      }
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
