document.addEventListener('DOMContentLoaded', function() {
    // Only override the dropdown logic on screens >= 576px
    // so that on smaller screens, Bootstrap’s default .navbar-collapse can handle it.
    if (window.innerWidth >= 576) {
        // 1) Measure each .dropdown-menu and set --submenu-width
        document.querySelectorAll('.navbar-nav .dropdown-menu').forEach(function(menu) {
            menu.style.setProperty('--submenu-width', menu.scrollWidth * 3 + 'px');
        });

        // 2) For each toggle link, override the default behavior
        document.querySelectorAll('.navbar-nav .dropdown-toggle').forEach(function(toggle) {
            toggle.addEventListener('click', function(e) {
                e.preventDefault(); // Skip Bootstrap’s default dropdown
                const parentItem = this.closest('.nav-item.dropdown');

                // If it’s already active, close it
                if (parentItem.classList.contains('active')) {
                    parentItem.classList.remove('active');
                    this.setAttribute('aria-expanded', 'false');
                } else {
                    // Close all others first
                    document.querySelectorAll('.navbar-nav .nav-item.dropdown.active').forEach(function(item) {
                        item.classList.remove('active');
                        const btn = item.querySelector('.dropdown-toggle');
                        if (btn) {
                            btn.setAttribute('aria-expanded', 'false');
                        }
                    });
                    // Open this one
                    parentItem.classList.add('active');
                    this.setAttribute('aria-expanded', 'true');
                }
            });
        });

        // // 3) Highlight the link for the current page
        // const currentPage = window.location.pathname.split('/').pop();
        // document.querySelectorAll('.navbar-nav .dropdown-item').forEach(function(link) {
        //     const linkPage = link.getAttribute('href').split('/').pop();
        //     if (linkPage === currentPage) {
        //         link.classList.add('active');
        //     }
        // });

        // 4) If a link is already active, open its parent dropdown with no transition
        const activeLink = document.querySelector('.navbar-nav .dropdown-item.active');
        if (activeLink) {
            const activeMenuItem = activeLink.closest('.nav-item.dropdown');
            if (activeMenuItem) {
                activeMenuItem.classList.add('no-transition');
                activeMenuItem.classList.add('active');
                const toggle = activeMenuItem.querySelector('.dropdown-toggle');
                if (toggle) {
                    toggle.setAttribute('aria-expanded', 'true');
                }
                setTimeout(function() {
                    activeMenuItem.classList.remove('no-transition');
                }, 50);
            }
        }
    }
});