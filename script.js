document.addEventListener('DOMContentLoaded', function() {

    const overlay = document.getElementById('filtersOverlay');
    const body = document.body;

    function openModal(modalElement) {
        if (!modalElement) return;
        closeAllModals(); 
        if (modalElement.id === 'sidebarFilters') {
            modalElement.classList.add('active');
        } else {
            modalElement.classList.add('active-mobile-dropdown');
        }
        if (overlay) overlay.classList.add('active');
        body.style.overflow = 'hidden';
    }

    function closeAllModals() {
        const activeModals = document.querySelectorAll('.active, .active-mobile-dropdown');
        activeModals.forEach(modal => {
            modal.classList.remove('active');
            modal.classList.remove('active-mobile-dropdown');
        });
        if (overlay) overlay.classList.remove('active');
        body.style.overflow = '';
    }

    const departmentsButton = document.querySelector('.departments-button');
    const departmentsDropdown = document.getElementById('departmentsDropdown');
    const closeDepartmentsBtn = document.getElementById('closeDepartmentsBtn');
    
    if (departmentsButton && departmentsDropdown) {
        departmentsButton.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                openModal(departmentsDropdown);
            }
        });
    }
    if(closeDepartmentsBtn) {
        closeDepartmentsBtn.addEventListener('click', closeAllModals);
    }

    const openFiltersBtn = document.getElementById('openFiltersBtn');
    const sidebarFilters = document.getElementById('sidebarFilters');
    const closeFiltersBtn = document.getElementById('closeFiltersBtn');

    if (openFiltersBtn && sidebarFilters) {
        openFiltersBtn.addEventListener('click', () => openModal(sidebarFilters));
    }
    if (closeFiltersBtn) {
        closeFiltersBtn.addEventListener('click', closeAllModals);
    }
    
    if (overlay) {
        overlay.addEventListener('click', closeAllModals);
    }

    function setupDepartmentSubmenus() {
        const submenuParents = document.querySelectorAll('.departments-dropdown-content .has-submenu');
        submenuParents.forEach(parent => {
            const link = parent.querySelector('a');
            const submenu = parent.querySelector('.submenu');
            const arrow = parent.querySelector('.submenu-arrow');

            if (link && submenu) { 
                link.addEventListener('click', function(event) {
                    const href = link.getAttribute('href');
                    if (window.innerWidth <= 768 && (!href || href === '#')) {
                         event.preventDefault(); 
                         submenu.classList.toggle('open');
                         if (arrow) arrow.classList.toggle('rotate');
                    }
                });
            }
        });
    }

    function setupFilterGroups() {
        const filterTitles = document.querySelectorAll('.filter-group h3');
        filterTitles.forEach(title => {
            title.addEventListener('click', function() {
                const content = this.nextElementSibling;
                if (content && content.classList.contains('filter-content')) {
                     if(window.innerWidth <= 768){
                        content.classList.toggle('show');
                     }
                    this.classList.toggle('collapsed');
                }
            });
            if(window.innerWidth > 768){
                const content = title.nextElementSibling;
                if(content) content.classList.add('show');
            }
        });
    }
    
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');

    if (priceRange && priceValue) {
        priceRange.addEventListener('input', function() {
            priceValue.textContent = this.value;
        });
    }

    function setupCarousel(wrapperId, trackId, prevBtnId, nextBtnId) {
        const wrapper = document.getElementById(wrapperId);
        if (!wrapper) return;

        const track = document.getElementById(trackId);
        const prevBtn = document.getElementById(prevBtnId);
        const nextBtn = document.getElementById(nextBtnId);
        
        if (!track || !prevBtn || !nextBtn) return;

        const cards = Array.from(track.children);
        if (cards.length === 0) return;

        let currentIndex = 0;
        
        function updateCarousel() {
            const cardStyle = window.getComputedStyle(cards[0]);
            const cardWidth = cards[0].offsetWidth;
            const gap = parseFloat(cardStyle.marginRight) || 20;
            const moveDistance = cardWidth + gap;
            
            const trackWidth = wrapper.getBoundingClientRect().width;
            let itemsToShow = Math.round(trackWidth / moveDistance);
            if (itemsToShow < 1) itemsToShow = 1;

            let maxIndex = cards.length - itemsToShow;
            if (maxIndex < 0) maxIndex = 0;

            if (currentIndex > maxIndex) currentIndex = 0;
            if (currentIndex < 0) currentIndex = maxIndex;
            
            track.style.transform = `translateX(-${currentIndex * moveDistance}px)`;
        }

        nextBtn.addEventListener('click', () => {
            currentIndex++;
            updateCarousel();
        });

        prevBtn.addEventListener('click', () => {
            currentIndex--;
            updateCarousel();
        });
        
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                currentIndex = 0; 
                updateCarousel();
            }, 200);
        });

        updateCarousel();
    }
    
    setupDepartmentSubmenus();
    setupFilterGroups();
    setupCarousel('promo-carousel-wrapper', 'promo-carousel-track', 'promo-prev-btn', 'promo-next-btn');
    setupCarousel('ambiente-carousel-wrapper', 'ambiente-carousel-track', 'ambiente-prev-btn', 'ambiente-next-btn');
    setupCarousel('mais-vendidos-carousel-wrapper', 'mais-vendidos-carousel-track', 'mais-vendidos-prev-btn', 'mais-vendidos-next-btn');
});