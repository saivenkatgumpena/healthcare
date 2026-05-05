import React, { useState, useRef, useEffect } from "react";
import { FaRobot, FaTimes, FaPaperPlane, FaTrash } from "react-icons/fa";
import "./Chatbot.css";

// ─── LARGE MEDICAL KNOWLEDGE BASE ───────────────────────────────────────────
const knowledgeBase = [
  // Greetings
  { patterns: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening", "howdy"],
    response: "Hello! 👋 I'm VitaBot, your personal medical assistant. Ask me anything about symptoms, diseases, medicines, or appointments at VitaCare!" },
  { patterns: ["how are you", "how r u", "how are u"],
    response: "I'm doing great, thank you! 😊 How can I help you with your health today?" },
  { patterns: ["thank", "thanks", "thank you", "tysm", "ty"],
    response: "You're most welcome! 😊 Stay healthy and don't hesitate to ask if you need anything else." },
  { patterns: ["bye", "goodbye", "see you", "cya", "quit"],
    response: "Goodbye! 👋 Stay healthy and take care!" },
  { patterns: ["who are you", "what are you", "your name", "who r u"],
    response: "I'm **VitaBot** 🤖 — VitaCare's AI-powered medical assistant. I can help answer questions about symptoms, diseases, medicines, and hospital services." },

  // Appointments
  { patterns: ["appointment", "book", "schedule", "visit", "consult"],
    response: "📅 To book an appointment at VitaCare:\n- Click on **'Appointment'** in the top navigation bar\n- Fill in your details and preferred doctor\n- Choose your date and time\n\nNeed help choosing a department? Just ask!" },
  { patterns: ["cancel appointment", "reschedule"],
    response: "To cancel or reschedule your appointment, please contact our front desk at the hospital or use the appointments section. We recommend calling at least 24 hours in advance." },
  { patterns: ["doctor", "which doctor", "specialist"],
    response: "🩺 VitaCare has specialists in:\n• Cardiology\n• Neurology\n• Pediatrics\n• Orthopedics\n• Dermatology\n• General Medicine\n\nWhich specialty are you looking for?" },

  // Services
  { patterns: ["service", "services", "what do you offer", "what do you do", "what does vitacare offer"],
    response: "🏥 VitaCare offers a comprehensive range of services:\n• 🫀 Cardiology — Heart health\n• 🧠 Neurology — Brain & nerves\n• 👶 Pediatrics — Children's care\n• 🦴 Orthopedics — Bones & joints\n• 🧴 Dermatology — Skin care\n• 🚑 Emergency Care — 24/7 ready\n\nCheck our **Services** page for details!" },

  // Emergency
  { patterns: ["emergency", "urgent", "chest pain", "heart attack", "stroke", "unconscious", "accident", "not breathing", "collapsed"],
    response: "🚨 **EMERGENCY ALERT!**\n\nIf this is a life-threatening emergency, please:\n• Call **112** (Emergency Services) immediately\n• Or rush to the **Emergency Department** at VitaCare\n• Do NOT wait for an appointment\n\nWe are available 24/7 for emergencies." },

  // Fever
  { patterns: ["fever", "high temperature", "body temperature", "temperature"],
    response: "🌡️ **Fever Information:**\n\n**Causes:** Viral/bacterial infection, flu, COVID-19, inflammation\n\n**Symptoms:** Temperature >100.4°F, chills, sweating, headache, fatigue\n\n**Home Remedies:**\n• Rest and stay hydrated\n• Cool compress on forehead\n• Light clothing\n\n**Medicines:** Paracetamol, Ibuprofen, ORS\n\n⚠️ See a doctor if fever exceeds 103°F or lasts more than 3 days." },

  // Cold
  { patterns: ["cold", "runny nose", "stuffy nose", "sneezing", "nasal congestion", "common cold"],
    response: "🤧 **Common Cold:**\n\n**Causes:** Rhinovirus, weak immunity, cold weather exposure\n\n**Symptoms:** Runny/stuffy nose, sneezing, mild headache, sore throat, fatigue\n\n**Remedies:**\n• Warm tea with honey and ginger\n• Steam inhalation\n• Rest and fluids\n\n**Medicines:** Cetirizine, Pseudoephedrine, Paracetamol\n\nMost colds resolve in 7–10 days." },

  // Cough
  { patterns: ["cough", "coughing", "dry cough", "wet cough", "phlegm", "mucus"],
    response: "😮‍💨 **Cough Information:**\n\n**Types:**\n• Dry cough: Often from viral infection or allergies\n• Wet/productive cough: With phlegm, may indicate infection\n\n**Remedies:**\n• Honey in warm water\n• Steam inhalation\n• Avoid cold drinks\n\n**Medicines:**\n• Dry: Dextromethorphan\n• Wet: Guaifenesin, Ambroxol\n• Asthma: Salbutamol inhaler\n\n⚠️ Coughing blood? See a doctor immediately." },

  // Headache
  { patterns: ["headache", "head pain", "migraine", "head ache", "head hurts"],
    response: "🤕 **Headache / Migraine:**\n\n**Causes:** Stress, dehydration, poor sleep, eye strain, sinusitis, migraine triggers\n\n**Symptoms:** Throbbing, dull, or sharp pain; nausea (migraine); light sensitivity\n\n**Remedies:**\n• Rest in a quiet dark room\n• Cold/warm compress\n• Hydrate well\n• Scalp massage\n\n**Medicines:** Paracetamol, Ibuprofen, Sumatriptan (migraine), Aspirin\n\n⚠️ Sudden severe headache = seek emergency care." },

  // Stomach pain
  { patterns: ["stomach", "stomach pain", "stomach ache", "abdomen", "belly pain", "abdominal", "nausea", "vomiting"],
    response: "🤢 **Stomach Pain / Nausea:**\n\n**Causes:** Indigestion, food poisoning, gas, IBS, ulcers, GERD\n\n**Symptoms:** Cramping, bloating, nausea, vomiting, diarrhea\n\n**Remedies:**\n• Ginger/peppermint tea\n• Bland foods (rice, banana, toast)\n• Avoid spicy/fatty foods\n• Heating pad on abdomen\n\n**Medicines:** Antacids, Domperidone, Omeprazole, Simethicone\n\n⚠️ Severe pain with fever? See a doctor." },

  // Allergies
  { patterns: ["allergy", "allergies", "allergic", "rash", "hives", "itching", "itchy"],
    response: "🌿 **Allergies:**\n\n**Common Triggers:** Pollen, dust, pet dander, food, medications, insect stings\n\n**Symptoms:** Sneezing, watery eyes, skin rash, hives, swelling, breathing difficulty\n\n**Remedies:**\n• Identify and avoid triggers\n• Use air purifiers\n• Wear mask outdoors\n\n**Medicines:** Cetirizine, Loratadine, Fexofenadine, Prednisolone\n\n🚨 Anaphylaxis = call emergency services immediately." },

  // Diabetes
  { patterns: ["diabetes", "blood sugar", "insulin", "diabetic", "glucose"],
    response: "🩸 **Diabetes:**\n\n**Types:**\n• Type 1: Auto-immune, body can't produce insulin\n• Type 2: Most common, insulin resistance\n• Gestational: During pregnancy\n\n**Symptoms:** Frequent urination, excessive thirst, blurry vision, fatigue, slow healing wounds\n\n**Management:**\n• Healthy diet (low sugar, high fiber)\n• Regular exercise\n• Monitor blood sugar daily\n• Take prescribed medications\n\n**Medicines:** Metformin, Insulin, Glipizide\n\nVisit our Endocrinology department for personalized care." },

  // Blood pressure
  { patterns: ["blood pressure", "hypertension", "high bp", "low bp", "bp"],
    response: "💊 **Blood Pressure:**\n\n**Normal BP:** 120/80 mmHg\n**High (Hypertension):** >140/90 mmHg\n**Low (Hypotension):** <90/60 mmHg\n\n**High BP Causes:** Stress, obesity, salt intake, lack of exercise\n**Symptoms:** Headache, dizziness, nosebleeds, shortness of breath\n\n**Management:**\n• Low-sodium diet\n• Regular exercise\n• Stress management\n• Avoid alcohol/smoking\n\n**Medicines:** Amlodipine, Losartan, Hydrochlorothiazide\n\nMonitor BP regularly at VitaCare!" },

  // COVID-19
  { patterns: ["covid", "corona", "coronavirus", "covid-19"],
    response: "🦠 **COVID-19:**\n\n**Transmission:** Respiratory droplets, close contact\n\n**Symptoms:** Fever, dry cough, fatigue, loss of taste/smell, difficulty breathing\n\n**Prevention:**\n• Vaccination is key\n• Wear masks in crowded places\n• Regular handwashing\n• Social distancing\n\n**Treatment:**\n• Rest and hydration\n• Paracetamol for fever\n• Severe cases: hospitalization\n\n⚠️ Trouble breathing? Seek emergency care immediately." },

  // Asthma
  { patterns: ["asthma", "breathing", "shortness of breath", "breathless", "inhaler"],
    response: "🌬️ **Asthma:**\n\n**Triggers:** Dust, pollen, cold air, exercise, smoke, stress\n\n**Symptoms:** Wheezing, shortness of breath, chest tightness, coughing (especially at night)\n\n**Management:**\n• Avoid known triggers\n• Keep inhaler nearby always\n• Breathing exercises\n• Monitor peak flow\n\n**Medicines:** Salbutamol inhaler (rescue), Budesonide inhaler (preventer), Montelukast\n\n⚠️ Severe asthma attack = emergency!" },

  // Dengue
  { patterns: ["dengue", "dengue fever"],
    response: "🦟 **Dengue Fever:**\n\n**Cause:** Aedes mosquito bite\n\n**Symptoms:** High fever, severe headache, joint/muscle pain, skin rash, bleeding gums\n\n**Treatment:**\n• No specific antiviral drug\n• Rest, plenty of fluids\n• Paracetamol for fever (AVOID aspirin/ibuprofen)\n• Platelet count monitoring\n\n**Prevention:**\n• Remove stagnant water\n• Use mosquito repellent\n• Wear full-sleeve clothing\n\n⚠️ Dengue can be life-threatening — see a doctor immediately." },

  // Typhoid
  { patterns: ["typhoid", "typhoid fever", "enteric fever"],
    response: "🦠 **Typhoid:**\n\n**Cause:** Salmonella typhi bacteria through contaminated food/water\n\n**Symptoms:** Prolonged high fever, headache, abdominal pain, loss of appetite, weakness\n\n**Treatment:**\n• Antibiotics (Ciprofloxacin, Azithromycin)\n• Rest and fluid intake\n• Easily digestible diet\n\n**Prevention:**\n• Safe drinking water\n• Proper sanitation\n• Typhoid vaccination\n\nBlood tests (Widal test/Culture) confirm diagnosis." },

  // Malaria
  { patterns: ["malaria", "malaria fever"],
    response: "🦟 **Malaria:**\n\n**Cause:** Plasmodium parasite from Anopheles mosquito bite\n\n**Symptoms:** Cyclical fever with chills, sweating, headache, body aches, nausea, jaundice\n\n**Treatment:**\n• Artemisinin-based combination therapy (ACT)\n• Chloroquine (for some strains)\n• Plenty of rest and fluids\n\n**Prevention:**\n• Mosquito nets and repellents\n• Antimalarial prophylaxis when traveling\n\n⚠️ Severe malaria can be fatal — seek medical care immediately." },

  // Heart
  { patterns: ["heart", "cardiac", "cardiology", "heart disease", "chest tightness"],
    response: "❤️ **Heart Health at VitaCare:**\n\n**Common Heart Conditions:**\n• Coronary Artery Disease\n• Heart Failure\n• Arrhythmia (irregular heartbeat)\n• Hypertension\n\n**Warning Signs:**\n• Chest pain or pressure\n• Shortness of breath\n• Rapid or irregular heartbeat\n• Pain in arm, jaw, or back\n\n🚨 **Chest pain = possible heart attack. Call 112 immediately!**\n\nVisit our Cardiology department for checkups and ECG." },

  // Skin
  { patterns: ["skin", "dermatology", "acne", "eczema", "psoriasis", "skin rash", "pimple"],
    response: "🧴 **Dermatology & Skin Care:**\n\n**Common Conditions:**\n• Acne: Clogged pores — use benzoyl peroxide, salicylic acid\n• Eczema: Itchy inflammation — moisturize, use steroid creams\n• Psoriasis: Scaly patches — requires specialist treatment\n• Fungal infections: Athlete's foot, ringworm — antifungal creams\n\n**General Skin Tips:**\n• Use sunscreen SPF 30+\n• Stay hydrated\n• Avoid harsh soaps\n\nBook a dermatology appointment at VitaCare!" },

  // Children
  { patterns: ["child", "baby", "infant", "kid", "pediatric", "toddler", "newborn"],
    response: "👶 **Pediatric Care at VitaCare:**\n\n**Common Childhood Conditions:**\n• Fever, cold, cough (very common)\n• Ear infections\n• Hand, Foot & Mouth disease\n• Childhood asthma\n• Growth & development concerns\n\n**Vaccination Schedule:** Consult our pediatricians for your child's immunization plan.\n\n**When to See a Doctor:**\n• High fever in infants <3 months\n• Difficulty breathing\n• Persistent vomiting/diarrhea\n• Rash with fever\n\nBook a pediatrician appointment today!" },

  // Mental health
  { patterns: ["anxiety", "depression", "mental health", "stress", "panic", "panic attack", "mental"],
    response: "🧠 **Mental Health Support:**\n\n**Anxiety Symptoms:** Racing heart, excessive worry, restlessness, sweating, insomnia\n\n**Depression Symptoms:** Persistent sadness, loss of interest, fatigue, hopelessness, appetite changes\n\n**Coping Strategies:**\n• Deep breathing & meditation\n• Regular exercise (releases endorphins)\n• Talk to a trusted person\n• Limit social media/news\n• Maintain a sleep schedule\n\n**Medicines (under supervision):** SSRIs like Sertraline, Fluoxetine; Anxiolytics\n\n💙 Remember: mental health is as important as physical health. VitaCare offers counseling services." },

  // Sleep
  { patterns: ["sleep", "insomnia", "can't sleep", "sleepless", "sleeping problem"],
    response: "😴 **Sleep Problems / Insomnia:**\n\n**Causes:** Stress, anxiety, caffeine, irregular schedule, screen exposure, sleep apnea\n\n**Tips for Better Sleep:**\n• Stick to a fixed sleep schedule\n• Avoid screens 1 hour before bed\n• Keep bedroom dark and cool\n• Avoid caffeine after 3pm\n• Try chamomile tea\n• Practice deep breathing\n\n**Medicines (short-term):** Melatonin supplements, Antihistamines, Zolpidem (under prescription)\n\n⚠️ Chronic insomnia requires professional evaluation." },

  // Nutrition / Diet
  { patterns: ["diet", "nutrition", "healthy food", "weight loss", "obesity", "fat", "eating"],
    response: "🥗 **Nutrition & Diet Tips:**\n\n**Balanced Diet Should Include:**\n• Proteins: Lentils, eggs, chicken, fish\n• Carbs: Brown rice, whole grains, oats\n• Fats: Nuts, avocado, olive oil\n• Vitamins: Colorful fruits and vegetables\n• Hydration: 8–10 glasses of water daily\n\n**For Weight Loss:**\n• Calorie deficit (eat less than you burn)\n• Increase fiber intake\n• Limit sugar and processed foods\n• Exercise regularly\n\nConsult our nutritionist at VitaCare for personalized plans!" },

  // Vitamins / Supplements
  { patterns: ["vitamin", "vitamins", "supplement", "deficiency", "iron", "calcium", "zinc"],
    response: "💊 **Common Vitamin Deficiencies:**\n\n• **Vitamin D:** Fatigue, bone pain → Sun exposure, Vitamin D3 supplements\n• **Vitamin B12:** Weakness, tingling → Eggs, meat, B12 tablets\n• **Iron:** Anemia, fatigue → Spinach, red meat, Iron tablets\n• **Calcium:** Weak bones → Dairy, Calcium carbonate supplements\n• **Zinc:** Slow healing, low immunity → Nuts, whole grains, Zinc supplements\n\n**Tip:** Always consult a doctor before starting supplements!" },

  // Pain
  { patterns: ["pain", "body pain", "muscle pain", "joint pain", "back pain", "knee pain"],
    response: "💊 **Pain Management:**\n\n**Common Medicines:**\n• Mild pain: Paracetamol\n• Inflammation + pain: Ibuprofen, Naproxen\n• Severe pain: Doctor-prescribed opioids\n• Muscle relaxants: Cyclobenzaprine\n• Topical: Diclofenac gel\n\n**Back/Joint Pain Tips:**\n• Maintain good posture\n• Regular stretching and exercise\n• Apply hot/cold packs\n• Avoid lifting heavy objects\n\nVisit our Orthopedics dept for persistent joint/bone pain." },

  // Blood test / Lab
  { patterns: ["blood test", "lab", "test", "report", "cbc", "complete blood count", "check up"],
    response: "🔬 **Lab Tests Available at VitaCare:**\n\n• **CBC** – Complete Blood Count (detects anemia, infection)\n• **LFT** – Liver Function Test\n• **KFT** – Kidney Function Test\n• **Lipid Profile** – Cholesterol levels\n• **Blood Sugar / HbA1c** – Diabetes screening\n• **Thyroid Profile (TSH, T3, T4)**\n• **Dengue NS1 / Malaria Antigen**\n• **COVID-19 RT-PCR**\n\nAll tests available at our in-house diagnostic lab. Reports in 24–48 hours." },

  // Location/Hospital info
  { patterns: ["location", "address", "where are you", "where is vitacare", "hospital location"],
    response: "📍 **VitaCare Hospital Location:**\n\nWe are located at the heart of the city. Please check our official website or call our helpline for the exact address and directions.\n\n🕐 **Working Hours:**\n• OPD: 8 AM – 8 PM (Mon–Sat)\n• Emergency: 24/7\n• Pharmacy: 7 AM – 10 PM\n\n📞 For inquiries, use our contact form on the website." },
];

