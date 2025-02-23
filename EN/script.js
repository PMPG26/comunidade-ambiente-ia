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

    // Respostas pré-definidas
    const respostas = {
        "hello": "Hello! How can I assist you today? 😊",
        "who are you?": "I'm EcoBot, an assistant specialized in environment and AI! 🌱",
        "what is the environment and ai community?": "Our community explores technology for a more sustainable future. 🌍",
        "how can I participate?": "You can participate in several ways! Choose an option:",
        "goodbye": "See you soon! Always here to help. 👋",
        "default": "Sorry, I didn't understand. Can you rephrase your question?"
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

    function addQuickReplies(options) {
        const quickReplyContainer = document.createElement("div");
        quickReplyContainer.classList.add("quick-replies");

        options.forEach(option => {
            const button = document.createElement("button");
            button.innerText = option;
            button.addEventListener("click", function () {
                userInput.value = option;
                sendMessage.click();
            });
            quickReplyContainer.appendChild(button);
        });

        chatBox.appendChild(quickReplyContainer);
        chatBox.scrollTop = chatBox.scrollHeight;
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

    function saveChatHistory() {
        const messages = chatBox.innerHTML;
        localStorage.setItem("chatHistory", messages);
    }

    function loadChatHistory() {
        const savedMessages = localStorage.getItem("chatHistory");
        if (savedMessages) {
            chatBox.innerHTML = savedMessages;
        }
    }

    const notificationSound = new Audio("sounds/notificacao.mp3");

    function playNotificationSound() {
        notificationSound.play();
    }

    loadChatHistory(); // Carregar histórico ao iniciar a página

    sendMessage.addEventListener("click", function () {
        const userText = userInput.value.trim();
        if (userText === "") return;

        addMessage(userText, "user");
        userInput.value = "";

        showTypingIndicator();
        setTimeout(() => {
            hideTypingIndicator();
            addMessage(getBotResponse(userText), "bot");
            playNotificationSound();
            saveChatHistory();

            if (userText.toLowerCase() === "how can I participate?") {
                addQuickReplies(["Events", "Blog", "Contact"]);
            }
        }, 1500);
    });

    userInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            sendMessage.click();
        }
    });
});
