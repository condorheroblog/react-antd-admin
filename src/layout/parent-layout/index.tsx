import { Outlet } from "react-router-dom";
import { Suspense } from "react";

export default function ParentLayout() {
	return (
		<Suspense>
			<Outlet />
		</Suspense>
	);
}
