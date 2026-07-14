/*
  ================================================================
  ALL YOUR CONTENT LIVES HERE. Edit this file only — index.html
  reads from it automatically. No HTML/CSS knowledge needed.
  ================================================================
*/

window.portfolioData = {
  // ---------------- Auto-calculated experience ----------------
  // The site calculates your total experience from this date, live,
  // so you never have to manually update "X years" anywhere again.
  // Use the date you actually started (your final year project counts).
  // Format: "YYYY-MM-DD"
  config: {
    experienceStartDate: "2019-09-15",
  },

  // ---------------- Identity / nav ----------------
  identity: {
    name: "Haidar Irfan", // shown in hero terminal output + footer
    handle: "haidar.dev", // TODO: placeholder — change to whatever short handle you want in the nav logo
  },

  // ---------------- Hero section ----------------
  hero: {
    terminalLine: "whoami",
    terminalOutput: "Haidar Irfan",
    headlineLine1: "Software engineer,",
    headlineLine2: "{{yearsInt}} years of iOS focus —",
    headlineAccent: "next stop, AI engineer.",
    subtext:
      "{{yearsInt}} years building native iOS apps with Swift, UIKit, and SwiftUI. Currently working remote as an iOS developer for a company based in Riyadh, while building my own Flutter products on the side — the hustle that's steering me toward AI engineering next.",
    // Career roadmap shown as a step tracker in the hero.
    // state: "complete" | "current" | "next"
    roadmap: [
      {
        label: "Software Engineer",
        note: "Android, Spring Boot & Flutter foundations",
        state: "complete",
      },
      {
        label: "iOS Engineer",
        note: "Circl Online — plus my own Flutter apps",
        state: "current",
      },
      { label: "AI Engineer", note: "Next stop", state: "next" },
    ],
    stats: [
      { label: "iOS experience", value: "{{years}} yrs" },
      {
        label: "Current role",
        value: "Senior iOS dev at Circl Online, Riyadh - Remote",
      },
      { label: "Status", value: "Actively looking" },
    ],
    primaryCta: { label: "View the work", href: "#projects" },
    secondaryCta: { label: "Get in touch", href: "#contact" },
  },

  // ---------------- About intro ----------------
  about: {
    heading:
      "Android roots, {{yearsInt}} years of native iOS focus, Flutter in motion — AI engineer next.",
    body: "I started as a self-taught Android developer during my final year project — building the app in Java with a Spring Boot backend — while also taking on a freelance Flutter client on Fiverr in parallel. That early mix of Android, backend, and cross-platform work gave me range before I found my focus in native iOS, where I've spent most of the years since shipping production Swift, UIKit, and SwiftUI apps across multiple companies. Today, alongside my role at Circl Online, I channel that same range into my own ventures — building Flutter-based products end to end, from app to admin panel to website, to solve real problems for real people. With AI reshaping how software gets built, I'm now turning that same range toward AI engineering — not as a pivot away from mobile, but as the next tool in the same toolbox.",
  },

  // ---------------- Work experience (renders as the "epoch timeline") ----------------
  // Ordered MOST RECENT FIRST — that's the order it displays in, top to bottom.
  // "current: true" adds an "epoch NN · current" tag to that entry.
  experience: [
    {
      year: "Sep 2024 – Present",
      epoch: "epoch 05",
      current: true,
      title: "Senior iOS Developer",
      company: "Circl Online · Remote (Riyadh-based team)",
      description:
        "Building and maintaining iOS features remotely for a team based in Riyadh, using Swift and SwiftUI. Collaborate closely with backend engineers to build and update APIs, and work with the UI/UX team to ship seamless, high-quality user experiences.",
      tags: ["Swift", "SwiftUI", "UIKit", "REST APIs"],
    },
    {
      year: "Apr 2022 – Sep 2024",
      epoch: "epoch 04",
      title: "iOS App Developer",
      company: "OnyxTec · Onsite, Lahore, Pakistan",
      description:
        "Served as the sole iOS developer, designing, developing, and maintaining multiple iOS applications with Swift and UIKit — including building a news app from scratch. Worked closely with design, backend, and Android teams on shared APIs, and managed international clients directly from requirements through delivery.",
      tags: ["Swift", "UIKit", "API Integration", "Client management"],
    },
    {
      year: "Oct 2021 – Apr 2022",
      epoch: "epoch 03",
      title: "iOS App Developer",
      company: "Techificent · Onsite, Lahore, Pakistan",
      description:
        "Went deep on API implementations and the networking layer at Techificent, working alongside a strong team of senior iOS developers who sharpened how I structure and consume network code. That mentorship shaped habits — clean networking layers, careful error handling, API contracts done right — that I still carry into every project today.",
      tags: ["Swift", "UIKit", "API Integration", "Networking"],
    },
    {
      year: "Sep 2020 – Oct 2021",
      epoch: "epoch 02",
      title: "iOS Developer",
      company: "Mobizion · Onsite, Daska, Sialkot, Pakistan",
      description:
        "Joined as an iOS intern and was promoted to iOS developer after building my first professional apps with Swift, UIKit, and SwiftUI. Started with frontend/UI implementation and grew into building new apps from the ground up, earning a full-time offer based on performance.",
      tags: ["Swift", "UIKit", "SwiftUI"],
    },
    {
      year: "2019 – Sep 2020",
      epoch: "epoch 01",
      title:
        "Android Developer (Final Year Project) & Freelance Flutter Developer",
      company: "University of Gujrat, Pakistan · Freelance (Fiverr)",
      description:
        "Built my final year project as an Android app in Java, paired with a Java Spring Boot backend — my first taste of shipping a full product end to end. In parallel, I took on a Flutter client through Fiverr, which meant learning cross-platform development from day one, well before it became a specialty. That mix of Android, backend, and Flutter gave me the range I later brought into iOS.",
      tags: ["Android", "Java", "Spring Boot", "Flutter", "Freelance"],
    },
  ],

  // ---------------- Skills / stack ----------------
  // intro supports {{years}} / {{yearsInt}} tokens, same as other text fields.
  // categories: each card = one group. Add/remove cards or items freely.
  skillsSection: {
    intro:
      "{{yearsInt}} years of iOS engineering, layered with Flutter, web, and backend tools from building my own products end to end.",
    categories: [
      {
        label: "iOS · native",
        title: "Swift & Apple frameworks",
        items: [
          "Swift",
          "UIKit",
          "SwiftUI",
          "Combine",
          "Core Data",
          "Auto Layout",
        ],
      },
      {
        label: "Cross-platform",
        title: "Flutter & Dart",
        items: ["Flutter", "Dart", "Provider / Riverpod", "Platform channels"],
      },
      {
        label: "Web",
        title: "Frontend for admin & marketing",
        items: ["ReactJS", "JavaScript", "HTML/CSS", "Responsive design"],
      },
      {
        label: "Backend",
        title: "Firebase & services",
        items: [
          "Firebase Auth",
          "Firestore",
          "Cloud Functions",
          "Firebase Hosting",
          "Push notifications",
        ],
      },
      {
        label: "Tooling",
        title: "App lifecycle",
        items: [
          "Xcode",
          "App Store Connect",
          "Google Play",
          "Git",
          "CI/CD",
          "TestFlight",
        ],
      },
      {
        label: "Practice",
        title: "Ways of working",
        items: [
          "Code review",
          "Agile / Scrum",
          "Cross-functional collaboration",
          "Mentoring",
        ],
      },
    ],
  },

  // ---------------- Projects ----------------
  // type: "Company" (built as part of a team) or "Personal" (built solo)
  // status: "Live" | "Maintained" | "Archived" | any short word
  // contribution: what you actually did on this app — e.g. "Built from
  //   scratch", "Maintained & shipped new features", "Major redesign".
  //   Shown as a small blue badge next to "availability". Optional field —
  //   mainly useful on Company projects since Personal ones are solo-built
  //   by definition.
  // metrics: up to ~4 label/value pairs, shown on the right of the card
  projects: [
    // ---- Company / team projects (iOS, Swift) ----
    {
      type: "Company",
      icon: "assets/icons/circlonline.png",
      title: "Circl Online",
      status: "Live",
      description:
        "Circlonline is a fitness-focused platform that connects influencers and business owners with fitness lovers, enabling them to offer services both online and offline. Based in Saudi Arabia and available in the UK, Circlonline supports both English and Arabic, making it easy to discover, book, and engage with fitness services anytime, anywhere.",
      availability: "Available in Saudi Arabia, UK",
      contribution: "Maintained & shipped new features",
      stack: ["Swift", "SwiftUI", "UIKit", "REST APIs"],
      metrics: [
        { label: "Company", value: "Circl Online, Riyadh" },
        { label: "Role", value: "Senior iOS Developer" },
        { label: "Category", value: "Health & Fitness" },
        { label: "Languages", value: "English, Arabic" },
      ],
      links: [
        {
          label: "iOS",
          href: "https://apps.apple.com/gb/app/circl-%D8%B3%D9%8A%D8%B1%D9%83%D9%84/id1526462647",
          status: "live",
        },
        { label: "Android", href: "#", status: "soon" },
      ],
    },
    {
      type: "Company",
      title: "TipsAllowed",
      icon: "assets/icons/TipsAllowed.jpg",
      status: "Live",
      description:
        "Developed TipsAllowed, an innovative iOS app that connects sports fans directly with athletes for personalized advice. Fans record short video questions, send them to selected athletes (professional, college, or school level), and receive tailored video responses.The platform creates a unique earning opportunity for athletes while fostering real community connections through seamless video exchanges and exclusive live sessions for top fans.",
      availability: "Available in United States",
      contribution: "Major updates & shipped new versions",
      stack: ["Swift", "UIKit", "SwiftUI", "REST APIs"],
      metrics: [
        { label: "Company", value: "Onyxtec, Lahore" },
        { label: "Role", value: "Senior iOS Developer" },
        { label: "Category", value: "Sports" },
        { label: "Language", value: "English" },
      ],
      links: [
        {
          label: "iOS",
          href: "https://apps.apple.com/pk/app/tipsallowed/id6464362411",
          status: "live",
        },
      ],
    },
    {
      type: "Company",
      title: "The Locker Room",
      icon: "assets/icons/tlr.jpg",
      status: "Live",
      description:
        "Developed 'The Locker Room', an iOS app fostering direct communication between fans and athletes through Q&A sessions. Used Swift and Firebase to build a platform where athletes monetize their expertise through one-on-one short-form video exchanges — fans record a video question for an athlete, and receive a personalized video reply in return. TipsAllowed is the successor to this app.",
      availability: "Available in United States",
      contribution: "Major updates & shipped new versions",
      stack: ["Swift", "Firebase"],
      metrics: [
        { label: "Company", value: "Onyxtec, Lahore" },
        { label: "Role", value: "iOS Developer" },
        { label: "Category", value: "Sports" },
        { label: "Language", value: "English" },
      ],
      links: [
        {
          label: "iOS",
          href: "https://apps.apple.com/pk/app/the-locker-room-tlr/id1580857069",
          status: "live",
        },
      ],
    },
    {
      type: "Company",
      title: "BuildMarker (App Family)",
      status: "Inactive",
      description:
        "Worked across a family of three companion apps — BuildMarker Customer, BuildMarker Stakeholder, and BuildMarker Field — built to give residential construction customers and stakeholders real-time visibility into a home build's progress. Responsible for resolving crashes and shipping bug fixes across all three apps, along with managing App Store listings and releases. Built in Swift, with API integration handling the underlying business data shared across the app family.",
      stack: ["Swift", "REST APIs"],
      // Row of icons representing the app family.
      icons: [
        {
          label: "Customer",
          src: "assets/icons/bm_customer.png",
        },
        {
          label: "Stakeholder",
          src: "assets/icons/bm_stakeholder.png",
        },
        {
          label: "Field",
          src: "assets/icons/bm_field.png",
        },
      ],
      availability: "Available in United States",
      contribution: "Maintained & shipped bug fixes",
      metrics: [
        { label: "Company", value: "Onyxtec, Lahore" },
        { label: "Role", value: "iOS Developer" },
        { label: "Category", value: "Business" },
        { label: "Language", value: "English" },
      ],
      links: [
        {
          label: "iOS for Customer",
          href: "https://apps.apple.com/app/buildmarker-customer/id1505570466",
          status: "inactive",
        },
        {
          label: "iOS for Stakeholder",
          href: "https://apps.apple.com/app/buildmarker-stakeholder/id1505570610",
          status: "inactive",
        },
        {
          label: "iOS for Field",
          href: "https://apps.apple.com/app/buildmarker-field/id1505570662",
          status: "inactive",
        },
      ],
    },
    {
      type: "Company",
      title: "EasyIslam: Quran & Namaz app",
      icon: "assets/icons/islamic_app.jpg",
      status: "Live",
      description:
        "EasyIslam is a free Islamic companion app offering the full Quran with Urdu & English translations, accurate prayer times with Azan alerts, Qibla compass, Tasbeeh counter, Duas, Zakat calculator, and a kids section with Islamic stories. Clean UI, no ads or subscriptions. Built to support daily worship and spiritual growth.",
      availability: "Available in Pakistan",
      contribution: "Built from scratch",
      stack: ["Swift", "Firebase"],
      metrics: [
        { label: "Company", value: "Techificent, Lahore" },
        { label: "Role", value: "iOS Developer" },
        { label: "Category", value: "Reference" },
        { label: "Language", value: "English, Urdu" },
      ],
      links: [
        {
          label: "iOS",
          href: "https://apps.apple.com/pk/app/easyislam-quran-namaz-app/id1613735799",
          status: "live",
        },
      ],
    },
    {
      type: "Company",
      title: "Pakistan Cargo Services App",
      icon: "assets/icons/pcs.jpg",
      status: "Live",
      description:
        "Developed the Pakistan Cargo Services App, an iOS app for tracking and managing international cargo shipments. Built with Swift, integrating with backend REST APIs to give customers real-time shipment status, booking, and tracking details from a native iOS experience.",
      stack: ["Swift", "REST APIs"],
      availability: "Available worldwide",
      contribution: "Built from scratch and shipped",
      metrics: [
        { label: "Company", value: "Mobizion, Daska, Sialkot" },
        { label: "Role", value: "iOS Developer" },
        { label: "Category", value: "Logistics" },
        { label: "Language", value: "English" },
      ],
      links: [
        {
          label: "iOS",
          href: "https://apps.apple.com/pk/app/pakistan-cargo-services-app/id1613735799",
          status: "live",
        },
      ],
    },

    // ---- Personal projects ----
    {
      type: "Personal",
      icon: "https://play-lh.googleusercontent.com/ht3XNKped-LapFQDJFJplUs0AoovP8V3Pc_UenT69uM5F7otWZlpvBpQaB4_L_lrye_EzkyCE1wKjwCI6sma-A=s256", // fetched from Play Store listing
      title: "Kabootar Bazi",
      status: "Live",
      availability: "Available worldwide",
      description:
        "Pigeon racing tournaments across South Asia and the Middle East involve calculating flight-hour rankings for hundreds of birds across hundreds of tournaments — traditionally a slow, error-prone manual process. Kabootar Bazi replaces that with instant, accurate results. Built and shipped solo end to end: the Flutter app (live on Google Play, iOS coming soon), a Flutter/Dart admin panel to manage tournaments and entries, and a React website for publishing results — designed with UI/UX and calculation accuracy specifically built to outclass existing tools in the space.",
      stack: [
        "Flutter",
        "Dart",
        "ReactJS",
        "Firebase Auth",
        "Firestore",
        "Firebase Hosting",
        "Firebase Storage",
        "Remote Config",
        "Multi-language support",
      ],
      metrics: [
        { label: "Role", value: "Solo Developer" },
        { label: "Scope", value: "App · Admin Panel · Website" },
        { label: "Platform", value: "Android" },
        { label: "Backend", value: "Firebase" },
      ],
      // Multiple call-to-action links. status: "live" (clickable) or "soon" (dimmed, shows a note on tap).
      links: [
        {
          label: "Android",
          href: "https://play.google.com/store/apps/details?id=com.haidar.pigeonapp",
          status: "live",
        },
        { label: "iOS", href: "#", status: "soon" },
        {
          label: "Website",
          href: "https://kabootarbazi.web.app",
          status: "live",
        },
      ],
    },
    {
      type: "Personal",
      icon: "https://play-lh.googleusercontent.com/e_y9RLVfvJQnjygUiOCPGgZh6yuo5sRJi8s1Pz8R7m28fcQRlX5DZKUXTl4odl2gF_qHM7tGWmWTO0oGN5dTgxg=s256", // fetched from Play Store listing
      title: "Darzi Online",
      status: "Live",
      availability: "Available in Pakistan only",
      description:
        "Tailors have traditionally tracked customer measurements on paper — records that get lost, torn, or simply fade and expire with age, forcing awkward re-measurements and frustrating repeat customers. Darzi Online replaces the paper diary entirely: secure OTP login, a clean customer list, and measurements stored digitally and available the instant a tailor needs them, in the language they're most comfortable working in. Built and shipped solo, backed by Firebase.",
      stack: [
        "Flutter",
        "Dart",
        "Firebase Auth (OTP)",
        "Firestore",
        "Multi-language support",
      ],
      metrics: [
        { label: "Role", value: "Solo Developer" },
        { label: "Platform", value: "Android" },
        { label: "Backend", value: "Firebase" },
      ],
      links: [
        {
          label: "Android",
          href: "https://play.google.com/store/apps/details?id=com.haidar.darzionline",
          status: "live",
        },
        { label: "iOS", href: "#", status: "soon" },
      ],
    },
    {
      type: "Personal",
      icon: "assets/icons/wallcrafty.png",
      title: "Wallcrafty",
      status: "Inactive",
      description:
        "An iOS app for discovering and downloading high-quality wallpapers, built for iPhone users who want their device to reflect their personal style. Wallpapers are organized into curated categories spanning nature, abstract art, and beyond, with both portrait and original sizing so every image fits cleanly. Includes preview-before-download, daily-refreshed content, and search/filtering by category, color, and theme.",
      stack: ["Swift", "UIKit", "Rest API"],
      metrics: [
        { label: "Role", value: "Solo Developer" },
        { label: "Platform", value: "iOS" },
        { label: "Backend", value: "Rest API" },
      ],
      links: [
        {
          label: "iOS",
          href: "https://apps.apple.com/us/app/wallcrafty/id6472342660",
          status: "inactive",
        },
      ],
    },
    {
      type: "Personal",
      icon: "assets/icons/quote-share.png",
      title: "Quote Share",
      status: "Inactive",
      description:
        "An iOS app for creating and sharing personalized quote cards from well-known figures. Users pick a favorite personality, customize the quote with backgrounds and fonts, and share the result straight to social media. Built solo end to end, with a settings screen for personalizing app behavior and no user data collection.",
      stack: ["Swift", "UIKit", "Rest API", "Firebase"],
      metrics: [
        { label: "Role", value: "Solo Developer" },
        { label: "Platform", value: "iOS" },
        { label: "Backend", value: "Rest API and Firebase" },
      ],
      links: [
        {
          label: "iOS",
          href: "https://apps.apple.com/pk/app/quote-share/id6471227650",
          status: "inactive",
        },
      ],
    },
  ],

  // ---------------- Contact ----------------
  contact: {
    heading: "Let's talk.",
    body: "Actively looking for new iOS and Flutter opportunities, and always open to interesting collaborations. Fastest way to reach me is email.",
    email: "haidarirfan.hi043@gmail.com", // professional contact email
    github: {
      label: "github.com/HaidarBhatti",
      href: "https://github.com/HaidarBhatti",
    },
    linkedin: {
      label: "linkedin.com/in/haidar-irfan",
      href: "https://www.linkedin.com/in/haidar-irfan-a4b91a176/",
    },
    x: { label: "@HaidarBhattiDev", href: "https://x.com/HaidarBhattiDev" },
    location: "Remote / Open to relocate",
    // Where the contact form submits. Leave as null to just show an alert.
    // Set this to a Formspree endpoint (or similar) to actually receive messages:
    // formEndpoint: "https://formspree.io/f/yourFormId"
    formEndpoint: null,
  },

  // ---------------- Footer ----------------
  footer: {
    copyright: "© 2026 Haidar Irfan · Built with intent, not a template.",
    socials: [
      { label: "GitHub", href: "https://github.com/HaidarBhatti" },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/haidar-irfan-a4b91a176/",
      },
      { label: "X", href: "https://x.com/HaidarBhattiDev" },
      { label: "Email", href: "mailto:haidarirfan.hi043@gmail.com" },
    ],
  },
};
