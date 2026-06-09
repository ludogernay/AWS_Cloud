require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Configuration CORS - accepte requêtes du frontend
const corsOptions = {
  origin: [
    'http://localhost',
    'http://doc-it.canopycannes.com',
    'http://doc-it.canopycannes.com:80',
    'http://0.0.0.0:80',
    process.env.FRONTEND_URL || 'http://localhost'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

app.use(express.json());

app.use((req, res, next) => {
  res.set('Connection', 'keep-alive');
  next();
});

app.get('/', (req, res) => {
    res.send('Backend is running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend running on port ${PORT}`);
});

const fs = require("fs");
const path = require("path");

// Route pour récupérer la liste des fichiers disponibles
app.get("/api/documentation/files", (req, res) => {
    const docsPath = path.join(__dirname, "docs");
    
    fs.readdir(docsPath, (err, files) => {
        if (err) {
            return res.status(500).json({ error: "Erreur lors de la récupération des fichiers" });
        }
        res.json(files.map(file => file.replace(".md", ""))); // Retirer l'extension .md
    });
});


// Route pour récupérer un fichier spécifique
app.get("/api/documentation/:filename", (req, res) => {
    const filename = req.params.filename + ".md"; // Ajouter l'extension
    const docPath = path.join(__dirname, "docs", filename);

    fs.readFile(docPath, "utf8", (err, data) => {
        if (err) {
            return res.status(404).send("Documentation introuvable");
        }
        res.send(data);
    });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
