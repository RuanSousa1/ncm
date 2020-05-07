const SubItem = require('../models/SubItem');
const sequelize = require('sequelize');

module.exports = {
    async list(req, res) {
        try {
            const subitem = await SubItem.findAll();
            return res.json(subitem);
        } catch (err) {
            return res.status(400).json({ msg: `erro ao listar todos os registros!`, error: err });
        }
    },
    async show(req, res) {
        try {
            const ID = req.params.id;
            const subitem = await SubItem.findAll({ where: { id: ID } });
            return res.json(subitem);
        } catch (err) {
            return res.status(400).json({ msg: `erro ao buscar o registro ${ID}!`, error: err });
        }
    },
    async create(req, res) {
        try {
            const { description, code, itemId } = req.query;
            const subitem = await SubItem.create({ description, code, itemId });
            res.json(subitem);
        } catch (err) {
            return res.status(400).json({ msg: `erro ao criar o registro`, error: err })
        }
    },
    async update(req, res) {
        try {
            const { description, code, itemId } = req.query;
            const OP = sequelize.op;
            const ID = req.params.id;
            const subitem = await SubItem.update({ description, code, itemId }, { Where: { id: { [OP.seq]: ID } } });
            return res.json({ msg: `registro atualizado com sucesso!` });
        } catch (err) {
            return res.status(400).json({ msg: `erro ao atualizar o registro ${ID}`, error: err })
        }
    },
    async delete(req, res) {
        try {
            const ID = req.params.id;
            await SubItem.destroy({ where: { id: ID } });
            return res.json({ msg: `registro deletado com sucesso!` })
        } catch (err) {
            return res.status(400).json({ msg: `erro ao deletar o registro!`, error: err });
        }
    }
}