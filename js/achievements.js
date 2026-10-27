(() => {
    "use strict";

    const init = () => {
        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        const header = document.querySelector("header");
        const page = document.querySelector(".page-section");

        const modal = document.getElementById("achievementModal");
        const modalImage = document.getElementById("achievementModalImage");
        const modalClose = document.getElementById("achievementModalClose");

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
                if (animation.id === "achievements-page-enter") {
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
                    id: "achievements-page-enter",
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
                ".achievement-category-heading, " +
                ".achievement-card"
            );

            elements.forEach((element, index) => {
                element.getAnimations().forEach((animation) => {
                    if (animation.id === "achievements-content-enter") {
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
                        id: "achievements-content-enter",
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

        const playAchievementsAnimations = () => {
            playPageEntrance();
            playContentEntrance();
        };

        playAchievementsAnimations();

        const openAchievementModal = (image, button) => {
            if (!modal || !modalImage || !image) return;

            lastFocusedElement = button;

            modalImage.src = image.currentSrc || image.src;
            modalImage.alt = image.alt || "Achievement enlarged preview";

            modal.classList.add("show");
            modal.setAttribute("aria-hidden", "false");

            document.body.classList.add("achievement-modal-open");

            if (modalClose) {
                modalClose.focus();
            }
        };

        const closeAchievementModal = () => {
            if (!modal) return;

            modal.classList.remove("show");
            modal.setAttribute("aria-hidden", "true");

            document.body.classList.remove("achievement-modal-open");

            if (modalImage) {
                modalImage.removeAttribute("src");
            }

            if (lastFocusedElement) {
                lastFocusedElement.focus();
            }
        };

        document.querySelectorAll(".achievement-card").forEach((card) => {
            const image = card.querySelector(".achievement-preview img");
            const button = card.querySelector(".achievement-expand-btn");

            if (!image || !button) return;

            button.addEventListener("click", () => {
                openAchievementModal(image, button);
            });
        });

        if (modalClose) {
            modalClose.addEventListener(
                "click",
                closeAchievementModal
            );
        }

        if (modal) {
            modal.addEventListener("click", (event) => {
                if (event.target === modal) {
                    closeAchievementModal();
                }
            });
        }

        document.addEventListener("keydown", (event) => {
            if (
                event.key === "Escape" &&
                modal &&
                modal.classList.contains("show")
            ) {
                closeAchievementModal();
            }
        });

        window.addEventListener("pageshow", (event) => {
            if (event.persisted) {
                playAchievementsAnimations();
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