const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

const config = require('./config');
let accs = require('./data/accs.json');

app.get('/', (req, res) => {
  res.render('index', { accs });
});

app.get('/admin', (req, res) => {
  res.render('admin', { error: null });
});

app.post('/admin', (req, res) => {
  const { username, password } = req.body;
  if (username === config.adminUsername && password === config.adminPassword) {
    return res.send('Bạn đã đăng nhập admin thành công!');
  } else {
    return res.render('admin', { error: 'Sai tài khoản hoặc mật khẩu!' });
  }
});

app.listen(PORT, () => {
  console.log(`Server chạy tại http://localhost:${PORT}`);
});
