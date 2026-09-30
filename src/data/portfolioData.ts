import type { Project, Service, ProcessStep, HighlightItem, ServiceRate, FAQItem, StatItem } from '../types';

export const HERO_DATA = {
  badge: "HEY, I'M HIMAT",
  titleLine1: "I build digital products,",
  titleLine2: "websites & AI-powered solutions.",
  subtitle: "Freelance developer focused on creating fast, modern and purposeful digital experiences for businesses, startups and creators.",
  statusText: "Available for new projects",
  primaryCta: "Start a Project",
  secondaryCta: "View My Work",
  skillsHighlight: ["React", "TypeScript", "Python", "AI & LLMs", "Node.js", "Tailwind CSS"],
};

export const STATS_DATA: StatItem[] = [
  {
    value: "4+",
    label: "Projects Built",
  },
  {
    value: "5+",
    label: "Technologies & AI Tools",
  },
  {
    value: "100%",
    label: "Original, Self-Built Code",
  },
];

export const ABOUT_DATA = {
  heading: "I combine creativity with technology to build useful digital experiences.",
  content: "I'm a freelance developer and creative professional focused on web development, software solutions and AI-powered products. I enjoy turning ideas into clean, functional and visually engaging digital experiences.",
  ctaText: "More About Me",
  highlights: [
    { title: "Clean Architecture", desc: "Maintainable, scalable codebases with clear component boundaries." },
    { title: "Performance First", desc: "Optimized bundle sizes, fast rendering, and smooth 60fps motion." },
    { title: "AI Integration", desc: "Connecting modern LLMs, RAG, and automation into web products." },
    { title: "User-Centered UX", desc: "Intuitive interfaces designed with attention to spacing and motion." },
  ],
};

export interface SimpleService {
  id: string;
  title: string;
  description: string;
}

export const SIMPLE_SERVICES_DATA: SimpleService[] = [
  {
    id: "web-dev",
    title: "Web Development",
    description: "Modern, responsive websites and web applications built with clean architecture and strong user experience.",
  },
  {
    id: "ai-dev",
    title: "AI Development",
    description: "AI-powered applications, intelligent workflows and integrations using modern AI APIs and technologies.",
  },
  {
    id: "software-dev",
    title: "Software Development",
    description: "Custom software solutions designed around specific business requirements and workflows.",
  },
  {
    id: "ui-ux",
    title: "UI/UX & Creative Development",
    description: "Beautiful interfaces that combine strong visual design with functional interactions and motion.",
  },
];

export const SERVICES_DATA: Service[] = [
  {
    id: "web-dev",
    number: "01",
    title: "Web Development",
    shortDesc: "Modern, responsive websites and web applications built with clean architecture and strong user experience.",
    fullDesc: "From custom landing pages to complex single-page applications, I build high-performance web products tailored for conversions, speed, and cross-device consistency.",
    technologies: ["React", "TypeScript", "JavaScript", "Tailwind CSS"],
    icon: "Layout",
  },
  {
    id: "ai-dev",
    number: "02",
    title: "AI Development",
    shortDesc: "AI-powered applications, intelligent workflows and integrations using modern AI APIs and technologies.",
    fullDesc: "Integrating smart capabilities into web applications including custom RAG pipelines, LLM-driven automation, speech processing, and automated content summary systems.",
    technologies: ["Python", "AI APIs", "RAG", "LLMs"],
    icon: "Sparkles",
  },
  {
    id: "software-dev",
    number: "03",
    title: "Software Development",
    shortDesc: "Custom software solutions designed around specific business requirements and workflows.",
    fullDesc: "Robust backend APIs, database management systems, internal dashboard tools, and cross-platform desktop applications built for high reliability.",
    technologies: ["Node.js", "Express", "MongoDB", "Django"],
    icon: "Cpu",
  },
  {
    id: "ui-ux",
    number: "04",
    title: "UI/UX & Creative Development",
    shortDesc: "Beautiful interfaces that combine strong visual design with functional interactions and motion.",
    fullDesc: "Crafting digital experiences with high design precision, smooth scroll interactions, staggered micro-animations, and pixel-perfect responsiveness.",
    technologies: ["Figma", "React", "Framer Motion", "Tailwind CSS"],
    icon: "Palette",
  },
];

