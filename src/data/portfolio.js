export const OWNER = {
  name: "Krishna Gaur",
  title: "AI Engineer • Full Stack Developer • Automation Specialist • Data Analyst",
  location: "Ahmedabad, Gujarat, India",
  github: "github.com/krishdynamic14-oss",
  tagline: "Building futuristic AI systems, automation workflows, and immersive digital experiences.",
  status: "Open to Opportunities",
}

export const ZONES = [
  { id: "about",   label: "ABOUT ME",       position: [0, 0, -18],   color: "#0EA5E9" },
  { id: "skills",  label: "SKILLS",         position: [-20, 0, 0],   color: "#22D3EE" },
  { id: "projects",label: "PROJECTS",       position: [20, 0, 0],    color: "#818CF8" },
  { id: "certs",   label: "CERTIFICATIONS", position: [0, 0, 18],    color: "#34D399" },
  { id: "exp",     label: "EXPERIENCE",     position: [-20, 0, -18], color: "#F472B6" },
  { id: "contact", label: "CONTACT",        position: [20, 0, -18],  color: "#FBBF24" },
]

export const PROJECTS = [
  {
    name: "Dispatch & Order Automation",
    tech: "Google Apps Script • Sheets • WhatsApp API",
    desc: "End-to-end delivery ops — duplicate detection, auto-dispatch, WhatsApp notifications",
    color: "#0EA5E9"
  },
  {
    name: "AI Call Analyzer",
    tech: "Gemini API • Google Apps Script",
    desc: "Analyzes call recordings via Gemini AI — generates agent performance reports",
    color: "#818CF8"
  },
  {
    name: "Delivery Partner App",
    tech: "React Native • Offline Sync • Google Sheets",
    desc: "Cross-platform offline-first mobile app for delivery agents",
    github: "github.com/krishdynamic14-oss/Delivery-Partner-App",
    color: "#34D399"
  },
  {
    name: "Credit Score Prediction",
    tech: "Python • Streamlit • ML • Plotly",
    desc: "ML-powered credit score prediction with interactive analytics dashboard",
    color: "#F472B6"
  },
  {
    name: "Student Career Discovery",
    tech: "React • Quiz Engine • Gamification",
    desc: "Gamified career guidance platform for 10th/12th students",
    color: "#FBBF24"
  },
  {
    name: "Doctor Networking Platform",
    tech: "Figma • Mobile-first UI/UX",
    desc: "Healthcare professional networking app — case sharing, events, profiles",
    color: "#FB923C"
  },
  {
    name: "Legendary 3D Portfolio",
    tech: "Three.js • R3F • GSAP • Tailwind",
    desc: "This site itself — game-like walkable 3D world portfolio",
    color: "#A78BFA"
  },
]

export const SKILLS = [
  { label: "Languages",   items: ["Python", "JavaScript", "SQL", "Dart"] },
  { label: "Frontend",    items: ["React", "Next.js", "React Native", "Flutter", "Three.js", "R3F"] },
  { label: "Backend",     items: ["Node.js", "Apps Script", "REST APIs", "Webhooks"] },
  { label: "AI / ML",     items: ["LangChain", "OpenAI API", "Gemini AI", "Agentic AI", "Voice AI"] },
  { label: "Data",        items: ["Power BI", "Plotly", "Streamlit", "Data Analysis"] },
  { label: "Cloud",       items: ["AWS", "GitHub", "Vercel", "Firebase"] },
  { label: "Design",      items: ["Figma", "Webflow", "UI/UX", "Tailwind CSS"] },
]

export const CERTIFICATIONS = [
  { name: "Azure AI Fundamentals (DP-900)", issuer: "Microsoft", color: "#0EA5E9" },
  { name: "IT Specialist in AI",            issuer: "Certiport / Pearson VUE", color: "#818CF8" },
  { name: "AWS Cloud Practitioner",         issuer: "Amazon Web Services", color: "#F97316" },
  { name: "Power BI Data Analyst",          issuer: "Microsoft", color: "#FBBF24" },
]

export const EXPERIENCE = [
  {
    title: "Business Operations Developer",
    company: "Open Box Delivery — Dynamic Bazar",
    period: "2023 — Present",
    points: [
      "Built multi-sheet order automation reducing manual work by 80%",
      "AI Call Analyzer using Gemini API for agent performance",
      "WhatsApp webhook integrations for real-time notifications",
    ]
  },
  {
    title: "Freelance Full Stack Developer",
    company: "Self-Employed",
    period: "2022 — Present",
    points: [
      "Web apps, dashboards, automation systems for clients",
      "React Native mobile apps with offline-first architecture",
      "Figma UI/UX for healthcare and education domains",
    ]
  }
]
