/* eslint-disable import/no-mutable-exports */
import type { MessageInstance } from "antd/es/message/interface";
import type { NotificationInstance } from "antd/es/notification/interface";
import type { ModalStaticFunctions } from "antd/es/modal/confirm";

import {
	App,
	message as antdMessage,
	Modal as antdModal,
	notification as antdNotification,
} from "antd";

let message: MessageInstance = antdMessage;
let notification: NotificationInstance = antdNotification;

const { ...resetFns } = antdModal;
let modal: Omit<ModalStaticFunctions, "warn"> = resetFns;

/**
 * @see https://ant.design/components/app
 * @see https://ant.design/docs/blog/why-not-static
 */
export function StaticAntd() {
	const staticFunctions = App.useApp();

	message = staticFunctions.message;
	notification = staticFunctions.notification;
	modal = staticFunctions.modal;

	return null;
}

export {
	message,
	notification,
	modal,
};
