const Chapters = require('../models/chapters');
const Sequelize = require('sequelize');

module.exports = {
    async list(req, res) {
        try {
            const chapter = await Chapters.findAll();
            return res.json(chapter);
        } catch (err) {
            return res.status(400).json({ msg: "erro ao listar os dados!", error: err });
        }
    },
    async show(req, res) {
        try {
            const chapter = await Chapters.findAll({ Where: { id: req.params.id } });
            return res.json(chapter);
        } catch (err) {
            return res.status(400).json({ msg: "erro so buscar o registro", error: err });
        }
    },
    async create(req, res) {
        const { description, code, sessionId } = req.query;
        try {
            const chapter = await Chapters.create({ description, code, sessionId });
            return res.json(chapter);
        } catch (err) {
            return res.status(400).json({ msg: "erro ao criar registro", error: err });
        }
    },
    async delete(req, res) {
        try {
            const ID = req.params.id;
            const chapter = await Chapters.destroy({ where: { id: ID } });
            return res.json({ msg: `registro deletado: ${ID}` });
        } catch (err) {
            return res.status(400).json({ msg: `erro ao deletar o registro ${ID}!`, error: err });
        }
    },
    async update(req, res) {
        const { description, code, sessionId } = req.query;
        const ID = req.params.id;
        const OP = Sequelize.Op;
        try {
            const chapter = await Chapters.update({ description, code, sessionId }, { where: { id: { [OP.eq]: ID } } });
            return res.json({ msg: "registro atualizado com sucesso!" });
        } catch (err) {
            return res.status(400).json({ msg: `erro ao atualizar o registro: ${ID}`, error: err });
        }
    }
};