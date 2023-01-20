const Router = require("express").Router();
const USER_ROUTE = require('./user.route/user.route');
const SPORT_ROUTE = require('./sport.route/sport.route');
const TEAM_ROUTE = require("./team.route/team.route");
const CONTACT_ROUTE = require("./contact.route/contact.route");
const NEWS_ROUTE = require("./news.route/news.route");
// 
Router.use(USER_ROUTE)
Router.use(SPORT_ROUTE)
Router.use(TEAM_ROUTE)
Router.use(CONTACT_ROUTE)
Router.use(NEWS_ROUTE)

module.exports = Router;