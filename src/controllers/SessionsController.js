const Session = require('../models/sessions');
const Sequelize = require('sequelize');

module.exports = {
    async list(req, res) {
        try {
            const sessions = await Session.findAll()
            return res.json(sessions);
        } catch (err) {
            return console.error("erro ao listar todos os registros", err);
        }
    },
    async show(req, res) {
        try {
            const sessions = await Session.findAll({ where: { id: req.params.id } });
            return res.json(sessions);
        } catch (err) {
            return console.error("erro ao buscar registro", err);
        }
    },
    async create(req, res) {
        const { description } = req.query;
        try {
            const sessions = await Session.create({ description });
            console.log(req);
            return res.json(sessions);
        } catch (err) {
            return console.error("erro ao criar registro", err)
        }
    },
    async update(req, res) {
        const Op = Sequelize.Op;
        const { description } = req.query;
        const id = req.params.id;
        try {
            await Session.update({ description }, { where: { id: { [Op.eq]: id } } });
            return res.json({ msg: 'sessão atualizada ${id} atualizada com sucesso!' })
        } catch (err) {
            return res.json({ msg: 'sessão ${id} nao foi atualizada' }, err);
        }
    },
    async delete(req, res) {
        try {
            await Session.destroy({ where: { id: req.params.id } });
            const id = req.params.id;
            return res.json({ msg: 'sessão ${id} excluida com sucesso!' })
        } catch (err) {
            return console.error("erro ao excluir", err);
        }
    }
}