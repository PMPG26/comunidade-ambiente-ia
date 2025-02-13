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

    /* ======= CHATBOT COM API DO CHATGPT (OPENAI) ======= */
    const chatbotToggle = document.getElementById("chatbot-toggle");
    const chatbotContainer = document.querySelector(".chatbot-container");
    const chatBox = document.getElementById("chatBox");
    const userInput = document.getElementById("userInput");
    const sendMessage = document.getElementById("sendMessage");

    const API_KEY = "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"; // ✅ API da OpenAI
    const API_URL = "https://api.openai.com/v1/chat/completions";

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

    async function getBotResponse(userMessage) {
        addMessage("EcoBot está a pensar... ⏳", "bot");

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [
                        { role: "system", content: "Tu és o EcoBot, um assistente especializado em ambiente e inteligência artificial. Responde de forma curta, objetiva e amigável." },
                        { role: "user", content: userMessage }
                    ]
                })
            });

            const data = await response.json();
            chatBox.lastChild.remove(); // Remove "EcoBot está a pensar..."
            addMessage(data.choices[0].message.content || "Desculpa, não entendi. Podes reformular?", "bot");
        } catch (error) {
            chatBox.lastChild.remove();
            addMessage("Erro ao conectar com o servidor. Tenta novamente mais tarde.", "bot");
        }
    }

    sendMessage.addEventListener("click", function () {
        const userText = userInput.value.trim();
        if (userText === "") return;

        addMessage(userText, "user");
        userInput.value = "";

        getBotResponse(userText);
    });

    userInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            sendMessage.click();
        }
    });
});
