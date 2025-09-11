import { type Client } from "oceanic.js";
import type { CommandParamaters, Command } from "../lib/types";

export default async function (client: Client, { user, guild, args, actions }: CommandParamaters) {
    const shardId = client.guildShardMap[guild.id];
    if (typeof shardId !== "number")
        return await actions.reply({ content: "couldn't find this guild's shard id?! (this should never happen)" });
    const shard = client.shards.get(shardId);
    if (!shard) return await actions.reply({ content: "couldn't find this guild's shard id?! (this should never happen)" });

    await actions.reply({ content: `${shard.latency}ms on shard ${shard.id}` });
}
