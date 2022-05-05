const express = require('express');
const appRoot = require('app-root-path');
const viewEngine = require('./ViewEngine/Engine');
const methodOverride = require('method-override')
const db = require('./config/database/index');
const routeInit = require('./routes/index');

const app = express();
const port = 3000;

app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(appRoot + '/src/public/'))

//connect database
db.database();

// view engine
viewEngine(app);

// router
routeInit(app);

app.listen(port, () => {console.log("run complete");})