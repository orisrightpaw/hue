import type { Command } from "../../lib/types";
import add from "./add";
import remove from "./remove";

export default {
    add,
    remove,
} satisfies Record<string, Command>;
