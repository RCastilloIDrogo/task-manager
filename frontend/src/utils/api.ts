//CENTRO CENTRO apuntar al backend y enviar el token automáticamente

import axios from "axios"; //HTTP - Comunicación

const api = axios.create({
  baseURL: "http://localhost:8000/api/",
});

export default api;
