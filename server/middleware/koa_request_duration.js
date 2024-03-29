// 计算时长
module.exports = async (ctx,next) => {
  // 记录开始时间
  const start = Date.now();
  // 让内部执行
  await next();
  // 计算结束时间
  const end = Date.now();
  // 设置响应头
  const duration = end - start;
  ctx.set('X-Response-Time', duration + 'ms');
} 