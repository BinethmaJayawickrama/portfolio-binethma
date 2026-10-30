export const projects = [
  {
    id: "adorix",
    dimension: "DIMENSION AI-01",
    title: "Adorix",
    subtitle: "AI-Powered Conversational Sales Kiosk",
    category: "ai",
    badge: "Flagship AI Realm",
    image: "/assets/project_adorix.jpg",
    summary: "Next-generation retail interactive assistant featuring natural conversational AI, facial detection, smart product recommendations, and voice telemetry.",
    details: [
      "Designed and engineered an autonomous AI sales assistant capable of natural multi-turn voice and text conversations with customers in retail environments.",
      "Integrated real-time computer vision for customer engagement detection and contextual recommendation heuristics.",
      "Engineered low-latency speech-to-text and voice synthesis pipelines for seamless human-machine dialogue.",
      "Built with high-availability microservices architecture to synchronize catalog inventory and user purchase intent in real time."
    ],
    tech: ["Next.js", "TypeScript", "Python", "FastAPI", "OpenCV", "Whisper AI", "WebSockets", "Tailwind CSS"],
    metrics: { latency: "< 350ms", accuracy: "98.4%", platform: "Interactive Kiosk & Web" },
    links: { demo: "#", github: "https://github.com/BinethmaJayawickrama", article: "#lore-adorix" }
  },
  {
    id: "cattle-iot",
    dimension: "DIMENSION IOT-02",
    title: "Smart Cattle Breeding & Heat Detection",
    subtitle: "IoT-Enabled Livestock Telemetry & Cloud Platform",
    category: "iot",
    badge: "Hardware & Cloud Fusion",
    image: "/assets/project_cattle.jpg",
    summary: "Proprietary non-invasive tail-mounted IoT sensor pod ('Smart Tail Pod') detecting bovine estrus cycles and biometric telemetry in real-time.",
    details: [
      "Invented and prototyped a ruggedized tail-worn sensor node featuring 6-axis IMU accelerometers, temperature probes, and long-range wireless telemetry.",
      "Formulated sensor fusion algorithms to distinguish authentic heat behaviors from typical grazing and tail-swishing motions.",
      "Constructed a cloud dashboard delivering SMS/push alerts to farm managers within minutes of confirmed estrus detection.",
      "Drastically reduces artificial insemination missed-window rates, empowering sustainable livestock reproduction."
    ],
    tech: ["ESP32 / MicroPython", "MQTT / LoRaWAN", "AWS IoT Core", "Node.js", "React", "Chart.js", "PostgreSQL"],
    metrics: { batteryLife: "6+ Months", detectionRate: "94.8%", range: "Up to 5 km" },
    links: { demo: "#", github: "https://github.com/BinethmaJayawickrama", article: "#lore-cattle" }
  },
  {
    id: "apexfled",
    dimension: "DIMENSION COMM-03",
    title: "ApexFled",
    subtitle: "Premium Digital E-Commerce Web Ecosystem",
    category: "web",
    badge: "Full-Stack Web",
    image: "/assets/project_apexfled.jpg",
    summary: "Ultra-high-performance e-commerce marketplace platform engineered for speed, immersive product discovery, and friction-free checkout workflows.",
    details: [
      "Architected a scalable digital storefront with server-side rendering, sub-second page transitions, and progressive image hydration.",
      "Implemented secure multi-gateway checkout with Stripe and webhook-based order processing.",
      "Created an administrative command center for live inventory management, order fulfillment, and user behavioral analytics.",
      "Optimized for 99+ Lighthouse performance across mobile and desktop viewports."
    ],
    tech: ["React 19", "Next.js App Router", "TypeScript", "PostgreSQL", "Prisma ORM", "Stripe API", "Zustand"],
    metrics: { lighthouseScore: "99/100", checkoutSpeed: "2.1s avg", modularComponents: "45+" },
    links: { demo: "#", github: "https://github.com/BinethmaJayawickrama" }
  },
  {
    id: "visionsync",
    dimension: "DIMENSION CV-04",
    title: "Vision Sync",
    subtitle: "AI Gesture & Hand Landmark Screen Brightness Controller",
    category: "ai",
    badge: "Computer Vision",
    image: "/assets/project_visionsync.jpg",
    summary: "Contactless computer vision utility tracking hand landmarks and gesture pinch-distances to dynamically control display brightness and media parameters.",
    details: [
      "Utilized real-time 21-point hand landmark coordinate estimation via webcam feed with zero dedicated sensor hardware required.",
      "Calculated normalized Euclidean distance between thumb and index fingertips with exponential moving average smoothing to eliminate jitter.",
      "Interfaced with native OS brightness APIs and desktop window subsystems for instantaneous hardware response.",
      "Runs completely client-side in real-time at 60 FPS with minimal CPU footprint."
    ],
    tech: ["Python", "OpenCV", "MediaPipe", "NumPy", "Screen Brightness API", "Tkinter / GUI"],
    metrics: { fps: "60 FPS", latency: "12ms", accuracy: "99.1%" },
    links: { demo: "#", github: "https://github.com/BinethmaJayawickrama" }
  },
  {
    id: "teamflow",
    dimension: "DIMENSION OPS-05",
    title: "TeamFlow",
    subtitle: "Collaborative Sprint & Task Management Platform",
    category: "web",
    badge: "Full-Stack Web",
    image: "/assets/project_apexfled.jpg",
    summary: "Enterprise-grade sprint orchestration workspace offering real-time task board synchronization, role-based permissions, and milestone tracking.",
    details: [
      "Engineered real-time drag-and-drop Kanban boards with WebSocket state broadcasting across multiple connected team members.",
      "Implemented comprehensive RBAC (Role-Based Access Control) across Admin, Project Lead, and Developer tiers.",
      "Built automated sprint velocity charts, burndown metrics, and timeline dependency mapping.",
      "Integrated automated email digest notifications and Slack webhook dispatchers."
    ],
    tech: ["React", "Node.js", "Express", "Socket.io", "MongoDB", "JWT Auth", "Docker"],
    metrics: { syncLatency: "< 50ms", securityScore: "A+", testCoverage: "88%" },
    links: { demo: "#", github: "https://github.com/BinethmaJayawickrama" }
  },
  {
    id: "wordsearch",
    dimension: "DIMENSION GAME-06",
    title: "WordSearch Quest",
    subtitle: "Interactive Cross-Platform Mobile Puzzle Engine",
    category: "mobile",
    badge: "Mobile Architecture",
    image: "/assets/project_visionsync.jpg",
    summary: "Addictive algorithmic word puzzle mobile game crafted in Flutter / Dart with procedural grid generation, dynamic themes, and haptic feedback.",
    details: [
      "Constructed a trie-based directional word search matrix generator that procedurally creates intersecting vocabulary grids of variable difficulty.",
      "Implemented fluid finger swipe tracking with SVG path rendering, glowing letter trails, and subtle haptic feedback.",
      "Built with local persistent state and cloud leaderboard synchronization.",
      "Designed according to Google Material 3 design specifications with fluid 120Hz animations."
    ],
    tech: ["Flutter", "Dart", "Material Design 3", "SQLite", "Firebase Auth", "Haptics Engine"],
    metrics: { refreshRate: "120 FPS", installSize: "< 18MB", levels: "200+ Generated" },
    links: { demo: "#", github: "https://github.com/BinethmaJayawickrama" }
  }
];

