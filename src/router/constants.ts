import { loginPath, privacyPolicyPath, termsOfServicePath } from "./extra-info";

/**
 * 路由白名单 1. 不进行权限校验， 2. 不会触发请求，例如用户信息接口
 * @example "privacy-policy", "terms-of-service" 等
 */
export const ROUTE_WHITE_LIST = new Set([loginPath, privacyPolicyPath, termsOfServicePath]);

// 根路由 id
export const ROOT_ROUTE_ID = "root-route";
