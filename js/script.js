const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

if (hamburger && navMenu) {
    hamburger.addEventListener("click", function (event) {
        event.stopPropagation();

        navMenu.classList.toggle("show");

        const menuIsOpen = navMenu.classList.contains("show");

        hamburger.textContent = menuIsOpen ? "✕" : "☰";
        hamburger.setAttribute("aria-expanded", menuIsOpen);
    });

    const menuLinks = document.querySelectorAll("#navMenu a");

    menuLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            navMenu.classList.remove("show");
            hamburger.textContent = "☰";
            hamburger.setAttribute("aria-expanded", "false");
        });
    });

    document.addEventListener("click", function (event) {
        if (
            !navMenu.contains(event.target) &&
            !hamburger.contains(event.target)
        ) {
            navMenu.classList.remove("show");
            hamburger.textContent = "☰";
            hamburger.setAttribute("aria-expanded", "false");
        }
    });

    window.addEventListener("resize", function () {
        if (window.innerWidth > 900) {
            navMenu.classList.remove("show");
            hamburger.textContent = "☰";
            hamburger.setAttribute("aria-expanded", "false");
        }
    });
}


const certificateModal = document.getElementById("certificateModal");
const certificateModalImage = document.getElementById("certificateModalImage");
const certificateModalClose = document.getElementById("certificateModalClose");

const certificateExpandButtons =
    document.querySelectorAll(".certificate-expand-btn");

if (
    certificateModal &&
    certificateModalImage &&
    certificateModalClose
) {

    certificateExpandButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const certificatePreview =
                button.closest(".certificate-preview");

            if (!certificatePreview) {
                return;
            }

            const certificateImage =
                certificatePreview.querySelector("img");

            if (!certificateImage) {
                return;
            }

            certificateModalImage.src = certificateImage.src;
            certificateModalImage.alt = certificateImage.alt;

            certificateModal.classList.add("show");

            document.body.style.overflow = "hidden";
        });

    });


    certificateModalClose.addEventListener("click", function () {

        certificateModal.classList.remove("show");

        certificateModalImage.src = "";

        document.body.style.overflow = "";

    });


    certificateModal.addEventListener("click", function (event) {

        if (event.target === certificateModal) {

            certificateModal.classList.remove("show");

            certificateModalImage.src = "";

            document.body.style.overflow = "";

        }

    });


    document.addEventListener("keydown", function (event) {

        if (
            event.key === "Escape" &&
            certificateModal.classList.contains("show")
        ) {

            certificateModal.classList.remove("show");

            certificateModalImage.src = "";

            document.body.style.overflow = "";

        }

    });

}


const achievementModal = document.getElementById("achievementModal");
const achievementModalImage = document.getElementById("achievementModalImage");
const achievementModalClose = document.getElementById("achievementModalClose");

const achievementExpandButtons =
    document.querySelectorAll(".achievement-expand-btn");

if (
    achievementModal &&
    achievementModalImage &&
    achievementModalClose
) {

    achievementExpandButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const achievementPreview =
                button.closest(".achievement-preview");

            if (!achievementPreview) {
                return;
            }

            const achievementImage =
                achievementPreview.querySelector("img");

            if (!achievementImage) {
                return;
            }

            achievementModalImage.src = achievementImage.src;
            achievementModalImage.alt = achievementImage.alt;

            achievementModal.classList.add("show");
            achievementModal.setAttribute("aria-hidden", "false");

            document.body.style.overflow = "hidden";
        });

    });


    achievementModalClose.addEventListener("click", function () {

        achievementModal.classList.remove("show");
        achievementModal.setAttribute("aria-hidden", "true");

        achievementModalImage.src = "";

        document.body.style.overflow = "";

    });


    achievementModal.addEventListener("click", function (event) {

        if (event.target === achievementModal) {

            achievementModal.classList.remove("show");
            achievementModal.setAttribute("aria-hidden", "true");

            achievementModalImage.src = "";

            document.body.style.overflow = "";

        }

    });


    document.addEventListener("keydown", function (event) {

        if (
            event.key === "Escape" &&
            achievementModal.classList.contains("show")
        ) {

            achievementModal.classList.remove("show");
            achievementModal.setAttribute("aria-hidden", "true");

            achievementModalImage.src = "";

            document.body.style.overflow = "";

        }

    });

}


