import type { User, Guild, InteractionGuild, AllowedMentions, Embed } from "oceanic.js";
import type { Arguments } from "./validator";

export type ReplyParams = {
    content?: string;
    flags?: number;
    allowed_mentions?: AllowedMentions;
    embeds?: Embed[];
};

export type CommandParamaters = {
    args: Arguments;
    user: User;
    guild: Guild | InteractionGuild;
    actions: {
        reply: (params: ReplyParams) => Promise<any>;
    };
};

export type Command = (client: Client, { user, guild, args, actions }: CommandParamaters) => Promise<any>;
export type CommandGroup = Record<string, Command>;
export type CommandListing = Record<string, Command | CommandGroup>;
