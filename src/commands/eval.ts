import { ApplicationCommandOptionTypes, type Client } from "oceanic.js";
import type { CommandParamaters } from "../lib/types";
import vm from "node:vm";

export default async function (client: Client, { user, guild, args, actions }: CommandParamaters) {
    if (user.id !== "1403243639894966323") return await actions.reply({ content: "you cant run this command!", flags: 64 });

    const source = args.find((_) => _.type === ApplicationCommandOptionTypes.STRING && _.name === "source");
    if (!source) return await actions.reply({ content: "missing source argument!", flags: 64 });

    const context = { client };
    const code = `(async (client) => { try { ${source.value} } catch (_) { return _ } })(client)`;

    vm.createContext(context);
    const result = await vm.runInContext(code, context);

    return await actions.reply({
        content: "```\n" + (result || "[no return value]") + "\n```",
    });
}
