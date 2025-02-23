// 🔥 Garante que o código só corre quando o DOM está carregado
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM totalmente carregado!");

    // 🔥 Configuração do Firebase
    const firebaseConfig = {
        apiKey: "AIzaSyD_D0x4h3Sfqus9X8x2GCmJxAYAgmhGwU4",
        authDomain: "forum-ambiente-ia.firebaseapp.com",
        projectId: "forum-ambiente-ia",
        storageBucket: "forum-ambiente-ia.firebasestorage.app",
        messagingSenderId: "718767893770",
        appId: "1:718767893770:web:51e328c78986d9bd0c1ef3",
        measurementId: "G-FQR97FPTED"
    };

    // ✅ Inicializar Firebase
    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const db = firebase.firestore();
    const provider = new firebase.auth.GoogleAuthProvider();

    // 🏠 Verificar se os botões e inputs existem antes de usá-los
    const loginContainer = document.getElementById("login-container");
    const forumContainer = document.getElementById("forum-container");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const loginButton = document.getElementById("login");
    const registerButton = document.getElementById("register");
    const googleLoginButton = document.getElementById("googleLogin");
    const logoutButton = document.getElementById("logout");
    const postButton = document.getElementById("post-button");
    const postContent = document.getElementById("post-content");
    const postsContainer = document.getElementById("posts");

    if (!loginButton || !registerButton || !googleLoginButton || !logoutButton) {
        console.error("Erro: Botões não encontrados no DOM.");
        return;
    }

    console.log("Botões encontrados, adicionando event listeners...");

    // 🔐 Login com Email e Password
    loginButton.addEventListener("click", function () {
        console.log("Botão de login clicado!");
        if (!emailInput.value || !passwordInput.value) {
            alert("Por favor, preencha o email e a senha.");
            return;
        }

        auth.signInWithEmailAndPassword(emailInput.value, passwordInput.value)
            .then(userCredential => {
                console.log("Login bem sucedido:", userCredential.user);
                alert("Login realizado com sucesso!");
                atualizarUI(userCredential.user);
            })
            .catch(error => {
                console.error("Erro no login:", error.message);
                alert("Erro no login: " + error.message);
            });
    });

    // 🆕 Registo de novo utilizador
    registerButton.addEventListener("click", function () {
        console.log("Botão de registo clicado!");
        if (!emailInput.value || !passwordInput.value) {
            alert("Por favor, preencha o email e a senha.");
            return;
        }

        auth.createUserWithEmailAndPassword(emailInput.value, passwordInput.value)
            .then(userCredential => {
                console.log("Utilizador registado:", userCredential.user);
                alert("Registo bem-sucedido! Faça login.");
                atualizarUI(userCredential.user);
            })
            .catch(error => {
                console.error("Erro no registo:", error.message);
                alert("Erro no registo: " + error.message);
            });
    });

    // 🔑 Login com Google
    googleLoginButton.addEventListener("click", function () {
        console.log("Botão de login com Google clicado!");

        auth.signInWithPopup(provider)
            .then(userCredential => {
                console.log("Login Google bem sucedido:", userCredential.user);
                alert("Login com Google realizado!");
                atualizarUI(userCredential.user);
            })
            .catch(error => {
                console.error("Erro no login Google:", error.message);
                alert("Erro no login Google: " + error.message);
            });
    });

    // 🚪 Logout
    logoutButton.addEventListener("click", function () {
        console.log("Botão de logout clicado!");
        auth.signOut().then(() => {
            console.log("Logout realizado.");
            alert("Logout realizado com sucesso.");
            atualizarUI(null);
        });
    });

    // 🔎 Atualizar UI com base no estado do utilizador
    function atualizarUI(user) {
        if (user) {
            loginContainer.style.display = "none";
            forumContainer.style.display = "block";
            logoutButton.style.display = "block";
            carregarPosts();
        } else {
            loginContainer.style.display = "block";
            forumContainer.style.display = "none";
            logoutButton.style.display = "none";
        }
    }

    // 🔄 Verificar estado de autenticação ao carregar a página
    auth.onAuthStateChanged(user => {
        console.log("Estado do utilizador:", user);
        atualizarUI(user);
    });

    // ✍️ Publicar um novo post
    postButton.addEventListener("click", function () {
        const content = postContent.value.trim();
        if (content) {
            db.collection("posts").add({
                user: auth.currentUser.email,
                content: content,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            }).then(() => {
                console.log("Mensagem publicada!");
                postContent.value = "";
                carregarPosts();
            }).catch(error => {
                console.error("Erro ao publicar post:", error.message);
            });
        }
    });

    // 🔄 Carregar posts do Firestore
    function carregarPosts() {
        db.collection("posts").orderBy("timestamp", "desc").onSnapshot(snapshot => {
            postsContainer.innerHTML = "";
            snapshot.forEach(doc => {
                const post = doc.data();
                postsContainer.innerHTML += `<p><strong>${post.user || "Anónimo"}</strong>: ${post.content}</p>`;
            });
        }, error => {
            console.error("Erro ao buscar posts:", error);
        });
    }
});



