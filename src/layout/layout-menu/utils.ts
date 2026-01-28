import type { ReactElement } from "react";

import type { MenuItemType } from "./types";
import { isString } from "#src/utils/is";
import { cloneElement, isValidElement } from "react";

/**
 * 将菜单树中的所有 label 转换为国际化文本
 * @param menus 原始菜单数组
 * @param t Translation 函数
 * @returns 转换后的菜单数组
 */
export function translateMenus(menus: MenuItemType[], t: (key: string) => string): MenuItemType[] {
	return menus.map((menu) => {
		let translatedLabel: React.ReactNode = menu.label;
		if (isValidElement(menu.label)) {
			const translatedChildren = t((menu.label as ReactElement<{ children: string }>).props.children);
			translatedLabel = cloneElement(menu.label, {}, translatedChildren ?? "");
		}
		if (isString(menu.label)) {
			translatedLabel = t(menu.label);
		}
		const translatedMenu = {
			...menu,
			label: translatedLabel,
		};

		if (menu.children && menu.children.length > 0) {
			translatedMenu.children = translateMenus(menu.children, t);
		}

		return translatedMenu;
	});
}

/**
 * 通过路径查找菜单
 *
 * @param list 菜单列表
 * @param path 菜单路径
 * @returns 找到的菜单对象，未找到则返回 null
 */
export function findMenuByPath(
	list: MenuItemType[],
	path?: string,
): MenuItemType | null {
	for (const menu of list) {
		if (menu.key === path) {
			return menu;
		}
		const findMenu = menu.children && findMenuByPath(menu.children, path);
		if (findMenu) {
			return findMenu;
		}
	}
	return null;
}

/**
 * 通过路径查找根菜单
 *
 * @param menus 菜单列表
 * @param path 菜单路径，可选
 * @returns 包含查找到的菜单、根菜单和根菜单路径的对象
 */
export function findRootMenuByPath(menus: MenuItemType[], path?: string): {
	findMenu: MenuItemType | null
	rootMenu: MenuItemType | null
	rootMenuPath: string | null
} {
	// 初始化返回值
	let findMenu: MenuItemType | null = null;
	let rootMenu: MenuItemType | null = null;
	let rootMenuPath: string | null = null;

	// 如果没有提供路径，返回默认值
	if (!path) {
		return {
			findMenu: null,
			rootMenu: null,
			rootMenuPath: null,
		};
	}

	// 递归查找函数
	const find = (
		list: MenuItemType[],
		targetPath: string,
		parents: MenuItemType[] = [],
	): boolean => {
		for (const menu of list) {
			// 如果找到目标菜单
			if (menu.key === targetPath) {
				findMenu = menu;
				// 如果没有父级菜单，说明当前菜单就是根菜单
				if (parents.length === 0) {
					rootMenu = menu;
					rootMenuPath = menu.key;
				}
				else {
					// 获取最顶层的父级菜单
					rootMenu = parents[0];
					rootMenuPath = parents[0].key;
				}
				return true;
			}

			// 如果有子菜单，继续递归查找
			if (menu.children && menu.children.length > 0) {
				// 将当前菜单加入父级菜单数组
				const found = find(menu.children, targetPath, [...parents, menu]);
				if (found) {
					return true;
				}
			}
		}
		return false;
	};

	// 开始查找
	find(menus, path);

	return {
		findMenu,
		rootMenu,
		rootMenuPath,
	};
}

/**
 * 递归查找第一个子菜单路径下的最深层级的第一个菜单项
 *
 * @param splitSideNavItems 菜单列表
 * @returns 找到的最深层级的第一个菜单项
 */
export function findDeepestFirstItem(splitSideNavItems: MenuItemType[]): MenuItemType | null {
	// 如果列表为空，返回 null
	if (!splitSideNavItems || splitSideNavItems.length === 0) {
		return null;
	}

	// 获取第一个菜单项
	const firstItem = splitSideNavItems[0];

	// 如果当前项有子菜单，继续递归查找
	if (firstItem.children && firstItem.children.length > 0) {
		return findDeepestFirstItem(firstItem.children);
	}

	// 如果没有子菜单了，说明到达最底层，返回当前项
	return firstItem;
}

/**
 * 获取菜单项中所有键及其对应的层级
 *
 * @param menuItems1 菜单项数组
 * @returns 一个对象，键为菜单项的 key，值为菜单项的层级
 */
export function getLevelKeys(menuItems1: MenuItemType[]) {
	const key: Record<string, number> = {};
	const func = (menuItems2: MenuItemType[], level = 1) => {
		menuItems2.forEach((item) => {
			if (item.key) {
				key[item.key] = level;
			}
			if (item.children) {
				func(item.children, level + 1);
			}
		});
	};
	func(menuItems1);
	return key;
};

/**
 * 获取菜单项的父级键
 *
 * @param menuItems 菜单项数组
 * @returns 返回记录每个菜单项键对应的父级键数组的对象
 */
export function getParentKeys(menuItems: MenuItemType[]): Record<string, string[]> {
	const parentKeyMap: Record<string, string[]> = {};

	function traverse(items: MenuItemType[], parentKeys: string[] = []) {
		for (const item of items) {
			// 记录当前 key 的父级 key 数组
			parentKeyMap[item.key] = [...parentKeys];

			// 如果有子节点，递归遍历
			if (Array.isArray(item.children) && item.children.length) {
				traverse(item.children, [...parentKeys, item.key]);
			}
		}
	}

	traverse(menuItems);
	return parentKeyMap;
}
