import type { ClientEvents } from "oceanic.js";
import interactionCreate from "./interactionCreate";
import messageCreate from "./messageCreate";

export default {
    interactionCreate,
    messageCreate,
} as Record<keyof ClientEvents, any>;
