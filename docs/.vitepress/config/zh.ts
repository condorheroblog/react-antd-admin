import type { DefaultTheme } from "vitepress";
import { defineConfig } from "vitepress";

export const zh = defineConfig({
	lang: "zh-Hans",
	description: "React Antd Admin | 企业级管理系统框架",

	themeConfig: {
		nav: nav(),

		sidebar: {
			"/zh/guide/": { base: "/zh/guide/", items: sidebarGuide() },
		},

		editLink: {
			pattern: "https://github.com/condorheroblog/react-antd-admin/edit/main/docs/:path",
			text: "在 GitHub 上编辑此页面",
		},

		footer: {
			message: "基于 MIT 许可发布",
			copyright: `版权所有 © 2023-${new Date().getFullYear()} CondorHero`,
		},

		docFooter: {
			prev: "上一页",
			next: "下一页",
		},

		outline: {
			label: "页面导航",
		},

		lastUpdated: {
			text: "最后更新于",
			formatOptions: {
				dateStyle: "short",
				timeStyle: "medium",
			},
		},

		langMenuLabel: "多语言",
		returnToTopLabel: "回到顶部",
		sidebarMenuLabel: "菜单",
		darkModeSwitchLabel: "主题",
		lightModeSwitchTitle: "切换到浅色模式",
		darkModeSwitchTitle: "切换到深色模式",
	},
});

function nav(): DefaultTheme.NavItem[] {
	return [
		{
			text: "在线预览",
			link: "https://condorheroblog.github.io/react-antd-admin/",
		},
		{
			text: "指南",
			link: "/zh/guide/introduction/",
			activeMatch: "/zh/guide/",
		},
		{
			text: "赞助",
			link: "/zh/sponsor/",
			activeMatch: "/zh/sponsor/",
		},
	];
}

function sidebarGuide(): DefaultTheme.SidebarItem[] {
	return [
		{
			text: "简介",
			items: [
				{ text: "介绍", link: "introduction" },
				{
					link: "introduction/why",
					text: "为什么选择我们",
				},
				{ text: "快速开始", link: "introduction/quick-start" },
			],
		},
		{
			text: "基础",
			items: [
				{ text: "目录结构", link: "fundamentals/directory-structure" },
				{ text: "路由和菜单", link: "fundamentals/routing" },
				{ text: "图标", link: "fundamentals/icon" },
				{ text: "样式", link: "fundamentals/style" },
				{ text: "请求", link: "fundamentals/request" },
				{ text: "Mock", link: "fundamentals/mock" },
				{ text: "构建和部署", link: "fundamentals/build" },
				{ text: "配置", link: "fundamentals/settings" },
			],
		},
		{
			text: "进阶",
			items: [
				{ text: "国际化", link: "advanced/locale" },
				{ text: "权限", link: "advanced/access" },
				{ text: "主题", link: "advanced/theme" },
				{ text: "应用 Loading", link: "advanced/loading" },
				{ text: "监控网站更新", link: "advanced/monitoring-updates" },
				{ text: "项目升级", link: "advanced/upgrading" },
			],
		},
	];
}

export const search: DefaultTheme.AlgoliaSearchOptions["locales"] = {
	zh: {
		placeholder: "搜索文档",
		translations: {
			button: {
				buttonText: "搜索文档",
				buttonAriaLabel: "搜索文档",
			},
			modal: {
				searchBox: {
					resetButtonTitle: "清除查询条件",
					resetButtonAriaLabel: "清除查询条件",
					cancelButtonText: "取消",
					cancelButtonAriaLabel: "取消",
				},
				startScreen: {
					recentSearchesTitle: "搜索历史",
					noRecentSearchesText: "没有搜索历史",
					saveRecentSearchButtonTitle: "保存至搜索历史",
					removeRecentSearchButtonTitle: "从搜索历史中移除",
					favoriteSearchesTitle: "收藏",
					removeFavoriteSearchButtonTitle: "从收藏中移除",
				},
				errorScreen: {
					titleText: "无法获取结果",
					helpText: "你可能需要检查你的网络连接",
				},
				footer: {
					selectText: "选择",
					navigateText: "切换",
					closeText: "关闭",
					searchByText: "搜索提供者",
				},
				noResultsScreen: {
					noResultsText: "无法找到相关结果",
					suggestedQueryText: "你可以尝试查询",
					reportMissingResultsText: "你认为该查询应该有结果？",
					reportMissingResultsLinkText: "点击反馈",
				},
			},
		},
	},
};
