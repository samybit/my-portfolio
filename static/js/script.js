document.addEventListener("DOMContentLoaded", function () {

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
});