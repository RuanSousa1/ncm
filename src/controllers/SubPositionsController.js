const SubPosition = require('../models/SubPositions');
const Sequelize = require('sequelize');

module.exports = {
    async list(req, res) {
        try {
            const subpositions = await SubPosition.findAll();
            return res.json(subpositions);
        } catch (err) {
            return res.status(400).json({ msg: `erro ao listar as subposições`, error: err });
        }
    },
    async show(req, res) {
        try {
            const ID = req.params.id;
            const subpositions = await SubPosition.findAll({
                Where: {
                    id: ID
                }
            })
            return res.json(subpositions);
        } catch (err) {
            return res.status(400).json({ msg: `erro ao exibir a subposição ${ID}`, error: err });
        }
    },
    async create(req, res) {
        try {
            const { description, code, positionId } = req.query;
            const subpositions = await SubPosition.create({ description, code, positionId });
            return res.json(subpositions);
        } catch (err) {
            return res.status(400).json({ msg: `erro ao inserir o registro`, error: err });
        }
    },
    async update(req, res) {
        try {
            const { description, code, positionId } = req.query;
            const OP = Sequelize.Op;
            const ID = req.params.id;
            const subpositions = await subpositions.update({ description, code, positionId }, { Where: { id: { [OP.eq]: ID } } });
            return res.json({ msg: `registro ${ID} atualizado com sucesso!` });
        } catch (err) {
            return res.status(400).json({ msg: `erro ao atualizar o registro ${ID}`, error: err })
        }
    },
    async delete(req, res) {
        try {
            const ID = req.params.id;
            await SubPosition.destroy({ where: { id: ID } });
            return res.json({ msg: `registro ${ID} deletado com sucesso!` });
        } catch (err) {
            return res.status(400).json({ msg: `erro a deletar o registro ${ID}`, error: err });
        }
    }
}