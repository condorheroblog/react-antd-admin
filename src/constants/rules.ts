/* TODO: common 开头的国际化需要移除 */

import { $t } from "#src/locales";
import {
	ALPHA_NUMERIC_ONLY_REGEXP,
	MOBILE_PHONE_REGEXP,
	TELEPHONE_REGEXP,
	UNIFIED_SOCIAL_CREDIT_CODE_REGEXP,
	USERNAME_REGEXP,
} from "./regular-expressions";

export const FORM_REQUIRED = [{ required: true }]; // 表单必填校验

/**
 * 用户名规则验证函数
 */
export function USERNAME_RULE() {
	return {
		pattern: USERNAME_REGEXP,
		message: $t("authority.usernameErrorTip"),
	};
}

/**
 * 密码规则验证函数
 *
 * @returns 返回密码规则验证对象，包含 pattern（正则表达式）和 message（提示信息）
 */
export function PASSWORD_RULE() {
	return {
		pattern: /^(?=.*\d)(?=.*[a-z])[\w~!@#$%^&*+.\-]{8,16}$/i,
		message: $t("authority.passwordStrength"),
	};
}

/**
 * 仅允许字母和数字的规则函数
 *
 * @returns 包含正则模式和错误消息的验证规则对象
 */
export function ALPHA_NUMERIC_ONLY_RULE() {
	return {
		pattern: ALPHA_NUMERIC_ONLY_REGEXP,
		message: $t("common.alphaNumericOnlyRuleMessage"),
	};
}

/**
 * 获取统一社会信用代码校验规则
 *
 * @returns 返回一个包含正则表达式和错误提示信息的对象
 * 其中的 `pattern` 属性表示统一社会信用代码的正则表达式校验规则
 * `message` 属性表示当校验不通过时显示的错误提示信息，通过国际化函数 `t` 获取
 */
export function UNIFIED_SOCIAL_CREDIT_CODE_RULE() {
	return {
		pattern: UNIFIED_SOCIAL_CREDIT_CODE_REGEXP,
		message: $t("common.unifiedSocialCreditCodeRuleMessage"),
	};
}

/**
 * 返回手机验证规则对象
 *
 * @returns 包含验证规则的对象
 */
export function MOBILE_PHONE_RULE() {
	return {
		pattern: MOBILE_PHONE_REGEXP,
		message: $t("authority.mobileErrortip"),
	};
}

export function TELEPHONE_RULE() {
	return {
		pattern: TELEPHONE_REGEXP,
		message: $t("common.mobileErrortip"),
	};
}

export function PHONE_RULE() {
	return {
		validator: (_: unknown, value: string) => {
			// 空值不校验
			if (!value) {
				return Promise.resolve();
			}

			if (MOBILE_PHONE_REGEXP.test(value) || TELEPHONE_REGEXP.test(value)) {
				return Promise.resolve();
			}
			else {
				return Promise.reject($t("common.phoneRuleMessage"));
			}
		},
	};
}
