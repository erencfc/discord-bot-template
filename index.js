const { Client, Collection } = require("discord.js");
const { readdirSync, readdir } = require("fs");

const intents = require("./config/client");

const client = new Client({ intents });

client.commands = new Collection();
client.aliases = new Collection();
client.categories = readdirSync("./commands/");
client.log = require("./utils/logger");
require("./utils/embed")(client);

readdir("./handlers", (_, files) => {
    files.map((file) => {
        let handler = file.split(".")[0];
        require(`./handlers/${handler}`)(client);
    });
});

require("dotenv").config();
client.login(process.env.TOKEN);
