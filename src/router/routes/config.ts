/**
 * 是否开启动态路由，开启之后，路由是后端动态生成的
 *
 * 注意：
 * 1. 开启情况下，不会读取 src/router/routes/modules 目录下的路由
 * 2. 关闭情况下，会尝试读取 src/router/routes/modules 目录下的路由，便于调试
 */
export const isDynamicRoutingEnabled = true;
/**
 * 开启动态路由情况下，是否发送路由请求获取动态路由数据
 *
 * 如果设置为 false，则不会单独发送一个请求获取动态路由数据，而是从登录请求中获取动态路由数据
 * 如果设置为 true，则会发送一个请求获取动态路由数据
 */
export const isSendRoutingRequest = true;
