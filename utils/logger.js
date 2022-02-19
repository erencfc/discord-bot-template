const chalk = require("chalk");
const fs = require("fs");
const mkdirp = require("mkdirp");

module.exports = {
    sendError: async (client, message, error) => {
        console.log(chalk.red(`! ${error.name} - ${error.message}`));
        if (message) {
            let date = new Date().toLocaleString();

            let pathFile = `./logs/errors/${message.guild.id}.log`;
            let lineerror = `Date: ${date}\nMessage: ${message.id}\nUser: ${message.author.id}\nContent: ${message.content}\nError: ${error.name} - ${error.message}\n---------------------------------------------\n`;

            await mkdirp("./logs/errors");
            fs.writeFileSync(pathFile, lineerror, {
                flag: "a+",
            });
        }
    },
};
