const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');

dotenv.config();
require('./config/db');

const app = express();

app.use(helmet());
app.use(cors({ origin: /\.pages\.dev$/ }));
app.use(express.json());

// Auth routes
app.post('/api/admin/login', require('./controllers/admin.controller').login);

// Protected routes
app.use('/api/admin', require('./middleware/auth.middleware'), require('./routes/admin.routes'));

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', service: 'KS1 Command Center' });
});

const PORT = process.env.PORT || 10005;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`[KS1 COMMAND] Running on port ${PORT}`);
});
