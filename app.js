/* ==========================================================================
   AETERNA LUXURY WATCHES - INTERACTIVE LOGIC & ANIMATIONS (EXPANDED & POLISHED)
   ========================================================================== */

// 1. Brand Watch Database (For Collection Details Overlay)
const WATCH_DATABASE = {
    chrono: {
        name: "The Chrono",
        tag: "LIMITED ATELIER RUN / 50 UNITS",
        price: "$45,000 USD",
        desc: "Designed for the modern horological purist who demands mechanical complexity, The Chrono features a brushed steel bezel with custom tachymetric engravings and a signature hand-painted champagne gold skeleton dial. Its three concentric sub-dials track time with immaculate precision.",
        img: "assets/chrono_watch.webp",
        features: [
            "AETERNA Caliber 9003 Double Barrel Mechanical Chronograph",
            "72-hour power reserve with twin escapement architecture",
            "Grade 5 Brushed Titanium chassis and solid sapphire crystal backplate",
            "Premium Hand-stitched matte black alligator leather strap",
            "Generational Swiss Certificate of Horological Authenticity"
        ]
    },
    minimalist: {
        name: "The Minimalist",
        tag: "THE DESIGN CLASSIC EDITION",
        price: "$38,000 USD",
        desc: "Stripped of all excess, The Minimalist is a testament to the power of negative space. An ultra-slim 8.2mm chassis houses a beautiful open-heart caliber, putting the balance wheel on display. The micro-brushed golden hands float over a deep charcoal sandblasted dial plate.",
        img: "assets/minimalist_watch.webp",
        features: [
            "AETERNA Caliber 9001 Ultra-thin Skeleton Movement",
            "60-hour power reserve with high-efficiency mainspring",
            "Polished surgical-grade 316L stainless steel structural bezel",
            "Interlocking stainless steel mesh strap with magnetic gold clasp",
            "Individually numbered engraved crown detailing"
        ]
    },
    stealth: {
        name: "The Stealth",
        tag: "TITANIUM CARBON MONOLITH",
        price: "$52,000 USD",
        desc: "A bold, technological monolith. The Stealth is crafted from a proprietary block of matte black forged carbon fiber and sandblasted dark titanium. The dark open-heart caliber features ruthenium-plated gears and glowing gold luminescent indexes, readable in absolute darkness.",
        img: "assets/stealth_watch.webp",
        features: [
            "AETERNA Caliber 9005 Dark Ruthenium Skeleton Movement",
            "78-hour power reserve with silicon shock-absorption springs",
            "Forged carbon-fiber bezel with matte black ceramic inserts",
            "High-end textured fluorocarbon rubber athletic custom strap",
            "Water-resistance rating verified to a depth of 150 meters"
        ]
    }
};

// 2. Global Elements Initializations & Preloader Fading
document.addEventListener("DOMContentLoaded", () => {
    // Initialize Navigation Router & Header scroll effects
    initializeRouter();
    initializeHeaderScroll();
    
    // Initialize Visual Micro-interactions
    initializeHeritageAnimations();
    initializeEngineeringBlueprint();
    
    // Initialize Bespoke Configurator State
    updateConfiguratorText();

    // Trigger an elegant, high-end 800ms brand logo aura reveal, then fade out the loader overlay!
    const loader = document.getElementById("loader");
    const bar = document.getElementById("loader-bar");
    if (bar) {
        bar.style.width = "100%";
    }
    setTimeout(() => {
        if (loader) {
            loader.classList.add("fade-out");
        }
    }, 850);
});


/* ==========================================================================
   4. SPA Hash-based Router
   ========================================================================== */
let activePageId = "home";
let isTransitioning = false;

