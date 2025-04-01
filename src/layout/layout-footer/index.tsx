import { usePreferencesStore } from "#src/store";
import { cn } from "#src/utils";

interface LayoutFooterProps {
	className?: string
}
export default function LayoutFooter({ className }: LayoutFooterProps) {
	const {
		enableFooter,
		companyName,
		companyWebsite,
		copyrightDate,
		ICPNumber,
		ICPLink,
	} = usePreferencesStore();
	if (!enableFooter)
		return null;

	return (
		<footer
			className={cn(
				"h-10 flex-shrink-0 flex items-center justify-center text-xs md:text-sm text-colorTextSecondary",
				className,
			)}
		>
			<span>
				<a href={ICPLink} rel="noreferrer noopener" target="_blank">{ICPNumber}</a>
			</span>
			&nbsp;
			Copyright &copy;
			{copyrightDate}
			<span>
				<a href={companyWebsite} rel="noreferrer noopener" target="_blank">
					&nbsp;
					{companyName}
					&nbsp;
				</a>
			</span>
			All right reserved
		</footer>
	);
}
