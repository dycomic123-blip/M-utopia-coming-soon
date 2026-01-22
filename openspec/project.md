# Project Context

## Purpose

AI电影生成网站首页是一个现代化的单页应用（SPA），旨在展示AI电影生成服务的核心功能和作品。项目专注于提供：

- 吸引人的视觉体验：通过粒子动画、渐变玻璃态、滚动动画等现代化视觉效果
- 流畅的用户交互：使用GSAP和Framer Motion实现专业级动画效果
- 高性能：代码分割、懒加载、动画优化等性能最佳实践
- 商业化级别的用户体验：媲美专业商业网站的首页设计

## Tech Stack

### 核心框架
- **React 18** - 组件化UI开发，使用函数组件和Hooks
- **Vite 5** - 现代化构建工具，提供极速HMR和优化的生产构建
- **TypeScript 5.2** - 类型安全，提升代码质量和开发体验

### 样式与UI
- **Tailwind CSS 3.3** - 原子化CSS框架，快速构建现代化UI
- **PostCSS** - CSS后处理，支持Tailwind和Autoprefixer
- **Autoprefixer** - 自动添加浏览器前缀

### 动画与视觉效果
- **Framer Motion 10.16** - React动画库，用于组件级动画和手势交互
- **GSAP 3.12** - 专业级动画引擎，用于复杂时间轴和滚动触发动画
- **react-particles 2.12** - 粒子动画系统，提供交互式背景效果
- **tsparticles 2.12** - 粒子引擎核心库

### 工具库
- **react-intersection-observer 9.5** - 滚动触发动画和可见性检测
- **clsx 2.0** - 条件类名管理
- **tailwind-merge 2.0** - Tailwind类名合并工具

### 开发工具
- **ESLint 8.50** - 代码质量检查，使用TypeScript和React插件
- **Prettier 3.0** - 代码格式化工具
- **@typescript-eslint** - TypeScript ESLint规则

## Project Conventions

### Code Style

**格式化规则（Prettier）:**
- 不使用分号（`semi: false`）
- 使用单引号（`singleQuote: true`）
- 2空格缩进（`tabWidth: 2`）
- 行宽100字符（`printWidth: 100`）
- ES5尾随逗号（`trailingComma: "es5"`）
- 箭头函数单参数时省略括号（`arrowParens: "avoid"`）

**命名约定:**
- 组件文件：PascalCase（如 `HeroSection.tsx`）
- 工具函数：camelCase（如 `debounce`, `preloadImage`）
- 常量：UPPER_SNAKE_CASE（如 `SITE_CONFIG`）
- CSS类：使用Tailwind工具类，自定义类使用kebab-case

**文件组织:**
- 组件按功能模块组织（`components/hero/`, `components/showcase/`）
- 每个组件一个文件
- 相关工具函数放在 `utils/` 目录
- 自定义Hooks放在 `hooks/` 目录
- 样式文件放在 `styles/` 目录

**TypeScript约定:**
- 启用严格模式
- 使用函数式组件和TypeScript接口定义Props
- 避免使用 `any`，除非必要（如第三方库类型问题）
- 使用类型推断，只在需要时显式声明类型

### Architecture Patterns

**组件架构:**
- 函数式组件优先，使用React Hooks
- 组件按功能模块组织（layout, hero, showcase, features, common）
- 通用组件可复用（Button, AnimatedSection）
- 业务组件专注单一职责

**状态管理:**
- 使用React内置状态（useState, useRef）
- 使用自定义Hooks封装复杂逻辑（useScrollAnimation, useParallax, useMorphing）
- 避免全局状态管理库（当前项目不需要）

**代码分割:**
- 使用 `React.lazy()` 和 `Suspense` 进行路由级代码分割
- 非关键组件延迟加载（HeroSection, ShowcaseSection, FeaturesSection）
- 保持Header和Footer在主bundle中（首屏关键）

