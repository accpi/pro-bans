const { pool } = require('../config')
const debug = require('debug');
const log = debug('express:teams');

const axios = require('axios');

const getMatchList = (request, response) => {
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

module.exports = {
    getMatchList,
    getMatches,
    getMastery
}