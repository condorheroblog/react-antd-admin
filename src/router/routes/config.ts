/**
 * 是否开启动态路由，开启之后，前端会发送一个接口请求对接后端返回的路由数据
 *
 * 注意：
 * 1. 开启情况下，不会读取 src/router/routes/modules 目录下的路由
 * 2. 关闭情况下，会尝试读取 src/router/routes/modules 目录下的路由，便于调试
 */
export const isDynamicRoutingEnabled = true;
