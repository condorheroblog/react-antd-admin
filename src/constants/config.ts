import type { TFunction } from "i18next";

/**
 * @description: 配置项
 */
export const TOKEN = "admin_token"; // token名称
export const LANG = "lang"; // 语言
export const EMPTY_VALUE = "-"; // 空值显示

// 公共组件默认值
export const MAX_TAG_COUNT = "responsive"; // 最多显示多少个标签，responsive：自适应

// 日期格式化
export const DATE_FORMAT = "YYYY-MM-DD";
export const TIME_FORMAT = "YYYY-MM-DD hh:mm:ss";

// 初始化分页数据
export const INITIAL_PAGINATION = {
	current: 1,
	pageSize: 20,
};

// 新增/编辑标题
export const ADD_TITLE = (t: TFunction, title?: string) => t("public.createTitle", { title: title ?? "" });
export const EDIT_TITLE = (t: TFunction, name: string, title?: string) => `${t("public.editTitle", { title: title ?? "" })}${name ? `(${name})` : ""}`;
