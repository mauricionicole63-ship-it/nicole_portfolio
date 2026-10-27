(() => {
    "use strict";

    const init = () => {
        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        const header = document.querySelector("header");

        const skillsPage = document.querySelector(".skills-page");

        const cards = [
            ...document.querySelectorAll(".technical-skill-card"),
            ...document.querySelectorAll(".professional-skill-card")
        ];

        const playPageEntrance = () => {
            if (!skillsPage || reducedMotion) return;

            skillsPage.getAnimations().forEach((animation) => {
                if (animation.id === "skills-page-enter") {
                    animation.cancel();
                }
            });

            const animation = skillsPage.animate(
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
                    id: "skills-page-enter",
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
            if (!skillsPage || reducedMotion) return;

            const elements = skillsPage.querySelectorAll(
                ".skills-heading, " +
                ".skills-section-title, " +
                ".technical-skill-card, " +
                ".professional-skill-card"
            );

            elements.forEach((element, index) => {
                element.getAnimations().forEach((animation) => {
                    if (animation.id === "skills-content-enter") {
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
                        id: "skills-content-enter",
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

        const playSkillsAnimations = () => {
            playPageEntrance();
            playContentEntrance();
        };

        playSkillsAnimations();

        const updateNavbar = () => {
            if (!header) return;

            header.classList.toggle(
                "premium-scrolled",
                window.scrollY > 15
            );
        };

        updateNavbar();

        window.addEventListener(
            "scroll",
            updateNavbar,
            { passive: true }
        );

        const initializeCardSpotlight = () => {
            if (reducedMotion) return;

            if (!window.matchMedia("(hover: hover)").matches) {
                return;
            }

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

        const initializeSmoothAnchors = () => {
            document.querySelectorAll('a[href^="#"]').forEach((link) => {
                link.addEventListener("click", (event) => {
                    const href = link.getAttribute("href");

                    if (!href || href === "#") return;

                    const target = document.getElementById(
                        href.substring(1)
                    );

                    if (!target) return;

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: reducedMotion ? "auto" : "smooth",
                        block: "start"
                    });
                });
            });
        };

        initializeSmoothAnchors();

        window.addEventListener("pageshow", (event) => {
            if (event.persisted) {
                playSkillsAnimations();
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