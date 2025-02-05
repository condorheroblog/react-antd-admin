# 监控网站更新 {#monitoring-updates}

## 概述

当网站重新部署，有更新内容时，客户端需要检查更新获取最新的版本。

项目通过定时检查更新提供了这一功能，在 `preferences.ts` 文件中配置 checkUpdatesInterval 和 enableCheckUpdates 字段，以开启和设置检查更新的时间间隔（单位：分钟）。

```ts
/**
 * 默认偏好设置
 */
export const DEFAULT_PREFERENCES = {
	/* ================== Version Monitor ================== */
	checkUpdatesInterval: 1,
	enableCheckUpdates: true,
} satisfies PreferencesState;
```

> 代码在 [version-monitor](https://github.com/condorheroblog/react-antd-admin/tree/main/src/layout/widgets/version-monitor/index.tsx)

## 效果

检测到新版本时，系统会发送一个通知，询问用户是否刷新页面：

![version-monitor.png](/public/guide/version-monitor.png)
