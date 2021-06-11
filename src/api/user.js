/**
 * 用户相关请求模块
 */
import request from '@/utils/request'

// 登录请求
export const login = (data) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}

// 获取验证码请求
// 注： 同一手机一分钟内只能发送一次
export const sendSms = (mobile) => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}
