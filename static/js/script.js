document.addEventListener("DOMContentLoaded", function () {

    // --- 0. INITIALIZE AOS (SCROLL ANIMATIONS) ---
    AOS.init({
        duration: 400,  // Animation lasts 400ms
        once: true,     // Only animate once (don't fade out when scrolling up)
        offset: 80      // Trigger animation 80px before element is visible
    });

    // --- 1. SPOTLIGHT EFFECT ---
    const cards = document.querySelectorAll(".card, .ratio");
    cards.forEach((card) => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty("--x", `${x}px`);
            card.style.setProperty("--y", `${y}px`);
        });
    });

    // --- 2. COOLORS TEXT EFFECT ---
    // Target the specific elements: Navbar Name & Hero Title
    const textElements = document.querySelectorAll(".navbar-brand, .hero-title");

    // Bright neon palette for Dark Mode
    const colors = [
        "#FF0055", // Neon Red
        "#00DDFF", // Cyan
        "#FFDD00", // Yellow
        "#FF00CC", // Magenta
        "#00FF66"  // Lime Green
    ];

    textElements.forEach(element => {
        // Use childNodes to safely handle the <br> tag in the title
        let newHtml = "";

        element.childNodes.forEach(node => {
            if (node.nodeType === 3) {
                // If it's text, split into individual letters
                const chars = node.textContent.split("");
                chars.forEach(char => {
                    if (char.trim() === "") {
                        newHtml += " "; // Keep spaces as is
                    } else {
                        // Wrap letter in span
                        newHtml += `<span class="hover-char">${char}</span>`;
                    }
                });
            } else {
                // If it's an element (like <br>), keep it
                newHtml += node.outerHTML;
            }
        });

        // Update the HTML
        element.innerHTML = newHtml;
    });

    // Add Hover Event Listeners to the new spans
    const chars = document.querySelectorAll(".hover-char");
    chars.forEach(char => {
        char.addEventListener("mouseover", function () {
            // Pick a random color
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            this.style.color = randomColor;
            this.style.transition = "color 0.05s ease"; // Instant change
        });

        char.addEventListener("mouseout", function () {
            // Revert to original color
            this.style.color = "inherit";
            // 1. Wait 1.5 second (delay)
            // 2. Then snap back to white in 0.1 seconds
            this.style.transition = "color 0.1s ease 2s";
        });
    });

    // --- 3. TIME TRAVEL (RETRO MODE) ---
    const retroBtn = document.getElementById("retro-toggle");
    const body = document.body;
    const audio = document.getElementById("retro-audio");
    const retroControls = document.getElementById("retro-controls");

    // Check if user already activated it before
    if (localStorage.getItem("theme") === "retro") {
        body.classList.add("retro-mode");
        retroBtn.innerText = "[ Back to Future ]";
    }

    retroBtn.addEventListener("click", () => {
        body.classList.toggle("retro-mode");

        if (body.classList.contains("retro-mode")) {
            // SWITCHING TO RETRO
            localStorage.setItem("theme", "retro");
            retroBtn.innerText = "[ Back to Future ]";

            // Show Controls
            if (retroControls) retroControls.style.display = "block";

            // Try to play music (User interaction required by browsers)
            if (audio) {
                audio.volume = 0.3; // (30% volume)
                audio.play().catch(error => {
                    console.log("Autoplay prevented by browser:", error);
                });
            }

            // Disable Animations
            document.querySelectorAll('[data-aos]').forEach(el => {
                el.removeAttribute('data-aos');
            });
        } else {
            // SWITCHING BACK TO MODERN
            localStorage.setItem("theme", "modern");
            retroBtn.innerText = "[ Switch to 2007 ]";

            if (retroControls) retroControls.style.display = "none";
            if (audio) {
                audio.pause();
                audio.currentTime = 0; // Rewind to start
            }

            // because AOS calculates positions on load.
            location.reload();
        }
    });
    // Helper function to toggle music manually
    window.toggleMusic = function () {
        const audio = document.getElementById("retro-audio");
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    };
});