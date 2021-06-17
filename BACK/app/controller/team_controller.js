const teams = require("./../model/team");

const teamController = {
    save: (req, res) => {
        let { name_team, foundation, achievements } = req.body;

        if (req.params.id) {
            
            if (isNaN(req.params.id)) {
                if (isNaN(req.params.id)) {
                    res.status(404).send("dados inválidos!");
                    return;
                }
            }

            teams.update(
                {
                    name_team,
                    foundation,
                    achievements,
                    updatedAt: new Date().getDate()
                },
                {
                    where: {
                        id: req.params.id
                    }
                })
                .then(() => {
                    res.sendStatus(204);

                })
                .catch(error => {
                    res.send(`Houve problema na base de dados: ${error}`);
                })
        }
        else {
            teams.create({
                name_team,
                foundation,
                achievements,
                createdAt: new Date().getDate(),
                updatedAt: new Date().getDate()
            })
                .then(() => {
                    res.sendStatus(200);

                })
                .catch(error => {
                    res.send(`Houve problema na base de dados: ${error}`);
                })
        }
    },
    find: (req, res) => {
        teams.findAll({ raw: true })
            .then(teamsAll => {
                res.send(teamsAll);
                res.statusCode = 200;
            })
    },
    delete: (req, res) => {
        if (isNaN(req.params.id)) {
            res.sendStatus(404).send("dados inválidos!");
            return;
        }

        teams.destroy({ where: { id: req.params.id } })
            .then(() => {
                res.sendStatus(204);
            })
            .catch(error => {
                send.send(`Houve algum problema no banco de dados ${error}`);
            })
    }
}

module.exports = teamController;