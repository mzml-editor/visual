// ===== Data (same as your React constants) =====
const PROFILE = {
  name: "Muzammil",
  tagline: "Video Editor",
  hook: "I edit videos people actually finish.",
  showreel: {
    type: "youtube",
    url: "https://youtu.be/3jPVBlje1BE?si=JwIxAKsitRmzduOU",
  }
};

const WORK = [
  {
    title: "Brock Lesnar's Son BREAKS Everyone in MMA!",
    video: { type: "youtube", url: "https://www.youtube.com/watch?v=k2KHOi7BX-U" },
    impact: "200k+ views week 1",
  },
  {
    title: "10 Most Reliable Diesel Engines of All Time",
    video: { type: "youtube", url: "https://www.youtube.com/watch?v=xBllZ0KDuwc" },
    impact: "150k+ views in 5 days",
  },
  {
    title: "How To Be Rich Even If You're LAZY",
    video: { type: "youtube", url: "https://www.youtube.com/watch?v=fEdUpmaAwXw" },
    impact: "Client Was Extremely Impressed",
  },
  {
    title: "Iman Gadzhi edit format",
    video: { type: "gdrive", url: "https://drive.google.com/file/d/1m41QCjModFpOjEpilLIkSrpa_BtA1MC-/preview" },
  },
  {
    title: "Premium Social Media Content",
    video: { type: "gdrive", url: "https://drive.google.com/file/d/1gVpeS8_NqhmERk9v0TgfZfMEJt2yeoBo/preview" },
  },
  {
    title: "Dynamic Brand Video",
    video: { type: "gdrive", url: "https://drive.google.com/file/d/1bvSz_pd5JOPdXaQnOWuzxutbCinLrXTf/preview" },
  },
  {
    title: "Engaging Story Edit",
    video: { type: "gdrive", url: "https://drive.google.com/file/d/1zs0_QmhewL2uJEGsT0Ti9bSmKrRw37Wy/preview" },
  },
  {
    title: "Podcast Edit",
    video: { type: "gdrive", url: "https://drive.google.com/file/d/1zRF5ko5tTiNgXObDJV4u3cjMzu2y9woe/preview" },
  },
  {
    title: "How YOU Can Make Six Figures While Still In High School",
    video: { type: "youtube", url: "https://www.youtube.com/watch?v=gWS2jhnGmhM" },
  },
  {
    title: "These 15 Amazon Desk Gadgets Will Blow Your Mind!",
    video: { type: "youtube", url: "https://www.youtube.com/watch?v=0h1lWL0Qpm4" },
  },
  {
    title: "Best Tech UNDER $100",
    video: { type: "youtube", url: "https://www.youtube.com/watch?v=W_9s9tEc1rY" },
  },
  {
    title: "The 9 Best Keychain Multi-Tools For EDC",
    video: { type: "youtube", url: "https://www.youtube.com/watch?v=tv-4g9zny0o" },
  },
  {
    title: "Billionaires That Went To Jail...",
    video: { type: "youtube", url: "https://www.youtube.com/watch?v=FWK6oN6OnTw" },
  },
  {
    title: "RECENT SNEAKER PICKUPS 2024 | I SPENT OVER 15K 🔥",
    video: { type: "youtube", url: "https://www.youtube.com/watch?v=rCl4VdEIr-g" },
  },
];

// ===== Helpers (same logic as React) =====
function getYouTubeId(url) {
  const match = String(url).match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/]+)/
  );
  return match ? match[1] : null;
}

function getVideoThumbnail(videoConfig) {
  if (!videoConfig) return "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800";

  switch (videoConfig.type) {
    case "youtube": {
      const ytId = getYouTubeId(videoConfig.url);
      // maxresdefault is not always available; hqdefault always works
      return ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : null;
    }
    case "gdrive": {
      const match = videoConfig.url.match(/\/d\/([^/]+)/);
      return match ? `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000` : null;
    }
    case "local":
      return videoConfig.thumbnail || videoConfig.localPath;
    default:
      return "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800";
  }
}

function getVideoEmbedUrl(videoConfig) {
  if (!videoConfig) return null;

  switch (videoConfig.type) {
    case "youtube": {
      const ytId = getYouTubeId(videoConfig.url);
      if (!ytId) return null;

      // FIX for YouTube "Error 153" on some hosts/browsers:
      // use youtube.com embed + include origin param
      const origin = encodeURIComponent(window.location.origin || "");
      return `https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0&playsinline=1&modestbranding=1&origin=${origin}`;
    }
    case "gdrive":
      return videoConfig.url;
    case "local":
      return videoConfig.localPath;
    default:
      return null;
  }
}

