import {
    ApplicationCommandOptionTypes,
    type AnyInteractionChannel,
    type ApplicationCommandTypes,
    type Client,
    type CommandInteraction,
    type InteractionOptions,
    type Uncached,
} from "oceanic.js";
import { argument, type Argument } from "./validator";

function processOption(option: InteractionOptions): Argument {
    if (
        option.type === ApplicationCommandOptionTypes.SUB_COMMAND ||
        option.type === ApplicationCommandOptionTypes.SUB_COMMAND_GROUP
    )
        throw new Error("Cannot parse subcommand/group!");

    return {
        type: option.type,
        name: option.name,
        value: option.value,
    };
}

export async function interpretSlashCommand(
    client: Client,
    interaction: CommandInteraction<AnyInteractionChannel | Uncached, ApplicationCommandTypes>
) {
    const { guildID, id, name, options, resolved, target, targetID } = interaction.data;

    if (options.raw[0]?.type === ApplicationCommandOptionTypes.SUB_COMMAND && options.raw[0].options)
        options.raw = options.raw[0].options;

    const transformed = options.raw.map((option) => processOption(option));
    const validated = await argument
        .array()
        .parseAsync(transformed)
        .catch((_) => false as false);
    if (!validated) throw new Error("Failed to validate command arguments");

    return validated;
}
