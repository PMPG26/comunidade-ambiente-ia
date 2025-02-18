document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript carregado!");

    /* ======= MENU HAMBURGUER ======= */
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", function () {
            navLinks.classList.toggle("active");
        });

        // Fechar menu ao clicar num link
        document.querySelectorAll(".nav-links a").forEach(link => {
            link.addEventListener("click", function () {
                navLinks.classList.remove("active");
            });
        });

        // Fechar menu ao clicar fora dele
        document.addEventListener("click", function (event) {
            if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
                navLinks.classList.remove("active");
            }
        });

        // Fechar menu com tecla Esc
        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                navLinks.classList.remove("active");
            }
        });
    }

    /* ======= MODO ESCURO ======= */
    const darkModeToggle = document.getElementById("darkModeToggle");

    function aplicarModoEscuro() {
        if (localStorage.getItem("darkMode") === "enabled") {
            document.body.classList.add("dark-mode");
            darkModeToggle.innerText = "☀️";
        } else {
            darkModeToggle.innerText = "🌙";
        }
    }

    aplicarModoEscuro();

    if (darkModeToggle) {
        darkModeToggle.addEventListener("click", function () {
            document.body.classList.toggle("dark-mode");

            if (document.body.classList.contains("dark-mode")) {
                localStorage.setItem("darkMode", "enabled");
                darkModeToggle.innerText = "☀️";
            } else {
                localStorage.setItem("darkMode", "disabled");
                darkModeToggle.innerText = "🌙";
            }
        });
    }

    /* ======= BOTÃO "VOLTAR AO TOPO" ======= */
    const backToTopButton = document.getElementById("backToTop");

    if (backToTopButton) {
        window.addEventListener("scroll", function () {
            backToTopButton.style.display = window.scrollY > 200 ? "block" : "none";
        });

        backToTopButton.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    /* ======= CHATBOT ======= */
    const chatbotToggle = document.getElementById("chatbot-toggle");
    const chatbotContainer = document.querySelector(".chatbot-container");
    const chatBox = document.getElementById("chatBox");
    const userInput = document.getElementById("userInput");
    const sendMessage = document.getElementById("sendMessage");

    const respostas = {
        "olá": "Olá! Como posso ajudar-te hoje? 😊",
        "quem és tu?": "Sou o EcoBot, um assistente especializado em ambiente e IA! 🌱",
        "o que é a comunidade de ambiente e ia?": "A nossa comunidade explora tecnologia para um futuro mais sustentável. 🌍",
        "como posso participar?": "Podes participar de várias formas! Escolhe uma opção:",
        "adeus": "Até breve! Sempre aqui para ajudar. 👋",
        "default": "Desculpa, não entendi. Podes reformular a tua pergunta?"
    };

    function addMessage(text, type) {
        const message = document.createElement("p");
        message.classList.add(type === "bot" ? "bot-message" : "user-message");
        message.innerText = text;
        chatBox.appendChild(message);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function getBotResponse(userMessage) {
        return respostas[userMessage.toLowerCase()] || respostas["default"];
    }

    function saveChatHistory() {
        localStorage.setItem("chatHistory", chatBox.innerHTML);
    }

    function loadChatHistory() {
        const savedMessages = localStorage.getItem("chatHistory");
        if (savedMessages) {
            chatBox.innerHTML = savedMessages;
        }
    }

    loadChatHistory();

    if (chatbotToggle) {
        chatbotToggle.addEventListener("click", function () {
            chatbotContainer.style.display = chatbotContainer.style.display === "block" ? "none" : "block";
            chatbotContainer.classList.add("fade-in");
        });
    }

    sendMessage.addEventListener("click", function () {
        const userText = userInput.value.trim();
        if (userText === "") return;

        addMessage(userText, "user");
        userInput.value = "";

        setTimeout(() => {
            addMessage(getBotResponse(userText), "bot");
            saveChatHistory();
        }, 1500);
    });

    userInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            sendMessage.click();
        }
    });

    /* ======= OTIMIZAÇÃO DE PERFORMANCE ======= */
    document.querySelectorAll("img").forEach(img => {
        img.setAttribute("loading", "lazy");
    });

    // Pré-carregar recursos essenciais
    const preloadResources = ["css/style.min.css", "script.min.js"];
    preloadResources.forEach(resource => {
        const link = document.createElement("link");
        link.rel = "preload";
        link.href = resource;
        link.as = resource.endsWith(".css") ? "style" : "script";
        document.head.appendChild(link);
    });
});





