const { pool } = require('../config')
const debug = require('debug');
const log = debug('express:teams');

const axios = require('axios');

const get = (request, response) => {
    try {
        pool.query(
            'SELECT * FROM match_histories ORDER BY id ASC', 
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
            'SELECT * FROM match_histories where id = $1', 
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

const getByUserID = (request, response) => {
    const id = parseInt(request.params.id)

    try {
        pool.query(
            'SELECT * FROM match_histories where user_id = $1 ORDER BY match_date', 
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
    const { name, group } = request.body

    try {
        pool.query(
            'Insert INTO match_histories (user_id, match_id, champion_id, lane, result, team, kills, deaths, assists, vision_score, match_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) returning *', 
            [user_id, match_id, champion_id, lane, result, team, kills, deaths, assists, vision_score, match_date], 
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

module.exports = {
    get,
    getByID,
    getByUserID,
    post
}