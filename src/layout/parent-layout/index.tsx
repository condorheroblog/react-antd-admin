import { Suspense } from "react";
import { useOutlet } from "react-router";

export default function ParentLayout() {
	const currentOutlet = useOutlet();

	return (
		<Suspense>
			{currentOutlet}
		</Suspense>
	);
}
