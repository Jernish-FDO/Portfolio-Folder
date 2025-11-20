
// --- SCROLL PROGRESS BAR & BACK TO TOP ---
window.onscroll = function () {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    document.getElementById("progress-bar").style.width = scrolled + "%";

    const backBtn = document.getElementById("backToTop");
    if (winScroll > 300) backBtn.classList.add("show");
    else backBtn.classList.remove("show");
};
document.getElementById("backToTop").onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

// --- CURSOR & INTERACTIONS ---
const cursorDot = document.querySelector('[data-cursor-dot]');
const cursorOutline = document.querySelector('[data-cursor-outline]');

if (matchMedia('(pointer:fine)').matches) {
    window.addEventListener("mousemove", (e) => {
        const { clientX, clientY } = e;
        cursorDot.style.left = `${clientX}px`;
        cursorDot.style.top = `${clientY}px`;
        cursorOutline.animate({ left: `${clientX}px`, top: `${clientY}px` }, { duration: 500, fill: "forwards" });
    });

    document.querySelectorAll('a, button, .nav-hover, .project-card, .tech-card').forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
    });
}

// --- THEME TOGGLE ---
const themeBtn = document.getElementById("themeToggle");
const icon = themeBtn.querySelector("i");
const body = document.body;

if (localStorage.getItem("theme") == "light") {
    body.classList.add("light-mode");
    icon.classList.replace("fa-moon", "fa-sun");
}

themeBtn.addEventListener("click", () => {
    body.classList.toggle("light-mode");
    const isLight = body.classList.contains("light-mode");
    icon.classList.replace(isLight ? "fa-moon" : "fa-sun", isLight ? "fa-sun" : "fa-moon");
    localStorage.setItem("theme", isLight ? "light" : "dark");
});

// --- MOBILE MENU ---
const menuBtn = document.getElementById("menuToggle");
const navLinksWrapper = document.getElementById("navLinks");
menuBtn.addEventListener("click", () => navLinksWrapper.classList.toggle("active"));
document.querySelectorAll(".nav-links a").forEach(link =>
    link.addEventListener("click", () => navLinksWrapper.classList.remove("active"))
);

// --- SCROLL ANIMATION ---
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("active");
    });
}, { threshold: 0.1 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// --- NUMBER COUNTER ---
let counted = false;
const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !counted) {
        counted = true;
        document.querySelectorAll(".stat-num").forEach(num => {
            let start = 0, end = parseInt(num.getAttribute("data-target"));
            let increment = end / 100;
            const update = () => {
                start += increment;
                if (start < end) { num.innerText = Math.ceil(start); requestAnimationFrame(update); }
                else num.innerText = end + "+";
            };
            update();
        });
    }
}, { threshold: 0.5 });
statsObserver.observe(document.getElementById("statsSection"));

