// JavaScript для страницы новостей

document.addEventListener('DOMContentLoaded', function() {
    // Анимация появления новостных карточек при прокрутке
    const newsCards = document.querySelectorAll('.news-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    newsCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s, transform 0.6s';
        observer.observe(card);
    });

    // Пагинация (простая имитация)
    const paginationButtons = document.querySelectorAll('.pagination-btn');
    let currentPage = 1;
    const totalPages = 3;

    paginationButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.textContent.includes('Следующая') && currentPage < totalPages) {
                currentPage++;
                updatePagination();
            } else if (this.textContent.includes('Предыдущая') && currentPage > 1) {
                currentPage--;
                updatePagination();
            }
        });
    });

    function updatePagination() {
        const info = document.querySelector('.pagination-info');
        const prevBtn = document.querySelector('.pagination-btn:first-child');
        const nextBtn = document.querySelector('.pagination-btn:last-child');

        if (info) {
            info.textContent = `Страница ${currentPage} из ${totalPages}`;
        }

        if (prevBtn) {
            prevBtn.disabled = currentPage === 1;
        }

        if (nextBtn) {
            nextBtn.disabled = currentPage === totalPages;
        }

        // Анимация обновления карточек
        newsCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 50);
        });
    }

    // Изначальная настройка пагинации
    updatePagination();
});

