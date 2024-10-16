import { Suspense } from "react";
import { useOutlet } from "react-router-dom";

export default function ParentLayout() {
	const currentOutlet = useOutlet();

	return (
		<Suspense>
			{currentOutlet}
		</Suspense>
	);
}
