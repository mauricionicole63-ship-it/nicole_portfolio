(() => {
    "use strict";

    const init = () => {
        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

        const header = document.querySelector("header");
        const heroContent = document.querySelector(".hero-content");
        const heroPhoto = document.querySelector(".hero-photo");
        const profileFrame = document.querySelector(".profile-frame");

        const overviewCards = document.querySelectorAll(".overview-card");
        const educationCards = document.querySelectorAll(".education-item");
        const contactCards = document.querySelectorAll(".contact-card");

        const createStartupScreen = () => {
            if (reducedMotion.matches) {
                document.body.classList.add("luxury-ready");
                return;
            }

            const loader = document.createElement("div");

            loader.className = "luxury-startup";

            loader.setAttribute("aria-hidden", "true");

            loader.innerHTML = `
                <div class="luxury-startup-content">
                    <div class="luxury-startup-line"></div>
                    <h1 class="luxury-startup-title">
                        NICOLE<span>.</span>
                    </h1>
                    <p class="luxury-startup-subtitle">
                        Personal Portfolio
                    </p>
                    <div class="luxury-startup-progress">
                        <span></span>
                    </div>
                </div>
            `;

            document.body.classList.add("luxury-loading");

            document.body.appendChild(loader);

            const finishStartup = () => {
                document.body.classList.remove("luxury-loading");
                document.body.classList.add("luxury-ready");

                loader.classList.add("is-hidden");

                window.setTimeout(() => {
                    loader.remove();
                }, 900);
            };

            window.setTimeout(finishStartup, 650);
        };

        createStartupScreen();

        const updateNavbar = () => {
            if (!header) return;

            header.classList.toggle(
                "premium-scrolled",
                window.scrollY > 12
            );
        };

        updateNavbar();

        window.addEventListener("scroll", updateNavbar, {
            passive: true
        });

        const revealElements = document.querySelectorAll(
            ".section-heading, " +
            ".about-container, " +
            ".about-description p, " +
            ".educational-background > h3, " +
            ".education-item, " +
            ".overview-heading, " +
            ".overview-card, " +
            ".contact-heading, " +
            ".contact-card"
        );

        const initializeScrollReveal = () => {
            if (reducedMotion.matches) return;

            if (!("IntersectionObserver" in window)) return;

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (!entry.isIntersecting) return;

                        entry.target.classList.add("premium-visible");

                        observer.unobserve(entry.target);
                    });
                },
                {
                    threshold: 0.08,
                    rootMargin: "0px 0px 30px 0px"
                }
            );

            revealElements.forEach((element, index) => {
                element.style.setProperty(
                    "--reveal-delay",
                    `${(index % 4) * 75}ms`
                );

                element.classList.add("premium-reveal");

                observer.observe(element);
            });
        };

        initializeScrollReveal();

        const initializeCardGlow = () => {
            if (reducedMotion.matches) return;

            if (!window.matchMedia("(hover: hover)").matches) return;

            overviewCards.forEach((card) => {
                card.addEventListener("pointermove", (event) => {
                    const rect = card.getBoundingClientRect();

                    card.style.setProperty(
                        "--mouse-x",
                        `${event.clientX - rect.left}px`
                    );

                    card.style.setProperty(
                        "--mouse-y",
                        `${event.clientY - rect.top}px`
                    );
                }, {
                    passive: true
                });

                card.addEventListener("pointerleave", () => {
                    card.style.removeProperty("--mouse-x");
                    card.style.removeProperty("--mouse-y");
                });
            });
        };

        initializeCardGlow();

        const initializeCardInteractions = () => {
            const cards = [
                ...overviewCards,
                ...educationCards,
                ...contactCards
            ];

            cards.forEach((card) => {
                card.addEventListener("pointerdown", () => {
                    card.classList.add("premium-press");

                    window.setTimeout(() => {
                        card.classList.remove("premium-press");
                    }, 180);
                });
            });
        };

        initializeCardInteractions();

        const initializeProfileEffects = () => {
            if (!profileFrame || reducedMotion.matches) return;

            profileFrame.addEventListener("mouseenter", () => {
                profileFrame.style.animationPlayState = "paused";
            });

            profileFrame.addEventListener("mouseleave", () => {
                profileFrame.style.animationPlayState = "running";
            });

            document.addEventListener("visibilitychange", () => {
                profileFrame.style.animationPlayState =
                    document.hidden ? "paused" : "running";
            });
        };

        initializeProfileEffects();

        const initializeSmoothNavigation = () => {
            const links = document.querySelectorAll('a[href^="#"]');

            links.forEach((link) => {
                link.addEventListener("click", (event) => {
                    const href = link.getAttribute("href");

                    if (!href || href === "#") return;

                    const target = document.getElementById(
                        href.substring(1)
                    );

                    if (!target) return;

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: reducedMotion.matches
                            ? "auto"
                            : "smooth",
                        block: "start"
                    });
                });
            });
        };

        initializeSmoothNavigation();

        const initializeKeyboardAccessibility = () => {
            document.addEventListener("keydown", (event) => {
                if (event.key !== "Tab") return;

                document.body.classList.add("keyboard-navigation");
            });

            document.addEventListener("pointerdown", () => {
                document.body.classList.remove("keyboard-navigation");
            });
        };

        initializeKeyboardAccessibility();

        const initializeButtonEffects = () => {
            document.addEventListener("pointerdown", (event) => {
                const button = event.target.closest(
                    "button, a[class*='btn']"
                );

                if (!button) return;

                button.classList.add("premium-press");

                window.setTimeout(() => {
                    button.classList.remove("premium-press");
                }, 180);
            }, {
                passive: true
            });
        };

        initializeButtonEffects();

        const initializePageReturn = () => {
            window.addEventListener("pageshow", (event) => {
                if (!event.persisted) return;

                document.body.classList.remove("luxury-loading");
                document.body.classList.add("luxury-ready");

                document.querySelector(".luxury-startup")?.remove();
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

(() => {
    "use strict";

    const initLuxuryAbout = () => {
        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

        const cards = document.querySelectorAll(
            ".about-description p, .education-item"
        );

        if (reducedMotion.matches) return;

        if (!window.matchMedia("(hover: hover)").matches) return;

        cards.forEach((card) => {
            card.addEventListener("pointermove", (event) => {
                const rect = card.getBoundingClientRect();

                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;

                card.style.setProperty("--mouse-x", `${x}px`);
                card.style.setProperty("--mouse-y", `${y}px`);
            }, {
                passive: true
            });

            card.addEventListener("pointerleave", () => {
                card.style.removeProperty("--mouse-x");
                card.style.removeProperty("--mouse-y");
            });
        });
    };

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initLuxuryAbout,
            { once: true }
        );
    } else {
        initLuxuryAbout();
    }
})();

(() => {
    "use strict";

    const initLuxuryPortfolio = () => {
        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

        if (reducedMotion.matches) return;

        if (!window.matchMedia("(hover: hover)").matches) return;

        const cards = document.querySelectorAll(
            ".overview-card, .contact-card"
        );

        cards.forEach((card) => {
            card.addEventListener("pointermove", (event) => {
                const rect = card.getBoundingClientRect();

                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;

                card.style.setProperty(
                    "--mouse-x",
                    `${x}px`
                );

                card.style.setProperty(
                    "--mouse-y",
                    `${y}px`
                );
            }, {
                passive: true
            });

            card.addEventListener("pointerleave", () => {
                card.style.removeProperty("--mouse-x");
                card.style.removeProperty("--mouse-y");
            });
        });
    };

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initLuxuryPortfolio,
            { once: true }
        );
    } else {
        initLuxuryPortfolio();
    }
})();