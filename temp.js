// MYSQL DB
// pool.getConnection((err, conn) => {
//   if (err) throw err;
//
//   const user = 'Kamil Małaszewicz';
//   const qry = `INSERT INTO users(username) VALUES(?)`;
//   conn.query(qry, [user], (err, result) => {
//     conn.release();
//     if (err) throw err;
//     console.log(result);
//   });
//
// })








//
//
//
//
// // EXPRESS
// require('dotenv/config');
// const express = require('express');
// const bodyParser = require('body-parser');
// const routesHandler = require('./routes/routes.js');
// // CONFIG
//
// // require('./index.css');
//
// // MONGO DB
// const mongoose = require('mongoose');
// mongoose.set('strictQuery', false);
//
// // CORS OPTIONS
// const cors = require('cors');
//
// const corsOptions = {
//     origin: '*',
//     credentials: true,
//     optionSuccessStatus: 200
// }
//
// const PORT = process.env.PORT || 4000;
// const MONGODB_CONNECTION = process.env.MONGODB_CONNECTION;
//
//
//
// const app = express();
//
// app.use(cors(corsOptions));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:false}));
//
// app.use(express.static('public'));
// app.use('/css', express.static(__dirname + 'public/css'));
//
// // STATIC FILES
// app.get('', (req, res) => { res.render('index')});
//
// // SET VIEWS
// app.set('views', './views');
// app.set('view engine', 'ejs');
//
//
//
//
//
//
// app.use('/api/months', routesHandler);
// app.use('/api/years', routesHandler);
// app.use('/api/metrics', routesHandler);
//
// const start = async () => {
//   try {
//     await mongoose.connect(MONGODB_CONNECTION);
//     console.log('MongoDB connected');
//   } catch(error) {
//     console.log(error.message);
//   }
// }
//
// const server = app.listen(PORT, () => {
//     start();
//     console.log(`This is conole log. Server is running on port ${PORT}`);
// });
//
