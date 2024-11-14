import type { ButtonProps } from "antd";
import type { NotificationItem } from "./types";

import { fetchNotifications } from "#src/api/notifications";

import { useEffect, useState } from "react";
import { NotificationPopup } from "./index";

export function NotificationContainer({ ...restProps }: ButtonProps) {
	const [notifications, setNotifications] = useState<NotificationItem[]>([]);

	useEffect(() => {
		fetchNotifications().then((res) => {
			setNotifications(
				Array.from({ length: 20 }).flatMap(() => res.result),
			);
		});
	}, []);

	return (
		<NotificationPopup
			notifications={notifications}
			{...restProps}
		/>
	);
}
