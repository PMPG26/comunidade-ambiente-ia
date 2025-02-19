// Configuração do Firebase (SUBSTITUI pelos teus dados!)
const firebaseConfig = {
    apiKey: "TUA_API_KEY",
    authDomain: "teuprojeto.firebaseapp.com",
    projectId: "teuprojeto",
    storageBucket: "teuprojeto.appspot.com",
    messagingSenderId: "TUA_MESSAGING_ID",
    appId: "TUA_APP_ID"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Elementos HTML
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

// Login com Email e Password
loginButton.addEventListener("click", function () {
    const email = emailInput.value;
    const password = passwordInput.value;
    auth.signInWithEmailAndPassword(email, password)
        .then(user => console.log("Login bem sucedido:", user))
        .catch(error => console.error("Erro no login:", error.message));
});

// Registo de novo utilizador
registerButton.addEventListener("click", function () {
    const email = emailInput.value;
    const password = passwordInput.value;
    auth.createUserWithEmailAndPassword(email, password)
        .then(user => console.log("Utilizador registado:", user))
        .catch(error => console.error("Erro no registo:", error.message));
});

// Login com Google
googleLoginButton.addEventListener("click", function () {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then(user => console.log("Login Google bem sucedido:", user))
        .catch(error => console.error("Erro no login Google:", error.message));
});

// Logout
logoutButton.addEventListener("click", function () {
    auth.signOut().then(() => console.log("Logout realizado."));
});

// Verificar se o utilizador está autenticado
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

// Publicar um novo post
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
        });
    }
});

// Carregar posts do Firestore
function carregarPosts() {
    db.collection("posts").orderBy("timestamp", "desc").onSnapshot(snapshot => {
        postsContainer.innerHTML = "";
        snapshot.docs.forEach(doc => {
            const post = doc.data();
            postsContainer.innerHTML += `<p><strong>${post.user}</strong>: ${post.content}</p>`;
        });
    });
}
