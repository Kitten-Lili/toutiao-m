/**
 * 用户相关请求模块
 */
import request from '@/utils/request'

/**
 * 登录请求
 * 登录成功后会返回两个Token
 * token: 访问令牌, 有效期2小时
 * refresh_token: 刷新令牌, 有效期14天, 用于访问令牌过期之后重新获取新的访问令牌
 */
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
