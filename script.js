let currentSlide = 0;
const slides = document.querySelectorAll('.slideshow-container section');
const container = document.querySelector('.slideshow-container');
const totalSlides = slides.length;

// Function to update slide position
function updateSlide() {
  container.style.transform = `translateX(-${currentSlide * 100}vw)`;
  // Update nav active state
  document.querySelectorAll('nav a').forEach((link, index) => {
    link.classList.toggle('active', index === currentSlide);
  });
  // Update section visibility
  slides.forEach((slide, index) => {
    slide.classList.toggle('visible', index === currentSlide);
  });
}

// Automatic slideshow
let slideInterval = setInterval(() => {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlide();
}, 5000); // Change slide every 5 seconds

// Reset interval on manual navigation
function resetSlideInterval() {
  clearInterval(slideInterval);
  slideInterval = setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlide();
  }, 5000);
}

// Next slide
document.getElementById('next-slide').addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlide();
  resetSlideInterval();
});

// Previous slide
document.getElementById('prev-slide').addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateSlide();
  resetSlideInterval();
});

// Nav links to jump to slides
document.querySelectorAll('nav a').forEach((link, index) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    currentSlide = index;
    updateSlide();
    resetSlideInterval();
  });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlide();
    resetSlideInterval();
  } else if (e.key === 'ArrowLeft') {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlide();
    resetSlideInterval();
  }
});

// Initial setup
updateSlide();

// Add fade-in to menu items on menu slide
const menuObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const items = entry.target.querySelectorAll('.menu-item');
      items.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add('fade-in');
        }, index * 200);
      });
    }
  });
}, { threshold: 0.5 });

menuObserver.observe(document.getElementById('menu'));

// Rotate animation on menu item hover
document.querySelectorAll('.menu-item').forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.style.animation = 'rotate 0.5s ease-in-out';
  });
  item.addEventListener('mouseleave', () => {
    item.style.animation = '';
  });
});
