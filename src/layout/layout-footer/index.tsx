import { cn } from "#src/utils";

interface LayoutFooterProps {
	className?: string
}
export default function LayoutFooter({ className }: LayoutFooterProps) {
	return (
		<footer
			className={cn(
				"h-10 flex-shrink-0 flex items-center justify-center text-xs md:text-sm",
				className,
			)}
		>
			Copyright &copy; 2023 Condor Hero All right reserved
		</footer>
	);
}
