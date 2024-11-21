export const LOGIN = "/login";
export const PRIVACY_POLICY = "/privacy-policy";
export const TERMS_OF_SERVICE = "/terms-of-service";
export const ERROR_403 = "/error/403";
export const ERROR_404 = "/error/404";

/**
 * 白名单路由，1. 不进行权限校验， 2. 不会触发请求用户信息接口
 */
export const ROUTE_WHITE_LIST = new Set([LOGIN, PRIVACY_POLICY, TERMS_OF_SERVICE]);

// 根路由 id
export const ROOT_ROUTE_ID = "root-route";
