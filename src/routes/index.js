const products = require('./products.routes');
const user = require('./users.routes');
const categories = require('./categories.routes');

function routerAPI(app) {
  app.use('/api/v1/products', products);
  app.use('/api/v1/users', user);
  app.use('/api/v1/categories', categories);
}

module.exports = routerAPI;
