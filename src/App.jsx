import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import NewsAPI from "newsapi";

// Firebase Config (Replace with your Firebase project config)
const firebaseConfig = {
  apiKey: "AIzaSyBugRyY1jKdqRgloq_gOROUosbJ5DL0Mhw",
  authDomain: "patria-523.firebaseapp.com",
  projectId: "patria-523",
  storageBucket: "patria-523.firebasestorage.app",
  messagingSenderId: "868259654440",
  appId: "1:868259654440:web:bbc17fd9a3db33dbbd3e1d",
  measurementId: "G-DNDWJM2DNK",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);

// NewsAPI Config (Replace with your NewsAPI key)
const newsapi = new NewsAPI("a48018b3526c430bbab8d3affd8a0154");

const Header = () => {
  return (
    <header className="bg-primary text-white fixed top-0 w-full z-10 shadow-md">
      <div className="container mx-auto flex items-center justify-between py-2 px-4">
        <div className="flex items-center">
          <img src="https://via.placeholder.com/40" alt="Logo" className="h-10" />
          <input
            type="text"
            placeholder="Buscar en Patria"
            className="ml-4 p-2 rounded-full bg-[#df1916] text-white placeholder-white focus:outline-none"
          />
        </div>
        <div className="flex space-x-4">
          <button className="p-2 rounded hover:bg-primaryHover">
            <i className="fas fa-home"></i>
          </button>
          <button className="p-2 rounded hover:bg-primaryHover">
            <i className="fas fa-user"></i>
          </button>
          <button className="p-2 rounded hover:bg-primaryHover">
            <i className="fas fa-bell"></i>
          </button>
        </div>
      </div>
    </header>
  );
};

const LeftSidebar = () => {
  const sections = [
    { name: "Inicio", icon: "fas fa-home" },
    { name: "1x10", icon: "fas fa-users" },
    { name: "Waku Pay", icon: "fas fa-wallet" },
    { name: "Salud", icon: "fas fa-heartbeat" },
    { name: "Directorio", icon: "fas fa-address-book" },
    { name: "Alerta", icon: "fas fa-exclamation-triangle" },
    { name: "Trámites", icon: "fas fa-file-alt" },
    { name: "Perfil", icon: "fas fa-user-circle" },
    { name: "Market Social", icon: "fas fa-store" },
  ];

  return (
    <div className="fixed top-16 left-0 w-64 h-full bg-sidebar p-4 overflow-y-auto">
      {sections.map((section) => (
        <a
          key={section.name}
          href={`#${section.name.toLowerCase()}`}
          className="flex items-center p-2 mb-2 rounded hover:bg-sidebarSelect"
        >
          <i className={`${section.icon} text-icon mr-3`}></i>
          <span className="text-textPrimary">{section.name}</span>
        </a>
      ))}
      <div className="mt-4">
        <select className="w-full p-2 bg-card text-textPrimary rounded">
          <option>Español</option>
          <option>Wayuunaiki</option>
          <option>Pemón</option>
          <option>English</option>
          <option>Русский-ruso</option>
          <option>العربية - arabe</option>
          <option>中文 - Chino</option>
        </select>
      </div>
    </div>
  );
};

