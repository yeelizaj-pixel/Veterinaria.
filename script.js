
/* ==========================================
   PETCARE - FUNCIONES JAVASCRIPT
   Proyecto académico
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ======================================
       1. DATOS DE LOS 10 TESTIMONIOS
    ====================================== */

    const testimonials = [
        {
            name: "Valentina Morales",
            pet: "Dueña de Max 🐶",
            comment: "Excelente atención. Mi perrito recibió un trato maravilloso. ¡Los recomiendo!",
            image: "https://randomuser.me/api/portraits/women/12.jpg"
        },
        {
            name: "Sebastián Castillo",
            pet: "Dueño de Toby 🐕",
            comment: "El personal fue muy amable y profesional. Me explicaron cada detalle de la consulta.",
            image: "https://randomuser.me/api/portraits/men/32.jpg"
        },
        {
            name: "Camila Reyes",
            pet: "Dueña de Luna 🐱",
            comment: "Me encantó el servicio y la paciencia que tuvieron con mi gatita.",
            image: "https://randomuser.me/api/portraits/women/24.jpg"
        },
        {
            name: "Gabriel Núñez",
            pet: "Dueño de Rocky 🐶",
            comment: "La consulta fue excelente. Se nota el amor que sienten por los animales.",
            image: "https://randomuser.me/api/portraits/men/45.jpg"
        },
        {
            name: "Isabella Peña",
            pet: "Dueña de Nala 🐱",
            comment: "Encontré un lugar de confianza. La atención fue muy buena desde el primer momento.",
            image: "https://randomuser.me/api/portraits/women/36.jpg"
        },
        {
            name: "Adrián Vargas",
            pet: "Dueño de Bruno 🐕",
            comment: "Excelente servicio de peluquería. Bruno quedó hermoso y feliz.",
            image: "https://randomuser.me/api/portraits/men/52.jpg"
        },
        {
            name: "Daniela Rojas",
            pet: "Dueña de Mimi 🐈",
            comment: "La atención fue rápida, amable y profesional. Volvería sin pensarlo.",
            image: "https://randomuser.me/api/portraits/women/55.jpg"
        },
        {
            name: "Emilio Herrera",
            pet: "Dueño de Simba 🦁",
            comment: "Me gustó mucho el cuidado y la dedicación del personal veterinario.",
            image: "https://randomuser.me/api/portraits/men/64.jpg"
        },
        {
            name: "Natalia Flores",
            pet: "Dueña de Coco 🐦",
            comment: "Un lugar agradable donde mi mascota recibió una atención especial.",
            image: "https://randomuser.me/api/portraits/women/67.jpg"
        },
        {
            name: "Mateo Jiménez",
            pet: "Dueño de Milo 🐶",
            comment: "Quedé muy satisfecho con el servicio. Lo recomiendo a otros dueños de mascotas.",
            image: "https://randomuser.me/api/portraits/men/78.jpg"
        }
    ];


    /* ======================================
       2. CREAR LAS TARJETAS DE TESTIMONIOS
    ====================================== */

    const testimonialTrack =
        document.getElementById("testimonialTrack");

    if (testimonialTrack) {

        testimonials.forEach(function (client) {

            const card = document.createElement("article");
            card.className = "testimonial-card";

            const inner = document.createElement("div");
            inner.className = "testimonial-inner";

            const avatar = document.createElement("img");
            avatar.className = "testimonial-avatar";
            avatar.src = client.image;
            avatar.alt = "Fotografía de " + client.name;
            avatar.loading = "lazy";

            const stars = document.createElement("div");
            stars.className = "testimonial-stars";
            stars.setAttribute("aria-label", "Cinco estrellas");

            stars.innerHTML = `
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
            `;

            const name = document.createElement("h3");
            name.textContent = client.name;

            const comment = document.createElement("p");
            comment.textContent = "“" + client.comment + "”";

            const pet = document.createElement("div");
            pet.className = "testimonial-pet";
            pet.textContent = client.pet;

            inner.appendChild(avatar);
            inner.appendChild(stars);
            inner.appendChild(name);
            inner.appendChild(comment);
            inner.appendChild(pet);

            card.appendChild(inner);
            testimonialTrack.appendChild(card);

        });

    }


    /* ======================================
       3. FUNCIONAMIENTO DEL CARRUSEL
    ====================================== */

    const previousButton =
        document.getElementById("prevTestimonial");

    const nextButton =
        document.getElementById("nextTestimonial");

    const counter =
        document.getElementById("testimonialCounter");

    let currentIndex = 0;

    function getVisibleCards() {

        if (window.innerWidth <= 575) {
            return 1;
        }

        if (window.innerWidth <= 991) {
            return 2;
        }

        return 4;
    }

    function updateCarousel() {

        if (!testimonialTrack) return;

        const cards =
            testimonialTrack.querySelectorAll(".testimonial-card");

        if (!cards.length) return;

        const visibleCards =
            Math.min(getVisibleCards(), cards.length);

        const maxIndex =
            Math.max(0, cards.length - visibleCards);

        currentIndex = Math.max(
            0,
            Math.min(currentIndex, maxIndex)
        );

        const cardWidth =
            cards[0].getBoundingClientRect().width;

        const gap =
            parseFloat(getComputedStyle(testimonialTrack).gap) || 0;

        const distance =
            currentIndex * (cardWidth + gap);

        testimonialTrack.style.transform =
            `translateX(-${distance}px)`;

        if (previousButton) {
            previousButton.disabled = currentIndex === 0;
        }

        if (nextButton) {
            nextButton.disabled = currentIndex === maxIndex;
        }

        if (counter) {
            counter.textContent =
                `${currentIndex + 1} - ${Math.min(
                    currentIndex + visibleCards,
                    cards.length
                )} / ${cards.length}`;
        }

    }

    if (nextButton) {

        nextButton.addEventListener("click", function () {
            currentIndex++;
            updateCarousel();
        });

    }

    if (previousButton) {

        previousButton.addEventListener("click", function () {
            currentIndex--;
            updateCarousel();
        });

    }

    window.addEventListener("resize", updateCarousel);

    updateCarousel();


    /* ======================================
       4. VALIDACIÓN DEL FORMULARIO
    ====================================== */

    const contactForm =
        document.getElementById("contactForm");

    const nameInput =
        document.getElementById("nombre");

    const emailInput =
        document.getElementById("email");

    const messageInput =
        document.getElementById("mensaje");

    const confirmationElement =
        document.getElementById("confirmationModal");

    let confirmationModal = null;

    if (
        confirmationElement &&
        typeof bootstrap !== "undefined"
    ) {
        confirmationModal =
            new bootstrap.Modal(confirmationElement);
    }

    if (
        contactForm &&
        nameInput &&
        emailInput &&
        messageInput
    ) {

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const message = messageInput.value.trim();

            /* Validar nombre */

            if (name.length < 3) {

                alert("Por favor, escribe tu nombre completo.");
                nameInput.focus();
                return;

            }

            /* Validar correo electrónico */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

            if (!emailPattern.test(email)) {

                alert("Introduce un correo electrónico válido.");
                emailInput.focus();
                return;

            }

            /* Validar mensaje */

            if (message.length < 10) {

                alert("El mensaje debe tener al menos 10 caracteres.");
                messageInput.focus();
                return;

            }

            /* Preparar el correo */

            const emailAddress = "contacto@petcare.com";

            const subject = encodeURIComponent(
                "Nuevo mensaje de contacto - PetCare"
            );

            const body = encodeURIComponent(
                "Nombre: " + name +
                "\nCorreo: " + email +
                "\n\nMensaje:\n" + message
            );

            const mailtoLink =
                `mailto:${emailAddress}?subject=${subject}&body=${body}`;

            /*
              El formulario prepara un correo mediante mailto.
              El usuario debe enviarlo desde su aplicación de correo.
              La página no puede confirmar que se haya enviado.
            */

            if (confirmationModal) {
                confirmationModal.show();
            } else {
                alert(
                    "Se abrirá tu aplicación de correo para continuar."
                );
            }

            window.location.href = mailtoLink;

            contactForm.reset();

        });

    }


    /* ======================================
       5. TELÉFONO Y WHATSAPP
    ====================================== */

    const phoneNumber = "18096639063";

    const formattedPhone = "809-663-9063";

    document.querySelectorAll("[data-petcare-phone]")
        .forEach(function (element) {

            element.textContent = formattedPhone;

        });

    document.querySelectorAll("[data-petcare-call]")
        .forEach(function (link) {

            link.href = "tel:+" + phoneNumber;

        });

    document.querySelectorAll("[data-petcare-whatsapp]")
        .forEach(function (link) {

            link.href = "https://wa.me/" + phoneNumber;
            link.target = "_blank";
            link.rel = "noopener noreferrer";

        });


    /* ======================================
       6. MENÚ PARA TELÉFONOS Y TABLETAS
    ====================================== */

    const menuLinks =
        document.querySelectorAll("#menuPrincipal .nav-link");

    const menuElement =
        document.getElementById("menuPrincipal");

    menuLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            if (
                window.innerWidth < 992 &&
                menuElement &&
                typeof bootstrap !== "undefined"
            ) {

                const menuInstance =
                    bootstrap.Collapse.getInstance(menuElement);

                if (menuInstance) {
                    menuInstance.hide();
                }

            }

        });

    });


    /* ======================================
       7. MENSAJES DE CONSOLA
    ====================================== */

    console.log("🐾 PetCare se ha iniciado correctamente.");
    console.log("Página web cargada y funciones activas.");
    console.log("Teléfono de contacto: 809-663-9063");
    console.log("Horario: lunes a viernes, 9:00 a. m. - 5:00 p. m.");

});
