const express = require('express');
const router = express.Router();
const globalDb = require('../config/dbGlobal.js');
const reactDb = require('../config/dbReact.js');
const Customer = require('../models/customer');

const html = `<h1>Routes</h1>
<a href="/"><button>Home</button></a>
<a href="/api/metrics"><button>Metrics</button></a>
<a href="/api/months"><button>Months</button></a>
<a href="/api/years"><button>Years</button></a>
<a href="/api/users"><button>Users</button></a>
<a href="/api/customers"><button>Customers</button></a>
<a href="/api/addcustomer"><button>Add Customer</button></a>
`;

const queryMonth = `SELECT * FROM months`;
const queryYear = `SELECT * FROM years`;
const queryMetrics = `SELECT *
  FROM metrics
  INNER JOIN months ON metrics.month=months.month_id
  INNER JOIN countries ON metrics.country=countries.country_id
  INNER JOIN years ON metrics.year=years.year_id`

router.get('/', async (req, res) => {
  res.send(html);
});

router.get('/api/months', async (req, res) => {

  globalDb.getConnection((err, conn) => {
    if (err) throw err;

    try {
      const qry = `SELECT * FROM months`;
      conn.query(qry, (err, result) => {
        conn.release();
        if (err) throw err;
        res.send(result);
      });
    } catch (err) {
      console.log(err);
    }
  })
});

router.get('/api/years', async (req, res) => {

  globalDb.getConnection((err, conn) => {
    if (err) throw err;

    try {
      const qry = queryYear;
      conn.query(qry, (err, result) => {
        conn.release();
        if (err) throw err;
        res.send(result);
      });
    } catch (err) {
      console.log(err);
    }
  })
});

router.get('/api/metrics', async (req, res) => {

  globalDb.getConnection((err, conn) => {
    if (err) throw err;

    try {
      const qry = queryMetrics;
      conn.query(qry, (err, result) => {
        conn.release();
        if (err) throw err;
        res.send(result);
      });
    } catch (err) {
      console.log(err);
    }
  })
});

router.get('/api/users', async (req, res) => {

  reactDb.getConnection((err, conn) => {
    if (err) throw err;

    try {
      const qry = `SELECT * FROM users`;
      conn.query(qry, (err, result) => {
        conn.release();
        if (err) throw err;
        res.send(result);
      });
    } catch (err) {
      console.log(err);
    }
  })
});

//////////////////////////////////////////////////////////////////
// CRUD
router.get('/api/customers', async (req, res) => {
  try {
    const result = await Customer.find();
    res.send({'customers': result});
  } catch (error) {
    res.status(500).json({error: error.message});
  }

});

router.get('/api/customers/:id', async (req, res) => {
  res.json({
    requestParams: req.params,
    requestQuery: req.query
  });

});

router.post('/api/addcustomer', async (req, res) => {

    const customer = new Customer(req.body);

    try {
      await customer.save();
      res.status(201).json({customer});
    } catch (error) {
      res.status(500).json({error: error.message});
    }
});

router.put('/api/customers/:id', async (req, res) => {

  try {
    const customerId = req.params.id;
    const result = await Customer.replaceOne({_id: customerId}, req.body);
    console.log(result);
    res.json({updatedCount: result.modifiedCount});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

router.delete('/api/customers/:id', async (req, res) => {

  try {
    const customerId = req.params.id;
    const result = await Customer.deleteOne({_id: customerId});
    res.json({deletedCount: result.deletedCount});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

module.exports = router;
