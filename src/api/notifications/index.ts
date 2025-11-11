import type { NotificationItem } from "#src/layout/widgets/notification/types";
import { request } from "#src/utils/request";

export function fetchNotifications() {
	return request
		.get("notifications")
		.json<ApiResponse<NotificationItem[]>>();
}