function initializeRouter() {
    const navLinks = document.querySelectorAll(".nav-link, .bespoke-cta-nav, .footer-link");
    const menuToggle = document.getElementById("menu-toggle");
    const navLinksContainer = document.getElementById("nav-links-wrapper");
    
    // Handle Mobile Menu Toggle
    if (menuToggle && navLinksContainer) {
        menuToggle.addEventListener("click", () => {
            navLinksContainer.classList.toggle("active");
            menuToggle.classList.toggle("active");
        });
    }

    // Intercept clicks for internal routing
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            const targetHash = link.getAttribute("href");
            if (targetHash.startsWith("#")) {
                e.preventDefault();
                navigate(targetHash.substring(1));
                
                // Close mobile menu if active
                if (navLinksContainer && navLinksContainer.classList.contains("active")) {
                    navLinksContainer.classList.remove("active");
                    menuToggle.classList.remove("active");
                }
            }
        });
    });

    // Handle standard browser back/forward buttons
    window.addEventListener("hashchange", () => {
        const hash = window.location.hash.substring(1) || "home";
        if (hash !== activePageId) {
            navigate(hash);
        }
    });

    // Check starting hash on page load
    const startHash = window.location.hash.substring(1) || "home";
    navigate(startHash, true);
}

function triggerPageAnimations(page) {
    if (!page) return;
    page.querySelectorAll(".scroll-animate-left, .scroll-animate-right").forEach(el => {
        el.classList.add("triggered");
    });
}

function navigate(pageId, isInitial = false) {
    if (isTransitioning && !isInitial) return; // Prevent transition stacking loops
    
    const currentPage = document.getElementById(activePageId);
    const targetPage = document.getElementById(pageId);
    
    if (!targetPage) return; // safety check
    
    // Sync Navigation menu highlights
    document.querySelectorAll(".nav-link").forEach(link => {
        if (link.getAttribute("href") === `#${pageId}`) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });

    // Update global state
    activePageId = pageId;
    window.location.hash = `#${pageId}`;

    if (isInitial) {
        // Instant load
        targetPage.classList.add("active", "fade-in");
        triggerPageAnimations(targetPage);
        return;
    }

    isTransitioning = true;

    // Core Fading Transition Logic (600ms matching CSS)
    if (currentPage) {
        currentPage.classList.add("fade-out");
        currentPage.classList.remove("fade-in");
        
        setTimeout(() => {
            currentPage.classList.remove("active", "fade-out");
            
            targetPage.classList.add("active");
            // Force redraw for CSS transition trigger
            targetPage.offsetHeight; 
            targetPage.classList.add("fade-in");
            triggerPageAnimations(targetPage);
            
            // Scroll back to top on page load
            window.scrollTo({ top: 0, behavior: "smooth" });
            
            isTransitioning = false;
        }, 550);
    } else {
        targetPage.classList.add("active");
        targetPage.offsetHeight;
        targetPage.classList.add("fade-in");
        triggerPageAnimations(targetPage);
        isTransitioning = false;
    }
}

