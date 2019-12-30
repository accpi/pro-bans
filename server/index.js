const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const pino = require('pino');
const expressPino = require('express-pino-logger');

const logger = pino({ level: process.env.LOG_LEVEL || 'info' });
const expressLogger = expressPino({ logger });

const app = express()

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.use(cors())
app.use(expressLogger);

const port = 3000

const users = require('./models/users')
app.get('/users', users.get)
app.get('/users/:id', users.getByID)
app.post('/users', users.post)

const teams = require('./models/teams')
app.get('/teams', teams.get)
app.get('/teams/:id', teams.getByID)
app.get('/teams/members/:id', teams.getMembers)
app.post('/teams', teams.post)

const team_members = require('./models/team_members')
app.get('/team_members', team_members.get)
app.get('/team_members/:id', team_members.getByID)
app.post('/team_members', team_members.post)







app.get('/', (request, response) => {
    response.json({info: 'Pro Bans API'})
})

app.get('/easter_egg', (request, response) => {
    response.json({info: 'in this house we stan luda'})
})

app.listen(port, () => {
    logger.info('Pro Bans server running on port %d', port);
})