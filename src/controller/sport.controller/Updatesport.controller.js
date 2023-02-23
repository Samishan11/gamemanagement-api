const sportModel = require("../../model/sport.model/sport.model");
const { StatusCodes } = require("http-status-codes");
const teamModel = require("../../model/team.model/team.model")
const UpdateSport = async (req, res) => {
    let {
        eventName,
        team1,
        team2,
        catagory,
        team1Image,
        team2Image,
        eventPlace,
        eventDescription,
        eventStartDate,
        gamePlan,
        team,
        goal1,
        time1,
        user1,
        goal2,
        time2,
        user2
    } = req?.body;

    const sport = await sportModel.findById(req.params.id)
    const _team1 = await teamModel.findOne({ team: sport.team1 })
    const _team2 = await teamModel.findOne({ team: sport.team2 })
    try {
        const _res = await sportModel.findByIdAndUpdate(req.params.id, req?.body, { new: true })
        if (_res) {

            if (req.body.team && req.body.user) {
                await sportModel.findByIdAndUpdate(req.params.id, {
                    $push: {
                        participations: {
                            participation: {
                                team: req.body.team,
                                role: req.body.role,
                                user: req.body.user,
                                league: _res.eventName
                            }
                        }
                    }
                }, { new: true });
            } else {



                let team1finalpoint = 0;
                let team2finalpoint = 0;

                // console.log(_res.finalResult.team1finalresult.totalgoal1 < _res.finalResult.team2finalresult.totalgoal2)

                for (let i = 0; i < sport.result.length; i++) {
                    team1finalpoint += parseInt(sport.result[i].team1result.goal1)
                    team2finalpoint += parseInt(sport.result[i].team2result.goal2)
                }

                sport.finalResult.team1finalresult.totalgoal1 = team1finalpoint
                sport.finalResult.team2finalresult.totalgoal2 = team2finalpoint

                if (sport.finalResult.team1finalresult.totalgoal1 > sport.finalResult.team2finalresult.totalgoal2) {
                    sport.finalResult.team1finalresult.win1 = "win"
                    sport.finalResult.team2finalresult.win2 = "lose"
                    sport.finalResult.team1finalresult.point = 1
                    sport.finalResult.team2finalresult.point = 0
                    // 
                    _team1.teamResult.point = _team1.teamResult.point + 1
                    _team1.matches.matchwin = _team1.matches.matchwin + 1
                    if (_team2.teamResult.point !== 0) {
                        console.log('!0')
                        _team2.matches.matchloss = _team2.matches.matchloss + 1
                        _team2.teamResult.point = _team2.teamResult.point - 1
                    } else {
                        console.log('0')
                        _team2.matches.matchloss = _team2.matches.matchloss + 1
                        _team2.teamResult.point = 0
                    }
                } else if (sport.finalResult.team1finalresult.totalgoal1 === sport.finalResult.team2finalresult.totalgoal2) {
                    sport.finalResult.team1finalresult.win1 = "draw"
                    sport.finalResult.team2finalresult.win2 = "draw"
                    sport.finalResult.team1finalresult.point = 1
                    sport.finalResult.team2finalresult.point = 1
                    _team1.teamResult.point = _team1.teamResult.point + 1
                    _team2.teamResult.point = _team2.teamResult.point + 1
                    _team1.matches.matchdraw = _team1.matches.matchdraw + 1
                    _team2.matches.matchdraw = _team2.matches.matchdraw + 1
                } else {
                    sport.finalResult.team1finalresult.win1 = "lose"
                    sport.finalResult.team2finalresult.win2 = "win"
                    sport.finalResult.team1finalresult.point = 0
                    sport.finalResult.team2finalresult.point = 1
                    _team2.teamResult.point = _team2.teamResult.point + 1
                    _team2.matches.matchwin = _team2.matches.matchwin + 1
                    if (_team1.teamResult.point !== 0) {
                        _team1.matches.matchloss = _team1.matches.matchloss + 1
                        _team1.teamResult.point = _team1.teamResult.point - 1
                    } else {
                        _team1.matches.matchloss = _team1.matches.matchloss + 1
                        _team1.teamResult.point = 0
                    }
                }
            }
            sport.save()
            _team1.save()
            _team2.save()
            return res.status(StatusCodes.CREATED).send("Update sucessfully")
        }
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error)
    }
}

module.exports = UpdateSport;