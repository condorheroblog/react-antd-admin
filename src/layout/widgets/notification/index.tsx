import type { ButtonProps } from "antd";
import type { NotificationItem } from "./types";

import { BasicButton } from "#src/components";
import { MailCheckIcon } from "#src/icons";
import { cn } from "#src/utils";

import { BellOutlined } from "@ant-design/icons";
import { useToggle } from "ahooks";
import { List, Popover, Tooltip } from "antd";
import { clsx } from "clsx";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles(({ token }) => (
	{
		notification: {
			"& .ant-popover-inner": {
				padding: 0,
			},
			"& .ant-list-footer": {
				borderTop: `1px solid ${token.colorBorder}`,
			},
			"& .ant-list-items": {
				height: 380,
				overflowY: "auto",
			},
		},
	}
));

type NotificationEventType = "viewAll" | "makeAll" | "clear" | "read";

interface Props extends ButtonProps {
	/**
	 * 显示圆点
	 */
	onEventChange?: (event: NotificationEventType, item?: NotificationItem) => void
	/**
	 * 显示圆点
	 */
	dot?: boolean
	/**
	 * 消息列表
	 */
	notifications?: NotificationItem[]
}

export const NotificationPopup: React.FC<Props> = ({ dot, notifications, onEventChange, ...restProps }) => {
	const [open, action] = useToggle();
	const classes = useStyles();
	const { t } = useTranslation();

	const close = () => {
		action.set(false);
	};

	const handleViewAll = () => {
		onEventChange && onEventChange("viewAll");
		close();
	};

	const handleMakeAll = () => {
		onEventChange && onEventChange("makeAll");
	};

	const handleClear = () => {
		onEventChange && onEventChange("clear");
	};

	const handleClick = (item: NotificationItem) => {
		onEventChange && onEventChange("read", item);
	};

	dot = useMemo(() => {
		return !!notifications?.filter(item => !item.isRead).length;
	}, [notifications]);

	return (
		<Popover
			// getPopupContainer={triggerNode => triggerNode}
			placement="bottomLeft"
			overlayClassName={clsx(classes.notification, "w-72 md:w-96 !right-3")}
			open={open}
			arrow={false}
			trigger="click"
			onOpenChange={action.set}
			content={(

				<List
					size="small"
					bordered
					header={(
						<div className="flex items-center justify-between">
							<div>{t("widgets.notifications")}</div>
							<Tooltip title={notifications?.length ? t("widgets.markAllAsRead") : null}>
								<BasicButton
									disabled={!notifications?.length}
									onClick={handleMakeAll}
									type="text"
									icon={<MailCheckIcon />}
								/>
							</Tooltip>
						</div>
					)}
					footer={(
						<div className="flex items-center justify-between">
							<BasicButton
								disabled={!notifications?.length}
								type="text"
								onClick={handleClear}
							>
								{t("widgets.clearNotifications")}
							</BasicButton>
							<BasicButton onClick={handleViewAll}>
								{t("widgets.viewAll")}
							</BasicButton>
						</div>
					)}
					dataSource={notifications}
					renderItem={item => (
						<List.Item className="relative !justify-start gap-5 hover:!bg-gray-100 cursor-pointer" onClick={() => handleClick(item)}>
							{!item.isRead && <span className="bg-primary absolute right-2 top-2 h-2 w-2 rounded"></span>}
							<span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
								<img src={item.avatar} className="aspect-square h-full w-full object-cover" role="img" />
							</span>
							<div className="flex flex-col gap-1 leading-none">
								<p className="font-semibold">{item.title}</p>
								<p className="text-muted-foreground my-1 line-clamp-2 text-xs">{item.message}</p>
								<p className="text-muted-foreground line-clamp-2 text-xs">{item.date}</p>
							</div>
						</List.Item>
					)}
				/>
			)}
		>

			<BasicButton
				size="large"
				type="text"
				{...restProps}
				className={cn("relative group", restProps.className)}
				icon={<BellOutlined className="group-hover:animate-wiggle" />}
			>
				{dot && <span className="bg-blue-600 absolute right-2 top-1.5 h-2 w-2 rounded"></span>}
			</BasicButton>

		</Popover>
	);
};
