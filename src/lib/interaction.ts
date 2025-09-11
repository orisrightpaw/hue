import { ApplicationCommandOptionTypes, ApplicationCommandTypes, type CreateGuildApplicationCommandOptions } from "oceanic.js";

export const interactions = [
    {
        type: ApplicationCommandTypes.CHAT_INPUT,
        name: "ping",
        description: "pong!",
    },
    {
        type: ApplicationCommandTypes.CHAT_INPUT,
        name: "eval",
        description: "(bot owner only) evaluate javascript",
        options: [
            {
                type: ApplicationCommandOptionTypes.STRING,
                name: "source",
                description: "the javascript source to execute",
                required: true,
            },
        ],
    },
    {
        type: ApplicationCommandTypes.CHAT_INPUT,
        name: "react",
        description: "manage or show autoreaction configurations",
        options: [
            {
                type: ApplicationCommandOptionTypes.SUB_COMMAND,
                name: "list",
                description: "list all autoreactions for the server",
            },
            {
                type: ApplicationCommandOptionTypes.SUB_COMMAND,
                name: "set",
                description: "set an autoreaction for a user",
                options: [
                    {
                        type: ApplicationCommandOptionTypes.USER,
                        name: "user",
                        description: "the user to effect",
                        required: true,
                    },
                    {
                        type: ApplicationCommandOptionTypes.STRING,
                        name: "emote",
                        description: "the emote to react with",
                        required: true,
                    },
                ],
            },
            {
                type: ApplicationCommandOptionTypes.SUB_COMMAND,
                name: "remove",
                description: "remove an autoreaction for a user",
                options: [
                    {
                        type: ApplicationCommandOptionTypes.USER,
                        name: "user",
                        description: "the user to effect",
                        required: true,
                    },
                ],
            },
            {
                type: ApplicationCommandOptionTypes.SUB_COMMAND,
                name: "show",
                description: "show an autoreaction for a user",
                options: [
                    {
                        type: ApplicationCommandOptionTypes.USER,
                        name: "user",
                        description: "the user to check",
                        required: true,
                    },
                ],
            },
        ],
    },
    {
        type: ApplicationCommandTypes.CHAT_INPUT,
        name: "role",
        description: "manage or show custom boostie roles",
        options: [
            {
                type: ApplicationCommandOptionTypes.SUB_COMMAND,
                name: "list",
                description: "list all boostie roles for the server",
            },
            {
                type: ApplicationCommandOptionTypes.SUB_COMMAND,
                name: "claim",
                description: "claim your boostie role",
                options: [],
            },
            {
                type: ApplicationCommandOptionTypes.SUB_COMMAND,
                name: "modify",
                description: "modify your boostie role",
                options: [
                    {
                        type: ApplicationCommandOptionTypes.ROLE,
                        name: "role",
                        description: "(admin only) the role to modify",
                        required: false,
                    },
                ],
            },
            {
                type: ApplicationCommandOptionTypes.SUB_COMMAND,
                name: "remove",
                description: "remove your boostie role",
                options: [
                    {
                        type: ApplicationCommandOptionTypes.ROLE,
                        name: "role",
                        description: "(admin only) the role to remove",
                        required: false,
                    },
                ],
            },
        ],
    },
] satisfies Array<CreateGuildApplicationCommandOptions>;
