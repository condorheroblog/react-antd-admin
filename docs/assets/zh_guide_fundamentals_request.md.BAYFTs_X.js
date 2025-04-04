import{_ as i,c as a,o as t,ag as n}from"./chunks/framework.B2IAv3se.js";const h="/react-antd-admin/docs/assets/ky-vs-fetch.Bx0FOV7N.jpeg",g=JSON.parse('{"title":"请求","description":"","frontmatter":{},"headers":[],"relativePath":"zh/guide/fundamentals/request.md","filePath":"zh/guide/fundamentals/request.md","lastUpdated":1743781701000}'),e={name:"zh/guide/fundamentals/request.md"};function l(k,s,p,r,d,E){return t(),a("div",null,s[0]||(s[0]=[n(`<h1 id="request" tabindex="-1">请求 <a class="header-anchor" href="#request" aria-label="Permalink to &quot;请求 {#request}&quot;">​</a></h1><h2 id="introduction" tabindex="-1">介绍 <a class="header-anchor" href="#introduction" aria-label="Permalink to &quot;介绍 {#introduction}&quot;">​</a></h2><p>项目所有的请求均存放于 <code>src/api</code> 目录下，且所有的请求都是通过 request 方法发起的，这个方法存放在 <code>src/utils/request</code> 中，内部封装了 <code>[Ky](https://github.com/sindresorhus/ky)</code> 库。</p><p>一个经典的目录结构如下：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">├──</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> src</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">│</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">   └──</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> api</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">│</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">       └──</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> system</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">              # 系统管理</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">│</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">           ├──</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> index.ts</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # 聚合所有接口</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">│</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">           └──</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> role</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">            # 角色管理</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">│</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">               ├──</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> index.ts</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # 角色管理接口</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">│</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">               └──</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> types.ts</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # 角色管理接口类型定义</span></span></code></pre></div><h2 id="basic-usage" tabindex="-1">基础用法 <a class="header-anchor" href="#basic-usage" aria-label="Permalink to &quot;基础用法 {#basic-usage}&quot;">​</a></h2><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { RoleItemType } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;./types&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { request } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;#src/utils&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> *</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;./types&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/* 获取角色列表 */</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> fetchRoleList</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">data</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> any</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">	return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> request.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ApiListResponse</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">RoleItemType</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;&gt;(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;role-list&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, { searchParams: data, ignoreLoading: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">json</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/* 新增角色 */</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> fetchAddRoleItem</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">data</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> RoleItemType</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">	return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> request.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">post</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ApiResponse</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;&gt;(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;role-item&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, { json: data, ignoreLoading: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">json</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/* 修改角色 */</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> fetchUpdateRoleItem</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">data</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> RoleItemType</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">	return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> request.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">put</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ApiResponse</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;&gt;(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;role-item&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, { json: data, ignoreLoading: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">json</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/* 删除角色 */</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> fetchDeleteRoleItem</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">id</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">	return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> request.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">delete</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ApiResponse</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;&gt;(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;role-item&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, { json: id, ignoreLoading: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">json</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h2 id="request-config" tabindex="-1">请求配置 <a class="header-anchor" href="#request-config" aria-label="Permalink to &quot;请求配置 {#request-config}&quot;">​</a></h2><p>ignoreLoading 默认值为 false 为 true 时，不显示 loading 加载动画，接口将在后台静默请求。</p><h2 id="tanstack-query" tabindex="-1">Tanstack Query <a class="header-anchor" href="#tanstack-query" aria-label="Permalink to &quot;Tanstack Query&quot;">​</a></h2><p>推荐只在获取数据的时候（即通过 GET 请求的接口）使用 <a href="https://tanstack.com/query/latest" target="_blank" rel="noreferrer">Tanstack Query</a> 进行网络请求。</p><p>使用 useEffect 进行网络请求，有几个无法解决的痛点。</p><ol><li>当 useEffect 有依赖项时，依赖快速变化，网络请求无法按请求顺序返回，会存在<a href="https://maxrozen.com/race-conditions-fetching-data-react-with-useeffect" target="_blank" rel="noreferrer">竞速条件</a> 的问题，老的数据可能覆盖新的数据，已经过时的请求不会自动取消。</li><li>loading 状态，error 状态，等需要自己手动管理。</li></ol><p>强烈建议阅读 <a href="https://www.robinwieruch.de/react-hooks-fetch-data/" target="_blank" rel="noreferrer">How to fetch data with React Hooks</a> 了解如何发送请求以及 <a href="https://tanstack.com/query/latest" target="_blank" rel="noreferrer">Tanstack Query</a> 的原理。</p><h2 id="request-white-list" tabindex="-1">请求白名单 <a class="header-anchor" href="#request-white-list" aria-label="Permalink to &quot;请求白名单 {#request-white-list}&quot;">​</a></h2><p>当遇到项目某些请求不需要携带 token 的情况下，可以添加到白名单中，在 <code>src/utils/request/index.ts</code> 文件中设置 requestWhiteList 变量的值：</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 请求白名单, 请求白名单内的接口不需要携带 token</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> requestWhiteList</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;/login&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">];</span></span></code></pre></div><h2 id="refresh-token" tabindex="-1">刷新 token <a class="header-anchor" href="#refresh-token" aria-label="Permalink to &quot;刷新 token {#refresh-token}&quot;">​</a></h2><p>用户登录之后会返回两个 token，一个用于请求接口验证，一个用于 token 过期无感刷新 token，后端可以通过简单的设置让用户在某一段时间无需再次登录。</p><p>代码在 <code>src/utils/request</code> 文件夹中的 <code>refresh.ts</code> 文件中，请查看 refreshTokenAndRetry 函数的代码。</p><div class="info custom-block"><p class="custom-block-title">暂存请求</p><p>refreshTokenAndRetry 函数重新刷新 token 时，会暂存失败的请求, 刷新 token 成功后，重新发送这些暂存的请求。</p></div><h2 id="cross-domain" tabindex="-1">跨域 <a class="header-anchor" href="#cross-domain" aria-label="Permalink to &quot;跨域 {#cross-domain}&quot;">​</a></h2><p>在 <code>vite.config.ts</code>，参考下面代码配置本地跨域代理即可：</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark has-diff vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> isDev</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> process.env.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">NODE_ENV</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ===</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;development&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> default</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> defineConfig</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	server: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">		port: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3333</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">		// https://vitejs.dev/config/server-options#server-proxy</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">		proxy: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">			&quot;/api&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line diff add"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">				target: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;http://191.255.255.123:8888&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">				changeOrigin: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">				rewrite</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">path</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> isDev </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">?</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> path.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">replace</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">^</span><span style="--shiki-light:#22863A;--shiki-light-font-weight:bold;--shiki-dark:#85E89D;--shiki-dark-font-weight:bold;">\\/</span><span style="--shiki-light:#032F62;--shiki-dark:#DBEDFF;">api</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> path,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">			},</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">		},</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	},</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span></code></pre></div><h2 id="why-use-ky" tabindex="-1">为什么使用 Ky ？ <a class="header-anchor" href="#why-use-ky" aria-label="Permalink to &quot;为什么使用 Ky ？ {#why-use-ky}&quot;">​</a></h2><p>包括不限于以下优点：</p><ul><li>更简单的 API - 比 Fetch 还要节约大约一半的代码</li><li>将非 2xx 状态代码视为错误</li><li>包括超时支持</li><li>重试失败的请求</li><li>请求拦截器和响应拦截器</li><li>文件下载进度</li><li>更好的 TS 支持 <code>.json()</code> 解析为 unknown 类型</li></ul><div class="info custom-block"><p class="custom-block-title">Ky VS Fetch</p><p><img src="`+h+'" alt="ky-vs-fetch.jpeg"></p></div><p>虽然原生的 Fetch 不支持获取文件下载进度百分比，但 Ky 提供了进度回调函数，解决了这个问题。</p><div class="info custom-block"><p class="custom-block-title"><a href="https://github.com/sindresorhus/ky?tab=readme-ov-file#ondownloadprogress" target="_blank" rel="noreferrer">onDownloadProgress 进度回调函数</a></p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ky </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;ky&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> response</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> await</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ky</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;https://example.com&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, {</span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">	onDownloadProgress</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">progress</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">chunk</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>\n<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">		// Example output:</span></span>\n<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">		// `0% - 0 of 1271 bytes`</span></span>\n<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">		// `100% - 1271 of 1271 bytes`</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">		console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">`${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">progress</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">percent</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> *</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 100</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}% - ${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">progress</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">transferredBytes</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">} of ${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">progress</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">totalBytes</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">} bytes`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	}</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span></code></pre></div></div><h2 id="why-not-use-axios" tabindex="-1">为什么不使用 Axios ？ <a class="header-anchor" href="#why-not-use-axios" aria-label="Permalink to &quot;为什么不使用 Axios ？ {#why-not-use-axios}&quot;">​</a></h2><p>Axios 是基于 XmlHttpRequest 的。gzip 压缩后大小为 11.7KB。 Ky 是基于 fetch 的。gzip 压缩后大小为 3.3KB。 Ky 的包大小较小。</p><h2 id="other-fetch-libraries" tabindex="-1">其他 Fetch 库 <a class="header-anchor" href="#other-fetch-libraries" aria-label="Permalink to &quot;其他 Fetch 库 {#other-fetch-libraries}&quot;">​</a></h2><ul><li>ofetch: <a href="https://github.com/unjs/ofetch" target="_blank" rel="noreferrer">https://github.com/unjs/ofetch</a></li><li>Wretch: <a href="https://github.com/elbywan/wretch" target="_blank" rel="noreferrer">https://github.com/elbywan/wretch</a></li><li>Better Fetch: <a href="https://better-fetch.vercel.app/docs" target="_blank" rel="noreferrer">https://better-fetch.vercel.app/docs</a></li></ul><h2 id="reference" tabindex="-1">参考 <a class="header-anchor" href="#reference" aria-label="Permalink to &quot;参考 {#reference}&quot;">​</a></h2><ul><li><a href="https://x.com/housecor/status/1815730974694449396" target="_blank" rel="noreferrer">Using fetch? Consider Ky.</a></li></ul>',36)]))}const y=i(e,[["render",l]]);export{g as __pageData,y as default};
