// ==========================================================================
// REAL DATA EXTRACTED FROM BINETHMA JAYAWICKRAMA'S PORTFOLIO
// ==========================================================================

export const personalBio = {
  name: "Binethma Jayawickrama",
  headline: "Full-Stack Developer • IoT Innovator • Creative Engineer",
  shortBio: "Full-Stack Developer specializing in modern web applications. Passionate about building scalable, user-focused solutions using frontend and backend technologies to create seamless digital experiences.",
  institution: "Informatics Institute of Technology (IIT Sri Lanka) / University of Westminster (UK)",
  degree: "BSc (Hons) Computer Science Undergraduate",
  status: "Available for Internships & Full-Stack Opportunities (2026)",
  location: "Colombo, Sri Lanka",
  email: "binethmad@gmail.com",
  phone: "+94 70 113 1651",
  socials: {
    github: "https://github.com/BinethmaJayawickrama",
    linkedin: "https://www.linkedin.com/in/binethma/",
    instagram: "https://www.instagram.com/coffeforurhed?igsh=MTVxcmVoeGhubDcw"
  }
};

export const projects = [
  {
    id: "01",
    dimension: "DIMENSION AI-01",
    title: "Adorix",
    category: "ai",
    categoryLabel: "AI & Interactive Sales",
    tagline: "AI-Powered Conversational Sales Kiosk (2025–2026)",
    image: "/assets/project_adorix.jpg",
    emoji: "🤖",
    description: "An AI-powered sales kiosk that synchronizes video presence tracking with speech interfaces and interactive recommendations.",
    longDescription: "Adorix redefines interactive retail kiosks by combining edge computer vision and real-time Conversational AI. Built to operate in offline/low-latency environments, it detects customer engagement levels through facial presence tracking, welcomes them via synthesized speech, and navigates product catalogues through structured voice dialogue. The backend synchronizes video inputs with FastAPI endpoints to serve low-latency interactions.",
    challengesLabel: "Key Features & Engineering Challenges",
    challenges: [
      "Optimizing MediaPipe landmark detection to run at 30fps on low-power kiosk hardware.",
      "Achieving sub-500ms voice-to-text response latency over WebSockets.",
      "Designing a state-management machine that resolves interrupted conversations gracefully."
    ],
    resultsLabel: "Key Deliverables & Results",
    results: [
      "Built a functional prototype running facial presence sweeps with zero frame drops.",
      "Reduced speech latency to 420ms by implementing streaming audio pipelines.",
      "Implemented a Supabase sync backend mapping metrics on customer interest profiles."
    ],
    tech: ["Python", "OpenCV", "FastAPI", "React.js", "Tailwind CSS", "WebSockets", "Supabase"],
    links: {
      github: "https://github.com/BinethmaJayawickrama",
      website: "https://adorixit.com/"
    }
  },
  {
    id: "02",
    dimension: "DIMENSION IOT-02",
    title: "Smart Cattle Breeding & Heat Detection",
    category: "iot",
    categoryLabel: "IoT Systems & Agriculture",
    tagline: "IoT-Enabled Cattle Breeding Management Platform (2026, ongoing)",
    image: "/assets/project_cattle.jpg",
    emoji: "🐄",
    description: "An IoT-enabled cattle breeding management platform designed to improve reproductive efficiency in dairy and livestock farms.",
    longDescription: "Developed an IoT-enabled cattle breeding management platform designed to improve reproductive efficiency in dairy and livestock farms. The system maintains comprehensive cattle profiles, tracks breeding and health records, monitors real-time sensor data, and assists farmers in identifying heat (estrus) periods for timely artificial insemination. The platform combines farm management features with data-driven monitoring to support better breeding decisions and herd productivity.",
    challengesLabel: "Key Features & Deliverables",
    challenges: [
      "Individual cattle profile management and health lifecycle tracking.",
      "Breeding and artificial insemination scheduling & predictive alerts.",
      "Health and vaccination record management with audit trails.",
      "IoT-based heat detection and activity monitoring with tail-worn sensor pods.",
      "Historical biometric data collection and trend analytics.",
      "Farmer-friendly responsive dashboard and automated alert reporting system."
    ],
    resultsLabel: "Engineering Highlights",
    results: [
      "Successfully prototyped wearable tail pod enclosures with waterproof sealing.",
      "Implemented low-power wireless telemetry intervals yielding 6+ months continuous battery operation.",
      "Empowers dairy operations with timely insemination windows, drastically reducing missed fertility cycles."
    ],
    tech: ["IoT Sensors", "Embedded Systems", "Database Management", "Web Development", "Mobile Development", "Data Analytics", "Machine Learning"],
    links: {
      github: "https://github.com/BinethmaJayawickrama",
      badge: "Ongoing Innovation • Private Hardware Repository"
    }
  },
  {
    id: "03",
    dimension: "DIMENSION COMM-03",
    title: "ApexFled",
    category: "web",
    categoryLabel: "Full-Stack E-Commerce",
    tagline: "Premium Digital E-Commerce Platform (2026)",
    image: "/assets/project_apexfled.jpg",
    emoji: "🛍️",
    description: "High-performance digital account storefront utilizing microservice APIs, state sync, and secure transactional databases.",
    longDescription: "ApexFled is a full-featured digital storefront optimized for speed, reliability, and security. Utilizing Next.js Server Components, it fetches catalogue configurations dynamically with low server response times. The platform supports secure user profiles, Stripe checkout transactions, and PostgreSQL schemas with real-time stock sync.",
    challengesLabel: "Key Features & Engineering Challenges",
    challenges: [
      "Implementing optimistic state updates for immediate cart interactions without layout shifts.",
      "Restructuring database queries to prevent deadlock situations during flash sales.",
      "Optimizing image rendering configurations to achieve maximum Lighthouse performance metrics."
    ],
    resultsLabel: "Key Deliverables & Results",
    results: [
      "Achieved sub-1.2s page load speed, scoring 98/100 on mobile Lighthouse performance checks.",
      "Designed secure database triggers in PostgreSQL mapping inventory locks on transaction starts.",
      "Built a custom dashboard tracking revenue summaries, fulfillment, and transactional logs."
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "REST APIs"],
    links: {
      github: "https://github.com/SithikaWeerasinghe/digital-account-store",
      website: "https://www.apexfled.com/"
    }
  },
  {
    id: "04",
    dimension: "DIMENSION GAME-04",
    title: "WordSearch App",
    category: "mobile",
    categoryLabel: "Mobile Systems & Gaming",
    tagline: "Interactive Mobile Puzzle Game (2026)",
    image: "/assets/project_visionsync.jpg",
    emoji: "🧩",
    description: "Custom mobile word search game built using Google's Dart system and Material 3 design directives for fluid rendering.",
    longDescription: "WordSearch is an elegant, responsive mobile puzzle game built in Flutter. Adhering strictly to Material 3 guidelines, the interface automatically shifts colors to harmonize with themes. It features a custom grid-drawing canvas that maps touch vectors to letter paths, complete with smooth particle animations.",
    challengesLabel: "Key Features & Engineering Challenges",
    challenges: [
      "Calculating touch coordinate intersections on irregular mobile screen aspect ratios.",
      "Building an offline dictionary index that validates 10,000+ words within milliseconds.",
      "Designing responsive layouts that scale gracefully from compact phones to tablets."
    ],
    resultsLabel: "Key Deliverables & Results",
    results: [
      "Developed a custom-gesture grid tracking letter-swipes at silky smooth 60fps.",
      "Created dynamic theme support shifting color variables in real-time.",
      "Packaged and verified target compilations on Android platforms."
    ],
    tech: ["Flutter", "Dart", "Material 3", "Android SDK", "Git"],
    links: {
      github: "https://github.com/BinethmaJayawickrama/word_search_app"
    }
  },
  {
    id: "05",
    dimension: "DIMENSION OPS-05",
    title: "TeamFlow",
    category: "web",
    categoryLabel: "Productivity & Workspace",
    tagline: "Role-Based Project & Task Management Platform (2026)",
    image: "/assets/project_apexfled.jpg",
    emoji: "📋",
    description: "A collaborative workspace tool featuring dynamic role-based dashboards, secure JWT authorization, task tracking, and real-time alerts.",
    longDescription: "TeamFlow is a production-ready project management application designed to align teams, automate project telemetry, and centralize documentation. Built using Next.js on the frontend and Express.js on the backend, it offers tailored workspaces for Admins, Project Managers, and Team Collaborators. It features a project-wide reports directory, live task checklists, interactive Kanban workflows, and a real-time event system driven by Socket.io.",
    challengesLabel: "Key Features & Engineering Challenges",
    challenges: [
      "Securing route configurations with dynamic JWT credentials and React RouteGuard constraints.",
      "Configuring Prisma ORM with connection pooling via PgBouncer for low-latency queries.",
      "Establishing instant socket notifications for project managers when deliverables are completed."
    ],
    resultsLabel: "Key Deliverables & Results",
    results: [
      "Completed a multi-tier role dashboard with zero permission boundary leaks.",
      "Reduced database query overhead by implementing consolidated relation-includes in backend services.",
      "Deployed frontend to Vercel and API servers to Railway with automated git webhook builds."
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Supabase", "WebSockets"],
    links: {
      github: "https://github.com/BinethmaJayawickrama/TeamFlow-Project-",
      website: "https://team-flow-project-sigma.vercel.app"
    }
  },
  {
    id: "06",
    dimension: "DIMENSION CV-06",
    title: "Vision Sync",
    category: "ai",
    categoryLabel: "AI & Computer Vision",
    tagline: "AI Gesture Brightness Controller (2026)",
    image: "/assets/project_visionsync.jpg",
    emoji: "👁️",
    description: "Computer vision mapping utilities converting hand geometry coordinates into active Windows system adjustments in real time.",
    longDescription: "Vision Brightness Sync is a hands-free computer control utility. Running a lightweight background camera capture loop, it maps hand gesture geometry vectors from MediaPipe's hand-tracker to control Windows system brightness, allowing contactless system management.",
    challengesLabel: "Key Features & Engineering Challenges",
    challenges: [
      "Reducing camera feed processing overhead to prevent high CPU usage states.",
      "Mitigating brightness jitter by implementing moving average filters on coordinate vectors.",
      "Ensuring gesture recognition remains accurate in dim-light conditions."
    ],
    resultsLabel: "Key Deliverables & Results",
    results: [
      "Reduced CPU overhead to less than 4% on modern hardware.",
      "Created smooth brightness steps using double exponential smoothing filters.",
      "Developed a system tray menu for easy startup configuration."
    ],
    tech: ["Python", "OpenCV", "FastAPI", "NumPy", "MediaPipe"],
    links: {
      github: "https://github.com/BinethmaJayawickrama/vision-brightness-sync"
    }
  }
];

export const skillsCategories = [
  {
    id: "programming",
    title: "Programming Languages",
    icon: "💻",
    description: "Core languages used to build software architectures, scripts, and algorithms.",
    skills: ["Python", "Java", "JavaScript"]
  },
  {
    id: "frontend",
    title: "Frontend Development",
    icon: "🌐",
    description: "Modern web frameworks, design systems, and responsive user interfaces.",
    skills: ["HTML5", "CSS3", "JavaScript", "React.js", "Next.js", "Tailwind CSS", "Responsive Design"]
  },
  {
    id: "mobile",
    title: "Mobile Application Development",
    icon: "📱",
    description: "Cross-platform mobile apps crafted with fluid animations and native integrations.",
    skills: ["Flutter", "Dart", "Android SDK", "Material Design 3"]
  },
  {
    id: "cv",
    title: "Computer Vision & Image Processing",
    icon: "👁️",
    description: "Real-time edge image processing, face detection, and hand landmark tracking.",
    skills: ["OpenCV", "MediaPipe", "NumPy", "Video Stream Pipelines"]
  },
  {
    id: "database",
    title: "Database Management",
    icon: "🗄️",
    description: "Relational and cloud document databases with optimized schemas and indexing.",
    skills: ["MySQL", "SQL", "PostgreSQL", "Supabase", "Prisma ORM"]
  },
  {
    id: "networking",
    title: "Networking & Protocols",
    icon: "📡",
    description: "Network configuration, IP addressing, WebSocket streaming, and distributed communication.",
    skills: ["IP Addressing", "Configuration", "Fundamentals", "WebSockets", "MQTT"]
  },
  {
    id: "design",
    title: "UI/UX & Design Tools",
    icon: "🎨",
    description: "User journey mapping, wireframing, high-fidelity prototypes, and component libraries.",
    skills: ["Figma", "UI/UX Architecture", "Wireframing", "Interactive Prototyping"]
  },
  {
    id: "tools",
    title: "Development Tools & Platforms",
    icon: "🛠️",
    description: "Modern developer workflow tools, version control, and cloud deployment pipelines.",
    skills: ["Git", "GitHub", "Vercel", "Railway", "Version Control", "CI/CD & Deployment"]
  }
];

export const timelineEvents = [
  {
    year: "2023 - 2027 (Undergrad)",
    title: "BSc (Hons) Computer Science",
    institution: "Informatics Institute of Technology (IIT) / University of Westminster (UK)",
    icon: "🎓",
    description: "Pursuing rigorous academic grounding in software architecture, computer systems, data structures, algorithms, IoT, and AI.",
    tags: ["Degree Candidate", "Westminster UK", "IIT Sri Lanka", "Seeking Internships"]
  },
  {
    year: "2025 - 2026",
    title: "Adorix Conversational Sales Kiosk",
    institution: "AI & Computer Vision Flagship",
    icon: "🤖",
    description: "Spearheaded the development of an autonomous AI sales kiosk with MediaPipe facial presence sweeps, low-latency audio pipelines (420ms), and real-time inventory dialogue.",
    tags: ["FastAPI", "React", "OpenCV", "WebSockets", "Live Product"]
  },
  {
    year: "2026 (Ongoing)",
    title: "Smart Cattle Breeding & Heat Detection Platform",
    institution: "IoT Agricultural Innovation",
    icon: "🐄",
    description: "Engineered wearable IoT tail sensor pods and a centralized farm manager dashboard to identify bovine estrus cycles and track herd breeding telemetry.",
    tags: ["IoT Wearables", "Embedded Systems", "Livestock Telemetry", "Agritech"]
  },
  {
    year: "2026",
    title: "ApexFled & TeamFlow Platforms",
    institution: "Full-Stack Enterprise & Commerce",
    icon: "🚀",
    description: "Delivered production web platforms: ApexFled (98/100 Lighthouse digital account store) and TeamFlow (role-based sprint management system).",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Supabase", "Production"]
  }
];

export const articles = [
  {
    id: 2,
    category: "AI / Computer Vision",
    title: "Building Adorix: What I learned making an AI kiosk from scratch",
    excerpt: "From face detection pipelines to WebSocket streaming — the real challenges behind building a real-time AI retail experience.",
    date: "April 2026",
    readTime: "8 min read",
    content: `
      ### The Vision Behind Adorix
      Adorix is built to redefine how customers interact with retail kiosks by combining edge computer vision and real-time conversational AI. Instead of tap-only menus, customers are greeted by an intelligent conversational assistant that tracks presence, welcomes them naturally, and responds dynamically.

      ### Key Engineering Challenges
      1. **Edge Computer Vision Performance**: We needed to run MediaPipe facial tracking and customer presence sweeps at a solid 30fps without choking low-power kiosk hardware.
      2. **Sub-500ms Audio Latency**: Standard REST audio requests caused awkward conversational pauses. By transitioning to a duplex WebSocket streaming pipeline with FastAPI, we pushed speech-to-text response latency down to 420ms.
      3. **Graceful Interrupt Handling**: Customers frequently interrupt dialogue. We engineered a reactive state machine that cancels previous speech generation and re-synchronizes the cart context immediately.
    `
  },
  {
    id: 3,
    category: "IoT Systems",
    title: "Connecting cows to the cloud: the Smart Tail Pod journey",
    excerpt: "What happens when software meets agriculture. Building wearable IoT sensors for cattle heat detection and what the data actually looks like.",
    date: "March 2026",
    readTime: "6 min read",
    content: `
      ### Bridging Software with Dairy Agriculture
      Estrus (heat) detection is one of the most critical factors in modern dairy farm profitability. A missed heat cycle delays reproduction and costs farmers significant lost revenue per cow.

      ### The Smart Tail Pod Hardware & Cloud Telemetry
      - **Tail-Root Motion Tracking**: Mounted securely on the cow's tail root, the sensor pod captures continuous activity profiles, detecting the distinctive movement bursts associated with standing heat.
      - **Edge Sensor Filtering**: Raw accelerometer readings are smoothed on-device, transmitting telemetry bursts over MQTT to save battery life.
      - **Cloud Analytics & Timely Dispatch**: The farm manager dashboard displays real-time herd health, automated alerts, and vaccination histories, allowing timely artificial insemination.
    `
  }
];
