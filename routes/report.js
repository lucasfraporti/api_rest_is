const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

// Retorna todos os reports
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query(
            'SELECT * FROM report',
            (error, resultado, field) => {
                if(error){return res.status(500).send({error: error})};
                return res.status(200).send({response: resultado})
            }
        );
    });
});

// Insere um report
router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error){return res.status(500).send({error: error})};
        conn.query(
            'INSERT INTO report (reporter, latitude, longitude, report_type, confirmed, active) VALUES (?,?,?,?,?,?)',
            [req.body.reporter, req.body.latitude, req.body.longitude, req.body.report_type, req.body.confirmed, req.body.active],
            (error, resultado, field) => {
                conn.release();
                if(error){return res.status(500).send({error: error})};
                res.status(201).send({
                    mensagem: 'Report inserido com sucesso!',
                    id_report: resultado.insertId
                });
            }
        );
    });
});

// Retorna os reports por um id específico
router.get('/:id_report', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query(
            'SELECT * FROM report WHERE id_report = ?;',
            [req.params.id_report],
            (error, resultado, field) => {
                if(error){return res.status(500).send({error: error})};
                return res.status(200).send({response: resultado})
            }
        );
    });
});

module.exports = router;