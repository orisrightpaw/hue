import { Client, type ClientEvents } from "oceanic.js";
const client = new Client({
    auth: `Bot ${process.env.DISCORD_TOKEN!}`,
    gateway: {
        intents: [
            "GUILDS",
            "GUILD_MEMBERS",
            "GUILD_MESSAGES",
            "MESSAGE_CONTENT",
            "GUILD_EMOJIS_AND_STICKERS",
            "GUILD_EXPRESSIONS",
        ],
    },
});

import events from "./events";

for (let _ in events) {
    const name = _ as keyof ClientEvents;
    const event = events[name];
    if (!event) continue;

    client.on(name, event.bind(null, client) as any);
}

client.on("ready", async () => {
    console.log("Ready as", client.user.tag);
});

client.on("error", (err) => {
    console.error("Something Broke!", err);
});

client.connect();
