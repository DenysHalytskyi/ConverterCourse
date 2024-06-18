const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');

const app = express();

// middleware
app.use(express.static('public'));

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://new1:test12345@cluster1.ve6i4ky.mongodb.net/node-auth?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

async function getExchangeRates() {
  const apiKey = 'YOUR_OANDA_API_KEY'; // Замініть YOUR_OANDA_API_KEY на ваш API ключ
  const url = `https://api-fxtrade.oanda.com/v3/rates?instruments=USD_PLN,EUR_PLN,GBP_PLN,CHF_PLN,KRW_PLN,INR_PLN,UAH_PLN,CNY_PLN,SEK_PLN`;

  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    });

    const rates = response.data.rates.reduce((acc, rate) => {
      acc[rate.instrument.split('_')[0]] = rate.mid;
      return acc;
    }, {});

    console.log('Отримані курси валют:', rates); // Діагностичне повідомлення
    return rates;
  } catch (err) {
    console.error('Помилка запиту:', err.message);
    return null;
  }
}

// currentCourses
app.get('/api/currentCourses', async (req, res) => {
  const rates = await getExchangeRates();
  if (rates) {
    res.json(rates);
  } else {
    res.status(500).json({ error: 'Не вдалося отримати курси валют' });
  }
});

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('currentCourses'));
