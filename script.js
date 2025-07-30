// Typing animation
const roles = ["Programmer", "Learner", "Designer", "Frontend Developer"];
const colors = ["#4fc3f7", "#00e676", "#ff4081", "#ffab00"];
let i = 0, j = 0, currentText = "", isDeleting = false;

function typeEffect() {
  const typedText = document.getElementById("typed-text");
  if (!typedText) return;
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
  if (!form) return;

  const name = form.querySelector('input[name="name"]').value.trim();
  const email = form.querySelector('input[name="email"]').value.trim();
  const message = form.querySelector('textarea[name="message"]').value.trim();

  if (!name || !email || !message) {
    alert("Please fill in all required fields (Name, Email, and Message).");
    return;
  }

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
      alert("Thank you! Your message has been successfully sent to Mohammad Sameer.");
      form.reset();
    } else {
      throw new Error("Failed to send message. Please try again later.");
    }
  } catch (error) {
    alert(error.message || "Network error. Please check your connection and try again.");
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
  updateTheme(savedTheme !== "simple"); // Initialize theme on load
};
document.head.appendChild(script);

function updateTheme(isAnimated) {
  if (isAnimated) {
    document.body.classList.remove("simple-theme");
    particlesJS("particles-js", particlesConfig);
  } else {
    document.body.classList.add("simple-theme");
    particlesJS("particles-js", {});
  }
}

// Theme Toggle
const themeToggle = document.getElementById("themeToggle");
let isSimpleTheme = localStorage.getItem("theme") === "simple";

if (themeToggle) {
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
    updateTheme(!isSimpleTheme);
  });
}

// Navigation Toggle for Small Screens
const navToggle = document.getElementById("navToggle");
const navbar = document.querySelector(".navbar");
if (navToggle && navbar) {
  navToggle.addEventListener("click", () => {
    navbar.classList.toggle("active");
  });

  // Close navbar when a nav link is clicked and persist toggle state
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (navbar.classList.contains("active")) {
        navbar.classList.remove("active"); // Close navbar on link click
      }
      // Update active link styling
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

  // Ensure theme is reapplied on page load or navigation
  window.addEventListener("load", () => {
    updateTheme(!isSimpleTheme);
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
  setInterval(nextSlide, 3000);
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
