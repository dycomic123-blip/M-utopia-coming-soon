# Modern Web Template

一个现代化的前端页面开发模板，使用React + Vite + TypeScript构建，具有炫酷的视觉效果和流畅的动画。可快速定制为各种类型的网站首页。

## 技术栈

### 核心框架
- **React 18** - 组件化开发
- **Vite 5** - 极速开发体验
- **TypeScript** - 类型安全

### 样式与动画
- **Tailwind CSS** - 原子化CSS
- **Framer Motion** - React动画库
- **GSAP (GreenSock)** - 专业级动画引擎

### 视觉效果
- **react-particles** - 粒子动画系统
- **tsparticles** - 粒子引擎

### 工具库
- **react-intersection-observer** - 滚动触发动画
- **clsx** / **tailwind-merge** - 类名管理

## 功能特性

- ✨ **粒子背景动画** - 交互式粒子效果
- 🎨 **渐变玻璃态** - 现代化的毛玻璃效果
- 🎬 **滚动动画** - GSAP驱动的流畅滚动动画
- 🎯 **响应式设计** - 适配各种屏幕尺寸
- ⚡ **性能优化** - 代码分割、懒加载、图片优化
- 🎭 **微交互** - 丰富的悬停和点击效果

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:3000

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 项目结构

```
web-homepage/
├── src/
│   ├── components/        # React组件
│   │   ├── layout/       # 布局组件
│   │   ├── hero/         # Hero区域组件
│   │   ├── showcase/     # 作品展示组件
│   │   ├── features/      # 功能特性组件
│   │   └── common/       # 通用组件
│   ├── hooks/            # 自定义Hooks
│   ├── utils/            # 工具函数
│   ├── styles/           # 样式文件
│   ├── App.tsx           # 主应用组件
│   └── main.tsx          # 入口文件
├── public/               # 静态资源
└── package.json          # 项目配置
```

## 主要组件

### Hero区域
- 粒子背景动画
- 渐变叠加效果
- GSAP文字动画
- CTA按钮

### 作品展示
- 视频卡片网格
- 悬停放大效果
- 滚动触发动画
- 图片懒加载

### 功能特性
- 特性卡片展示
- 图标动画
- 形变效果
- 渐变边框

## 性能优化

- ✅ 代码分割（React.lazy）
- ✅ 图片懒加载
- ✅ 动画性能优化（will-change）
- ✅ GSAP动画清理
- ✅ 防抖和节流工具函数

## 浏览器支持

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 开发规范

### 代码风格
- 使用ESLint进行代码检查
- 使用Prettier进行代码格式化
- TypeScript严格模式

### 提交规范
- 使用语义化提交信息
- 保持代码整洁和注释完整

## 许可证

MIT License

## 贡献

欢迎提交Issue和Pull Request！
