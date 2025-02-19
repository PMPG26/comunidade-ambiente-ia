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

// ✅ Inicializar Firebase sem usar "import"
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();

// 🏠 Elementos HTML
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

// 🔐 Login com Email e Password
loginButton.addEventListener("click", function () {
    auth.signInWithEmailAndPassword(emailInput.value, passwordInput.value)
        .then(userCredential => {
            console.log("Login bem sucedido:", userCredential.user);
        })
        .catch(error => {
            console.error("Erro no login:", error.message);
        });
});

// 🆕 Registo de novo utilizador
registerButton.addEventListener("click", function () {
    auth.createUserWithEmailAndPassword(emailInput.value, passwordInput.value)
        .then(userCredential => {
            console.log("Utilizador registado:", userCredential.user);
        })
        .catch(error => {
            console.error("Erro no registo:", error.message);
        });
});

// 🔑 Login com Google
googleLoginButton.addEventListener("click", function () {
    auth.signInWithPopup(provider)
        .then(userCredential => {
            console.log("Login Google bem sucedido:", userCredential.user);
        })
        .catch(error => {
            console.error("Erro no login Google:", error.message);
        });
});

// 🚪 Logout
logoutButton.addEventListener("click", function () {
    auth.signOut().then(() => console.log("Logout realizado."));
});

// 🔎 Verificar se o utilizador está autenticado
auth.onAuthStateChanged(user => {
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


