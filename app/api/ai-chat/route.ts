import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return new Response(
        JSON.stringify({ error: '请输入消息' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = process.env.QWEN_API_KEY;

    if (!apiKey) {
      console.error('未找到 QWEN_API_KEY 环境变量');
      return new Response(
        JSON.stringify({ error: 'API 配置错误，请检查环境变量' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 调用阿里云通义千问 API（流式输出）
    const apiUrl = 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation';

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'X-DashScope-SSE': 'enable', // 启用流式输出
      },
      body: JSON.stringify({
        model: 'qwen-turbo',
        input: {
          messages: [
            {
              role: 'user',
              content: message,
            },
          ],
        },
        parameters: {
          result_format: 'message',
          incremental_output: true, // 增量输出
          temperature: 0.7,
          top_p: 0.8,
          max_tokens: 2000,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('通义千问 API 错误:', errorData);
      return new Response(
        JSON.stringify({ error: 'AI 服务暂时不可用，请稍后重试' }),
        { status: response.status, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 创建流式响应
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }

        const decoder = new TextDecoder();
        let buffer = '';

        try {
          while (true) {
            const { done, value } = await reader.read();
            
            if (done) {
              controller.close();
              break;
            }

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';

            for (const line of lines) {
              if (line.startsWith('data:')) {
                const jsonStr = line.slice(5).trim();
                if (jsonStr === '[DONE]') {
                  continue;
                }

                try {
                  const data = JSON.parse(jsonStr);
                  const content = data.output?.choices?.[0]?.message?.content;
                  
                  if (content) {
                    // 直接转发增量内容
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`));
                  }
                } catch (e) {
                  console.error('解析 SSE 数据错误:', jsonStr, e);
                }
              }
            }
          }
        } catch (error) {
          console.error('流式传输错误:', error);
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error('AI Chat API 错误:', error);
    return new Response(
      JSON.stringify({ error: '服务器错误，请稍后重试' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
