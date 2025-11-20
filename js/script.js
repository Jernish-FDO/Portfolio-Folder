document.addEventListener('DOMContentLoaded', () => {
    // Add a class to the body when the DOM is fully loaded
    // This can be used to trigger CSS animations for the entire page or specific elements
    document.body.classList.add('page-loaded');

    // Example of adding more interactive logic (optional)
    // You could add event listeners to the portfolio buttons here
    const portfolioButtons = document.querySelectorAll('.portfolio-button');

    portfolioButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            // Optional: Add a confirmation or a custom animation before redirecting
            // For now, it will just follow the href, but you can add more here.
            console.log(`Navigating to: ${event.target.href}`);
        });
    });
});