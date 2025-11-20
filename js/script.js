document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const links = document.querySelectorAll('.portfolio-button');

    // 1. Trigger Entry Animation
    // Slight delay to ensure CSS loads cleanly
    setTimeout(() => {
        body.classList.add('loaded');
    }, 50);

    // 2. Handle Link Clicks for smooth Exit Transition
    links.forEach(link => {
        link.addEventListener('click', (event) => {
            const href = link.getAttribute('href');

            // Don't prevent default if it's opening in a new tab
            if (link.target !== '_blank') {
                event.preventDefault(); // Stop immediate navigation
                
                // Add exit class to body
                body.classList.remove('loaded');
                body.classList.add('fade-out');

                // Wait for animation to finish, then navigate
                setTimeout(() => {
                    window.location.href = href;
                }, 500); // Matches CSS transition time (0.5s)
            }
        });
    });
    
    console.log('%c DEV MODE ACTIVE ', 'background: #222; color: #bada55; font-weight: bold;');
});