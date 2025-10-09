import { ApplicationCommandOptionTypes, type Client } from "oceanic.js";
import type { CommandParamaters } from "../../lib/types";
import { env } from "bun";

export default async function (client: Client, { user, guild, args, actions }: CommandParamaters) {
    const username = args.find((_) => _.type === ApplicationCommandOptionTypes.STRING && _.name === "username");
    if (!username) return await actions.reply({ content: "missing username argument!", flags: 64 });

    const response = await fetch(env.PELICAN_API + "/client/servers/" + env.PELICAN_UUID + "/command", {
        method: "POST",
        headers: {
            Authorization: "Bearer " + env.PELICAN_API_KEY,
            Accept: "Application/vnd.pterodactyl.v1+json",
            "content-type": "application/json",
        },
        body: JSON.stringify({ command: "whitelist add " + username.value }),
    });

    if (response.status !== 204) return await actions.reply({ content: "couldn't add user to whitelist" });

    return await actions.reply({ content: "added user to whitelist" });
}
