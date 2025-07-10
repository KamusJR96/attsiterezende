document.addEventListener('DOMContentLoaded', function() {

    // --- LÓGICA GERAL PARA MENUS E SIDEBARS ---

    // Função para controlar a abertura do menu de departamentos em mobile
    function setupDepartmentsMenu() {
        const departmentsButton = document.querySelector('.departments-button');
        const departmentsDropdown = document.getElementById('departmentsDropdown');
        const closeDepartmentsBtn = document.getElementById('closeDepartmentsBtn');

        if (departmentsButton && departmentsDropdown && closeDepartmentsBtn) {
            departmentsButton.addEventListener('click', function() {
                if (window.innerWidth <= 768) { // Apenas em mobile
                    departmentsDropdown.classList.toggle('active-mobile-dropdown');
                    document.body.style.overflow = departmentsDropdown.classList.contains('active-mobile-dropdown') ? 'hidden' : '';
                }
            });

            closeDepartmentsBtn.addEventListener('click', function() {
                departmentsDropdown.classList.remove('active-mobile-dropdown');
                document.body.style.overflow = '';
            });
        }
    }

    // Função para controlar a abertura dos submenus dentro dos departamentos em mobile
    function setupDepartmentSubmenus() {
        const submenuParents = document.querySelectorAll('.departments-dropdown-content .has-submenu');
        submenuParents.forEach(parent => {
            const link = parent.querySelector('a');
            const submenu = parent.querySelector('.submenu');
            const arrow = parent.querySelector('.submenu-arrow');

            if (link) {
                link.addEventListener('click', function(event) {
                    if (window.innerWidth <= 768 && submenu) { // Apenas em mobile e se houver submenu
                        event.preventDefault(); // Impede a navegação para que o menu possa abrir
                        submenu.classList.toggle('open');
                        if (arrow) {
                            arrow.classList.toggle('rotate');
                        }
                    }
                });
            }
        });
    }

    // Função para controlar a sidebar de filtros (página de produtos)
    function setupFiltersSidebar() {
        const openFiltersBtn = document.getElementById('openFiltersBtn');
        const closeFiltersBtn = document.getElementById('closeFiltersBtn');
        const sidebarFilters = document.getElementById('sidebarFilters');
        const filtersOverlay = document.getElementById('filtersOverlay');

        // Só executa se os elementos de filtro existirem na página
        if (openFiltersBtn && closeFiltersBtn && sidebarFilters && filtersOverlay) {
            const openSidebar = () => {
                sidebarFilters.classList.add('active');
                filtersOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            };

            const closeSidebar = () => {
                sidebarFilters.classList.remove('active');
                filtersOverlay.classList.remove('active');
                document.body.style.overflow = '';
            };

            openFiltersBtn.addEventListener('click', openSidebar);
            closeFiltersBtn.addEventListener('click', closeSidebar);
            filtersOverlay.addEventListener('click', closeSidebar);
        }
    }
    
    // Função para controlar os grupos de filtros expansíveis (acordeão)
    function setupFilterGroups() {
        const filterTitles = document.querySelectorAll('.filter-group h3');
        filterTitles.forEach(title => {
            title.addEventListener('click', function() {
                const content = this.nextElementSibling;
                if (content && content.classList.contains('filter-content')) {
                    content.classList.toggle('show');
                    this.classList.toggle('collapsed'); // Adiciona/remove classe para a seta
                }
            });
        });
    }

    // --- INICIALIZAÇÃO DE TODAS AS FUNÇÕES ---

    setupDepartmentsMenu();
    setupDepartmentSubmenus();
    setupFiltersSidebar();
    setupFilterGroups();

    // --- LÓGICA ADICIONAL (Ex: Range de Preço) ---
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');

    if (priceRange && priceValue) {
        priceRange.addEventListener('input', function() {
            priceValue.textContent = this.value;
        });
    }

});