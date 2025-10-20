'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Plus, Loader2, User, Sparkles } from 'lucide-react';

interface Message {
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export default function AiCreatorPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isFirstLoad = useRef(true);

  // 【localStorage】页面加载时读取历史记录
  useEffect(() => {
    try {
      const savedMessages = localStorage.getItem('ai-chat-history');
      if (savedMessages) {
        const parsed = JSON.parse(savedMessages);
        // 将 ISO 字符串转换回 Date 对象
        const messagesWithDates = parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }));
        setMessages(messagesWithDates);
      }
    } catch (error) {
      console.error('读取聊天记录失败:', error);
    }
    isFirstLoad.current = false;
  }, []);

  // 【localStorage】消息变化时保存到本地（跳过首次加载）
  useEffect(() => {
    if (!isFirstLoad.current && messages.length > 0) {
      try {
        // 限制保存最近 50 条消息（避免占用过多空间）
        const messagesToSave = messages.slice(-50);
        localStorage.setItem('ai-chat-history', JSON.stringify(messagesToSave));
      } catch (error) {
        console.error('保存聊天记录失败:', error);
      }
    }
  }, [messages]);

  // 自动滚动到最新消息
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 自动调整输入框高度
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [input]);

  // 发送消息（流式输出）
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userInput = input.trim();
    setInput('');
    setIsLoading(true);

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    // 一次性添加用户消息和空的 AI 消息
    setMessages((prev) => [
      ...prev,
      {
        role: 'user',
        content: userInput,
        timestamp: new Date(),
      },
      {
        role: 'ai',
        content: '',
        timestamp: new Date(),
      },
    ]);

    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput }),
      });

      if (!response.ok) {
        throw new Error('AI 服务暂时不可用');
      }

      // 读取流式数据
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('无法读取响应流');
      }

      let buffer = '';
      let fullContent = ''; // 累积完整内容

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) {
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        
        // 保留未完成的行
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const jsonStr = line.slice(6).trim();
            if (jsonStr && jsonStr !== '[DONE]') {
              try {
                const data = JSON.parse(jsonStr);
                const content = data.content;
                
                if (content) {
                  // 累积内容（因为通义千问是增量输出）
                  fullContent += content;
                  
                  // 更新最后一个 AI 消息内容
                  setMessages((prev) => {
                    const newMessages = [...prev];
                    const lastIndex = newMessages.length - 1;
                    if (lastIndex >= 0 && newMessages[lastIndex].role === 'ai') {
                      newMessages[lastIndex] = {
                        ...newMessages[lastIndex],
                        content: fullContent,
                      };
                    }
                    return newMessages;
                  });
                }
              } catch (e) {
                console.error('解析流式数据错误:', e, jsonStr);
              }
            }
          }
        }
      }

    } catch (error) {
      console.error('发送消息错误:', error);
      
      // 更新最后一个 AI 消息为错误信息
      setMessages((prev) => {
        const newMessages = [...prev];
        const lastIndex = newMessages.length - 1;
        if (lastIndex >= 0 && newMessages[lastIndex].role === 'ai') {
          newMessages[lastIndex] = {
            ...newMessages[lastIndex],
            content: '抱歉，我现在遇到了一些问题。请稍后再试。',
          };
        }
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 按 Enter 发送
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // 新建对话
  const handleNewChat = () => {
    setMessages([]);
    setInput('');
    // 【localStorage】清除历史记录
    try {
      localStorage.removeItem('ai-chat-history');
    } catch (error) {
      console.error('清除聊天记录失败:', error);
    }
  };

  return (
    <div className="flex h-screen bg-white">
      {/* 主内容区域 */}
      <div className="flex-1 flex flex-col">
        {/* 顶部导航栏 - ChatGPT 风格 */}
        <header className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="text-white" size={16} />
            </div>
            <h1 className="text-lg font-semibold text-gray-900">通义千问</h1>
          </div>
          
          <div className="flex items-center gap-2">
            {messages.length > 0 && (
              <button
                onClick={handleNewChat}
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Plus size={16} />
                <span>新对话</span>
              </button>
            )}
            <a
              href="/"
              className="px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              返回首页
            </a>
          </div>
        </header>

        {/* 对话区域 */}
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            // 空状态 - 欢迎界面
            <div className="flex items-center justify-center h-full px-4">
              <div className="max-w-2xl w-full space-y-8 text-center py-12">
                <div className="space-y-3">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto">
                    <Sparkles className="text-white" size={32} />
                  </div>
                  <h2 className="text-3xl font-semibold text-gray-900">
                    你好！我是通义千问
                  </h2>
                  <p className="text-gray-600">
                    有什么可以帮助你的吗？
                  </p>
                </div>
              </div>
            </div>
          ) : (
            // 对话消息列表
            <div className="max-w-3xl mx-auto px-4 py-6">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-6 flex gap-4 ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.role === 'ai' && (
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="text-white" size={16} />
                    </div>
                  )}
                  
                  <div
                    className={`max-w-[85%] ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white rounded-2xl px-4 py-3'
                        : 'text-gray-900'
                    }`}
                  >
                    {message.role === 'ai' && message.content === '' ? (
                      // AI 思考中的加载动画
                      <div className="flex items-center gap-1 py-3">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    ) : (
                      <p className="text-[15px] leading-relaxed whitespace-pre-wrap">
                        {message.content}
                      </p>
                    )}
                  </div>

                  {message.role === 'user' && (
                    <div className="w-8 h-8 rounded-lg bg-gray-700 flex items-center justify-center flex-shrink-0">
                      <User className="text-white" size={16} />
                    </div>
                  )}
                </div>
              ))}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* 底部输入框 - ChatGPT 风格 */}
        <div className="border-t border-gray-200 px-4 py-4 bg-white">
          <div className="max-w-3xl mx-auto">
            <div className="relative flex items-end gap-2 bg-white border border-gray-300 rounded-xl shadow-sm focus-within:border-gray-400 transition-colors p-2">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="给通义千问发送消息..."
                className="flex-1 bg-transparent resize-none border-0 focus:outline-none focus:ring-0 text-gray-900 placeholder-gray-400 px-2 py-2 text-[15px] leading-6 max-h-[200px] min-h-[24px]"
                style={{ height: 'auto' }}
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className={`p-2 rounded-lg transition-all flex-shrink-0 ${
                  input.trim() && !isLoading
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
                type="button"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <Send size={18} />
                )}
              </button>
            </div>
            
            {/* 底部提示 */}
            <p className="mt-2 text-xs text-center text-gray-500">
              通义千问可能会犯错。请核查重要信息。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

