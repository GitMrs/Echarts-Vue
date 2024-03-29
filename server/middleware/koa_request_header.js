// 设置响应头
module.exports = async (ctx, next) => {
  const contentType = 'application/json; charset=utf-8'
  ctx.set('Content-Type', contentType); // 响应编码
  /**
   * 跨域
   */
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Methods', 'OPTIONS, GET,PUT,POST,DELETE');

  await next();
};