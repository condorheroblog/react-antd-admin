/**
 * @zh 将字符串的首字母转换为大写
 * @en Convert the first letter of a string to uppercase
 *
 * @example
 * ```ts
 * console.log(toCapitalizeCase('hello')); // Hello
 * ```
 */
export function toCapitalizeCase(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
