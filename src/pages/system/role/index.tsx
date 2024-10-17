import { useState } from "react";

export default function Role() {
	const [count, setCount] = useState(0);

	return (
		<>
			<h1>计数器</h1>
			<p>
				当前计数:
				{count}
			</p>
			<button onClick={() => setCount(count + 1)}>增加</button>
			<button onClick={() => setCount(count - 1)}>减少</button>
		</>
	);
}
