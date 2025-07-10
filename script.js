document.addEventListener('DOMContentLoaded', function() {

    const overlay = document.getElementById('filtersOverlay');
    const body = document.body;

    // --- FUNÇÕES GENÉRICAS PARA CONTROLAR MODAIS E MENUS LATERAIS ---
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


    // --- EVENT LISTENERS (QUEM CHAMA AS FUNÇÕES) ---

    // 1. Menu de Departamentos (Mobile)
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

    // 2. Sidebar de Filtros (Mobile)
    const openFiltersBtn = document.getElementById('openFiltersBtn');
    const sidebarFilters = document.getElementById('sidebarFilters');
    const closeFiltersBtn = document.getElementById('closeFiltersBtn');

    if (openFiltersBtn && sidebarFilters) {
        openFiltersBtn.addEventListener('click', () => openModal(sidebarFilters));
    }
    if (closeFiltersBtn) {
        closeFiltersBtn.addEventListener('click', closeAllModals);
    }
    
    // 3. Overlay
    if (overlay) {
        overlay.addEventListener('click', closeAllModals);
    }

    // --- LÓGICAS ESPECÍFICAS DE COMPONENTES ---

    function setupDepartmentSubmenus() {
        const submenuParents = document.querySelectorAll('.departments-dropdown-content .has-submenu');
        submenuParents.forEach(parent => {
            const link = parent.querySelector('a');
            const submenu = parent.querySelector('.submenu');
            const arrow = parent.querySelector('.submenu-arrow');

            if (link && submenu) { 
                link.addEventListener('click', function(event) {
                    if (window.innerWidth <= 768) {
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

    // --- LÓGICA ATUALIZADA PARA O CARROSSEL DE AMBIENTES (INFINITO) ---
    function setupAmbienteCarousel() {
        const track = document.getElementById('carouselTrack');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        if (!track || !prevBtn || !nextBtn) {
            return;
        }

        const cards = Array.from(track.children);
        let currentIndex = 0;
        
        function updateCarousel() {
            const cardWidth = cards[0].getBoundingClientRect().width;
            const gap = 20;
            const itemsToShow = window.innerWidth > 768 ? 2 : 1;
            const totalItems = cards.length;
            
            const moveDistance = cardWidth + gap;
            track.style.transform = `translateX(-${currentIndex * moveDistance}px)`;
        }

        nextBtn.addEventListener('click', () => {
            const itemsToShow = window.innerWidth > 768 ? 2 : 1;
            const maxIndex = cards.length - itemsToShow;

            currentIndex++;
            if (currentIndex > maxIndex) {
                currentIndex = 0; // Volta para o início
            }
            updateCarousel();
        });

        prevBtn.addEventListener('click', () => {
            const itemsToShow = window.innerWidth > 768 ? 2 : 1;
            const maxIndex = cards.length - itemsToShow;

            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = maxIndex; // Vai para o fim
            }
            updateCarousel();
        });
        
        // Recalcula a posição em caso de redimensionamento da janela
        window.addEventListener('resize', () => {
            // Reseta para o começo para evitar quebras de layout
            currentIndex = 0; 
            updateCarousel();
        });

        // Chama a função uma vez para o posicionamento inicial
        updateCarousel();
    }


    // --- INICIALIZAÇÃO DE TODAS AS FUNÇÕES ---
    setupDepartmentSubmenus();
    setupFilterGroups();
    setupAmbienteCarousel();

});