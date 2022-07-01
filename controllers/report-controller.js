const mysql = require('../mysql');

exports.getAllReports = async (req, res, next) => {
    try {
        const result = await mysql.execute('SELECT * FROM report;');
        const response = {
            all_reports: result.length,
            reports: result.map(rep => {
                return{
                    id_report: rep.id_report,
                    reporter: rep.reporter,
                    latitude: rep.latitude,
                    longitude: rep.longitude,
                    report_type: rep.report_type,
                    report_date: rep.report_date,
                    confirmed: rep.confirmed,
                    active: rep.active,
                    request: {
                        tipo: 'GET',
                        description: 'Retorna os detalhes de um report específico',
                        url: 'http://localhost:3000/reports/' + rep.id_report
                    }
                }
            })
        }
        return res.status(200).send(response);
    } catch (error) {
        return res.status(500).send({error: error});
    }
};

exports.getActiveReports = async (req, res, next) => {
    try {
        const result = await mysql.execute('SELECT * FROM report WHERE active = 1;');
        const response = {
            actives_reports: result.length,
            reports: result.map(rep => {
                return{
                    id_report: rep.id_report,
                    reporter: rep.reporter,
                    latitude: rep.latitude,
                    longitude: rep.longitude,
                    report_type: rep.report_type,
                    report_date: rep.report_date,
                    confirmed: rep.confirmed,
                    active: rep.active,
                    request: {
                        tipo: 'GET',
                        description: 'Retorna os detalhes de um report específico',
                        url: 'http://localhost:3000/reports/' + rep.id_report
                    }
                }
            })
        }
        return res.status(200).send(response)
    } catch (error) {
        return res.status(500).send({error: error});
    }
};

exports.postInsertReport = async (req, res, next) => {
    try {
        const query = 'INSERT INTO report (reporter, latitude, longitude, report_type, confirmed, active) VALUES (?,?,?,?,?,?);';
        const result = await mysql.execute(query, [
            req.body.reporter,
            req.body.latitude,
            req.body.longitude,
            req.body.report_type,
            req.body.confirmed,
            req.body.active
        ]);
        const response = {
            mensagem: 'Report inserido com sucesso',
            reportCriado: {
                reporter: req.body.reporter,
                latitude: req.body.latitude,
                longitude: req.body.longitude,
                report_type: req.body.report_type,
                confirmed: req.body.confirmed,
                active: req.body.active,
                request: {
                    tipo: 'POST',
                    description: 'Inserção de um novo report',
                    url: 'http://localhost:3000/reports'
                }
            }
        }
        return res.status(201).send(response);
    } catch (error) {
        return res.status(500).send({error: error});
    }
};

exports.getSpecificReport = async (req, res, next) => {
    try {
        const query = 'SELECT * FROM report WHERE id_report = ?;';
        const result = await mysql.execute(query, [req.params.id_report]);
        if(result.length == 0){
            return res.status(404).send({
                mensagem: 'Não foi encontrado nenhum report com esse ID'
            })
        }
        const response = {
            report: {
                id_report: result[0].id_report,
                reporter: result[0].reporter,
                latitude: result[0].latitude,
                longitude: result[0].longitude,
                report_type: result[0].report_type,
                report_date: result[0].report_date,
                confirmed: result[0].confirmed,
                active: result[0].active,
                request: {
                    tipo: 'GET',
                    description: 'Retorna todos os reports',
                    url: 'http://localhost:3000/reports'
                }
            }
        }
        return res.status(200).send(response);
    } catch (error) {
        return res.status(500).send({error: error});
    }
};