export const skillsData = [
  {
    category: "Front-End Sorcery",
    icon: "code",
    mandalaColor: "#ff9100",
    description: "Crafting fluid, high-velocity user interfaces and immersive dimensional web experiences.",
    items: [
      { name: "React 19 & Next.js", level: "Expert", xp: "95%" },
      { name: "TypeScript & Modern JS (ESNext)", level: "Advanced", xp: "92%" },
      { name: "Tailwind CSS & Vanilla CSS Architecture", level: "Master", xp: "98%" },
      { name: "HTML5 Canvas, Three.js & Micro-Animations", level: "Advanced", xp: "88%" },
      { name: "UI/UX & State Architecture (Zustand/Redux)", level: "Advanced", xp: "90%" }
    ]
  },
  {
    category: "Back-End & Core Alchemy",
    icon: "server",
    mandalaColor: "#ff4d00",
    description: "Architecting resilient APIs, distributed database schemas, and robust server microservices.",
    items: [
      { name: "Node.js & Express.js", level: "Advanced", xp: "92%" },
      { name: "Python & FastAPI / Flask", level: "Advanced", xp: "88%" },
      { name: "Java & Object-Oriented Software Design", level: "Intermediate", xp: "80%" },
      { name: "PostgreSQL, MongoDB & Prisma ORM", level: "Advanced", xp: "90%" },
      { name: "RESTful & WebSocket Protocol Architecture", level: "Master", xp: "94%" }
    ]
  },
  {
    category: "Hardware & IoT Rifts",
    icon: "cpu",
    mandalaColor: "#00f0ff",
    description: "Bridging the physical realm and the cloud with microcontrollers, sensors, and telemetry.",
    items: [
      { name: "ESP32 & ESP8266 Microcontrollers", level: "Master", xp: "95%" },
      { name: "MicroPython & C/C++ Embedded Code", level: "Advanced", xp: "88%" },
      { name: "MQTT, LoRaWAN & HTTP Telemetry", level: "Advanced", xp: "90%" },
      { name: "Sensor Fusion (IMU, Temp, Biometrics)", level: "Advanced", xp: "86%" },
      { name: "Circuit Prototyping & PCB Diagnostics", level: "Intermediate", xp: "82%" }
    ]
  },
  {
    category: "AI & Vision Divination",
    icon: "sparkles",
    mandalaColor: "#00ffaa",
    description: "Empowering software with synthetic cognition, computer vision, and autonomous agent loops.",
    items: [
      { name: "Computer Vision & OpenCV", level: "Advanced", xp: "89%" },
      { name: "MediaPipe Hand/Face Landmark Models", level: "Advanced", xp: "92%" },
      { name: "LLM Orchestration & Prompt Architecture", level: "Advanced", xp: "90%" },
      { name: "Speech-to-Text & Speech Synthesis Pipelines", level: "Intermediate", xp: "84%" },
      { name: "AI Agent Development & RAG Systems", level: "Intermediate", xp: "85%" }
    ]
  },
  {
    category: "Sacred Artifacts & DevOps",
    icon: "terminal",
    mandalaColor: "#c77dff",
    description: "Armoring projects with reliable delivery pipelines, containerization, and version control.",
    items: [
      { name: "Git, GitHub & Branch Strategies", level: "Master", xp: "96%" },
      { name: "Docker Containerization", level: "Intermediate", xp: "82%" },
      { name: "Linux Administration & Bash Scripting", level: "Advanced", xp: "86%" },
      { name: "Vercel, AWS IoT & Cloud Deployment", level: "Advanced", xp: "90%" },
      { name: "CI/CD & Automated Testing Discipline", level: "Advanced", xp: "85%" }
    ]
  }
];

