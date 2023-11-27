import "react-router-dom";
import type { UIMatch } from "react-router-dom";
import type { RouteMeta } from "#src/router/types";

interface ApiResponse<T> {
	code: number;
	result: T;
	message: string;
	type: "success" | "error" | "warning" | "info";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Recordable<T = any> = Record<string, T>;

/**
 * Matches the given routes to a location and returns the match data.
 *
 * @see https://reactrouter.com/utils/match-routes
 */

declare module "react-router-dom" {
	function useMatches(): UIMatch<unknown, RouteMeta>[];
}