export const TECH_SKILLS_DATA = [
  { name: "React", category: "Frontend", icon: "Code2" },
  { name: "TypeScript", category: "Language", icon: "FileCode" },
  { name: "JavaScript", category: "Language", icon: "Braces" },
  { name: "Python", category: "Backend / AI", icon: "Terminal" },
  { name: "Node.js", category: "Backend", icon: "Server" },
  { name: "Express", category: "Backend", icon: "Layers" },
  { name: "MongoDB", category: "Database", icon: "Database" },
  { name: "Django", category: "Backend", icon: "Workflow" },
  { name: "Tailwind CSS", category: "Styling", icon: "Wand2" },
  { name: "Framer Motion", category: "Animation", icon: "Activity" },
  { name: "Git", category: "DevOps", icon: "GitBranch" },
  { name: "GitHub", category: "DevOps", icon: "Github" },
  { name: "REST APIs", category: "Architecture", icon: "Globe" },
  { name: "AI APIs", category: "AI & ML", icon: "Bot" },
  { name: "RAG", category: "AI & ML", icon: "Brain" },
  { name: "Figma", category: "Design", icon: "Figma" },
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "smart-storage-ai",
    title: "SmartStorageAI",
    category: "Desktop Software / AI",
    shortDescription: "A smart storage management application designed to analyze storage usage, identify unnecessary files and simplify disk cleanup.",
    fullDescription: "SmartStorageAI is a high-performance desktop application engineered with Tauri, Rust, and React. It utilizes local machine learning algorithms to index local disk contents, detect duplicate files, visualize storage breakdown, and safely suggest cleanup rules with full privacy.",
    technologies: ["Tauri", "React", "TypeScript", "Rust", "Tailwind CSS", "Framer Motion"],
    features: [
      "Real-time disk breakdown tree map visualization",
      "AI file categorization & smart duplicate grouping",
      "Ultra-fast Rust backend with sub-second file scans",
      "Customizable rule-based automated cleanup routines",
    ],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
    featured: true,
    timeline: "3 Months",
    role: "Lead Full-Stack Developer",
    demoUrl: "#",
    githubUrl: "https://github.com/himatp",
  },
  {
    id: "transit-ops",
    title: "TransitOps",
    category: "Fleet Management / Web Application",
    shortDescription: "A fleet and transportation operations platform designed to manage vehicles, drivers, trips, maintenance and operational data.",
    fullDescription: "TransitOps is an enterprise web application tailored for logistics operations. It gives fleet managers live GPS telematics overview, driver shift schedules, automated vehicle maintenance alerts, and trip expense reporting in a single unified dashboard.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Mongoose", "JWT"],
    features: [
      "Live vehicle telematics and status monitoring",
      "Automated preventative maintenance scheduling",
      "Driver assignment & route optimization dispatching",
      "JWT authenticated multi-role access control system",
    ],
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop",
    featured: true,
    timeline: "4 Months",
    role: "Full-Stack Engineer",
    demoUrl: "#",
    githubUrl: "https://github.com/himatp",
  },
  {
    id: "ethnic-aura",
    title: "Ethnic Aura",
    category: "E-Commerce",
    shortDescription: "A modern clothing e-commerce platform focused on product presentation, browsing and online shopping experience.",
    fullDescription: "Ethnic Aura delivers an elegant online shopping platform tailored for heritage apparel. It features dynamic product filtering, seamless cart checkout transitions, customer review management, and an intuitive admin panel for stock inventory management.",
    technologies: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
    features: [
      "High-resolution interactive product gallery with zoom",
      "Dynamic AJAX search and collection filtering",
      "Secure online payment gateway integration",
      "Custom relational MySQL inventory management",
    ],
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop",
    featured: true,
    timeline: "2 Months",
    role: "Full-Stack Web Developer",
    demoUrl: "#",
    githubUrl: "https://github.com/himatp",
  },
  {
    id: "ai-meeting-notes",
    title: "AI Meeting Notes",
    category: "AI Application",
    shortDescription: "An AI-powered meeting assistant that converts meeting audio into text and generates summaries and actionable tasks.",
    fullDescription: "AI Meeting Notes turns hours of spoken audio into organized, search-ready transcriptions and bullet-point summaries. Built with Python and OpenAI Whisper LLMs, it tags key action items, assigns owners, and exports summaries directly to team knowledge bases.",
    technologies: ["AI", "Speech-to-Text", "Python", "LLMs", "React"],
    features: [
      "Multi-speaker audio transcription with Whisper engine",
      "Automatic action item extraction & decision tagging",
      "Interactive time-stamped transcript search",
      "One-click export to Markdown, PDF, and Notion",
    ],
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1200&auto=format&fit=crop",
    featured: true,
    timeline: "2.5 Months",
    role: "AI & Frontend Engineer",
    demoUrl: "#",
    githubUrl: "https://github.com/himatp",
  },
];

