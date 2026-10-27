(() => {
    "use strict";

    const init = () => {
        const header = document.querySelector("header");
        const page = document.querySelector(".resume-download-section");

        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

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
                if (animation.id === "resume-page-enter") {
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
                    id: "resume-page-enter",
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
                ".resume-dashboard-summary, " +
                ".resume-dashboard-download-heading, " +
                ".resume-version-card, " +
                ".resume-document-details"
            );

            elements.forEach((element, index) => {
                element.getAnimations().forEach((animation) => {
                    if (animation.id === "resume-content-enter") {
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
                        id: "resume-content-enter",
                        duration: 650,
                        delay: 120 + index * 110,
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

        const playResumeAnimations = () => {
            playPageEntrance();
            playContentEntrance();
        };

        playResumeAnimations();

        window.addEventListener("pageshow", (event) => {
            if (event.persisted) {
                playResumeAnimations();
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