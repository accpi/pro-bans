const { pool } = require('../config')
const debug = require('debug');
const log = debug('express:teams');

const axios = require('axios');

const get = (request, response) => {
    try {
        pool.query(
            'SELECT * FROM teams ORDER BY id ASC', 
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
            'SELECT * FROM teams where id = $1', 
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

const getMembers = (request, response) => {
    const id = parseInt(request.params.id)
    try {
        pool.query(
            'SELECT users.* FROM team_members join users on team_members.user_id = users.id where team_members.team_id = $1', 
            [id], 
            (error, results) => {
                if (error) {
                    log('Express (getMembers): ' + error)
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
            'Insert INTO teams (name, group) VALUES ($1, $2) returning *', 
            [name, group], 
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
    post,
    getMembers
}