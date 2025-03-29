# 路由

项目路由使用 React Router，虽然使用的是最新 V7 版本，但是推荐阅读 V6 文档 - https://reactrouter.com/en/6.28.1/ ，两个文档都挺烂的。

## 路由目录

```bash
├── router
│   ├── constants.ts                      # 路由白名单
│   ├── extra-info                        # 路由额外信息
│   │   ├── index.ts
│   │   ├── route-path.ts                 # 路由路径，用于路由跳转时使用，统一一处，便于修改路径
│   │   └── order.ts                      # 路由菜单顺序
│   ├── guards.tsx                        # 路由守卫
│   ├── router-global-hooks.ts            # 路由全局钩子
│   ├── routes
│   │   ├── core                          # 核心路由
│   │   ├── modules                       # 动态路由
│   │   └── static                        # 静态路由
│   ├── types.ts                          # 路由类型定义
│   └── utils.ts                          # 路由工具函数
```

## 路由组件

只列举项目中常用的：

| 组件名      | 作用         | 说明              |
|-------------|------------|-----------------|
| `<Link>`    | 导航组件     | 进行页面跳转使用  |
| `<Outlet/>` | 渲染容器组件 | 用来呈现嵌套路由。 |

## Hooks

### useMatches

返回当前路由匹配的所有路由对象

```ts
import { useMatches } from "react-router";
const matches = useMatches();
console.log(matches);
// 输出：[{ pathname: '/path', params: {}, data: {} }, ...]
```

基于 `useMatches()` 项目封装了 `useCurrentRoute` hook，可以获取当前最新的路由信息。

### useParams

返回动态路由的参数

```ts
import { useParams } from "react-router";
const { id: templateId } = useParams<{ id: string }>();
```

### useNavigate

路由跳转

```ts
import { useNavigate } from "react-router";
const navigate = useNavigate();
navigate("/path");
```

### useLocation

返回当前的 location 对象

```ts
import { useLocation } from "react-router";
const location = useLocation();
console.log(location);
// 输出：{ pathname: '/path', search: '?x=1&y=2', hash: '', state: null, key: 'default' }
```

### useSearchParams

匹配路由 Query 参数（查询参数）

```ts
import { useSearchParams } from "react-router";
const [searchParams] = useSearchParams();
console.log(searchParams.get("x")); // 输出 x 的值
```

> 推荐使用 [nuqs](https://nuqs.47ng.com/) 替代 useSearchParams 进行业务开发，[nuqs](https://nuqs.47ng.com/)  可以像使用 useState 一样简洁管理**查询参数**。

```ts
import { useQueryState } from "nuqs";
const [hello, setHello] = useQueryState("hello", { defaultValue: "" });
```

### useOutlet

返回根据路由生成的 element

```ts
import { useOutlet } from "react-router";
const outlet = useOutlet();
console.log(outlet); // 输出：<div>...</div>
```

路由的缓存使用这个 API 实现。

## 路由守卫和路由钩子

路由守卫和路由钩子在 `src/router/guard` 中定义。

- `auth-guard.tsx` 路由守卫，用于权限校验
- `common-gurard.ts` 无权限校验逻辑，支持加载动画等拦截功能
