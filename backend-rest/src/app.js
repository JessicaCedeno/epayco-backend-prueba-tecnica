const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/routes'); // Importar rutas

const { 
  registerClient,
//   rechargeWallet,
//   initiatePayment,
//   confirmPayment,
//   checkBalance
} = require('./controllers/WalletController');
const errorHandler = require('./middlewares/ErrorHandler');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rutas REST
app.use('/api', routes);

app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`REST Service running on port ${PORT}`);
});