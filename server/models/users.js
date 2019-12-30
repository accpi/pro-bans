const { pool } = require('../config')
const debug = require('debug');
const log = debug('express:users');

const axios = require('axios');

const get = (request, response) => {
    try {
        pool.query(
            'SELECT * FROM users ORDER BY id ASC', 
            (error, results) => {
                if (error) {
                    log('Express (get): ' + error)
                    response.status(500).send(error)
                }
                else {
                    response.status(200).json(results.rows)
                }
            }
        )
    }
    catch (error) {
        log('Express (get): ' + error)
        response.status(500).send(error)
    }
}

const getByID = (request, response) => {
    const id = parseInt(request.params.id)

    try {
        pool.query(
            'SELECT * FROM users where id = $1', 
            [id], 
            (error, results) => {
                if (error) {
                    log('Express (getByID): ' + error)
                    response.status(500).send(error)
                }
                else {
                    response.status(200).json(results.rows)
                }
            }
        )
    }
    catch (error) {
        log('Express (getByID): ' + error)
        response.status(500).send(error)
    }
}

const post = (request, response) => {
    const { summoner_name, discord_name } = request.body

    let summoner_id = '';
    axios.get('https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + summoner_name,
            {
                'headers': {
                    'X-Riot-Token': 'RGAPI-3414f519-5dd9-47bc-838c-2420450392ea'
                }
            })
        .then(response => {
            summoner_id = response.data.id;
        })
        .catch(error => {
            log('Express (post): ' + error)
        });


    if (!summoner_name || !discord_name) {
        log('Express (post): validation failed')
        response.status(500).send('Validation failed')
    }
    else {
        try {
            pool.query(
                'Insert INTO users (summoner_name, summoner_id, discord_name) VALUES ($1, $2, $3) returning *', 
                [summoner_name, summoner_id, discord_name], 
                (error, results) => {
                    if (error) {
                        log('Express (post): ' + error)
                        response.status(500).send(error)  
                    }
                    else {
                        response.status(201).send(results.rows[0])
                    }
                }
            )
        }
        catch (error) {
            log('Express (post): ' + error)
            response.status(500).send(error)
        }
    }
}

module.exports = {
    get,
    getByID,
    post,
}