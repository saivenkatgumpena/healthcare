import React, { useState } from "react";
import Hero from "../components/Hero";
import "./HealthGuide.css";

const conditions = [
  {
    id: 1,
    title: "Common Cold",
    icon: "🤧",
    color: "#e3f0ff",
    borderColor: "#4a90d9",
    causes: [
      "Rhinovirus infection (most common cause)",
      "Exposure to cold/flu-infected individuals",
      "Weakened immune system",
      "Cold and dry weather conditions",
    ],
    symptoms: [
      "Runny or stuffy nose",
      "Sneezing frequently",
      "Mild headache",
      "Sore throat",
      "Low-grade fever",
      "General fatigue",
    ],
    cures: [
      "Get plenty of rest and sleep",
      "Drink warm liquids like tea and soups",
      "Stay hydrated with water",
      "Gargle warm salt water for sore throat",
      "Use a humidifier to ease congestion",
    ],
    medicines: [
      "Paracetamol (for fever relief)",
      "Cetirizine (antihistamine for runny nose)",
      "Pseudoephedrine (decongestant)",
      "Vitamin C supplements",
      "Zinc lozenges",
    ],
  },
  {
    id: 2,
    title: "Cough",
    icon: "😮‍💨",
    color: "#fff3e0",
    borderColor: "#f5a623",
    causes: [
      "Throat irritation or infection",
      "Asthma or respiratory disorders",
      "Allergies or exposure to dust",
      "Postnasal drip from cold",
      "Acid reflux (GERD)",
    ],
    symptoms: [
      "Persistent dry or wet cough",
      "Chest tightness",
      "Shortness of breath (if severe)",
      "Sore throat",
      "Phlegm or mucus production",
    ],
    cures: [
      "Honey in warm water or tea",
      "Steam inhalation with eucalyptus oil",
      "Avoid cold drinks and dusty environments",
      "Ginger and tulsi tea",
      "Stay hydrated",
    ],
    medicines: [
      "Dextromethorphan (cough suppressant)",
      "Guaifenesin (expectorant for wet cough)",
      "Salbutamol inhaler (for asthma cough)",
      "Butamirate citrate syrup",
      "Ambroxol (mucolytic)",
    ],
  },
  {
    id: 3,
    title: "Fever",
    icon: "🌡️",
    color: "#ffeaea",
    borderColor: "#e74c3c",
    causes: [
      "Bacterial or viral infection",
      "Flu or Common Cold",
      "Inflammatory conditions",
      "Heat exhaustion",
      "Reaction to medicines or vaccines",
    ],
    symptoms: [
      "Body temperature above 100.4°F (38°C)",
      "Chills and shivering",
      "Sweating",
      "Headache and body aches",
      "Loss of appetite",
      "Dehydration",
    ],
    cures: [
      "Take adequate rest",
      "Stay cool with light clothing",
      "Drink plenty of cold water",
      "Apply a cool, damp cloth on forehead",
      "Eat light, easily digestible food",
    ],
    medicines: [
      "Paracetamol / Acetaminophen",
      "Ibuprofen (anti-inflammatory)",
      "Aspirin (adults only)",
      "Nimesulide (under doctor advice)",
      "Oral Rehydration Salts (ORS)",
    ],
  },
  {
    id: 4,
    title: "Stomach Pain",
    icon: "🤢",
    color: "#e8f8e8",
    borderColor: "#27ae60",
    causes: [
      "Indigestion or gas buildup",
      "Food poisoning or contamination",
      "Gastric ulcers or GERD",
      "Irritable Bowel Syndrome (IBS)",
      "Constipation or diarrhea",
      "Overeating or eating spicy food",
    ],
    symptoms: [
      "Stomach cramps or bloating",
      "Nausea or vomiting",
      "Diarrhea or constipation",
      "Loss of appetite",
      "Burping or flatulence",
      "Heartburn or acid reflux",
    ],
    cures: [
      "Drink ginger or peppermint tea",
      "Eat bland foods like bananas and rice",
      "Avoid spicy, fried, and fatty foods",
      "Use a heating pad on the abdomen",
      "Try digestive enzyme supplements",
    ],
    medicines: [
      "Antacids (Gelusil, Digene)",
      "Omeprazole or Pantoprazole (for ulcers)",
      "Domperidone (anti-nausea)",
      "Loperamide (for diarrhea)",
      "Simethicone (for gas/bloating)",
    ],
  },
  {
    id: 5,
    title: "Headache",
    icon: "🤕",
    color: "#f3e8ff",
    borderColor: "#8e44ad",
    causes: [
      "Stress, anxiety, or tension",
      "Dehydration",
      "Lack of sleep or poor posture",
      "Eye strain from screen time",
      "Migraine triggers (light, noise, food)",
      "Sinus infection or congestion",
    ],
    symptoms: [
      "Throbbing, dull, or sharp head pain",
      "Pain around temples or behind eyes",
      "Nausea (in migraines)",
      "Sensitivity to light and sound",
      "Stiff neck (tension headache)",
    ],
    cures: [
      "Rest in a quiet, dark room",
      "Apply cold or warm compress",
      "Stay hydrated — drink water",
      "Gentle scalp and neck massage",
      "Practice deep breathing or meditation",
    ],
    medicines: [
      "Paracetamol / Acetaminophen",
      "Ibuprofen or Naproxen",
      "Sumatriptan (for migraines)",
      "Aspirin (adults)",
      "Caffeine (small amount can relieve headache)",
    ],
  },
  {
    id: 6,
    title: "Allergies",
    icon: "🌿",
    color: "#fffbe6",
    borderColor: "#f39c12",
    causes: [
      "Pollen, dust mites, or mold",
      "Pet dander",
      "Certain foods (peanuts, dairy, shellfish)",
      "Insect stings",
      "Medications (penicillin, aspirin)",
      "Latex or certain fabrics",
    ],
    symptoms: [
      "Sneezing or runny nose",
      "Itchy, watery, or red eyes",
      "Skin rash or hives",
      "Swelling of lips or face",
      "Breathing difficulty (severe cases)",
      "Stomach cramps (food allergy)",
    ],
    cures: [
      "Identify and avoid allergen triggers",
      "Use air purifiers at home",
      "Wash hands and face after outdoor exposure",
      "Wear a mask in dusty environments",
      "Allergy immunotherapy (long-term treatment)",
    ],
    medicines: [
      "Cetirizine / Loratadine (antihistamines)",
      "Fexofenadine (non-drowsy)",
      "Prednisolone (severe reactions)",
      "Epinephrine auto-injector (anaphylaxis)",
      "Nasal corticosteroid sprays (Budesonide)",
    ],
  },
];

