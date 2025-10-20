export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-6">关于我们 - 详细页面</h1>
        <p className="text-xl mb-4">
          这是一个新的页面，URL 是：/about
        </p>
        <p className="text-lg text-gray-300">
          你可以创建任意路径，完全免费！
        </p>
        
        <div className="mt-8">
          <a 
            href="/" 
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg inline-block"
          >
            返回首页
          </a>
        </div>
      </div>
    </div>
  );
}


