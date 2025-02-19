import { loginPath, privacyPolicyPath, termsOfServicePath } from "./extra-info";

/**
 * 白名单路由，1. 不进行权限校验， 2. 不会触发请求用户信息接口
 */
export const ROUTE_WHITE_LIST = new Set([loginPath, privacyPolicyPath, termsOfServicePath]);

// 根路由 id
export const ROOT_ROUTE_ID = "root-route";
