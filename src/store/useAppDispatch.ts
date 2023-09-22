import { useDispatch } from "react-redux";
import type { AppDispatch } from "./store";

export function useAppDispatch() {
	return useDispatch<AppDispatch>();
}
