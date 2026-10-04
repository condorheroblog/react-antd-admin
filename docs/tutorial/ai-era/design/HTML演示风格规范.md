# HTML 演示风格规范（Design System for Slides）

> 版本：v0.1（2026-10-04）
> 适用范围：本课程全部 28 课的 HTML 演示文件
> 性质：**唯一风格标准**。每生成一个 HTML，必须严格基于本文件第十节模板，逐字沿用 Token，不得自由发挥配色与版式。

---

## 1. 审美主张

### 1.1 三个关键词

**克制（Restrained）· 专业（Professional）· 清晰（Clear）**

演示服务于知识传达，视觉噪声是负债。整套幻灯片应像一份排版精良的技术文档，而不是营销海报。

### 1.2 设计原则

1. **内容为王**：每页只表达一个核心观点；文字是主角，装饰是配角。
2. **留白驱动层级**：用间距与字重区分层级，而不是用色块堆叠。
3. **1px 描边 + 单层轻阴影**：卡片、表格统一细线描边，阴影只允许一层且极淡。
4. **短过渡**：页面切换 200–280ms，不做花哨转场。
5. **品牌色只用于强调**：主色出现在序号、关键词、选中态；正文一律中性色。

### 1.3 禁止清单（Anti-patterns）

- 玻璃拟态（backdrop-filter blur）、霓虹发光（glow）、大面积渐变
- 多层阴影、持续脉冲/呼吸动画、emoji 当图标
- 暗色纯黑背景（用深灰）、高饱和撞色
- 每页换一种标题样式、超过 3 种字号同屏出现

---

## 2. 色彩 Token

### 2.1 品牌色（与 antd / 本项目一致）

| Token | 色值 | 用途 |
| --- | --- | --- |
| `--brand-500` | `#1677ff` | 主色：序号、链接、强调、进度条 |
| `--brand-400` | `#4096ff` | 主色亮态（暗色主题用） |
| `--brand-100` | `#e6f4ff` | 主色浅底（chip、选中行） |
| `--brand-700` | `#0958d9` | 主色深态 |

### 2.2 语义色

| Token | 色值 | 用途 |
| --- | --- | --- |
| `--success` | `#52c41a` | 成功、优势、推荐 |
| `--warning` | `#faad14` | 警告、权衡注意 |
| `--danger` | `#ff4d4f` | 错误、风险、淘汰方案 |
| `--info` | `#1677ff` | 信息（同主色） |

### 2.3 中性色阶（亮色主题）

| Token | 色值 | 用途 |
| --- | --- | --- |
| `--text-1` | `rgba(0,0,0,0.88)` | 标题、正文 |
| `--text-2` | `rgba(0,0,0,0.65)` | 次要文字 |
| `--text-3` | `rgba(0,0,0,0.45)` | 辅助说明、占位 |
| `--border` | `#d9d9d9` | 卡片/表格描边 |
| `--split` | `#f0f0f0` | 分隔线 |
| `--bg-canvas` | `#f5f7fa` | 页面底色 |
| `--bg-slide` | `#ffffff` | 幻灯片底 |
| `--bg-muted` | `#fafafa` | 代码块、表头底 |

### 2.4 中性色阶（暗色主题）

| Token | 色值 | 用途 |
| --- | --- | --- |
| `--text-1` | `rgba(255,255,255,0.85)` | 标题、正文 |
| `--text-2` | `rgba(255,255,255,0.65)` | 次要文字 |
| `--text-3` | `rgba(255,255,255,0.45)` | 辅助说明 |
| `--border` | `#303030` | 描边 |
| `--split` | `#262626` | 分隔线 |
| `--bg-canvas` | `#0d0d0d` | 页面底色（非纯黑） |
| `--bg-slide` | `#141414` | 幻灯片底 |
| `--bg-muted` | `#1f1f1f` | 代码块、表头底 |

> 规则：**任何颜色不得硬编码**，一律通过 `var(--token)` 引用。新增颜色必须先回本文件登记。

---

## 3. 字体系统

### 3.1 字体栈

