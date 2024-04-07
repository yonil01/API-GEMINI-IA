import express from 'express';
import cors from 'cors'; // Importa CORS
import { GoogleGenerativeAI } from '@google/generative-ai';

const app = express();
const PORT = 3000;

// Usa CORS - Esto añadirá los encabezados CORS adecuados a las respuestas
app.use(cors());

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
        const result = await model.generateContent({ prompt: jsonRequest.message }); // Asegúrate de que la propiedad es 'prompt'
        // Dependiendo de la API, es posible que necesites ajustar cómo accedes a la respuesta.
        const text = await result.text(); // Si 'result' es directamente la respuesta HTTP, usa result.text()
        res.json({
            response: text,
        });
    } catch (error) {
        console.error(error); // Es una buena práctica registrar el error para depuración
        res.status(500).json({
            response: "Problema en la consulta",
        });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
