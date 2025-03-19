document.addEventListener('DOMContentLoaded', function() {
    // Hamburger-Menü (für Mobile)
    const hamburger = document.querySelector('.hamburger');
    const mainNav = document.querySelector('.main-nav');
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            mainNav.classList.toggle('open');
        });
    }

    // Für jedes Submenu: dynamische Breite (scrollWidth) als CSS-Variable setzen
    document.querySelectorAll('.submenu').forEach(submenu => {
        submenu.style.setProperty('--submenu-width', submenu.scrollWidth + 'px');
    });

    // Aktuelle Seite ermitteln und aktiven Link markieren
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('.submenu-link').forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });

    // Menü-Toggle: Beim Klick das entsprechende Menü aktivieren und andere deaktivieren
    const menuToggles = document.querySelectorAll('.menu-toggle');
    menuToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const newMenuItem = this.closest('.menu-item');
            if (newMenuItem.classList.contains('active')) return;

            // Alle Menü-Items gleichzeitig umschalten:
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

    // Beim Laden: Falls ein Unterseiten-Link aktiv markiert wurde, öffne das zugehörige Menü ohne Animation
    const activeLink = document.querySelector('.submenu-link.active');
    if (activeLink) {
        const menuItem = activeLink.closest('.menu-item');
        if (menuItem) {
            // Transition vorübergehend deaktivieren
            menuItem.classList.add('no-transition');

            // Menü aktiv schalten
            menuItem.classList.add('active');
            const toggle = menuItem.querySelector('.menu-toggle');
            if (toggle) {
                toggle.setAttribute('aria-expanded', 'true');
            }

            // Nach einem kurzen Delay (z.B. 50ms) die no-transition Klasse entfernen,
            // sodass spätere Klicks wieder animiert ablaufen
            setTimeout(() => {
                menuItem.classList.remove('no-transition');
            }, 50);
        }
    }
});