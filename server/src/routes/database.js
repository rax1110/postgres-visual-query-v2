import Router from 'express-promise-router';
import connectToDatabase from '../utils';
import queries from '../queries';

const router = new Router();

router.post('/tables', (req, res) => {
  const db = connectToDatabase(req, res);

  db.query(queries.postgre.tables, (err, queryRes) => {
    res.json(queryRes);
    db.end();
  });
});

router.post('/constraints', (req, res) => {
  const db = connectToDatabase(req, res);

  db.query(queries.postgre.constraints, (err, queryRes) => {
    res.json(queryRes);
    db.end();
  });
});

router.post('/columns', (req, res) => {
  const db = connectToDatabase(req, res);

  db.query(queries.postgre.columns, (err, queryRes) => {
    res.json(queryRes);
    db.end();
  });
});

export default router;
