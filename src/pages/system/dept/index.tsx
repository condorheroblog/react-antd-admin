import { BasicContent } from "#src/components";

import { useState } from "react";

export default function Dept() {
	const [count, setCount] = useState(0);

	return (
		<BasicContent>
			<h1>计数器</h1>
			<p>
				当前计数:
				{count}
			</p>
			<div className="flex gap-5">
				<button onClick={() => setCount(count + 1)}>增加</button>
				<button onClick={() => setCount(count - 1)}>减少</button>
			</div>
		</BasicContent>
	);
}
