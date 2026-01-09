// Анимация появления элементов при скролле
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Применяем анимацию ко всем карточкам
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
});

// Поиск и фильтрация для weeksalbum
if (document.querySelector('.weeks-album-page')) {
  const searchInput = document.getElementById('search-albums');
  const genreFilter = document.getElementById('genre-filter');
  const cards = document.querySelectorAll('.album-card');
  
  function filterAlbums() {
    const searchTerm = searchInput?.value.toLowerCase() || '';
    const selectedGenre = genreFilter?.value || 'all';
    
    cards.forEach(card => {
      const text = card.textContent.toLowerCase();
      const genre = card.dataset.genre || '';
      
      const matchesSearch = text.includes(searchTerm);
      const matchesGenre = selectedGenre === 'all' || genre === selectedGenre;
      
      if (matchesSearch && matchesGenre) {
        card.style.display = 'block';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 10);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
  }
  
  searchInput?.addEventListener('input', filterAlbums);
  genreFilter?.addEventListener('change', filterAlbums);
}

// Счетчик общего количества альбомов
function updateAlbumCount() {
  const countElement = document.getElementById('album-count');
  const visibleCards = document.querySelectorAll('.album-card[style*="display: block"], .album-card:not([style*="display: none"])');
  const total = document.querySelectorAll('.album-card').length;
  const visible = visibleCards.length;
  
  if (countElement) {
    countElement.textContent = `Showing ${visible} of ${total} albums`;
  }
}

// YouTube player - улучшенный embed
function enhanceYouTubeEmbeds() {
  const iframes = document.querySelectorAll('iframe[src*="youtube.com"]');
  
  iframes.forEach(iframe => {
    // Добавляем lazy loading
    iframe.loading = 'lazy';
    
    // Оборачиваем в контейнер для лучшего контроля
    if (!iframe.parentElement.classList.contains('video-wrapper')) {
      const wrapper = document.createElement('div');
      wrapper.className = 'video-wrapper';
      iframe.parentNode.insertBefore(wrapper, iframe);
      wrapper.appendChild(iframe);
    }
  });
}

document.addEventListener('DOMContentLoaded', enhanceYouTubeEmbeds);
