import{_ as i,c as a,a2 as n,o as l}from"./chunks/framework.Dgf1XuiP.js";const p="/react-antd-admin/docs/assets/analyzer-stats.ZJwUp27D.jpg",c=JSON.parse('{"title":"构建和部署","description":"","frontmatter":{},"headers":[],"relativePath":"zh/guide/fundamentals/build.md","filePath":"zh/guide/fundamentals/build.md","lastUpdated":1735389708000}'),t={name:"zh/guide/fundamentals/build.md"};function e(h,s,k,r,d,g){return l(),a("div",null,s[0]||(s[0]=[n(`<h1 id="build" tabindex="-1">构建和部署 <a class="header-anchor" href="#build" aria-label="Permalink to &quot;构建和部署 {#build}&quot;">​</a></h1><h2 id="build-cli" tabindex="-1">构建 <a class="header-anchor" href="#build-cli" aria-label="Permalink to &quot;构建 {#build-cli}&quot;">​</a></h2><p>项目开发完成之后，执行以下命令进行构建：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pnpm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> build</span></span></code></pre></div><p>构建完成后，项目将生成 <code>build</code> 目录，该目录中包含构建后的项目文件。</p><h2 id="preview" tabindex="-1">预览 <a class="header-anchor" href="#preview" aria-label="Permalink to &quot;预览 {#preview}&quot;">​</a></h2><h3 id="vite-preview" tabindex="-1">Vite 预览 <a class="header-anchor" href="#vite-preview" aria-label="Permalink to &quot;Vite 预览 {#vite-preview}&quot;">​</a></h3><p>在项目根目录下执行以下命令，即可启动本地预览：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pnpm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> preview</span></span></code></pre></div><h3 id="local-server-preview" tabindex="-1">本地服务预览 <a class="header-anchor" href="#local-server-preview" aria-label="Permalink to &quot;本地服务预览 {#local-server-preview}&quot;">​</a></h3><p>使用 pnpm 全局安装 <code>serve</code> 服务，例如：<code>live-server</code>：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pnpm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> i</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -g</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> live-server</span></span></code></pre></div><p>在 <code>build</code> 目录下执行以下命令，即可启动本地服务预览：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> build</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 启动服务，默认端口为 8080</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">live-server</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 启动服务，指定端口</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">live-server</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --port</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 9000</span></span></code></pre></div><h2 id="build-analyzer" tabindex="-1">构建分析器 <a class="header-anchor" href="#build-analyzer" aria-label="Permalink to &quot;构建分析器 {#build-analyzer}&quot;">​</a></h2><p>项目通过 <a href="https://github.com/KusStar/vite-bundle-visualizer#readme" target="_blank" rel="noreferrer">vite-bundle-visualizer</a> 内置对 <a href="https://github.com/btd/rollup-plugin-visualizer" target="_blank" rel="noreferrer">rollup-plugin-visualizer</a> 插件的支持。只需执行以下命令：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pnpm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> analyzer</span></span></code></pre></div><p>在自动打开的浏览器中，将看到以下内容：</p><p><img src="`+p+`" alt="analyzer-stats.jpg"></p><h2 id="gzip-brotli" tabindex="-1">开启 gzip、brotli 压缩 <a class="header-anchor" href="#gzip-brotli" aria-label="Permalink to &quot;开启 gzip、brotli 压缩 {#gzip-brotli}&quot;">​</a></h2><details class="details custom-block"><summary>gzip 与 brotli 在 nginx 内的配置</summary><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">http</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # 开启 gzip（动态压缩响应内容）</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  gzip</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> on</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # 开启 gzip_static （需要提供预压缩文件，当收到请求直接响应预压缩文件）</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # gzip_static 开启后可能会报错，需要安装相应的模块, 具体安装方式可以自行查询</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # 只有这个开启，打包的 .gz 文件才会有效果</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  gzip_static</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> on</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  gzip_proxied</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> any</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  gzip_min_length</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 1k</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  gzip_buffers</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 4</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 16k</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  #如果 Nginx 中使用了多层代理 必须设置这个才可以开启 gzip。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  gzip_http_version</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1.0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  gzip_comp_level</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  gzip_types</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> text/plain</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> application/javascript</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> application/x-javascript</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> text/css</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> application/xml</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> text/javascript</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> application/x-httpd-php</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> image/jpeg</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> image/gif</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> image/png</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  gzip_vary</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> off</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  gzip_disable</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;MSIE [1-6]\\.&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # 开启 brotli 压缩</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # 需要安装对应的 Nginx 模块,具体安装方式可以自行查询</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # 可以与 gzip 共存不会冲突</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  brotli</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> on</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  brotli_comp_level</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  brotli_buffers</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 16</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 8k</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  brotli_min_length</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 20</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  brotli_types</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> text/plain</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> text/css</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> application/json</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> application/x-javascript</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> text/xml</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> application/xml</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> application/xml+rss</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> text/javascript</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> application/javascript</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> image/svg+xml</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div></details><p>当开启了 Nginx 的 gzip_static 功能，我们需要预提供压缩文件，比如开启 gzip 压缩，当请求 index.html，需要在同级目录下提供 <code>index.html.gz</code> 用来让 Nginx 响应请求。 前端可以选择通过 <a href="https://github.com/vbenjs/vite-plugin-compression" target="_blank" rel="noreferrer">vite-plugin-compression</a> 或者 <a href="https://github.com/nonzzz/vite-plugin-compression" target="_blank" rel="noreferrer">vite-plugin-compression2</a> 插件来在构建自动生成对应的压缩文件，但不是推荐，要么使用仅开启 <code>gzip on</code> 进行动态压缩（云服务基本都提供，推荐这个方法），要么通过 Nginx 配置来自动生成压缩文件。</p>`,22)]))}const o=i(t,[["render",e]]);export{c as __pageData,o as default};
