(() => {
    "use strict";

    const init = () => {
        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        const header = document.querySelector("header");
        const page = document.querySelector(".page-section");

        const modal = document.getElementById("certificateModal");
        const modalImage = document.getElementById("certificateModalImage");
        const modalClose = document.getElementById("certificateModalClose");

        let lastFocusedElement = null;

        const updateNavbar = () => {
            if (!header) return;

            header.classList.toggle(
                "premium-scrolled",
                window.scrollY > 12
            );
        };

        updateNavbar();

        window.addEventListener(
            "scroll",
            updateNavbar,
            { passive: true }
        );

        const playPageEntrance = () => {
            if (!page || reducedMotion) return;

            page.getAnimations().forEach((animation) => {
                if (animation.id === "certificates-page-enter") {
                    animation.cancel();
                }
            });

            const animation = page.animate(
                [
                    {
                        opacity: 0,
                        transform: "translate3d(0, 15px, 0)"
                    },
                    {
                        opacity: 1,
                        transform: "translate3d(0, 0, 0)"
                    }
                ],
                {
                    id: "certificates-page-enter",
                    duration: 800,
                    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
                    fill: "none"
                }
            );

            animation.addEventListener(
                "finish",
                () => animation.cancel(),
                { once: true }
            );
        };

        const playContentEntrance = () => {
            if (!page || reducedMotion) return;

            const elements = page.querySelectorAll(
                ".certificate-category-heading, " +
                ".certificate-card"
            );

            elements.forEach((element, index) => {
                element.getAnimations().forEach((animation) => {
                    if (animation.id === "certificates-content-enter") {
                        animation.cancel();
                    }
                });

                const animation = element.animate(
                    [
                        {
                            opacity: 0,
                            transform: "translate3d(0, 12px, 0)"
                        },
                        {
                            opacity: 1,
                            transform: "translate3d(0, 0, 0)"
                        }
                    ],
                    {
                        id: "certificates-content-enter",
                        duration: 650,
                        delay: 120 + index * 90,
                        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
                        fill: "backwards"
                    }
                );

                animation.addEventListener(
                    "finish",
                    () => animation.cancel(),
                    { once: true }
                );
            });
        };

        const playCertificatesAnimations = () => {
            playPageEntrance();
            playContentEntrance();
        };

        playCertificatesAnimations();

        const openCertificateModal = (image, button) => {
            if (!modal || !modalImage || !image) return;

            lastFocusedElement = button;

            modalImage.src = image.currentSrc || image.src;
            modalImage.alt = image.alt || "Certificate enlarged preview";

            modal.classList.add("show");
            modal.setAttribute("aria-hidden", "false");

            document.body.classList.add("certificate-modal-open");

            if (modalClose) {
                modalClose.focus();
            }
        };

        const closeCertificateModal = () => {
            if (!modal) return;

            modal.classList.remove("show");
            modal.setAttribute("aria-hidden", "true");

            document.body.classList.remove("certificate-modal-open");

            if (modalImage) {
                modalImage.removeAttribute("src");
            }

            if (lastFocusedElement) {
                lastFocusedElement.focus();
            }
        };

        document.querySelectorAll(".certificate-card").forEach((card) => {
            const image = card.querySelector(".certificate-preview img");
            const button = card.querySelector(".certificate-expand-btn");

            if (!image || !button) return;

            button.addEventListener("click", () => {
                openCertificateModal(image, button);
            });
        });

        if (modalClose) {
            modalClose.addEventListener(
                "click",
                closeCertificateModal
            );
        }

        if (modal) {
            modal.addEventListener("click", (event) => {
                if (event.target === modal) {
                    closeCertificateModal();
                }
            });
        }

        document.addEventListener("keydown", (event) => {
            if (
                event.key === "Escape" &&
                modal &&
                modal.classList.contains("show")
            ) {
                closeCertificateModal();
            }
        });

        window.addEventListener("pageshow", (event) => {
            if (event.persisted) {
                playCertificatesAnimations();
            }
        });
    };

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            init,
            { once: true }
        );
    } else {
        init();
    }
})();