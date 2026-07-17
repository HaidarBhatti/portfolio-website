/*
  ================================================================
  VERSION SWITCHER — shared across every template.
  Renders a floating action button (bottom-right, fixed) that opens
  a panel listing all available site versions. Works the same way
  on every template file that includes this script, so add new
  entries to VERSIONS below and every page gets the new option.
  ================================================================
*/
(function () {
  var VERSIONS = [
    {
      id: "v1",
      href: "index.html",
      label: "Template One",
      tag: "Terminal / Dev",
      desc: "Dark terminal-inspired build — command-line hero, epoch timeline, monospace data readouts.",
      accent: "#e8a33d",
      accent2: "#5b8def",
    },
    {
      id: "v2",
      href: "v2.html",
      label: "Template Two",
      tag: "Futuristic / HUD",
      desc: "Animated holographic interface — orbital roadmap, scan-line motion, glass HUD panels.",
      accent: "#4deaff",
      accent2: "#9b6bff",
    },
  ];

  function currentFile() {
    var path = window.location.pathname.split("/").pop();
    if (!path) return "index.html";
    return path;
  }

  function injectStyles() {
    var css = `
      .vsw-fab {
        position: fixed;
        right: 22px;
        bottom: 22px;
        z-index: 9999;
        width: 56px;
        height: 56px;
        border-radius: 50%;
        border: 1px solid rgba(255,255,255,0.14);
        background: linear-gradient(145deg, #171a24, #0c0e14);
        color: #eef1f8;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 6px 24px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.02) inset;
        transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Inter, sans-serif;
      }
      .vsw-fab::before {
        content: "";
        position: absolute;
        inset: -6px;
        border-radius: 50%;
        border: 1px solid rgba(77, 234, 255, 0.35);
        opacity: 0;
        transform: scale(0.85);
        transition: opacity 0.3s ease, transform 0.3s ease;
      }
      .vsw-fab:hover {
        transform: translateY(-2px);
        border-color: rgba(77, 234, 255, 0.5);
        box-shadow: 0 10px 30px rgba(0,0,0,0.5), 0 0 22px rgba(77,234,255,0.25);
      }
      .vsw-fab:hover::before {
        opacity: 1;
        transform: scale(1);
        animation: vsw-pulse-ring 1.6s ease-out infinite;
      }
      .vsw-fab svg { display: block; }
      .vsw-fab .vsw-badge {
        position: absolute;
        top: -3px;
        right: -3px;
        min-width: 16px;
        height: 16px;
        padding: 0 4px;
        border-radius: 8px;
        background: #4deaff;
        color: #04121a;
        font-size: 10px;
        font-weight: 700;
        line-height: 16px;
        text-align: center;
        font-family: "JetBrains Mono", ui-monospace, monospace;
        box-shadow: 0 0 0 2px #0c0e14;
      }
      @keyframes vsw-pulse-ring {
        0% { opacity: 0.8; transform: scale(0.9); }
        100% { opacity: 0; transform: scale(1.35); }
      }

      .vsw-overlay {
        position: fixed;
        inset: 0;
        z-index: 9998;
        background: rgba(4, 6, 10, 0.72);
        backdrop-filter: blur(6px);
        -webkit-backdrop-filter: blur(6px);
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
        padding: 22px;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.25s ease;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Inter, sans-serif;
      }
      .vsw-overlay.is-open {
        opacity: 1;
        pointer-events: auto;
      }

      .vsw-panel {
        width: 100%;
        max-width: 380px;
        margin-bottom: 78px;
        background: linear-gradient(180deg, #12141c 0%, #0b0d13 100%);
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 18px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.55);
        padding: 18px;
        transform: translateY(16px) scale(0.97);
        opacity: 0;
        transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.3s ease;
      }
      .vsw-overlay.is-open .vsw-panel {
        transform: translateY(0) scale(1);
        opacity: 1;
      }

      .vsw-panel-head {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 12px;
        margin-bottom: 14px;
      }
      .vsw-panel-head h2 {
        font-size: 15px;
        font-weight: 700;
        color: #eef1f8;
        margin: 0 0 3px;
        letter-spacing: -0.01em;
      }
      .vsw-panel-head p {
        font-size: 12px;
        color: #8b93a7;
        margin: 0;
        line-height: 1.5;
      }
      .vsw-panel-close {
        flex-shrink: 0;
        width: 26px;
        height: 26px;
        border-radius: 7px;
        border: 1px solid rgba(255,255,255,0.1);
        background: rgba(255,255,255,0.03);
        color: #8b93a7;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: color 0.2s, border-color 0.2s;
      }
      .vsw-panel-close:hover {
        color: #eef1f8;
        border-color: rgba(255,255,255,0.25);
      }

      .vsw-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .vsw-card {
        position: relative;
        display: block;
        width: 100%;
        text-align: left;
        border-radius: 13px;
        border: 1px solid rgba(255,255,255,0.09);
        background: rgba(255,255,255,0.025);
        padding: 13px 14px;
        cursor: pointer;
        font: inherit;
        color: inherit;
        overflow: hidden;
        transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s ease;
      }
      .vsw-card:hover {
        transform: translateY(-1px);
        background: rgba(255,255,255,0.05);
      }
      .vsw-card::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 3px;
        background: var(--vsw-accent, #e8a33d);
        opacity: 0.85;
      }
      .vsw-card-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        margin-bottom: 5px;
      }
      .vsw-card-title {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 13.5px;
        font-weight: 700;
        color: #eef1f8;
      }
      .vsw-swatch {
        width: 9px;
        height: 9px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--vsw-accent, #e8a33d), var(--vsw-accent2, #5b8def));
        box-shadow: 0 0 8px var(--vsw-accent, #e8a33d);
      }
      .vsw-card-tag {
        font-family: "JetBrains Mono", ui-monospace, monospace;
        font-size: 10px;
        color: var(--vsw-accent, #e8a33d);
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }
      .vsw-card-desc {
        font-size: 11.5px;
        color: #8b93a7;
        line-height: 1.5;
        margin: 0 0 8px;
      }
      .vsw-card-foot {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-family: "JetBrains Mono", ui-monospace, monospace;
        font-size: 10.5px;
      }
      .vsw-current-pill {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        color: #5fbf8e;
      }
      .vsw-current-pill .dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #5fbf8e;
        box-shadow: 0 0 6px #5fbf8e;
      }
      .vsw-go {
        color: #8b93a7;
        display: inline-flex;
        align-items: center;
        gap: 4px;
        transition: color 0.2s, gap 0.2s;
      }
      .vsw-card:hover .vsw-go {
        color: #eef1f8;
      }
      .vsw-card.is-current { cursor: default; }
      .vsw-card.is-current:hover { transform: none; background: rgba(255,255,255,0.025); }

      @media (max-width: 480px) {
        .vsw-panel { max-width: none; }
        .vsw-fab { right: 16px; bottom: 16px; }
      }
    `;
    var style = document.createElement("style");
    style.setAttribute("data-vsw", "true");
    style.textContent = css;
    document.head.appendChild(style);
  }

  function svgLayers() {
    return (
      '<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
      'stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>' +
      '<polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>'
    );
  }
  function svgClose() {
    return (
      '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
      'stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line>' +
      '<line x1="6" y1="6" x2="18" y2="18"></line></svg>'
    );
  }
  function svgArrow() {
    return (
      '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" ' +
      'stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line>' +
      '<polyline points="12 5 19 12 12 19"></polyline></svg>'
    );
  }

  function build() {
    injectStyles();
    var current = currentFile();

    var fab = document.createElement("button");
    fab.type = "button";
    fab.className = "vsw-fab";
    fab.setAttribute("aria-label", "Show available site versions");
    fab.setAttribute("aria-haspopup", "dialog");
    fab.innerHTML =
      svgLayers() + '<span class="vsw-badge">' + VERSIONS.length + "</span>";

    var overlay = document.createElement("div");
    overlay.className = "vsw-overlay";

    var panel = document.createElement("div");
    panel.className = "vsw-panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "true");
    panel.setAttribute("aria-labelledby", "vsw-title");

    var head = document.createElement("div");
    head.className = "vsw-panel-head";
    head.innerHTML =
      '<div><h2 id="vsw-title">Site versions</h2>' +
      "<p>Pick a template to explore. You can always jump back here.</p></div>";

    var closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "vsw-panel-close";
    closeBtn.setAttribute("aria-label", "Close");
    closeBtn.innerHTML = svgClose();
    head.appendChild(closeBtn);

    var list = document.createElement("div");
    list.className = "vsw-list";

    VERSIONS.forEach(function (v) {
      var isCurrent = v.href === current;
      var card = document.createElement(isCurrent ? "div" : "a");
      if (!isCurrent) card.setAttribute("href", v.href);
      card.className = "vsw-card" + (isCurrent ? " is-current" : "");
      card.style.setProperty("--vsw-accent", v.accent);
      card.style.setProperty("--vsw-accent2", v.accent2);
      card.innerHTML =
        '<div class="vsw-card-top"><div class="vsw-card-title"><span class="vsw-swatch"></span>' +
        v.label +
        '</div><span class="vsw-card-tag">' +
        v.tag +
        "</span></div>" +
        '<p class="vsw-card-desc">' +
        v.desc +
        "</p>" +
        '<div class="vsw-card-foot">' +
        (isCurrent
          ? '<span class="vsw-current-pill"><span class="dot"></span>Currently viewing</span>'
          : '<span></span><span class="vsw-go">Explore' +
            svgArrow() +
            "</span>") +
        "</div>";
      list.appendChild(card);
    });

    panel.appendChild(head);
    panel.appendChild(list);
    overlay.appendChild(panel);

    document.body.appendChild(fab);
    document.body.appendChild(overlay);

    var lastFocused = null;

    function open() {
      lastFocused = document.activeElement;
      overlay.classList.add("is-open");
      fab.setAttribute("aria-expanded", "true");
      closeBtn.focus();
    }
    function close() {
      overlay.classList.remove("is-open");
      fab.setAttribute("aria-expanded", "false");
      if (lastFocused && lastFocused.focus) lastFocused.focus();
    }

    fab.addEventListener("click", function () {
      if (overlay.classList.contains("is-open")) close();
      else open();
    });
    closeBtn.addEventListener("click", close);
    overlay.addEventListener("click", function (ev) {
      if (ev.target === overlay) close();
    });
    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape" && overlay.classList.contains("is-open")) close();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", build);
  } else {
    build();
  }
})();
