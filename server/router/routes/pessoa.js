const express = require('express');
const router = express.Router();
const pool = require('../../connection');

router.route('/')
    .get(async (req, res) => {
        try {
            const result = await pool.query('SELECT * FROM pessoa');
            res.json(result.rows);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .post(async (req, res) => {
        try {
            const { nome, dt_nasc, profissao_id, cpf, telefone, observacao } = req.body;
            const result = await pool.query('INSERT INTO pessoa (pes_nome, pes_data_nascimento, pes_cpf, pes_telefone, prof_id, pes_observacoes) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
                [nome, dt_nasc, cpf, telefone, profissao_id, observacao]);
            res.json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ error });
        }
    });


router.route('/:id')
    .get(async (req, res) => {
        try {
            const result = await pool.query('SELECT * FROM pessoa WHERE id = $1', [req.params.id]);
            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Pessoa não encontrada' });
            }
            const person = result.rows[0];
            res.json(person);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .put(async (req, res) => {
        try {
            const { nome, dt_nasc, profissao_id, cpf, telefone, observacao } = req.body;
            const result = await pool.query(
                'UPDATE pessoa SET pes_nome = $1, pes_data_nascimento = $2, pes_cpf = $3, pes_telefone = $4, prof_id = $5, pes_observacoes = $6 WHERE id = $7 RETURNING *',
                [nome, dt_nasc, cpf, telefone, profissao_id, observacao, req.body.id]
            );

            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Pessoa não encontrada' });
            }
            const updatedPerson = result.rows[0];
            res.json(updatedPerson);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .delete(async (req, res) => {
        try {
            const result = await pool.query('DELETE FROM pessoa WHERE id = $1 RETURNING *', [req.params.id]);
            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Pessoa não encontrada' });
            }
            const deletedPerson = result.rows[0];
            res.json(deletedPerson);
        } catch (error) {
            res.status(500).json({ error });
        }
    });

module.exports = router;
