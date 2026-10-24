// ==========================================================================
// Ali Rajai - AI Portfolio Assistant Knowledge Base & Intelligent Engine
// ==========================================================================

const ALI_KNOWLEDGE_BASE = {
  profile: {
    name: "Ali Rajai",
    title: "Software Engineer & Full-Stack Web Developer",
    education: "BS Software Engineering from Indus University, Karachi (2025 — Present)",
    email: "alirajai.dev@gmail.com",
    availability: "Available for Freelance Projects & Full-Time Remote Roles",
    github: "https://github.com/aleerajai",
    linkedin: "https://www.linkedin.com/in/alirajai-dev",
    instagram: "https://www.instagram.com/aleerajai1/",
    stats: {
      stacks: "3+ Core Stacks (WordPress, Shopify, Odoo, JS/TS)",
      builds: "10+ Production Web Builds",
      satisfaction: "100% Client Satisfaction",
      performance: "60 FPS Hardware-Accelerated Motion UI"
    }
  },
  skills: [
    "HTML5 & Semantic Architecture",
    "Modern CSS3, Glassmorphism & Responsive UI",
    "JavaScript (ES6+) & TypeScript",
    "GSAP 3D Interactive Animation & ScrollTrigger",
    "WordPress & WooCommerce Custom Development",
    "Shopify & Custom Liquid Theme Architecture",
    "Odoo ERP Customization & Server Systems",
    "Meta Ads, Conversion API (CAPI) & Pixel Tracking",
    "Website Speed Optimization & Security Hardening",
    "Git, GitHub & Version Control Workflows"
  ],
  services: [
    {
      title: "Shopify & WordPress Development",
      description: "Custom store development, bespoke Liquid themes, WooCommerce setups, plugin modifications, and high-speed architecture."
    },
    {
      title: "Custom Web Engineering",
      description: "Handcrafted responsive web apps with zero framework bloat, 60fps GSAP animations, and accessible semantic markup."
    },
    {
      title: "Meta Ads & Performance Marketing",
      description: "Targeted Facebook & Instagram ads, Pixel & CAPI tracking, high-ROAS retargeting funnels, and conversion optimization."
    },
    {
      title: "Website Maintenance & Support",
      description: "Ongoing technical care, security audits, backups, speed boost, bug fixes, and hosting server management."
    },
    {
      title: "E-Commerce Architecture & CRO",
      description: "Conversion Rate Optimization (CRO), frictionless checkouts, regional payment gateways, and scalable product catalogs."
    },
    {
      title: "Odoo ERP & Business Systems",
      description: "Automated inventory, CRM integrations, enterprise workflows, and tailored business process automation."
    }
  ],
  projects: [
    {
      name: "Skardu Fruits E-Commerce Store",
      type: "Commercial Live E-Commerce Store",
      link: "https://skardufruits.com/",
      details: "Built end-to-end for Skardu Fruits featuring organic dry fruits, pure Shilajit catalog, dynamic shopping cart, and regional delivery routing."
    },
    {
      name: "French Client Corporate Portal (NGHR Consulting)",
      type: "International Client • Paris, France",
      link: "https://nghrconsulting.fr/",
      details: "Commercial portal delivered via Fiverr for a Paris-based consulting firm, hosted on a custom server environment with bilingual French/English capabilities."
    },
    {
      name: "Abasin Global Trade Platform",
      type: "Commercial Web Development",
      details: "Corporate trade solution built with WordPress & Shopify, featuring global commodity sourcing catalogs and B2B trade inquiry workflows."
    },
    {
      name: "Interactive Developer Portfolio",
      type: "Personal Showcase",
      link: "https://github.com/aleerajai/alirajai-portfolio-website",
      details: "This website! Engineered with pure vanilla JavaScript, dark luxury glassmorphic visual system, custom preloader, and smooth 60fps GSAP 3D motion."
    }
  ],
  certificates: [
    {
      title: "Wifi Ethical Hacking: Hak5 Wifi Pineapple & HackRF One",
      issuer: "Udemy (Instructor: Paul Chin, PhD)",
      date: "Oct 2, 2026",
      details: "5.5 hours hands-on wireless penetration testing, RF analysis, and network security auditing."
    },
    {
      title: "HTML, CSS, and Javascript for Web Developers",
      issuer: "Johns Hopkins University via Coursera (Prof. Yaakov Chaikin)",
      date: "March 15, 2024",
      details: "Completed with a 100% Grade. Semantic HTML5, responsive CSS3, and modern JavaScript."
    },
    {
      title: "WordPress Training Certificate",
      issuer: "DigiSkills.pk • Ministry of IT & Telecom / Ignite",
      date: "May 18, 2022",
      details: "Batch-01 certified in CMS architecture, WooCommerce storefronts, and theme development."
    },
    {
      title: "Graphic Design Certificate",
      issuer: "DigiSkills.pk • Ministry of IT & Telecom / Ignite",
      date: "May 18, 2022",
      details: "Batch-01 certified in brand identity, layout balance, typography, and visual media."
    }
  ],
  journey: [
    {
      period: "2024 — Present",
      role: "Freelance Web & E-Commerce Developer",
      desc: "Delivering production websites for European and regional clients via Fiverr and direct contracts (e.g. nghrconsulting.fr, skardufruits.com)."
    },
    {
      period: "2023 — 2024",
      role: "WordPress & Shopify Specialist at Abasin Global",
      desc: "Managed B2B corporate platforms, e-commerce catalog layouts, theme customization, and speed optimization."
    },
    {
      period: "2025 — Present",
      role: "BS Software Engineering",
      desc: "Studying at Indus University, Karachi, focusing on software systems, database engineering, and modern web architectures."
    }
  ]
};

