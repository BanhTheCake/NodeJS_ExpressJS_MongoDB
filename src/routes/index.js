const homeRoute = require('./homeRoute');
const meRoute = require('./meRoute');

const routeInit = (app) => {
    app.use('/', homeRoute);
    app.use('/me', meRoute);
}

module.exports = routeInit;