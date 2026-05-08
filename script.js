const text = "Инженерное образование для школьников";
const typingText = document.getElementById("typing-text");

let index = 0;

function typeText() {
    if (index < text.length) {
        typingText.textContent += text[index];
        index++;
        setTimeout(typeText, 70);
    }
}

typeText();


const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
    for (let i = 0; i < revealElements.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = revealElements[i].getBoundingClientRect().top;
        const elementVisible = 120;

        if (elementTop < windowHeight - elementVisible) {
            revealElements[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();


const counters = document.querySelectorAll(".counter");
let countersStarted = false;

function startCounters() {
    if (countersStarted) return;

    const statsSection = document.querySelector(".stats");
    const sectionTop = statsSection.getBoundingClientRect().top;

    if (sectionTop < window.innerHeight - 100) {
        countersStarted = true;

        counters.forEach(counter => {
            const target = Number(counter.getAttribute("data-target"));
            let current = 0;
            const step = Math.ceil(target / 100);

            function updateCounter() {
                current += step;

                if (current >= target) {
                    counter.textContent = target + "+";
                } else {
                    counter.textContent = current;
                    setTimeout(updateCounter, 20);
                }
            }

            updateCounter();
        });
    }
}

window.addEventListener("scroll", startCounters);
startCounters();