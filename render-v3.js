/*
  Renders the "Engineer & Founder" design (index.html) from data.js.
  You shouldn't need to touch this file — edit data.js instead.
*/
(function () {
  const d = window.portfolioData;
  if (!d) {
    console.error("portfolioData not found — load data.js before render-v3.js");
    return;
  }

  const $ = (id) => document.getElementById(id);
  const esc = (str) =>
    String(str ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  // ---------- Live experience calculation ----------
  const yearsSince = (dateStr) =>
    Math.max(0, (new Date() - new Date(dateStr + "T00:00:00")) / (1000 * 60 * 60 * 24 * 365.25));
  const totalYears = yearsSince(d.config.experienceStartDate);
  const iosYears = Math.floor(yearsSince(d.config.iosStartDate || d.config.experienceStartDate));

  // Replaces {{iosYears}}, {{years}}, {{yearsInt}} tokens, then escapes.
  const t = (str) =>
    esc(
      String(str ?? "")
        .replace(/\{\{iosYears\}\}/g, iosYears)
        .replace(/\{\{years\}\}/g, totalYears.toFixed(1))
        .replace(/\{\{yearsInt\}\}/g, Math.round(totalYears)),
    );

  const metric = (p, label) => (p.metrics || []).find((m) => m.label === label)?.value;
  const firstName = d.identity.name.split(" ")[0];

  const ICON = {
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M7 17L17 7M9 7h8v8"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    image: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-9 9"/></svg>',
  };

  // Renders a store/website link. "soon" and "inactive" links render disabled.
  function linkBtn(l, primary) {
    const cls = `btn btn-sm ${primary ? "btn-primary" : "btn-ghost"}`;
    if (l.status === "soon")
      return `<span class="btn btn-sm btn-ghost disabled" title="Coming soon">${esc(l.label)} · soon</span>`;
    if (l.status === "inactive")
      return `<span class="btn btn-sm btn-ghost disabled" title="No longer listed">${esc(l.label)} · retired</span>`;
    return `<a class="${cls}" href="${esc(l.href)}" target="_blank" rel="noopener noreferrer">${esc(l.label)} ${ICON.arrow}</a>`;
  }

  function appIcons(p) {
    if (p.icons) return p.icons.map((i) => `<img class="app-icon" src="${esc(i.src)}" alt="${esc(i.label)}" loading="lazy" />`).join("");
    if (p.icon) return `<img class="app-icon" src="${esc(p.icon)}" alt="" loading="lazy" />`;
    return `<div class="app-icon"></div>`;
  }

  // ---------- Nav / identity ----------
  $("logo-name").textContent = d.identity.name;
  $("logo-mark").textContent = d.identity.name[0];

  // ---------- Hero ----------
  const pr = d.profile;
  $("availability").textContent = pr.availability;
  $("hero-h1").innerHTML = `${t(pr.headline)} <span class="accent">${t(pr.headlineAccent)}</span>`;
  $("hero-sub").innerHTML = t(pr.subtext);
  $("hero-location").textContent = pr.location;
  $("hero-eyebrow").textContent = pr.eyebrow;

  const portrait = $("portrait");
  const portraitImg = new Image();
  portraitImg.alt = `Portrait of ${d.identity.name}`;
  portraitImg.onerror = () => {
    portrait.innerHTML = `<div class="ph-empty">${ICON.image}<span>Your portrait goes here</span><code>${esc(pr.portrait)}</code></div>`;
  };
  portraitImg.src = pr.portrait;
  portrait.appendChild(portraitImg);

  $("notifs").innerHTML = (pr.notifications || [])
    .slice(0, 2)
    .map(
      (n, i) => `
      <div class="notif n${i + 1}">
        <img src="${esc(n.icon)}" alt="" />
        <div><b>${esc(n.app)}</b><span>${esc(n.text)}</span></div>
        <small>now</small>
      </div>`,
    )
    .join("");

  // ---------- Stats ----------
  const appsShipped = d.projects.reduce((n, p) => n + (p.icons ? p.icons.length : 1), 0);
  const jobs = d.experience.filter((e) => !/final year/i.test(e.title));
  const ownProducts = d.projects.filter((p) => p.type === "Personal").length;
  const stats = [
    { num: iosYears, sup: "+", lbl: "Years of native iOS in Swift" },
    { num: appsShipped, sup: "", lbl: "Apps shipped to the stores" },
    { num: jobs.length, sup: "", lbl: "Product teams, onsite & remote" },
    { num: ownProducts, sup: "", lbl: "Products launched as a founder" },
  ];
  $("stats").innerHTML = stats
    .map((s) => `<div class="stat"><div class="num">${s.num}<sup>${s.sup}</sup></div><div class="lbl">${esc(s.lbl)}</div></div>`)
    .join("");

  $("logos").innerHTML =
    `<span class="mono">Shipped with</span>` +
    jobs
      .map((e) => {
        const name = e.company.split(" · ")[0];
        const mark = e.logo
          ? `<img src="${esc(e.logo)}" alt="" />`
          : `<span class="co-mark">${esc(name[0])}</span>`;
        return `<span class="co">${mark}${esc(name)}</span>`;
      })
      .join("");

  // ---------- Venture ----------
  const v = d.venture;
  $("venture-h2").innerHTML = `Founder of <span class="accent">${esc(v.name)}</span>`;
  $("venture-tagline").textContent = v.tagline;
  $("venture-id").innerHTML = `<img src="${esc(v.icon)}" alt="" /><div><b>${esc(v.name)}</b><span>${esc(v.role)}</span></div>`;
  $("venture-links").innerHTML = v.links.map((l, i) => linkBtn(l, i === 0)).join("");
  $("venture-ps").innerHTML = `
    <div><span class="mono">The problem</span><p>${esc(v.problem)}</p></div>
    <div><span class="mono">What I built</span><p>${esc(v.solution)}</p></div>`;
  $("venture-highlights").innerHTML = v.highlights
    .map((h) => `<div><div class="num">${esc(h.value)}</div><p>${esc(h.label)}</p></div>`)
    .join("");
  $("venture-surfaces").innerHTML = v.surfaces
    .map(
      (s, i) => `
      <div class="surface reveal">
        <span class="idx">0${i + 1}</span>
        <h3>${esc(s.title)}</h3>
        <span class="stack">${esc(s.stack)}</span>
        <p>${esc(s.text)}</p>
      </div>`,
    )
    .join("");
  $("venture-also").innerHTML = (v.alsoBuilt || [])
    .map((title) => {
      const idx = d.projects.findIndex((p) => p.title === title);
      if (idx < 0) return "";
      const p = d.projects[idx];
      return `
      <button class="also reveal" data-project="${idx}" style="width:100%;text-align:left;color:inherit">
        <img src="${esc(p.icon)}" alt="" />
        <div><span>Also founded</span><b>${esc(p.title)}</b></div>
        <span class="arrow">${esc(p.availability || "")} →</span>
      </button>`;
    })
    .join("");

  // ---------- Work ----------
  const grid = $("work-grid");
  function renderWork(filter) {
    grid.innerHTML = d.projects
      .map((p, i) => ({ p, i }))
      .filter(({ p }) => filter === "all" || p.type === filter)
      .map(({ p, i }) => {
        const sub =
          p.type === "Personal"
            ? "Own product · " + (metric(p, "Platform") || "")
            : [(metric(p, "Company") || "").split(",")[0], metric(p, "Category")].filter(Boolean).join(" · ");
        return `
        <button class="app-card reveal in" data-project="${i}">
          <div class="top">
            <div class="app-icons">${appIcons(p)}</div>
            <span class="pill ${p.status === "Live" ? "live" : ""}">${esc(p.status)}</span>
          </div>
          <div>
            <h3>${esc(p.title)}</h3>
            <div class="meta">${esc(sub)}</div>
          </div>
          <p class="desc">${esc(p.description)}</p>
          <div class="foot">
            <span>${esc(p.stack.slice(0, 3).join(" · "))}</span>
            <span class="more">Details →</span>
          </div>
        </button>`;
      })
      .join("");
  }
  renderWork("all");
  $("work-tabs").addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    document.querySelectorAll("#work-tabs button").forEach((x) => x.classList.toggle("active", x === b));
    renderWork(b.dataset.filter);
  });

  // Project detail sheet
  const appDialog = $("app-dialog");
  function openProject(i) {
    const p = d.projects[i];
    const role = metric(p, "Role");
    $("app-sheet").innerHTML = `
      <button class="icon-btn sheet-close" aria-label="Close" data-close>${ICON.close}</button>
      <div class="sheet-head">
        <div class="app-icons">${appIcons(p)}</div>
        <div>
          <h3>${esc(p.title)}</h3>
          <div class="meta">${esc([p.type === "Personal" ? "Own product" : metric(p, "Company"), role].filter(Boolean).join(" · "))}</div>
        </div>
      </div>
      <p class="body">${esc(p.description)}</p>
      <div class="kv">
        ${p.contribution ? `<div><small>Contribution</small><b>${esc(p.contribution)}</b></div>` : ""}
        ${p.availability ? `<div><small>Availability</small><b>${esc(p.availability)}</b></div>` : ""}
        ${(p.metrics || [])
          .filter((m) => m.label !== "Company" && m.label !== "Role")
          .map((m) => `<div><small>${esc(m.label)}</small><b>${esc(m.value)}</b></div>`)
          .join("")}
      </div>
      <div class="tags">${p.stack.map((s) => `<span class="tag">${esc(s)}</span>`).join("")}</div>
      <div class="links">${(p.links || []).map((l, k) => linkBtn(l, k === 0)).join("")}</div>`;
    appDialog.showModal();
  }
  document.addEventListener("click", (e) => {
    const card = e.target.closest("[data-project]");
    if (card) openProject(+card.dataset.project);
  });
  appDialog.addEventListener("click", (e) => {
    if (e.target === appDialog || e.target.closest("[data-close]")) appDialog.close();
  });

  // ---------- Experience ----------
  $("xp-years").textContent = iosYears;
  $("about-body").innerHTML = t(pr.experienceIntro);
  $("xp").innerHTML = d.experience
    .map(
      (e) => `
      <div class="xp-row reveal">
        <div class="xp-when">${esc(e.year)}${e.current ? '<br><span class="now">Current role</span>' : ""}</div>
        <div>
          <h3>${esc(e.title)}</h3>
          <div class="co">${esc(e.company)}</div>
          <p>${esc(e.description)}</p>
          <div class="tags">${e.tags.map((x) => `<span class="tag">${esc(x)}</span>`).join("")}</div>
        </div>
      </div>`,
    )
    .join("");

  // ---------- Skills ----------
  $("skills-intro").innerHTML = t(pr.skillsIntro);
  $("skills-grid").innerHTML = d.skillsSection.categories
    .map(
      (c) => `
      <div class="skill reveal">
        <span class="mono">${esc(c.label)}</span>
        <h3>${esc(c.title)}</h3>
        <div class="tags">${c.items.map((x) => `<span class="tag">${esc(x)}</span>`).join("")}</div>
      </div>`,
    )
    .join("");

  // ---------- Photos ----------
  const ph = d.photos;
  if (ph.show === false) {
    $("photos").hidden = true;
    document.querySelectorAll('a[href="#photos"]').forEach((a) => (a.hidden = true));
  }
  $("photos-h2").innerHTML = esc(ph.heading).replace(/(\S+)$/, "<em>$1</em>");
  $("photos-intro").textContent = ph.intro;
  const photosGrid = $("photos-grid");
  photosGrid.innerHTML = ph.items
    .map(
      (p, i) => `
      <button class="photo ${p.size || "normal"} reveal" data-photo="${i}" aria-label="Open photo: ${esc(p.caption)}">
        <img src="${esc(p.src)}" alt="${esc(p.alt || p.caption)}" loading="lazy" />
        <figcaption>${esc(p.caption)}</figcaption>
      </button>`,
    )
    .join("");
  // Missing photos show a placeholder tile telling you which file to add.
  photosGrid.querySelectorAll(".photo img").forEach((img) => {
    img.addEventListener("error", () => {
      const tile = img.parentElement;
      tile.classList.add("empty");
      tile.insertAdjacentHTML(
        "afterbegin",
        `<div class="ph-empty">${ICON.image}<code>${esc(img.getAttribute("src"))}</code></div>`,
      );
      img.remove();
    });
  });

  const lb = $("lightbox");
  let lbIndex = 0;
  const loadedPhotos = () => [...photosGrid.querySelectorAll(".photo:not(.empty)")].map((el) => +el.dataset.photo);
  function showPhoto(i) {
    lbIndex = i;
    const p = ph.items[i];
    $("lb-img").src = p.src;
    $("lb-img").alt = p.alt || p.caption;
    $("lb-cap").textContent = p.caption;
  }
  function stepPhoto(dir) {
    const list = loadedPhotos();
    if (!list.length) return;
    const pos = list.indexOf(lbIndex);
    showPhoto(list[(pos + dir + list.length) % list.length]);
  }
  photosGrid.addEventListener("click", (e) => {
    const tile = e.target.closest(".photo");
    if (!tile || tile.classList.contains("empty")) return;
    showPhoto(+tile.dataset.photo);
    lb.showModal();
  });
  $("lb-prev").onclick = () => stepPhoto(-1);
  $("lb-next").onclick = () => stepPhoto(1);
  $("lb-close").onclick = () => lb.close();
  lb.addEventListener("click", (e) => {
    if (e.target === lb) lb.close();
  });
  document.addEventListener("keydown", (e) => {
    if (!lb.open) return;
    if (e.key === "ArrowLeft") stepPhoto(-1);
    if (e.key === "ArrowRight") stepPhoto(1);
  });

  // ---------- Contact ----------
  const c = d.contact;
  $("contact-body").textContent = c.body;
  $("contact-mail").href = `mailto:${c.email}`;
  $("contact-mail").textContent = c.email;
  $("contact-socials").innerHTML = [c.whatsapp, c.linkedin, c.github, c.x]
    .filter(Boolean)
    .map((s) => `<a class="btn btn-ghost btn-sm" href="${esc(s.href)}" target="_blank" rel="noopener noreferrer">${esc(s.label)}</a>`)
    .join("");

  const form = $("contact-form");
  const note = $("form-note");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!c.formEndpoint) {
      note.textContent = `Form isn't connected yet — email me at ${c.email}.`;
      return;
    }
    const btn = form.querySelector("button[type=submit]");
    btn.disabled = true;
    note.textContent = "Sending…";
    try {
      const res = await fetch(c.formEndpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(res.status);
      form.reset();
      note.textContent = `Thanks — your message is in. ${firstName} will reply soon.`;
    } catch (err) {
      note.textContent = `Something went wrong. Please email ${c.email} directly.`;
    } finally {
      btn.disabled = false;
    }
  });

  // ---------- Footer ----------
  $("footer-copy").textContent = `© ${new Date().getFullYear()} ${d.identity.name} · iOS engineer & founder`;
  $("footer-socials").innerHTML = d.footer.socials
    .map((s) => `<a href="${esc(s.href)}" target="_blank" rel="noopener noreferrer">${esc(s.label)}</a>`)
    .join("");

  // ---------- Nav behaviour ----------
  const nav = $("nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const menuBtn = $("menu-btn");
  const links = $("nav-links");
  menuBtn.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open);
  });
  links.addEventListener("click", (e) => {
    if (e.target.closest("a")) links.classList.remove("open");
  });

  $("theme-btn").addEventListener("click", () => {
    const root = document.documentElement;
    const current =
      root.getAttribute("data-theme") ||
      (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("hi-theme", next);
    } catch (e) {}
  });

  // ---------- Scroll reveal ----------
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      }),
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
  );
  document.querySelectorAll(".reveal:not(.in)").forEach((el) => io.observe(el));
})();