```css
--font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC",
  "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
--font-mono: "SF Mono", "JetBrains Mono", "Fira Code", Menlo, Consolas,
  "Liberation Mono", monospace;
```

### 3.2 字号阶梯（基于 1280×720 画布）

| Token | 尺寸 | 用途 |
| --- | --- | --- |
| `--fs-display` | 44px | 封面主标题 |
| `--fs-h1` | 32px | 页标题 |
| `--fs-h2` | 24px | 分区/卡片标题 |
| `--fs-body` | 18px | 正文（基准） |
| `--fs-small` | 15px | 注释、表格 |
| `--fs-code` | 16px | 代码 |
| `--fs-footer` | 12px | 页脚 |

字重：标题 600、正文 400、强调 500；行高正文 1.7、标题 1.3；同屏字号不超过 3 种。

---

## 4. 间距与形态

### 4.1 间距尺度（4px 基准）

```css
--sp-1: 4px;  --sp-2: 8px;  --sp-3: 12px; --sp-4: 16px;
--sp-5: 24px; --sp-6: 32px; --sp-7: 48px; --sp-8: 64px;
```

- 幻灯片安全边距：左右 64px、上下 56px；
- 卡片内边距 24px；列表项行距 12–16px；
- 留白宁可偏大，不允许内容顶边。

### 4.2 圆角

```css
--r-card: 10px;   /* 卡片 */
--r-chip: 6px;    /* 标签、按钮 */
--r-code: 8px;    /* 代码块 */
```

### 4.3 阴影（单层、极淡）

```css
/* 亮色 */ --shadow-1: 0 1px 2px rgba(0,0,0,0.05), 0 2px 8px rgba(0,0,0,0.06);
/* 暗色 */ --shadow-1: 0 1px 2px rgba(0,0,0,0.4);
```

---

## 5. 画布规范

- **设计基准**：1280 × 720（16:9）；所有元素按此画布标注尺寸。
- **自适应**：JS 按 `min(vw/1280, vh/720)` 整体等比缩放，居中，画布外区域显示 `--bg-canvas`。
- **结构三段**：页眉（课次标签 + 课题，高约 40px）→ 内容区（弹性填充）→ 页脚（课程名 + 进度条 + 页码，28px）。
- 封面页与章节页不显示页眉，页脚保留。

---

## 6. 版式系统（8 种固定版式）

每一页必须归入下列版式之一，不允许出现第 9 种自创版式。

| # | 版式 | 结构与用途 |
| --- | --- | --- |
| 1 | **封面 Cover** | 课程标签 / 大标题 / 副标题 / 作者与日期；主色细线装饰 |
| 2 | **章节页 Section** | 大号部分编号（主色）+ 部分名 + 本课清单 |
| 3 | **要点列表 Bullets** | 页标题 + 3–6 条要点；主色方形/短杠项目符，可带二级说明 |
| 4 | **双栏对比 Compare** | 左右两卡片，顶部标签（如"旧方案/新方案"、"优势/代价"），中间可置 VS/箭头 |
| 5 | **表格 Table** | 页标题 + 一张表；表头用 `--bg-muted`，行用分隔线不用斑马纹（选中行才用 brand-100 底） |
| 6 | **代码 Code** | 标题 + 简短代码块（≤12 行，超长则拆页），关键字可用主色标注 |
| 7 | **架构图文 Diagram** | 内嵌 SVG 主图 + 侧边/下方注释；一图一页 |
| 8 | **结论 Quote** | 居中大字金句（≤2 行）+ 一行补充；主色短杠收口 |

规则：信息密度控制——正文一页 ≤ 6 条 × 每行 ≤ 22 个汉字（超出拆页或转图表）。

---

## 7. 组件规范

