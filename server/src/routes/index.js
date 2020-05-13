import query from './query';
import database from './database';

export default (app) => {
  app.use('/postgres-query/api/query', query);
  app.use('/postgres-query/api/database', database);
};
