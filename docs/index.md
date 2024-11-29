---
layout: home

hero:
  name: React Antd Admin
  text: 企业级管理系统框架
  tagline: 开箱即用，简单高效
  image:
    src: logo.svg
    alt: React Antd Admin
  actions:
    - theme: brand
      text: 快速开始 ->
      link: /zh/guide/introduction/quick-start/
    - theme: alt
      text: 在线预览
      link: https://condorheroblog.github.io/react-antd-admin/
    - theme: alt
      text: 在 GitHub 查看
      link: https://github.com/condorheroblog/react-antd-admin

features:
  - icon: 🚀
    title: 最新技术栈
    details: 基于 React、Zustand、React Router DOM、TypeScript、等最新技术栈。
    link: /zh/guide/introduction/quick-start/
    linkText: 快速开始
  - icon: ⚙️
    title: 丰富的配置
    details: 企业级中后台前端解决方案，提供丰富的组件和模板以及 N 种偏好设置组合方案。
    link: /zh/guide/fundamentals/settings
    linkText: 配置文档
  - icon: 🎨
    title: 主题定制
    details: 通过简单的配置，即可实现各种主题切换，满足个性化需求。
    link: /zh/guide/advanced/theme
    linkText: 主题文档
  - icon: 🌐
    title: 国际化
    details: 内置国际化方案，支持多语言切换，满足国际化需求。
    link: /zh/guide/advanced/locale
    linkText: 国际化文档
  - icon: 🔐
    title: 权限管理
    details: 内置权限管理方案，支持多种权限控制方式，满足各种权限需求。
    link: /zh/guide/advanced/access
    linkText: 权限文档
  - title: Vite
    icon:
      src: /vite-logo.svg
    details: 现代化的前端构建工具，快速冷启动，瞬间热更新。
    link: https://vitejs.dev/
    linkText: 官方站点
  - title: Ant Design
    icon:
      src: /antd-logo.svg
    details: 基于 Ant Design 进行开发，满足业务多样化需求。
    link: https://ant.design/
    linkText: 官方站点
  - title: ahooks
    icon:
      src: /ahooks-logo.svg
    details: 基于 Ant Design 进行开发，满足业务多样化需求。
    link: https://ahooks.js.org/
    linkText: 官方站点
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #bd34fe 50%, #47caff 50%);
  --vp-home-hero-image-filter: blur(44px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}
</style>
