'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Plus, User, Sparkles, Trash2, Menu, X } from 'lucide-react';

interface Message {
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export default function AiCreatorPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isFirstLoad = useRef(true);

  // 获取当前对话
  const currentConversation = conversations.find(c => c.id === currentConversationId);
  const messages = currentConversation?.messages || [];

  // 【localStorage】页面加载时读取所有对话
  useEffect(() => {
    try {
      const savedConversations = localStorage.getItem('ai-conversations');
      const savedCurrentId = localStorage.getItem('ai-current-conversation-id');
      
      if (savedConversations) {
        const parsed = JSON.parse(savedConversations);
        const conversationsWithDates = parsed.map((conv: any) => ({
          ...conv,
          createdAt: new Date(conv.createdAt),
          updatedAt: new Date(conv.updatedAt),
          messages: conv.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          })),
        }));
        setConversations(conversationsWithDates);
        
        if (savedCurrentId && conversationsWithDates.find((c: Conversation) => c.id === savedCurrentId)) {
          setCurrentConversationId(savedCurrentId);
        } else if (conversationsWithDates.length > 0) {
          setCurrentConversationId(conversationsWithDates[0].id);
        }
      }
    } catch (error) {
      console.error('读取对话失败:', error);
    }
    isFirstLoad.current = false;
  }, []);

  // 【localStorage】保存对话到本地
  useEffect(() => {
    if (!isFirstLoad.current && conversations.length > 0) {
      try {
        localStorage.setItem('ai-conversations', JSON.stringify(conversations));
      } catch (error) {
        console.error('保存对话失败:', error);
      }
    }
  }, [conversations]);

  // 【localStorage】保存当前对话 ID
  useEffect(() => {
    if (!isFirstLoad.current && currentConversationId) {
      try {
        localStorage.setItem('ai-current-conversation-id', currentConversationId);
      } catch (error) {
        console.error('保存当前对话 ID 失败:', error);
      }
    }
  }, [currentConversationId]);

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

  // 生成对话标题（取第一条用户消息的前20个字符）
  const generateTitle = (firstMessage: string): string => {
    return firstMessage.length > 20 ? firstMessage.slice(0, 20) + '...' : firstMessage;
  };

  // 新建对话
  const handleNewChat = () => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: '新对话',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setConversations(prev => [newConversation, ...prev]);
    setCurrentConversationId(newConversation.id);
    setInput('');
  };

  // 切换对话
  const handleSwitchConversation = (id: string) => {
    setCurrentConversationId(id);
    setInput('');
  };

  // 删除对话
  const handleDeleteConversation = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newConversations = conversations.filter(c => c.id !== id);
    setConversations(newConversations);
    
    if (currentConversationId === id) {
      if (newConversations.length > 0) {
        setCurrentConversationId(newConversations[0].id);
      } else {
        setCurrentConversationId(null);
      }
    }
  };

  // 发送消息（流式输出）
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userInput = input.trim();
    setInput('');
    setIsLoading(true);

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    // 如果没有当前对话，创建一个新对话
    let conversationId = currentConversationId;
    if (!conversationId) {
      const newConversation: Conversation = {
        id: Date.now().toString(),
        title: generateTitle(userInput),
        messages: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setConversations(prev => [newConversation, ...prev]);
      setCurrentConversationId(newConversation.id);
      conversationId = newConversation.id;
    }

    // 添加用户消息和空的 AI 消息
    setConversations(prev => prev.map(conv => {
      if (conv.id === conversationId) {
        const newMessages = [
          ...conv.messages,
          {
            role: 'user' as const,
            content: userInput,
            timestamp: new Date(),
          },
          {
            role: 'ai' as const,
            content: '',
            timestamp: new Date(),
          },
        ];
        
        // 如果是第一条消息，更新标题
        const newTitle = conv.messages.length === 0 ? generateTitle(userInput) : conv.title;
        
        return {
          ...conv,
          title: newTitle,
          messages: newMessages,
          updatedAt: new Date(),
        };
      }
      return conv;
    }));

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

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('无法读取响应流');
      }

      let buffer = '';
      let fullContent = '';

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) {
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const jsonStr = line.slice(6).trim();
            if (jsonStr && jsonStr !== '[DONE]') {
              try {
                const data = JSON.parse(jsonStr);
                const content = data.content;
                
                if (content) {
                  fullContent += content;
                  
                  setConversations(prev => prev.map(conv => {
                    if (conv.id === conversationId) {
                      const newMessages = [...conv.messages];
                      const lastIndex = newMessages.length - 1;
                      if (lastIndex >= 0 && newMessages[lastIndex].role === 'ai') {
                        newMessages[lastIndex] = {
                          ...newMessages[lastIndex],
                          content: fullContent,
                        };
                      }
                      return { ...conv, messages: newMessages, updatedAt: new Date() };
                    }
                    return conv;
                  }));
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
      
      setConversations(prev => prev.map(conv => {
        if (conv.id === conversationId) {
          const newMessages = [...conv.messages];
          const lastIndex = newMessages.length - 1;
          if (lastIndex >= 0 && newMessages[lastIndex].role === 'ai') {
            newMessages[lastIndex] = {
              ...newMessages[lastIndex],
              content: '抱歉，我现在遇到了一些问题。请稍后再试。',
            };
          }
          return { ...conv, messages: newMessages };
        }
        return conv;
      }));
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

  return (
    <div className="flex h-screen bg-white">
      {/* 左侧边栏 - 对话列表 */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 bg-gray-50 border-r border-gray-200 flex flex-col overflow-hidden`}>
        {/* 边栏头部 */}
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={handleNewChat}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
          >
            <Plus size={18} />
            <span className="font-medium">新对话</span>
          </button>
        </div>

        {/* 对话列表 */}
        <div className="flex-1 overflow-y-auto p-2">
          {conversations.length === 0 ? (
            <div className="text-center py-8 text-gray-400 text-sm">
              暂无对话历史
            </div>
          ) : (
            <div className="space-y-1">
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => handleSwitchConversation(conv.id)}
                  className={`group relative p-3 rounded-lg cursor-pointer transition-all ${
                    currentConversationId === conv.id
                      ? 'bg-white shadow-sm border border-blue-200'
                      : 'hover:bg-white hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {conv.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {conv.messages.length} 条消息
                      </p>
                    </div>
                    <button
                      onClick={(e) => handleDeleteConversation(conv.id, e)}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded transition-all"
                      title="删除对话"
                    >
                      <Trash2 size={14} className="text-red-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 主内容区域 */}
      <div className="flex-1 flex flex-col">
        {/* 顶部导航栏 */}
        <header className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="text-white" size={16} />
              </div>
              <h1 className="text-lg font-semibold text-gray-900">通义千问</h1>
            </div>
          </div>
          
          <a
            href="/"
            className="px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            返回首页
          </a>
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

        {/* 输入区域 */}
        <div className="border-t border-gray-200 p-4">
          <div className="max-w-3xl mx-auto">
            <div className="relative flex items-end gap-2 bg-gray-50 rounded-2xl border border-gray-200 focus-within:border-blue-400 transition-colors">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="给通义千问发送消息..."
                className="flex-1 bg-transparent px-4 py-3 text-gray-900 placeholder-gray-400 resize-none outline-none max-h-32"
                rows={1}
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                type="button"
                className={`m-2 p-2 rounded-lg transition-all ${
                  input.trim() && !isLoading
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Send size={18} />
              </button>
            </div>
            <p className="text-xs text-gray-400 text-center mt-2">
              通义千问可能会出错。请核查重要信息。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