const RightSidebar = () => {
  return (
    <div className="fixed top-16 right-0 w-80 h-full bg-sidebar p-4 overflow-y-auto">
      <div className="mb-6">
        <h3 className="text-textPrimary font-bold mb-2">Publicidad</h3>
        <div className="bg-card p-3 rounded shadow-shadow mb-2 flex">
          <img src="https://via.placeholder.com/50" alt="Ad" className="w-12 h-12 mr-3" />
          <div>
            <h4 className="text-textPrimary font-semibold">Producto</h4>
            <p className="text-textSecondary text-sm">Descripción breve del producto.</p>
          </div>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-textPrimary font-bold mb-2">Hoy es el cumpleaños de:</h3>
        <div className="bg-card p-3 rounded shadow-shadow">
          <p className="text-textPrimary">Juan Pérez y 2 personas más</p>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-textPrimary font-bold mb-2">Personas que quizás conozcas</h3>
        <div className="bg-card p-3 rounded shadow-shadow flex items-center">
          <img src="https://via.placeholder.com/40" alt="User" className="w-10 h-10 rounded-full mr-3" />
          <div>
            <p className="text-textPrimary font-semibold">María Gómez</p>
            <button className="text-accent text-sm">Agregar</button>
            <button className="text-textSecondary text-sm ml-2">Eliminar</button>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-textPrimary font-bold mb-2">Contactos</h3>
        <div className="bg-card p-3 rounded shadow-shadow">
          <div className="flex items-center mb-2">
            <div className="relative">
              <img src="https://via.placeholder.com/40" alt="User" className="w-8 h-8 rounded-full" />
              <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full"></span>
            </div>
            <p className="text-textPrimary ml-3">Ana López</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const NewsCard = ({ article }) => {
  return (
    <div className="bg-card p-4 rounded shadow-shadow mb-4">
      <img
        src={article.urlToImage || "https://via.placeholder.com/300x150"}
        alt="News"
        className="w-full h-40 object-cover rounded"
      />
      <div className="flex space-x-2 mt-2">
        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">🔴 Urgente</span>
        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">✅ Verificada</span>
      </div>
      <h3 className="text-textPrimary font-bold mt-2">{article.title}</h3>
      <p className="text-textSecondary text-sm">{article.description}</p>
      <p className="text-textPrimary text-sm mt-1">Fuente: {article.source.name}</p>
    </div>
  );
};

const SocialPost = ({ post }) => {
  return (
    <div className="bg-card p-4 rounded shadow-shadow mb-4">
      <div className="flex items-center">
        <img src="https://via.placeholder.com/40" alt="User" className="w-10 h-10 rounded-full mr-3" />
        <div>
          <p className="text-textPrimary font-semibold">{post.user}</p>
          <p className="text-textSecondary text-sm">Hace 2 horas • #CLAP</p>
        </div>
      </div>
      <p className="text-textPrimary mt-2">{post.content}</p>
      <div className="flex space-x-4 mt-2">
        <button className="text-accent">
          <i className="fas fa-thumbs-up"></i> Me gusta
        </button>
        <button className="text-accent">
          <i className="fas fa-comment"></i> Comentar
        </button>
      </div>
    </div>
  );
};

const SocialProtectionCard = () => {
  return (
    <div className="bg-socialCard p-4 rounded shadow-shadow mb-4">
      <h3 className="text-textPrimary font-bold">Tarjeta de Protección Social</h3>
      <p className="text-textPrimary text-sm">Accede a beneficios exclusivos para tu familia.</p>
      <button className="mt-2 bg-primary text-white px-4 py-2 rounded hover:bg-primaryHover">
        Ver Detalles
      </button>
    </div>
  );
};

const MainContent = () => {
  const [news, setNews] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch News from NewsAPI
    newsapi.v2
      .topHeadlines({
        country: "ve",
        language: "es",
        pageSize: 5,
      })
      .then((response) => {
        setNews(response.articles);
      })
      .catch((error) => console.error("NewsAPI Error:", error));

    // Fetch Social Posts from Firestore
    const fetchPosts = async () => {
      const postsSnapshot = await getDocs(collection(db, "posts"));
      const postsList = postsSnapshot.docs.map((doc) => doc.data());
      setPosts(postsList);
    };
    fetchPosts();
  }, []);

  return (
    <div className="ml-64 mr-80 mt-16 p-4">
      <SocialProtectionCard />
      {news.map((article, index) => (
        <NewsCard key={index} article={article} />
      ))}
      {posts.map((post, index) => (
        <SocialPost key={index} post={post} />
      ))}
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-sidebar text-textPrimary text-[10px] py-4 text-center fixed bottom-0 w-full">
      <p>© 2025 Plataforma Patria. Todos los derechos reservados.</p>
    </footer>
  );
};

const MessagesButton = () => {
  return (
    <button className="fixed bottom-4 right-4 bg-primary text-white p-4 rounded-full hover:bg-primaryHover">
      <i className="fas fa-comment"></i>
    </button>
  );
};

const App = () => {
  return (
    <div>
      <Header />
      <LeftSidebar />
      <RightSidebar />
      <MainContent />
      <Footer />
      <MessagesButton />
    </div>
  );
};

export default App;
