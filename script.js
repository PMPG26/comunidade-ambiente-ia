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

    /* ======= FORMULÁRIO DE INSCRIÇÃO ======= */
    const form = document.getElementById("subscribeForm");
    const emailInput = document.getElementById("emailInput");
    const subscribeMessage = document.getElementById("subscribeMessage");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            const email = emailInput.value.trim();

            if (!validarEmail(email)) {
                mostrarMensagem("⚠️ Por favor, insere um email válido.", "red");
                return;
            }

            mostrarMensagem("⏳ A processar...", "blue");

            fetch("https://script.google.com/macros/s/AKfycbzf6KUxUK4-JxqW9sqsYdEsbYeSnOs8OY-CU41BcLLugL5yFXtgbXu0kdkeEiyjOUzs/exec", {
                method: "POST",
                mode: "cors", // Para evitar bloqueios de CORS
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email })
            })
            .then(response => response.text())
            .then(data => {
                console.log("Resposta do servidor:", data);
                if (data.includes("Sucesso")) {
                    mostrarMensagem("✅ Obrigado por te inscreveres!", "green");
                    emailInput.value = "";
                } else if (data.includes("já está registado")) {
                    mostrarMensagem("⚠️ Este email já está registado.", "orange");
                } else {
                    mostrarMensagem("❌ Erro ao registar. Tenta novamente.", "red");
                }
            })
            .catch(error => {
                console.error("Erro:", error);
                mostrarMensagem("❌ Erro ao comunicar com o servidor.", "red");
            });
        });
    }

    function validarEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function mostrarMensagem(texto, cor) {
        subscribeMessage.textContent = texto;
        subscribeMessage.style.color = cor;
    }
});




