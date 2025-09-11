import type { Embed, User } from "oceanic.js";
import { Colors } from "./constants";

export function createEmbed(user: User, embed: Embed): Embed {
    return Object.assign(
        {
            color: Colors.DEFAULT,
            timestamp: new Date().toISOString(),
            footer: {
                text: user.username,
                iconURL: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`,
            },
        },
        embed
    );
}

export function createSingleEmbed(user: User, embed: Embed): Embed[] {
    return [
        Object.assign(
            {
                color: Colors.DEFAULT,
                timestamp: new Date().toISOString(),
                footer: {
                    text: user.username,
                    iconURL: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`,
                },
            },
            embed
        ),
    ];
}