const HealthGuide = () => {
  const [selected, setSelected] = useState(null);
  const [activeTab, setActiveTab] = useState("causes");

  const handleSelect = (condition) => {
    if (selected && selected.id === condition.id) {
      setSelected(null);
    } else {
      setSelected(condition);
      setActiveTab("causes");
    }
  };

  return (
    <>
      <Hero
        title={"Health Guide | VitaCare"}
        imageUrl={"/about.png"}
      />
      <section className="health-guide-page container">
        <div className="hg-intro">
          <h2>Common Health Conditions</h2>
          <p>
            Click on any condition below to learn about its causes, symptoms,
            cures, and medicines recommended by our medical team.
          </p>
        </div>

        <div className="hg-grid">
          {conditions.map((cond) => (
            <div
              key={cond.id}
              className={`hg-card ${selected && selected.id === cond.id ? "hg-card--active" : ""}`}
              style={{
                background: cond.color,
                borderLeft: `5px solid ${cond.borderColor}`,
              }}
              onClick={() => handleSelect(cond)}
            >
              <span className="hg-icon">{cond.icon}</span>
              <h3>{cond.title}</h3>
              <span className="hg-tap-hint">
                {selected && selected.id === cond.id ? "Click to close ▲" : "Click to learn more ▼"}
              </span>
            </div>
          ))}
        </div>

        {selected && (
          <div
            className="hg-detail"
            style={{ borderTop: `4px solid ${selected.borderColor}` }}
          >
            <div className="hg-detail-header">
              <span className="hg-detail-icon">{selected.icon}</span>
              <h2>{selected.title}</h2>
            </div>

            <div className="hg-tabs">
              {["causes", "symptoms", "cures", "medicines"].map((tab) => (
                <button
                  key={tab}
                  className={`hg-tab ${activeTab === tab ? "hg-tab--active" : ""}`}
                  style={
                    activeTab === tab
                      ? { borderBottom: `3px solid ${selected.borderColor}`, color: selected.borderColor }
                      : {}
                  }
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <ul className="hg-list">
              {selected[activeTab].map((item, idx) => (
                <li key={idx} className="hg-list-item">
                  <span
                    className="hg-bullet"
                    style={{ background: selected.borderColor }}
                  ></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </>
  );
};

export default HealthGuide;
