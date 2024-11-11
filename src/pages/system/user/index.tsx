import { BasicContent } from "#src/components";

import { Input } from "antd";

export default function User() {
	return (
		<BasicContent>
			<h1>User</h1>
			<Input placeholder="Enter your username" />
		</BasicContent>
	);
}
