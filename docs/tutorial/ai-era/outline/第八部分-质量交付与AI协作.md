# 第八部分 · 质量、交付与 AI 协作 — 课题大纲

> 共 3 课（课次 26–28）。测试策略、构建优化 CI/CD、AI 协作工程化收束。

---

## 第 26 课 · AI 时代的测试策略：Vitest 4

### 学习目标

1. 重新回答"实现廉价后什么值得测"：契约、关键路径、回归点。
2. 理解 Vitest 选型：与 Vite 8 同构、配置统一。
3. 横向对比测试运行时与查询库。

### 核心问题

- 覆盖率在 AI 生成时代还是好指标吗？
- Testing Library 为何强调"像用户一样查询"？
- happy-dom/jsdom、Vitest/Jest 如何取舍？

### 内容大纲

1. 中后台测试金字塔再分配：重纯逻辑（权限/路由生成/工具）、中关键交互（登录/权限可见性）、轻 E2E 冒烟。
2. Vitest 配置：globals、happy-dom、setupFiles（jest-dom）、test 字段与 vite.config 一体；Vitest 4 跟进 Rolldown。
3. Testing Library：getByRole/LabelText、user-event、不测内部 state。
4. AI 生成代码测试策略：测试即规格（先写意图）、针对高风险边界补用例、审查断言本身。
5. **横向对比**：
   - Vitest（ESM/同构/快）vs Jest（存量生态、CJS 包袱）vs Bun test（快但绑定 Bun）；
   - happy-dom（快、够用）vs jsdom（全、慢）；RTL vs Enzyme（已停止适配现代 React）。

### 图表建议（Mermaid）

- `flowchart TD`：再分配后的测试金字塔。
- `flowchart LR`：一个 AI 改动从提交到测试门禁的路径。

### 演示要点（HTML 页规划）

- 测试金字塔图。
- 运行时/DOM 环境横向对比表。
- "AI 生成测试"审查清单页。
- 结论页：测意图与契约，不测实现行数。

### AI 协作点

- 人：关键路径与断言意图。AI：测试代码。
- 审查清单：断言是否验证真实行为？是否覆盖空/失败/权限边界？

### 建议时长

30 分钟。

---

## 第 27 课 · 构建优化与持续交付

### 学习目标

1. 理解分包目标与 Rolldown codeSplitting 配置。
2. 掌握三个质量工具：包分析、环形依赖、检查器。
3. 读懂 CI/CD 与生产 base 配置。

### 核心问题

- manualChunks 按什么维度切？过细为何有害？
- 环形依赖如何在 CI 阻断？
- push 到可访问之间应自动发生什么？

### 内容大纲

1. 分包设计：react/antd/faker 分组依据（更新频率/缓存命中）；Rolldown codeSplitting.groups vs Rollup manualChunks 写法变化；阈值/sourcemap/license/outDir。
2. 产物体检：vite-bundle-visualizer、circular-dependency-scanner、checker（反馈但不阻断构建的取舍）。
3. 效率插件复盘：code-inspector/svgr/unplugin-icons 体积影响。
4. CI/CD：install → lint/typecheck → build → Pages；base 一致性。
5. 环境区分：.env/.env.production、VITE_ 暴露规则、__APP_INFO__。
6. **横向对比**：Rolldown 声明式分组 vs Webpack splitChunks（缓存组/默认策略）vs Vite 7 Rollup 函数式；CI 平台（GitHub Actions/GitLab CI）配置范式。

### 图表建议（Mermaid）

- `flowchart TD`：push → 部署流水线。
- `flowchart LR`：分包分组与缓存命中关系。

### 演示要点（HTML 页规划）

- 三质量工具卡片（输入/输出/时机）。
- 两套分包 API 横向对比。
- CI 流程图。
- 结论页：优化要可测量，交付要无人值守。

### AI 协作点

- 人：分包与发布策略。AI：CI 配置与脚本。
- 审查清单：分包是否过细增请求？CI 是否跳过类型/规范？

### 建议时长

30 分钟。

---

## 第 28 课 · AI 协作工程化（结课）

### 学习目标

1. 把全课程架构知识沉淀为"AI 可执行规则"。
2. 建立可持续 AI 协作工作流。
3. 形成版本演进跟进机制。

### 核心问题

- 如何让任何新会话 AI 都遵守本项目架构约定？
- 机器拦什么、人保留什么判断？
- 如何低成本持续跟进大版本？

### 内容大纲

1. 项目规则即资产：AGENTS.md 等规则文件定位；ESLint/TS 作为可执行规则优先于提示词；课程文档组织成 AI 知识库入口。
2. 五段式工作流：人写需求约束 → AI 出方案取舍 → AI 实现并自跑检查 → CI 门禁 → 人按清单架构审查。
3. 提示词模板库：新增页面/路由模块/API 契约/组件封装四类。
4. 版本演进机制：changelog/migration 阅读法、taze 节奏化更新、Vite+ 观察与迁移窗口。
5. 全课回顾：七层模型 × 纵向/横向双维 × 一张架构决策总表。
6. 进阶方向：RR7 Framework Mode、Monorepo、微前端、设计系统。

### 图表建议（Mermaid）

- `flowchart TD`：五段式 AI 协作流水线。
- `flowchart LR`：规则文件/可执行检查/人工判断三层防线。

### 演示要点（HTML 页规划）

- 协作流水线全景图。
- 三层防线图。
- 28 课架构决策总表（一页收束）。
- 结课页：代码归 AI，判断归你。

### AI 协作点

- 人：规则体系本身。AI：规则内完成一切。
- 审查清单：规则是否可执行可验证？是否留有模糊地带？

### 建议时长

30 分钟。
