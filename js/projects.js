(() => {
    "use strict";

    const init = () => {
        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        const header = document.querySelector("header");
        const page = document.querySelector(".page-section");

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
                if (animation.id === "projects-page-enter") {
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
                    id: "projects-page-enter",
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
                ".project-number, " +
                ".project-type, " +
                ".project-info h1, " +
                ".project-info > h2, " +
                ".project-description, " +
                ".contribution-box, " +
                ".project-technologies, " +
                ".project-gallery"
            );

            elements.forEach((element, index) => {
                element.getAnimations().forEach((animation) => {
                    if (animation.id === "projects-content-enter") {
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
                        id: "projects-content-enter",
                        duration: 650,
                        delay: 120 + index * 70,
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

        const playProjectsAnimations = () => {
            playPageEntrance();
            playContentEntrance();
        };

        playProjectsAnimations();

        const initializeCardSpotlight = () => {
            if (reducedMotion) return;

            if (!window.matchMedia("(hover: hover)").matches) {
                return;
            }

            const cards = document.querySelectorAll(
                ".project-showcase, .contribution-box"
            );

            cards.forEach((card) => {
                let frame = null;

                card.addEventListener(
                    "pointermove",
                    (event) => {
                        const clientX = event.clientX;
                        const clientY = event.clientY;

                        if (frame !== null) {
                            cancelAnimationFrame(frame);
                        }

                        frame = requestAnimationFrame(() => {
                            const rect = card.getBoundingClientRect();

                            card.style.setProperty(
                                "--mouse-x",
                                `${clientX - rect.left}px`
                            );

                            card.style.setProperty(
                                "--mouse-y",
                                `${clientY - rect.top}px`
                            );

                            frame = null;
                        });
                    },
                    { passive: true }
                );

                card.addEventListener("pointerleave", () => {
                    if (frame !== null) {
                        cancelAnimationFrame(frame);
                        frame = null;
                    }

                    card.style.removeProperty("--mouse-x");
                    card.style.removeProperty("--mouse-y");
                });
            });
        };

        initializeCardSpotlight();

        const initializeButtonEffects = () => {
            document.addEventListener(
                "pointerdown",
                (event) => {
                    const button = event.target.closest(
                        "button, a[class*='btn']"
                    );

                    if (!button) return;

                    button.classList.add("premium-press");

                    window.setTimeout(() => {
                        button.classList.remove("premium-press");
                    }, 180);
                },
                { passive: true }
            );
        };

        initializeButtonEffects();

        const initializePageReturn = () => {
            window.addEventListener("pageshow", (event) => {
                if (event.persisted) {
                    playProjectsAnimations();
                }
            });
        };

        initializePageReturn();
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