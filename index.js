// index.js
// where your node app starts

// Initialisation du projet
const express = require('express');
const cors = require('cors');
const app = express();

// Activer CORS pour permettre les tests FCC
app.use(cors({ optionsSuccessStatus: 200 }));

// Servir les fichiers statiques
app.use(express.static('public'));

// Route page d’accueil (HTML)
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Exemple API fourni
app.get("/api/hello", (req, res) => {
  res.json({ greeting: 'hello API' });
});

// ✅ API demandée par freeCodeCamp
app.get("/api/:date?", (req, res) => {
  const dateParam = req.params.date;
  let date;

  if (!dateParam) {
    // Aucun paramètre => date actuelle
    date = new Date();
  } else if (!isNaN(dateParam)) {
    // Si le paramètre est un nombre (timestamp)
    date = new Date(parseInt(dateParam));
  } else {
    // Sinon, tenter de parser la date (ISO format)
    date = new Date(dateParam);
  }

  // Si la date est invalide
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Retourner la date au format requis
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Lancer le serveur
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
