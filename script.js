// Set theme color
document.documentElement.style.setProperty('--accent', '#ff3b30');

// Optional: Animate shapes on scroll
window.addEventListener('scroll', () => {
  const shapes = document.querySelectorAll('.shape');
  const scrolled = window.pageYOffset;
  shapes.forEach(shape => {
    shape.style.transform = `translateY(${scrolled * 0.1}px)`;
  });
});

// Cursor effect with proper inversion
const cursor = document.querySelector('.cursor-dot');
document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

// Typewriter effect
const phrases = [
  "DIGITAL CRAFTSMAN.",
  "MASTER OF NONE.",
  "LOOKING FOR WORK.",
  "FILLED WITH THAT SILLY ENERGY."
];

async function typeText(element, text) {
  // Type out
  for (let i = 0; i < text.length; i++) {
    element.textContent += text.charAt(i);
    await new Promise(resolve => setTimeout(resolve, 100)); // Adjust typing speed
  }
  
  // Wait at end
  await new Promise(resolve => setTimeout(resolve, 2000)); // Wait before next phrase
  // Backspace
  while (element.textContent.length > 0) {
    element.textContent = element.textContent.slice(0, -1);
    await new Promise(resolve => setTimeout(resolve, Math.random() * 50 + 50)); // Random delay for human feel
  }
  
  // Wait before next phrase
  await new Promise(resolve => setTimeout(resolve, 500));
}

async function typewriter() {
  const container = document.querySelector('.typewriter-container');
  const element = document.createElement('div');
  element.className = 'typewriter-text subtitle';
  container.innerHTML = '';
  container.appendChild(element);
  
  while (true) {
    for (const phrase of phrases) {
      await typeText(element, phrase);
    }
  }
}

// Start typewriter once DOM is loaded
document.addEventListener('DOMContentLoaded', typewriter);

// Modal functions
function openModal(element) {
  const modal = document.getElementById('posterModal');
  const modalImg = document.getElementById('modalImage');
  modalImg.src = element.querySelector('img').src;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('posterModal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// Prevent right click on images
document.addEventListener('contextmenu', (e) => {
  if (e.target.tagName === 'IMG') {
    e.preventDefault();
  }
});

// Close modal when clicking outside
document.getElementById('posterModal').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeModal();
});

// Close on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});
