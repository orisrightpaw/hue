import type { Client, Message } from "oceanic.js";
import { REACT_DELETE_USER, REACT_GET_USER, updateWatchedPhrases, watchedPhrases } from "../lib/database";
updateWatchedPhrases();

async function autoreact(match: string, message: Message) {
    if (!message.guild || !message.channel) return;

    const [record] = REACT_GET_USER.all(match) as { user_id: string; emote_id: string }[];
    if (!record) return;

    const resolvedEmoji = await message.guild.getEmoji(record.emote_id).catch((_) => false as false);
    if (!resolvedEmoji) {
        REACT_DELETE_USER.all(record.user_id);
        return await message.channel.createMessage({
            content: `-# psst, i tried to react with an emote that doesn't exist anymore! removing autoreact...`,
            messageReference: {
                guildID: message.guild.id,
                channelID: message.channel.id,
                messageID: message.id,
            },
        });
    }

    return await message.createReaction(`${resolvedEmoji.name}:${resolvedEmoji.id}`);
}

export default async function (client: Client, message: Message) {
    const match = Array.from(watchedPhrases).find((_) => message.content.includes(`<@${_}>`));
    if (match) autoreact(match, message);

    // text command processor here...
}
