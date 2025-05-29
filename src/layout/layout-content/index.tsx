import { GlobalSpin, Scrollbar } from "#src/components";
import { useLayoutContentStyle } from "#src/hooks";
import { LayoutFooter } from "#src/layout";
import { CSS_VARIABLE_LAYOUT_CONTENT_HEIGHT, ELEMENT_ID_MAIN_CONTENT } from "#src/layout/constants";
import { useAccessStore, usePreferencesStore, useTabsStore } from "#src/store";

import { theme } from "antd";
import KeepAlive, { useKeepAliveRef } from "keepalive-for-react";
import { useEffect, useMemo } from "react";

import { useLocation, useOutlet } from "react-router";

export interface LayoutContentProps { }

export default function LayoutContent() {
	const {
		token: { colorBgLayout },
	} = theme.useToken();
	const { pathname, search } = useLocation();
	const outlet = useOutlet();
	const { contentElement } = useLayoutContentStyle();

	const aliveRef = useKeepAliveRef();
	const isRefresh = useTabsStore(state => state.isRefresh);
	const openTabs = useTabsStore(state => state.openTabs);
	const tabbarEnable = usePreferencesStore(state => state.tabbarEnable);
	const flatRouteList = useAccessStore(state => state.flatRouteList);
	const transitionName = usePreferencesStore(state => state.transitionName);
	const transitionEnable = usePreferencesStore(state => state.transitionEnable);
	const enableFooter = usePreferencesStore(state => state.enableFooter);
	const fixedFooter = usePreferencesStore(state => state.fixedFooter);

	/**
	 * to distinguish different pages to cache
	 */
	const cacheKey = useMemo(() => {
		return pathname + search;
	}, [pathname, search]);

	/**
	 * 当使用关闭当前标签页、关闭右侧标签页、关闭左侧标签页、关闭其他标签页、关闭所有标签页功能时，需要清除这个标签页的缓存
	 */
	useEffect(() => {
		const cacheNodes = aliveRef.current?.getCacheNodes?.();
		cacheNodes?.forEach((node) => {
			if (!openTabs.has(node.cacheKey)) {
				aliveRef.current?.destroy(node.cacheKey);
			}
		});
	}, [openTabs]);

	/**
	 * 关闭多 tab 功能，清空所有的缓存页面
	 */
	useEffect(() => {
		if (!tabbarEnable) {
			const cacheNodes = aliveRef.current?.getCacheNodes?.();
			cacheNodes?.forEach((node) => {
				/* 不包含当前页面 */
				if (node.cacheKey !== cacheKey) {
					aliveRef.current?.destroy(node.cacheKey);
				}
			});
		}
	}, [tabbarEnable]);

	/* KeepAlive 的刷新 */
	useEffect(() => {
		/* 仅在启用标签栏时生效 */
		if (tabbarEnable && isRefresh) {
			aliveRef.current?.refresh();
		}
	}, [isRefresh]);

	/* 路由设置 keepAlive = false 则不缓存页面 */
	const keepAliveExclude = useMemo(() => {
		/**
		 * 如果不开启多 tab 功能，则不需要 KeepAlive 功能
		 * 为了保留页面的切换动画，只需要把所有的路由放到 exclude 数组中
		 */
		if (!tabbarEnable) {
			return Object.keys(flatRouteList);
		}
		return Object.entries(flatRouteList).reduce<string[]>((acc, [key, value]) => {
			if (value.handle.keepAlive === false) {
				acc.push(key);
			}
			return acc;
		}, []);
	}, [flatRouteList, tabbarEnable]);

	return (
		<main
			id={ELEMENT_ID_MAIN_CONTENT}
			ref={contentElement}
			className="relative overflow-y-auto overflow-x-hidden flex-grow"
			style={
				{
					backgroundColor: colorBgLayout,
				}
			}
		>
			<Scrollbar>
				<GlobalSpin>
					<div
						className="flex flex-col h-full"
					>
						<div
							style={{
								height: `var(${CSS_VARIABLE_LAYOUT_CONTENT_HEIGHT})`,
							}}
						>
							<KeepAlive
								max={20}
								transition
								duration={300}
								cacheNodeClassName={transitionEnable ? `keepalive-${transitionName}` : undefined}
								exclude={keepAliveExclude}
								activeCacheKey={cacheKey}
								aliveRef={aliveRef}
							>
								{outlet}
							</KeepAlive>
						</div>
						{enableFooter && !fixedFooter ? <LayoutFooter /> : null}
					</div>
				</GlobalSpin>
			</Scrollbar>

		</main>
	);
}
