import type { NotificationItem } from "./types";

import { fetchNotifications } from "#src/api/notifications";

import { useEffect, useState } from "react";
import { NotificationPopup } from "./index";

export function NotificationContainer() {
	const [notifications, setNotifications] = useState<NotificationItem[]>([]);

	useEffect(() => {
		fetchNotifications().then((res) => {
			setNotifications([...res.result, ...res.result, ...res.result, ...res.result, ...res.result, ...res.result, ...res.result, ...res.result, ...res.result, ...res.result, ...res.result, ...res.result, ...res.result, ...res.result, ...res.result, ...res.result, ...res.result, ...res.result, ...res.result, ...res.result]);
		});
	}, []);

	return (
		<NotificationPopup notifications={notifications} />
	);
}
