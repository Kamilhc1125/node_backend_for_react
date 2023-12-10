// IMPORTS
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes.js');
const cors = require('cors');
const mongoose = require('mongoose');
const Customer = require('./models/customer');

mongoose.set('strictQuery', false);
const dotenv = require('dotenv');
dotenv.config();
const app = express();

// CONFIG
const PORT = process.env.PORT || 4000;
const MONGODB_CONNECTION = process.env.MONGODB_CONNECTION;

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}

const customer = new Customer({
  name: 'Kamil',
  industry: 'it department'
})

// customer.save();

// app.get('/api/customers', (req, res) => {
//   res.send({'customers': customers})
// })

// APP USE
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//ROUTER
app.use('/', routes);
app.use('/api/months', routes);
app.use('/api/years', routes);
app.use('/api/metrics', routes);

app.use('/api/customers', routes);
app.use('/api/addcustomer', routes);
app.use('/api/customers/:id', routes);


// STATIC
// app.use(express.static('public'));
//
// app.use('/cssFiles', express.static(__dirname + 'public/css'));
//
// // STATIC FILES
// app.get('', (req, res) => { res.render('index')});
//
// // SET VIEWS
// app.set('views', './views');
// app.set('view engine', 'ejs');

// MONGO DB
const startMongoDb = async () => {
  try {
    await mongoose.connect(MONGODB_CONNECTION);
    console.log('MongoDB connected');
  } catch (error) {
    console.log(error.message);
  }
};

const server = app.listen(PORT, () => {
    startMongoDb();
    console.log(`This is conole log. Server is running on port ${PORT}`);
});
