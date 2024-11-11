import { BasicContent } from "#src/components";
import { HashAnchor } from "#src/pages/docs/components";
import i18nTranslation from "#src/pages/docs/images/guide/i18n-translation.png";
import lokaliseI18nAlly from "#src/pages/docs/images/guide/lokalise.i18n-ally.png";
import lokaliseI18nAllyPlugin from "#src/pages/docs/images/guide/lokalise.i18n-ally-plugin.png";

import { Divider, Image, Typography } from "antd";
import { createUseStyles } from "react-jss";

import { i18nAlly, useInJSX, useInPureJS } from "./constants";

const { Paragraph, Text, Link } = Typography;
const useStyles = createUseStyles({
	alignCenter: {
		textAlign: "center",
	},
});

export default function I18n() {
	const classes = useStyles();

	return (
		<BasicContent>
			<Typography
				style={{
					padding: "0 3em",
				}}
			>
				<HashAnchor>国际化</HashAnchor>
				<Paragraph>
					平台的国际化由下面两个库提供支持：
					<ul>
						<li>
							<Link href="https://www.i18next.com/">i18next</Link>
						</li>
						<li>
							<Link href="https://react.i18next.com/">react-i18next</Link>
						</li>
					</ul>
				</Paragraph>
				<HashAnchor level={2}>VSCode 插件</HashAnchor>
				<Paragraph>
					国际化默认使用的是 JSON 文件，这导致调试和书写非常困难。利用 VSCode 的
					<Text copyable code>
						lokalise.i18n-ally
					</Text>
					插件我们可以获得良好的编写体验和类型提示。
				</Paragraph>

				<Paragraph className={classes.alignCenter}>
					<Image src={lokaliseI18nAllyPlugin} alt="lokalise.i18n-ally plugin" />
				</Paragraph>

				<Paragraph>
					当然不要忘记把下面的 json 代码添加到您本地
					{" "}
					<Text copyable code>
						vscode/settings.json
					</Text>
					文件中：
				</Paragraph>

				<Paragraph>
					<pre>{i18nAlly}</pre>
				</Paragraph>

				<Paragraph>
					<Text>
						正确配置之后，您将会看到如下友好的页面，代码中被翻译的文字，以及侧边栏中构建的翻译字典树：
					</Text>
				</Paragraph>

				<Paragraph className={classes.alignCenter}>
					<Image src={lokaliseI18nAlly} alt="lokalise.i18n-ally" />
				</Paragraph>

				<HashAnchor level={2}>使用国际化</HashAnchor>
				<Paragraph>
					国际化文件默认存储在
					<Text copyable code>
						src/locales
					</Text>
					文件夹下面，打开之后，你将会看到两个文件夹：
					<ul>
						<li>zh-CN（中文）</li>
						<li>en-US（英文）</li>
					</ul>
				</Paragraph>
				<Paragraph>其中 global 文件夹存放的是公共或者全局的翻译文件。</Paragraph>
				<Paragraph>
					其他情况比如新建一个页面那么简单新建一个文件夹来存放就好了。
				</Paragraph>
				<Paragraph>
					根据实践，存放翻译的 JSON 文件最好超过一层，下面两种都是友好的。
				</Paragraph>
				<Paragraph>
					<Image src={i18nTranslation} alt="i18n Translation" />
				</Paragraph>

				<HashAnchor level={2}>在 JSX 中使用</HashAnchor>
				<Paragraph>
					<pre>{useInJSX}</pre>
				</Paragraph>

				<Divider />

				<HashAnchor level={2}>在纯 JS 或 TS 中使用</HashAnchor>
				<Paragraph>
					<pre>{useInPureJS}</pre>
				</Paragraph>
				<Paragraph />
			</Typography>
		</BasicContent>
	);
}
