import type { ReactNode } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnReconnect: false, // 重连时不重新请求
			refetchOnWindowFocus: false, // 窗口焦点变化时不重新请求
			retry: 3, // 重试次数
			staleTime: 5 * 60 * 1000, // 5 分钟内数据不会重新请求
			gcTime: 5 * 60 * 1000, // 数据过期时间，超过 5 分钟后会被清理
		},
	},
});

export interface TanstackQueryProps {
	children: ReactNode
}

export function TanstackQuery({ children }: TanstackQueryProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			{children}
		</QueryClientProvider>
	);
}
