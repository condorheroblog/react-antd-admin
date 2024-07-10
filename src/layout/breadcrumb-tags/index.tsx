import type { GlobalToken } from "antd";
import { RedoOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Dropdown, Tabs } from "antd";
import { createUseStyles } from "react-jss";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useBreadcrumbTagsStore, useUserStore } from "#src/store";
import { routeModuleList } from "#src/router";
import { searchRoute } from "#src/utils";

const useStyles = createUseStyles((theme: GlobalToken) => {
	return {
		tabsContainer: {
			backgroundColor: theme.colorBgBase,
			borderTop: "1px solid #e8e8e8",
			borderBottom: "1px solid #e8e8e8",
			paddingRight: "1em",
		},
		tab: {
			"& .ant-tabs-nav-list": {
				gap: "0.5em",
			},
			"& .ant-tabs-nav": {
				"margin": 0,
				"& .ant-tabs-tab": {
					paddingTop: "0.3em !important",
					paddingBottom: "0.3em !important",
				},
			},
			"& .ant-tabs-ink-bar": {
				backgroundColor: theme.colorPrimary,
				visibility: "visible !important",
			},
		},
	};
});

export default function BreadcrumbTags() {
	const classes = useStyles();
	const { pathname } = useLocation();
	const navigate = useNavigate();

	const { lng } = useUserStore();
	const { visitedTags, addVisitedTags, deleteVisitedTags } = useBreadcrumbTagsStore();

	const [activeKey, setActiveKey] = useState(pathname);

	const handleReload = () => {
		location.reload();
	};

	const handleChangeTabs = (key: string) => {
		setActiveKey(key);
		navigate(key);
	};

	const handleEditTabs = (key: React.MouseEvent | React.KeyboardEvent | string) => {
		if (key === activeKey) {
			const targetPath = Array.from(visitedTags).at(-2)!;
			navigate(targetPath);
		}
		deleteVisitedTags(key as string);
	};

	useEffect(() => {
		const currRoute = searchRoute(routeModuleList, pathname);
		if (currRoute && currRoute.path) {
			addVisitedTags(currRoute.path);
		}
		setActiveKey(pathname);
	}, [pathname]);

	return (
		<div className={classes.tabsContainer}>
			<Tabs
				key={lng}
				className={classes.tab}
				size="small"
				hideAdd
				animated
				onChange={handleChangeTabs}
				activeKey={activeKey}
				type="editable-card"
				onEdit={handleEditTabs}
				items={Array.from(visitedTags).map((tagItem, tagIndex) => {
					const currRoute = searchRoute(routeModuleList, tagItem);
					return { key: tagItem, label: currRoute?.handle?.title, closable: !!tagIndex };
				})}
				tabBarExtraContent={{
					right: (
						<Button
							icon={<RedoOutlined />}
							size="small"
							onClick={() => handleReload()}
						/>
					),
				}}
			/>
		</div>
	);
}
