# 如何在你的域名下创建新页面（完全免费！）

## 🎉 重要概念

**创建 URL 路径（如 www.xxx.com/1/2/3）是完全免费的！**

- ✅ 域名：`www.xxx.com`（每年续费）
- ✅ 路径：`/1/2/3`（**免费，无限制**）

---

## 📁 Next.js 路由规则（自动的！）

Next.js 会自动把**文件夹结构**转换为 **URL 路径**：

### 示例 1：创建 `/about` 页面

**文件位置：**
```
app/
  └── about/
      └── page.tsx
```

**自动生成的 URL：**
```
https://www.shaxdigital.com/about
```

### 示例 2：创建 `/services/digital-ads` 页面

**文件位置：**
```
app/
  └── services/
      └── digital-ads/
          └── page.tsx
```

**自动生成的 URL：**
```
https://www.shaxdigital.com/services/digital-ads
```

### 示例 3：创建深层路径 `/products/category/item-123`

**文件位置：**
```
app/
  └── products/
      └── category/
          └── item-123/
              └── page.tsx
```

**自动生成的 URL：**
```
https://www.shaxdigital.com/products/category/item-123
```

---

## 🛠️ 快速创建新页面步骤

### 步骤 1：创建文件夹和页面文件

假设你想创建 `/portfolio` 页面：

```bash
# 在项目根目录运行
mkdir -p app/portfolio
```

然后创建 `app/portfolio/page.tsx` 文件：

```tsx
export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6">作品集</h1>
        <p className="text-lg text-gray-700">
          这是作品集页面，URL 是 /portfolio
        </p>
        
        {/* 返回首页按钮 */}
        <a 
          href="/" 
          className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          返回首页
        </a>
      </div>
    </div>
  );
}
```

### 步骤 2：访问新页面

启动开发服务器（如果还没启动）：
```bash
npm run dev
```

然后访问：
```
http://localhost:3000/portfolio
```

或部署后访问：
```
https://www.shaxdigital.com/portfolio
```

### 步骤 3：在其他页面添加链接

在任何页面添加链接：

```tsx
<a href="/portfolio">查看作品集</a>
```

或使用 Next.js 的 Link 组件（更快）：

```tsx
import Link from 'next/link';

<Link href="/portfolio">
  查看作品集
</Link>
```

---

## 📋 实际应用场景

### 场景 1：博客系统

**文件结构：**
```
app/
  └── blog/
      ├── page.tsx                    → /blog (博客列表)
      ├── 2025-article-1/
      │   └── page.tsx                → /blog/2025-article-1
      └── 2025-article-2/
          └── page.tsx                → /blog/2025-article-2
```

### 场景 2：产品目录

**文件结构：**
```
app/
  └── products/
      ├── page.tsx                    → /products (所有产品)
      ├── electronics/
      │   ├── page.tsx                → /products/electronics
      │   └── laptop/
      │       └── page.tsx            → /products/electronics/laptop
      └── clothing/
          └── page.tsx                → /products/clothing
```

### 场景 3：多语言支持

**文件结构：**
```
app/
  ├── en/
  │   └── about/
  │       └── page.tsx                → /en/about
  └── zh/
      └── about/
          └── page.tsx                → /zh/about
```

---

## 🎨 页面模板示例

### 基础页面模板

```tsx
export default function MyPage() {
  return (
    <div className="min-h-screen">
      {/* 导航栏 */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <a href="/" className="text-xl font-bold">首页</a>
        </div>
      </nav>

      {/* 内容区域 */}
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6">页面标题</h1>
        <p className="text-lg text-gray-700">页面内容...</p>
      </main>

      {/* 页脚 */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 您的公司名称</p>
        </div>
      </footer>
    </div>
  );
}
```

### 使用现有组件的页面

```tsx
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MyPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold">页面标题</h1>
          {/* 你的内容 */}
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
```

---

## 💰 费用说明

### ✅ 完全免费的操作：

- 创建任意数量的页面
- 创建任意深度的路径（/a/b/c/d/e/f...）
- 添加链接和导航
- 修改页面内容
- 本地开发和测试

### 💵 需要付费的部分：

1. **域名续费**（每年）
   - 通常 ¥50-100/年（.com 域名）
   - 在阿里云等平台续费

2. **Vercel 托管**
   - ✅ 免费版：完全够用（100GB 流量/月）
   - 💰 专业版：$20/月（需要更多功能时）

3. **其他可选费用**
   - 数据库（如果需要）
   - 额外存储（如果需要）
   - CDN 加速（Vercel 已包含）

---

## 🚀 部署到线上

### 自动部署流程：

1. **修改代码** → 创建新页面
2. **提交到 GitHub**：
   ```bash
   git add .
   git commit -m "添加新页面"
   git push
   ```
3. **Vercel 自动部署** → 1-2 分钟后生效
4. **访问新 URL** → https://www.shaxdigital.com/your-new-page

---

## 📊 已创建的示例页面

你的项目现在已经有这些页面：

| URL | 文件位置 | 说明 |
|-----|---------|------|
| `/` | `app/page.tsx` | 首页 |
| `/about` | `app/about/page.tsx` | 关于我们页面 ✨ 新建 |
| `/services/consulting` | `app/services/consulting/page.tsx` | 咨询服务页面 ✨ 新建 |

---

## 🎯 常见问题

### Q1: 我能创建多少个页面？
**A:** 无限制！完全免费，想创建多少就多少。

### Q2: URL 路径有长度限制吗？
**A:** 理论上没有，但建议不超过 5 层（如 /a/b/c/d/e）以保持 URL 简洁。

### Q3: 我必须使用英文路径吗？
**A:** 不是，但推荐使用。中文路径会被编码（如 `/关于` → `/%E5%85%B3%E4%BA%8E`），不够美观。

### Q4: 如何删除一个页面？
**A:** 直接删除对应的文件夹即可！删除 `app/about/` 文件夹，`/about` 路径就消失了。

### Q5: 能创建动态路径吗（如 /blog/[id]）？
**A:** 可以！使用 Next.js 的动态路由功能，创建 `app/blog/[id]/page.tsx`

---

## 📚 进阶功能

### 动态路由

创建 `app/blog/[slug]/page.tsx`：

```tsx
export default function BlogPost({ params }: { params: { slug: string } }) {
  return (
    <div className="container mx-auto px-4 py-20">
      <h1>博客文章：{params.slug}</h1>
    </div>
  );
}
```

这样可以匹配：
- `/blog/article-1`
- `/blog/article-2`
- `/blog/any-slug-here`

### 路由组（不影响 URL）

创建 `app/(marketing)/about/page.tsx`：
- URL 仍然是 `/about`
- 括号内的 `(marketing)` 不会出现在 URL 中
- 用于组织代码

---

## ✅ 下一步行动

1. **测试现有页面**
   - 访问 http://localhost:3000/about
   - 访问 http://localhost:3000/services/consulting
   - 点击首页的演示链接

2. **创建你自己的页面**
   - 根据业务需求创建新页面
   - 参考本文档的模板

3. **提交并部署**
   - `git push` 后自动部署到线上
   - 几分钟后就能访问新页面

---

**记住：创建 URL 路径完全免费，随便创建！** 🎉


