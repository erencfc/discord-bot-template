exports.run = async function (client, message, args) {
    client.log.sendError(client, message, new Error("Ping"));
    message.channel
        .send({ embeds: [client.embeds.info("Calculating...")] })
        .then((m) => {
            m.edit({
                embeds: [
                    client.embeds.success(
                        `Pong! Latency is ${
                            m.createdTimestamp - message.createdTimestamp
                        }ms. API Latency is ${Math.round(client.ws.ping)}ms`
                    ),
                ],
            });
        });
};

exports.settings = {
    enabled: true,
    onlyOwner: false,
    perm: "",
    aliases: [],
};

exports.help = {
    name: "ping",
    description: "Ping",
    usage: "ping",
    category: __dirname.slice(__dirname.lastIndexOf("\\") + 1),
};