- **页眉课次标签**：主色文字或 brand-100 底 chip，格式 `第 13 课`。
- **卡片**：`--bg-slide` 底 + 1px `--border` + `--r-card` + `--shadow-1`，内边距 24px。
- **chip 标签**：小号文字 + 浅底（语义色 12% 透明度）+ `--r-chip`。
- **列表项目符**：统一 6px 主色方块或 24px 主色短杠，不使用浏览器默认圆点。
- **表格**：仅横向分隔线 + 表头底色；表头 15px/500，单元格 15px/400；单元格上下内边距 10px。
- **代码块**：`--bg-muted` 底 + `--r-code` + 等宽字体；行号用 `--text-3`；不做复杂语法高亮（仅注释灰、关键字主色、字符串绿三色）。
- **页脚**：左侧课程名，右侧 `当前页 / 总页数`；其上方 2px 进度条（主色，宽随页码）。

---

## 8. 内嵌 SVG 图表规范

HTML 内**只使用内嵌 SVG，不内联 Mermaid 运行时**（保证零依赖、离线可开）。

- 画布：viewBox 按内容定；网格/描边统一 `--border` 与 `--split`。
- 线条：主线 1.5px、辅助线 1px（可虚线）；圆角拐角半径 6px。
- 箭头：统一 marker，主色或 `--text-2`。
- 文字：14–16px、`--font-sans`、填充 `--text-2`；节点标题 16px/500。
- 节点：填充 `--bg-slide`、描边 1px、圆角 8px；强调节点描边 `--brand-500` 或 brand-100 底。
- 配色最多引用：主色 + 三个语义色，其余中性。
- 图类约定：流程图从左到右；时间轴从左到右；层级图从上到下；双方案图左右对称。

> 对应 Markdown 中的 Mermaid 图，在 HTML 里按上述规范重绘为 SVG，不直接截图。

---

## 9. 动效与交互

- 翻页过渡：透明度 + 8px 位移，220ms `cubic-bezier(0.4,0,0.2,1)`。
- 键盘：`→ / Space / PageDown / N` 下一页；`← / PageUp / P` 上一页；`Home / End` 首末页。
- 鼠标：页面左右边缘点击热区（可选）；右下角主题切换按钮。
- 主题：默认跟随系统（`prefers-color-scheme`）；按 `T` 或点按钮在 light/dark 间手动切换，写入 `html[data-theme]`。
- 进度条与页码随翻页即时更新；支持触屏左右滑动。
- 打印：`@media print` 时每页一张 slide、无底色（备用讲义场景）。

---

## 10. 统一 HTML 模板骨架

> 后续 28 个 HTML 全部复制本模板，只修改 `<title>`、页眉、各 `<section>` 内容与页脚课程名。Token、脚本、结构保持原样。

