# 目录结构 {#directory-structure}

```bash
react-antd-admin
├── TODO.md                                # TODO 列表
├── commitlint.config.ts                   # commitlint 配置
├── docs                                   # 文档
├── eslint.config.js                       # eslint 配置
├── fake                                   # 模拟接口的数据
│   ├── async-routes.fake.ts               # 异步路由
│   ├── auth.fake.ts                       # 模拟登录和登出
│   ├── user.fake.ts                       # 模拟用户详细信息
│   └── ...
├── index.html                             # HTML 入口文件
├── package.json                           # 项目依赖
├── pnpm-lock.yaml
├── pnpm-workspace.yaml                    # pnpm 工作区配置
├── postcss.config.js                      # postcss 配置
├── public                                 # 静态资源
│   ├── favicon.ico                        # 网站图标
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src                                    # 源代码
│   ├── api                                # 请求接口目录
│   │   └── user                           # 用户相关模块（下面是一个模板包含两个文件）
│   │       ├── index.ts                   # 相关的请求方法
│   │       └── types.ts                   # 接口类型定义
│   ├── app.tsx                            # 入口页面
│   ├── assets                             # 静态资源
│   │   ├── svg                            # svg 文件
│   │   └── images                         # 图片
│   ├── components                         # 公共组件
│   │   ├── access-control                 # 权限组件
│   │   ├── antd-app                       # antd 主题配置
│   │   ├── basic-button                   # 基础按钮
│   │   ├── basic-content                  # 基础内容
│   │   ├── basic-form                     # 基础表单
│   │   ├── basic-table                    # 基础表格
│   │   ├── fullscreen-button              # 全屏按钮
│   │   ├── global-spin                    # 全局 spin 组件
│   │   ├── iframe                         # iframe 组件
│   │   ├── index.ts                       # 聚合导出所有的组件
│   │   ├── jss-theme-provider             # CSS in jss 继承 antd 的 token
│   │   ├── scrollbar                      # 滚动条
│   │   └── tanstack-query                 # tanstack-query 组件
│   ├── constants                          # 全局常用的一些常量
│   ├── hooks                              # 自定义 hooks
│   │   ├── index.ts                       # 聚合导出所有的 hooks
│   │   ├── use-access                     # 权限
│   │   ├── use-current-route              # 获取当前最新路由
│   │   ├── use-device-type                # 获取设备类型
│   │   ├── use-language                   # 获取语言
│   │   ├── use-preferences                # 获取偏好设置
│   ├── icons                              # 图标
│   ├── index.tsx                          # 入口文件
│   ├── layout                             # 布局文件所在目录
│   │   ├── container-layout               # 容器布局
│   │   ├── hooks                          # 获取布局配置相关的信息
│   │   ├── index.ts                       # 聚合导出所有的布局
│   │   ├── layout-content                 # 动态路由呈现的内容
│   │   ├── layout-footer                  # 布局页脚
│   │   ├── layout-header                  # 布局头部
│   │   ├── layout-menu                    # 布局菜单
│   │   ├── layout-mixed-sidebar           # 布局混合侧边栏
│   │   ├── layout-sidebar                 # 布局侧边栏
│   │   ├── layout-root                    # 根布局
│   │   ├── layout-tabbar                  # 布局 tabbar
│   │   ├── parent-layout                  # 父布局
│   │   └── widgets                        # 放在布局组件中的小部件
│   ├── locales                            # 国际化配置
│   │   ├── helper.ts                      # 国际化配置帮助函数
│   │   ├── index.ts                       # 聚合导出所有的配置
│   │   ├── t.tsx                          # 导出可以在纯 JS 和 TS  文件中使用的 $t 函数
│   │   ├── en-US                          # 英文翻译
│   │   └── zh-CN                          # 中文翻译
│   ├── pages                              # 页面
│   │   ├── about                          # 关于页面
│   │   ├── error                          # 错误页面
│   │   │   ├── 403                        # 403 页面
│   │   │   ├── 404                        # 404 页面
│   │   │   ├── 500                        # 500 页面
│   │   │   └── unknown-component          # 未知组件页面
│   │   ├── home                           # 首页
│   │   ├── login                          # 登录页面
│   │   ├── personal-center                # 个人中心页面
│   │   ├── route-nest                     # 路由嵌套页面
│   │   ├── system                         # 系统设置页面
│   │   ├── privacy-policy                 # 隐私政策页面
│   │   └── terms-of-service               # 服务条款页面
│   ├── plugins	                           # App 插件
│   │   ├── index.ts                       # 聚合导出所有的插件
│   │   └── loading.ts                     # 应用加载动画
│   │   └── loading2.ts                    # 应用加载动画 2
│   ├── router                             # 路由
│   │   ├── constants.ts                   # 路由常量
│   │   ├── extra-info                     # 路由配置信息，比如路由的顺序
│   │   ├── guard                          # 路由守卫
│   │   ├── index.ts                       # 路由入口文件
│   │   ├── routes                         # 路由模块
│   │   │   ├── core                       # 核心路由
│   │   │   ├── external                   # 外部路由
│   │   │   ├── static                     # 静态路由
│   │   │   ├── modules                    # 动态路由
│   │   │   └── ...
│   │   ├── types.ts                       # 路由类型定义
│   │   └── utils                          # 路由工具函数
│   ├── setupTests.ts                      # 测试配置
│   ├── store                              # 状态管理
│   │   ├── auth.ts                        # accessToken 和 refreshToken
│   │   ├── global.ts                      # 全局 store，比如 loading 等
│   │   ├── index.ts                       # 聚合导出所有的 store
│   │   ├── access.ts                      # 页面路由、菜单、权限
│   │   ├── preferences                    # 偏好设置
│   │   ├── tabs.ts                        # 标签页
│   │   └── user.ts                        # 用户信息
│   ├── styles                             # 样式
│   │   ├── animation.css                  # 动画相关
│   │   ├── antdTheme.ts                   # antd 主题
│   │   ├── base.css                       # 基础样式
│   │   ├── css-variables.ts               # 获取 antd token 的 CSS 变量
│   │   ├── global.css                     # 全局样式
│   │   ├── index.css                      # 样式入口文件
│   │   └── keep-alive.css                 # keep-alive 样式
│   ├── types                              # 类型定义
│   │   ├── global.d.ts
│   │   ├── index.d.ts
│   │   ├── ky-extensions.d.ts
│   │   ├── router.d.ts
│   │   └── vite-env.d.ts
│   └── utils                              # 工具库
│       ├── cn                             # 组合类名，保证样式名不重复
│       ├── index.ts                       # 聚合导出所有的工具函数
│       ├── is                             # 常见判断变量类型的方法
│       ├── is-dark-theme                  # 判断是否是暗黑主题
│       ├── is-light-theme                 # 判断是否是亮色主题
│       ├── is-mac-os                      # 判断是否是 macOS 系统
│       ├── is-windows-os                  # 判断是否是 Windows 系统
│       ├── progress                       # 进度条
│       ├── remember-route                 # 记住路由
│       ├── request                        # 封装 ky 的请求库
│       ├── static-antd                    # 静态 antd 的 message、notification、modal 等
│       ├── toggle-html-class              # 切换 html 标签的 class
│       └── tree                           # 树形结构相关
├── tailwind.config.ts                     # tailwind 配置
├── tests                                  # 测试文件目录
├── tsconfig.json                          # ts 配置
└── vite.config.ts                         # vite 配置
```
