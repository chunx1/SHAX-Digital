import { MapPin, Mail, Phone, Clock, Send } from "lucide-react";

export default function Contact() {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Business Address",
      content: "Room 406, Building 6, Fenqing Garden, Siqian She Ethnic Town, Taishun County, Wenzhou City, Zhejiang Province",
      link: null
    },
    {
      icon: Phone,
      title: "Phone",
      content: "Contact us for business inquiries",
      link: null
    },
    {
      icon: Mail,
      title: "Email",
      content: "We look forward to your email",
      link: null
    },
    {
      icon: Clock,
      title: "Business Hours",
      content: "Monday - Friday 9:00 AM - 6:00 PM",
      link: null
    }
  ];

  return (
    <section id="contact" className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="heading-2 text-gray-900 mb-4">Contact Us</h2>
          <p className="text-body">
            We look forward to working with you. Feel free to contact us to learn more about our services. 
            Our professional team is ready to serve you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <div key={index} className="card flex items-start space-x-4 hover:shadow-2xl">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center">
                  <info.icon size={24} />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">{info.title}</h4>
                  {info.link ? (
                    <a href={info.link} className="text-gray-600 hover:text-primary-600 transition-colors">
                      {info.content}
                    </a>
                  ) : (
                    <p className="text-gray-600">{info.content}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="card">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Send a Message</h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Enter your message"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full btn-primary flex items-center justify-center"
              >
                <Send size={18} className="mr-2" />
                Send Message
              </button>
              <p className="text-xs text-gray-500 text-center mt-2">
                * This is a demo form. Backend service integration required for actual use.
              </p>
            </form>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="mt-12">
          <div className="card bg-gradient-to-br from-primary-50 to-primary-100 min-h-[300px] flex items-center justify-center">
            <div className="text-center">
              <MapPin size={48} className="text-primary-600 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Our Location</h4>
              <p className="text-gray-600 max-w-md">
                Room 406, Building 6, Fenqing Garden, Siqian She Ethnic Town, Taishun County, Wenzhou City, Zhejiang Province
              </p>
              <p className="text-sm text-gray-500 mt-4">
                * Map functionality can be integrated with third-party map services in actual deployment
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
