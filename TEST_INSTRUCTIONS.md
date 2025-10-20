# 测试 AI 聊天功能

## 🔧 已修复的问题

### 1. Enter 键发送（已修复）✅
- **行为**：Enter = 发送，Shift+Enter = 换行
- **测试**：在输入框输入文字，按 Enter 应该发送消息

### 2. 发送按钮可点击（已修复）✅
- **修复**：移除了阻止点击的样式
- **添加**：`type="button"` 确保按钮正常工作
- **测试**：输入文字后，发送按钮应该变蓝色且可点击

### 3. 输入框自适应高度（已修复）✅
- **修复**：
  - 移除了 `rows={1}` 限制
  - 添加了 `min-h-[24px]` 最小高度
  - 添加了 `style={{ height: 'auto' }}` 初始样式
  - useEffect 会自动调整高度
- **测试**：输入多行文字，输入框应该自动变高

---

## 🧪 测试步骤

### 步骤 1：确认环境变量

确保 `.env.local` 文件存在且内容正确：
```env
QWEN_API_KEY=sk-a9151fde94ab4f6687e4f9a6cd2019e1
```

### 步骤 2：重启服务器

```bash
# 停止服务器（Ctrl + C）
# 重新启动
npm run dev
```

### 步骤 3：访问页面

打开浏览器：http://localhost:3000/Ai-creator

### 步骤 4：测试功能

#### 测试 1：发送按钮
1. 在输入框输入文字
2. 观察发送按钮是否变蓝色
3. 点击发送按钮
4. 应该能看到消息发送

✅ **预期结果**：按钮可点击，消息发送成功

#### 测试 2：Enter 键发送
1. 在输入框输入文字
2. 按 Enter 键（不按 Shift）
3. 消息应该发送

✅ **预期结果**：Enter 发送消息

#### 测试 3：Shift+Enter 换行
1. 在输入框输入文字
2. 按 Shift+Enter
3. 应该换行，不发送

✅ **预期结果**：Shift+Enter 换行

#### 测试 4：自适应高度
1. 在输入框输入一行文字
2. 按 Shift+Enter 换行
3. 继续输入多行
4. 观察输入框高度

✅ **预期结果**：输入框高度随内容自动增加

---

## 🐛 如果还有问题

### 问题 1：Enter 还是换行

**检查**：
- 打开浏览器开发者工具（F12）
- 切换到 Console 标签
- 按 Enter 时看是否有错误

**解决**：
- 清除浏览器缓存（Ctrl+Shift+Delete）
- 硬刷新页面（Ctrl+F5）

### 问题 2：发送按钮不能点击

**检查**：
- 输入框是否有文字？
- 文字是否只是空格？
- 按钮是灰色还是蓝色？

**调试**：
打开浏览器控制台，粘贴这段代码：
```javascript
console.log('输入内容:', document.querySelector('textarea').value);
console.log('是否为空:', !document.querySelector('textarea').value.trim());
```

### 问题 3：高度不自适应

**检查**：
- 在开发者工具中查看 textarea 元素
- 检查 style 属性是否有 height

**手动测试**：
打开控制台，粘贴：
```javascript
const textarea = document.querySelector('textarea');
console.log('当前高度:', textarea.style.height);
console.log('scrollHeight:', textarea.scrollHeight);
```

---

## 📞 获取帮助

如果测试后还有问题，请提供：
1. 哪个测试失败了？
2. 浏览器控制台有什么错误？
3. 按钮是什么颜色？（灰色 or 蓝色）
4. 输入框的表现如何？

---

## ✅ 功能正常的表现

### 正常使用流程：
1. 打开页面 → 看到欢迎界面
2. 输入问题 → 发送按钮变蓝
3. 按 Enter 或点击按钮 → 消息发送
4. 等待 2-5 秒 → AI 回复
5. 输入多行 → 输入框自动变高
6. 点击"新对话" → 清空对话

**一切都应该流畅工作！** 🎉

