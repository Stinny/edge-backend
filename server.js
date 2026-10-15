import express from 'express';
import chalk from 'chalk';
import dotenv from 'dotenv';
import connectToDB from './db.js';
import helloRoutes from './routes/hello.js';
import authRoutes from './routes/auth.js';
import siteRoutes from './routes/sites.js';
dotenv.config();

const app = express();

app.use(express.json());

await connectToDB();

const corsData = {
  origin: [process.env.CLIENT_URL],
  default: process.env.CLIENT_URL,
};

app.all('*', function (req, res, next) {
  const getOrigin = req.header('origin');

  if (getOrigin) {
    const origin = corsData.origin.includes(getOrigin.toLowerCase())
      ? req.headers.origin
      : corsData.default;
    res.header('Access-Control-Allow-Origin', origin);
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
  }
  next();
});

app.use('/api/hello', helloRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/sites', siteRoutes);

app.get('/', (req, res) => {
  res.send('You are lost ;)');
});

const port = process.env.PORT || 5000;
app.listen(port, '0.0.0.0', () =>
  console.log(
    'Server running at: ' +
      chalk.magenta.bold.underline(`http://localhost:${port}`)
  )
);
