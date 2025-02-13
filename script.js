document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript carregado!");

    /* ======= MENU HAMBURGUER ======= */
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", function () {
            navLinks.classList.toggle("active");
            console.log("Menu hamburguer clicado!");
        });
    } else {
        console.error("Erro: Elementos do menu não encontrados!");
    }

    /* ======= MODO ESCURO GLOBAL ======= */
    const darkModeToggle = document.getElementById("darkModeToggle");

    function aplicarModoEscuro() {
        if (localStorage.getItem("darkMode") === "enabled") {
            document.body.classList.add("dark-mode");
        }
    }

    aplicarModoEscuro(); // Aplica o modo escuro ao carregar a página

    if (darkModeToggle) {
        darkModeToggle.addEventListener("click", function () {
            document.body.classList.toggle("dark-mode");

            if (document.body.classList.contains("dark-mode")) {
                localStorage.setItem("darkMode", "enabled");
            } else {
                localStorage.setItem("darkMode", "disabled");
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

    /* ======= NOTIFICAÇÃO DO BLOG ======= */
    const notification = document.getElementById("notification");
    const closeNotification = document.getElementById("closeNotification");

    if (notification && closeNotification) {
        closeNotification.addEventListener("click", function () {
            notification.style.display = "none";
        });
    }

    /* ======= CHATBOT LOCAL ======= */
    const chatbotToggle = document.getElementById("chatbot-toggle");
    const chatbotContainer = document.querySelector(".chatbot-container");
    const chatBox = document.getElementById("chatBox");
    const userInput = document.getElementById("userInput");
    const sendMessage = document.getElementById("sendMessage");

    // Respostas pré-definidas
    const respostas = {
        "olá": "Olá! Como posso ajudar-te hoje? 😊",
        "quem és tu?": "Sou o EcoBot, um assistente especializado em ambiente e IA! 🌱",
        "o que é a comunidade de ambiente e ia?": "A nossa comunidade explora tecnologia para um futuro mais sustentável. 🌍",
        "como posso participar?": "Podes participar de várias formas! Escolhe uma opção:",
        "adeus": "Até breve! Sempre aqui para ajudar. 👋",
        "default": "Desculpa, não entendi. Podes reformular a tua pergunta?"
    };

    if (chatbotToggle) {
        chatbotToggle.addEventListener("click", function () {
            chatbotContainer.style.display = chatbotContainer.style.display === "block" ? "none" : "block";
        });
    }

    function addMessage(text, type) {
        const message = document.createElement("p");
        message.classList.add(type === "bot" ? "bot-message" : "user-message");
        message.innerText = text;
        chatBox.appendChild(message);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function getBotResponse(userMessage) {
        const lowerCaseMessage = userMessage.toLowerCase();
        return respostas[lowerCaseMessage] || respostas["default"];
    }

    function showTypingIndicator() {
        const typingMessage = document.createElement("p");
        typingMessage.classList.add("bot-message");
        typingMessage.innerText = "EcoBot está a escrever...";
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

        addMessage(userText, "user");
        userInput.value = "";

        showTypingIndicator();
        setTimeout(() => {
            hideTypingIndicator();
            addMessage(getBotResponse(userText), "bot");
        }, 1500);
    });

    userInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            sendMessage.click();
        }
    });
});





