import { ApplicationCommandOptionTypes } from "oceanic.js";
import z from "zod";

export const argument = z.object({
    name: z.string(),
    type: z.int().min(ApplicationCommandOptionTypes.STRING).max(ApplicationCommandOptionTypes.ATTACHMENT),
    value: z.any(),
});

export type Argument = z.infer<typeof argument>;
export type Arguments = z.infer<typeof argument>[];
