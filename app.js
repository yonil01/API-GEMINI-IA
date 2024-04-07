import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

const app = express();
const PORT = 3000;

// Middleware para parsear el cuerpo de las solicitudes POST en formato JSON
app.use(express.json());

// Definir un endpoint de tipo POST
app.post('/gemini/ia', async (req, res) => {
    // Acceder al cuerpo de la solicitud
    const jsonRequest = req.body;
    console.log(jsonRequest.message);

    // Usa tu clave API de forma segura. Idealmente, usa variables de entorno.
    const apiKey = "AIzaSyBg_YJiZ9ETYIX_SGxFbtuRZYlMtW3ung4";
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    try {
        const result = await model.generateContent(jsonRequest.message);
        const response = await result.response;
        const text = response.text();
        res.json({
            response: text,
        });
    } catch (error) {
        console.error(error); // Es una buena práctica registrar el error para depuración
        res.json({
            response: "Problema en la consulta",
        });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
