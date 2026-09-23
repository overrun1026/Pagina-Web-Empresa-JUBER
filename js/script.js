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


// =====================================================
// FUNCIÓN DE CONTADOR
// =====================================================

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
// FORMULARIO DE CONTACTO - WEB3FORMS
// =====================================================

const contactForm =
    document.querySelector(
        ".contact-form"
    );


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            const button =
                contactForm.querySelector(
                    "button[type='submit']"
                );


            if (!button) return;


            const originalText =
                button.innerHTML;


            // =================================================
            // CONFIGURACIÓN WEB3FORMS
            // =================================================

            const accessKey =
                "68bbf3a3-aad0-4bbc-85f4-e0530c800bf8";


            // =================================================
            // ESTADO DE ENVÍO
            // =================================================

            button.disabled = true;

            button.innerHTML =
                `
                <i class="fa-solid fa-spinner fa-spin"></i>
                Enviando solicitud...
                `;


            try {

                // Crear FormData con los datos
                // que ya existen en el formulario

                const formData =
                    new FormData(contactForm);


                // Agregar la Access Key de Web3Forms

                formData.append(
                    "access_key",
                    accessKey
                );


                // Enviar formulario

                const response =
                    await fetch(
                        "https://api.web3forms.com/submit",
                        {
                            method: "POST",
                            body: formData
                        }
                    );


                const result =
                    await response.json();


                // =================================================
                // ENVÍO EXITOSO
                // =================================================

                if (
                    result.success === true
                ) {

                    button.innerHTML =
                        `
                        <i class="fa-solid fa-check"></i>
                        Solicitud enviada
                        `;


                    button.style.background =
                        "#16a34a";


                    // Limpiar formulario

                    contactForm.reset();


                    // Restaurar botón después de unos segundos

                    setTimeout(() => {

                        button.innerHTML =
                            originalText;


                        button.style.background =
                            "";


                        button.disabled =
                            false;

                    }, 2500);


                } else {

                    throw new Error(
                        result.message ||
                        "No se pudo enviar el formulario."
                    );

                }


            } catch (error) {

                console.error(
                    "Error al enviar el formulario:",
                    error
                );


                // =================================================
                // ERROR
                // =================================================

                button.innerHTML =
                    `
                    <i class="fa-solid fa-xmark"></i>
                    Error al enviar
                    `;


                button.style.background =
                    "#dc2626";


                setTimeout(() => {

                    button.innerHTML =
                        originalText;


                    button.style.background =
                        "";


                    button.disabled =
                        false;

                }, 3000);

            }

        }
    );

}