const projectGalleries = document.querySelectorAll(".project-gallery");

projectGalleries.forEach(function (gallery) {

    const projectSlides = gallery.querySelectorAll(".carousel-slide");
    const projectDots = gallery.querySelectorAll(".carousel-dot");
    const projectPrev = gallery.querySelector(".carousel-prev");
    const projectNext = gallery.querySelector(".carousel-next");

    const currentSlideDisplay =
        gallery.querySelector(".current-slide");

    const totalSlidesDisplay =
        gallery.querySelector(".total-slides");

    let currentProjectSlide = 0;


    function showProjectSlide(index) {

        if (projectSlides.length === 0) {
            return;
        }

        if (index < 0) {
            currentProjectSlide = projectSlides.length - 1;
        } else if (index >= projectSlides.length) {
            currentProjectSlide = 0;
        } else {
            currentProjectSlide = index;
        }


        projectSlides.forEach(function (slide) {
            slide.classList.remove("active");
        });


        projectDots.forEach(function (dot) {
            dot.classList.remove("active");
        });


        projectSlides[currentProjectSlide].classList.add("active");


        if (projectDots[currentProjectSlide]) {
            projectDots[currentProjectSlide].classList.add("active");
        }


        if (currentSlideDisplay) {
            currentSlideDisplay.textContent =
                String(currentProjectSlide + 1).padStart(2, "0");
        }

    }


    if (totalSlidesDisplay) {
        totalSlidesDisplay.textContent =
            String(projectSlides.length).padStart(2, "0");
    }


    if (projectPrev) {

        projectPrev.addEventListener("click", function () {

            showProjectSlide(currentProjectSlide - 1);

        });

    }


    if (projectNext) {

        projectNext.addEventListener("click", function () {

            showProjectSlide(currentProjectSlide + 1);

        });

    }


    projectDots.forEach(function (dot, index) {

        dot.addEventListener("click", function () {

            showProjectSlide(index);

        });

    });


    if (projectSlides.length > 0) {
        showProjectSlide(0);
    }

});


const projectModal = document.getElementById("projectModal");
const projectModalImage = document.getElementById("projectModalImage");
const projectModalClose = document.getElementById("projectModalClose");

const projectExpandButtons =
    document.querySelectorAll(".project-expand-btn");

if (
    projectModal &&
    projectModalImage &&
    projectModalClose
) {

    projectExpandButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const screenshotWrapper =
                button.closest(".screenshot-wrapper");

            if (!screenshotWrapper) {
                return;
            }

            const projectImage =
                screenshotWrapper.querySelector("img");

            if (!projectImage) {
                return;
            }

            projectModalImage.src = projectImage.src;
            projectModalImage.alt = projectImage.alt;

            projectModal.classList.add("show");
            projectModal.setAttribute("aria-hidden", "false");

            document.body.style.overflow = "hidden";

        });

    });


    projectModalClose.addEventListener("click", function () {

        projectModal.classList.remove("show");
        projectModal.setAttribute("aria-hidden", "true");

        projectModalImage.src = "";

        document.body.style.overflow = "";

    });


    projectModal.addEventListener("click", function (event) {

        if (event.target === projectModal) {

            projectModal.classList.remove("show");
            projectModal.setAttribute("aria-hidden", "true");

            projectModalImage.src = "";

            document.body.style.overflow = "";

        }

    });


    document.addEventListener("keydown", function (event) {

        if (
            event.key === "Escape" &&
            projectModal.classList.contains("show")
        ) {

            projectModal.classList.remove("show");
            projectModal.setAttribute("aria-hidden", "true");

            projectModalImage.src = "";

            document.body.style.overflow = "";

        }

    });

}