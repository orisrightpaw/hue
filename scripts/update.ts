import { Client } from "oceanic.js";
import { interactions } from "../src/lib/interaction";
const client = new Client({ auth: `Bot ${process.env.DISCORD_TOKEN!}` });

client.on("ready", async () => {
    await client.application.bulkEditGlobalCommands([]);
    console.log(await client.application.bulkEditGuildCommands(process.env.DISCORD_GUILD_ID!, interactions));

    client.disconnect();
    client.removeAllListeners();
    process.exit();
});

client.on("error", (err) => {
    console.error("Something Broke!", err);
});

client.connect();
