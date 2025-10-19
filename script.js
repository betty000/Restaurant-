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

// Rating functionality
let currentRating = 0;
const stars = document.querySelectorAll('#rating-stars i');

stars.forEach((star, index) => {
  star.addEventListener('click', () => {
    currentRating = index + 1;
    updateStars();
    updateRatingText();
  });

  star.addEventListener('mouseenter', () => {
    highlightStars(index + 1);
  });

  star.addEventListener('mouseleave', () => {
    updateStars();
  });
});

function updateStars() {
  stars.forEach((star, index) => {
    if (index < currentRating) {
      star.classList.add('active');
    } else {
      star.classList.remove('active');
    }
  });
}

function highlightStars(rating) {
  stars.forEach((star, index) => {
    if (index < rating) {
      star.classList.add('active');
    } else {
      star.classList.remove('active');
    }
  });
}

function updateRatingText() {
  const ratingText = document.getElementById('rating-text');
  if (currentRating > 0) {
    const messages = [
      'Poor',
      'Fair',
      'Good',
      'Very Good',
      'Excellent'
    ];
    ratingText.textContent = `You rated us ${currentRating} star${currentRating > 1 ? 's' : ''} - ${messages[currentRating - 1]}!`;
  } else {
    ratingText.textContent = 'Click on the stars to rate us!';
  }
}

// Comment functionality
document.getElementById('comment-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('comment-name').value.trim();
  const text = document.getElementById('comment-text').value.trim();

  if (name && text) {
    addComment(name, text);
    document.getElementById('comment-form').reset();
  }
});

function addComment(name, text) {
  const commentsList = document.getElementById('comments-list');
  const commentItem = document.createElement('div');
  commentItem.className = 'comment-item';

  const now = new Date();
  const dateString = now.toLocaleDateString() + ' ' + now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

  commentItem.innerHTML = `
    <div class="comment-author">${name}</div>
    <div class="comment-date">${dateString}</div>
    <div class="comment-text">${text}</div>
  `;

  // Insert new comment at the top
  commentsList.insertBefore(commentItem, commentsList.firstChild.nextSibling);

  // Add fade-in animation
  setTimeout(() => {
    commentItem.style.animation = 'fadeIn 0.5s ease-in';
  }, 10);
}

// Load sample comments on page load
document.addEventListener('DOMContentLoaded', () => {
  // Sample comments for demonstration
  const sampleComments = [
    {
      name: 'John Doe',
      text: 'Amazing Ethiopian cuisine! The Doro Wat was absolutely delicious. Highly recommend!',
      date: '2023-12-15 14:30'
    },
    {
      name: 'Sarah Smith',
      text: 'Great atmosphere and friendly staff. The Injera was perfectly prepared. Will definitely come back!',
      date: '2023-12-14 19:45'
    },
    {
      name: 'Mike Johnson',
      text: 'Authentic flavors and excellent service. The Kitfo was outstanding!',
      date: '2023-12-13 12:15'
    }
  ];

  sampleComments.forEach(comment => {
    const commentsList = document.getElementById('comments-list');
    const commentItem = document.createElement('div');
    commentItem.className = 'comment-item';

    commentItem.innerHTML = `
      <div class="comment-author">${comment.name}</div>
      <div class="comment-date">${comment.date}</div>
      <div class="comment-text">${comment.text}</div>
    `;

    commentsList.appendChild(commentItem);
  });
});
