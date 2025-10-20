export default function ConsultingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-pink-900 text-white">
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-5xl font-bold mb-6">商务咨询服务</h1>
        
        <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl mb-8">
          <h2 className="text-3xl font-bold mb-4">专业咨询解决方案</h2>
          <p className="text-lg mb-4">
            这个页面的 URL 路径是：/services/consulting
          </p>
          <p className="text-gray-300">
            你可以创建任意深度的路径结构，比如：
          </p>
          <ul className="list-disc list-inside mt-4 space-y-2 text-gray-300">
            <li>/services/consulting/business</li>
            <li>/services/consulting/marketing</li>
            <li>/products/category/subcategory/item</li>
            <li>/blog/2025/10/article-title</li>
          </ul>
        </div>

        <div className="flex gap-4">
          <a 
            href="/" 
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg"
          >
            返回首页
          </a>
          <a 
            href="/about" 
            className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg"
          >
            关于我们
          </a>
        </div>
      </div>
    </div>
  );
}


