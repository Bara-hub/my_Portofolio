// ==========================================================================
// Base Interactions & UI
// ==========================================================================

// Set current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile Menu Toggle
const mobileBtn = document.querySelector(".mobile-menu-btn");
const navLinks = document.querySelector(".nav-links");
const navLinksItems = document.querySelectorAll(".nav-link");

mobileBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");

  // Animate burger menu
  const spans = mobileBtn.querySelectorAll("span");
  if (navLinks.classList.contains("active")) {
    spans[0].style.transform = "rotate(-45deg) translate(-5px, 6px)";
    spans[1].style.opacity = "0";
    spans[2].style.transform = "rotate(45deg) translate(-5px, -6px)";
  } else {
    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";
  }
});

// Close mobile menu when clicking a link
navLinksItems.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    const spans = mobileBtn.querySelectorAll("span");
    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";
  });
});

// Sticky Navigation
const navbar = document.getElementById("navbar");
const sections = document.querySelectorAll(".section");
const backToTop = document.getElementById("backToTop");
let scrollTicking = false;

window.addEventListener("scroll", () => {
  if (!scrollTicking) {
    window.requestAnimationFrame(() => {
      // Navbar sticky
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }

      // Back to top button visibility
      if (backToTop) {
        if (window.scrollY > 300) {
          backToTop.classList.add("visible");
        } else {
          backToTop.classList.remove("visible");
        }
      }

      scrollTicking = false;
    });
    scrollTicking = true;
  }
});

// Active Section Highlighting using IntersectionObserver (Performance Boost)
const sectionObserverOptions = {
  root: null,
  rootMargin: "-20% 0px -60% 0px", // Détecte quand la section est bien visible à l'écran
  threshold: 0,
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const currentId = entry.target.getAttribute("id");
      navLinksItems.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}, sectionObserverOptions);

sections.forEach((section) => sectionObserver.observe(section));

// Form Submission via EmailJS
const EMAILJS_SERVICE_ID = "service_52bkj2a";
const EMAILJS_TEMPLATE_ID = "template_4b7teal";
const EMAILJS_PUBLIC_KEY = "gWqFdvwDLJF560UD-";

const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = document.getElementById("submitBtn");
    const statusEl = document.getElementById("formStatus");
    const originalText = btn.innerHTML;

    // Disable button during send
    btn.innerHTML = "Envoi des paquets... 📡";
    btn.style.opacity = "0.7";
    btn.disabled = true;
    statusEl.textContent = "";

    // Collect form data
    const templateParams = {
      firstname: document.getElementById("firstname").value,
      lastname: document.getElementById("lastname").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value,
    };

    emailjs
      .send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY,
      )
      .then(() => {
        btn.innerHTML = "✓ Transport réussi (ACK)";
        btn.style.backgroundColor = "rgba(0, 255, 136, 0.2)";
        btn.style.color = "#00ff88";
        btn.style.borderColor = "#00ff88";
        statusEl.textContent = "✅ Message envoyé avec succès !";
        statusEl.style.color = "#00ff88";
        contactForm.reset();

        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.removeAttribute("style");
          btn.disabled = false;
          statusEl.textContent = "";
        }, 4000);
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        btn.innerHTML = "✗ Échec de transmission";
        btn.style.backgroundColor = "rgba(255, 0, 234, 0.2)";
        btn.style.color = "#ff00ea";
        btn.style.borderColor = "#ff00ea";
        statusEl.textContent = "❌ Erreur d'envoi. Veuillez réessayer.";
        statusEl.style.color = "#ff00ea";

        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.removeAttribute("style");
          btn.disabled = false;
          statusEl.textContent = "";
        }, 4000);
      });
  });
}

// Intersection Observer for scroll animations (Fluid UI)
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -20px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Apply reveal class to major elements
  const animatedElements = document.querySelectorAll(
    ".skill-card, .project-item, .hero-content, .contact-wrapper > div, .section-title, #certifications .glass-panel, .project-card-padded",
  );

  animatedElements.forEach((el, index) => {
    el.classList.add("reveal");
    el.style.transitionDelay = `${(index % 4) * 0.15}s`;
    observer.observe(el);
  });
}

// Scroll to Top handled via HTML native smooth behavior in index.html

// ==========================================================================
// Background Tech Animation (Data Stream / Digital Rain)
// ==========================================================================
class TechBackground {
  constructor() {
    this.canvas = document.getElementById("tech-bg");
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");

    // Jeu de caractères orienté IT/Réseau
    this.characters =
      "0 1 0 1 0X FF A4 C9 SYS NET ACK SYN TCP UDP IP DNS SSH".split(" ");
    this.fontSize = 14;
    this.columns = 0;
    this.drops = [];
    this.colors = ["#00f3ff", "#00ff88", "#ff00ea", "#9d00ff"]; // Thème néon

    this.init();
    this.animate();

    window.addEventListener("resize", () => this.resize());
  }

  init() {
    this.resize();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.columns = Math.floor(this.canvas.width / this.fontSize);

    // Initialiser la position Y des gouttes (aléatoire au-dessus de l'écran)
    this.drops = [];
    for (let x = 0; x < this.columns; x++) {
      this.drops[x] = Math.random() * -100;
    }
  }

