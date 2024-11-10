/**
 * 正则大全
 * @see https://any-rule.vercel.app/
 *
 * 你需要的大部分规则可以通过上面的网站生成，然后复制粘贴到你的代码中。
 */

/* ================ Divider ================== */

// 用户名校验，4 到 16 位（字母，数字，下划线，减号）
export const USERNAME_REGEXP = /^[\w-]{4,16}$/;

// 仅包含大写字母、小写字母和数字
export const ALPHA_NUMERIC_ONLY_REGEXP = /^[A-Z0-9]+$/i;

/**
 * @description 统一社会信用代码
 * @see https://creditbj.jxj.beijing.gov.cn/credit-portal/credit_service/legal/search
 *
 * @example 91110105MA0071F38D, 91110105MADDCJMC8C, 91110101MABUT67T06
 */
export const UNIFIED_SOCIAL_CREDIT_CODE_REGEXP = /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/;

/**
 * @description 手机号，只要是 1 开头即可
 *
 * @example 008618311006933, +8617888829981, 19119255642
 */
export const MOBILE_PHONE_REGEXP = /^(?:(?:\+|00)86)?1\d{10}$/;

export const TELEPHONE_REGEXP = /^(?:(?:\d{3}-)?\d{8}|(?:\d{4}-)?\d{7,8})(?:-\d+)?$/;