export const timelineEvents = [
  {
    year: "2023 - 2027 (Expected)",
    title: "BSc (Hons) Computer Science",
    institution: "University of Westminster / IIT Sri Lanka",
    icon: "graduation-cap",
    description: "Pursuing rigorous academic grounding in software architecture, algorithms, IoT, artificial intelligence, and distributed systems at Informatics Institute of Technology.",
    tags: ["Higher Education", "Computer Science", "Westminster UK Degree"]
  },
  {
    year: "2024",
    title: "Genesis of the Smart Tail Pod (IoT Agriculture)",
    institution: "AgriTech Innovation Laboratory",
    icon: "radio",
    description: "Pioneered research and hardware prototypes for non-invasive livestock estrus cycle detection using ESP32 sensor pods and cloud telemetry.",
    tags: ["IoT Hardware", "MicroPython", "Precision Agriculture"]
  },
  {
    year: "2025",
    title: "Architecting Adorix Conversational Sales Kiosks",
    institution: "Autonomous AI Research & Dev",
    icon: "bot",
    description: "Designed voice-enabled computer vision sales kiosks capable of real-time human interaction, dynamic recommendation, and automated retail assistance.",
    tags: ["Conversational AI", "Computer Vision", "Next.js"]
  },
  {
    year: "2026 - Present",
    title: "Full-Stack & Multi-Universe Web Engineering",
    institution: "Open Source & Industry Ventures",
    icon: "globe",
    description: "Building production web applications, exploring multi-agent software ecosystems, publishing technical insights, and creating immersive digital portals.",
    tags: ["Full-Stack", "Creative Engineering", "Production Systems"]
  }
];

export const articles = [
  {
    id: "lore-adorix",
    title: "Building Adorix: Bringing Conversational AI to Physical Kiosks",
    date: "October 2026",
    readTime: "6 min read",
    category: "AI & Robotics",
    excerpt: "How we tackled low-latency speech pipelines, ambient noise cancellation, and facial tracking to create a truly responsive autonomous retail assistant.",
    content: `
      ### The Physical AI Frontier
      While web chatbots have become ubiquitous, deploying intelligent conversational agents into physical kiosk terminals introduces radical real-world challenges: ambient acoustic noise, variable lighting conditions, and the expectation of sub-second conversational latency.

      ### Architecture & Breakthroughs
      1. **Sub-350ms Speech Pipeline**: By piping audio streams through custom WebSocket buffers directly to lightweight quantized speech recognition models, we brought turn-around latency under human pause thresholds.
      2. **Vision Engagement Triggers**: Instead of requiring a wake word, Adorix uses lightweight OpenCV face and gaze tracking to detect when a customer steps within interacting proximity and glances towards the display.
      3. **Contextual Product Recommender**: The dialogue manager retains cart context and suggests relevant complementary accessories based on user inquiries.
    `
  },
  {
    id: "lore-cattle",
    title: "Connecting Cows to the Cloud: The Smart Tail Pod Journey",
    date: "September 2026",
    readTime: "8 min read",
    category: "IoT & Hardware",
    excerpt: "From soldering breadboards to designing waterproof enclosures for dairy cattle: detecting bovine estrus cycles through 6-axis accelerometer sensor fusion.",
    content: `
      ### The Problem in Modern Dairy Husbandry
      Missed estrus (heat) cycles cost dairy farmers thousands of dollars per cow annually due to lost milk production and prolonged calving intervals. Traditional visual observation misses over 40% of heat events that occur late at night.

      ### The Smart Tail Pod Solution
      - **Non-Invasive Enclosure**: Placed gently on the cow's tail root, the pod measures distinct behavioral spikes associated with heat (increased restlessness, tail-raising frequencies, and body temperature fluctuations).
      - **On-Device Edge Filtering**: To conserve battery life for 6+ months, the ESP32 performs edge filtering, only transmitting encrypted telemetry bursts over MQTT when anomalous behavioral signatures cross threshold confidence bounds.
      - **Real-Time Farm Manager Dispatch**: Farmers receive immediate alerts on mobile dashboards, allowing timely veterinary intervention and artificial insemination.
    `
  }
];
