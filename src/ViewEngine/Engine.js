const { engine } = require('express-handlebars');
const appRoot = require('app-root-path');
const hbs = require('handlebars');

const viewEngine = (app) => {
    app.engine('.hbs', engine({ extname: '.hbs' }));
    app.set('view engine', '.hbs');
    app.set('views', appRoot + '/src/resources/views');
};

// define sum fucntion
hbs.registerHelper("inc", function(value, options)
{
    return parseInt(value) + 1;
});

module.exports = viewEngine;
