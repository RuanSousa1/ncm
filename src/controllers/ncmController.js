const Sequelize = require('sequelize');
const _ = require('lodash')
const Sessions = require('../models/Sessions');
const Chapters = require('../models/Chapters');
const Position = require('../models/Positions');
const SubPosition = require('../models/SubPositions');
const Item = require('../models/Item');
const Subitem = require('../models/SubItem');
//const Cest = require('../models/Cest');


module.exports = {
    async list(req, res) {
        try {
            const Query = req.query;
            const where = {};
            if (Query.code) {
                where.code = Query.code;
            } else if (Query.currentVersion) {
                where.version = { [Sequelize.Op.gt]: Query.currentVersion };
            };

            const subItemsModel = await Subitem.findAll({ where });

            if (subItemsModel.length === 1) {
                let items = await Item.findOne({ id: subItemsModel[0].itemId });
                items = items.toJSON();
                let subPositions = await SubPosition.findOne({ id: items.SubPositionId });
                subPositions = subPositions.toJSON();
                let positions = await Position.findOne({ id: subPositions.positionId });
                positions = positions.toJSON();
                let chapters = await Chapters.findOne({ id: positions.chapterId });
                chapters = chapters.toJSON();
                let sessions = await Sessions.findOne({ id: chapters.sessionId });
                sessions = sessions.toJSON();

                const data = {}

                _.merge(data, { sessions })
                _.merge(data, { sessions: { chapters: [chapters] } })
                _.merge(data, { sessions: { chapters: [{ positions: [positions] }] } })
                _.merge(data, { sessions: { chapters: [{ positions: [{ subPositions: [subPositions] }] }] } })
                _.merge(data, { sessions: { chapters: [{ positions: [{ subPositions: [{ items: [items] }] }] }] } })
                _.merge(data, { sessions: { chapters: [{ positions: [{ subPositions: [{ items: [{ subItem: [{ ncm: subItemsModel[0].toJSON() }] }] }] }] }] } })


                return res.json([data]);

            } else {

                const [
                    _items,
                    _subPositions,
                    _positions,
                    _chapters,
                    _sessions,
                ] = await Promise.all([
                    Item.findAll(),
                    SubPosition.findAll(),
                    Position.findAll(),
                    Chapters.findAll(),
                    Sessions.findAll(),
                ])

                const subItems = subItemsModel.map(n => n.toJSON());
                const items = _items.map(n => n.toJSON()).filter(item => subItems.filter(subItem => subItem.itemId == item.id).length > 0)
                const subPositions = _subPositions.map(n => n.toJSON()).filter(subPosition => items.filter(item => item.SubPositionId == subPosition.id).length > 0);
                const positions = _positions.map(n => n.toJSON()).filter(position => subPositions.filter(subPosition => subPosition.positionId == position.id).length > 0);
                const chapters = _chapters.map(n => n.toJSON()).filter(chapter => positions.filter(position => position.chapterId == chapter.id).length > 0);
                const sessions = _sessions.map(n => n.toJSON()).filter(session => chapters.filter(chapter => chapter.sessionId == session.id).length > 0);

                const data = sessions.map(session => {
                    session.chapters = chapters.filter(chapter => chapter.sessionId === session.id).map(chapter => {
                        chapter.position = positions.filter(position => position.chapterId === chapter.id).map(position => {
                            position.subPosition = subPositions.filter(subPosition => subPosition.positionId === position.id).map(subPosition => {
                                subPosition.item = items.filter(item => item.SubPositionId === subPosition.id).map(item => {
                                    item.subItem = subItems.filter(subitem => subitem.itemId === item.id)
                                    return item;
                                })
                                return subPosition;
                            })
                            return position;
                        })
                        return chapter;
                    })
                    return session;
                })

                return res.json(data);
            }
        } catch (err) {
            console.log(err);
            return res.status(400).json({ msg: "erro ao listar os dados!", error: err });
        }
    }
}
