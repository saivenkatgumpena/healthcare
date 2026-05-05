import React from "react";
import Hero from "../components/Hero";

const Services = () => {
  const servicesList = [
    {
      title: "Cardiology",
      description: "State-of-the-art cardiovascular care, from routine checkups to complex surgeries.",
      icon: "❤️"
    },
    {
      title: "Neurology",
      description: "Advanced diagnosis and treatment for neurological disorders by expert neurologists.",
      icon: "🧠"
    },
    {
      title: "Pediatrics",
      description: "Comprehensive care for infants, children, and adolescents in a kid-friendly environment.",
      icon: "👶"
    },
    {
      title: "Orthopedics",
      description: "Specialized care for bones, joints, ligaments, tendons, and muscles.",
      icon: "🦴"
    },
    {
      title: "Dermatology",
      description: "Expert skin care treatments, including cosmetic and medical dermatology.",
      icon: "🧴"
    },
    {
      title: "Emergency Care",
      description: "24/7 emergency services equipped to handle all medical emergencies.",
      icon: "🚑"
    }
  ];

  return (
    <>
      <Hero
        title={"Our Services | VitaCare"}
        imageUrl={"/about.png"}
      />
      <section className="services-container container">
        <h2 style={{ textAlign: "center", marginBottom: "40px" }}>Medical Services We Provide</h2>
        <div className="services-grid" style={{
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
          gap: "30px",
          paddingBottom: "60px"
        }}>
          {servicesList.map((service, index) => (
            <div key={index} className="service-card" style={{
              background: "#fff",
              padding: "30px",
              borderRadius: "15px",
              boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
              textAlign: "center",
              transition: "transform 0.3s ease"
            }}>
              <div style={{ fontSize: "50px", marginBottom: "20px" }}>{service.icon}</div>
              <h3 style={{ marginBottom: "15px", color: "#271776" }}>{service.title}</h3>
              <p style={{ color: "#555", fontSize: "16px", lineHeight: "1.6" }}>{service.description}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Services;
