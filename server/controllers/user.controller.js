const mysql = require('mysql');
const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})

// User
const createUser = (req, res) => {
  // utilise req.body de body-parser
  const { nom, prenom, mail, adresse, ville, codepostal, telephone } = req.body;
  // vérifier si les champs sont remplis
  if (!nom || !prenom || !mail || !adresse || !ville || !codepostal || !telephone) {
    return res.status(400).json({
      error: 'donnée manquante',
    })
  }
  const query = 'INSERT INTO users (nom, prenom, mail, adresse, ville, codepostal, telephone) VALUES (?,?,?,?,?,?,?)';
  conn.query(query, [nom, prenom, mail, adresse, ville, codepostal, telephone], (err) => {
    if (err) {
      console.error('erreur lors de l\'insertion des données : ' + err);
      res.status(500).json({ error: 'erreur lors de l\'insertion des données' });
    } else {
      res.status(200).json({ message: 'utilisateur enregistré' });
    }
  });
};

const updateUser = (req, res) => {
  const { nom, prenom, mail, adresse, ville, codepostal, telephone } = req.body;
  const query = 'UPDATE users SET nom = ?, prenom = ?, mail = ?, adresse = ?, ville = ?, codepostal = ?, telephone = ? WHERE id = ?';
  conn.query(query, [nom, prenom, mail, adresse, ville, codepostal, telephone, req.params.id], (err) => {
    if (err) {
      console.error('Erreur lors de la modification de l\'utilisateur: ' + err);
      res.status(500).json({
        error: 'Erreur lors de la modification de l\'utilisateur'
      });
    } else {
      console.log(res);
      res.status(200).json({ message: 'Utilisateur modifié' });
    }
  });
};

const deleteUser = (req, res) => {
  const query = 'DELETE FROM users WHERE id =?'
  conn.query(query, [req.params.id], (err, resultat) => {
    if (err) {
      console.error('Erreur lors de la suppression des données : ' + err);
      res.status(500).json({ error: 'Erreur lors de la suppression des données' });
    } else {
      res.status(200).json({ message: 'Utilisateur supprimé' });
    }
  })
};

const getAllUsers = (req, res) => {
  const query = 'SELECT * FROM users';
  conn.query(query, (err, result) => {
    if (err) {
      console.error('Erreur de la récupération des données ' + err);
      res.status(500).json({ error: 'Erreur lors de la récupération des données' });
    } else {
      res.status(200).json(result);
    }
  })
}

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getAllUsers
};