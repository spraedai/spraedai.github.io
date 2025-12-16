// Centralized Menu Configuration
// Edit this file to update the menu across all pages

const menuConfig = {
    items: [
        { label: 'Features', href: 'features.html' },
        { label: 'Platform', href: 'platform.html' },
        { label: 'Pricing', href: 'pricing.html' },
        { label: 'Docs', href: 'docs.html' },
        { label: 'About', href: 'about.html' },
        { label: 'Contact', href: 'contact.html' }
    ],
    logo: {
        href: 'index.html',
        text: 'SPRAED'
    }
};

// Function to get current page name
function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index.html';
    // Handle root path
    if (page === '' || path.endsWith('/')) {
        return 'index.html';
    }
    return page;
}

// Function to check if a menu item is active
function isActivePage(menuHref, currentPage) {
    // Normalize both paths
    const normalizedHref = menuHref.replace(/^\.\//, '').toLowerCase();
    const normalizedCurrent = currentPage.toLowerCase();
    
    // Handle index.html specially
    if (normalizedCurrent === 'index.html' || normalizedCurrent === '' || normalizedCurrent === '/') {
        return normalizedHref === 'index.html' || normalizedHref === '/' || normalizedHref === '';
    }
    
    // Check exact match or if current page contains the href
    return normalizedHref === normalizedCurrent || 
           normalizedCurrent.includes(normalizedHref.replace('.html', ''));
}

// Function to render the navigation menu
function renderMenu() {
    const currentPage = getCurrentPage();
    const navElement = document.getElementById('main-nav');
    
    if (!navElement) {
        console.error('Navigation element with id="main-nav" not found');
        return;
    }
    
    // Clear existing content
    navElement.innerHTML = '';
    
    // Generate menu items
    menuConfig.items.forEach(item => {
        const link = document.createElement('a');
        link.href = item.href;
        link.textContent = item.label;
        link.className = 'text-black hover:bg-black hover:text-white px-2 py-1 transition-colors uppercase tracking-wide text-sm';
        
        // Add active state if current page
        if (isActivePage(item.href, currentPage)) {
            link.className += ' bg-black text-white';
        }
        
        navElement.appendChild(link);
    });
}

// Function to render the logo
function renderLogo() {
    const logoElement = document.getElementById('main-logo');
    
    if (!logoElement) {
        console.error('Logo element with id="main-logo" not found');
        return;
    }
    
    logoElement.href = menuConfig.logo.href;
    logoElement.innerHTML = `
        <div class="h-8 w-8 border-2 border-black bg-black flex items-center justify-center">
            <svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
            </svg>
        </div>
        <span class="font-mono font-bold text-xl text-black tracking-wider">${menuConfig.logo.text}</span>
    `;
}

// Initialize menu when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        renderLogo();
        renderMenu();
    });
} else {
    renderLogo();
    renderMenu();
}

