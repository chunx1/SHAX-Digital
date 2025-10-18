import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center gradient-banner pt-20">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full mb-6">
            <Sparkles size={16} />
            <span className="text-sm font-medium">Professional • Innovative • Reliable</span>
          </div>

          {/* Main Heading */}
          <h1 className="heading-1 text-gray-900 mb-6">
            SHAX Digital
            <span className="block text-primary-600 mt-2">Media & Commerce Solutions</span>
          </h1>

          {/* Description */}
          <p className="text-body max-w-2xl mx-auto mb-8">
            We specialize in digital advertising production, creative design services, cultural event organization, 
            and comprehensive business solutions. With innovative concepts and a professional team, we deliver 
            integrated solutions for all your needs.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#services" className="btn-primary">
              Our Services
              <ArrowRight className="inline-block ml-2" size={18} />
            </a>
            <a href="#contact" className="btn-secondary">
              Contact Us
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">Professional</div>
              <div className="text-sm text-gray-600">Team</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">Innovative</div>
              <div className="text-sm text-gray-600">Design</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">Efficient</div>
              <div className="text-sm text-gray-600">Execution</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">Reliable</div>
              <div className="text-sm text-gray-600">Partner</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

