
// 1. CIRCUIT PARTICLE SYSTEM
const canvas = document.getElementById("canvas-container");
const ctx = canvas.getContext("2d");
let particlesArray;
let mouse = { x: null, y: null, radius: 150 };

function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
window.addEventListener('resize', resize); resize();

window.addEventListener('mousemove', (e) => { mouse.x = e.x; mouse.y = e.y; });

class Particle {
    constructor(x, y, dx, dy, size) {
        this.x = x; this.y = y; this.dx = dx; this.dy = dy; this.size = size;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = '#38bdf8'; // Code Blue
        ctx.fill();
    }
    update() {
        if (this.x > canvas.width || this.x < 0) this.dx = -this.dx;
        if (this.y > canvas.height || this.y < 0) this.dy = -this.dy;

        // Interactivity
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
            if (mouse.x < this.x && this.x < canvas.width - 10) this.x += 2;
            if (mouse.x > this.x && this.x > 10) this.x -= 2;
            if (mouse.y < this.y && this.y < canvas.height - 10) this.y += 2;
            if (mouse.y > this.y && this.y > 10) this.y -= 2;
        }
        this.x += this.dx; this.y += this.dy;
        this.draw();
    }
}

function init() {
    particlesArray = [];
    let count = (canvas.width * canvas.height) / 9000;
    for (let i = 0; i < count; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * (canvas.width - size * 2)) + size * 2;
        let y = (Math.random() * (canvas.height - size * 2)) + size * 2;
        let dx = (Math.random() * 1) - 0.5;
        let dy = (Math.random() * 1) - 0.5;
        particlesArray.push(new Particle(x, y, dx, dy, size));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();
}

function connect() {
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let dist = ((particlesArray[a].x - particlesArray[b].x) ** 2) + ((particlesArray[a].y - particlesArray[b].y) ** 2);
            if (dist < (canvas.width / 7) * (canvas.height / 7)) {
                let opacity = 1 - (dist / 20000);
                ctx.strokeStyle = 'rgba(56, 189, 248, ' + opacity + ')'; // Connection color
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}
init(); animate();

// 2. CURSOR LOGIC
const dot = document.querySelector('[data-cursor-dot]');
const outline = document.querySelector('[data-cursor-outline]');

if (matchMedia('(pointer:fine)').matches) {
    window.addEventListener("mousemove", (e) => {
        const posX = e.clientX; const posY = e.clientY;
        dot.style.left = `${posX}px`; dot.style.top = `${posY}px`;
        outline.animate({ left: `${posX}px`, top: `${posY}px` }, { duration: 300, fill: "forwards" });
    });
    document.querySelectorAll(".nav-hover").forEach(el => {
        el.addEventListener("mouseenter", () => document.body.classList.add("hovering"));
        el.addEventListener("mouseleave", () => document.body.classList.remove("hovering"));
    });
}

// 3. THEME & OBSERVER
const themeBtn = document.getElementById('themeToggle');
themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    themeBtn.querySelector('i').className = document.body.classList.contains('light-mode') ? 'fas fa-sun' : 'fas fa-moon';
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('reveal-active'); });
});
// You can add class="reveal" to specific sections to fade them in
// currently active class handling is done via CSS defaults mostly for performance

