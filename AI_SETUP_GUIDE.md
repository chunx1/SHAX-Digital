# AI Creator 设置指南 🤖

## ✅ 已完成的部分

我已经帮你创建了以下文件：

1. ✅ **后端 API 路由**：`app/api/ai-chat/route.ts`
   - 处理 AI 对话请求
   - 调用 Google Gemini API
   - 返回 AI 回复

2. ✅ **前端聊天页面**：`app/Ai-creator/page.tsx`
   - Google Gemini 风格的界面
   - 建议问题卡片
   - 实时对话功能
   - 响应式设计

---

## ⚠️ 需要你手动完成的步骤

### 步骤 1：创建环境变量文件

**在项目根目录** 创建一个名为 `.env.local` 的文件：

#### 方式 A：使用 VS Code
1. 在 VS Code 左侧文件树
2. 右键点击项目根目录（`ai-company-one` 文件夹）
3. 选择"新建文件"
4. 输入文件名：`.env.local`（注意前面有个点）

#### 方式 B：使用命令行
在项目根目录运行：
```bash
New-Item .env.local -ItemType File
```

---

### 步骤 2：添加 API 密钥到环境变量文件

在 `.env.local` 文件中粘贴以下内容：

```env
# Google Gemini API Key (主要)
GEMINI_API_KEY=AIzaSyASg8QRCgaJ_DVzkdTzr-TzBa6MSyJQhck

# 备用 API Key (可选)
GEMINI_API_KEY_BACKUP=AIzaSyCxazBrQIyrKyHPyubaYzwv65pDKBuey0U
```

**保存文件！** ⚠️

---

### 步骤 3：重启开发服务器

**重要：** 环境变量只有在服务器启动时才会被加载！

#### 如果开发服务器正在运行：
1. 按 `Ctrl + C` 停止服务器
2. 运行 `npm run dev` 重新启动

#### 如果没有运行：
直接运行：
```bash
npm run dev
```

---

## 🧪 测试 AI 功能

### 步骤 1：访问 AI 聊天页面

打开浏览器访问：
```
http://localhost:3000/Ai-creator
```

### 步骤 2：测试功能

1. **点击建议卡片** 或 **输入问题**
2. 观察 AI 是否回复
3. 尝试多轮对话

### 预期效果：

✅ **成功：**
- 页面正常显示
- 点击建议卡片后 AI 回复
- 可以正常输入和对话
- AI 回复速度在 2-5 秒

❌ **如果出错：**
- 检查 `.env.local` 文件是否创建
- 检查 API Key 是否正确粘贴
- 检查是否重启了开发服务器
- 查看终端是否有错误信息

---

## 🎨 界面特点（Google Gemini 风格）

### 空状态（首次访问）
- ✨ 渐变色标题："你好，我是 Gemini"
- 📋 4 个建议问题卡片
- 🎯 点击卡片直接开始对话

### 对话界面
- 💬 简洁的消息气泡
- 🤖 AI 消息带渐变色头像
- 👤 用户消息带蓝色背景
- ⚡ 流畅的动画效果

### 输入框
- 📝 底部固定输入框
- 🔄 自动调整高度
- ⌨️ Enter 发送，Shift+Enter 换行
- 🔘 圆形发送按钮

---

## 📁 文件结构

```
ai-company-one/
├── .env.local                      ← 🆕 需要手动创建
├── app/
│   ├── Ai-creator/                 ← 🆕 AI 聊天页面
│   │   └── page.tsx
│   ├── api/
│   │   └── ai-chat/                ← 🆕 API 路由
│   │       └── route.ts
│   └── (其他文件...)
└── (其他文件...)
```

---

## 🔗 访问链接

### 本地开发：
- AI 聊天：http://localhost:3000/Ai-creator
- 首页：http://localhost:3000

### 部署后（线上）：
- AI 聊天：https://www.shaxdigital.com/Ai-creator
- 首页：https://www.shaxdigital.com

---

## 🚀 部署到线上

### 步骤 1：添加环境变量到 Vercel

1. 访问 https://vercel.com
2. 进入你的项目
3. Settings → Environment Variables
4. 添加变量：
   - Name: `GEMINI_API_KEY`
   - Value: `AIzaSyASg8QRCgaJ_DVzkdTzr-TzBa6MSyJQhck`
5. 点击 Save

### 步骤 2：推送代码

```bash
git add .
git commit -m "添加 AI Creator 功能"
git push
```

### 步骤 3：等待部署

- Vercel 会自动部署（1-2 分钟）
- 部署完成后访问：https://www.shaxdigital.com/Ai-creator

---

## 💰 API 费用说明

### Google Gemini Pro API：

**免费额度（每分钟）：**
- 60 次请求/分钟
- 对于个人使用完全够用

**价格（超出免费额度后）：**
- 输入：$0.00025 / 1K tokens
- 输出：$0.0005 / 1K tokens

**实际费用估算：**
```
单次对话（100字问题 + 300字回答）：
约 0.0003 美元（不到 1 分钱）

每天 100 次对话：
约 $0.03（约 2 毛钱）

每月 3000 次对话：
约 $0.90（约 6 元）
```

**结论：** 对于个人使用，费用非常低！

---

## 🔒 安全说明

### ✅ 已做的安全措施：

1. **API Key 保护**
   - 密钥存储在 `.env.local` 文件
   - 不会被提交到 GitHub（`.gitignore` 已配置）
   - 只在服务器端使用，前端无法访问

2. **错误处理**
   - API 调用失败会显示友好错误信息
   - 不会暴露敏感信息

### ⚠️ 注意事项：

1. **永远不要**把 `.env.local` 文件提交到 Git
2. **永远不要**在前端代码中直接写 API Key
3. **定期检查** API 使用量，防止被滥用

---

## 🛠️ 故障排查

### 问题 1：AI 不回复

**检查清单：**
- [ ] `.env.local` 文件是否创建？
- [ ] API Key 是否正确粘贴？
- [ ] 是否重启了开发服务器？
- [ ] 终端是否有错误信息？

**解决方法：**
```bash
# 停止服务器 (Ctrl + C)
# 检查 .env.local 文件
# 重新启动
npm run dev
```

### 问题 2：页面显示但 AI 不工作

**打开浏览器控制台（F12）查看错误：**
- 如果显示 "API 配置错误"：环境变量没有加载
- 如果显示 "AI 服务暂时不可用"：API Key 可能无效
- 如果显示网络错误：检查网络连接

### 问题 3：环境变量文件看不到

**Windows 系统可能隐藏了以点开头的文件：**
1. 打开文件资源管理器
2. 查看 → 选项
3. 勾选"显示隐藏的文件、文件夹和驱动器"

---

## 📞 需要帮助？

如果遇到任何问题：
1. 检查终端的错误信息
2. 检查浏览器控制台的错误信息
3. 确认所有步骤都正确完成
4. 尝试清除浏览器缓存

---

## ✨ 下一步可以做什么？

### 功能扩展建议：

1. **添加对话历史保存**
   - 使用 localStorage 保存对话
   - 刷新页面后对话不丢失

2. **添加代码高亮**
   - 安装 `react-syntax-highlighter`
   - 美化显示代码块

3. **添加 Markdown 渲染**
   - 安装 `react-markdown`
   - 支持格式化的 AI 回复

4. **添加用户认证**
   - 防止被滥用
   - 跟踪每个用户的使用量

5. **添加流式输出**
   - 像 ChatGPT 那样逐字显示
   - 需要使用 Gemini 的流式 API

---

**祝你使用愉快！🎉**

