import { MessageFlags } from "oceanic.js";

export const Responses = {
    UNHANDLED_COMMAND: {
        content: "unhandled command! please report this to <@1403243639894966323>!",
        flags: MessageFlags.EPHEMERAL,
    },
    UNHANDLED_INTERACTION: {
        content: "unhandled interaction! please report this to <@1403243639894966323>!",
        flags: MessageFlags.EPHEMERAL,
    },
    UNKNOWN_SLASH_COMMAND: {
        content: "unknown slash command! please report this to <@1403243639894966323>!",
        flags: MessageFlags.EPHEMERAL,
    },
    USER_COMMANDS_NOT_SUPPORTED: {
        content: "this bot does not support user commands, sorry!",
        flags: MessageFlags.EPHEMERAL,
    },
};

export const Colors = {
    DEFAULT: parseInt("ffccf1", 16),
    ERROR: parseInt("ffcccc", 16),
    SUCCESS: parseInt("cdffcc", 16),
};
