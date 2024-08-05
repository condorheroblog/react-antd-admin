import { createUseStyles } from "react-jss";
import { useNavigate } from "react-router-dom";
import { Typography } from "antd";

import logo from "#src/assets/images/logo.svg";

const { Title } = Typography;

const useStyles = createUseStyles({
	logoContainer: {
		"display": "flex",
		"justifyContent": "center",
		"alignItems": "center",
		"gap": "0.5em",
		"height": "3.5em",
		"&:hover": {
			cursor: "pointer",
		},
	},
	logo: {
		width: "2.4em",
	},
});

export interface LogoProps {
	collapsed: boolean
}

export default function Logo({ collapsed }: LogoProps) {
	const classes = useStyles();
	const navigate = useNavigate();

	return (
		<div className={classes.logoContainer} onClick={() => navigate(import.meta.env.VITE_BASE_HOME_PATH)}>
			<img src={logo} alt="logo" className={classes.logo} />

			{collapsed
				? null
				: (
					<Title level={1} className="!text-sm !m-0" ellipsis={true}>React Antd Admin</Title>
				)}
		</div>
	);
}