export const PROCESS_DATA: ProcessStep[] = [
  {
    number: "01",
    title: "Discover",
    description: "Understand the idea, goals, audience and requirements.",
    details: [
      "In-depth consultation to map project objectives",
      "Target audience profiling & competitive research",
      "Tech stack evaluation & feasibility analysis",
    ],
  },
  {
    number: "02",
    title: "Plan",
    description: "Define the structure, technology and development roadmap.",
    details: [
      "User flow & wireframe architecture planning",
      "Database schema & API endpoint specification",
      "Clear milestone timeline & delivery schedule",
    ],
  },
  {
    number: "03",
    title: "Build",
    description: "Design, develop and refine the product with continuous feedback.",
    details: [
      "Iterative clean code sprint development",
      "Component modularity & motion integration",
      "Regular demo builds and continuous client review",
    ],
  },
  {
    number: "04",
    title: "Launch",
    description: "Test, optimize and deliver a polished final product.",
    details: [
      "Rigorous cross-device testing & performance tuning",
      "SEO, accessibility (a11y), and security checks",
      "Deployment & post-launch support guarantee",
    ],
  },
];

export const TRUST_DATA = {
  heading: "Built With Modern Technology",
  description: "From frontend interfaces to backend systems and AI integrations, I use modern tools to build scalable digital experiences.",
  technologies: [
    "React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion",
    "Node.js", "Python", "Express", "MongoDB", "Django",
    "Tauri", "Rust", "LLMs", "RAG", "OpenAI API", "REST APIs", "Git"
  ],
};

export const RECENT_WORK_DATA = {
  heading: "Still early, but building fast.",
  subtext: "I'm a freelance developer just starting out — every project on this site is real, self-built, and shipped end to end. No inflated client list, just the work.",
  highlights: [
    {
      id: "hw-1",
      badge: "Desktop Software",
      title: "Built a Tauri/Rust desktop app from scratch — SmartStorageAI",
      description: "Engineered local AI disk analysis and automated cleanup logic with sub-second file scans.",
    },
    {
      id: "hw-2",
      badge: "Web Application",
      title: "Built a full-stack fleet management platform — TransitOps",
      description: "Live GPS telematics, driver shift scheduling, automated maintenance alerts, and trip data management.",
    },
    {
      id: "hw-3",
      badge: "E-Commerce Platform",
      title: "Delivered a clothing e-commerce platform — Ethnic Aura",
      description: "Dynamic product filtering, responsive shopping gallery, secure payment checkout, and admin inventory panel.",
    },
  ] as HighlightItem[],
};

