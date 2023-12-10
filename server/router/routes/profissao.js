const express = require('express');
const router = express.Router();
const pool = require('../../connection');

router.route('/')
    .get(async (req, res) => {
        const result = await pool.query('SELECT * FROM profissao');
        res.json(result.rows);
    })
    .post(async (req, res) => {
        const { nome } = req.body;
        const result = await pool.query('INSERT INTO profissao (prof_nome) VALUES ($1) RETURNING *', [nome]);
        res.json(result.rows[0]);
    });

module.exports = router;
