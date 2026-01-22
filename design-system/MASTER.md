# Modernist Design System

> 综合 Vignelli 的永恒优雅、Müller-Brockmann 的网格精准、Dieter Rams 的功能纯粹、Paul Rand 的智慧简约

## Design Philosophy

**"Less, but better."** — Dieter Rams

本设计系统遵循现代主义设计哲学的核心原则：
- **功能决定形式** - 每个元素都必须有存在的理由
- **网格即秩序** - 严格的模块化网格系统
- **克制即力量** - 最少的视觉元素，最大的表达力
- **永恒优于时尚** - 追求不随时间褪色的设计

---

## Color Palette

### 核心色彩 (极致克制)

```
PRIMARY:      #0A0A0A (Near Black)     - 主要文字、强调元素
SECONDARY:    #1A1A1A (Soft Black)     - 次要元素、边框
ACCENT:       #E63946 (Vignelli Red)   - 唯一强调色，极少使用
BACKGROUND:   #FAFAFA (Paper White)    - 背景
SURFACE:      #FFFFFF (Pure White)     - 卡片、表面
MUTED:        #6B6B6B (Swiss Gray)     - 次要文字
LIGHT:        #E5E5E5 (Grid Gray)      - 网格线、分隔线
```

### 使用原则
- 90% 的页面应该是黑白灰
- 红色仅用于最重要的 CTA 或需要强调的单一元素
- 避免任何渐变或透明度效果

---

## Typography

### 字体选择 (Swiss Style)

```
HEADING:  "Helvetica Neue", "Helvetica", "Arial", sans-serif
BODY:     "Helvetica Neue", "Helvetica", "Arial", sans-serif
MONO:     "SF Mono", "Monaco", "Consolas", monospace
```

### 字体层级 (Golden Ratio: 1.618)

```
Display:    72px / 80px line-height  (4.5rem)   - 英雄标题
H1:         48px / 56px line-height  (3rem)     - 页面标题
H2:         32px / 40px line-height  (2rem)     - 章节标题
H3:         24px / 32px line-height  (1.5rem)   - 小节标题
Body:       16px / 28px line-height  (1rem)     - 正文
Small:      14px / 20px line-height  (0.875rem) - 辅助文字
Caption:    12px / 16px line-height  (0.75rem)  - 标注
```

### 字重
- **700 (Bold)** - 标题、强调
- **500 (Medium)** - 导航、按钮
- **400 (Regular)** - 正文

---

## Grid System (Müller-Brockmann)

### 12列网格

```
Container:      1200px max-width
Columns:        12
Gutter:         24px (1.5rem)
Margin:         48px (3rem) on desktop
                24px (1.5rem) on mobile
```

### 黄金比例间距 (φ = 1.618)

```
--space-xs:     8px   (0.5rem)
--space-sm:     13px  (0.8125rem)   ≈ 8 × 1.618
--space-md:     21px  (1.3125rem)   ≈ 13 × 1.618
--space-lg:     34px  (2.125rem)    ≈ 21 × 1.618
--space-xl:     55px  (3.4375rem)   ≈ 34 × 1.618
--space-2xl:    89px  (5.5625rem)   ≈ 55 × 1.618
--space-3xl:    144px (9rem)        ≈ 89 × 1.618
```

### 内容宽度比例

```
Full:           100%
Wide:           83.33%  (10/12 columns)
Standard:       66.67%  (8/12 columns)
Narrow:         50%     (6/12 columns)
```

---

## Components

### Button (Dieter Rams)

```css
/* Primary - 功能纯粹 */
.btn-primary {
  background: #0A0A0A;
  color: #FFFFFF;
  padding: 13px 34px;           /* Golden ratio spacing */
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  border: none;
  transition: opacity 200ms;
}

.btn-primary:hover {
  opacity: 0.85;
}

/* Secondary - 线性框架 */
.btn-secondary {
  background: transparent;
  color: #0A0A0A;
  padding: 12px 33px;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  border: 1px solid #0A0A0A;
  transition: background 200ms, color 200ms;
}

.btn-secondary:hover {
  background: #0A0A0A;
  color: #FFFFFF;
}
```

