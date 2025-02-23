document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript carregado!");

    /* ======= DETECTAR IDIOMA ======= */
    const lang = window.location.pathname.includes("/EN/") ? "en" : "pt";

    /* ======= BOTÃO DE TROCA DE IDIOMA ======= */
    const langToggle = document.createElement("button");
    langToggle.id = "langToggle";
    langToggle.innerText = window.location.pathname.includes("/EN/") ? "PT" : "EN";
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
        if (window.location.pathname.includes("/EN/")) {
            window.location.href = window.location.href.replace("/EN/", "/");
        } else {
            window.location.href = window.location.href.replace("/index.html", "/EN/index.html");
        }
    });

    /* ======= TRADUÇÕES ======= */
    const translations = {
        pt: {
            menuClick: "Menu hamburguer clicado!",
            menuError: "Erro: Elementos do menu não encontrados!",
            chatbotTyping: "EcoBot está a escrever...",
            chatbotResponses: {
                "olá": "Olá! Como posso ajudar-te hoje? 😊",
                "quem és tu?": "Sou o EcoBot, um assistente especializado em ambiente e IA! 🌱",
                "o que é a comunidade de ambiente e ia?": "A nossa comunidade explora tecnologia para um futuro mais sustentável. 🌍",
                "como posso participar?": "Podes participar de várias formas! Escolhe uma opção:",
                "adeus": "Até breve! Sempre aqui para ajudar. 👋",
                "default": "Desculpa, não entendi. Podes reformular a tua pergunta?"
            }
        },
        en: {
            menuClick: "Hamburger menu clicked!",
            menuError: "Error: Menu elements not found!",
            chatbotTyping: "EcoBot is typing...",
            chatbotResponses: {
                "hello": "Hello! How can I assist you today? 😊",
                "who are you?": "I'm EcoBot, an assistant specialized in environment and AI! 🌱",
                "what is the environment and ai community?": "Our community explores technology for a more sustainable future. 🌍",
                "how can I participate?": "You can participate in several ways! Choose an option:",
                "goodbye": "See you soon! Always here to help. 👋",
                "default": "Sorry, I didn't understand. Can you rephrase your question?"
            }
        }
    };

    /* ======= TEU CÓDIGO ORIGINAL ABAIXO ======= */

    /* ======= MENU HAMBURGUER ======= */
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", function () {
            navLinks.classList.toggle("active");
            console.log(translations[lang].menuClick);
        });
    } else {
        console.error(translations[lang].menuError);
    }

    /* ======= MODO ESCURO GLOBAL ======= */
    const darkModeToggle = document.getElementById("darkModeToggle");

    function aplicarModoEscuro() {
        if (localStorage.getItem("darkMode") === "enabled") {
            document.body.classList.add("dark-mode");
            darkModeToggle.innerText = "☀️"; // Sol no modo escuro
        } else {
            darkModeToggle.innerText = "🌙"; // Lua no modo claro
        }
    }

    aplicarModoEscuro();

    darkModeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        const isDark = document.body.classList.contains("dark-mode");
        localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");
        darkModeToggle.innerText = isDark ? "☀️" : "🌙";
    });

    /* ======= BOTÃO "VOLTAR AO TOPO" ======= */
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

    /* ======= NOTIFICAÇÃO DO BLOG ======= */
    const notification = document.getElementById("notification");
    const closeNotification = document.getElementById("closeNotification");

    if (notification && closeNotification) {
        closeNotification.addEventListener("click", function () {
            notification.style.display = "none";
        });
    }

    /* ======= ANIMAÇÃO "FADE-IN" AO ROLAR ======= */
    const fadeElements = document.querySelectorAll(".fade-in");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    fadeElements.forEach(element => {
        observer.observe(element);
    });

    /* ======= CHATBOT LOCAL ======= */
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

    function getBotResponse(userMessage) {
        const lowerCaseMessage = userMessage.toLowerCase();
        return translations[lang].chatbotResponses[lowerCaseMessage] || translations[lang].chatbotResponses["default"];
    }

    function showTypingIndicator() {
        const typingMessage = document.createElement("p");
        typingMessage.classList.add("bot-message");
        typingMessage.innerText = translations[lang].chatbotTyping;
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









