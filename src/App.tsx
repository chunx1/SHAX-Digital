import { useState } from 'react';
import { GrainGradient, grainGradientPresets } from '@paper-design/shaders-react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Menu, 
  X, 
  CheckCircle2, 
  Mail, 
  Phone,
  MapPin,
  Clock,
  Globe,
  Palette,
  Megaphone,
  Users,
  Briefcase,
  TrendingUp,
  ChevronDown,
  Shield,
  FileText
} from 'lucide-react';

// Language content
const content = {
  en: {
    nav: {
      services: 'Services',
      about: 'About',
      contact: 'Contact',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      getStarted: 'Get Started',
    },
    hero: {
      badge: 'Professional • Innovative • Reliable',
      title: 'Elevate Your',
      titleHighlight: 'Digital Presence',
      subtitle: 'SHAX Digital delivers cutting-edge digital advertising, creative design, and comprehensive business solutions that drive results.',
      explore: 'Explore Services',
      contactUs: 'Contact Us',
      stats: [
        { number: '8+', label: 'Service Categories' },
        { number: '100%', label: 'Professional Team' },
        { number: '24/7', label: 'Support Available' },
        { number: '99%', label: 'Client Satisfaction' },
      ],
    },
    services: {
      badge: 'What We Offer',
      title: 'Our Services',
      subtitle: 'Comprehensive digital solutions tailored to elevate your brand and drive business growth.',
      items: [
        {
          icon: Megaphone,
          title: 'Digital Advertising',
          description: 'Cutting-edge digital content creation with creative planning, video production, animation design, and interactive ads.',
        },
        {
          icon: Palette,
          title: 'Creative Design',
          description: 'Innovative visual communication strategies including brand design, graphics, VI, and packaging design.',
        },
        {
          icon: TrendingUp,
          title: 'Advertising & Agency',
          description: 'Google Ads campaign management powered by API automation, including campaign creation, optimization, performance monitoring, and data-driven insights for maximum ROI.',
        },
        {
          icon: Users,
          title: 'Cultural Events',
          description: 'Professional event planning, venue coordination, guest invitation, and on-site execution for cultural activities.',
        },
        {
          icon: FileText,
          title: 'Creative Content',
          description: 'Professional content creation including copywriting, script writing, artistic direction, and creative consulting.',
        },
        {
          icon: Briefcase,
          title: 'Trade & Office Services',
          description: 'Trade agency, procurement, sales, logistics coordination, and comprehensive office services.',
        },
      ],
    },
    about: {
      badge: 'About Us',
      title: 'Your Trusted Digital Partner',
      description: 'SHAX Digital (SHAX Digital Media & Commerce) is a professional organization specializing in digital advertising, cultural arts, and business services. We are committed to delivering high-quality, comprehensive solutions for our clients.',
      advantages: [
        'Professional expertise with certified team',
        'Innovative strategies for modern businesses',
        'Reliable services with proven results',
        'Comprehensive solutions under one roof',
      ],
      brandName: 'SHAX',
      brandSubtitle: 'Digital',
      brandTagline: 'Professional • Innovative • Reliable',
    },
    contact: {
      badge: 'Get In Touch',
      title: 'Contact Us',
      subtitle: 'Ready to elevate your digital presence? Let\'s discuss how we can help your business grow.',
      items: [
        { icon: Mail, title: 'Email', main: 'q1263451893@gmail.com', sub: '备用: 15355902080@163.com' },
        { icon: MapPin, title: 'Address', main: 'Zhejiang, China', sub: '' },
        { icon: Clock, title: 'Hours', main: 'Mon-Fri 9AM-6PM', sub: '' },
      ],
    },
    privacy: {
      title: 'Privacy Policy',
      intro: 'At SHAX Digital, we take your privacy seriously. This Privacy Policy outlines how we collect, use, and protect your personal information.',
      sections: [
        { title: 'Information We Collect', items: ['Personal information (name, email, phone number)', 'Business information for service delivery', 'Google Ads account information (when using our advertising services)', 'Usage data and analytics'] },
        { title: 'How We Use Your Data', items: ['Providing digital advertising and marketing services', 'Account management and customer support', 'Performance monitoring and analytics', 'Communication about services and updates'] },
        { title: 'Data Protection', text: 'We implement appropriate security measures to protect your personal information. Your data is stored securely and only accessible to authorized personnel.' },
        { title: 'Google Ads Data', text: 'When providing Google Ads management services, we interact with your Google Ads account solely for the purpose of managing your advertising campaigns. We do not share your Google Ads data with third parties without your explicit consent.' },
        { title: 'Contact Us', text: 'For questions about this Privacy Policy, please contact us through our website.' },
      ],
    },
    terms: {
      title: 'Terms of Service',
      intro: 'By using SHAX Digital\'s services, you agree to these Terms of Service. Please read them carefully.',
      sections: [
        { title: 'Service Scope', text: 'SHAX Digital provides digital advertising, creative design, and business services as described on our website. We reserve the right to modify services at any time.' },
        { title: 'User Responsibilities', items: ['Provide accurate and complete information', 'Maintain the security of account credentials', 'Use services in compliance with applicable laws', 'Respect intellectual property rights'] },
        { title: 'Intellectual Property', text: 'All content, designs, and materials created by SHAX Digital remain our intellectual property unless otherwise agreed in writing.' },
        { title: 'Limitation of Liability', text: 'SHAX Digital provides services "as is" without warranties. We are not liable for indirect, incidental, or consequential damages arising from service use.' },
        { title: 'Google Ads Services', text: 'When using our Google Ads management services, you acknowledge that: (1) We access your Google Ads account solely to manage campaigns as instructed, (2) You maintain ownership of your Google Ads accounts and data, (3) Services comply with Google Ads API policies.' },
        { title: 'Termination', text: 'Either party may terminate services with written notice. Upon termination, all outstanding payments become due.' },
        { title: 'Governing Law', text: 'These terms are governed by the laws of the People\'s Republic of China.' },
      ],
    },
    footer: {
      description: 'Professional digital advertising and business solutions provider.',
      services: ['Digital Advertising', 'Creative Design', 'Advertising Agency', 'Cultural Events'],
      company: ['About Us', 'Contact', 'Privacy Policy', 'Terms of Service'],
      copyright: '© 2025 SHAX Digital Media & Commerce. All rights reserved.',
    },
  },
  zh: {
    nav: {
      services: '服务',
      about: '关于我们',
      contact: '联系方式',
      privacy: '隐私政策',
      terms: '服务条款',
      getStarted: '立即咨询',
    },
    hero: {
      badge: '专业 • 创新 • 可靠',
      title: '提升您的',
      titleHighlight: '数字影响力',
      subtitle: 'SHAX Digital 提供尖端的数字广告、创意设计和综合商业解决方案，助力增长。',
      explore: '探索服务',
      contactUs: '联系我们',
      stats: [
        { number: '8+', label: '服务类别' },
        { number: '100%', label: '专业团队' },
        { number: '24/7', label: '全天候支持' },
        { number: '99%', label: '客户满意度' },
      ],
    },
    services: {
      badge: '我们的服务',
      title: '服务项目',
      subtitle: '量身定制的数字解决方案，助力品牌提升和业务增长。',
      items: [
        {
          icon: Megaphone,
          title: '数字广告',
          description: '尖端数字内容制作，包括创意策划、视频制作、动画设计和互动广告。',
        },
        {
          icon: Palette,
          title: '创意设计',
          description: '创新视觉传播策略，包括品牌设计、图形设计、VI设计和包装设计。',
        },
        {
          icon: TrendingUp,
          title: '广告代理',
          description: 'Google Ads 广告系列 API 自动化管理，包含创建、优化、效果监测和数据洞察，助您实现最佳投资回报。',
        },
        {
          icon: Users,
          title: '文化活动',
          description: '专业活动策划、场地协调、嘉宾邀请和现场执行。',
        },
        {
          icon: FileText,
          title: '创意内容',
          description: '专业内容创作，包括文案撰写、脚本写作、艺术指导和创意咨询。',
        },
        {
          icon: Briefcase,
          title: '贸易办公服务',
          description: '贸易代理、采购、销售、物流协调和综合办公服务。',
        },
      ],
    },
    about: {
      badge: '关于我们',
      title: '您值得信赖的数字伙伴',
      description: 'SHAX Digital（沙溪数字传媒与商务）是一家专业从事数字广告、文化艺术和商业服务的机构。我们致力于为客户提供高质量的综合解决方案。',
      advantages: [
        '专业资质的认证团队',
        '面向现代企业的创新策略',
        '经过验证的可靠服务',
        '一站式综合解决方案',
      ],
      brandName: '沙溪',
      brandSubtitle: '数字',
      brandTagline: '专业 • 创新 • 可靠',
    },
    contact: {
      badge: '联系我们',
      title: '联系方式',
      subtitle: '准备好提升您的数字影响力了吗？让我们讨论如何帮助您的业务增长。',
      items: [
        { icon: Mail, title: '邮箱', main: 'q1263451893@qq.com', sub: '备用: 15355902080@163.com' },
        { icon: MapPin, title: '地址', main: '中国浙江省', sub: '' },
        { icon: Clock, title: '营业时间', main: '周一至周五 9:00-18:00', sub: '' },
      ],
    },
    privacy: {
      title: '隐私政策',
      intro: 'SHAX Digital 非常重视您的隐私。本隐私政策说明我们如何收集、使用和保护您的个人信息。',
      sections: [
        { title: '我们收集的信息', items: ['个人信息（姓名、邮箱、电话号码）', '服务所需的业务信息', '使用广告服务时的Google Ads账户信息', '使用数据和 analytics'] },
        { title: '数据使用方式', items: ['提供数字广告和营销服务', '账户管理和客户支持', '效果监测和分析', '服务沟通和更新'] },
        { title: '数据保护', text: '我们采取适当的安全措施来保护您的个人信息。您的数据存储安全，仅授权人员可访问。' },
        { title: 'Google Ads数据', text: '提供Google Ads管理服务时，我们仅出于管理广告系列的目的与您的Google Ads账户进行交互。未经您明确同意，我们不会与第三方共享您的Google Ads数据。' },
        { title: '联系我们', text: '如有问题，请通过网站联系我们。' },
      ],
    },
    terms: {
      title: '服务条款',
      intro: '使用SHAX Digital的服务即表示您同意本服务条款。请仔细阅读。',
      sections: [
        { title: '服务范围', text: 'SHAX Digital 提供网站上描述的数字广告、创意设计和商业服务。我们保留随时修改服务的权利。' },
        { title: '用户责任', items: ['提供准确完整的信息', '维护账户凭证安全', '按适用法律使用服务', '尊重知识产权'] },
        { title: '知识产权', text: 'SHAX Digital 创建的所有内容、设计和材料均归我们所有，除非另有书面约定。' },
        { title: '责任限制', text: 'SHAX Digital 按"原样"提供服务，不提供任何担保。我们不对因使用服务而产生的间接、偶然或后果性损害负责。' },
        { title: 'Google Ads服务', text: '使用我们的Google Ads管理服务即表示您确认：(1) 我们仅根据指示管理广告系列，(2) 您保留Google Ads账户和数据的所有权，(3) 服务符合Google Ads API政策。' },
        { title: '终止', text: '任何一方均可书面通知终止服务。终止后，所有未付款项将立即到期。' },
        { title: '适用法律', text: '本条款受中华人民共和国法律管辖。' },
      ],
    },
    footer: {
      description: '专业数字广告和商业解决方案提供商。',
      services: ['数字广告', '创意设计', '广告代理', '文化活动'],
      company: ['关于我们', '联系方式', '隐私政策', '服务条款'],
      copyright: '© 2025 SHAX Digital Media & Commerce. 保留所有权利。',
    },
  },
};

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'zh'>('en');
  const t = content[language];

  return (
    <div className="min-h-screen bg-tech-50 font-sans text-tech-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-tech-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-tech-700 to-tech-500 bg-clip-text text-transparent">
                SHAX
              </span>
              <span className="ml-1 text-sm text-tech-500 font-medium">Digital</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {[
                { name: t.nav.services, href: '#services' },
                { name: t.nav.about, href: '#about' },
                { name: t.nav.contact, href: '#contact' },
                { name: t.nav.privacy, href: '#privacy' },
                { name: t.nav.terms, href: '#terms' },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-tech-600 hover:text-tech-900 transition-colors text-sm font-medium"
                >
                  {item.name}
                </a>
              ))}
              
              {/* Language Switcher */}
              <button
                onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-tech-300 text-tech-600 hover:bg-tech-100 hover:border-tech-400 transition-all text-sm font-medium"
              >
                <Globe className="w-4 h-4" />
                {language === 'en' ? '中文' : 'EN'}
              </button>
              
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-tech-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-tech-800 transition-colors flex items-center gap-2 cursor-pointer"
              >
                {t.nav.getStarted} <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile menu button + Language */}
            <div className="md:hidden flex items-center gap-2">
              {/* Language Switcher Mobile */}
              <button
                onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
                className="flex items-center gap-1 px-2 py-1.5 rounded-lg border border-tech-300 text-tech-600 hover:bg-tech-100 transition-all text-sm"
              >
                <Globe className="w-4 h-4" />
                {language === 'en' ? '中' : 'EN'}
              </button>
              
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-tech-600"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-tech-200">
            <div className="px-4 py-4 space-y-3">
              {[
                { name: t.nav.services, href: '#services' },
                { name: t.nav.about, href: '#about' },
                { name: t.nav.contact, href: '#contact' },
                { name: t.nav.privacy, href: '#privacy' },
                { name: t.nav.terms, href: '#terms' },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-tech-600 hover:text-tech-900 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section with GrainGradient */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <GrainGradient
            {...grainGradientPresets[0]}
            className="w-full h-full"
          />
        </div>
        
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-white/30 via-transparent to-white/60" />
        
        {/* Hero Content */}
        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 bg-tech-900/10 border border-tech-300/30 rounded-full text-tech-700 text-sm font-medium mb-6">
              {t.hero.badge}
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-tech-900 mb-6 leading-tight">
              {t.hero.title}{' '}
              <span className="bg-gradient-to-r from-tech-600 to-tech-400 bg-clip-text text-transparent">
                {t.hero.titleHighlight}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-tech-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-tech-900 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-tech-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                {t.hero.explore} <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-tech-900 border-2 border-tech-200 px-8 py-4 rounded-xl text-lg font-semibold hover:border-tech-400 hover:bg-tech-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {t.hero.contactUs}
              </button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {t.hero.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-tech-900 mb-2">{stat.number}</div>
                <div className="text-tech-500 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 border-2 border-tech-400 rounded-full flex justify-center pt-2"
          >
            <motion.div className="w-1 h-2 bg-tech-500 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-tech-500 font-medium">{t.services.badge}</span>
            <h2 className="text-4xl font-bold text-tech-900 mt-2">{t.services.title}</h2>
            <p className="text-tech-600 mt-4 max-w-2xl mx-auto">
              {t.services.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.services.items.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group p-8 rounded-2xl border border-tech-200 hover:border-tech-400 hover:shadow-xl transition-all bg-white"
              >
                <div className="w-14 h-14 bg-tech-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-tech-900 transition-colors">
                  <service.icon className="w-7 h-7 text-tech-700 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-tech-900 mb-3">{service.title}</h3>
                <p className="text-tech-600 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-tech-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-tech-500 font-medium">{t.about.badge}</span>
              <h2 className="text-4xl font-bold text-tech-900 mt-2 mb-6">
                {t.about.title}
              </h2>
              <p className="text-tech-600 text-lg leading-relaxed mb-8">
                {t.about.description}
              </p>
              
              <div className="space-y-4">
                {t.about.advantages.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-tech-700 flex-shrink-0" />
                    <span className="text-tech-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-tech-200 to-tech-400 p-1">
                <div className="w-full h-full rounded-3xl bg-white flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="text-6xl font-bold text-tech-900 mb-2">{t.about.brandName}</div>
                    <div className="text-tech-500 text-xl">{t.about.brandSubtitle}</div>
                    <div className="mt-6 text-tech-600 text-sm">
                      {t.about.brandTagline}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-tech-100 rounded-2xl -z-10" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-tech-200 rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-tech-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-tech-400 font-medium">{t.contact.badge}</span>
            <h2 className="text-4xl font-bold mt-2">{t.contact.title}</h2>
            <p className="text-tech-300 mt-4 max-w-2xl mx-auto">
              {t.contact.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {t.contact.items.map((item, index) => (
              <div key={index} className="bg-tech-800/50 p-8 rounded-2xl text-center">
                <item.icon className="w-8 h-8 mx-auto mb-4 text-tech-300" />
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-tech-300">{item.main}</p>
                {item.sub && <p className="text-tech-400 text-xs mt-1">{item.sub}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy Policy Section */}
      <section id="privacy" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <Shield className="w-8 h-8 text-tech-700" />
            <h2 className="text-3xl font-bold text-tech-900">{t.privacy.title}</h2>
          </div>
          
          <div className="prose prose-lg text-tech-600 max-w-none">
            <p className="text-lg mb-6">
              {t.privacy.intro}
            </p>

            {t.privacy.sections.map((section, index) => (
              <div key={index}>
                <h3 className="text-xl font-semibold text-tech-900 mb-4">{section.title}</h3>
                {section.items && (
                  <ul className="list-disc pl-6 mb-6 space-y-2">
                    {section.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
                {section.text && <p className="mb-6">{section.text}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Terms of Service Section */}
      <section id="terms" className="py-24 bg-tech-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <FileText className="w-8 h-8 text-tech-700" />
            <h2 className="text-3xl font-bold text-tech-900">{t.terms.title}</h2>
          </div>
          
          <div className="prose prose-lg text-tech-600 max-w-none">
            <p className="text-lg mb-6">
              {t.terms.intro}
            </p>

            {t.terms.sections.map((section, index) => (
              <div key={index}>
                <h3 className="text-xl font-semibold text-tech-900 mb-4">{section.title}</h3>
                {section.items && (
                  <ul className="list-disc pl-6 mb-6 space-y-2">
                    {section.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
                {section.text && <p className="mb-6">{section.text}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-tech-900 text-white py-12 border-t border-tech-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold mb-4">
                <span className="bg-gradient-to-r from-white to-tech-300 bg-clip-text text-transparent">
                  SHAX
                </span>
                <span className="ml-1 text-sm text-tech-400">Digital</span>
              </div>
              <p className="text-tech-400 text-sm">
                {t.footer.description}
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">{language === 'en' ? 'Services' : '服务'}</h4>
              <ul className="space-y-2 text-tech-400 text-sm">
                {t.footer.services.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">{language === 'en' ? 'Company' : '公司'}</h4>
              <ul className="space-y-2 text-tech-400 text-sm">
                {t.footer.company.map((item, index) => (
                  <li key={index}>
                    <a href={index === 0 ? '#about' : index === 1 ? '#contact' : index === 2 ? '#privacy' : '#terms'} className="hover:text-white">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">{language === 'en' ? 'Contact' : '联系方式'}</h4>
              <ul className="space-y-2 text-tech-400 text-sm">
                <li>q1263451893@gmail.com</li>
                <li>{language === 'en' ? 'Zhejiang, China' : '中国浙江省'}</li>
                <li>{language === 'en' ? 'Mon-Fri 9AM-6PM' : '周一至周五 9:00-18:00'}</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-tech-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-tech-400 text-sm">
              {t.footer.copyright}
            </p>
            <div className="flex items-center gap-6 mt-4 md:mt-0">
              <a href="#privacy" className="text-tech-400 hover:text-white text-sm">{t.nav.privacy}</a>
              <a href="#terms" className="text-tech-400 hover:text-white text-sm">{t.nav.terms}</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