```html
<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>课题名 · React 企业级中后台实战</title>
<style>
	/* ---------- Design Tokens（亮色） ---------- */
	:root {
		--brand-500:#1677ff; --brand-400:#4096ff; --brand-100:#e6f4ff; --brand-700:#0958d9;
		--success:#52c41a; --warning:#faad14; --danger:#ff4d4f;
		--text-1:rgba(0,0,0,.88); --text-2:rgba(0,0,0,.65); --text-3:rgba(0,0,0,.45);
		--border:#d9d9d9; --split:#f0f0f0;
		--bg-canvas:#f5f7fa; --bg-slide:#fff; --bg-muted:#fafafa;
		--font-sans:-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Hiragino Sans GB","Microsoft YaHei","Helvetica Neue",Helvetica,Arial,sans-serif;
		--font-mono:"SF Mono","JetBrains Mono","Fira Code",Menlo,Consolas,monospace;
		--shadow-1:0 1px 2px rgba(0,0,0,.05),0 2px 8px rgba(0,0,0,.06);
		color-scheme:light;
	}
	/* ---------- Tokens（暗色）：系统跟随 + 手动 ---------- */
	@media (prefers-color-scheme:dark) {
		:root:not([data-theme="light"]) {
			--brand-500:#4096ff; --brand-100:#111b2e;
			--text-1:rgba(255,255,255,.85); --text-2:rgba(255,255,255,.65); --text-3:rgba(255,255,255,.45);
			--border:#303030; --split:#262626;
			--bg-canvas:#0d0d0d; --bg-slide:#141414; --bg-muted:#1f1f1f;
			--shadow-1:0 1px 2px rgba(0,0,0,.4);
			color-scheme:dark;
		}
	}
	:root[data-theme="dark"] {
		--brand-500:#4096ff; --brand-100:#111b2e;
		--text-1:rgba(255,255,255,.85); --text-2:rgba(255,255,255,.65); --text-3:rgba(255,255,255,.45);
		--border:#303030; --split:#262626;
		--bg-canvas:#0d0d0d; --bg-slide:#141414; --bg-muted:#1f1f1f;
		--shadow-1:0 1px 2px rgba(0,0,0,.4);
		color-scheme:dark;
	}

	* { margin:0; padding:0; box-sizing:border-box; }
	html,body { height:100%; }
	body { font-family:var(--font-sans); background:var(--bg-canvas); overflow:hidden; }

	.viewport { position:fixed; inset:0; display:grid; place-items:center; }
	.deck { width:1280px; height:720px; transform-origin:center center; }

	.slide {
		position:absolute; inset:0; display:none; flex-direction:column;
		padding:56px 64px 44px;
		background:var(--bg-slide); color:var(--text-1);
		border-radius:12px; box-shadow:var(--shadow-1);
	}
	.slide.active { display:flex; animation:slide-in .22s cubic-bezier(.4,0,.2,1); }
	@keyframes slide-in { from { opacity:0; transform:translateX(8px); } to { opacity:1; transform:none; } }

	/* 页眉 / 页脚 */
	.slide-header { display:flex; align-items:center; gap:10px; margin-bottom:24px; font-size:15px; color:var(--brand-500); font-weight:500; }
	.slide-header .tag { padding:2px 10px; border-radius:6px; background:var(--brand-100); }
	.slide-title { font-size:32px; font-weight:600; line-height:1.3; margin-bottom:28px; }
	.slide-body { flex:1; display:flex; flex-direction:column; font-size:18px; line-height:1.7; }
	.slide-footer { position:absolute; left:64px; right:64px; bottom:18px; display:flex; justify-content:space-between; font-size:12px; color:var(--text-3); }
	.progress { position:absolute; left:0; bottom:0; height:2px; background:var(--brand-500); border-radius:0 2px 2px 0; transition:width .22s; }

	/* 常用组件 */
	.bullets { list-style:none; display:flex; flex-direction:column; gap:14px; }
	.bullets li { display:flex; gap:12px; align-items:flex-start; }
	.bullets li::before { content:""; width:6px; height:6px; margin-top:12px; flex:none; background:var(--brand-500); border-radius:1px; }
	.cards { display:flex; gap:24px; flex:1; }
	.card { flex:1; border:1px solid var(--border); border-radius:10px; padding:24px; background:var(--bg-slide); }
	.card h3 { font-size:24px; margin-bottom:14px; }
	table { width:100%; border-collapse:collapse; font-size:15px; }
	th { text-align:left; background:var(--bg-muted); font-weight:500; padding:10px 14px; border-bottom:1px solid var(--border); }
	td { padding:10px 14px; border-bottom:1px solid var(--split); color:var(--text-2); }
	pre { background:var(--bg-muted); border:1px solid var(--border); border-radius:8px; padding:20px; font-family:var(--font-mono); font-size:16px; line-height:1.6; overflow:hidden; color:var(--text-2); }

	/* 封面 / 章节 / 结论 */
	.cover { justify-content:center; align-items:flex-start; }
	.cover .kicker { color:var(--brand-500); font-size:18px; font-weight:500; margin-bottom:20px; }
	.cover h1 { font-size:44px; line-height:1.25; margin-bottom:16px; }
	.cover p { font-size:20px; color:var(--text-2); }
	.section-page { justify-content:center; }
	.section-page .num { font-size:88px; font-weight:700; color:var(--brand-500); line-height:1; }
	.section-page h2 { font-size:36px; margin:20px 0 18px; }
	.quote-page { justify-content:center; align-items:center; text-align:center; }
	.quote-page blockquote { font-size:34px; font-weight:600; line-height:1.5; max-width:900px; }
	.quote-page figcaption { margin-top:24px; color:var(--text-3); font-size:18px; }

	.theme-btn { position:fixed; right:16px; bottom:16px; z-index:10; border:1px solid var(--border); background:var(--bg-slide); color:var(--text-2); border-radius:6px; padding:4px 10px; font-size:12px; cursor:pointer; }

	@media print {
		body { overflow:visible; background:#fff; }
		.slide { position:static; display:flex; box-shadow:none; page-break-after:always; }
	}
</style>
</head>
<body>
<div class="viewport">
	<div class="deck" id="deck">

		<!-- 版式1：封面 -->
		<section class="slide cover active">
			<div class="kicker">React 企业级中后台实战 · 第 NN 课</div>
			<h1>课题标题</h1>
			<p>一句话副标题</p>
			<footer class="slide-footer"><span>面向 AI 时代的 React 中后台</span><span class="page"></span></footer>
			<div class="progress"></div>
		</section>

		<!-- 版式3：要点列表（其余版式按第 6 节结构套用） -->
		<section class="slide">
			<header class="slide-header"><span class="tag">第 NN 课</span><span>分节名</span></header>
			<h2 class="slide-title">页标题</h2>
			<div class="slide-body">
				<ul class="bullets">
					<li>要点一</li>
					<li>要点二</li>
				</ul>
			</div>
			<footer class="slide-footer"><span>面向 AI 时代的 React 中后台</span><span class="page"></span></footer>
			<div class="progress"></div>
		</section>

	</div>
</div>
<button class="theme-btn" id="themeBtn" title="切换主题 (T)">主题</button>

<script>
	const deck = document.getElementById("deck");
	const slides = Array.from(document.querySelectorAll(".slide"));
	let current = 0;

	/* 等比缩放 */
	function fit() {
		const scale = Math.min(window.innerWidth / 1280, window.innerHeight / 720);
		deck.style.transform = `scale(${scale})`;
	}
	window.addEventListener("resize", fit); fit();

	/* 翻页 */
	function go(index) {
		current = Math.max(0, Math.min(slides.length - 1, index));
		slides.forEach((s, i) => s.classList.toggle("active", i === current));
		slides.forEach((s) => {
			s.querySelector(".page").textContent = `${current + 1} / ${slides.length}`;
			s.querySelector(".progress").style.width
				= `${((current + 1) / slides.length) * 100}%`;
		});
	}
	window.addEventListener("keydown", (e) => {
		if (["ArrowRight", " ", "PageDown", "n", "N"].includes(e.key)) { e.preventDefault(); go(current + 1); }
		if (["ArrowLeft", "PageUp", "p", "P"].includes(e.key)) go(current - 1);
		if (e.key === "Home") go(0);
		if (e.key === "End") go(slides.length - 1);
		if (e.key === "t" || e.key === "T") toggleTheme();
	});
	/* 触屏滑动 */
	let touchX = 0;
	window.addEventListener("touchstart", e => touchX = e.touches[0].clientX, { passive: true });
	window.addEventListener("touchend", e => {
		const dx = e.changedTouches[0].clientX - touchX;
		if (Math.abs(dx) > 50) go(current + (dx < 0 ? 1 : -1));
	}, { passive: true });

	/* 主题手动切换 */
	function toggleTheme() {
		const root = document.documentElement;
		root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
	}
	document.getElementById("themeBtn").addEventListener("click", toggleTheme);

	go(0);
</script>
</body>
</html>
```

---

## 11. 生成时的检查清单

每个 HTML 交付前逐项核对：

1. 是否基于第十节模板、Token 未被改动、无硬编码颜色？
2. 每页是否属于 8 种版式之一？同屏字号 ≤ 3 种？
3. 信息是否超限（≤6 条/页、代码 ≤12 行/页）？
4. SVG 是否符合第 8 节（线宽、箭头、配色、文字字号）？
5. 翻页/页码/进度条/主题切换/触屏是否可用？
6. 断网双击能否正常打开（零外部依赖）？
7. 页眉课次、页脚课程名与总纲课表是否一致？
