document.addEventListener('DOMContentLoaded', function() {
    // Hamburger-Menü für mobile Geräte
    const hamburger = document.querySelector('.hamburger');
    const mainNav = document.querySelector('.main-nav');
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            mainNav.classList.toggle('open');
        });
    }

    // Aktuellen Seitennamen ermitteln und aktiven Link markieren
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('.submenu-link').forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });

    // Menü-Toggle: Zustandswechsel parallel durchführen
    const menuToggles = document.querySelectorAll('.menu-toggle');
    menuToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const newMenuItem = this.closest('.menu-item');

            // Wenn das angeklickte Menü bereits aktiv ist, nichts tun
            if (newMenuItem.classList.contains('active')) {
                return;
            }

            // In einer einzigen Schleife:
            // - Das angeklickte Menü aktivieren
            // - Alle anderen Menüs deaktivieren
            document.querySelectorAll('.menu-item').forEach(item => {
                if (item === newMenuItem) {
                    item.classList.add('active');
                    const btn = item.querySelector('.menu-toggle');
                    if (btn) btn.setAttribute('aria-expanded', 'true');
                } else {
                    item.classList.remove('active');
                    const btn = item.querySelector('.menu-toggle');
                    if (btn) btn.setAttribute('aria-expanded', 'false');
                }
            });
        });
    });

    // Falls ein Unterseiten-Link aktiv markiert ist, das zugehörige Menü öffnen (ohne Animation beim Laden, siehe vorheriges Beispiel)
    const activeLink = document.querySelector('.submenu-link.active');
    if (activeLink) {
        const menuItem = activeLink.closest('.menu-item');
        if (menuItem) {
            // Vorübergehend Transition deaktivieren
            menuItem.classList.add('no-transition');
            menuItem.classList.add('active');
            const toggle = menuItem.querySelector('.menu-toggle');
            if (toggle) {
                toggle.setAttribute('aria-expanded', 'true');
            }
            setTimeout(() => {
                menuItem.classList.remove('no-transition');
            }, 50);
        }
    }
});