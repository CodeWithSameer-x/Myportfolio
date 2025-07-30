// Typing animation
const roles = ["Programmer", "Learner", "Designer", "Frontend Developer"];
const colors = ["#4fc3f7", "#00e676", "#ff4081", "#ffab00"];
let i = 0, j = 0, currentText = "", isDeleting = false;

function typeEffect() {
  const typedText = document.getElementById("typed-text");
  if (!typedText) return; // Safety check
  const fullText = roles[i];
  const color = colors[i];

  if (isDeleting) {
    currentText = fullText.substring(0, j--);
  } else {
    currentText = fullText.substring(0, j++);
  }

  typedText.innerHTML = `<span style="color: ${color};">${currentText}</span>`;

  if (!isDeleting && j === fullText.length) {
    isDeleting = true;
    setTimeout(typeEffect, 1000);
  } else if (isDeleting && j === 0) {
    isDeleting = false;
    i = (i + 1) % roles.length;
    setTimeout(typeEffect, 300);
  } else {
    setTimeout(typeEffect, isDeleting ? 60 : 100);
  }
}
typeEffect();

// Open certificate in new tab
function openImage(imgSrc) {
  if (imgSrc) window.open(imgSrc, '_blank');
}

// Contact form submission
document.getElementById("contactForm").addEventListener("submit", async function(e) {
  e.preventDefault();
  const form = e.target;
  if (!form) return; // Safety check
  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      alert("Your message has been successfully sent to Mohammad Sameer!");
      form.reset(); // Reset all form fields
    } else {
      alert("There was an error sending your message. Please try again later.");
    }
  } catch (error) {
    alert("Network error. Please check your connection and try again.");
    console.error("Form submission error:", error);
  }
});

// Particle.js background loader
const particlesConfig = {
  particles: {
    number: { value: 80 },
    color: { value: "#4fc3f7" },
    shape: { type: "circle" },
    opacity: { value: 0.5 },
    size: { value: 3 },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#4fc3f7",
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 3,
      direction: "none",
      out_mode: "out"
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "grab" },
      onclick: { enable: true, mode: "push" }
    },
    modes: {
      grab: { distance: 200, line_linked: { opacity: 0.5 } },
      push: { particles_nb: 4 }
    }
  },
  retina_detect: true
};

const script = document.createElement("script");
script.src = "https://cdn.jsdelivr.net/npm/particles.js";
script.onload = () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme !== "simple") {
    particlesJS("particles-js", particlesConfig);
  } else {
    particlesJS("particles-js", {});
  }
};
document.head.appendChild(script);

// Theme Toggle
const themeToggle = document.getElementById("themeToggle");
let isSimpleTheme = localStorage.getItem("theme") === "simple";

if (themeToggle) {
  // Apply saved theme on load
  if (isSimpleTheme) {
    document.body.classList.add("simple-theme");
    themeToggle.innerHTML = `<i class="fas fa-sun"></i>`;
  } else {
    themeToggle.innerHTML = `<i class="fas fa-adjust"></i>`;
  }

  themeToggle.addEventListener("click", () => {
    isSimpleTheme = !isSimpleTheme;
    document.body.classList.toggle("simple-theme");
    localStorage.setItem("theme", isSimpleTheme ? "simple" : "animated");

    themeToggle.innerHTML = `<i class="fas ${isSimpleTheme ? 'fa-sun' : 'fa-adjust'}"></i>`;

    if (isSimpleTheme) {
      particlesJS("particles-js", {}); // Clear particles
    } else {
      particlesJS("particles-js", particlesConfig); // Restore particles
    }
  });
}

// Navigation Toggle for Small Screens
const navToggle = document.getElementById("navToggle");
const navbar = document.querySelector(".navbar");
if (navToggle && navbar) {
  navToggle.addEventListener("click", () => {
    navbar.classList.toggle("active");
  });
}

// Highlight active page and update section boundaries
const navLinks = document.querySelectorAll(".nav-link");
if (navLinks.length > 0) {
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");

      const sectionId = link.getAttribute("href").substring(1);
      const sections = document.querySelectorAll(".section");
      sections.forEach(section => {
        section.style.borderColor = "transparent";
        section.style.background = "transparent";
      });
      const activeSection = document.getElementById(sectionId);
      if (activeSection) {
        activeSection.style.borderColor = getComputedStyle(activeSection).borderColor;
        activeSection.style.background = getComputedStyle(activeSection).backgroundColor;
      }
    });
  });
}

// Image Slider for Project Cards
const sliders = document.querySelectorAll('.image-slider');
sliders.forEach(slider => {
  let slides = slider.querySelectorAll('.slide');
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
      if (i === index) slide.classList.add('active');
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  showSlide(currentSlide);
  setInterval(nextSlide, 3000); // Auto-rotate every 3 seconds
});

// Smoky Colorful Cursor Effect
const canvas = document.getElementById('cursorCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];
  let hue = 0;

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  document.addEventListener("mousemove", function(e) {
    if (!isSimpleTheme) {
      for (let i = 0; i < 5; i++) {
        particles.push(new Particle(e.x, e.y));
      }
    }
  });

  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 5 + 1;
      this.speedX = Math.random() * 3 - 1.5;
      this.speedY = Math.random() * 3 - 1.5;
      this.color = `hsl(${hue}, 100%, 70%)`;
      this.opacity = 1;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.size -= 0.1;
      this.opacity -= 0.015;
    }

    draw() {
      ctx.globalAlpha = this.opacity;
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 25;
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function animateParticles() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    hue += 2;

    particles.forEach((p, i) => {
      p.update();
      p.draw();
      if (p.size <= 0.3 || p.opacity <= 0) {
        particles.splice(i, 1);
      }
    });

    requestAnimationFrame(animateParticles);
  }
  animateParticles();
      }
