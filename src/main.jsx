import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

//Importar assets (recursos: hojas de estilo, fuentes, imágenes)
import "./assets/fonts/fontawesome-free-6.1.2-web/css/all.css";
import "./assets/css/normalize.css";
import "./assets/css/styles.css";
import "./assets/css/responsive.css";

//Cargar configuración react-time-ago
import TimeAgo from "javascript-time-ago";
import es from "javascript-time-ago/locale/es.json";

TimeAgo.addDefaultLocale(es);
TimeAgo.addLocale(es);

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
