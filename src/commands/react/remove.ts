import { ApplicationCommandOptionTypes, Guild, type Client, type Embed } from "oceanic.js";
import type { CommandParamaters } from "../../lib/types";
import { REACT_DELETE_USER, REACT_GET_USER, updateWatchedPhrases } from "../../lib/database";
import { createSingleEmbed } from "../../lib/embed";
import { Colors } from "../../lib/constants";

export default async function (client: Client, { user, guild, args, actions }: CommandParamaters) {
    if (!(guild instanceof Guild)) throw new Error("guild missing 27sdygcsgddf");
    const target = args.find((_) => _.type === ApplicationCommandOptionTypes.USER && _.name === "user");
    if (!target)
        return await actions.reply({
            embeds: createSingleEmbed(user, {
                color: Colors.ERROR,
                title: "<a:y9_toropomf:1329958023732400278> arguments missing",
                description: "please provide user argument!",
            }),
        });

    const [record] = REACT_GET_USER.all(target.value) as { user_id: string; emote_id: string }[];
    if (!record)
        return await actions.reply({
            embeds: createSingleEmbed(user, {
                color: Colors.ERROR,
                title: "<a:y9_toropomf:1329958023732400278> unknown user",
                description: "that user doesnt have an autoreaction!",
            }),
        });

    REACT_DELETE_USER.all(target.value);
    updateWatchedPhrases();

    return await actions.reply({
        embeds: createSingleEmbed(user, {
            color: Colors.SUCCESS,
            title: "<a:y9_torothumbsup:1406895215112880240> autoreaction removed!",
            description: `removed <@${target.value}>'s autoreaction!`,
        }),
    });
}
