const Position = require('../models/Positions');
const Sequelize = require('sequelize');

module.exports = {
    async list(req, res) {
        try {
            const positions = await Position.findAll();
            return res.json(positions);
        } catch (err) {
            return res.json({ msg: 'erro a listar todos os registros!', error: err });
        }
    },
    async show(req, res) {
        try {
            const positions = await Position.findAll({
                where: {
                    id: req.params.id
                }
            })
            return res.json(positions);
        } catch (err) {
            return res, json({ msg: 'erro ao exibir a posição', error: err });
        }
    },
    async create(req, res) {
        try {
            const { description, code, chapterId } = req.query;
            const positions = await Position.create({ description, code, chapterId });
            return res.json(positions);
        } catch (err) {
            return res.json({ msg: 'erro ao criar o registros', error: err });
        }
    },
    async update(req, res) {
        try {
            const { description, code, chapterId } = req.query;
            const OP = Sequelize.Op;
            const ID = Req.params.id;
            const positions = await Position.update({ description, code, chapterId }, { where: { id: { [OP.eq]: ID } } });
            return res.json({ msg: 'atualizado com sucesso!' });
        } catch (err) {
            return res.json({ msg: 'erro ao atualizar o registro', error: err });
        }
    },
    async delete(req, res) {
        try {
            const ID = req.params.id;
            const positions = await Position.destroy({
                where: {
                    id: ID
                }
            });
            return res.json({ msg: 'registro deletado com sucesso!' });
        } catch (err) {
            return res.json({ msg: 'erro a deletar o registro' });
        }
    }
}
