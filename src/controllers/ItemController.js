const Item = require('../models/Item');
const Sequelize = require('sequelize');

module.exports = {
    async list(req, res) {
        try {
            const itens = await Item.findAll();
            return res.json(itens);
        } catch (err) {
            return res.status(400).json({ msg: `erro ao listar todos os registros!`, error: err });
        }
    },
    async show(req, res) {
        try {
            const ID = req.params.id;
            const itens = await Item.findAll({ where: { id: ID } });
            return res.json(itens);
        } catch (err) {
            return res.status(400).json({ msg: `erro a lista o Item ${ID}` })
        }
    },
    async create(req, res) {
        try {
            const { description, code, SubPositionId } = req.query;
            const itens = await Item.create({ description, code, SubPositionId });
            return res.json(itens);
        } catch (err) {
            return res.status(400).json({ msg: `erro ao inserir o registro`, error: err });
        }
    },
    async update(req, res) {
        try {
            const { description, code, SubPositionId } = req.query;
            const ID = req.params.id;
            const OP = Sequelize.Op;
            const itens = await Item.update({ description, code, SubPositionId }, { Where: { id: { [OP.eq]: ID } } });
            return res.json({ msg: `registro ${ID} atualizado com sucesso!` });
        } catch (err) {
            return res.status(400).json({ msg: `erro ao atualizar o resgistro ${ID}`, error: err });
        }
    },
    async delete(req, res) {
        try {
            const ID = req.prams.id;
            await Item.destroy({ where: { id: ID } });
            return res.json({ msg: `registro ${ID} deletado com sucesso!` })
        } catch (err) {
            return res.status(400).json({ msg: `erro ao deletar o regsitro ${ID}`, error: err });
        }
    }
}