// Shrink Header on Scroll
function initializeHeaderScroll() {
    const header = document.querySelector(".global-header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });
}





/* ==========================================================================
   6. Page 2: Heritage Scroll entrance Observer
   ========================================================================== */
function initializeHeritageAnimations() {
    const animateElements = document.querySelectorAll(".scroll-animate-left, .scroll-animate-right");
    
    if (animateElements.length === 0) return;
    
    const observerOptions = {
        root: null, // viewport
        threshold: 0.15, // trigger when 15% visible
        rootMargin: "0px 0px -50px 0px"
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("triggered");
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animateElements.forEach(el => observer.observe(el));
}


/* ==========================================================================
   7. Page 3: Collection Modals & Atelier Configurator
   ========================================================================== */
function openWatchModal(watchKey) {
    const modal = document.getElementById("watch-modal");
    const watchData = WATCH_DATABASE[watchKey];
    
    if (!modal || !watchData) return;
    
    // Inject dynamic database details
    document.getElementById("modal-watch-img").src = watchData.img;
    document.getElementById("modal-watch-img").alt = watchData.name;
    document.getElementById("modal-watch-tag").innerText = watchData.tag;
    document.getElementById("modal-watch-name").innerText = watchData.name;
    document.getElementById("modal-watch-price").innerText = watchData.price;
    document.getElementById("modal-watch-desc").innerText = watchData.desc;
    
    // Inject specs list
    const featuresList = document.getElementById("modal-watch-features");
    featuresList.innerHTML = ""; // clear list
    watchData.features.forEach(feat => {
        const li = document.createElement("li");
        li.innerText = feat;
        featuresList.appendChild(li);
    });
    
    // Activate modal fading classes
    modal.classList.add("active");
    document.body.style.overflow = "hidden"; // block background scrolls
}

function closeWatchModal() {
    const modal = document.getElementById("watch-modal");
    if (!modal) return;
    
    modal.classList.remove("active");
    document.body.style.overflow = ""; // restore scrolls
}

// Close modal if clicking background overlay
document.getElementById("watch-modal")?.addEventListener("click", (e) => {
    if (e.target === document.getElementById("watch-modal")) {
        closeWatchModal();
    }
});


// Interactive Bespoke Atelier Configurator
let configStrap = "leather";
let configDial = "gold";
let configCrown = "gold";

function updateConfigurator(category, value) {
    // 1. Sync button states inside active category row
    const buttons = document.querySelectorAll(`.config-btn[data-type="${category}"]`);
    buttons.forEach(btn => {
        if (btn.getAttribute("data-value") === value) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });

    // Update state parameters
    if (category === "strap") configStrap = value;
    if (category === "dial") configDial = value;
    if (category === "crown") configCrown = value;

    // 2. Update Left visual component states
    const strapTop = document.getElementById("preview-strap-top");
    const strapBottom = document.getElementById("preview-strap-bottom");
    const dialPlate = document.getElementById("preview-dial-plate");

    if (strapTop && strapBottom) {
        // Reset classes
        strapTop.className = "config-strap-left";
        strapBottom.className = "config-strap-right";
        
        // Apply class based on state
        if (configStrap === "mesh") {
            strapTop.classList.add("mesh-strap");
            strapBottom.classList.add("mesh-strap");
        } else if (configStrap === "rubber") {
            strapTop.classList.add("rubber-strap");
            strapBottom.classList.add("rubber-strap");
        }
    }

    if (dialPlate) {
        dialPlate.className = "config-dial-plate";
        
        if (configDial === "ruthenium") dialPlate.classList.add("ruthenium-dial");
        else if (configDial === "steel") dialPlate.classList.add("steel-dial");
        
        // Custom interactive scaling animation on change
        dialPlate.style.transform = "scale(1.08)";
        setTimeout(() => {
            dialPlate.style.transform = "scale(1)";
        }, 150);
    }

    // 3. Render updated custom technical summary description
    updateConfiguratorText();
}

function updateConfiguratorText() {
    const summary = document.getElementById("config-summary-text");
    if (!summary) return;

    const strapNames = { leather: "Premium Alligator Leather", mesh: "Brushed Titanium Mesh", rubber: "Tactical Matte Rubber" };
    const dialNames = { gold: "Champagne Gold Open-Heart", ruthenium: "Deep Ruthenium Sandblasted", steel: "Brushed Stainless Steel" };
    const crownNames = { gold: "Polished Champagne Gold", silver: "Surgical Silver Steel", carbon: "Matte Carbon Fiber" };

    summary.innerHTML = `Custom Build Profile: Selected a <span class="accent-glow">${dialNames[configDial]}</span> face, mounted on a <span class="accent-glow">${strapNames[configStrap]}</span> strap, completed with a <span class="accent-glow">${crownNames[configCrown]}</span> fluted crown accent.`;
}

// Synchronize Custom Configurator selections directly to inquiry forms
function syncConfigToInquiry() {
    const formSelection = document.getElementById("inquiry-type");
    const messageField = document.getElementById("inquirer-message");
    
    if (!formSelection || !messageField) return;

    const strapNames = { leather: "Alligator Leather", mesh: "Titanium Mesh", rubber: "Tactical Rubber" };
    const dialNames = { gold: "Champagne Gold", ruthenium: "Deep Ruthenium", steel: "Brushed Steel" };
    const crownNames = { gold: "Polished Gold", silver: "Surgical Silver", carbon: "Matte Carbon" };

    // Select "Bespoke" Option
    formSelection.value = "chrono"; // default bespoke category anchor
    
    // Auto-populate luxury textarea message
    messageField.value = `[Atelier Configuration Allocation Profile Request] \nCustom design locked in: \n- Strap: ${strapNames[configStrap]} \n- Dial Finish: ${dialNames[configDial]} \n- Crown Accent: ${crownNames[configCrown]} \n\nI wish to apply for an active component allocation to commission this assembly. Please advise quota availability.`;
    
    // Navigate smoothly to contact page
    navigate("contact");
    
    // Trigger outline label animation on inputs by forcing input checks
    messageField.offsetHeight;
}


/* ==========================================================================
   8. Page 4: Interactive Engineering Schematic Highlights
   ========================================================================== */
function initializeEngineeringBlueprint() {
    const specRows = document.querySelectorAll(".specs-row");
    const highlightCircles = document.querySelectorAll(".blueprint-highlight");
    const blueprintIndicator = document.getElementById("blueprint-indicator");
    
    if (specRows.length === 0) return;
    
    // Define specification helper explanations to display in the blueprint
    const SPEC_GUIDES = {
        caliber: "AETERNA Caliber 9000: skeletonized layout showing double barrels.",
        reserve: "Twin Escapement: 72-hour mechanical reserve, micro-coiled hairspring.",
        chassis: "Grade 5 Titanium Bezel: aerospace alloy casing, gold accent ring.",
        dial: "Open-Heart Dial: sapphire plate revealing complex gears.",
        jewels: "Jeweled Pivots: 33 ruby placements reducing operational friction.",
        water: "Screw-Down Crown: custom double-gasket waterproof security."
    };

    specRows.forEach(row => {
        const specName = row.getAttribute("data-highlight");
        
        // Hover activations
        row.addEventListener("mouseenter", () => {
            activateSpecHighlight(specName);
        });
        
        row.addEventListener("mouseleave", () => {
            deactivateAllSpecHighlights();
        });

        // Click lock-in activations
        row.addEventListener("click", () => {
            // Remove locks on others
            specRows.forEach(r => r.classList.remove("active-spec"));
            row.classList.add("active-spec");
            
            activateSpecHighlight(specName, true);
        });
    });

    function activateSpecHighlight(specName, isLocked = false) {
        // If not locked, remove temporary hover outlines
        highlightCircles.forEach(circle => {
            circle.classList.remove("active");
        });
        
        const activeCircle = document.getElementById(`highlight-${specName}`);
        if (activeCircle) {
            activeCircle.classList.add("active");
        }
        
        if (blueprintIndicator && SPEC_GUIDES[specName]) {
            blueprintIndicator.innerText = SPEC_GUIDES[specName];
            blueprintIndicator.style.color = "#00ffff";
        }
    }

    function deactivateAllSpecHighlights() {
        // If there's an active-spec clicked row, preserve that highlight
        const lockedRow = document.querySelector(".specs-row.active-spec");
        
        if (lockedRow) {
            const specName = lockedRow.getAttribute("data-highlight");
            activateSpecHighlight(specName, true);
        } else {
            // Remove all
            highlightCircles.forEach(circle => {
                circle.classList.remove("active");
            });
            if (blueprintIndicator) {
                blueprintIndicator.innerText = "Hover over specifications on the right to inspect architecture.";
                blueprintIndicator.style.color = "";
            }
        }
    }
}


/* ==========================================================================
   9. Page 5: Private Allocation Form Submission
   ========================================================================== */
function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = document.getElementById("bespoke-inquiry-form");
    const successOverlay = document.getElementById("form-success-overlay");
    const tokenDisplay = document.getElementById("allocation-token");
    
    if (!form || !successOverlay) return;
    
    // Generate private client token ID
    const randomToken = "AE-" + Math.floor(1000 + Math.random() * 9000);
    if (tokenDisplay) {
        tokenDisplay.innerText = randomToken;
    }
    
    // Fade in premium success layout
    successOverlay.classList.add("active");
}

function resetFormState() {
    const form = document.getElementById("bespoke-inquiry-form");
    const successOverlay = document.getElementById("form-success-overlay");
    
    if (form) {
        form.reset(); // clear values
    }
    
    if (successOverlay) {
        successOverlay.classList.remove("active");
    }
}