// Fallback
const FALLBACK = "I'm not sure about that specific question 🤔. For accurate medical advice, please:\n• Consult a VitaCare doctor by booking an appointment\n• Call our helpline for guidance\n\nYou can also ask me about: **symptoms, diseases, medicines, appointments, or our services!**";

function getBotResponse(input) {
  const lower = input.toLowerCase().trim();
  for (const item of knowledgeBase) {
    if (item.patterns.some((p) => lower.includes(p))) {
      return item.response;
    }
  }
  return FALLBACK;
}

// Format markdown-style bold **text**
function formatMessage(text) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  );
}

const WELCOME_MESSAGE = {
  sender: "bot",
  text: "Hello! I'm **VitaBot** 🤖 — your AI medical assistant.\n\nAsk me about symptoms, diseases, medicines, appointments, or anything health-related!",
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Opens the chat and resets to a fresh conversation every time
  const openChat = () => {
    setMessages([WELCOME_MESSAGE]);
    setInput("");
    setIsTyping(false);
    setIsOpen(true);
  };

  // Shared helper used by both the form and quick chips
  const sendMessage = (text) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { sender: "user", text }]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      const botText = getBotResponse(text);
      setIsTyping(false);
      setMessages((prev) => [...prev, { sender: "bot", text: botText }]);
    }, 900);
  };

  const handleSend = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const clearChat = () => {
    setMessages([
      {
        sender: "bot",
        text: "Chat cleared! How can I help you? Ask me anything about health 🏥",
      },
    ]);
  };

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="header-info">
              <FaRobot className="bot-icon-header" />
              <div>
                <h4>VitaBot</h4>
                <span className="bot-status">● Online</span>
              </div>
            </div>
            <div className="header-actions">
              <button onClick={clearChat} className="clear-btn" title="Clear chat">
                <FaTrash />
              </button>
              <button onClick={() => setIsOpen(false)} className="close-btn">
                <FaTimes />
              </button>
            </div>
          </div>

          <div className="chat-body" ref={bodyRef}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message-wrapper ${
                  msg.sender === "bot" ? "bot-message" : "user-message"
                }`}
              >
                {msg.sender === "bot" && (
                  <div className="bot-avatar">
                    <FaRobot />
                  </div>
                )}
                <div className="message">
                  {msg.text.split("\n").map((line, i) => (
                    <span key={i}>
                      {formatMessage(line)}
                      {i < msg.text.split("\n").length - 1 && <br />}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="message-wrapper bot-message">
                <div className="bot-avatar">
                  <FaRobot />
                </div>
                <div className="message typing-indicator">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
          </div>

          {/* Quick action chips */}
          <div className="quick-chips">
            {["Book Appointment", "Fever Help", "Emergency", "Our Services"].map((chip) => (
              <button
                key={chip}
                className="chip"
                onClick={() => sendMessage(chip)}
              >
                {chip}
              </button>
            ))}
          </div>

          <form className="chat-footer" onSubmit={handleSend}>
            <input
              type="text"
              placeholder="Ask anything about health..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoComplete="off"
            />
            <button type="submit" className="send-btn" disabled={!input.trim()}>
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}

      <button className="chat-toggle-btn" onClick={() => isOpen ? setIsOpen(false) : openChat()}>
        {isOpen ? <FaTimes className="toggle-icon" /> : <FaRobot className="toggle-icon" />}
      </button>
    </div>
  );
};

export default Chatbot;
