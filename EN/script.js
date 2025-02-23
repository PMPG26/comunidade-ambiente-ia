document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript loaded!");

    /* ======= LANGUAGE SWITCH BUTTON ======= */
    const langToggle = document.createElement("button");
    langToggle.id = "langToggle";
    langToggle.innerText = "PT";
    langToggle.style.position = "absolute";
    langToggle.style.top = "15px";
    langToggle.style.right = "15px";
    langToggle.style.padding = "5px 10px";
    langToggle.style.cursor = "pointer";
    langToggle.style.border = "none";
    langToggle.style.background = "#1b5e20";
    langToggle.style.color = "white";
    langToggle.style.fontWeight = "bold";
    document.body.appendChild(langToggle);

    langToggle.addEventListener("click", function () {
        window.location.href = "../index.html";
    });

    /* ======= HAMBURGER MENU ======= */
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", function () {
            navLinks.classList.toggle("active");
            console.log("Hamburger menu clicked!");
        });
    } else {
        console.error("Error: Menu elements not found!");
    }

    /* ======= DARK MODE ======= */
    const darkModeToggle = document.getElementById("darkModeToggle");

    function applyDarkMode() {
        if (localStorage.getItem("darkMode") === "enabled") {
            document.body.classList.add("dark-mode");
            darkModeToggle.innerText = "☀️";
        } else {
            darkModeToggle.innerText = "🌙";
        }
    }

    applyDarkMode();

    darkModeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        const isDark = document.body.classList.contains("dark-mode");
        localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");
        darkModeToggle.innerText = isDark ? "☀️" : "🌙";
    });

    /* ======= BACK TO TOP BUTTON ======= */
    const backToTopButton = document.getElementById("backToTop");

    if (backToTopButton) {
        window.addEventListener("scroll", function () {
            if (window.scrollY > 200) {
                backToTopButton.style.display = "block";
            } else {
                backToTopButton.style.display = "none";
            }
        });

        backToTopButton.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    /* ======= CHATBOT ======= */
    const chatbotToggle = document.getElementById("chatbot-toggle");
    const chatbotContainer = document.querySelector(".chatbot-container");
    const chatBox = document.getElementById("chatBox");
    const userInput = document.getElementById("userInput");
    const sendMessage = document.getElementById("sendMessage");

    if (chatbotToggle) {
        chatbotToggle.addEventListener("click", function () {
            chatbotContainer.style.display = chatbotContainer.style.display === "block" ? "none" : "block";
        });
    }

    const chatbotResponses = {
        "hello": "Hello! How can I assist you today? 😊",
        "who are you?": "I'm EcoBot, an assistant specialized in environment and AI! 🌱",
        "what is the environment and ai community?": "Our community explores technology for a more sustainable future. 🌍",
        "how can I participate?": "You can participate in several ways! Choose an option:",
        "goodbye": "See you soon! Always here to help. 👋",
        "default": "Sorry, I didn't understand. Can you rephrase your question?"
    };

    function getBotResponse(userMessage) {
        const lowerCaseMessage = userMessage.toLowerCase();
        return chatbotResponses[lowerCaseMessage] || chatbotResponses["default"];
    }

    function showTypingIndicator() {
        const typingMessage = document.createElement("p");
        typingMessage.classList.add("bot-message");
        typingMessage.innerText = "EcoBot is typing...";
        typingMessage.id = "typingIndicator";
        chatBox.appendChild(typingMessage);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function hideTypingIndicator() {
        const typingIndicator = document.getElementById("typingIndicator");
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    sendMessage.addEventListener("click", function () {
        const userText = userInput.value.trim();
        if (userText === "") return;

        chatBox.innerHTML += `<p class="user-message">${userText}</p>`;
        userInput.value = "";

        showTypingIndicator();
        setTimeout(() => {
            hideTypingIndicator();
            chatBox.innerHTML += `<p class="bot-message">${getBotResponse(userText)}</p>`;
            chatBox.scrollTop = chatBox.scrollHeight;
        }, 1500);
    });

    userInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            sendMessage.click();
        }
    });

    console.log("script-en.js loaded successfully.");
});