export const RATE_CARD_DATA = {
  disclaimer: "Starting prices only. Final pricing depends on project requirements, features, complexity, integrations, content, third-party services, timeline and approved scope.",
  note: "RAG, voice, and advanced automation available as custom quotes.",
  popular: [
    {
      id: "rate-biz",
      title: "Business Websites",
      price: "₹12,000",
      popular: true,
      description: "Complete corporate web presence built for high conversion, brand elevation, and performance.",
      highlights: [
        "Up to 5 Responsive Pages",
        "Modern UI & Interactive Sections",
        "Contact / Lead Forms",
        "Basic SEO & Performance Optimization",
      ],
      exclusions: [
        "Custom illustrations / complex animations",
        "E-commerce checkout & payment cart",
        "Advanced API or custom database backends",
      ],
    },
    {
      id: "rate-ai",
      title: "AI Solutions",
      price: "₹8,000",
      popular: true,
      description: "Intelligent LLM integrations, simple chat assistants, and basic workflow automation.",
      highlights: [
        "AI API Integration",
        "Simple AI Chat Assistant",
        "Basic AI Automation",
      ],
      exclusions: [
        "Custom model fine-tuning & training",
        "RAG & vector database infrastructure",
        "Real-time streaming audio/voice AI",
      ],
    },
    {
      id: "rate-software",
      title: "Custom Software",
      price: "₹25,000",
      popular: true,
      description: "Bespoke web applications, internal operational dashboards, and desktop software tools.",
      highlights: [
        "Custom Web Applications",
        "Admin Dashboards & Business Tools",
        "Database & Workflow Automation",
      ],
      exclusions: [
        "Mobile app store deployments",
        "High-frequency server infrastructure setup",
        "Legacy enterprise database migrations",
      ],
    },
  ] as ServiceRate[],
  compact: [
    {
      id: "rate-landing",
      title: "Landing Pages",
      price: "₹6,000",
      description: "Single-page high impact marketing site built for rapid launch.",
      highlights: [
        "1-Page Responsive Layout",
        "Modern UI & Basic Animations",
      ],
      exclusions: [
        "Multi-page site navigation structure",
        "CMS or blog publishing functionality",
        "E-commerce store or shopping cart",
      ],
    },
    {
      id: "rate-pro-web",
      title: "Professional Websites",
      price: "₹20,000",
      description: "Custom-designed websites with richer layouts, interactions, content and integrations.",
      highlights: [
        "Up to 8 Custom Pages",
        "Custom UI/UX & Interactive Sections",
        "Forms, Analytics & Performance Optimization",
      ],
      exclusions: [
        "Full e-commerce platform & cart",
        "Native iOS/Android mobile apps",
        "SaaS multi-tenant subscription billing",
      ],
    },
    {
      id: "rate-custom-web",
      title: "Custom Websites",
      price: "₹30,000",
      description: "Fully custom web experience with tailored functionality.",
      highlights: [
        "Custom Workflows & Functionality",
        "APIs, Accounts & Database Features",
      ],
      exclusions: [
        "Native mobile app store releases",
        "24/7 dedicated DevOps monitoring",
        "Third-party SaaS software licensing fees",
      ],
    },
    {
      id: "rate-ecommerce",
      title: "E-commerce",
      price: "₹28,000",
      description: "Online store with product catalog, cart checkout, and payment gateways.",
      highlights: [
        "Product Catalog & Cart",
        "Checkout & Payment Integration",
        "Basic Order Management",
      ],
      exclusions: [
        "Native mobile shopping applications",
        "Multi-warehouse ERP inventory sync",
        "Custom payment gateway development",
      ],
    },
    {
      id: "rate-mobile",
      title: "Mobile Applications",
      price: "₹25,000",
      description: "Mobile applications for Android, iOS, or cross-platform deployment.",
      highlights: [
        "Android / iOS / Cross-Platform",
        "Backend & API Integration",
        "Publishing Assistance",
      ],
      exclusions: [
        "Apple/Google developer account fees",
        "Custom AI backend infrastructure",
        "Hardware/IoT custom firmware",
      ],
    },
    {
      id: "rate-maint",
      title: "Maintenance",
      price: "₹2,000",
      unit: "/month",
      description: "Ongoing technical maintenance, bug fixes, updates, and minor support.",
      highlights: [
        "Basic Technical Maintenance",
        "Minor Bug Fixes & Updates",
        "Up to ~2 Hours/Month",
      ],
      exclusions: [
        "Major feature rebuilds or redesigns",
        "24/7 emergency response SLA",
        "Third-party plugin or API license costs",
      ],
    },
  ] as ServiceRate[],
};

