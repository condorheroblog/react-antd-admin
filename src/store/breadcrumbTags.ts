import { create } from "zustand";

const initialState = {
	visitedTags: new Set<string>(["/dashboard"]),
};

type TagsState = typeof initialState;

interface TagsAction {
	addVisitedTags: (routePath: string) => void
	deleteVisitedTags: (routePath: string) => void
};

export const useBreadcrumbTagsStore = create<TagsState & TagsAction>(set => ({
	...initialState,

	addVisitedTags: (routePath: string) => {
		return set(state => ({ visitedTags: new Set(state.visitedTags).add(routePath) }));
	},

	deleteVisitedTags: (routePath: string) => {
		return set((state) => {
			const newTags = new Set(state.visitedTags);
			newTags.delete(routePath);
			return { visitedTags: newTags };
		});
	},

}));
