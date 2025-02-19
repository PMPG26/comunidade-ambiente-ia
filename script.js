document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript carregado!");

/* ======= MENU HAMBÚRGUER - CORREÇÃO FINAL ======= */
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", function (event) {
            event.stopPropagation(); // Evita que o clique feche o menu imediatamente
            navLinks.classList.toggle("active");

            if (navLinks.classList.contains("active")) {
                navLinks.style.display = "flex";
            } else {
                setTimeout(() => {
                    navLinks.style.display = "none";
                }, 300); // Tempo igual à transição CSS
            }
        });

        // Fechar o menu ao clicar fora dele
        document.addEventListener("click", function (event) {
            if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
                navLinks.classList.remove("active");
                setTimeout(() => {
                    navLinks.style.display = "none";
                }, 300);
            }
        });

        console.log("Menu hambúrguer funcional!");
    } else {
        console.error("Erro: Elementos do menu não encontrados!");
    }
});

    /* ======= MODO ESCURO - CORREÇÃO FINAL ======= */
document.addEventListener("DOMContentLoaded", function () {
    const darkModeToggle = document.getElementById("darkModeToggle");

    function aplicarModoEscuro() {
        if (localStorage.getItem("darkMode") === "enabled") {
            document.body.classList.add("dark-mode");
            darkModeToggle.innerText = "☀️";
        } else {
            document.body.classList.remove("dark-mode");
            darkModeToggle.innerText = "🌙";
        }
    }

    aplicarModoEscuro(); // Aplica o modo escuro ao carregar a página

    if (darkModeToggle) {
        darkModeToggle.addEventListener("click", function () {
            document.body.classList.toggle("dark-mode");
            const isDark = document.body.classList.contains("dark-mode");
            localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");
            aplicarModoEscuro(); // Garante que o botão também muda
        });
    }
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

    /* ======= CHATBOT - CORREÇÃO FINAL ======= */
document.addEventListener("DOMContentLoaded", function () {
    const chatbotToggle = document.getElementById("chatbot-toggle");
    const chatbotContainer = document.querySelector(".chatbot-container");
    const chatBox = document.getElementById("chatBox");
    const userInput = document.getElementById("userInput");
    const sendMessage = document.getElementById("sendMessage");

    if (chatbotToggle && chatbotContainer && chatBox && userInput && sendMessage) {
        chatbotToggle.addEventListener("click", function () {
            chatbotContainer.classList.toggle("active");
        });

        sendMessage.addEventListener("click", function () {
            const userText = userInput.value.trim();
            if (userText === "") return;

            const message = document.createElement("p");
            message.classList.add("user-message");
            message.innerText = userText;
            chatBox.appendChild(message);
            userInput.value = "";
            chatBox.scrollTop = chatBox.scrollHeight;
        });

        console.log("Chatbot inicializado corretamente!");
    } else {
        console.error("Erro: Elementos do chatbot não encontrados no index.html!");
    }
});

    // Respostas pré-definidas
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

            if (userText.toLowerCase() === "como posso participar?") {
                addQuickReplies(["Eventos", "Blog", "Contato"]);
            }
        }, 1500);
    });

    userInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            sendMessage.click();
        }
    });
});







