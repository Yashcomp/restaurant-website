// ==========================================
// 1. SMART FLOATING MENU BUTTON
// ==========================================
const floatBtn = document.getElementById('floatingMenuBtn');
const menuOverlay = document.getElementById('menuOverlay');
const menuSection = document.getElementById('menu');

window.addEventListener('scroll', () => {
    if(!menuSection) return;

    const menuRect = menuSection.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // Show button only when inside Menu Section
    if (menuRect.top < viewportHeight - 200 && menuRect.bottom > 200) {
        floatBtn.classList.add('visible');
    } else {
        floatBtn.classList.remove('visible');
    }
});

function toggleMenu() {
    const isOpen = menuOverlay.classList.contains('open');
    if (isOpen) {
        menuOverlay.classList.remove('open');
        document.body.style.overflow = '';
    } else {
        menuOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
}
menuOverlay.addEventListener('click', (e) => {
    if (e.target === menuOverlay) toggleMenu();
});


// ==========================================
// 2. SCROLL REVEAL ANIMATIONS
// ==========================================
// Uses Intersection Observer to fade in items when they enter screen
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 }); 

// Observe all menu rows
document.querySelectorAll('.menu-row').forEach(row => {
    revealObserver.observe(row);
});


// ==========================================
// 3. REAL-TIME MENU SEARCH
// ==========================================
const searchInput = document.getElementById('menuSearch');
const menuCategories = document.querySelectorAll('.menu-category');

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();

        menuCategories.forEach(category => {
            const items = category.querySelectorAll('.menu-row');
            let hasVisibleItems = false;

            items.forEach(item => {
                const text = item.innerText.toLowerCase();
                if (text.includes(searchTerm)) {
                    item.style.display = 'flex'; 
                    item.classList.add('visible'); 
                    hasVisibleItems = true;
                } else {
                    item.style.display = 'none'; 
                }
            });

            // If a category has no matching items, hide the whole category
            if (hasVisibleItems) {
                category.style.display = 'grid'; // Or 'block' based on mobile
                if(window.innerWidth <= 768) category.style.display = 'block';
            } else {
                category.style.display = 'none';
            }
        });
    });
}