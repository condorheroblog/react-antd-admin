/**
 * 判断给定的值是否为函数类型
 * Determines whether the given value is of the function type
 *
 * @param value 给定的值 / The value to be checked
 * @returns 如果给定的值是函数类型，则返回true；否则返回false / Returns true if the given value is a function type, otherwise returns false
 */
export function isFunction(value: unknown) {
	return typeof value === "function";
}

/**
 * 判断给定的值是否为有限数字
 * Determines whether the given value is a finite number
 *
 * @param value 待判断的值 / The value to be checked
 * @returns 如果给定的值是有限数字，则返回true；否则返回false / Returns true if the given value is a finite number, otherwise returns false
 */
export function isNumber(value: unknown) {
	return typeof value === "number" && Number.isFinite(value);
}

/**
 * 判断一个值是否为字符串类型
 * Determines whether a value is of the string type
 *
 * @param value 待判断的值 / The value to be checked
 * @returns 返回布尔值，表示该值是否为字符串类型 / Returns a boolean value indicating whether the value is of the string type
 */
export function isString(value: unknown) {
	return typeof value === "string";
}

/**
 * 判断给定的值是否为布尔值
 * Determines whether the given value is a boolean value
 *
 * @param value 待判断的值 / The value to be checked
 * @returns 如果给定的值是布尔值，则返回true；否则返回false / Returns true if the given value is a boolean value, otherwise returns false
 */
export function isBoolean(value: unknown) {
	return typeof value === "boolean";
}

/**
 * 判断一个值是否为对象类型（排除null）
 * Determines whether a value is of the object type (excluding null)
 *
 * @param value 待判断的值 / The value to be checked
 * @returns 返回布尔值，表示是否为对象类型 / Returns a boolean value indicating whether the value is of the object type
 */
export function isObject(value: unknown) {
	return typeof value === "object" && value !== null;
}

/**
 * 判断一个值是否为 null
 * Determines whether a value is null
 *
 * @param value 待判断的值 / The value to be checked
 * @returns 如果值为 null，则返回 true；否则返回 false / Returns true if the value is null, otherwise returns false
 */
export function isNull(value: unknown) {
	return value === null;
}

/**
 * 判断一个值是否为 undefined
 * Determines whether a value is undefined
 *
 * @param value 待判断的值 / The value to be checked
 * @returns 如果值为 undefined，则返回 true；否则返回 false / Returns true if the value is undefined, otherwise returns false
 */
export function isUndefined(value: unknown) {
	return value === undefined;
}
