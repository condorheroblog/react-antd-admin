/**
 * 如果在其他地方用到了路由跳转，将路由的 path 抽离出来，在此方便维护
 * 防止修改 path 时忘记修改其他地方的 path
 */

export const loginPath = "/login";
export const privacyPolicyPath = "/privacy-policy";
export const termsOfServicePath = "/terms-of-service";

export const exceptionPath = "/exception";
export const exception403Path = `${exceptionPath}/403`;
export const exception404Path = `${exceptionPath}/404`;
export const exception500Path = `${exceptionPath}/500`;
export const exceptionUnknownComponentPath = `${exceptionPath}/not-found-component`;
