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


const port = 3000

/* Routes for Simple Team Bans */

const champion_masteries = require('./models/champion_masteries')
app.get('/champion_masteries/:id', champion_masteries.getBySummonerID)


/* Routes for DB Team Bans */

const champions = require('./models/champions')
app.get('/champions', champions.get)
app.get('/champions/:id', champions.getByID)
app.post('/champions', champions.post)

const users = require('./models/users')
app.get('/users', users.get)
app.get('/users/:id', users.getByID)
app.get('/users/summoner/:id', users.getBySummonerID)
app.post('/users', users.post)
app.put('/users/:id', users.update)

const teams = require('./models/teams')
app.get('/teams', teams.get)
app.get('/teams/:id', teams.getByID)
app.post('/teams', teams.post)

const team_members = require('./models/team_members')
app.get('/team_members', team_members.get)
app.get('/team_members/:id', team_members.getByID)
app.get('/team_members/team/:id', team_members.getMembers)
app.post('/team_members', team_members.post)

const match_histories = require('./models/match_histories')
app.get('/match_histories', match_histories.get)
app.get('/match_histories/:id', match_histories.getByID)
app.get('/match_histories/user/:id', match_histories.getByUserID)
app.post('/match_histories', match_histories.post)
app.post('/match_histories_string', match_histories.post_string)

const matches = require('./models/matches')
app.get('/match_list/:id', matches.getMatchList)
app.post('/matches/:id', matches.postMatches)










app.get('/', (request, response) => {
    response.json({info: 'Pro Bans API'})
})

app.get('/easter_egg', (request, response) => {
    response.json({info: 'in this house we stan luda'})
})

app.listen(port, () => {
    logger.info('Pro Bans server running on port %d', port);
})