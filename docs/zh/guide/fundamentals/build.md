# 构建和部署 {#build}

## 构建 {#build-cli}

项目开发完成之后，执行以下命令进行构建：

```bash
pnpm run build
```

构建完成后，项目将生成 `build` 目录，该目录中包含构建后的项目文件。

## 预览 {#preview}

### Vite 预览 {#vite-preview}

在项目根目录下执行以下命令，即可启动本地预览：

```bash
pnpm run preview
```

### 本地服务预览 {#local-server-preview}

使用 pnpm 全局安装 `serve` 服务，例如：`live-server`：

```bash
pnpm i -g live-server
```

在 `build` 目录下执行以下命令，即可启动本地服务预览：

```bash
cd build
# 启动服务，默认端口为 8080
live-server
# 启动服务，指定端口
live-server --port 9000
```

## 构建分析器 {#build-analyzer}

项目通过 [vite-bundle-visualizer](https://github.com/KusStar/vite-bundle-visualizer#readme) 内置对 [rollup-plugin-visualizer](https://github.com/btd/rollup-plugin-visualizer) 插件的支持。只需执行以下命令：

```bash
pnpm run analyzer
```

在自动打开的浏览器中，将看到以下内容：

![analyzer-stats.jpg](/public/guide/analyzer-stats.jpg)

## 开启 gzip、brotli 压缩 {#gzip-brotli}

::: details gzip 与 brotli 在 nginx 内的配置

```bash
http {
  # 开启 gzip（动态压缩响应内容）
  gzip on;
  # 开启 gzip_static （需要提供预压缩文件，当收到请求直接响应预压缩文件）
  # gzip_static 开启后可能会报错，需要安装相应的模块, 具体安装方式可以自行查询
  # 只有这个开启，打包的 .gz 文件才会有效果
  gzip_static on;
  gzip_proxied any;
  gzip_min_length 1k;
  gzip_buffers 4 16k;
  #如果 Nginx 中使用了多层代理 必须设置这个才可以开启 gzip。
  gzip_http_version 1.0;
  gzip_comp_level 2;
  gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
  gzip_vary off;
  gzip_disable "MSIE [1-6]\.";

  # 开启 brotli 压缩
  # 需要安装对应的 Nginx 模块,具体安装方式可以自行查询
  # 可以与 gzip 共存不会冲突
  brotli on;
  brotli_comp_level 6;
  brotli_buffers 16 8k;
  brotli_min_length 20;
  brotli_types text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript application/javascript image/svg+xml;
}
```

:::

当开启了 Nginx 的 gzip_static 功能，我们需要预提供压缩文件，比如开启 gzip 压缩，当请求 index.html，需要在同级目录下提供 `index.html.gz` 用来让 Nginx 响应请求。
前端可以选择通过 [vite-plugin-compression](https://github.com/vbenjs/vite-plugin-compression) 或者 [vite-plugin-compression2](https://github.com/nonzzz/vite-plugin-compression) 插件来在构建自动生成对应的压缩文件，但不是推荐，要么使用仅开启 `gzip on` 进行动态压缩（云服务基本都提供，推荐这个方法），要么通过 Nginx 配置来自动生成压缩文件。
