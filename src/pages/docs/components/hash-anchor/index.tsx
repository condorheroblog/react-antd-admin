import { Typography } from "antd";
import { createUseStyles } from "react-jss";
import type { TitleProps } from "antd/es/Typography/Title";

interface HashAnchorProps extends TitleProps {
	children: string
}

const { Title } = Typography;

const useStyles = createUseStyles({
	headerAnchor: {
		"position": "relative",
		"& a": {
			opacity: 0,
			position: "absolute",
			left: "-22px",
		},
		"&:hover a": {
			opacity: 1,
		},
	},
});

export function HashAnchor({ children, ...rest }: HashAnchorProps) {
	const classes = useStyles();
	return (
		<Title id={children} className={classes.headerAnchor} {...rest}>
			<a href={`#${children}`} aria-label={`Permalink to ${children}`}>
				#
			</a>
			{children}
		</Title>
	);
}
