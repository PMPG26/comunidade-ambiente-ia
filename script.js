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

    /* ======= FORMULÁRIO DE INSCRIÇÃO ======= */
    const form = document.getElementById("subscribeForm");
    const emailInput = document.getElementById("emailInput");
    const subscribeMessage = document.getElementById("subscribeMessage");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            const email = emailInput.value.trim();

            if (email === "" || !email.includes("@")) {
                subscribeMessage.textContent = "⚠️ Por favor, insere um email válido.";
                subscribeMessage.style.color = "red";
                return;
            }

            subscribeMessage.textContent = "⏳ A processar...";
            subscribeMessage.style.color = "blue";

            fetch("https://script.google.com/macros/s/AKfycbzf6KUxUK4-JxqW9sqsYdEsbYeSnOs8OY-CU41BcLLugL5yFXtgbXu0kdkeEiyjOUzs/exec", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email })
            })
            .then(response => response.text())
            .then(data => {
                console.log("Resposta do servidor:", data);
                if (data.includes("Sucesso")) {
                    subscribeMessage.textContent = "✅ Obrigado por te inscreveres!";
                    subscribeMessage.style.color = "green";
                    emailInput.value = "";
                } else {
                    subscribeMessage.textContent = "⚠️ Este email já está registado.";
                    subscribeMessage.style.color = "orange";
                }
            })
            .catch(error => {
                console.error("Erro:", error);
                subscribeMessage.textContent = "❌ Erro ao registar. Tenta novamente.";
                subscribeMessage.style.color = "red";
            });
        });
    }
});