  draw() {
    // Effet de traînée en peignant un fond noir semi-transparent
    this.ctx.fillStyle = "rgba(7, 9, 15, 0.15)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.font = this.fontSize + 'px "Fira Code", monospace';

    for (let i = 0; i < this.drops.length; i++) {
      // Sélectionner un caractère et une couleur aléatoire
      const text =
        this.characters[Math.floor(Math.random() * this.characters.length)];
      this.ctx.fillStyle =
        this.colors[Math.floor(Math.random() * this.colors.length)];

      // Ajouter un effet de brillance aléatoire
      if (Math.random() > 0.9) {
        this.ctx.fillStyle = "#ffffff"; // Éclat blanc occasionnel
      }

      // Dessiner le texte
      this.ctx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);

      // Réinitialiser la goutte en haut aléatoirement
      if (
        this.drops[i] * this.fontSize > this.canvas.height &&
        Math.random() > 0.975
      ) {
        this.drops[i] = 0;
      }

      // Faire descendre la goutte
      this.drops[i]++;
    }
  }

  animate() {
    this.draw();
    // Ralentir l'animation pour un meilleur effet visuel (Matrix style)
    setTimeout(() => {
      requestAnimationFrame(() => this.animate());
    }, 50);
  }
}

// ==========================================================================
// Projects Modal Data
// ==========================================================================
const projectDetails = {
  vmware: {
    title: "Datacenter Virtuel",
    tech: "VMWare ESXi",
    techClass: "project-border-blue project-bg-blue",
    titleClass: "blue",
    desc: "Mise en place d'une infrastructure complète sur un serveur Dell R610 couplé à un switch C2900.",
    content: `
            <p>Ce projet s'inscrit dans la virtualisation d'infrastructures informatiques d'entreprise. L'objectif était de déployer un Datacenter virtuel robuste et performant.</p>
            <ul>
                <li><strong>Matériel :</strong> Serveur Dell R610, Switch Cisco C2900.</li>
                <li><strong>Stockage :</strong> Configuration d'un RAID-5 avec 6 disques pour allier performance et sécurité des données.</li>
                <li><strong>Hyperviseur :</strong> Installation et configuration de VMware ESXi 6.5.</li>
                <li><strong>Services :</strong> Déploiement d'une VM Windows Server avec configuration du rôle ADDS (Active Directory Domain Services) et intégration des machines clientes au domaine.</li>
            </ul>
        `,
  },
  proxmox: {
    title: "Datacenter & Backup",
    tech: "Proxmox VE",
    techClass: "project-border-pink project-bg-pink",
    titleClass: "pink",
    desc: "Solutions de haute disponibilité et mise en place d'un plan de sauvegarde avancé.",
    content: `
            <p>L'utilisation de Proxmox permet une flexibilité accrue avec des conteneurs LXC et des machines virtuelles KVM. L'objectif ici était la redondance et la sauvegarde.</p>
            <ul>
                <li><strong>Haute Disponibilité (HA) :</strong> Mise en place d'un cluster Proxmox VE.</li>
                <li><strong>Sauvegarde :</strong> Déploiement et configuration de Proxmox Backup Server (PBS) pour des sauvegardes incrémentales, chiffrées et dédupliquées.</li>
                <li><strong>Migration :</strong> Transfert réussi de machines virtuelles depuis un environnement VMware ESXi vers Proxmox sans perte de données.</li>
            </ul>
        `,
  },
  truenas: {
    title: "Dispositif NAS",
    tech: "TrueNAS",
    techClass: "project-border-purple project-bg-purple",
    titleClass: "purple",
    desc: "Centralisation sécurisée du stockage d'entreprise.",
    content: `
            <p>Conception d'une solution de stockage centralisée, performante et sécurisée pour répondre aux besoins d'une entreprise en matière de partage de fichiers.</p>
            <ul>
                <li><strong>Système :</strong> Installation et optimisation de TrueNAS Core v13.</li>
                <li><strong>Gestion des données :</strong> Création de Pools ZFS, de Datasets, et configuration des partages SMB/NFS avec gestion fine des permissions (ACLs).</li>
                <li><strong>Sécurité :</strong> Configuration d'un accès distant sécurisé via OpenVPN.</li>
                <li><strong>Résilience :</strong> Planification de snapshots réguliers pour la protection contre les ransomwares et la restauration rapide.</li>
            </ul>
        `,
  },
  flutter: {
    title: "Application Mobile",
    tech: "Flutter Dev",
    techClass: "project-border-green project-bg-green",
    titleClass: "green",
    desc: "Développement d'une application frontend interactive multiplateforme.",
    content: `
            <p>En complément de mon profil système et réseau, ce projet démontre ma capacité à comprendre et développer la couche applicative (Frontend).</p>
            <ul>
                <li><strong>Onboarding :</strong> Création d'une expérience utilisateur (UX) fluide lors du premier lancement de l'application.</li>
                <li><strong>Sécurité :</strong> Mise en place d'un système d'authentification robuste avec chiffrement des données de connexion.</li>
                <li><strong>Interface :</strong> Navigation intuitive, interaction dynamique des composants, et adaptation responsive de l'UI (User Interface).</li>
            </ul>
        `,
  },
};

// ==========================================================================
// Initialization (all DOMContentLoaded logic consolidated)
// ==========================================================================
initScrollAnimations();
new TechBackground();

// Projects Modal Logic
(function initProjectModal() {
  const modal = document.getElementById("projectModal");
  const modalBody = document.getElementById("modalBody");
  const closeBtn = document.querySelector(".close-modal");
  const openBtns = document.querySelectorAll(".open-project-modal");

  if (!modal || openBtns.length === 0) return;

  openBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute("data-project");
      const data = projectDetails[projectId];

      if (data) {
        modalBody.innerHTML = `
                    <span class="project-date project-date-block ${data.techClass}">${data.tech}</span>
                    <h3 class="project-title ${data.titleClass}">${data.title}</h3>
                    <p style="font-weight: 600; font-size: 1.1rem; color: var(--neon-blue); margin-bottom: 1.5rem;">${data.desc}</p>
                    ${data.content}
                `;
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
      }
    });
  });

  const closeModal = () => {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  };

  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  // Close on outside click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
})();
