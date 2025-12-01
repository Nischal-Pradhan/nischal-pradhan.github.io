function openNav() {
    document.getElementById("nav-menu").style.width = "100%";
}

function closeNav() {
    document.getElementById("nav-menu").style.width = "0%";
}

//cursor trailer animation
const trailer = document.getElementById("trailer");

window.onmousemove = e => {
    const x = e.clientX - trailer.offsetWidth / 2;
    const y = e.clientY - trailer.offsetHeight / 2;


    const keyframes = {
        transform: `translate(${x}px, ${y}px)`
    }

    trailer.animate(keyframes, {
        duration: 5,
        fill: "forwards"

    })
}

// scrolling progress bar
const progressBarEl = document.getElementById("progress-bar");

window.addEventListener('scroll', () => {
    let height = document.body.scrollHeight - window.innerHeight;
    let scrollPosition = document.documentElement.scrollTop;
    let width = (scrollPosition / height) * 100;
    progressBarEl.style.width = `${width}%`;
})


// go to top button
// Get the button
let top_button = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {
    scrollFunction()
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        top_button.style.display = "block";
    } else {
        top_button.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function goToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}


// function toggleContent() {
//     const contentBelow = document.getElementById("contentBelow");
//     const moreProjectBtn = document.getElementById("moreProjectBtn");

//     if (window.matchMedia("(max-width: 1300px)").matches) {
//         contentBelow.style.display = "flex";
//         contentBelow.style.flexDirection = "column";
//     } else if (window.matchMedia("(max-width: 1500px)").matches) {
//         contentBelow.style.display = "flex";
//         contentBelow.style.flexDirection = "row";
//         moreProjectBtn.style.display = "none";
//     }
// }


// bg
const canvas = document.getElementById("neural-bg");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

let mouse = { x: null, y: null };
window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = 2;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

        // soft attraction near mouse
        if (mouse.x !== null) {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
                this.x -= dx / 150;
                this.y -= dy / 150;
            }
        }
    }
    draw() {
        ctx.fillStyle = "#88c0d0";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

let particles = [];
for (let i = 0; i < 110; i++) particles.push(new Particle());

function connectParticles() {
    for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
            let dx = particles[a].x - particles[b].x;
            let dy = particles[a].y - particles[b].y;
            let dist = dx * dx + dy * dy;

            if (dist < 180 * 180) {
                ctx.strokeStyle = "rgba(136,192,208,0.15)";
                ctx.lineWidth = 1;

                ctx.beginPath();
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y);
                ctx.stroke();
            }
        }
    }
}

function animateNN() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    connectParticles();
    requestAnimationFrame(animateNN);
}

animateNN();

window.addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
});

window.addEventListener("scroll", () => {
    let scrollY = window.scrollY * 0.15;

    document.querySelectorAll(".fade-scroll-item, .home-section, .about-section, .project-section, .blog-section")
        .forEach((layer, index) => {
            let depth = (index + 3) * 4;
            layer.style.transform = `translateY(${scrollY / depth}px)`;
        });
});

