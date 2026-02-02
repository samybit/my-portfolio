document.addEventListener("DOMContentLoaded", function () {

    // --- 0. INITIALIZE AOS (SCROLL ANIMATIONS) ---
    AOS.init({
        duration: 800,  // Animation lasts 000ms
        once: true,     // Only animate once (don't fade out when scrolling up)
        offset: 50      // Trigger animation 00px before element is visible
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
    const retroPlayer = document.getElementById("retro-player");
    const volumeSlider = document.getElementById("retro-volume");

    // Elements for the visualizer
    const bitrateEl = document.getElementById("retro-bitrate");
    const khzEl = document.getElementById("retro-khz");
    const stereoEl = document.getElementById("retro-stereo");

    let visualizerInterval = null; // Variable to store the timer

    // Helper: Stop function
    window.stopMusic = function () {
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
    };

    if (volumeSlider && audio) {
        volumeSlider.addEventListener("input", (e) => {
            audio.volume = e.target.value;
        });
    }

    // Check localStorage
    if (localStorage.getItem("theme") === "retro") {
        body.classList.add("retro-mode");
        retroBtn.innerText = "[ Back to Future ]";
        if (retroPlayer) retroPlayer.style.display = "flex";
        startVisualizer(); // Start effects immediately if loaded in retro mode
    }

    function startVisualizer() {
        if (visualizerInterval) clearInterval(visualizerInterval); // clear existing to be safe

        visualizerInterval = setInterval(() => {
            // 1. Randomize Bitrate (Classic VBR behavior: 128, 160, 192, etc)
            const bitrates = [128, 160, 192, 224, 320, 128, 128, 192];
            const randomBitrate = bitrates[Math.floor(Math.random() * bitrates.length)];

            // 2. Randomize kHz slightly (Glitch effect)
            // Mostly stay at 44, rarely flicker to 48 or 22
            const khzOptions = [44, 44, 44, 44, 44, 48, 22];
            const randomKhz = khzOptions[Math.floor(Math.random() * khzOptions.length)];

            // 3. Flicker Stereo (Blink effect)
            const isStereo = Math.random() > 0.1; // 90% chance to show

            if (bitrateEl) bitrateEl.innerText = randomBitrate;
            if (khzEl) khzEl.innerText = randomKhz;
            if (stereoEl) stereoEl.style.visibility = isStereo ? "visible" : "hidden";

        }, 200); // Update every 200ms
    }

    function stopVisualizer() {
        if (visualizerInterval) {
            clearInterval(visualizerInterval);
            visualizerInterval = null;
        }
    }

    retroBtn.addEventListener("click", () => {
        body.classList.toggle("retro-mode");

        if (body.classList.contains("retro-mode")) {
            // SWITCHING TO RETRO
            localStorage.setItem("theme", "retro");
            retroBtn.innerText = "[ Back to Future ]";
            if (retroPlayer) retroPlayer.style.display = "flex";

            startVisualizer();

            if (audio) {
                audio.volume = 0.3;
                if (volumeSlider) volumeSlider.value = 0.3;
                audio.play().catch(e => console.log(e));
            }

            // Disable AOS
            document.querySelectorAll('[data-aos]').forEach(el => el.removeAttribute('data-aos'));

        } else {
            // SWITCHING BACK
            localStorage.setItem("theme", "modern");
            retroBtn.innerText = "[ Switch to 2007 ]";
            if (retroPlayer) retroPlayer.style.display = "none";

            stopVisualizer(); // <--- STOP THE EFFECT

            if (audio) {
                audio.pause();
                audio.currentTime = 0;
            }
            location.reload();
        }
    });
    // Helper function to toggle music manually
    // window.toggleMusic = function () {
    //     const audio = document.getElementById("retro-audio");
    //     if (audio.paused) {
    //         audio.play();
    //     } else {
    //         audio.pause();
    //     }
    // };

    // --- 4. MARIO EASTER EGG (7 "A" PRESSES) ---
    let jumpKeyCount = 0;
    const marioImg = document.getElementById("mario-egg");
    const marioAudio = document.getElementById("mario-sound");

    document.addEventListener("keydown", function (e) {
        // 0. Only work if Retro Mode is active
        if (!document.body.classList.contains("retro-mode")) {
            return;
        }

        // 1. Ignore if user is typing in a form input
        if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
            return;
        }

        // 2. Check for "A" Key)
        if (e.code === "KeyA") {
            jumpKeyCount++;

            if (jumpKeyCount === 7) {
                triggerMario();
                jumpKeyCount = 0;
            }
        } else {
            // 3. Combo Breaker
            jumpKeyCount = 0;
        }
    });

    function triggerMario() {
        if (!marioImg) return;

        // 1. Play Sound
        if (marioAudio) {
            marioAudio.currentTime = 0;
            marioAudio.play().catch(e => console.log("Audio blocked:", e));
        }

        // 2. START: Set to Jump Pose
        marioImg.src = marioImg.dataset.jump;
        marioImg.classList.add("mario-jump-anim");

        // 3. MIDWAY (1000ms): He just landed. Swap to Stand Pose.
        setTimeout(() => {
            marioImg.src = marioImg.dataset.stand;
        }, 1000);

        // 4. END (2000ms): Animation finished. Clean up.
        setTimeout(() => {
            marioImg.classList.remove("mario-jump-anim");
        }, 2000);
    }

    // --- 6. CLIPPY (THE UNHELPFUL ASSISTANT) ---
    const clippyContainer = document.getElementById("clippy-container");
    const clippyBubble = document.getElementById("clippy-bubble");
    const clippyText = document.getElementById("clippy-text");

    const uselessTips = [
        "It looks like you're trying to view a portfolio. Would you like help with that?",
        "I see you're scrolling. Great job!",
        "Did you know? You can press 'A' 7 times for a secret.",
        "Are you sure you want to be here?",
        "Saving your progress... just kidding!",
        "This looks like a nice spot for a banner ad."
    ];

    function showClippy() {
        // 1. Only run in Retro Mode
        if (!document.body.classList.contains("retro-mode")) {
            if (clippyContainer) clippyContainer.style.display = "none";
            return;
        }

        // 2. Pick a random tip
        const randomTip = uselessTips[Math.floor(Math.random() * uselessTips.length)];
        if (clippyText) clippyText.innerText = randomTip;

        // 3. Show Clippy
        if (clippyContainer) clippyContainer.style.display = "block";
        if (clippyBubble) clippyBubble.style.display = "block";

        // 4. Play a subtle 'pop' sound
        // const audio = new Audio('path/to/pop.mp3'); audio.play();

        // 5. Hide him after 6 seconds
        setTimeout(() => {
            if (clippyContainer) clippyContainer.style.display = "none";
        }, 6000);
    }

    // Loop: Try to show Clippy every 20 seconds
    setInterval(() => {
        // 50% chance he actually shows up each cycle
        if (Math.random() > 0.8) {
            showClippy();
        }
    }, 10000); 

    // Also hide Clippy immediately if the user switches back to Modern Mode
    retroBtn.addEventListener("click", () => {
        if (!document.body.classList.contains("retro-mode")) {
             if (clippyContainer) clippyContainer.style.display = "none";
        }
    });
});