
const safetyTips = [
  { title: "Wear Proper PPE", content: "Always gear up with helmets, gloves, boots, and reflective clothing." },
  { title: "Stay Alert", content: "Keep an eye out for hazards like loose rocks and unstable structures." },
  { title: "Follow Procedures", content: "Stick to the safety protocols and never take shortcuts." },
  { title: "Report Hazards", content: "Immediately inform supervisors of unsafe conditions." },
  { title: "Use Proper Lighting", content: "Ensure your path is well-lit to avoid accidents." },
  { title: "Emergency Ready", content: "Know your evacuation plan and locate first aid kits." },
  { title: "Check Equipment", content: "Inspect tools and machinery before use to ensure they're in good working condition." },
  { title: "Maintain Communication", content: "Use radios or signals to stay connected with your team." },
  { title: "Hydrate and Rest", content: "Avoid fatigue by taking breaks and drinking plenty of water." },
  { title: "Monitor Air Quality", content: "Ensure proper ventilation and test for toxic gases regularly." }
];

const SafetyTip = () => {
  const randomIndex = Math.floor(Math.random() * safetyTips.length); // Generate random index
  const randomTip = safetyTips[randomIndex]; // Get the random tip

  return (
    <div>
      <h1 className="">SAFETY TIP</h1>
      <h1 className="text-2xl uppercase font-semibold py-2">{randomTip.title}</h1>
      <p className="opacity-75">{randomTip.content}</p>
    </div>
  );
};

export default SafetyTip;
