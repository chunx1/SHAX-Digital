import { 
  Monitor, 
  Palette, 
  Megaphone, 
  Users, 
  Pen, 
  ShoppingBag,
  Briefcase,
  Calendar
} from "lucide-react";
import ServiceCard from "./ServiceCard";

export default function Services() {
  const services = [
    {
      icon: Monitor,
      title: "Digital Advertising",
      description: "Professional digital advertising production services using cutting-edge technology to create eye-catching digital content.",
      features: ["Creative Planning", "Video Production", "Animation Design", "Interactive Ads"]
    },
    {
      icon: Palette,
      title: "Creative Design",
      description: "Innovative advertising design solutions, creating customized visual communication strategies for your brand.",
      features: ["Brand Design", "Graphic Design", "VI Design", "Packaging Design"]
    },
    {
      icon: Megaphone,
      title: "Advertising & Agency",
      description: "Comprehensive advertising publishing and agency services to help you precisely reach your target audience.",
      features: ["Media Placement", "Performance Monitoring", "Data Analytics", "Optimization Consulting"]
    },
    {
      icon: Users,
      title: "Cultural Events",
      description: "Organizing various cultural and artistic exchange activities to promote cultural dissemination and artistic development.",
      features: ["Event Planning", "Venue Coordination", "Guest Invitation", "On-site Execution"]
    },
    {
      icon: Pen,
      title: "Creative Content",
      description: "Professional creative writing team providing high-quality content and artistic creation services.",
      features: ["Copywriting", "Script Writing", "Artistic Direction", "Creative Consulting"]
    },
    {
      icon: ShoppingBag,
      title: "Trade Agency",
      description: "Professional domestic trade agency services to support your business development.",
      features: ["Procurement Agency", "Sales Agency", "Logistics Coordination", "Business Negotiation"]
    },
    {
      icon: Briefcase,
      title: "Office Services",
      description: "Comprehensive office service support to improve your work efficiency and office experience.",
      features: ["Document Processing", "Administrative Support", "Business Assistance", "Consulting Services"]
    },
    {
      icon: Calendar,
      title: "Conference & Exhibition",
      description: "Professional conference and exhibition organization services to ensure the success of your events.",
      features: ["Conference Planning", "Exhibition Design", "On-site Management", "Logistic Support"]
    }
  ];

  return (
    <section id="services" className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="heading-2 text-gray-900 mb-4">Our Services</h2>
          <p className="text-body">
            We provide comprehensive professional services covering digital advertising, cultural arts, 
            business agency, and more, committed to creating maximum value for our clients.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              features={service.features}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
