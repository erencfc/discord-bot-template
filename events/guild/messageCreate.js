const { prefix, owner } = require("../../config/settings.json");

let talkedRecently = new Set();

module.exports = (client, message) => {
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;

    if (talkedRecently.has(message.author.id))
        return message.channel.send("Stop spamming!");

    let command = message.content.split(" ")[0].slice(prefix.length);
    let args = message.content.split(" ").slice(1);

    let cmd;

    if (client.commands.has(command)) cmd = client.commands.get(command);
    else if (client.aliases.has(command))
        cmd = client.commands.get(client.aliases.get(command));

    if (!cmd) return;

    let cmdName = cmd.help.name;

    if (message.author.id !== owner) talkedRecently.add(message.author.id);

    setTimeout(() => {
        talkedRecently.delete(message.author.id);
    }, 1500);

    if (!cmd.settings.enabled && message.author.id !== owner)
        return message.channel.send(`:x: **${cmdName}** is disabled!`);

    if (cmd.settings.onlyOwner && message.author.id !== owner)
        return message.channel.send(
            `:x: Only the owner can use **${cmdName}**!`
        );

    if (cmd.settings.perm && !message.member.permissions.has(cmd.settings.perm))
        return message.channel.send(
            `:x: You do not have the \`${cmd.settings.perm}\` permission to use **${cmdName}**!`
        );

    cmd.run(client, message, args);
};
