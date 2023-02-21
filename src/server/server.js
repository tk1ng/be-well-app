require('dotenv').config();

const cors = require('cors');
const express = require('express');

const sequelize = require('./utils/database');

const Entry = require('./models/entry');
const User = require('./models/user');
const Wellness_score = require('./models/wellness');
const { register, login } = require('./controllers/auth');
const { isAuthenticated } = require('./middleware/isAuthenticated');
const { getEntries, addEntry } = require('./controllers/mealEntries');
const { getWellness } = require('./controllers/wellnessScores');

const { REACT_APP_SERVER_PORT } = process.env;
const app = express();

app.use(cors())
app.use(express.json());

app.post('/register', register);
app.post('/login', login);

// TODO: Set up routes for retrieving data:
// getting all logs ordered chronologically
app.get('/entries', isAuthenticated, getEntries)
app.post('/entries', isAuthenticated, addEntry)

// getting wellness scores of all time
app.get('/scores', isAuthenticated, getWellness)

// getting logs for a single day
// getting just one entry(maybe this can be a task just for frontend?)
// getting wellness scores of all time
// getting wellness scores for one day(presented using chartjs?)
// app.get('/logs/:id', getSingleLog)
// app.get('/scores', getScores)

Entry.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
Wellness_score.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Entry);
User.hasMany(Wellness_score);


sequelize.sync()
    .then(res => {
        app.listen(REACT_APP_SERVER_PORT, () => {
            console.log(`server running on port ${REACT_APP_SERVER_PORT}`)
        });
    })
    .catch(err => {
        console.log(err)
    });

