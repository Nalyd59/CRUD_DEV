// Importation des dépendances express, body-parser et cors
// Nouvelle version 
// import express from "express";
// Ancienne version
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user.route');
const cors = require('cors');

// Connection a la base de données
const connectDb = require('./config/db');

// Middlewares
const app = express();

// Use app Express
app.use(express.json());

// Use bodyParser
app.use(bodyParser.json());
// Permet de décripter des URL
app.use(bodyParser.urlencoded({extended: true}));

// Use cors
app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200
})
);

// Ecrire bonjour dans le navigation
// app.get('/', (req, res) => {
//     res.send('Hello World');
// })

// Routes
app.use('/', userRoutes);


// Configuration et lancement du serveur
const start = async () => {
    try {
        await connectDb();
        const port = process.env.PORT || 5000;
        app.listen(port, () => {
            console.log(`le serveur à démarré sur le port ${port}`);

        })
    } catch (error) {
        console.log(`Erreur lors du démarrage du serveur`);
    }
};

start();
