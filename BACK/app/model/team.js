const sequelize = require("sequelize");
const db = require("../../db/connectionDB");

const teams = db.define("teams", {
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name_team: {
        type: sequelize.STRING,
        allowNull: false
    },
    foundation: {
        type: sequelize.STRING,
        allowNull: false
    },
    achievements: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    createdAt: {
        type: sequelize.DATE,
        allowNull: true
    },
    updatedAt: {
        type: sequelize.DATE,
        allowNull: true
    }
});

teams.sync({ force: false }).then(() => { })
module.exports = teams