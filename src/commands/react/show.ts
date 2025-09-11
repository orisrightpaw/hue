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
                title: "<a:y9_toroslap:1316993829299027978> arguments missing",
                description: "please provide user argument!",
            }),
        });

    const [record] = REACT_GET_USER.all(target.value) as { user_id: string; emote_id: string }[];
    if (!record)
        return await actions.reply({
            embeds: createSingleEmbed(user, {
                color: Colors.ERROR,
                title: "<a:y9_toroslap:1316993829299027978> unknown user",
                description: "that user doesnt have an autoreaction!",
            }),
        });

    const resolvedMember = await guild.getMember(record.user_id).catch((_) => false as false);
    if (!resolvedMember) {
        REACT_DELETE_USER.all(record.user_id);
        updateWatchedPhrases();
        return await actions.reply({
            embeds: createSingleEmbed(user, {
                color: Colors.ERROR,
                title: "<a:y9_toroqmark:1376186413510295602> unknown emote",
                description: "that user isn't here anymore... removing!",
            }),
        });
    }

    const resolvedEmote = await guild.getEmoji(record.emote_id).catch((_) => false as false);
    if (!resolvedEmote) {
        REACT_DELETE_USER.all(record.user_id);
        updateWatchedPhrases();
        return await actions.reply({
            embeds: createSingleEmbed(user, {
                color: Colors.ERROR,
                title: "<a:y9_toroqmark:1376186413510295602> unknown emote",
                description: "that user's autoreaction is set to an unknown emote... removing!",
            }),
        });
    }

    return await actions.reply({
        embeds: createSingleEmbed(user, {
            color: Colors.SUCCESS,
            title: `<a:y9_torosniffsniff:1382515047691190312> autoreaction for @${resolvedMember.username}`,
            description: `## <${resolvedEmote.animated ? "a" : ""}:${resolvedEmote.name}:${resolvedEmote.id}>`,
        }),
    });
}
