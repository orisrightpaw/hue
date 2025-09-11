import {
    ApplicationCommandTypes,
    InteractionTypes,
    type AnyInteractionGateway,
    type Client,
    type InteractionGuild,
} from "oceanic.js";
import { interpretSlashCommand } from "../lib/interpreter";
import commands from "../commands";
import { Responses } from "../lib/constants";
import type { Command, CommandGroup, CommandParamaters, ReplyParams } from "../lib/types";

export default async function (client: Client, interaction: AnyInteractionGateway) {
    switch (interaction.type) {
        case InteractionTypes.APPLICATION_COMMAND:
            if (interaction.isUserCommand()) await interaction.createMessage(Responses.USER_COMMANDS_NOT_SUPPORTED);
            await interaction.defer();

            if (interaction.data.type === ApplicationCommandTypes.CHAT_INPUT) {
                let command = commands[interaction.data.name as keyof typeof commands] as Command | CommandGroup;
                if (!(command instanceof Function))
                    command = command[interaction.data.options.getSubCommand()?.[0] as string] as Command;
                if (!command) return await interaction.editOriginal(Responses.UNKNOWN_SLASH_COMMAND);

                return await command(client, {
                    user: interaction.user,
                    guild: interaction.guild || (interaction.guildPartial as InteractionGuild),
                    args: await interpretSlashCommand(client, interaction),
                    actions: {
                        reply: (params: ReplyParams) => {
                            return interaction.reply(params);
                        },
                    },
                } satisfies CommandParamaters);
            } else {
                return await interaction.editOriginal(Responses.UNHANDLED_COMMAND);
            }
        case InteractionTypes.APPLICATION_COMMAND_AUTOCOMPLETE:
            return console.log("[warn] received unhandleable autocomplete interaction");
        default:
            return await interaction.createMessage(Responses.UNHANDLED_INTERACTION);
    }
}
