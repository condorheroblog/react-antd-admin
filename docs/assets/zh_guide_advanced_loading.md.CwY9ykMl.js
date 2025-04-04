import{_ as e,c as o,o as i,ag as t}from"./chunks/framework.B2IAv3se.js";const n="/react-antd-admin/docs/assets/app-loading.BKeG86ME.png",r="/react-antd-admin/docs/assets/app-loading2.l3gXwatp.png",b=JSON.parse('{"title":"App Loading","description":"","frontmatter":{},"headers":[],"relativePath":"zh/guide/advanced/loading.md","filePath":"zh/guide/advanced/loading.md","lastUpdated":1743781701000}'),d={name:"zh/guide/advanced/loading.md"};function l(p,a,s,g,c,h){return i(),o("div",null,a[0]||(a[0]=[t('<h1 id="loading" tabindex="-1">App Loading <a class="header-anchor" href="#loading" aria-label="Permalink to &quot;App Loading {#loading}&quot;">​</a></h1><p>应用初次启动时或者应用刷新时，出现的加载效果。</p><p><img src="'+n+'" alt="app-loading"></p><blockquote><p>代码在 <a href="https://github.com/condorheroblog/react-antd-admin/tree/main/src/plugins/loading.ts" target="_blank" rel="noreferrer">app-loading</a></p></blockquote><div class="info custom-block"><p class="custom-block-title">特此声明</p><p>loading 效果的代码属于 pure-admin 点击查看：<a href="https://github.com/pure-admin/vue-pure-admin/blob/cd21f1e050011d8f761094bf8a1e110fb8a33959/index.html#L20-L81" target="_blank" rel="noreferrer">https://github.com/pure-admin/vue-pure-admin/blob/cd21f1e050011d8f761094bf8a1e110fb8a33959/index.html#L20-L81</a></p></div><h2 id="为什么" tabindex="-1">为什么？ <a class="header-anchor" href="#为什么" aria-label="Permalink to &quot;为什么？&quot;">​</a></h2><p>单页面应用，用户初次进入或者刷新应用，一是会下载大量代码进行页面渲染，二是页面展示前需要时间发送接口请求用户详情和动态路由，这个过程需要用户等待，为了避免用户看到白屏或者短暂的黑屏（暗黑主题），我们使用 loading 效果避免这个问题。</p><h2 id="原理" tabindex="-1">原理 <a class="header-anchor" href="#原理" aria-label="Permalink to &quot;原理&quot;">​</a></h2><p>进入应用调用 setupLoading 显示 App Loading，请求完用户详情接口调用 hideLoading 函数关闭 Loading。</p><h2 id="关闭-loading-效果" tabindex="-1">关闭 Loading 效果 <a class="header-anchor" href="#关闭-loading-效果" aria-label="Permalink to &quot;关闭 Loading 效果&quot;">​</a></h2><p>在 <code>src/index.tsx</code> 文件中，注释或者移除掉 setupLoading 函数。</p><h2 id="loading2" tabindex="-1">Loading2 <a class="header-anchor" href="#loading2" aria-label="Permalink to &quot;Loading2&quot;">​</a></h2><p>在 <a href="https://github.com/condorheroblog/react-antd-admin/tree/main/src/plugins/loading2.ts" target="_blank" rel="noreferrer">/src/plugins/loading.ts</a> 中提供了另一种 loading 效果。</p><p><img src="'+r+'" alt="app-loading2"></p><p>如果要使用这个 loading 效果，批量替换代码中的 setupLoading 函数为 setupLoading2 即可。</p><h2 id="自定义-loading-效果" tabindex="-1">自定义 loading 效果 <a class="header-anchor" href="#自定义-loading-效果" aria-label="Permalink to &quot;自定义 loading 效果&quot;">​</a></h2><p>编辑文件 <code>src/plugins/loading.ts</code>，修改代码即可。</p><p>下面几个网站提供了 loading 效果，可以自行选择。</p><div class="tip custom-block"><p class="custom-block-title">推荐</p><ul><li><a href="https://css-loaders.com/" target="_blank" rel="noreferrer">CSS Loaders</a></li><li><a href="https://10015.io/tools/css-loader-generator" target="_blank" rel="noreferrer">CSS Loader Generator</a></li><li><a href="https://cssloaders.github.io/" target="_blank" rel="noreferrer">Loaders</a></li></ul></div><h2 id="为什么不使用-vite-plugin-app-loading-插件" tabindex="-1">为什么不使用 vite-plugin-app-loading 插件？ <a class="header-anchor" href="#为什么不使用-vite-plugin-app-loading-插件" aria-label="Permalink to &quot;为什么不使用 vite-plugin-app-loading 插件？&quot;">​</a></h2><p>代码非常的简单，引入插件反而比较复杂。</p><p>请自行决定，链接在此：<a href="https://github.com/hooray/vite-plugin-app-loading" target="_blank" rel="noreferrer">https://github.com/hooray/vite-plugin-app-loading</a></p>',22)]))}const m=e(d,[["render",l]]);export{b as __pageData,m as default};
