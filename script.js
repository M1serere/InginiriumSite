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

if (typingText) {
    typeText();
}


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
    if (!statsSection) return;

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

const filterButtons = document.querySelectorAll(".filter-btn");
const courseCards = document.querySelectorAll(".course-card");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn => btn.classList.remove("active-filter"));
        button.classList.add("active-filter");

        const filterValue = button.getAttribute("data-filter");

        courseCards.forEach(card => {
            const cardCategory = card.getAttribute("data-category");

            if (filterValue === "all" || filterValue === cardCategory) {
                card.classList.remove("hide-course");
            } else {
                card.classList.add("hide-course");
            }
        });
    });
});


const modal = document.getElementById("course-modal");
const modalTitle = document.getElementById("modal-title");
const modalText = document.getElementById("modal-text");
const modalClose = document.getElementById("modal-close");
const detailsButtons = document.querySelectorAll(".details-btn");

detailsButtons.forEach(button => {
    button.addEventListener("click", () => {
        modalTitle.textContent = button.getAttribute("data-title");
        modalText.textContent = button.getAttribute("data-text");
        modal.classList.add("show-modal");
    });
});

if (modalClose) {
    modalClose.addEventListener("click", () => {
        modal.classList.remove("show-modal");
    });
}

if (modal) {
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.classList.remove("show-modal");
        }
    });
}

const branchCards = document.querySelectorAll(".branch-card");
const mapTitle = document.getElementById("map-title");
const mapAddress = document.getElementById("map-address");
const googleMap = document.getElementById("google-map");
const branchSearch = document.getElementById("branch-search");

branchCards.forEach(card => {
    const button = card.querySelector(".branch-btn");

    button.addEventListener("click", () => {
        branchCards.forEach(item => item.classList.remove("active-branch"));
        card.classList.add("active-branch");

        const branchName = card.getAttribute("data-branch");
        const branchAddress = card.getAttribute("data-address");
        const mapSrc = card.getAttribute("data-map-src");

        mapTitle.textContent = "Инжинириум " + branchName;
        mapAddress.textContent = branchAddress;

        if (googleMap && mapSrc) {
            googleMap.src = mapSrc;
        }
    });
});

if (branchSearch) {
    branchSearch.addEventListener("input", () => {
        const searchText = branchSearch.value.toLowerCase();

        branchCards.forEach(card => {
            const cardText = card.textContent.toLowerCase();

            if (cardText.includes(searchText)) {
                card.classList.remove("hide-branch");
            } else {
                card.classList.add("hide-branch");
            }
        });
    });
}

const contactForm = document.getElementById("contact-form");

if (contactForm) {
    const userName = document.getElementById("user-name");
    const userPhone = document.getElementById("user-phone");
    const userCourse = document.getElementById("user-course");
    const successMessage = document.getElementById("success-message");

    function showError(input, message) {
        const formGroup = input.closest(".form-group");
        const errorText = formGroup.querySelector(".error-text");

        formGroup.classList.add("error");
        errorText.textContent = message;
    }

    function clearError(input) {
        const formGroup = input.closest(".form-group");
        const errorText = formGroup.querySelector(".error-text");

        formGroup.classList.remove("error");
        errorText.textContent = "";
    }

    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        let isValid = true;

        clearError(userName);
        clearError(userPhone);
        clearError(userCourse);

        if (userName.value.trim() === "") {
            showError(userName, "Введите имя");
            isValid = false;
        }

        if (userPhone.value.trim() === "") {
            showError(userPhone, "Введите телефон");
            isValid = false;
        } else if (userPhone.value.trim().length < 6) {
            showError(userPhone, "Телефон слишком короткий");
            isValid = false;
        }

        if (userCourse.value === "") {
            showError(userCourse, "Выберите курс");
            isValid = false;
        }

        if (isValid) {
            successMessage.classList.add("show-success");
            contactForm.reset();

            setTimeout(() => {
                successMessage.classList.remove("show-success");
            }, 5000);
        }
    });
}