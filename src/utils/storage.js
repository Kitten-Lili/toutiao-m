/**
 * 封装本地存储
 */

// 存储数据
export const setItem = (key, value) => {
  // 将数组、对象类型的数据转换为 JSON 格式字符串
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

// 获取数据
export const getItem = (key) => {
  const data = window.localStorage.getItem(key)
  // 如何判断一个字符串是 JSON 格式的字符串呢?
  // 直接使用 JSON.parse 进行转换
  try {
    // 如果是则能转换成功
    return JSON.parse(data)
  } catch (err) {
    // 如果不是则执行这一步
    return data
  }
}

// 删除数据
export const removeItem = (key) => {
  window.localStorage.removeItem(key)
}
