import { Guild, type Client } from "oceanic.js";
import type { CommandParamaters } from "../../lib/types";
import { REACT_GET_ALL } from "../../lib/database";
import { createEmbed } from "../../lib/embed";

export default async function (client: Client, { user, guild, args, actions }: CommandParamaters) {
    if (!(guild instanceof Guild)) throw new Error("guild missing sdahgfsghf");

    const records = REACT_GET_ALL.all() as { user_id: string; emote_id: string }[];

    let description = "";
    for (let { user_id, emote_id } of records) {
        const emote = await guild.getEmoji(emote_id).catch((_) => false as false);
        if (!emote) {
            description += `<@${user_id}>: [couldn't get emote :c]`;
            continue;
        }

        description += `- <@${user_id}> <${emote.animated ? "a" : ""}:${emote.name}:${emote.id}>\n`;
    }

    await actions.reply({
        embeds: [
            createEmbed(user.user, {
                title: `<a:y9_toronerd:1329956590337523784> autoreactions for ${guild.name}`,
                description,
            }),
        ],
    });
}
