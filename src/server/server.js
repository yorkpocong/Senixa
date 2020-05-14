const Member = require("../models/Member");
const cors = require("cors");
const {json} = require("body-parser");
let members;

module.exports = async (app, bot) => {
    app.use(cors());
    app.use(json());
    const getMembers = async () => {
        members = (await Member.find({})).sort((a, b) => b.xp - a.xp).slice(0, 10);
        members.forEach((member, i) => {
            members[i] = {
                xp: member.xp,
                level: member.level,
                rank: i + 1,
                name: bot.users.cache.has(member.id) ? bot.users.cache.get(member.id).username : "Unknown"
            }
        });
    };
    await getMembers();
    setInterval(getMembers, 10000);
    app.post("/api/success/:article/:id", (req, res) => {
        const {article, id} = req.params;
    });
    app.get("/api/leaderboard", async (req, res) => {
        res.json(members);
    });
    app.get("/api/stats", (req, res) => {
        res.json({guilds: bot.guilds.cache.size, users: bot.users.cache.size});
    });
    app.get("/api/user/:id", async (req, res) => {
        const user = bot.users.get(req.params.id);
        const member = Member.find({id: req.params.id});
        const returnObj = {
            xp: member.reduce((acc, val) => acc + val.xp, 0),
            level: member.reduce((acc, val) => acc + val.level, 0),
            name: user ? user.username : "Unknown",
            avatar: user ? user.displayAvatarURL() : null,
        };
        res.json(user ? returnObj : null);
    });
};