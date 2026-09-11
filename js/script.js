// =====================================================
// NAVBAR AL HACER SCROLL
// =====================================================

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (!header) return;

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});


// =====================================================
// MENÚ RESPONSIVE
// =====================================================

const menuToggle =
    document.querySelector(".menu-toggle");

const navLinks =
    document.querySelector(".nav-links");


if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        // Evita hacer scroll en el fondo
        document.body.classList.toggle(
            "menu-open",
            navLinks.classList.contains("active")
        );

    });


    // Cerrar menú al hacer click en un enlace

    document
        .querySelectorAll(".nav-links a")
        .forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("active");

                document.body.classList.remove(
                    "menu-open"
                );

            });

        });

}


// =====================================================
// ANIMACIONES AL HACER SCROLL
// =====================================================

const revealElements =
    document.querySelectorAll(
        ".reveal, .reveal-left"
    );


if (revealElements.length > 0) {

    const revealObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target
                            .classList
                            .add("active");

                        // Dejar de observar después
                        // de mostrar la animación

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.15
            }

        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });

}


// =====================================================
// CONTADORES ANIMADOS
// =====================================================

const counters =
    document.querySelectorAll(".counter");


if (counters.length > 0) {

    const counterObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting &&
                        !entry.target.dataset.animated
                    ) {

                        entry.target.dataset.animated =
                            "true";

                        animateCounter(
                            entry.target
                        );

                        counterObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.5
            }

        );


    counters.forEach(counter => {

        counterObserver.observe(counter);

    });

}


// FUNCIÓN DE CONTADOR

function animateCounter(counter) {

    const target =
        Number(
            counter.dataset.target
        );

    const duration = 1500;

    const startTime =
        performance.now();


    function updateCounter(currentTime) {

        const elapsed =
            currentTime - startTime;

        const progress =
            Math.min(
                elapsed / duration,
                1
            );


        // Animación más suave

        const easeOut =
            1 -
            Math.pow(
                1 - progress,
                3
            );


        const value =
            Math.floor(
                easeOut * target
            );


        counter.textContent =
            value + "+";


        if (progress < 1) {

            requestAnimationFrame(
                updateCounter
            );

        } else {

            counter.textContent =
                target + "+";

        }

    }


    requestAnimationFrame(
        updateCounter
    );

}


// =====================================================
// FAQ - PREGUNTAS FRECUENTES
// =====================================================

const faqItems =
    document.querySelectorAll(
        ".faq-item"
    );


faqItems.forEach(item => {

    const question =
        item.querySelector(
            ".faq-question"
        );


    if (!question) return;


    question.addEventListener(
        "click",
        () => {

            const isActive =
                item.classList.contains(
                    "active"
                );


            // Cerrar todas las preguntas

            faqItems.forEach(otherItem => {

                otherItem
                    .classList
                    .remove("active");

            });


            // Si no estaba abierta,
            // abrir la seleccionada

            if (!isActive) {

                item
                    .classList
                    .add("active");

            }

        }
    );

});


// =====================================================
// BOTÓN VOLVER ARRIBA
// =====================================================

const scrollTopButton =
    document.querySelector(
        ".scroll-top"
    );


if (scrollTopButton) {

    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 500) {

                scrollTopButton
                    .classList
                    .add("show");

            } else {

                scrollTopButton
                    .classList
                    .remove("show");

            }

        }
    );


    scrollTopButton
        .addEventListener(
            "click",
            () => {

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }
        );

}


// =====================================================
// FORMULARIO
// =====================================================

const contactForm =
    document.querySelector(
        ".contact-form"
    );


if (contactForm) {

    contactForm
        .addEventListener(
            "submit",
            (event) => {

                event.preventDefault();


                const button =
                    contactForm.querySelector(
                        "button[type='submit']"
                    );


                if (!button) return;


                const originalText =
                    button.innerHTML;


                // Estado de envío

                button.disabled = true;


                button.innerHTML =
                    `
                    <i class="fa-solid fa-spinner fa-spin"></i>
                    Enviando solicitud...
                    `;


                // Simulación de envío
                // Cuando conectemos EmailJS
                // aquí se reemplazará esta parte


                setTimeout(() => {


                    button.innerHTML =
                        `
                        <i class="fa-solid fa-check"></i>
                        Solicitud enviada
                        `;


                    button.style.background =
                        "#16a34a";


                    // Limpiar formulario

                    contactForm.reset();


                    setTimeout(() => {

                        button.innerHTML =
                            originalText;


                        button.style.background =
                            "";


                        button.disabled =
                            false;

                    }, 2500);


                }, 1000);

            }
        );

}