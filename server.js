const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const PORT = 5000;

const indexRouter = require('./routes/index');
const agentRouter = require('./routes/agents');
const houseRouter = require('./routes/houses');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));
app.use(methodOverride('_method'));

connectDB(); // Connect Database

app.use('/', indexRouter);
app.use('/agents', agentRouter);
app.use('/houses', houseRouter);

app.listen(PORT,
    () => console.log(`Server started on port ${PORT}`)
);