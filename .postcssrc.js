module.exports = {
  plugins: {
    // 使用 postcss-pxtorem 插件
    // 作用：把 px 转为 rem
    'postcss-pxtorem': {
      // lib-flexible 的 REM 适配方案：把一行分为10份
      // 所以 rootValue 应该设置为你的设计稿宽度的十分之一
      // 如果我们的设计稿是750， 所以应该设置为 750 / 10 = 75
      // 但是 Vant 建议设置为 37.5， 因为 Vant 的样式是基于 375 写的
      // 所以必须设置为 37.5， 唯一的缺点就是使用我们的设计稿的尺寸时都必须：尺寸 / 2
      // rootValue: 37.5, // 每份的 px 大小

      // 有没有更好的办法呢?
      // rootValue: 支持数字和函数
      rootValue ({ file }) {
        // postCss-pxtorem 处理每个css文件时都会来调用这个方法
        // 它会把被处理的css文件相关信息通过参数传递给该函数
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },

      // 配置要转换的css属性
      // * 表示所有
      propList: ['*']
    }
  }
}