// ===== Render Work grid =====
function renderWork() {
  const grid = document.getElementById("workGrid");
  grid.innerHTML = "";

  WORK.forEach((project, idx) => {
    const thumb =
      getVideoThumbnail(project.video) ||
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800";

    const el = document.createElement("div");
    el.className = "project";
    el.dataset.index = String(idx);

    el.innerHTML = `
      <div class="project-inner">
        <div class="thumb">
          <img src="${thumb}" alt="${escapeHtml(project.title)}" loading="lazy"/>
          ${project.impact ? `<div class="badge">${escapeHtml(project.impact)}</div>` : ""}
          <div class="play-hover" aria-hidden="true">
            <div class="circle">
              <i data-lucide="play" class="icon icon-md fill"></i>
            </div>
          </div>
        </div>
        <div class="project-body">
          <h3 class="project-title">${escapeHtml(project.title)}</h3>
          ${project.role ? `<div class="project-role">${escapeHtml(project.role)}</div>` : ""}
        </div>
      </div>
    `;

    el.addEventListener("click", () => openModal(project.video));
    grid.appendChild(el);
  });

  // Re-render lucide icons inside newly inserted HTML
  if (window.lucide) window.lucide.createIcons();
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// ===== Modal logic (same behavior) =====
const modal = document.getElementById("modal");
const modalPlayer = document.getElementById("modalPlayer");
const modalClose = document.getElementById("modalClose");

function renderVideoPlayer(videoConfig) {
  const embedUrl = getVideoEmbedUrl(videoConfig);
  if (!embedUrl) return "";

  if (videoConfig.type === "local") {
    return `
      <video controls autoplay>
        <source src="${embedUrl}">
        Your browser does not support the video tag.
      </video>
    `;
  }

  return `
    <iframe
      src="${embedUrl}"
      title="Video player"
      allow="autoplay; encrypted-media; picture-in-picture"
      allowfullscreen
      referrerpolicy="strict-origin-when-cross-origin"
    ></iframe>
  `;
}

function openModal(videoConfig) {
  modalPlayer.innerHTML = renderVideoPlayer(videoConfig);
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  modalPlayer.innerHTML = "";
  document.body.style.overflow = "";
}

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  // click outside closes (like your onClick backdrop)
  const close = e.target && e.target.getAttribute && e.target.getAttribute("data-close");
  if (close) closeModal();
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
});

// ===== Parallax blobs =====
let mouseX = 0;
let mouseY = 0;

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  updateBlobs();
});

function updateBlobs() {
  const w = window.innerWidth || 1;
  const h = window.innerHeight || 1;
  const parallaxX = (mouseX / w - 0.5) * 20;
  const parallaxY = (mouseY / h - 0.5) * 20;

  const b1 = document.querySelector(".blob-1");
  const b2 = document.querySelector(".blob-2");
  const b3 = document.querySelector(".blob-3");

  if (b1) {
    b1.style.left = `calc(20% + ${parallaxX}px)`;
    b1.style.top = `calc(10% + ${parallaxY}px)`;
  }
  if (b2) {
    b2.style.right = `calc(10% - ${parallaxX}px)`;
    b2.style.top = `calc(30% - ${parallaxY}px)`;
  }
  if (b3) {
    b3.style.left = `calc(60% + ${parallaxX * 0.5}px)`;
    b3.style.bottom = `calc(10% + ${parallaxY * 0.5}px)`;
  }
}

// ===== Initialize page with PROFILE =====
function initProfile() {
  const brandName = document.getElementById("brandName");
  if (brandName) brandName.textContent = PROFILE.name;

  const heroName = document.getElementById("heroName");
  if (heroName) heroName.textContent = PROFILE.name;

  const heroHook = document.getElementById("heroHook");
  if (heroHook) heroHook.textContent = PROFILE.hook;

  const footerName = document.getElementById("footerName");
  if (footerName) footerName.textContent = PROFILE.name;

  // Contact section was removed, so this might not exist anymore
  const emailLink = document.getElementById("emailLink");
  if (emailLink) {
    emailLink.textContent = PROFILE.email;
    emailLink.href = `mailto:${PROFILE.email}`;
  }

  // Showreel
  const srThumb = document.getElementById("showreelThumb");
  if (srThumb) srThumb.src = getVideoThumbnail(PROFILE.showreel) || "";

  const showreelBtn = document.getElementById("showreelBtn");
  if (showreelBtn) {
    showreelBtn.addEventListener("click", () => openModal(PROFILE.showreel));
  }

  // Year
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
}

initProfile();
renderWork();
updateBlobs();

if (window.lucide) window.lucide.createIcons();

// Lucide icons
if (window.lucide) window.lucide.createIcons();
