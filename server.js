const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080

app.use(express.static(__dirname + '/dist/pastelaria-frontend'));

app.get('/*', (req, res) =>
    res.sendFile(__dirname + '/dist/pastelaria-frontend/index.html'),
);

// Start the app by listening on the default Heroku port
app.listen(PORT, () => {
  console.log('Servidor iniciado na porta ' + PORT)
});
