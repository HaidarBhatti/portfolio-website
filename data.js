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
    headlineLine1: "iOS engineer,",
    headlineLine2: "{{yearsInt}} years deep —",
    headlineAccent: "now expanding into Flutter.",
    subtext:
      "{{yearsInt}} years building native iOS apps with Swift, UIKit, and SwiftUI. Currently working remote as an iOS developer for a company based in Riyadh, while building my own products in Flutter, React, and Firebase on the side.",
    stats: [
      { label: "iOS experience", value: "{{years}} yrs" },
      { label: "Current role", value: "Remote iOS Dev · Riyadh" },
      { label: "Status", value: "Actively looking" },
    ],
    primaryCta: { label: "View the work", href: "#projects" },
    secondaryCta: { label: "Get in touch", href: "#contact" },
  },

  // ---------------- About intro ----------------
  about: {
    heading: "{{yearsInt}} years native on iOS. Now building cross-platform.",
    body: "I've spent {{years}} years as an iOS developer, shipping production apps with Swift, UIKit, and SwiftUI across multiple companies. Four months ago I picked up Flutter and used it to build my own app end to end — the mobile app itself, an admin panel, and a companion website — to prove I could move fast outside the native ecosystem I know best.",
  },

  // ---------------- Work experience (renders as the "epoch timeline") ----------------
  // Add or remove entries freely — order shown = order listed here.
  // "current: true" adds an "epoch NN · current" tag to the most recent one.
  experience: [
    {
      year: "2019",
      epoch: "epoch 01",
      title: "iOS Developer",
      company: "Final year project → first role", // TODO: replace with real company name once employed
      description:
        "Started building iOS apps with Swift and UIKit during my final year university project, then carried that into my first professional iOS role.",
      tags: ["Swift", "UIKit", "Auto Layout"],
    },
    {
      year: "2021",
      epoch: "epoch 02",
      title: "iOS Developer",
      company: "Company B", // TODO: replace with real company name
      description:
        "Took ownership of larger app modules end to end — architecture, networking layer, and App Store releases. Started adopting SwiftUI for new screens alongside the existing UIKit codebase.",
      tags: ["Swift", "SwiftUI", "Combine", "REST APIs"],
    },
    {
      year: "2023",
      epoch: "epoch 03",
      title: "Senior iOS Developer",
      company: "Company C", // TODO: replace with real company name
      description:
        "Led iOS delivery on a team project, working across UIKit and SwiftUI, mentoring on architecture decisions, and owning releases through to the App Store.",
      tags: ["Swift", "SwiftUI", "UIKit", "Core Data"],
    },
    {
      year: "2026",
      epoch: "epoch 04",
      current: true,
      title: "iOS Developer, learning Flutter",
      company: "Personal project",
      description:
        "Spent the last 4 months learning Flutter by building a full product myself: a mobile app, its admin panel, and a companion marketing website backed by Firebase — my first cross-platform build.",
      tags: ["Flutter", "Dart", "Firebase", "ReactJS"],
    },
  ],

  // ---------------- Skills / stack ----------------
  // Each card = one category. Add/remove cards or items freely.
  skills: [
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
      items: ["Xcode", "App Store Connect", "Git", "CI/CD", "TestFlight"],
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

  // ---------------- Projects ----------------
  // type: "Company" (built as part of a team) or "Personal" (built solo)
  // status: "Live" | "Maintained" | "Archived" | any short word
  // metrics: up to ~4 label/value pairs, shown on the right of the card
  projects: [
    // ---- Company / team projects (iOS, Swift) ----
    {
      type: "Company",
      title: "App name", // TODO: real app name (or "Confidential — retail client" etc. if under NDA)
      status: "Live",
      description:
        "Built and maintained key features as part of the iOS team, working across UIKit and SwiftUI in a production codebase shipped to the App Store.", // TODO: real description
      stack: ["Swift", "UIKit", "SwiftUI"],
      metrics: [
        { label: "Role", value: "iOS Developer" },
        { label: "Team size", value: "— " }, // TODO
        { label: "App Store", value: "Live" },
      ],
      link: "#",
    },
    {
      type: "Company",
      title: "App name", // TODO
      status: "Live",
      description:
        "Contributed to architecture, networking, and release process as part of a cross-functional product team.", // TODO
      stack: ["Swift", "SwiftUI", "Combine"],
      metrics: [
        { label: "Role", value: "iOS Developer" },
        { label: "Team size", value: "— " }, // TODO
        { label: "App Store", value: "Live" },
      ],
      link: "#",
    },
    {
      type: "Company",
      title: "App name", // TODO — add more company projects by copying this block
      status: "Maintained",
      description:
        "Owned a major module end to end, from design handoff through App Store release and post-launch iteration.", // TODO
      stack: ["Swift", "UIKit", "Core Data"],
      metrics: [
        { label: "Role", value: "Senior iOS Developer" },
        { label: "Team size", value: "— " }, // TODO
        { label: "App Store", value: "Live" },
      ],
      link: "#",
    },

    // ---- Personal projects ----
    {
      type: "Personal",
      title: "Your Flutter app name", // TODO
      status: "Live",
      description:
        "My first cross-platform build: a Flutter app, a companion admin panel to manage its content/users, and a marketing website — all built solo in 4 months, backed by Firebase.", // TODO — tailor this
      stack: ["Flutter", "Dart", "Firebase", "ReactJS"],
      metrics: [
        { label: "Built in", value: "4 months" },
        { label: "Components", value: "App + Admin + Web" },
        { label: "Backend", value: "Firebase" },
      ],
      link: "#", // TODO: link to the app store / website
    },
    {
      type: "Personal",
      title: "UIKit app #1", // TODO: real name
      status: "Live",
      description:
        "A personal iOS app built independently with UIKit, from concept through App Store submission.", // TODO
      stack: ["Swift", "UIKit"],
      metrics: [
        { label: "Platform", value: "iOS" },
        { label: "Built solo", value: "Yes" },
      ],
      link: "#",
    },
    {
      type: "Personal",
      title: "UIKit app #2", // TODO: real name
      status: "Live",
      description: "A second independent iOS app, also built with UIKit.", // TODO
      stack: ["Swift", "UIKit"],
      metrics: [
        { label: "Platform", value: "iOS" },
        { label: "Built solo", value: "Yes" },
      ],
      link: "#",
    },
  ],

  // ---------------- Contact ----------------
  contact: {
    heading: "Let's talk.",
    body: "Open to AI engineering roles and interesting collaborations. Fastest way to reach me is email.",
    email: "hello@example.com",
    github: { label: "github.com/yourhandle", href: "#" },
    linkedin: { label: "linkedin.com/in/yourhandle", href: "#" },
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
      { label: "GitHub", href: "#" },
      { label: "LinkedIn", href: "#" },
      { label: "Email", href: "mailto:hello@example.com" },
    ],
  },
};
