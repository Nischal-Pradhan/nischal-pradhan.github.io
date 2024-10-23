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
        duration: 500,
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