export const FEATURE_EXPLANATIONS: Record<string, string> = {
  // Business Websites
  "Up to 5 Responsive Pages": "Up to 5 pages that adapt to any screen size, e.g. Home, About, Services, Gallery, Contact.",
  "Modern UI & Interactive Sections": "A clean, professional design with interactive elements like hover effects, tabs, or simple animations.",
  "Contact / Lead Forms": "A contact or enquiry form so visitors can reach out directly from the site.",
  "Basic SEO & Performance Optimization": "Page titles, meta descriptions, and image/code optimization so the site loads fast and is discoverable on Google.",

  // AI Solutions
  "AI API Integration": "Connecting your site or app to an AI provider (like OpenAI or Claude) to power a specific feature.",
  "Simple AI Chat Assistant": "A basic chat widget that can answer simple, pre-defined questions — not a full custom-trained chatbot.",
  "Basic AI Automation": "Automating one simple repetitive task with AI, such as summarizing form submissions or tagging content.",

  // Custom Software
  "Custom Web Applications": "A tool or system built specifically for your workflow, not a generic template — e.g. a booking tool or internal calculator.",
  "Admin Dashboards & Business Tools": "A private panel where you can view, add, or manage your data, like an internal inventory or client list.",
  "Database & Workflow Automation": "Setting up a database to store your information and automating simple steps like status updates or record entry.",

  // Landing Pages
  "1-Page Responsive Layout": "A single scrolling page that adapts to mobile and desktop, ideal for one campaign or offer.",
  "Modern UI & Basic Animations": "Clean visual design with simple entrance animations or scroll effects, no heavy interactivity.",

  // Professional Websites
  "Up to 8 Custom Pages": "You can create up to 8 pages, e.g. Home, About, Services, Portfolio, Blog, Contact, etc.",
  "Custom UI/UX & Interactive Sections": "The website design is made specifically for your brand, rather than using a ready-made template, with animations, sliders, tabs, dropdowns, and hover effects.",
  "Forms, Analytics & Performance Optimization": "Contact/enquiry forms plus basic visitor tracking such as Google Analytics, and performance tuning for faster load times.",

  // Custom Websites
  "Custom Workflows & Functionality": "Site behavior built around your specific process, e.g. a multi-step booking flow or a custom calculator.",
  "APIs, Accounts & Database Features": "User accounts/login, connections to outside services, and a database to store and manage information.",

  // E-commerce
  "Product Catalog & Cart": "A browsable list of products with a shopping cart so customers can select and hold items before checkout.",
  "Checkout & Payment Integration": "A secure checkout flow connected to a payment gateway like Razorpay or Stripe.",
  "Basic Order Management": "A simple way to view and manage incoming orders — not a full inventory/warehouse system.",

  // Mobile Applications
  "Android / iOS / Cross-Platform": "The app can be built natively for one platform or as a single cross-platform app for both.",
  "Backend & API Integration": "Connecting the app to a server or third-party service so it can fetch and save real data.",
  "Publishing Assistance": "Help preparing and submitting the app to the Google Play Store or Apple App Store.",

  // Maintenance
  "Basic Technical Maintenance": "Routine checks to keep the site running smoothly, e.g. monitoring uptime and applying small fixes.",
  "Minor Bug Fixes & Updates": "Fixing small issues or making minor content/design tweaks as they come up.",
  "Up to ~2 Hours/Month": "A monthly time allowance for these tasks; larger changes are quoted separately.",
};

export const FAQ_DATA: FAQItem[] = [
  {
    id: "faq-1",
    question: "What type of projects do you work on?",
    answer: "I specialize in building modern responsive websites, custom web applications, AI-powered software (such as LLM assistants and RAG pipelines), SaaS tools, and polished UI/UX interfaces.",
  },
  {
    id: "faq-2",
    question: "How long does a website take to build?",
    answer: "Project timelines depend on scope. A clean landing page or portfolio typically takes 1–2 weeks, while full-featured web applications or AI tools range between 3 to 6 weeks.",
  },
  {
    id: "faq-3",
    question: "Do you also build AI-powered applications?",
    answer: "Yes! I integrate OpenAI, Claude, Whisper, and custom Python RAG pipelines into web applications to deliver AI chat assistants, automated audio transcription, document summarizers, and intelligent workflows.",
  },
  {
    id: "faq-4",
    question: "Can you work with an existing project?",
    answer: "Absolutely. I can step into an existing codebase to refactor UI/UX components, add new feature modules, improve performance, or fix complex architectural bugs.",
  },
  {
    id: "faq-5",
    question: "Do you provide maintenance after launch?",
    answer: "Yes, every package includes post-launch support. I also offer ongoing maintenance agreements starting at ₹3,000/month for security updates, performance monitoring, and content updates.",
  },
  {
    id: "faq-6",
    question: "How does the project process work?",
    answer: "My workflow follows 4 simple stages: Discover (understanding goals), Plan (mapping architecture), Build (agile development with weekly demos), and Launch (testing & deployment).",
  },
  {
    id: "faq-7",
    question: "Can the project be customized based on requirements?",
    answer: "Yes! All rate card prices are starting points. We can customize deliverables, feature sets, and timelines according to your specific business requirements.",
  },
  {
    id: "faq-8",
    question: "How do I start a project with you?",
    answer: "You can click 'Start a Project' or submit your project details through the contact section form. I will review your message and reply within 24 hours to set up an initial consultation.",
  },
];

export const FOOTER_DATA = {
  name: "Himat",
  role: "Freelance Developer & Creative Technologist",
  bio: "Building fast, modern, and purposeful digital products, web applications, and AI solutions.",
  email: "pariharhimatsingh@gmail.com",
  whatsapp: "+91 89492 78844",
  location: "India / Remote",
  navLinks: [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "Process", href: "#process" },
    { label: "Contact", href: "#contact" },
  ],
  socials: [
    { name: "GitHub", url: "https://github.com/himatp", icon: "Code2" },
  ],
  copyright: "© 2026 Himat. All rights reserved.",
};
