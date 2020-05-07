const Cest = require('../models/Cest');
const Sequelize = require('sequelize');

module.exports = {
    async list(req, res) {
        try {
            const cest = await Cest.findAll();
            return res.json(cest);
        } catch (err) {
            return res.status(400).json({ msg: `erro ao listar todos os registros!`, error: err });
        }
    },
    async show(req, res) {
        try {
            const ID = req.params.id;
            const cest = await Cest.findAll({ where: { id: ID } });
            return res.json(cest)
        } catch (err) {
            return res.status(400).json({ msg: `erro ao buscar o registro ${ID}!`, error: err });
        }
    },
    async create(req, res) {
        try {
            const { description, code, ncm } = req.query;
            const cest = await Cest.create({ description, code, ncm });
            res.json(cest);
        } catch (err) {
            return res.status(400).json({ msg: `erro ao criar o registro`, error: err })
        }
    },
    async update(req, res) {
        try {
            const { description, code, ncm } = req.query;
            const OP = sequelize.op;
            const ID = req.params.id;
            const cest = await Cest.update({ description, code, ncm }, { Where: { id: { [OP.seq]: ID } } });
            return res.json({ msg: `registro atualizado com sucesso!` });
        } catch (err) {
            return res.status(400).json({ msg: `erro ao atualizar o registro ${ID}`, error: err })
        }
    },
    async delete(req, res) {
        try {
            const ID = req.params.id;
            await Cest.destroy({ where: { id: ID } });
        } catch (err) {
            return res.status(400).json({ msg: `erro ao deletar o registro!`, error: err });
        }
    }
}