### Cards (极简表面)

```css
.card {
  background: #FFFFFF;
  border: 1px solid #E5E5E5;
  padding: 34px;                /* Golden ratio */
}

/* 无阴影、无圆角、无渐变 */
```

### Navigation (Swiss Style)

```css
.nav-link {
  color: #6B6B6B;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-size: 12px;
  transition: color 200ms;
}

.nav-link:hover,
.nav-link.active {
  color: #0A0A0A;
}
```

---

## Animation (功能性动效)

### 原则
- **有意义** - 动画必须传达信息或改善体验
- **克制** - 持续时间短，缓动自然
- **一致** - 全站使用统一的动画语言

### 标准缓动

```css
--ease-out:     cubic-bezier(0.33, 1, 0.68, 1);
--ease-in-out:  cubic-bezier(0.65, 0, 0.35, 1);
--duration-sm:  150ms;
--duration-md:  200ms;
--duration-lg:  300ms;
```

### 允许的动画
- 透明度变化 (opacity)
- 颜色过渡 (color, background-color)
- 简单位移 (transform: translateY) - 仅用于滚动揭示

### 禁止的动画
- 缩放效果 (scale)
- 旋转效果 (rotate)
- 弹跳效果 (bounce)
- 复杂的多阶段动画
- 循环动画

---

## Layout Patterns

### Hero Section (黄金分割)

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                        [Navigation]                         │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                                                             │
│                     H E A D L I N E                         │
│                                                             │
│                    ─────────────────                        │
│                                                             │
│                      Subheadline                            │
│                                                             │
│                      [ CTA ]                                │
│                                                             │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  视觉重心位于黄金分割点 (从顶部约 38.2% 位置)                    │
└─────────────────────────────────────────────────────────────┘
```

### Content Grid (Müller-Brockmann)

```
┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐
│ 1 │ 2 │ 3 │ 4 │ 5 │ 6 │ 7 │ 8 │ 9 │10 │11 │12 │
├───┴───┴───┴───┼───┴───┴───┴───┼───┴───┴───┴───┤
│   Content     │   Content     │   Content     │  3 columns
├───────────────┴───────────────┼───────────────┤
│         Content               │   Content     │  2:1 ratio
├───────────────────────────────┴───────────────┤
│                   Content                     │  Full width
└───────────────────────────────────────────────┘
```

---

## Anti-Patterns (禁止)

### 绝对禁止
- ❌ 渐变色 (gradients)
- ❌ 阴影效果 (box-shadow)
- ❌ 玻璃拟态 (glassmorphism)
- ❌ 圆角超过 2px
- ❌ Emoji 作为图标
- ❌ 多色调色板
- ❌ 装饰性元素
- ❌ 粒子背景
- ❌ 复杂动画
- ❌ 模糊效果 (blur)

### 避免
- ⚠️ 超过两种字体
- ⚠️ 超过三种字重
- ⚠️ 不对齐网格的元素
- ⚠️ 不必要的分隔线

---

## Pre-Delivery Checklist

- [ ] 所有元素对齐 12 列网格
- [ ] 间距使用黄金比例系统
- [ ] 颜色仅使用定义的调色板
- [ ] 无渐变、无阴影、无圆角
- [ ] 动画简洁且有意义
- [ ] 排版层级清晰
- [ ] 移动端响应式完善
- [ ] 无装饰性视觉元素

---

## References

- Massimo Vignelli - *The Vignelli Canon*
- Josef Müller-Brockmann - *Grid Systems in Graphic Design*
- Dieter Rams - *Ten Principles for Good Design*
- Paul Rand - *Thoughts on Design*