**动画模式:**
- GSAP用于复杂时间轴和滚动触发动画
- Framer Motion用于组件级动画和交互反馈
- 使用 `will-change` CSS属性优化动画性能
- 所有动画在组件卸载时正确清理

**性能优化:**
- 图片懒加载（`loading="lazy"`）
- 动画使用 `transform` 和 `opacity`（GPU加速）
- 防抖和节流工具函数用于事件处理
- 代码分割减少初始加载时间

### Testing Strategy

**当前状态:**
- 项目目前没有配置测试框架
- 建议未来添加：
  - **Vitest** - 单元测试框架（与Vite集成良好）
  - **React Testing Library** - 组件测试
  - **Playwright** - E2E测试（可选）

**测试优先级:**
1. 工具函数测试（utils/performance.ts, utils/animations.ts）
2. 自定义Hooks测试
3. 关键组件测试（Button, AnimatedSection）
4. 集成测试（页面渲染和交互）

### Git Workflow

**分支策略:**
- `main` - 生产环境代码，保持稳定
- `develop` - 开发分支，集成新功能
- `feature/*` - 功能分支，从develop创建
- `fix/*` - 修复分支，用于bug修复

**提交规范:**
使用语义化提交信息（Conventional Commits）:
- `feat:` - 新功能
- `fix:` - bug修复
- `docs:` - 文档更新
- `style:` - 代码格式（不影响功能）
- `refactor:` - 代码重构
- `perf:` - 性能优化
- `test:` - 测试相关
- `chore:` - 构建/工具相关

**示例:**
```
feat: 添加Hero区域粒子背景动画
fix: 修复ParticleBackground类型导入错误
refactor: 优化动画性能，添加will-change属性
```

## Domain Context

**通用前端页面模板:**
- 这是一个可复用的现代化前端页面开发模板
- 适用于各种类型的网站首页、产品展示页、营销页面等
- 提供完整的组件架构和动画效果，可快速定制为具体项目

**设计理念:**
- 现代化、科技感、专业
- 强调视觉冲击力和交互体验
- 通过动画和视觉效果提升用户体验

## Important Constraints

**技术约束:**
- 仅支持桌面端（当前版本不包含移动端响应式设计）
- 浏览器支持：Chrome、Firefox、Safari、Edge最新版本
- 需要现代浏览器支持（ES2020+，CSS Grid，Flexbox，backdrop-filter）

**性能约束:**
- 首屏加载时间 < 3秒
- 动画帧率保持60fps
- 图片和视频资源需要优化（懒加载、压缩）

**开发约束:**
- 使用TypeScript严格模式
- 所有代码必须通过ESLint检查
- 遵循Prettier格式化规则
- 组件必须正确清理副作用（useEffect清理函数）

**业务约束:**
- 保持商业化网站的专业水准
- 视觉效果需要吸引目标用户群体
- 确保无障碍访问（未来考虑）

## External Dependencies

**前端库依赖:**
- **React生态系统** - React, React DOM（核心框架）
- **动画库** - Framer Motion, GSAP（动画效果）
- **粒子系统** - react-particles, tsparticles（背景效果）
- **工具库** - react-intersection-observer（滚动检测）

**构建工具:**
- **Vite** - 开发服务器和构建工具
- **TypeScript** - 类型检查和编译
- **PostCSS** - CSS处理管道
- **Tailwind CSS** - CSS框架

**开发工具:**
- **ESLint** - 代码质量检查
- **Prettier** - 代码格式化

**外部服务（当前无）:**
- 项目目前是纯前端应用，无后端API依赖
- 图片资源使用Unsplash占位符（生产环境需要替换为实际资源）
- 未来可能需要集成：
  - 内容管理系统（CMS）
  - 分析服务（Google Analytics等）
  - CDN服务（资源分发）

**注意事项:**
- `tsparticles` 库已弃用v2版本，建议未来迁移到v3（`@tsparticles/react`）
- 某些依赖有安全警告，需要定期更新
