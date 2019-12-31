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
    const { user_id, match_id, champion_id, lane, result, team, kills, deaths, assists, vision_score, match_date } = request.body

    try {
        pool.query(`INSERT INTO match_histories 
                                (user_id, match_id, champion_id, lane, result, team, kills, deaths, assists, vision_score, match_date)
                    SELECT *
                    FROM (
                        VALUES                              
                                ($1::INTEGER, $2::INTEGER, $3::INTEGER, $4, $5::INTEGER, $6::INTEGER, $7::INTEGER, $8::INTEGER, $9::INTEGER, $10::INTEGER, to_timestamp($11::BIGINT / 1000))
                    )
                    AS  x (user_id, match_id, champion_id, lane, result, team, kills, deaths, assists, vision_score, match_date)
                        WHERE
                            exists (SELECT                  1
                                    FROM                    users
                                    WHERE                   users.id = x.user_id::INTEGER
                                    )
                        AND
                            not exists (SELECT              1
                                        FROM                match_histories
                                        WHERE               user_id = x.user_id::INTEGER
                                        AND                 match_id = x.match_id::VARCHAR
                                        )
                    RETURNING *`, 
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