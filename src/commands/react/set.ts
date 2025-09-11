import { ApplicationCommandOptionTypes, Guild, type Client } from "oceanic.js";
import type { CommandParamaters } from "../../lib/types";
import { REACT_GET_USER, REACT_INSERT_USER, REACT_UPDATE_USER, updateWatchedPhrases } from "../../lib/database";
import { createSingleEmbed } from "../../lib/embed";
import { Colors } from "../../lib/constants";

const EMOJI_REGEX = new RegExp(/^<(?:a:|:)(\w+):(\d+)>$/gm);

export default async function (client: Client, { user, guild, args, actions }: CommandParamaters) {
    if (!(guild instanceof Guild)) throw new Error("guild isnt here lol");
    const target = args.find((_) => _.type === ApplicationCommandOptionTypes.USER && _.name === "user");
    const emoji = args.find((_) => _.type === ApplicationCommandOptionTypes.STRING && _.name === "emote");
    if (!target || !emoji)
        return await actions.reply({
            embeds: createSingleEmbed(user, {
                color: Colors.ERROR,
                title: "<a:y9_torosob:1316992351318573110> arguments missing",
                description: "please provide user and emote arguments!",
            }),
        });

    const parsed = EMOJI_REGEX.exec(emoji.value.trim());
    if (!parsed)
        return await actions.reply({
            embeds: createSingleEmbed(user, {
                color: Colors.ERROR,
                title: "<a:y9_torosob:1316992351318573110> invalid emote",
                description: "that emote isn't valid!",
            }),
        });
    const emojiName = parsed[1];
    const emojiId = parsed[2];
    if (!emojiName || !emojiId)
        return await actions.reply({
            embeds: createSingleEmbed(user, {
                color: Colors.ERROR,
                title: "<a:y9_torosob:1316992351318573110> invalid emote",
                description: "that emote isn't valid!",
            }),
        });

    const resolvedMember = await guild.getMember(target.value).catch((_) => false as false);
    if (!resolvedMember)
        return await actions.reply({
            embeds: createSingleEmbed(user, {
                color: Colors.ERROR,
                title: "<a:y9_torosob:1316992351318573110> invalid user",
                description: "that user isn't in this server!",
            }),
        });

    const resolvedEmoji = await guild.getEmoji(emojiId).catch((_) => false as false);
    if (!resolvedEmoji)
        return await actions.reply({
            embeds: createSingleEmbed(user, {
                color: Colors.ERROR,
                title: "<a:y9_torosob:1316992351318573110> invalid emote",
                description: "that emote isn't in this server!",
            }),
        });

    const [record] = REACT_GET_USER.all(target.value);
    if (record)
        REACT_UPDATE_USER.all({
            user_id: resolvedMember.id,
            emote_id: resolvedEmoji.id,
        });
    else
        REACT_INSERT_USER.all({
            user_id: resolvedMember.id,
            emote_id: resolvedEmoji.id,
        });

    updateWatchedPhrases();

    return await actions.reply({
        embeds: createSingleEmbed(user, {
            color: Colors.SUCCESS,
            title: "<a:y9_torothumbsup:1329956575544217600> autoreaction set!",
            description: `set autoreaction for <@${resolvedMember.id}> to ${parsed[0]} !`,
        }),
    });
}