// --- Intelligent Matching & Response Generation ---
class AliAIAssistant {
  constructor() {
    this.kb = ALI_KNOWLEDGE_BASE;
  }

  generateResponse(query) {
    const raw = query.toLowerCase().trim();

    // 1. Greetings & Identity
    if (/^(hi|hello|hey|salam|assalam|aOA|hola|good morning|good evening|yo)\b/.test(raw) || raw === "hi" || raw === "hello") {
      return `Hello! 👋 I'm **Ali Rajai's AI Assistant**.<br><br>I have full context on Ali's engineering background, skills, commercial projects, verified certificates, and availability.<br><br>How can I help you today? You can ask me things like:<br>• <em>"What services does Ali offer?"</em><br>• <em>"Tell me about his live projects"</em><br>• <em>"How can I hire Ali or get a quote?"</em>`;
    }

    if (/who (is|are) (ali|you)|about ali|introduce ali|tell me about ali|bio|background/i.test(raw)) {
      return `**Ali Rajai** is a Software Engineer & Full-Stack Web Developer based in Karachi, currently pursuing his BS in Software Engineering at **Indus University**.<br><br>He has **3+ core technology stacks**, **10+ production web builds**, and specializes in **Shopify**, **WordPress**, **Odoo ERP**, and **modern JavaScript/GSAP 3D motion**.<br><br>He works with international clients (including European companies like NGHR Consulting in France) and regional brands like Skardu Fruits.`;
    }

    // 2. Services & Offerings
    if (/service|offer|what (do you|can you|does ali) do|skills|tech stack|technologies|experience/i.test(raw)) {
      return `Ali provides comprehensive full-stack and e-commerce engineering services:<br><br>
1. 🛍️ **Shopify & WordPress Development** — Custom Liquid themes, WooCommerce, and high-converting stores.<br>
2. 💻 **Custom Web Engineering** — Clean semantic HTML/CSS, Vanilla JS, and fluid 60fps GSAP 3D motion.<br>
3. ⚙️ **Odoo ERP & Business Systems** — Inventory tracking, custom workflows, and CRM modules.<br>
4. 🎯 **Meta Ads & Performance Marketing** — Pixel tracking, CAPI, and ROAS-focused retargeting funnels.<br>
5. 🛠️ **Maintenance & Speed Optimization** — Server audits, bug fixes, backups, and security hardening.<br><br>
Would you like to discuss a specific project or see examples?`;
    }

    // 3. Projects & Work Portfolio
    if (/project|portfolio|work|built|skardu|nghr|abasin|case stud|client/i.test(raw)) {
      return `Here are some of Ali's featured production works:<br><br>
• 🌟 **<a href="https://skardufruits.com/" target="_blank" rel="noopener" style="color: var(--gold); text-decoration: underline;">Skardu Fruits</a>** — Full-scale e-commerce platform for organic dry fruits & Shilajit with dynamic checkout and local delivery routing.<br>
• 🇫🇷 **<a href="https://nghrconsulting.fr/" target="_blank" rel="noopener" style="color: var(--gold); text-decoration: underline;">NGHR Consulting France</a>** — International corporate consulting portal engineered for a Paris-based client via Fiverr.<br>
• 🌐 **Abasin Global Trade** — Corporate commodity sourcing & B2B trade portal.<br>
• 💎 **Interactive 3D Portfolio** — The site you are browsing right now, built with zero framework bloat and custom GSAP motion.<br><br>
You can view these directly in the <a href="#projects" style="color: var(--gold); font-weight: 600;">Work section</a>!`;
    }

    // 4. Contact, Hiring, Pricing & Rates
    if (/hire|contact|email|reach|call|whatsapp|phone|rate|price|cost|quote|budget|available|freelance/i.test(raw)) {
      return `Ali is **actively available** for freelance contracts, full-time remote roles, and consulting! 🚀<br><br>
• 📧 **Email**: <a href="mailto:alirajai.dev@gmail.com" style="color: var(--gold); text-decoration: underline;">alirajai.dev@gmail.com</a><br>
• 💼 **LinkedIn**: <a href="https://www.linkedin.com/in/alirajai-dev" target="_blank" rel="noopener" style="color: var(--gold); text-decoration: underline;">linkedin.com/in/alirajai-dev</a><br>
• 🐙 **GitHub**: <a href="https://github.com/aleerajai" target="_blank" rel="noopener" style="color: var(--gold); text-decoration: underline;">github.com/aleerajai</a><br>
• 💬 **Direct Inquiries**: You can also use the floating contact button at the bottom-right or head down to the <a href="#contact" style="color: var(--gold); font-weight: 600;">Contact section</a>!`;
    }

    // 5. Certifications & Credentials
    if (/certif|degree|education|credential|udemy|coursera|digiskill|johns hopkins/i.test(raw)) {
      return `Ali holds multiple verified industry credentials:<br><br>
• 🎓 **HTML, CSS & JS for Web Developers** — Johns Hopkins University / Coursera (**100% Grade**)<br>
• 🛡️ **Wifi Ethical Hacking & RF Security** — Hak5 Pineapple & HackRF One (Udemy Verified)<br>
• 💼 **WordPress Certified Specialist** — DigiSkills.pk / Ministry of IT & Telecom<br>
• 🎨 **Graphic & Visual Design** — DigiSkills.pk Batch-01<br><br>
Every certificate includes verifiable IDs and links in the <a href="#certificates" style="color: var(--gold); font-weight: 600;">Certificates section</a>!`;
    }

    // 6. Resume / CV
    if (/resume|cv|biodata/i.test(raw)) {
      return `You can request Ali's latest official Resume / CV directly via email: <a href="mailto:alirajai.dev@gmail.com?subject=Resume%20Request%20-%20Ali%20Rajai" style="color: var(--gold); font-weight: 600; text-decoration: underline;">Request CV Here</a>, or click the **Resume** button in the header navigation!`;
    }

    // 7. Tech Stack specific queries
    if (/shopify/i.test(raw)) {
      return `Ali is a **Shopify Expert**! He builds custom Liquid themes, optimizes store loading speeds, integrates payment gateways, and customizes app extensions to maximize conversion rates (like his work on <a href="https://skardufruits.com/" target="_blank" rel="noopener" style="color: var(--gold);">SkarduFruits.com</a>).`;
    }
    if (/wordpress|woocommerce/i.test(raw)) {
      return `Ali has extensive experience with **WordPress & WooCommerce**, creating high-speed custom themes, corporate portals (e.g. <a href="https://nghrconsulting.fr/" target="_blank" rel="noopener" style="color: var(--gold);">nghrconsulting.fr</a>), custom post types, and secure hosting environments.`;
    }
    if (/odoo/i.test(raw)) {
      return `Ali works with **Odoo ERP**, customizing business workflows, automated inventory controls, and integrating enterprise modules with front-end web systems.`;
    }

    // 8. Default fallback with helpful prompts
    return `I can definitely help you with that! As Ali Rajai's AI Assistant, I know all about his:
<br><br>
• 🛠️ **Technical Skills** (Shopify, WordPress, Odoo, JavaScript, GSAP)<br>
• 🚀 **Live Projects** (Skardu Fruits, NGHR France, Abasin Global)<br>
• 📜 **Certifications** (Johns Hopkins University, Udemy Ethical Hacking)<br>
• 💼 **Hiring & Project Inquiries** (<a href="mailto:alirajai.dev@gmail.com" style="color: var(--gold); text-decoration: underline;">alirajai.dev@gmail.com</a>)<br><br>
Would you like to discuss hiring Ali, or explore one of his specific case studies?`;
  }
}

// Instantiate and expose globally
window.AliAIAssistant = AliAIAssistant;
