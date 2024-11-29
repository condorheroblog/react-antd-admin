import{_ as s,c as i,a2 as e,o as t}from"./chunks/framework.Dgf1XuiP.js";const k=JSON.parse('{"title":"快速开始","description":"","frontmatter":{},"headers":[],"relativePath":"zh/guide/introduction/quick-start.md","filePath":"zh/guide/introduction/quick-start.md","lastUpdated":1732861371000}'),n={name:"zh/guide/introduction/quick-start.md"};function l(p,a,h,d,r,o){return t(),i("div",null,a[0]||(a[0]=[e(`<h1 id="quick-start" tabindex="-1">快速开始 <a class="header-anchor" href="#quick-start" aria-label="Permalink to &quot;快速开始 {#quick-start}&quot;">​</a></h1><h2 id="前置准备" tabindex="-1">前置准备 <a class="header-anchor" href="#前置准备" aria-label="Permalink to &quot;前置准备&quot;">​</a></h2><div class="info custom-block"><p class="custom-block-title">环境要求</p><p>在启动项目前，你需要确保你的环境满足以下要求：</p><ul><li><a href="https://nodejs.org/en" target="_blank" rel="noreferrer">Node.js</a> 版本大于 18.18.0，推荐使用 <a href="https://github.com/Schniz/fnm" target="_blank" rel="noreferrer">fnm</a>、<a href="https://github.com/nvm-sh/nvm" target="_blank" rel="noreferrer">nvm</a> 进行版本管理。</li><li><a href="https://git-scm.com/" target="_blank" rel="noreferrer">Git</a> 任意版本。</li></ul><p>验证环境是否满足以上要求，通过以下命令查看版本：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看 node 版本</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">node</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -v</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看 git 版本</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -v</span></span></code></pre></div></div><h2 id="创建项目" tabindex="-1">创建项目 <a class="header-anchor" href="#创建项目" aria-label="Permalink to &quot;创建项目&quot;">​</a></h2><h3 id="获取源码" tabindex="-1">获取源码 <a class="header-anchor" href="#获取源码" aria-label="Permalink to &quot;获取源码&quot;">​</a></h3><blockquote><p>点击直接创建模版项目：<a href="https://github.com/new?template_name=react-antd-admin&amp;template_owner=condorheroblog" target="_blank" rel="noreferrer">使用这个模板创建仓库</a></p></blockquote><p>手动获取源码的方式如下：</p><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-Z-EO1" id="tab-8Hwyfn8" checked><label data-title="GitHub" for="tab-8Hwyfn8">GitHub</label></div><div class="blocks"><div class="language-sh vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npx</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> degit</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> condorheroblog/react-antd-admin</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> react-antd-admin</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># or npx giget@latest gh:condorheroblog/react-antd-admin react-antd-admin</span></span></code></pre></div></div></div><h3 id="安装依赖" tabindex="-1">安装依赖 <a class="header-anchor" href="#安装依赖" aria-label="Permalink to &quot;安装依赖&quot;">​</a></h3><p>在你的代码目录内打开终端，并执行以下命令:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 进入项目目录</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> react-antd-admin</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 使用项目指定的 pnpm 版本进行依赖安装</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">corepack</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> enable</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 安装依赖</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pnpm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">注意</p><ul><li>项目使用 <code>pnpm</code> 进行依赖安装，默认会使用 <code>corepack</code> 来安装指定版本的 <code>pnpm</code>。:</li><li>如果 corepack 无法访问 npm 源，可以设置系统的环境变量为镜像源 <code>COREPACK_REGISTRY=https://registry.npmmirror.com</code>，然后执行 <code>pnpm install</code>。</li><li>如果你不想使用 <code>corepack</code>，只需要运行 <code>corepack disable</code> 即可禁用，然后使用任意版本的 <code>pnpm</code> 进行安装。</li></ul></div><h3 id="开发" tabindex="-1">开发 <a class="header-anchor" href="#开发" aria-label="Permalink to &quot;开发&quot;">​</a></h3><p>只需要执行以下命令就可以在 <code>http://localhost:3333</code> 中看到页面：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pnpm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> dev</span></span></code></pre></div><h3 id="构建" tabindex="-1">构建 <a class="header-anchor" href="#构建" aria-label="Permalink to &quot;构建&quot;">​</a></h3><p>构建该应用只需要执行以下命令：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pnpm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> build</span></span></code></pre></div><p>然后会看到用于发布的 build 文件夹被生成。</p><h3 id="预览" tabindex="-1">预览 <a class="header-anchor" href="#预览" aria-label="Permalink to &quot;预览&quot;">​</a></h3><p>预览构建的应用只需要执行以下命令：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pnpm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> preview</span></span></code></pre></div>`,22)]))}const g=s(n,[["render",l]]);export{k as __pageData,g as default};
