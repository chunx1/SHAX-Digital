import { Building2, User, Calendar, MapPin, FileText, Award, Users } from "lucide-react";

export default function About() {
  const companyInfo = [
    {
      icon: Building2,
      label: "Company Name",
      value: "SHAX Digital Media & Commerce"
    },
    {
      icon: FileText,
      label: "Business Type",
      value: "Individual Enterprise"
    },
    {
      icon: User,
      label: "Operator",
      value: "Lei Aiju"
    },
    {
      icon: Calendar,
      label: "Registration Date",
      value: "June 30, 2025"
    },
    {
      icon: MapPin,
      label: "Business Location",
      value: "Room 406, Building 6, Fenqing Garden, Siqian She Ethnic Town, Taishun County, Wenzhou City, Zhejiang Province"
    }
  ];

  return (
    <section id="about" className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="heading-2 text-gray-900 mb-4">About Us</h2>
          <p className="text-body">
            SHAX Digital is a professional organization focusing on digital advertising, cultural arts, 
            and business services, committed to providing high-quality and comprehensive solutions to our clients.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Company Info Cards */}
          <div className="space-y-4">
            <h3 className="heading-3 text-gray-900 mb-6">Company Profile</h3>
            {companyInfo.map((info, index) => (
              <div key={index} className="card flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center">
                  <info.icon size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-gray-500 mb-1">{info.label}</div>
                  <div className="font-medium text-gray-900 break-words">{info.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Business Scope */}
          <div>
            <h3 className="heading-3 text-gray-900 mb-6 flex items-center">
              <Award className="mr-3 text-primary-600" size={28} />
              Business Scope
            </h3>
            <div className="card">
              <div className="prose prose-sm max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  General Business Activities:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2 mt-1">•</span>
                    <span>Digital Advertising Production</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2 mt-1">•</span>
                    <span>Advertising Production</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2 mt-1">•</span>
                    <span>Advertising Publishing, Design & Agency Services</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2 mt-1">•</span>
                    <span>Digital Advertising Distribution</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2 mt-1">•</span>
                    <span>Organization of Cultural & Artistic Exchange Activities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2 mt-1">•</span>
                    <span>Creative Content & Artistic Creation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2 mt-1">•</span>
                    <span>Domestic Trade Agency</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2 mt-1">•</span>
                    <span>Office Services</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2 mt-1">•</span>
                    <span>Conference & Exhibition Services</span>
                  </li>
                </ul>
                <p className="text-sm text-gray-500 mt-4 italic">
                  Except for projects that require legal approval, business operations are conducted independently 
                  in accordance with the business license
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award size={32} />
            </div>
            <h4 className="font-semibold text-lg text-gray-900 mb-2">Professional Credentials</h4>
            <p className="text-sm text-gray-600">
              Legal and compliant operations with complete business qualifications and professional capabilities
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users size={32} />
            </div>
            <h4 className="font-semibold text-lg text-gray-900 mb-2">Expert Team</h4>
            <p className="text-sm text-gray-600">
              Experienced professional team providing high-quality services
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 size={32} />
            </div>
            <h4 className="font-semibold text-lg text-gray-900 mb-2">Integrity-Based Business</h4>
            <p className="text-sm text-gray-600">
              Integrity as our foundation, creating long-term value for clients
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
