import type { RouteMeta } from "#src/router/types";
import type { UIMatch } from "react-router";

import "react-router";

/**
 * Matches the given routes to a location and returns the match data.
 *
 * @see https://reactrouter.com/utils/match-routes
 */

declare module "react-router" {
	function useMatches(): UIMatch<unknown, RouteMeta>[];
}
