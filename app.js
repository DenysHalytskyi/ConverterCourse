const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const fetch = require('node-fetch');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const axios = require('axios');

// middleware
app.use(express.static('public'));
app.use(express.static(__dirname));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Session middleware
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// database connection
const dbURI = 'mongodb+srv://new1:test12345@cluster1.ve6i4ky.mongodb.net/node-auth?retryWrites=true&w=majority';
mongoose.connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

  function getExchangeRates(callback) {
    const urls = {
      USD: 'https://api.nbp.pl/api/exchangerates/rates/A/USD/?format=json',
      EUR: 'https://api.nbp.pl/api/exchangerates/rates/A/EUR/?format=json',
      GBP: 'https://api.nbp.pl/api/exchangerates/rates/A/GBP/?format=json',
      CHF: 'https://api.nbp.pl/api/exchangerates/rates/A/CHF/?format=json',
      KRW: 'https://api.nbp.pl/api/exchangerates/rates/A/KRW/?format=json',
      INR: 'https://api.nbp.pl/api/exchangerates/rates/A/INR/?format=json',
      UAH: 'https://api.nbp.pl/api/exchangerates/rates/A/UAH/?format=json',
      CNY: 'https://api.nbp.pl/api/exchangerates/rates/A/CNY/?format=json',
      SEK: 'https://api.nbp.pl/api/exchangerates/rates/A/SEK/?format=json',
    };
  
    const promises = Object.entries(urls).map(([currency, url]) =>
      fetch(url)
        .then(res => res.json())
        .then(data => ({ [currency]: data.rates[0].mid }))
        .catch(err => ({ [currency]: null }))
    );
  
    Promise.all(promises)
      .then(results => {
        const rates = results.reduce((acc, curr) => ({ ...acc, ...curr }), {});
        callback(rates);
      })
      .catch(err => {
        console.error('Помилка запиту:', err.message);
        callback(null);
      });
  }
  

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.use(authRoutes);
app.get('/exchange-rate', (req, res) => {
  res.render('exchange-rate');
});
app.get('/top-up', (req, res) => {
  res.render('top-up');
});


app.get('/api/exchange-rates', (req, res) => {
  getExchangeRates((rates) => {
    if (rates) {
      res.json(rates);
    } else {
      res.status(500).json({ error: 'Не вдалося отримати курси валют' });
    }
  });
});



// Route to display payment button
app.get('/pay', (req, res) => {
    res.send(`
        <html>
        <body>
            <form action="/payu-payment" method="POST">
                <button type="submit">Оплатить с PayU</button>
            </form>
        </body>
        </html>
    `);
});

// Route to handle payment
// Route to handle payment
app.post('/payu-payment', async (req, res) => {
  try {
      // Отримання access_token
      const response = await axios.post('https://secure.snd.payu.com/pl/standard/user/oauth/authorize', {
          grant_type: 'client_credentials',
          client_id: '300746',
          client_secret: '2ee86a66e5d97e3fadc400c9f19b065d'
      });

      const { access_token } = response.data;

      // Дані для створення замовлення
      const order = {
          notifyUrl: 'http://yourdomain.com/notify',
          customerIp: '127.0.0.1',
          merchantPosId: '300746',
          description: 'Опис продукту',
          currencyCode: 'PLN', // Змінено валюту на PLN
          totalAmount: '10000',
          buyer: {
              email: 'buyer@example.com',
              phone: '123456789',
              firstName: 'John',
              lastName: 'Doe'
          },
          products: [
              {
                  name: 'Product 1',
                  unitPrice: '10000',
                  quantity: '1'
              }
          ]
      };

      // Відправка запиту на створення замовлення
      const paymentResponse = await axios.post('https://secure.snd.payu.com/api/v2_1/orders', order, {
          headers: {
              Authorization: `Bearer ${access_token}`
          }
      });

      const { redirectUri } = paymentResponse.data;

      // Перенаправлення користувача на сторінку оплати
      res.redirect(redirectUri);
  } catch (error) {
      console.error('Помилка при створенні замовлення:', error);
      res.status(500).send('Помилка при створенні замовлення');
  }
});


module.exports = app;
