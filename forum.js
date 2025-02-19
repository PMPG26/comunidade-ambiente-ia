// 🔥 Importar funções do Firebase
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";

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

// 🔥 Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

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
loginButton.addEventListener("click", async function () {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
        console.log("Login bem sucedido:", userCredential.user);
    } catch (error) {
        console.error("Erro no login:", error.message);
    }
});

// 🆕 Registo de novo utilizador
registerButton.addEventListener("click", async function () {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
        console.log("Utilizador registado:", userCredential.user);
    } catch (error) {
        console.error("Erro no registo:", error.message);
    }
});

// 🔑 Login com Google
googleLoginButton.addEventListener("click", async function () {
    try {
        const userCredential = await signInWithPopup(auth, provider);
        console.log("Login Google bem sucedido:", userCredential.user);
    } catch (error) {
        console.error("Erro no login Google:", error.message);
    }
});

// 🚪 Logout
logoutButton.addEventListener("click", async function () {
    await signOut(auth);
    console.log("Logout realizado.");
});

// 🔎 Verificar se o utilizador está autenticado
onAuthStateChanged(auth, user => {
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
postButton.addEventListener("click", async function () {
    const content = postContent.value.trim();
    if (content) {
        try {
            await addDoc(collection(db, "posts"), {
                user: auth.currentUser.email,
                content: content,
                timestamp: serverTimestamp()
            });
            console.log("Mensagem publicada!");
            postContent.value = "";
            carregarPosts();
        } catch (error) {
            console.error("Erro ao publicar post:", error.message);
        }
    }
});

// 🔄 Carregar posts do Firestore
function carregarPosts() {
    const postsQuery = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    onSnapshot(postsQuery, snapshot => {
        postsContainer.innerHTML = "";
        snapshot.docs.forEach(doc => {
            const post = doc.data();
            postsContainer.innerHTML += `<p><strong>${post.user}</strong>: ${post.content}</p>`;
        });
    });
}

